<script setup lang="ts">
import draggable from "vuedraggable";
import type { Column, Task } from "@/types";
import { Button } from "@/components/ui/button";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { RiMoreFill } from "oh-vue-icons/icons";

addIcons(RiMoreFill);
const props = defineProps<{
    columns: Object[];
    projectId: number;
}>();

const user = useProperty<App.Data.UserData>( "security.user" );

const emit = defineEmits( [
    "updateTasks",
    "addTask",
    "addColumn",
    "deleteStage",
    "updateColumns",
    "updateStage",
] );

const localColumns = ref<Column[]>( [] );
const showAddColumnForm = ref( false );
const newColumnName = ref( "" );
const newColumnInput = ref<HTMLInputElement | null>( null );
const newTaskInput = ref<HTMLInputElement | null>( null );

watchEffect( () =>
{
    localColumns.value = JSON.parse( JSON.stringify( props.columns ) ).map(
        ( column: Column, index: any ) => ( {
            ...column,
            newTaskName: "",
            showAddTask: false,
            order: index,
            showDropdown: false,
            isEditing: false,
            editName: column.name,
        } )
    );
} );

function toggleDropdown(column: Column & any) {
    column.showDropdown = !column.showDropdown;
}

function renameStage(column: Column & any) {
    column.isEditing = true;
    column.showDropdown = false;
    nextTick(() => {
        const input = document.querySelector(`input[type="text"][value="${column.name}"]`) as HTMLInputElement;
        if (input) {
            input.focus();
        }
    });
}

function updateColumnName(column: Column & any) {
    if (column.editName.trim() !== '' && column.editName !== column.name) {
        emit('updateStage', { columnId: column.id, newName: column.editName });
        column.name = column.editName;
    }
    column.isEditing = false;
}

// Close dropdowns when clicking outside
function handleOutsideClickColumn(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
        localColumns.value.forEach((column: any) => {
            column.showDropdown = false;
        });
    }
}

onMounted(() => {
    document.addEventListener('click', handleOutsideClickColumn);
});

onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClickColumn);
});

const computedColumns = computed( {
    get: () => localColumns.value,
    set: ( value: any ) =>
    {
        localColumns.value = value;
    },
} );

const onDragChange = ( event: any, column: Column ) =>
{
    if ( event.added || event.moved )
    {
        console.log(event.added?.element)

        const {id: addedId} = event.added?.element ?? {}
        const { id: movedId } = event.moved?.element ?? {}

        updateTasksOrder(addedId ?? movedId);
    }
};

const onColumnDragChange = ( event: any ) =>
{
    if ( event.moved )
    {
        updateColumnsOrder();
    }
};

function updateTasksOrder (taskId)
{
    const updatedTasks: { id: number; status: string; order: number; }[] = [];

    computedColumns.value.forEach( ( column: any ) =>
    {
        column.tasks.forEach( ( task: any, index: any ) =>
        {
            updatedTasks.push( {
                id: task.id,
                status: column.id,
                order: index,
            } );
        } );
    } );

    emit( "updateTasks", {updatedTasks, taskId} );
}

function updateColumnsOrder ()
{
    const updatedColumns = computedColumns.value.map(
        ( column: any, index: any ) => ( {
            id: column.id,
            order: index,
        } )
    );

    console.log( updatedColumns );

    router.post(
        route( "projects.stages.updateOrder", { project: props.projectId } ),
        {
            data: {
                columns: updatedColumns,
            },
            preserveState: true,
            preserveScroll: true,
        }
    );
}

const addColumnForm = useForm( {
    method: "post",
    url: route( "projects.stages.store", { project: props.projectId } ),
    replace: false,
    preserveUrl: true,
    fields: {
        name: "",
        projectId: props.projectId,
    },
} );

async function addColumn ()
{
    try
    {
        addColumnForm.submit();
    } catch ( error )
    {
        console.error( "Error adding column:", error );
    }
}

function cancelAddColumn ()
{
    showAddColumnForm.value = false;
    newColumnName.value = "";
}

