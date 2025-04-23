"use client"
import React from 'react'
import {
    IconDotsVertical,
} from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Prioritybadge } from './ui/priority-badge'
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

import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { useDraggable } from "@dnd-kit/core";


export interface Story {
    id: number
    story: string
    storyID: string
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
    stories: Story[];
}

function DraggableCard({ story, children }: { story: Story, children: React.ReactNode }) {
    // use a unique id like "story-<id>" for each draggable card
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `story-${story.id}`,
    });

    // Optionally apply transformation styles if needed
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
}

function formatTimeLabel(story: Story) {
    const raw = story.status === "Done" ? story.finishedTime : story.time;

  
    if (!raw) return ""; // prevent "Invalid time value" crash
  
    const date = typeof raw === "string" ? new Date(raw) : raw;
  
    const label = story.status === "Done" ? "Finished " : "";
  
    return (
      label +
      date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })
    );
  }



export default function StoryCards({ stories }: StoryCardsProps) {
    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:@xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {stories.map((story) => (
                <DraggableCard key={story.id} story={story}>
                    <Card className="@container/card relative" data-slot="card" key={story.id}>
                        <CardHeader>
                            <CardTitle className="text-lg font-bold tabular-nums">
                                {story.story}
                            </CardTitle>

                        </CardHeader>
                        <div className="absolute right-4 top-4 ">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="text-muted-foreground hover:text-foreground transition cursor-pointer">
                                        <IconDotsVertical className="w-4 h-4" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-32">
                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                    <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="flex items-center px-6">
                            <Badge variant="default">{story.storyID}</Badge>
                            <CardDescription className="pl-2 text-xs">
                                {formatTimeLabel(story)}
                            </CardDescription>
                        </div>

                        <CardDescription className="px-6 h-8 truncate-2-lines">{story.description}</CardDescription>

                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="text-muted-foreground flex items-center justify-between w-full">
                                <Prioritybadge variant={story.priority.toLowerCase() as "low" | "medium" | "high"}>{story.priority}</Prioritybadge>
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={story.user.avatar} alt={story.user.name} />
                                    <AvatarFallback className="rounded-2xl bg-primary text-primary-foreground">
                                        CN
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </CardFooter>
                    </Card>
                </DraggableCard>
            ))}
        </div>
    )
}