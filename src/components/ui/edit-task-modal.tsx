"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import {  Save } from "lucide-react"
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
  card?: {
    id: string
    taskKey: string
    title: string
    description: string
    status: "To Do" | "In Progress" | "Done"
    priority: "High" | "Medium" | "Low"
    date?: string
  }
  onSave: (card: any) => void
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
  console.log("Edited Card:", editedCard)
  const handleChange = (field: string, value: string) => {
    setEditedCard({ ...editedCard, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedCard)
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
  
      // Map Supabase response into the modal's format
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
          data.priority.slice(1).toLowerCase(), // e.g. "LOW" → "Low"
        date: data.dateCreated?.split("T")[0],
      });
    };
  
    fetchTaskDetails();
  }, [card?.id]);
  

  return (
    
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] z-[1000]" style={{ position: "fixed" }}>
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
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
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

          <div className="space-y-2">
            <Label htmlFor="date">Due Date</Label>
            <Input
              id="date"
              type="date"
              value={editedCard.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="mr-2 cursor-pointer">
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
