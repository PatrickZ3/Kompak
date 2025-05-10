"use client"

import React from "react"
import { Edit, Trash2, GripVertical } from "lucide-react"
import { IconDotsVertical } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Prioritybadge } from "./ui/priority-badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { useDraggable } from "@dnd-kit/core"
import { useDeleteTask } from "@/hooks/useDeleteTask"
import { CardEditModal } from "@/components/ui/edit-task-modal"

export interface Story {
  id: number
  story: string
  storyID: string
  taskKey: string
  description: string
  status: string
  time: Date | string | null
  finishedTime: Date | string | null
  priority: string
  user: {
    avatar: string
    name: string
  }
}

interface StoryCardsProps {
  stories: Story[]
  setUserStories: React.Dispatch<React.SetStateAction<Story[]>>
}

export default function StoryCards({ stories, setUserStories }: StoryCardsProps) {
  const { deleteTask } = useDeleteTask()
  const [isEditModalOpen, setEditModalOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState<any | null>(null)

  const handleDelete = async (storyId: number) => {
    const success = await deleteTask(storyId)
    if (success) {
      setUserStories(prev => prev.filter(s => s.id !== storyId))
    }
  }

  const handleSaveCard = (updatedCard: any) => {
    setUserStories(prev =>
      prev.map(story =>
        story.id === Number(updatedCard.id)
          ? {
              ...story,
              story: updatedCard.title,
              description: updatedCard.description,
              status: updatedCard.status,
              priority: updatedCard.priority,
              time: new Date(updatedCard.date),
            }
          : story
      )
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:@xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {stories.map(story => (
        <DraggableCard key={story.id} story={story}>
          {({ setNodeRef, attributes, listeners, transform }) => (
            <Card
              className="@container/card relative bg-card text-card-foreground"
              style={
                transform
                  ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
                  : undefined
              }
            >
              {/* Drag Handle */}
              <div
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                className="absolute left-2 top-2 cursor-grab text-muted-foreground"
                data-ignore-drag
              >
                <GripVertical className="h-4 w-4" />
              </div>

              <CardHeader>
                <CardTitle className="text-lg font-bold tabular-nums">
                  {story.story}
                </CardTitle>
              </CardHeader>

              <div className="absolute right-4 top-4 z-10" data-ignore-drag>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground transition cursor-pointer">
                      <IconDotsVertical className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem
                      className="flex items-center hover:bg-muted cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedCard({
                          id: story.id.toString(),
                          title: story.story,
                          taskKey: story.storyID,
                          description: story.description,
                          status: story.status,
                          priority: story.priority,
                          date: story.time
                            ? new Date(story.time).toISOString().split("T")[0]
                            : new Date().toISOString().split("T")[0],
                        })
                        setEditModalOpen(true)
                      }}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(story.id)}
                      className="flex items-center text-red-500 hover:bg-muted cursor-pointer"
                      data-ignore-drag
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center px-6">
                <Badge variant="default">{story.storyID}</Badge>
                <CardDescription className="pl-2 text-xs">
                  {formatTimeLabel(story)}
                </CardDescription>
              </div>

              <CardDescription className="px-6 h-8 truncate-2-lines">
                {story.description}
              </CardDescription>

              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="text-muted-foreground flex items-center justify-between w-full">
                  <Prioritybadge
                    variant={story.priority.toLowerCase() as "low" | "medium" | "high"}
                  >
                    {story.priority}
                  </Prioritybadge>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={story.user.avatar} alt={story.user.name} />
                    <AvatarFallback className="rounded-2xl bg-primary text-primary-foreground">
                      CN
                    </AvatarFallback>
                  </Avatar>
                </div>
              </CardFooter>
            </Card>
          )}
        </DraggableCard>
      ))}

      {isEditModalOpen && selectedCard && (
        <CardEditModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          card={selectedCard}
          onSave={handleSaveCard}
        />
      )}
    </div>
  )
}

function DraggableCard({
  story,
  children,
}: {
  story: Story
  children: (
    props: ReturnType<typeof useDraggable> & {
      setNodeRef: (node: HTMLElement | null) => void
    }
  ) => React.ReactNode
}) {
  const draggable = useDraggable({ id: `story-${story.id}` })
  return <>{children(draggable)}</>
}

function formatTimeLabel(story: Story) {
  const raw = story.status === "Done" ? story.finishedTime : story.time
  if (!raw) return ""
  const date = typeof raw === "string" ? new Date(raw) : raw
  const label = story.status === "Done" ? "Finished " : ""
  return label + date.toLocaleDateString("en-US", { month: "long", day: "numeric" })
}
