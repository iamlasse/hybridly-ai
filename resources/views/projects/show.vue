<script setup lang="ts">
import { ref, computed } from 'vue';
import
    {
        Select,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectLabel,
        SelectTrigger,
        SelectValue,
    } from '@/components/ui/select'

// import { Task } from '@/types';

const props = defineProps( {
    project: {
        type: Object,
        required: true,
    },
    users: {
        type: Array,
        required: true,
    },
} );



const localProject = ref( JSON.parse( JSON.stringify( props.project ) ) );


// New state for selected task and panel visibility
const selectedTask = ref<Task | null>( null );
const isPanelOpen = ref( false );

function addNewTask ( columnId: string )
{
    const form = newTaskForms.value.find( f => f.columnId === columnId );
    if ( form.name.trim() === '' ) return;

    console.log( form , columnId);

    // router.put( route( 'projects.tasks.store', { project: localProject.value.id } ), {
    //     data: {
    //         name: form.name,
    //         status: columnId
    //     },
    //     onSuccess: () =>
    //     {
    //         form.name = '';
    //     },
    //     preserveState: true,
    //     preserveScroll: true,
    // } );
}


const projectForm = useForm( {
    method: 'PUT',
    url: route( 'projects.update', { project: localProject.value.id } ),
    fields: {
        name: localProject.value.name,
        description: localProject.value.description,
    },
} );

const showModal = ref( false );
const form = useForm( {
    method: 'post',
    url: route ( 'projects.tasks.store', { project: localProject.value.id } ),
        fields: {
            name: ''
        }
} );

const editTitle = ref( false );
const editDescription = ref( false );

const statusDropdownOpen = ref( false );
const availableStatuses = [ 'active', 'completed', 'on_hold' ];

const showCollaboratorModal = ref( false );

function saveProject ()
{
    projectForm.submit()
}

function openModal ()
{
    showModal.value = true;
}

function closeModal ()
{
    showModal.value = false;
}

function ProjectStatus ( status )
{
    return availableStatuses.includes( status ) ? status : 'unknown';
}

function addTask ( task )
{
    const { name,
        description,
        status,
        projectId } = task;
    router.put( route( 'projects.tasks.store', { project: projectId } ), {
        data: {
            name,
            description,
            status,
            projectId
        },
        preserveScroll: true,
        preserveState: false,
        onSuccess: () =>
        {
            form.reset( 'name' );
            closeModal();
        },
    } );
}

function updateProjectStatus ( status: string )
{
    router.put( route( 'projects.update-status', localProject.value.id ), { status }, {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () =>
        {
            statusDropdownOpen.value = false;
        },
    } );
}

const collaboratorForm = useForm( {
    method: 'put',
    url: route ( 'projects.collaborators.store', { project: localProject.value.id } ),
    fields: {
        user_id: '',
    }
} );

function openCollaboratorModal ()
{
    showCollaboratorModal.value = true;
}

function closeCollaboratorModal ()
{
    showCollaboratorModal.value = false;
}

async function addCollaborator ()
{
    if ( collaboratorForm.errors.user_id )
    {
        return;
    }

    await collaboratorForm.submit( {

    } );

    showCollaboratorModal.value = false;
    router.reload( { only: [ 'project', 'users' ] } );
}

