import React from 'react'
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import { Prioritybadge } from './ui/priority-badge'
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'

interface Story {
    id: number
    story: string       
    storyID: string    
    description: string 
    status: string      
    time: Date  
    finishedTime: Date     
    priority: string   
    user: {
        avatar: string    
        name: string      
    }
}

interface StoryCardsProps {
    stories: Story[];
}


export default function StoryCards({ stories }: StoryCardsProps) {
    function formatTimeLabel(story: Story) {
        if (story.status === "Done") {
          return (
            "Finished " +
            story.time.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })
          )
        }
      
        return story.time.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        })
      }
    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:@xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {stories.map((story) => (
                <Card className="@container/card" data-slot="card" key={story.id}>
                    <CardHeader>
                        <CardTitle className="text-lg font-bold tabular-nums">
                            {story.story}
                        </CardTitle>
                    </CardHeader>

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
            ))}
        </div>
    )
}