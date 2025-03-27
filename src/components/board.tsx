    import React, { useState } from 'react'
    import { ModeToggle } from "@/components/ModeToggle";
    import ProgressColumn from './progress-column';
    import { DndContext, DragEndEvent } from '@dnd-kit/core';
    import { Story } from "./story-cards";





    export default function Board() {
        const [userStories, setUserStories] = useState<Story[]>([
            {
                id: 1,
                story: "UserStory 1",
                storyID: "US-101",
                description: "Lorem ipsum ...",
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
                storyID: "US-102",
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
                storyID: "US-103",
                description: "Lorem ipsum ...",
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
            <div className="relative w-full h-screen  flex flex-col">
                <div className="flex justify-end p-4">
                    <ModeToggle />
                </div>
                <div className="flex-1">
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
