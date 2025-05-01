"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter, 
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface EditBoardModalProps {
  isOpen: boolean
  onClose: () => void
  board: {
    id: string
    title: string
    description: string
  }
  onBoardUpdated: (id: string, title: string, description: string) => void
}

export function EditBoardModal({ isOpen, onClose, board, onBoardUpdated }: EditBoardModalProps) {
  const [title, setTitle] = useState(board.title)
  const [description, setDescription] = useState(board.description)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim()) return

    setIsLoading(true)

    const { error } = await supabase
      .from("Board")
      .update({
        title: title.trim(),
        description: description.trim(),
      })
      .eq("id", board.id)

    setIsLoading(false)

    if (error) {
      console.error("Failed to update board:", error.message)
      alert("Something went wrong while updating the board.")
      return
    }

    // Update local state via parent callback
    onBoardUpdated(board.id, title, description)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Board</DialogTitle>
          <DialogDescription>Update the details of your board.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-board-name" className="text-left">
              Board Name
            </Label>
            <Input
              id="edit-board-name"
              placeholder="Enter board name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="edit-board-description" className="text-left">
              Description
            </Label>
            <Textarea
              id="edit-board-description"
              placeholder="Enter board description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 h-24"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!title.trim() || isLoading}
            className="bg-red-500 text-primary-foreground hover:bg-red-600 cursor-pointer"
          >
            {isLoading ? "Updating..." : "Update Board"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
