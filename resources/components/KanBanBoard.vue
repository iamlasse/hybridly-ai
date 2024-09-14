<template>
    <div class="kanban-board h-full max-h-[85vh] px-4 flex overflow-x-auto text-slate-500"
        @click=" handleOutsideClick ">
        <draggable v-model=" computedColumns " :animation=" 200 " ghost-class="ghost-column" handle=".column-handle"
            @change=" onColumnDragChange " item-key="id" class="flex">
            <template #item=" { element: column } ">
                <div class="kanban-column flex-shrink-0 w-64 bg-gray-100 p-4 mr-4 rounded  overflow-y-scroll">
                    <div class="flex justify-between items-center mb-4 column-handle cursor-move">
                        <h3 class="text-lg text-gray-800 font-semibold">{{ column.name }}</h3>
                        <span class="group">
                            <button @click.stop="deleteStage( column )"
                                class="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </span>
                    </div>

                    <draggable v-model=" column.tasks " :group=" { name: 'tasks', pull: true, put: true } "
                        ghost-class="ghost" @change=" ( e ) => onDragChange( e, column ) "
                        class=" flex flex-col gap-2 h-full" item-key="id">
                        <template #item=" { element } ">
                            <TaskCard :task=" element " :selected=" element.id === selectedTask?.id "
                                @select-task=" selectTask " />
                        </template>
                    </draggable>

                    <div v-if=" column.showAddTask " class="add-task-card bg-white shadow-sm p-1" @click.stop>
                        <TextInput v-model=" column.newTaskName " type="text" placeholder="Write a task name"
                            class="w-full mb-2 border-0 active:border-0 ring-0 active:ring-0 focus:ring-0 shadow-none "
                            @keyup.enter="addTask( column )" @keyup.esc="cancelAddTask( column )" ref="newTaskInput" />
                        <div class="flex justify-end">
                            <button @click="cancelAddTask( column )" class="text-gray-500 mr-2">Cancel</button>
                            <PrimaryButton @click="addTask( column )" class="bg-blue-500 hover:bg-blue-600">
                                Add
                            </PrimaryButton>
                        </div>
                    </div>
                    <button v-else @click.stop="showAddTaskCard( column )"
                        class="w-full text-center hover:bg-slate-200 rounded-md p-2 text-gray-500 hover:text-gray-700 text-sm mt-2">
                        + Add task
                    </button>
                </div>
            </template>
        </draggable>
        <div class="kanban-column-new flex-shrink-0 w-64 bg-gray-100 p-4 mr-4 rounded">
            <button v-if=" !showAddColumnForm " @click="showAddColumnForm = true"
                class="block w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">+ Add
                Column</button>
            <form v-else @submit.prevent=" addColumn " class="bg-white p-4 rounded shadow">
                <input v-model=" addColumnForm.fields.name " type="text" placeholder="Enter column name"
                    class="w-full mb-2 p-2 border rounded" ref="newColumnInput" @keydown.esc=" cancelAddColumn ">
                <button type="submit"
                    class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Save Column
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import type { Column } from '@/types';
const props = defineProps<{
    columns: Object[];
    projectId: number;
}>();

const emit = defineEmits( [ 'updateTasks', 'addTask', 'addColumn', 'deleteStage', 'updateColumns' ] );

const localColumns = ref<Column[]>( [] );
const showAddColumnForm = ref( false );
const newColumnName = ref( '' );
const newColumnInput = ref<HTMLInputElement | null>( null );
const newTaskInput = ref<HTMLInputElement | null>( null );

watchEffect( () =>
{
    localColumns.value = JSON.parse( JSON.stringify( props.columns ) ).map( ( column: Column, index: any ) => ( {
        ...column,
        newTaskName: '',
        showAddTask: false,
        order: index
    } ) );
} );

const computedColumns = computed( {
    get: () => localColumns.value,
    set: ( value: any ) =>
    {
        localColumns.value = value;
    }
} );

const onDragChange = ( event: any, column: Column ) =>
{
    if ( event.added || event.moved )
    {
        updateTasksOrder();
    }
};

const onColumnDragChange = ( event: any ) =>
{
    if ( event.moved )
    {
        updateColumnsOrder();
    }
};

function updateTasksOrder ()
{
    const updatedTasks: { id: number; status: string; order: number; }[] = [];

    computedColumns.value.forEach( ( column: any ) =>
    {
        column.tasks.forEach( ( task: any, index: any ) =>
        {
            updatedTasks.push( {
                id: task.id,
                status: column.id,
                order: index
            } );
        } );
    } );

    emit( 'updateTasks', updatedTasks );
}

