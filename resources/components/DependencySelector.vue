<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { InfoIcon, CheckIcon } from 'lucide-vue-next';

interface Status
{
    value: string;
    label: string;
}

const statuses: Status[] = [
    {
        value: 'backlog',
        label: 'Backlog',
    },
    {
        value: 'todo',
        label: 'Todo',
    },
    {
        value: 'in progress',
        label: 'In Progress',
    },
    {
        value: 'done',
        label: 'Done',
    },
    {
        value: 'canceled',
        label: 'Canceled',
    },
];

const open = ref( false );
const selectedStatus = ref<Status>();
const emit = defineEmits('selectTask')
const $props = defineProps<{
    availableTasks: App.Data.TaskData[] | null,
    dependencies: App.Data.TaskData[] | null,
    eligibleTasks: App.Data.TaskData[] | null
}>()
</script>

<template>
    <div class="flex items-center space-x-4">
        <p class="text-sm text-muted-foreground font-semibold">
            Dependencies:
        </p>
        <Button @click="open = true" variant="ghost" size="sm" v-if="!dependencies.length && !open">
            + Add Dependency
        </Button>
        <Command v-if="open">
            <CommandInput class="h-9" placeholder="Select task..." />
            <CommandEmpty>No tasks found.</CommandEmpty>
            <CommandList>
                <CommandGroup>
                    <CommandItem 
                        v-for="task in eligibleTasks" 
                        :key="task.id" 
                        :value="task.title" 
                        :disabled="!task.isEligible"
                        @select="(ev) => {
                            if (typeof ev.detail.value === 'string' && task.isEligible) {
                                emit('selectTask', task.id)
                                open = false;
                            }
                        }"
                        :class="{ 'opacity-50 cursor-not-allowed': !task.isEligible }"
                    >
                        {{ task.title }}
                        <CheckIcon class="ml-auto h-4 w-4" :class="value === task.id ? 'opacity-100' : 'opacity-0'" />
                        <Tooltip v-if="!task.isEligible">
                            <TooltipTrigger>
                                <InfoIcon class="ml-2 h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                                This task cannot be added as a dependency to avoid circular dependencies.
                            </TooltipContent>
                        </Tooltip>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
        <div v-if=" dependencies.length " class="flex gap-1">
            <ul>
                <li v-for="task in dependencies">{{ task.title }}</li>
            </ul>
            <Button size="xxs" variant="ghost">+</Button>
        </div>
    </div>
</template>
