"use client"
import React, { useState } from 'react';
import { useTheme } from "next-themes";
import { ModeToggle } from "@/components/ModeToggle";
import ProgressColumn from './progress-column';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Story } from "./story-cards";
import Image from 'next/image';

export default function Board() {

    const { theme } = useTheme();
    const logoSrc = theme === "dark" ? "/logo.png" : "/logoReverse.png";

    const [userStories, setUserStories] = useState<Story[]>([
        {
            id: 1,
            story: "UserStory 1",
            storyID: "PA-1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ",
            status: "To Do",
            time: new Date(2025, 2, 25),
            finishedTime: new Date(2025, 2, 25),
            priority: "Medium",
            user: {
                avatar: "/avatars/shadcn.jpg",
                name: "tes1",
            },
        },
        {
            id: 4,
            story: "UserStory 4",
            storyID: "PA-4",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ",
            status: "To Do",
            time: new Date(2025, 2, 25),
            finishedTime: new Date(2025, 2, 25),
            priority: "Medium",
            user: {
                avatar: "/avatars/shadcn.jpg",
                name: "tes1",
            },
        },
        {
            id: 5,
            story: "UserStory 5",
            storyID: "PA-5",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ",
            status: "To Do",
            time: new Date(2025, 2, 25),
            finishedTime: new Date(2025, 2, 25),
            priority: "Medium",
            user: {
                avatar: "/avatars/shadcn.jpg",
                name: "tes1",
            },
        },
        {
            id: 6,
            story: "UserStory 6",
            storyID: "PA-6",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ",
            status: "To Do",
            time: new Date(2025, 2, 25),
            finishedTime: new Date(2025, 2, 25),
            priority: "Medium",
            user: {
                avatar: "/avatars/shadcn.jpg",
                name: "tes1",
            },
        },
        {
            id: 7,
            story: "UserStory 7",
            storyID: "PA-7",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad ",
            status: "To Do",
            time: new Date(2025, 2, 25),
            finishedTime: new Date(2025, 2, 25),
            priority: "Medium",
            user: {
                avatar: "/avatars/shadcn.jpg",
                name: "tes1",
            },
        },
        {
            id: 2,
            story: "UserStory 2",
            storyID: "PA-2",
            description: "This is the second user story.",
            status: "In Progress",
            time: new Date(2025, 2, 26),
            finishedTime: new Date(2025, 2, 26),
            priority: "High",
            user: {
                avatar: "/avatars/shadcn.jpg",
                name: "tes1",
            },
        },
        {
            id: 3,
            story: "UserStory 3",
            storyID: "PA-3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            status: "Done",
            time: new Date(2025, 2, 27),
            finishedTime: new Date(2025, 2, 27),
            priority: "Low",
            user: {
                avatar: "/avatars/shadcn.jpg",
                name: "tes2",
            },
        },
    ]);

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
        const { active, over } = event
        if (!over) return

        const draggedIdString = String(active.id)
        const storyId = parseInt(draggedIdString.replace("story-", ""), 10)

        const newStatus = String(over.id)

        setUserStories((prevStories) =>
            prevStories.map((s) =>
                s.id === storyId ? { ...s, status: newStatus } : s
            )
        )
    }

}
