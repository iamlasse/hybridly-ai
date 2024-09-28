<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDebounceFn, onClickOutside } from '@vueuse/core';

import
    {
        Command,
        CommandEmpty,
        CommandGroup,
        CommandInput,
        CommandItem,
        CommandList,

    } from '@/components/ui/command'

import
    {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,

} from '@/components/ui/select'


import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'


const $props = defineProps<{
    task: App.Data.TaskData,
    dependencies: App.Data.TaskData[]
}>()

const emit = defineEmits(['add-dependency', 'update-dependency', 'remove-dependency'])

const removeDependency = (id: number) => {
    if (confirm('Are you sure you want to remove this dependency?')) {
        emit('remove-dependency', id)
    }
}

const showDependencyInput = ref( false )

const dependencyListRef = ref(null)
const dependencySelectorRef = ref(null)
const dependencyTypeRef = ref(null)

onClickOutside( dependencySelectorRef, ( event ) =>
{
    console.log( 'Click outside?', dependencyTypeRef );
    if ( !dependencyTypeRef.value?.contains( event.target ) )
    {
        showDependencyInput.value = false;
    }
}, { ignore: [ dependencyTypeRef, dependencyListRef ] } );


const dependencyType = ref( 'blocked_by' )

const addDependency = (id: number) => {

    emit('add-dependency', {id, type: dependencyType.value})

    showDependencyInput.value = false
}

const updateDependency = (id: number) => {
    emit('update-dependency', {id, type: dependencyType.value})

    showDependencyInput.value = false
}

const dependencySearchTerm = ref( '' )

const availableTasks = computed(() => {
    return $props.dependencies?.filter(t =>
        t.id !== $props.task.id &&
        !$props.task.dependencies.some((d: App.Data.TaskData) => d.id === t.id)
    )
} )

function filterFunction ( list: any, searchTerm: string )
{
    return list.filter( ( task: App.Data.TaskData ) =>
    {
        return task.title.toLowerCase().includes( searchTerm.toLowerCase() );
    } );
}
</script>

<template>
    <div class="flex flex-col gap-2 -mt-1">
        <div class="flex">
            <div v-if=" task.dependencies.length " class="flex flex-wrap gap-1">
                <ul class="flex flex-wrap gap-1">
                    <li v-for="     dependency in task.dependencies     " :key=" dependency.id "
                        class="flex rounded-md items-center hover:bg-slate-100 transition p-1 text-xs flex-shrink-0 gap-1">
                        <v-icon name="bi-check-circle" class="flex-shrink-0"></v-icon>
                        <span class="text-xs flex-shrink-0">{{ dependency.title }}</span>
                        <Button @click="removeDependency( dependency.id )" size="xxs" variant="ghost" class="p-0">
                            <v-icon name="io-close-outline" class="flex-shrink-0"></v-icon>
                        </Button>
                    </li>
                </ul>
            </div>
            <div>
                <Button @click="showDependencyInput = true" size="xxs" variant="ghost">
                    <v-icon v-if=" task.dependencies.length " name="bi-plus"></v-icon>
                    <span v-else>Add Dependencies</span>
                </Button>
            </div>
        </div>

        <div v-if=" showDependencyInput " class="flex flex-col gap-2">
            <div class="flex items-center gap-2" ref="dependencyTypeRef">
                <Select v-model=" dependencyType " class="flex-shrink-0">
                    <SelectTrigger class="w-28 h-8 text-xs">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="blocked_by">
                            <div class="flex items-center">
                                <v-icon name="bi-hourglass" class="mr-2 h-4 w-4" />
                                <span>Blocked by</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="is_blocking">
                            <div class="flex items-center">
                                <v-icon name="bi-dash-circle" class="mr-2 h-4 w-4" />
                                <span>Is blocking</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
                <Popover class="flex-grow">
                    <PopoverTrigger asChild>
                        <Command class="w-full" :filter-function=" filterFunction ">
                            <CommandInput class="h-8 text-xs w-full" placeholder="Search tasks..."
                                @input=" (event) => dependencySearchTerm = event.target.value " />
                        </Command>
                    </PopoverTrigger>
                    <PopoverContent class="w-[300px] p-0" align="start" ref="dependencySelectorRef">
                        <Command>
                            <CommandEmpty class="p-0 pb-1 px-2 pt-1 text-left">No available
                                tasks</CommandEmpty>
                            <CommandList class="max-h-[300px] overflow-y-auto" ref="dependencyListRef">
                                <CommandGroup>
                                    <CommandItem v-for="      task in dependencies      " :key=" task.id " :value=" task " @select=" ( v ) =>
                                    {
                                        addDependency( v.detail.value.id )

                                    } " class="text-xs gap-2">
                                        <Avatar size="xs">
                                            <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div class="flex items-center">

                                            <span class="flex-grow truncate">{{ task.title }}</span>
                                        </div>
                                    </CommandItem>
                                    <!-- <CommandItem v-for="    task in availableTasks    " :key=" task.id "
                                        :value=" task " @select=" (v) => {
                                            const selectedTask = v.detail.value ?? null
                                            if(!selectedTask.id ) return
                                            addDependency( selectedTask.id );
                                            showDependencyInput = false;
                                        } " class="text-xs">
                                        <div class="flex items-center">
                                            <v-icon
                                                :name=" task.completed ? 'bi-check-circle-fill' : 'bi-check-circle' "
                                                :class=" { 'text-indigo-600': task.completed } " class="mr-2 h-3 w-3" />
                                            <span class="flex-grow truncate">{{ task.title }}</span>
                                            <span v-if=" task.project "
                                                class="ml-2 text-xs text-gray-500 truncate">{{ task.project.name }}</span>
                                        </div>
                                    </CommandItem> -->
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    </div>
</template>

