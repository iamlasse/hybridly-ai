<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useDebounceFn, onClickOutside } from '@vueuse/core';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../components/ui/command';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../components/ui/select';

import { Button } from '../components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';
import { InfoIcon } from 'lucide-vue-next';
import type {App} from '../types/generated'

const $props = defineProps<{
    task: App.Data.TaskData,
    availableTasks: App.Data.TaskData[];
}>();

const emit = defineEmits( [ 'add-dependency', 'update-dependency', 'remove-dependency' ] );

const removeDependency = ( dependency: App.Data.TaskData ) =>
{
    if ( confirm( 'Are you sure you want to remove this dependency?' ) )
    {
        emit( 'remove-dependency', dependency.id );
    }
};

const showDependencyInput = ref(false);
const dependencyPopoverOpen = ref(false);
const dependencyInputRef = ref(null);

const dependencyListRef = ref(null);
const dependencySelectorRef = ref(null);
const dependencyTypeRef = ref(null);

onClickOutside(dependencySelectorRef, (event) => {
    if (!dependencyTypeRef.value?.contains(event.target)) {
        closeDependencyInput();
        dependencySearchTerm.value = ''
    }
}, { ignore: [dependencyTypeRef, dependencyListRef] });

const openDependencyInput = () => {
    showDependencyInput.value = true;
    dependencyPopoverOpen.value = true;
    nextTick(() => {
        // dependencyInputRef.value?.focus();
    });
};

const closeDependencyInput = () => {
    showDependencyInput.value = false;
    dependencyPopoverOpen.value = false;
};


const showUpdateDependencyInput = ref( false );
const updateDependencySelectorRef = ref( null );
onClickOutside( updateDependencySelectorRef, ( event ) =>
{
    showUpdateDependencyInput.value = false;
}, {
    ignore: [ dependencySelectorRef, dependencyTypeRef ]
} );

const dependencyType = ref( 'blocked_by' );

const addDependency = ( id: number ) =>
{

    emit( 'add-dependency', { id, type: dependencyType.value } );

    showDependencyInput.value = false;
};

const updateDependency = ( dependency: App.Data.TaskData, type: string ) =>
{
    emit( 'update-dependency', { id: dependency.id, type } );
};

const activeDependency = ref<App.Data.TaskData | null>( null );

const dependencySearchTerm = ref('');

const availableTasks = computed(() => {
    return $props.availableTasks?.filter(t =>
        t.id !== $props.task.id &&
        !$props.task.dependencies.some((d: App.Data.TaskData) => d.id === t.id)
    );
});



/**
 * Checks if adding a task as a dependency would create a circular dependency.
 *
 * @param taskId - The ID of the task to check.
 * @returns True if adding the task would create a circular dependency, false otherwise.
 */
function wouldCreateCircularDependency(taskId: number): boolean {
    const visited = new Set<number>();

    function dfs(currentTaskId: number): boolean {
        console.log(`Checking task ${currentTaskId}`);
        if (visited.has(currentTaskId)) {
            console.log(`Circular dependency detected at task ${currentTaskId}`);
            return true; // Circular dependency detected
        }

        visited.add(currentTaskId);

        const currentTask: Partial<App.Data.TaskData> = $props.availableTasks.find((t: App.Data.TaskData) => t.id === currentTaskId);
        if (!currentTask) {
            console.log(`Task ${currentTaskId} not found in dependencies`);
            return false;
        }

        console.log(`Checking dependencies of task ${currentTaskId}`, currentTask);

        // for ( const dependency of currentTask.dependencies ) {
        //     if (dfs(dependency.id)) {
        //         return true; // Circular dependency detected
        //     }
        // }

        visited.delete(currentTaskId);
        return false;
    }

    // Start the DFS from the current task
    visited.add($props.task.id);
    const result = dfs(taskId);
    console.log(`Checking if task ${taskId} would create a circular dependency: ${result}`);
    return result;
}

// Use the wouldCreateCircularDependency function in the eligibleTasks computed property
const eligibleTasks = computed(() => {
    return availableTasks.value.map(task => ({
        ...task,
        isEligible: !wouldCreateCircularDependency(task.id)
    }));
} );

const filterTasks = ( val: any, term: string ) =>
{
    dependencySearchTerm.value = term;
    // if ( !term )
    // {
        return val;
    // }
    // return val.filter( ( task: App.Data.TaskData ) =>
    // {
    //     return task.title.toLowerCase().includes( term.toLowerCase() );
    // } );
}

