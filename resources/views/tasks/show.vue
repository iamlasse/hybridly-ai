<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { Comment, Task } from "@/types";
import { useDebounceFn } from '@vueuse/core';
import { useIntersectionObserver, useElementVisibility } from '@vueuse/core';
import Panel from "@/components/Panel.vue";
import CommentItem from '@/components/Comment.vue';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/TextInput.vue';
import TiptapEditor from '@/components/TiptapEditor.vue';
import { ref as vueRef } from 'vue';
import { BiCheckCircle, BiCircle } from "oh-vue-icons/icons";

const props = defineProps<{
    task: App.Data.TaskData;
    comments: Comment[];
    sub_tasks: App.Data.TaskData[];
}>();


const debouncedUpdateTask = useDebounceFn( ( task ) => updateTask( task ), 500 ); // Adjust

const updateDueDate = (newDate) => {
    console.log(newDate);
    debouncedUpdateTask({ id: props.task.id, due_date: newDate ? newDate.toISOString().split('T')[0] : null });
};

const taskDueDate = ref(props.task.due_date)

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
    },
    hooks: {
        success: ( payload: any, context: any ) =>
        {
            console.log( "comment added", payload, context );
        },
    },
} );

const onSubmit = () =>
{
    commentForm.submitWith( {
        preserveState: false,
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
    const { description = null, title = null, id = null, due_date = null } = taskInformation;
    const data = {};

    if ( description )
    {
        data[ 'description' ] = JSON.stringify( description );
    }

    if ( title )
    {
        data[ 'title' ] = title;
    }

    if ( due_date !== false || due_date !== null  )
    {
        data['due_date'] = due_date === false ? false : due_date
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

const toggleMainTaskCompletion = () => {
    router.post( route( 'tasks.toggle-completion', { task: props.task.id } ), {
        preserveState: false,
        preserveScroll: true,
        hooks: {
            success: () => {
                router.reload({ only: ['task'] });
            },
        },
    } );
};

onMounted( () =>
{
    document.addEventListener( 'click', hideContextMenu );
} );

onUnmounted( () =>
{
    document.removeEventListener( 'click', hideContextMenu );
} );
</script>

<template>
    <Panel>
        <template #title>
            <header class="">
                <div v-if=" targetIsVisible " class="flex items-center justify-between">
                    <Button size="sm" :variant=" task.completed ? 'secondary' : 'outline'" @click="toggleMainTaskCompletion">
                        <v-icon :name=" !task.completed ? 'bi-check-circle' : 'io-close-circle-outline'" class="mr-1"></v-icon>
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
                        <li>
                            <h4 class="font-semibold text-sm">Assignee:</h4>
                        </li>
                        <li class="flex gap-2 items-center">
                            <h4 class="font-semibold text-sm flex-grow flex-shrink-0">Due date:
                            </h4>
                            <VueDatePicker format="MM/dd/yyyy" :enable-time-picker=" false " v-model="task.due_date"
                                @update:model-value=" (modelValue) => updateDueDate(modelValue)" />
                        </li>
                        <li>
                            <h4 class="font-semibold text-sm">Projects:</h4>
                        </li>
                        <li>
                            <h4 class="font-semibold text-sm">Dependencies:</h4>
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
                                    <li v-for="(                      subtask, index) in subtasks" :key=" index "
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

            <div class="comments pb-4 p-6 bg-slate-100">
                <CommentItem
                    v-for="                                                                                                                                                                                                                                                                                   comment in comments                                                                                                                                                                                                                                                                                   "
                    :key=" comment.id " :comment=" comment " />
            </div>
            <div class="bg-slate-100 border-t pb-4 sticky bottom-0">
                <div class="   ">
                    <form @submit.prevent=" onSubmit ">
                        <div class="flex flex-col gap-2 p-2">
                            <TextInput class="border-0 w-full" type="text" name="body"
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
