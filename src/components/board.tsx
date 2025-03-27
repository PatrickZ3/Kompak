import React from 'react'
import { ModeToggle } from "@/components/ModeToggle";
import ProgressColumn from './progress-column';

export default function Board() {
    return (
        <div className="relative w-full h-screen  flex flex-col">
            <div className="flex justify-end p-4">
                <ModeToggle />
            </div>
            <div className="flex-1">
                <ProgressColumn />
            </div>
        </div>
    )
}
