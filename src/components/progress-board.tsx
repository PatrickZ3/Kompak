import React from "react";
import StoryCards from "./story-cards";

interface ProgressBoardProps {
  columns: string[]; 
}

export default function ProgressBoard({ columns }: ProgressBoardProps) {
  return (
    <div className="flex space-x-4 h-full">
      {columns.map((colTitle) => (
        <div key={colTitle} className="bg-sidebar rounded px-4 py-2 h-full w-full">
          <h2 className="text-secondary-foreground font-bold mb-2">{colTitle}</h2>
          {/* 
            You can render whatever you want inside each column:
            - <StoryCards />
            - A button to add new stories
            - etc.
          */}
            <StoryCards />
        </div>
      ))}
    </div>
  );
}
