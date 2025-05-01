"use client"
import React from 'react'
import ProgressBoard from "./progress-board";
import { Story } from "./story-cards";

interface ProgressColumnProps {
    userStories: Story[];
    setUserStories: React.Dispatch<React.SetStateAction<Story[]>>
}

export default function ProgressColumn({ userStories, setUserStories }: ProgressColumnProps) {
    const columnTitles = ["To Do", "In Progress", "Done"];
    return (
        <div className="mx-4 mb-4 mt-0 ">
            <ProgressBoard columns={columnTitles} userStories={userStories} setUserStories={setUserStories} />
        </div>
    )
}
