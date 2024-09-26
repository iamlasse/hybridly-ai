<script setup lang="ts">
// import { Plus, Filter, Share2, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const columns = ref( [
    { id: 'todo', title: 'TO DO', count: 3 },
    { id: 'inProgress', title: 'WORK IN PROGRESS', count: 3 },
    { id: 'review', title: 'UNDER REVIEW', count: 3 },
    { id: 'completed', title: 'COMPLETED', count: 3 },
] );

const tasks = ref([
    {
        id: 1,
        title: 'List admin APIs for international pricing by country',
        type: 'Frontend Development',
        importance: 'Important',
        assignees: [ 'JW', 'CF' ],
        comments: 65,
        attachments: 70,
    },
    {
        id: 2,
        title: 'Integrate SSL web certificates into onboarding workflow',
        type: 'UX Design',
        importance: 'Important and urgent',
        assignees: [ 'JB', 'RF' ],
        comments: 52,
        attachments: 56,
    },
    // Add more tasks as needed
]);
</script>

<template>

    <div class="p-4">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Product Development</h1>
            <div class="flex gap-2">
                <Button variant="outline" size="sm">
                    <v-icon name="co-filter" class="w-4 h-4 mr-2" />
                    Filter
                </Button>
                <Button variant="outline" size="sm">
                    <v-icon name="io-share-social-outline" class="w-4 h-4 mr-2" />
                    Share
                </Button>
                <Button variant="default" size="sm">
                    <v-icon name="bi-plus" class="w-4 h-4 mr-2" />
                    New Boards
                </Button>
                <Button variant="ghost" size="sm">
                    <v-icon name="ri-more-fill" class="w-4 h-4" />
                </Button>
            </div>
        </div>
        <div class="flex gap-4 overflow-x-auto pb-4">

            <div :key="column.id" class="flex-shrink-0 w-80" v-for="column in columns">
                <div class="flex justify-between items-center mb-2">
                    <h2 class="font-semibold">{{ column.title }}</h2>
                    <Badge rounding="full" variant="primary">{{ column.count }}</Badge>
                </div>
                <div class="space-y-4">

                    <Card :key="task.id" v-for="task in tasks">
                        <CardHeader>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <CardTitle class="text-sm font-medium truncate">
                                            {{ task.title }}
                                        </CardTitle>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{{ task.title }}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardHeader>
                        <CardContent>
                            <div class="flex gap-2 mb-2 flex-nowrap">
                                <Badge  variant="secondary">{{ task.importance }}</Badge>
                                <Badge variant="secondary">{{ task.type }}</Badge>
                            </div>
                            <div class="flex -space-x-2">
                                <Avatar v-for="(assignee, index) in task.assignees" :key="index"
                                    class="w-6 h-6 border-2 border-background">
                                    <AvatarFallback>{{ assignee }}</AvatarFallback>
                                </Avatar>
                            </div>
                        </CardContent>
                        <CardFooter class="text-sm text-muted-foreground">
                            <div class="flex items-center gap-4">
                                <span>{{ task.comments }} comments</span>
                                <span>{{ task.attachments }} attachments</span>
                            </div>
                        </CardFooter>
                    </Card>

                    <Button variant="ghost" class="w-full justify-start">
                        <Plus class="w-4 h-4 mr-2" />
                        Add Card
                    </Button>
                </div>
            </div>

        </div>
    </div>
</template>