const filteredTasks = computed(() => {
    return eligibleTasks.value.filter((task) =>
        task.title.toLowerCase().includes(dependencySearchTerm.value.toLowerCase())
    );
});

watch(dependencySearchTerm, (value) => {
    console.log(value);
});
</script>

<template>
    <div class="flex flex-col gap-2 -mt-1">
        <div class="flex">
            <div v-if=" task.dependencies.length " class="flex flex-wrap gap-1">
                <ul class="flex flex-wrap gap-1">
                    <li v-for=" dependency in task.dependencies " :key=" dependency.id "
                        class="flex rounded-md items-center hover:bg-slate-100 transition p-1 text-xs flex-shrink-0 gap-1">
                        <Popover>
                            <PopoverTrigger>
                                <Button variant="ghost" size="xxs" class="px-1">
                                    <v-icon
                                        :name=" dependency.pivot.dependency_type === 'blocked_by' ? 'bi-hourglass' : 'bi-dash-circle' "
                                        class="flex-shrink-0 h-4"></v-icon>
                                    <span class="text-xs flex-shrink-0 ml-1">{{ dependency.title }}</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-32 p-0" ref="updateDependencySelectorRef">
                                <Select :model-value=" dependency.pivot.dependency_type "
                                    @update:model-value=" ( newType ) => updateDependency( dependency, newType ) ">
                                    <SelectTrigger class="w-32 text-xs p-1">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="blocked_by">
                                            <div class="flex items-center">
                                                <v-icon name="bi-hourglass" class="mr-2 h-4 w-4" />
                                                <span class="text-xs">Blocked by</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="is_blocking">
                                            <div class="flex items-center">
                                                <v-icon name="bi-dash-circle" class="mr-2 h-4 w-4" />
                                                <span class="text-xs">Is blocking</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </PopoverContent>
                        </Popover>
                        <Button @click="removeDependency( dependency )" size="xxs" variant="ghost" class="p-0">
                            <v-icon name="io-close-outline" class="flex-shrink-0"></v-icon>
                        </Button>
                    </li>
                </ul>
            </div>
            <div>
                <Button @click="openDependencyInput" size="xxs" variant="ghost">
                    <v-icon v-if="task.dependencies.length" name="bi-plus"></v-icon>
                    <span v-else>Add Dependencies</span>
                </Button>
            </div>
        </div>

        <div v-if="showDependencyInput" class="flex flex-col gap-2">
            <div class="flex items-center gap-2" ref="dependencyTypeRef">
                <Select v-model="dependencyType" class="flex-shrink-0">
                    <SelectTrigger class="w-24 h-7 text-xs">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="blocked_by">
                            <div class="flex items-center text-xs">
                                <v-icon name="bi-hourglass" class="mr-2 h-3 w-3" />
                                <span>Blocked by</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="is_blocking">
                            <div class="flex items-center text-xs">
                                <v-icon name="bi-dash-circle" class="mr-2 h-3 w-3" />
                                <span>Is blocking</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Popover class="flex-grow" v-model:open="dependencyPopoverOpen">
                    <PopoverTrigger asChild>
                        <Command class="w-full" :filter-function=" filterTasks ">
                            <CommandInput v-model="dependencySearchTerm" class="h-8 text-xs w-full"
                                placeholder="Search tasks..." ref="dependencyInputRef"
                                @focus=" dependencyPopoverOpen  = true" />
                        </Command>
                    </PopoverTrigger>
                    <PopoverContent class="w-[250px] p-0" align="start" ref="dependencySelectorRef">
                        <Command class="rounded-lg border shadow-md max-w-[250px]"
                            >
                            <CommandEmpty class="p-0 pb-1 px-2 pt-1 text-left">No available tasks</CommandEmpty>
                            <CommandList class="max-h-[300px] overflow-y-auto" ref="dependencyListRef">
                                <CommandGroup>
                                    <CommandItem v-for="task in filteredTasks" :key="task.id" :value="task"
                                        @select="addDependency(task.id)" @key-up:enter="addDependency(task.id)" class="text-xs gap-2">
                                        <div class="flex items-center">
                                            <span class="flex-grow truncate">{{ task.title }}</span>
                                        </div>
                                    </CommandItem>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    </div>
</template>
