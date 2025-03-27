import React from "react";
import StoryCards from "./story-cards";
import { IconPlus } from "@tabler/icons-react";

interface ProgressBoardProps {
  columns: string[];
}

const userStories = [
  {
    id: 1,
    story: "UserStory 1",
    storyID: "US-101",
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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    status: "Done",
    time: new Date(2025, 2, 27),
    finishedTime: new Date(2025, 2, 27),
    priority: "Low",
    user: {
      avatar: "/avatars/shadcn.jpg",
      name: "tes2",
    },
  },
]

export default function ProgressBoard({ columns }: ProgressBoardProps) {
  return (
    <div className="flex space-x-4 h-full">
      {columns.map((colTitle) => {
        // Filter stories by their status (which matches the column title)
        const storiesInThisColumn = userStories.filter(
          (story) => story.status === colTitle
        );

        return (
          <div
            key={colTitle}
            className="bg-sidebar rounded px-4 py-2 h-full w-full"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <h2 className="text-secondary-foreground font-bold">
                {colTitle}
              </h2>
              <IconPlus className="text-secondary-foreground w-5 h-5 cursor-pointer" />
            </div>

            {/* Render a list of story cards for this column */}
            <StoryCards stories={storiesInThisColumn} />
          </div>
        );
      })}
    </div>
  );
}
