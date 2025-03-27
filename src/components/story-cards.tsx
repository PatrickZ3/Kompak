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




export default function StoryCards() {

    const story = "UserStory";
    const storyID = "AA-X";
    const time = "created 2 days ago";
    const description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ";
    const priority = "Medium";

    const user = {
        avatar: "https://via.placeholder.com/48",
        name: "John Doe",
    };

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:@xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardTitle className="text-lg font-bold tabular-nums">
                        {story}
                    </CardTitle>
                </CardHeader>
                <div className='flex items-center px-6'>
                    <Badge variant="default">
                        {storyID}
                    </Badge>
                    <CardDescription className='pl-2 text-xs'>{time}</CardDescription>
                </div>
                <CardDescription className='px-6'>{description}</CardDescription>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground flex items-center justify-between w-full">
                        <Prioritybadge variant="medium">{priority}</Prioritybadge>
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="rounded-2xl bg-primary text-primary-foreground">CN</AvatarFallback>
                        </Avatar>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
