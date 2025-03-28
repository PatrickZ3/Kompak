"use client"
import React from "react";
import StoryCards from "./story-cards";
import { IconPlus } from "@tabler/icons-react";
import { useDroppable } from "@dnd-kit/core"


interface ProgressBoardProps {
  columns: string[];
  userStories: any[];
}

function DroppableColumn({
  id,
  className,
  children,
}: {
  id: string
  className?: string
  children: React.ReactNode
}) {
  // useDroppable returns a ref setter
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  )
}

export default function ProgressBoard({ columns, userStories }: ProgressBoardProps) {
  return (
    <div className="w-full flex space-x-4 h-full">
      {columns.map((colTitle) => {
        const storiesInThisColumn = userStories.filter(
          (story) => story.status === colTitle
        );

        return (
          <DroppableColumn
            key={colTitle}
            id={colTitle}
            className="bg-sidebar rounded px-4 py-2 w-full min-h-[88vh]"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <h2 className="text-secondary-foreground font-bold">{colTitle}</h2>
              <IconPlus className="text-secondary-foreground w-5 h-5 cursor-pointer" />
            </div>
            <StoryCards stories={storiesInThisColumn} />
          </DroppableColumn>
        );
      })} 
    </div>
  );
}
