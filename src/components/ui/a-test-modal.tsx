"use client"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ModalTest() {
  const [open, setOpen] = useState(false)

  return (
    <div className="h-screen w-full bg-gray-100">
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white p-4 z-[9999]">
          Modal is working
        </DialogContent>
      </Dialog>
    </div>
  )
}
