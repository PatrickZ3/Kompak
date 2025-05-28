"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CardEditModalProps {
  isOpen: boolean
  onClose: () => void
  card?: EditableCard
  onSave: (card: EditableCard) => void
}

export type EditableCard = {
  id: string
  taskKey: string
  title: string
  description: string
  status: "To Do" | "In Progress" | "Done"
  priority: "High" | "Medium" | "Low"
  date: string
}


export function CardEditModal({ isOpen, onClose, card, onSave }: CardEditModalProps) {
  const [editedCard, setEditedCard] = useState(
    card || {
      id: "",
      taskKey: "",
      title: "",
      description: "",
      status: "To Do",
      priority: "Medium",
      date: new Date().toISOString().split("T")[0],
    },
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field: string, value: string) => {
    setEditedCard({ ...editedCard, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const originalStatus = card?.status;

    const updateData: {
      title: string
      description: string
      status: string
      priority: string
      dateCreated: string
      dateFinish?: string | null
    } = {
      title: editedCard.title,
      description: editedCard.description,
      status:
        editedCard.status === "To Do"
          ? "TODO"
          : editedCard.status === "In Progress"
            ? "IN_PROGRESS"
            : "DONE",
      priority: editedCard.priority.toUpperCase(),
      dateCreated: editedCard.date,
    }

    if (originalStatus !== "Done" && editedCard.status === "Done") {
      updateData.dateFinish = new Date().toISOString(); // just marked as Done
    } else if (originalStatus === "Done" && editedCard.status !== "Done") {
      updateData.dateFinish = null; // changed from Done to something else
    }

    const { error } = await supabase
      .from("Task")
      .update(updateData)
      .eq("id", editedCard.id)

    setIsLoading(false)

    if (error) {
      alert("Failed to update task: " + error.message)
      return
    }

    onSave(editedCard as EditableCard)
    onClose()
  }

  useEffect(() => {
    if (!card?.id) return;
    const fetchTaskDetails = async () => {
      const { data, error } = await supabase
        .from("Task")
        .select("*")
        .eq("id", card.id)
        .single();
      if (error) {
        console.error("❌ Failed to fetch task:", error);
        return;
      }
      // Log datefinished value
      console.log("dateFinish:", data.datefinished);

      setEditedCard({
        id: data.id.toString(),
        taskKey: data.taskKey,
        title: data.title,
        description: data.description,
        status:
          data.status === "TODO"
            ? "To Do"
            : data.status === "IN_PROGRESS"
              ? "In Progress"
              : "Done",
        priority:
          data.priority.charAt(0).toUpperCase() +
          data.priority.slice(1).toLowerCase(),
        date: data.dateCreated?.split("T")[0],
      });
    };
    fetchTaskDetails();
  }, [card?.id]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] z-[1000]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Edit Card</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id">ID</Label>
            <Input
              id="id"
              value={editedCard.taskKey}
              placeholder="AO-1"
              disabled={!!card}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={editedCard.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Task title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editedCard.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Add a description..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={editedCard.status} onValueChange={(value) => handleChange("status", value)}>
              <SelectTrigger className="cursor-pointer">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="cursor-pointer z-[1100]" side="bottom" align="start" position="popper">
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Priority</Label>
            <RadioGroup
              value={editedCard.priority.toLowerCase()}
              onValueChange={(value) => handleChange("priority", value)}
              className="flex items-center gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" className="border-gray-600 text-green-500 cursor-pointer" />
                <Label htmlFor="low" className="text-green-500 text-xs bg-green-500/20 px-2 py-1 rounded">
                  Low
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" className="border-gray-600 text-yellow-500 cursor-pointer" />
                <Label htmlFor="medium" className="text-yellow-500 text-xs bg-yellow-500/20 px-2 py-1 rounded">
                  Medium
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" className="border-gray-600 text-red-500 cursor-pointer" />
                <Label htmlFor="high" className="text-red-500 text-xs bg-red-500/20 px-2 py-1 rounded">
                  High
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Due Date</Label>
            <Input
              id="date"
              type="date"
              className="cursor-pointer"
              value={editedCard.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="mr-2 cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white" disabled={isLoading}>
              {isLoading ? "Saving..." : (<><Save className="h-4 w-4" />Save Changes</>)}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
