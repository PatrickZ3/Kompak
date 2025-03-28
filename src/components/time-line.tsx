"use client"
import React from 'react'
import { ModeToggle } from "@/components/ModeToggle";

export default function Timeline() {
    return (
        <div className="relative w-full h-screen  flex flex-col">
            <div className="flex justify-end p-4">
                <ModeToggle />
            </div>
            Timeline View Here
        </div>
    )
}
