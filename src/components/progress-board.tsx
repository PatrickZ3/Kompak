"use client"
import React from "react";
import StoryCards, { Story } from "./story-cards";
import { IconPlus } from "@tabler/icons-react";
import { useDroppable } from "@dnd-kit/core"


interface ProgressBoardProps {
  columns: string[];
  userStories: Story[];
  setUserStories: React.Dispatch<React.SetStateAction<Story[]>>
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

  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  )
}

export default function ProgressBoard({ columns, userStories,  setUserStories }: ProgressBoardProps) {
  const priorityMap: Record<string, number> = {
    High: 1,
    Medium: 2,
    Low: 3,
  };
  return (
    <div className="w-full flex space-x-4 h-full ">
      {columns.map((colTitle) => {
        let storiesInThisColumn = userStories.filter(
          (story) => story.status === colTitle
        );

        storiesInThisColumn = storiesInThisColumn.sort((a, b) => {
          const aPriority = priorityMap[a.priority];
          const bPriority = priorityMap[b.priority];
        
          if (aPriority < bPriority) return -1;
          if (aPriority > bPriority) return 1;
        
          const aTime = a.time ? new Date(a.time).getTime() : 0;
          const bTime = b.time ? new Date(b.time).getTime() : 0;
        
          return aTime - bTime;
        });

        return (
          <DroppableColumn
            key={colTitle}
            id={colTitle}
            className="bg-sidebar rounded px-4 py-2 w-full min-h-[92vh]"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <h2 className="text-secondary-foreground font-bold">{colTitle}</h2>
            </div>
            <StoryCards stories={storiesInThisColumn} setUserStories={setUserStories}/>
          </DroppableColumn>
        );
      })}
    </div>
  );
}
