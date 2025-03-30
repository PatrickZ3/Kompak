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
  const priorityMap: Record<string, number> = {
    High: 1,
    Medium: 2,
    Low: 3,
  };
  return (
    <div className="w-full flex space-x-4 h-full">
      {columns.map((colTitle) => {
        let storiesInThisColumn = userStories.filter(
          (story) => story.status === colTitle
        );

        storiesInThisColumn = storiesInThisColumn.sort((a, b) => {

          if (priorityMap[a.priority] < priorityMap[b.priority]) return -1;
          if (priorityMap[a.priority] > priorityMap[b.priority]) return 1;

          return a.id - b.id; 
        });

        return (
          <DroppableColumn
            key={colTitle}
            id={colTitle}
            className="bg-sidebar rounded px-4 py-2 w-full min-h-[92vh]"
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