// Dummy data for dashboard elements
const projectProgress = ref( 65 );
const teamMembers = ref( [
    { name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Mike Johnson', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
] );
const upcomingDeadlines = ref( [
    { task: 'Design Review', date: '2023-06-15' },
    { task: 'Backend Integration', date: '2023-06-20' },
    { task: 'User Testing', date: '2023-06-25' },
] );
const recentActivities = ref( [
    { user: 'John Doe', action: 'completed task', task: 'Frontend Setup', time: '2 hours ago' },
    { user: 'Jane Smith', action: 'added comment', task: 'API Documentation', time: '4 hours ago' },
    { user: 'Mike Johnson', action: 'started task', task: 'Database Optimization', time: '1 day ago' },
] );


const columns = computed( () =>
{
    return props.project.stages.map( stage => ( {
        id: stage.slug,
        name: stage.name,
    } ) );
} );

const newTaskForms = ref( columns.value.map( column => ( {
    columnId: column.id,
    name: '',
} ) ) );

const renderColumns = computed( () =>
{
    return columns.value.map( column => ( {
        ...column,
        tasks: localProject.value.tasks
            .filter( task => task.status === column.id )
            .sort( ( a, b ) => a.order - b.order ),
    } ) );
} );

function updateTasks ( updatedTasks )
{
    // Update local state
    updatedTasks.forEach( updatedTask =>
    {
        const task = localProject.value.tasks.find( t => t.id === updatedTask.id );
        if ( task )
        {
            task.status = updatedTask.status;
            task.order = updatedTask.order;
        }
    } );

    // Sort tasks within each column
    renderColumns.value.forEach( column =>
    {
        column.tasks.sort( ( a, b ) => a.order - b.order );
    } );

    // Send update to server
    router.put( route( 'projects.tasks.bulk-update', { project: localProject.value.id } ), {
        data: { tasks: updatedTasks },
        preserveState: true,
        preserveScroll: true,
    } );
}

// New function to handle task selection
function selectTask ( task )
{
    selectedTask.value = task;
    isPanelOpen.value = true;
}

// Function to close the panel
function closePanel ()
{
    isPanelOpen.value = false;
}

interface Stage
{
    name: string,
    slug: string;
}

// Handle stage deletion
function deleteStage ( { stageId, tasksToReassign }: {
    stageId: string,
    tasksToReassign: number[],
} )
{
    const pendingStage = localProject.value.stages.find(
        ( stage: Stage | undefined ) => stage?.name.toLowerCase() === 'pending'
    );

    if ( !pendingStage )
    {
        return;
    }

    // Send update to server
    router.delete(
        route( 'projects.stages.destroy', {
            project: localProject.value.id,
            stage: stageId,
            tasks: tasksToReassign,
        } ),
        {
            preserveState: false,
            preserveScroll: true,
            data: {
                tasksToReassign,
                newStatus: pendingStage.slug,
            },
            onSuccess: () =>
            {
                // Optionally, add some user feedback here
            },
            onError: ( errors ) =>
            {
                // Revert local state changes if the server update fails
                localProject.value = JSON.parse( JSON.stringify( props.project ) );
            },
        }
    );
}
</script>

<template layout="dashboard">

    <div class="hidden">{{ project }}</div>

    <div class="bg-gradient-to-b from-indigo-800 via-pink-500 to-indigo-200 h-full dark:from-gray-800 dark:to-gray-900">
        <header class="flex items-center justify-end">
            <TeamMembers :collaborators=" localProject.collaborators ">
                <template #form>
                    <PrimaryButton @click=" openCollaboratorModal "
                        class="flex justify-center items-center !rounded-full w-8 h-8 p-1 -m-3 hover:bg-pink-600 transition duration-300">
                        +
                    </PrimaryButton>
                </template>
            </TeamMembers>
        </header>
        <KanBanBoard :columns=" renderColumns " :project-id=" localProject.id " @update-tasks=" updateTasks "
            @select-task=" selectTask " @add-task=" addTask " @delete-stage=" deleteStage " />
    </div>


    <Modal v-model=" showModal ">
        <template #title>
            <h3 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Add New Task to Project</h3>
        </template>
        <form @submit.prevent=" addTask " class="mt-4">
            <div class="mb-4">
                <InputLabel for="taskName" value="Task Name"
                    class="text-base font-medium text-gray-700 dark:text-gray-300" />
                <TextInput id="taskName" v-model=" form.name " @change="form.validate( 'name' )" type="text"
                    class="w-full mt-1 text-base border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="Enter the name of the new task" />
                <InputError v-if=" form.errors.name " :message=" form.errors.name " class="mt-1 text-xs text-red-600" />
            </div>
            <div class="flex justify-end mt-6">
                <PrimaryButton :disabled=" form.processing "
                    class="transition duration-300 ease-in-out transform hover:scale-105 text-sm px-4 py-2 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700">
                    Add Task</PrimaryButton>
            </div>
        </form>
    </Modal>

    <!-- Add Collaborator Modal -->
    <Modal v-model=" showCollaboratorModal ">
        {{ collaboratorForm }}
        <template #title>
            <h3 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Add Collaborator to Project</h3>
        </template>
        <form @submit.prevent=" addCollaborator " class="mt-4">
            <div class="mb-4 text-slate-500">
                <InputLabel for="collaboratorId" value="Select Collaborator"
                    class="text-base font-medium text-gray-700 dark:text-gray-300" />
                <!-- <select id="collaboratorId" v-model="collaboratorForm.fields.user_id"
                        class="w-full mt-1 text-base border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option value="">Select a user</option>
                        <option v-for="  user in users  " :key=" user.id " :value=" user.id ">{{ user.name }}</option>
                    </select> -->

                <Select v-model=" collaboratorForm.fields.user_id " class="w-full">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                        <!-- <SelectGroup> -->
                        <SelectLabel>Users</SelectLabel>
                        <SelectItem class="" v-for="  user in users  " :key=" user.id " :value=" user.id ">
                            {{ user.name }}
                        </SelectItem>
                        <!-- </SelectGroup> -->
                    </SelectContent>
                </Select>
                <InputError v-if=" collaboratorForm.errors.user_id " :message=" collaboratorForm.errors.user_id "
                    class="mt-1 text-xs text-red-600" />
            </div>
            <div class="flex justify-end mt-6">
                <PrimaryButton :disabled=" collaboratorForm.processing || !collaboratorForm.fields.user_id "
                    class="transition disabled:opacity-50 duration-300 ease-in-out transform text-sm px-4 py-2 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700">
                    Add Collaborator
                </PrimaryButton>
            </div>
        </form>
    </Modal>

</template>
