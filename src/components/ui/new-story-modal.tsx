"use client"

import { useState } from "react"
import { X, Plus, User } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function NewStoryModal({
    isOpen,
    onClose,
    boardId,
    onStoryCreated,
}: {
    isOpen: boolean
    onClose: () => void
    boardId: number | string
    onStoryCreated?: () => void; 
}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("medium")

    const handleSubmit = async () => {
        const payload = {
            boardId: Number(boardId), // Ensure it’s a number
            title,
            description,
            priority: priority.toUpperCase(), // Convert to "LOW", "MEDIUM", or "HIGH"
            assigneeId: "user-id-placeholder",
        };

        console.log("Submitting payload:", payload); 

        const res = await fetch("/api/add-story", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        if (res.ok) {
            console.log("Story created!")
            onClose()
            onStoryCreated?.();
        } else {
            console.error("Failed to create story")
        }
    }



    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#1e1e1e] text-white border border-gray-700 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                        New Story
                    </DialogTitle>
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-white transition"
                        aria-label="Close"
                    >

                    </button>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm text-muted-foreground">
                            Title
                        </Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter story title"
                            className="bg-[#2a2a2a] border border-gray-700 text-white placeholder:text-muted-foreground focus:border-gray-500"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm text-muted-foreground">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter story description"
                            className="bg-[#2a2a2a] border border-gray-700 text-white placeholder:text-muted-foreground min-h-[100px] focus:border-gray-500"
                        />
                    </div>

                    {/* Priority */}
                    <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Priority</Label>
                        <RadioGroup
                            value={priority}
                            onValueChange={setPriority}
                            className="flex items-center gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="low" id="low" className="border-gray-600 text-green-500" />
                                <Label htmlFor="low" className="text-green-500 text-xs bg-green-500/20 px-2 py-1 rounded">
                                    Low
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="medium" id="medium" className="border-gray-600 text-yellow-500" />
                                <Label htmlFor="medium" className="text-yellow-500 text-xs bg-yellow-500/20 px-2 py-1 rounded">
                                    Medium
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="high" id="high" className="border-gray-600 text-red-500" />
                                <Label htmlFor="high" className="text-red-500 text-xs bg-red-500/20 px-2 py-1 rounded">
                                    High
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Assignee */}
                    <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">Assignee</Label>
                        <div className="flex items-center gap-2 p-2 rounded bg-[#2a2a2a] border border-gray-700">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/avatars/shadcn.jpg" />
                                <AvatarFallback className="bg-gray-700 text-gray-300">
                                    <User size={16} />
                                </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-300">Assign to me</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <DialogFooter className="pt-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!title.trim()}
                        className="bg-[#454545] hover:bg-[#555555] text-white"
                    >
                        Create Story
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
