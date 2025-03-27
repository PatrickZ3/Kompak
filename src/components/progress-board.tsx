import React from "react";
import StoryCards from "./story-cards";
import { IconPlus } from "@tabler/icons-react";

interface ProgressBoardProps {
  columns: string[];
}

export default function ProgressBoard({ columns }: ProgressBoardProps) {
  return (
    <div className="flex space-x-4 h-full">
      {columns.map((colTitle) => (
        <div key={colTitle} className="bg-sidebar rounded px-4 py-2 h-full w-full">
          <div className="flex items-center justify-between w-full mb-2">
            <h2 className="text-secondary-foreground font-bold ">{colTitle}</h2>
            <IconPlus className="text-secondary-foreground w-5 h-5 cursor-pointer"/>
          </div>
          <StoryCards />
        </div>
      ))}
    </div>
  );
}
