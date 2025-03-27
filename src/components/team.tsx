import React from 'react'
import { ModeToggle } from "@/components/ModeToggle";

export default function Team() {
    return (
        <div className="relative w-full h-screen  flex flex-col">
            <div className="flex justify-end p-4">
                <ModeToggle />
            </div>
            Team View Here
        </div>
    )
}
