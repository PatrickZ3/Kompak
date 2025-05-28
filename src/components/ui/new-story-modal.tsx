"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
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
        try {
          // 1. Get board title and current taskCounter
          const { data: board, error: boardError } = await supabase
            .from("Board")
            .select("title, taskCounter")
            .eq("id", boardId)
            .single()
    
          if (boardError || !board) {
            throw new Error("Failed to fetch board data.")
          }
    
          const initials = board.title
            .split(" ")
            .map((word: string) => word[0])
            .join("")
            .toUpperCase()
    
          const taskNumber = board.taskCounter + 1
          const taskKey = `${initials}-${taskNumber}`
    
          // 2. Insert new task/story
          const payload = {
            boardId: Number(boardId),
            taskKey,
            title,
            description,
            priority: priority.toUpperCase(),
            assigneeId: "user-id-placeholder",
            status: "TODO",
            dateCreated: new Date().toISOString(),
          }
    
          const { error: insertError } = await supabase.from("Task").insert(payload)
    
          if (insertError) {
            throw new Error("Failed to create story.")
          }
    
          // 3. Update the taskCounter in the Board
          await supabase
            .from("Board")
            .update({ taskCounter: taskNumber })
            .eq("id", boardId)
    
          onClose()
          onStoryCreated?.()
        } catch (err) {
          console.error(err)
          alert("Failed to create story.")
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
                        className="absolute right-4 top-4 text-gray-400 hover:text-white transition cursor-pointer"
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

                    
                </div>

                {/* Footer */}
                <DialogFooter className="pt-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!title.trim()}
                        className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                    >
                        Create Story
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
