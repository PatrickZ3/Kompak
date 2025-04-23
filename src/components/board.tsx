"use client"
import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ModeToggle } from "@/components/ModeToggle";
import ProgressColumn from "./progress-column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Story } from "./story-cards";
import Image from "next/image";

interface TaskResponse {
  id: number;
  taskKey: string;
  title: string;
  description: string;
  status: string;
  time?: string;
  dateCreated: string;
  finishedTime?: string | null;
  priority: string;
  assigneeId?: string;
}

interface BoardProps {
  boardId: string | string[];
}

export default function Board({ boardId }: BoardProps) {
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/logo.png" : "/logoReverse.png";

  const [userStories, setUserStories] = useState<Story[]>([]);

  useEffect(() => {
    if (!boardId) return;

    fetch(`/api/board?boardCode=${boardId}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        console.log("Fetched board data:", data);

        const tasks = data?.tasks ?? [];
        console.log("Fetched tasks:", tasks);


        const parsed = tasks.map((t: TaskResponse) => ({
          ...t,
          time: t.time ? new Date(t.time) : null,
          finishedTime: t.finishedTime ? new Date(t.finishedTime) : null,
        }));

        setUserStories(parsed);
      })
      .catch(err => console.error("Failed to fetch tasks:", err));
  }, [boardId]);

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 text-secondary-foreground font-bold">
        <Image src={logoSrc} alt="Kompak Logo" width={120} height={60} />
        <ModeToggle />
      </div>
      <div className="overflow-x-hidden">
        <DndContext onDragEnd={handleDragEnd}>
          <ProgressColumn userStories={userStories} />
        </DndContext>
      </div>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const draggedIdString = String(active.id);
    const storyId = parseInt(draggedIdString.replace("story-", ""), 10);
    const newStatus = String(over.id);

    setUserStories(prev =>
      prev.map(s =>
        s.id === storyId ? { ...s, status: newStatus } : s
      )
    );

    fetch("/api/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId: storyId, newStatus }),
      credentials: "include",
    })
      .then(res => res.json())
      .then(() => {
        fetch(`/api/board?boardCode=${boardId}`)
          .then(res => res.json())
          .then(data => {
            const updatedTasks = data?.tasks ?? [];
            const parsed = updatedTasks.map((t: TaskResponse) => ({
              ...t,
              time: t.time ? new Date(t.time) : null,
              finishedTime: t.finishedTime ? new Date(t.finishedTime) : null,
            }));
            setUserStories(parsed);
          });
      })
      .catch(err => console.error("Update failed", err));
  }
}