function handleKeyUp ( event: KeyboardEvent )
{
    if ( event.key === "Escape" )
    {
        const activeColumn = localColumns.value.find(
            ( column: any ) => column.showAddTask
        );
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

function selectTask ( task: App.Data.TaskData )
{
    selectedTask.value = task;
    // //   emit('selectTask', task);
    router.get( route( "tasks.show", { task: task.id } ), {
        preserveScroll: true,
        hooks: {
            success: () =>
            {
                console.log( "success" );
            },
        },
    } );
}
function showAddTaskCard ( column: Column & any )
{
    localColumns.value.forEach( ( col: any ) =>
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

function cancelAddTask ( column: any )
{
    column.showAddTask = false;
    column.newTaskName = "";
}

const maxTasksPerStage = ref<number>( user.value?.is_premium ? Infinity : 5 );

function addTask ( column: Column & any )
{
    if ( !column.newTaskName.trim() ) return;

    if ( column.tasks.length >= maxTasksPerStage.value )
    {
        alert(
            "Your account only allows you to add up to 5 tasks per stage. Please upgrade to add more."
        );
        return;
    }

    emit( "addTask", {
        name: column.newTaskName,
        description: "",
        status: column.id,
        projectId: props.projectId,
    } );

    column.newTaskName = "";
    column.showAddTask = false;
}

function handleOutsideClick ( event: MouseEvent )
{
    const target = event.target as HTMLElement;
    if ( !target.closest( ".add-task-card" ) && !target.closest( "button" ) )
    {
        localColumns.value.forEach( ( column: any ) =>
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
    if ( !target.closest( ".task-card" ) )
    {
        selectedTask.value = null;
    }
}
// Handle click outside task card, set selected task to null
onMounted( () =>
{
    document.addEventListener( "click", handleOutsideClickTaskCard );
} );

onUnmounted( () =>
{
    document.removeEventListener( "click", handleOutsideClickTaskCard );
} );

function deleteStage ( column: Column & any )
{
    console.log( "Delete stage clicked:", column.name );
    if (
        confirm(
            `Are you sure you want to delete the "${ column.name }" stage? All tasks in this stage will be moved to 'Pending'.`
        )
    )
    {
        const pendingColumn = localColumns.value.find(
            ( col: any ) => col.name.toLowerCase() === "pending"
        );
        if ( !pendingColumn )
        {
            alert(
                "Error: 'Pending' column not found. Please ensure there's a 'Pending' column before deleting stages."
            );
            return;
        }

        // Move tasks to pending
        pendingColumn.tasks = [ ...pendingColumn.tasks, ...column.tasks ];

        // Emit event to parent component to handle the stage deletion and task reassignment
        emit( "deleteStage", {
            column,
            stageId: column.id,
            tasksToReassign: column.tasks.map( ( task: Task ) => task.id ),
        } );
    }
}

onMounted( () =>
{
    document.addEventListener( "keyup", handleKeyUp );
} );

onUnmounted( () =>
{
    document.removeEventListener( "keyup", handleKeyUp );
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

<template>
    <div class="kanban-board h-[calc(100vh-160px)] sm:pb-12 p-4 bg-slate-50 px-4 flex overflow-x-auto text-slate-500"
        @click=" handleOutsideClick ">
        <draggable v-model=" computedColumns " :animation=" 200 " ghost-class="ghost-column" handle=".column-handle"
            @change=" onColumnDragChange " item-key="id" class="flex">
            <template #item=" { element: column } ">
                <div class="kanban-column flex-shrink-0 w-64 bg-slate-100 p-4 mr-4 rounded flex flex-col">
                    <div class="flex justify-between items-center mb-4 column-handle cursor-move">
                        <h3 v-if="!column.isEditing" class="text-lg text-gray-800 font-semibold">
                            {{ column.name }}
                        </h3>
                        <input v-else v-model="column.editName" @blur="updateColumnName(column)"
                            @keyup.enter="updateColumnName(column)" type="text"
                            class="text-lg text-gray-800 font-semibold bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500" />
                        <div class="relative">
                            <button @click.stop="toggleDropdown(column)" class="text-gray-500 hover:text-gray-700">
                                <oh-vue-icon name="ri-more-fill" />
                            </button>
                            <div v-if="column.showDropdown"
                                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                <a @click.stop="renameStage(column)"
                                    class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-1"><v-icon
                                        name="ri-edit-line"></v-icon>Rename section</a>
                                <a @click.stop="deleteStage(column)"
                                    class="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-1"><v-icon
                                        name="bi-trash-fill"></v-icon>Remove
                                    section</a>
                            </div>
                        </div>
                    </div>

                    <div class="flex-grow overflow-y-auto">
                        <draggable v-model=" column.tasks " :group=" { name: 'tasks', pull: true, put: true } "
                            ghost-class="ghost" @change=" ( e ) => onDragChange( e, column ) "
                            class="flex flex-col gap-2" item-key="id">
                            <template #item=" { element } ">
                                <TaskCard :task=" element " :selected=" element.id === selectedTask?.id "
                                    @select-task=" selectTask " />
                            </template>
                        </draggable>
                        <div class="mt-4">
                            <div v-if=" column.showAddTask " class="add-task-card bg-white shadow-sm p-1" @click.stop>
                                <TextInput v-model=" column.newTaskName " aria-autocomplete="none" type="text"
                                    placeholder="Write a task name"
                                    class="w-full mb-2 border-0 active:border-0 ring-0 active:ring-0 focus:ring-0 shadow-none"
                                    @keyup.enter="addTask( column )" @keyup.esc="cancelAddTask( column )"
                                    ref="newTaskInput" />
                                <div class="flex justify-end">
                                    <button @click="cancelAddTask( column )" class="text-gray-500 mr-2">
                                        Cancel
                                    </button>
                                    <PrimaryButton @click="addTask( column )" class="bg-blue-500 hover:bg-blue-600">
                                        Add
                                    </PrimaryButton>
                                </div>
                            </div>
                            <Button variant="ghost" v-else @click.stop="showAddTaskCard( column )" class="w-full">
                                <span class="text-sm">+ Add task</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </template>
        </draggable>
        <div class="kanban-column-new flex-shrink-0 w-64 bg-gray-100 p-4 mr-4 rounded">
            <Button v-if=" !showAddColumnForm " @click="showAddColumnForm = true" class="block w-full justify-center"
                variant="secondary">+ Add Column</Button>
            <form v-else @submit.prevent=" addColumn " class="bg-white p-4 rounded shadow">
                <input v-model=" addColumnForm.fields.name " type="text" placeholder="Enter column name"
                    class="w-full mb-2 p-2 border rounded" ref="newColumnInput" @keydown.esc=" cancelAddColumn " />
                <Button type="submit" class="w-full"> Save Column </Button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.ghost {
    opacity: 0.5;
    @apply bg-gray-300;
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
