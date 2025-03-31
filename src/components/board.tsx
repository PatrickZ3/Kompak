"use client"
import React, { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { ModeToggle } from "@/components/ModeToggle";
import ProgressColumn from './progress-column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Story } from "./story-cards";
import Image from 'next/image';

export default function Board() {

    const { theme } = useTheme();
    const logoSrc = theme === "dark" ? "/logo.png" : "/logoReverse.png";

    const [userStories, setUserStories] = useState<Story[]>([]);

    useEffect(() => {
        fetch("/api/board")
            .then(res => res.json())
            .then(data => {
                const parsed = data.tasks.map((t: any) => ({
                    ...t,
                    time: new Date(t.time),
                    finishedTime: t.finishedTime ? new Date(t.finishedTime) : null,
                }));
                setUserStories(parsed);
            })
            .catch(err => console.error("Failed to fetch tasks:", err));
    }, []);
    ;


    return (
        <div className="flex flex-col overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 text-secondary-foreground font-bold">
                <Image src={logoSrc} alt="Kompak Logo" width={120} height={60} />
                <ModeToggle />
            </div>
            <div className=" overflow-x-hidden">
                <DndContext onDragEnd={handleDragEnd}>
                    <ProgressColumn userStories={userStories} setUserStories={setUserStories} />
                </DndContext>
            </div>
        </div>
    )

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;

        const draggedIdString = String(active.id);
        const storyId = parseInt(draggedIdString.replace("story-", ""), 10);
        const newStatus = String(over.id);

        setUserStories((prevStories) =>
            prevStories.map((s) =>
                s.id === storyId ? { ...s, status: newStatus } : s
            )
        );

        // 🔁 Update the backend
        fetch("/api/update-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ taskId: storyId, newStatus }),
        })
            .then((res) => res.json())
            .then(() => {
                // ✅ Re-fetch updated tasks to get the new dateFinish
                fetch("/api/board")
                    .then((res) => res.json())
                    .then((data) => setUserStories(data.tasks));
            })
            .catch((err) => console.error("Update failed", err));
    }
}
