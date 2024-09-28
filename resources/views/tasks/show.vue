<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { Comment, Task } from "@/types";
import { useDebounceFn } from '@vueuse/core';
import { useIntersectionObserver, useElementVisibility } from '@vueuse/core';
import { vOnClickOutside } from '@vueuse/components';
import Panel from "@/components/Panel.vue";
import CommentItem from '@/components/Comment.vue';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/TextInput.vue';
import TiptapEditor from '@/components/TiptapEditor.vue';
import type { OnClickOutsideHandler } from '@vueuse/core';
import { onClickOutside } from '@vueuse/core';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/toast/use-toast';
import ShadDatePicker from '@/components/ShadDatePicker.vue';
import TaskDependencies from '@/components/TaskDependencies.vue';

import { cn } from '@/lib/utils';
import
{
    today,
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
} from '@internationalized/date';

import { BiCheckCircle, BiCircle, BiHourglass, BiDashCircle } from "oh-vue-icons/icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxPortal, ComboboxRoot } from 'radix-vue';
import { Command, CommandInput, CommandEmpty, CommandList, CommandItem, CommandGroup } from '@/components/ui/command';
import { Calendar } from '@/components/ui/calendar';

import
{
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import DependencySelector from '@/components/DependencySelector.vue';




const props = defineProps<{
    task: App.Data.TaskData;
    tasks: App.Data.TaskData[];
    comments: Comment[];
    sub_tasks: App.Data.TaskData[];
    users: App.Data.UserData[];
    project: App.Data.ProjectData;
}>();


const df = new DateFormatter( 'en-US', {
    dateStyle: 'long',
} );

const { toast } = useToast();
const flash = useProperty( 'flash' );

watch( flash, ( val ) =>
{
    const { error, success, warning, info } = val;
    console.log( error, success, warning, info );
    if ( error )
    {
        toast( {
            title: 'Error',
            description: error,
            variant: 'destructive',
        } );
    }

    if ( success )
    {
        toast( {
            title: '...',
            description: success,
            variant: 'success',
        } );
    }

} );

const assignedUser = ref( props.task.assigned_to ? props.task.assigned_to.id.toString() : '' );

const showAssigneeInput = ref( false );

const assignUser = ( userId ) =>
{
    assignedUser.value = userId;
    router.put( route( 'tasks.assign', { task: props.task.id } ), {
        data: {
            user_id: userId, // The Command component will only call this when a user is selected
        },
        preserveState: false,
        preserveScroll: true,
    } );
};



const debouncedUpdateTask = useDebounceFn( ( task ) => updateTask( task ), 500 ); // Adjust

const updateDueDate = ( newDate: string | null ) =>
{
    console.log( 'update due date: ', newDate );
    debouncedUpdateTask( { id: props.task.id, due_date: newDate ? new Date( newDate ).toISOString() : null } );
};

const updateTaskStatus = ( newStatus ) =>
{
    debouncedUpdateTask( { id: props.task.id, status: newStatus } );
};

// const taskDueDate = ref(props.task.due_date)

const subtasks = computed( () => props.sub_tasks || [] );
const newSubtask = ref( '' );

const addSubtask = ( tasks, index: number ) =>
{
    if ( newSubtask.value.trim() )
    {
        // subtasks.value.push( newSubtask.value.trim() );
        const newTask = newSubtask.value;
        createSubTask( newTask, () =>
        {
            newSubtask.value = '';
            const previousId = props.task.sub_tasks ? props.task.sub_tasks.at( -1 ).id : props.task.id;
        } );

    }
};

const handleKeySubtaskDown = ( event: KeyboardEvent, index: number ) =>
{

    if ( event.key === 'Enter' )
    {
        event.preventDefault();
        if ( index === subtasks.value.length )
        {
            addSubtask( subtasks.value[ index ], index );
        } else
        {
            // Focus the next input
            const nextInput = document.querySelector( `input[data-index="${ index + 1 }"]` ) as HTMLInputElement;
            if ( nextInput ) nextInput.focus();
        }
    }
};

const root = ref( null );
const target = ref( null );
const isVisible = ref( false );

// const { isActive, pause, resume } = useIntersectionObserver(
//     target,
//     ( [ { isIntersecting } ] ) =>
//     {
//         console.log( isIntersecting );
//         isVisible.value = isIntersecting;
//     },
//     { root },
// );

const targetIsVisible = useElementVisibility( target );

const commentForm = useForm( {
    method: "POST",
    url: route( "task.comments.store", { task: props.task } ),
    fields: {
        body: "",
        commentable_id: props.task.id,
        commentable_type: 'task'
    },
    hooks: {
        success: ( payload: any, context: any ) =>
        {
            console.log( "comment added", payload, context );
            commentForm.reset();
        },
    },
} );

const onSubmit = () =>
{
    commentForm.submitWith( {
        transform: ( fields ) => ( {
            ...fields,
            body: JSON.stringify( fields.body ),
        } )
    } );
};

const createSubTask = ( task, cb = () => { } ) =>
{
    handleUpdate( props.task.id, {
        subtasks: [ task ]
    }, cb );
};

const updateTask = ( taskInformation ) =>
{
    const { description = null, title = null, id = null, due_date = null, status = null } = taskInformation;
    const data = {};

    if ( description )
    {
        data[ 'description' ] = JSON.stringify( description );
    }

    if ( title )
    {
        data[ 'title' ] = title;
    }

    if ( due_date !== false || due_date !== null )
    {
        data[ 'due_date' ] = due_date === false ? false : due_date;
    }

    if ( status )
    {
        data[ 'status' ] = status;
    }

    handleUpdate( id, data );

};

watch( props.task.description, ( newDescription ) =>
{
    console.log( 'new description', newDescription );
    debouncedUpdateTask( { id: props.task.id, description: newDescription } );
} );

const handleUpdate = ( id, data = {}, cb = () => { } ) =>
{
    router.put( route( 'tasks.update', { task: id } ), {
        preserveState: false,
        data,
        hooks: {
            success: () => router.reload( { only: [ 'sub_tasks', 'task', 'comments' ] } ),
            after: () => cb()
        }
    } );


};

const showSubtasks = ref( false );

const deleteSubtask = ( subtaskId ) =>
{
    router.delete( route( 'tasks.destroy', { task: subtaskId } ), {
        preserveState: false,
        preserveScroll: true,
        hooks: {
            success: () =>
            {
                router.reload( { only: [ 'sub_tasks', 'task', 'comments' ] } );
            },
            error: ( error ) =>
            {
                console.error( 'Failed to delete subtask:', error );
                alert( 'Failed to delete subtask. Please try again.' );
            },
        },
    } );
};

const contextMenu = ref( { show: false, x: 0, y: 0, subtaskId: null } );

const showContextMenu = ( event: MouseEvent, subtaskId: number ) =>
{
    event.preventDefault();
    contextMenu.value = {
        show: true,
        x: event.clientX,
        y: event.clientY,
        subtaskId,
    };
};

const hideContextMenu = () =>
{
    contextMenu.value.show = false;
};

const toggleSubtaskCompletion = ( subtaskId: number ) =>
{
    router.post( route( 'tasks.toggle-completion', { task: subtaskId } ), {
        preserveState: false,
        preserveScroll: true,
    } );
};

const toggleMainTaskCompletion = () =>
{
    router.post( route( 'tasks.toggle-completion', { task: props.task.id } ), {
        preserveState: false,
        preserveScroll: true,
        hooks: {
            success: () =>
            {
                router.reload( { only: [ 'task' ] } );
            },
        },
    } );
};

const showDependencyInput = ref( false );
const newDependency = ref( '' );
const dependencyType = ref( 'blocked_by' );
const dependencySearchTerm = ref( '' );

const addDependency = ( dependencyId ) =>
{
    if ( !dependencyId ) return; // Prevent adding empty dependencies
    router.put( route( 'tasks.add-dependency', { task: props.task.id } ), {
        data: {
            dependency_id: dependencyId,
            type: dependencyType.value
        },
        preserveState: false,
        preserveScroll: true,
    } ).then( () =>
    {
        newDependency.value = ''; // Reset the select input after successful addition
        router.reload( { only: [ 'task' ] } ); // Reload the task data
    } ).catch( ( error ) =>
    {
        console.error( 'Error adding dependency:', error );
        // You can add error handling here, such as showing an error message to the user
    } );
};

const removeDependency = ( dependencyId ) =>
{
    router.put( route( 'tasks.remove-dependency', { task: props.task.id } ), {
        data: { dependency_id: dependencyId },
        preserveState: false,
        preserveScroll: true,
    } );
};

const availableTasks = computed( () =>
{
    // Ensure props.tasks is defined and is an array
    if ( !Array.isArray( props.tasks ) )
    {
        console.warn( 'props.tasks is not an array:', props.tasks );
        return [];
    }

    // Filter out tasks that are already dependencies and the current task
    const filteredTasks = props.tasks.filter( t =>
        t.id !== props.task.id &&
        !props.task.dependencies?.some( d => d.id === t.id )
    );

    // Apply search filter
    if ( dependencySearchTerm.value )
    {
        return filteredTasks.filter( t =>
            t.title.toLowerCase().includes( dependencySearchTerm.value.toLowerCase() ) ||
            ( t.project && t.project.name && t.project.name.toLowerCase().includes( dependencySearchTerm.value.toLowerCase() ) )
        );
    }

    return filteredTasks;
} );

import { onClickOutside } from '@vueuse/core';

const dependencySelectorRef = ref( null );
const dependencyTypeRef = ref( null );
const dependencyListRef = ref( null );

onClickOutside( dependencySelectorRef, ( event ) =>
{
    console.log( 'Click outside?', dependencyTypeRef );
    if ( !dependencyTypeRef.value?.contains( event.target ) )
    {
        showDependencyInput.value = false;
    }
}, { ignore: [ dependencyTypeRef, dependencyListRef ] } );

const showTaskDueDateSelect = ref( false );

function filterFunction ( list: any, searchTerm: string )
{
    return list.filter( ( user ) =>
    {
        return user.name.toLowerCase().includes( searchTerm.toLowerCase() );
    } );
}
// Add this log to check available tasks
watch( availableTasks, ( newTasks ) =>
{
    console.log( 'Available tasks:', newTasks );
} );

// Add this to check the structure of props.tasks
onMounted( () =>
{
    console.log( 'props.tasks:', props.tasks );
} );

onMounted( () =>
{
    document.addEventListener( 'click', hideContextMenu );
} );

onUnmounted( () =>
{
    document.removeEventListener( 'click', hideContextMenu );
} );

const taskDueDate = ref<DateValue>( props.task.due_date );
</script>

<template>
    <Panel>
        <template #title>
            <header class="">
                <div v-if=" targetIsVisible " class="flex items-center justify-between">
                    <Button size="sm" :variant=" task.completed ? 'secondary' : 'outline' "
                        @click=" toggleMainTaskCompletion ">
                        <v-icon :name=" !task.completed ? 'bi-check-circle' : 'io-close-circle-outline' "
                            class="mr-1"></v-icon>
                        {{ task.completed ? 'Mark Incomplete' : 'Mark Complete' }}
                    </Button>
                    <div class="actions ml-auto">

                    </div>
                </div>
                <div v-else>
                    <h3>{{ task.title }}</h3>
                </div>
            </header>
        </template>
        <template #actions=" { close } ">
            <h3 class="font-semibold">...</h3>
        </template>
        <div class="grid grid-rows-[1fr_auto] h-[calc(100%-48px)] overflow-y-scroll">
            <header>
                <div class="description p-2" ref="target">
                    <TextInput
                        class="border border-transparent transition-all hover:border-indigo-500 w-full !shadow-none text-xl font-semibold"
                        @change="debouncedUpdateTask( { id: task.id, title: task.title, description: null } )"
                        :value=" task.title " v-model=" task.title " />
                </div>

                <div class="info p-4 ">
                    <ul class="flex flex-col gap-4">
                        <li class="flex gap-2 items-center">
                            <h4 class="font-semibold text-sm flex-shrink-0">Assignee:</h4>
                            <Popover class="flex">
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" class="font-normal text-sm gap-2 p-1">
                                        <template v-if=" task.assigned_to_id ">
                                            <Avatar size="xs">
                                                <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            {{ users.find( u => u.id === task.assigned_to_id ).name }}
                                        </template>
                                        <template v-else>
                                            <span class="text-sm">Assign user</span>
                                        </template>
                                    </Button>
                                    <v-icon v-if=" task.assigned_to_id " name="io-close-outline"
                                        class="hover:bg-slate-100 hover:cursor-pointer"
                                        @click="assignUser( null )"></v-icon>
                                </PopoverTrigger>
                                <PopoverContent class="w-[300px] p-0" align="start">
                                    <Command :filter-function=" filterFunction ">
                                        <CommandInput placeholder="Type a command or search..." />
                                        <CommandEmpty class="p-0 pb-1 px-2 pt-1 text-left">No available
                                            users</CommandEmpty>
                                        <CommandList class="max-h-[300px] overflow-y-auto">
                                            <CommandGroup>
                                                <CommandItem v-for="    user in users    " :key=" user.id "
                                                    :value=" user " @select=" ( v ) =>
                                                    {
                                                        assignUser( v.detail.value.id );
                                                        showAssigneeInput.value = false;

                                                    } " class="text-xs gap-2">
                                                    <Avatar size="xs">
                                                        <AvatarImage src="https://github.com/radix-vue.png"
                                                            alt="@radix-vue" />
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>
                                                    <div class="flex items-center">

                                                        <span class="flex-grow truncate">{{ user.name }}</span>
                                                        <span
                                                            class="ml-2 text-xs text-gray-500 truncate">{{ user.email }}</span>
                                                    </div>
                                                </CommandItem>
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </li>
                        <li class="flex gap-2 items-center ">
                            <h4 class="font-semibold text-sm flex-shrink-0">Due date:</h4>
                            <ShadDatePicker v-model=" task.due_date " @update:model-value=" updateDueDate " />

                        </li>
                        <li class="grid grid-cols-[auto_1fr] items-center gap-2">
                            <h4 class="font-semibold text-sm">Projects:</h4>
                            <div>
                                <div class="bg-slate-50 px-2 py-1 text-sm inline-flex rounded-md gap-2">
                                    <span class="font-semibold">{{ task.project.name }} </span>
                                    <Select v-model=" task.status " class="p-0"
                                        @update:model-value=" updateTaskStatus ">
                                        <SelectTrigger
                                            class="w-full p-0 hover:bg-slate-200 transition focus:border-0 active:border-0 active:ring-0 focus:ring-0 px-2">
                                            <SelectValue placeholder="..." :value=" task.status " />
                                        </SelectTrigger>
                                        <SelectContent class="">
                                            <SelectItem class="" v-for=" (   status, index) in project.stages "
                                                :key=" status.id " :value=" status.slug ">
                                                {{ status.name }}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </li>
                        <li class="grid  gap-2 grid-cols-[auto_1fr]">
                            <h4 class="font-semibold text-sm">Dependencies:</h4>
                            <TaskDependencies />
                            <!-- <div class="flex flex-col gap-2 -mt-1">
                                <div class="flex">
                                    <div v-if=" task.dependencies.length " class="flex flex-wrap gap-1">
                                        <ul class="flex flex-wrap gap-1">
                                            <li v-for="    dependency in task.dependencies    " :key=" dependency.id "
                                                class="flex rounded-md items-center hover:bg-slate-100 transition p-1 text-xs flex-shrink-0 gap-1">
                                                <v-icon name="bi-check-circle" class="flex-shrink-0"></v-icon>
                                                <span class="text-xs flex-shrink-0">{{ dependency.title }}</span>
                                                <Button @click="removeDependency( dependency.id )" size="xxs"
                                                    variant="ghost" class="p-0">
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
                                                <Command class="w-full">
                                                    <CommandInput class="h-8 text-xs w-full"
                                                        placeholder="Search tasks..."
                                                        @input=" event => dependencySearchTerm = event.target.value " />
                                                </Command>
                                            </PopoverTrigger>
                                            <PopoverContent class="w-[300px] p-0" align="start"
                                                ref="dependencySelectorRef">
                                                <Command>
                                                    <CommandEmpty class="p-0 pb-1 px-2 pt-1 text-left">No available
                                                        tasks</CommandEmpty>
                                                    <CommandList class="max-h-[300px] overflow-y-auto"
                                                        ref="dependencyListRef">
                                                        <CommandGroup>
                                                            <CommandItem v-for="   task in availableTasks   "
                                                                :key=" task.id " :value=" task.title " @select=" () =>
                                                                {
                                                                    addDependency( task.id );
                                                                    showDependencyInput = false;
                                                                } " class="text-xs">
                                                                <div class="flex items-center">
                                                                    <v-icon
                                                                        :name=" task.completed ? 'bi-check-circle-fill' : 'bi-check-circle' "
                                                                        :class=" { 'text-indigo-600': task.completed } "
                                                                        class="mr-2 h-3 w-3" />
                                                                    <span
                                                                        class="flex-grow truncate">{{ task.title }}</span>
                                                                    <span v-if=" task.project "
                                                                        class="ml-2 text-xs text-gray-500 truncate">{{ task.project.name }}</span>
                                                                </div>
                                                            </CommandItem>
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div> -->
                        </li>
                        <li>
                            <h4 class="font-semibold text-sm">Fields:</h4>
                        </li>
                        <li>
                            <div class="">
                                <InputLabel value="Description" class="ml-2 mb-1" />
                                <TiptapEditor :model-value=" task.description "
                                    @update:model-value=" modelValue => debouncedUpdateTask( { id: task.id, description: modelValue } ) "
                                    class="w-full" />
                            </div>
                        </li>
                        <li>
                            <div v-if=" subtasks.length > 0 || showSubtasks ">
                                <h4 class="font-semibold text-sm">Subtasks:</h4>
                                <ul class="mt-2">
                                    <li v-for="(                         subtask, index) in subtasks" :key=" index "
                                        class="flex items-center mb-2 group"
                                        @contextmenu="showContextMenu( $event, subtask.id )">
                                        <Button @click="toggleSubtaskCompletion( subtask.id )"
                                            class="mr-2 p-0 bg-transparent hover:bg-transparent" variant="ghost"
                                            size="sm">
                                            <v-icon
                                                :name=" subtask.completed ? 'bi-check-circle-fill' : 'bi-check-circle' "
                                                :class=" { 'text-gray-400': subtask.completed } "></v-icon>
                                        </Button>
                                        <TextInput v-model=" subtask.title "
                                            @update:modelValue=" ( modelValue ) => debouncedUpdateTask( { id: subtask.id, title: modelValue } ) "
                                            :data-index=" index " class="border rounded px-2 py-1 mr-2 flex-grow"
                                            :class=" { 'bg-gray-200 !text-gray-400': subtask.completed } " />
                                    </li>
                                    <li class="flex items-center">
                                        <v-icon name="bi-check-circle" class="mr-2"></v-icon>
                                        <TextInput v-model=" newSubtask "
                                            @keydown=" ( e ) => handleKeySubtaskDown( e, subtasks.length ) "
                                            :data-index=" subtasks.length " placeholder="Enter new subtask"
                                            class="border rounded px-2 py-1 mr-2 flex-grow" />
                                    </li>
                                </ul>
                                <div v-if=" contextMenu.show "
                                    :style=" { position: 'fixed', top: `${ contextMenu.y }px`, left: `${ contextMenu.x }px` } "
                                    class="bg-white shadow-md rounded-md p-2 w-72  z-50">

                                    <Button variant="ghost" size="xs" @click="deleteSubtask( contextMenu.subtaskId )"
                                        class=" w-full flex gap-2 text-left justify-start">
                                        <v-icon name="bi-trash-fill"></v-icon>
                                        Delete task
                                    </Button>
                                    <!-- <Button size="xs" variant="ghost"
                                        class="opacity-0 group-hover:opacity-100 transition-opacity"
                                        @click="deleteSubtask( subtask.id )">
                                    </Button> -->

                                </div>
                            </div>
                            <Button v-else size="sm" @click="showSubtasks = true">+ Add subtasks</Button>
                        </li>
                    </ul>
                </div>

            </header>

            <div class="comments pb-4 bg-slate-100">
                <header class="border-b px-4 mb-3 flex items-center gap-4">
                    <h2 class="font-semibold text-sm border-b-slate-500 border-b-2 pb-2 pt-2">Comments</h2>
                    <h2 class="font-semibold text-sm pb-2 pt-2">All Activity</h2>
                </header>
                <section class="px-4">
                    <CommentItem v-for="    comment in comments    " :key=" comment.id " :comment=" comment " />
                </section>
            </div>
            <div class="bg-slate-100 border-t pb-4 sticky bottom-0">
                <div class="p-2">
                    <form @submit.prevent=" onSubmit ">
                        <div class="flex flex-col gap-2 p-2">
                            <span class="text-sm font-semibold">Add Comment</span>
                            <TiptapEditor class="border-0 w-full" type="text" name="body"
                                v-model=" commentForm.fields.body " />
                            <div class="actions flex justify-between items-center">
                                <p class="text-sm">Add comment</p>
                                <primary-button size="sm" type="submit">Submit</primary-button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    </Panel>
</template>