function updateColumnsOrder ()
{
    const updatedColumns = computedColumns.value.map( ( column: any, index: any ) => ( {
        id: column.id,
        order: index
    } ) );

    console.log( updatedColumns );


    router.post( route( 'projects.stages.updateOrder', { project: props.projectId } ), {
        data: {
            columns: updatedColumns
        },
        preserveState: true,
        preserveScroll: true
    } );
}

const addColumnForm = useForm( {
    method: 'post',
    url: route( 'projects.stages.store', { project: props.projectId } ),
    fields: {
        name: '',
        projectId: props.projectId,
    }
} );

async function addColumn ()
{
    try
    {
        addColumnForm.submit();
    } catch ( error )
    {
        console.error( 'Error adding column:', error );
    }
}

function cancelAddColumn ()
{
    showAddColumnForm.value = false;
    newColumnName.value = '';
}

function handleKeyUp( event: KeyboardEvent )
{
    if ( event.key === 'Escape' )
    {
        const activeColumn = localColumns.value.find( column => column.showAddTask );
        if ( activeColumn )
        {
            cancelAddTask( activeColumn );
        } else if ( showAddColumnForm.value )
        {
            cancelAddColumn();
        }
    }
}

const selectedTask = ref<App.Data.TaskData | null>( null );

function selectTask(task: App.Data.TaskData ) {
    // if ( task.id === selectedTask.value?.id )
    // {
    //     selectedTask.value = null;
    //     return;
    // }

    console.log('select task', task?.id);

    selectedTask.value = task;
    // //   emit('selectTask', task);
    router.get(route('tasks.show', { task: task.id }), {
        preserveScroll: true,
        hooks: {
            success: () => {
                console.log('success');
            }
        }
    });
}function showAddTaskCard ( column: Column )
{
    localColumns.value.forEach( col =>
    {
        if ( col.id !== column.id )
        {
            col.showAddTask = false;
        }
    } );

    column.showAddTask = true;
    nextTick( () =>
    {
        if ( newTaskInput.value )
        {
            newTaskInput.value.focus();
        }
    } );
}

function cancelAddTask ( column: Column )
{
    column.showAddTask = false;
    column.newTaskName = '';
}

function addTask ( column: Column )
{
    if ( !column.newTaskName.trim() ) return;

    emit( 'addTask', {
        name: column.newTaskName,
        description: '',
        status: column.id,
        projectId: props.projectId
    } );

    column.newTaskName = '';
    column.showAddTask = false;
}

function handleOutsideClick ( event: MouseEvent )
{
    const target = event.target as HTMLElement;
    if ( !target.closest( '.add-task-card' ) && !target.closest( 'button' ) )
    {
        localColumns.value.forEach( column =>
        {
            if ( column.showAddTask )
            {
                cancelAddTask( column );
            }
        } );
    }
}

function handleOutsideClickTaskCard ( event: MouseEvent )
{
    const target = event.target as HTMLElement;
    if ( !target.closest( '.task-card' ) )
    {
        selectedTask.value = null;
    }
}
// Handle click outside task card, set selected task to null
onMounted( () =>
{
    document.addEventListener( 'click', handleOutsideClickTaskCard );
} );

onUnmounted( () =>
{
    document.removeEventListener( 'click', handleOutsideClickTaskCard );
} );

function deleteStage ( column: Column )
{
    console.log( 'Delete stage clicked:', column.name );
    if ( confirm( `Are you sure you want to delete the "${ column.name }" stage? All tasks in this stage will be moved to 'Pending'.` ) )
    {
        const pendingColumn = localColumns.value.find( col => col.name.toLowerCase() === 'pending' );
        if ( !pendingColumn )
        {
            alert( "Error: 'Pending' column not found. Please ensure there's a 'Pending' column before deleting stages." );
            return;
        }

        // Move tasks to pending
        pendingColumn.tasks = [ ...pendingColumn.tasks, ...column.tasks ];

        // Emit event to parent component to handle the stage deletion and task reassignment
        emit( 'deleteStage', {
            stageId: column.id,
            tasksToReassign: column.tasks.map( task => task.id )
        } );
    }
}



onMounted( () =>
{
    document.addEventListener( 'keyup', handleKeyUp );
} );

onUnmounted( () =>
{
    document.removeEventListener( 'keyup', handleKeyUp );
} );

watchEffect( () =>
{
    if ( showAddColumnForm.value )
    {
        nextTick( () =>
        {
            newColumnInput.value?.focus();
        } );
    }
} );
</script>

<style scoped>
.ghost {
    opacity: 0.5;
    @apply bg-gray-300
}

.ghost-column {
    opacity: 0.5;
    background: #e2e8f0;
}

.kanban-board {
    min-height: 400px;
}

.column-handle {
    cursor: move;
}
</style>
