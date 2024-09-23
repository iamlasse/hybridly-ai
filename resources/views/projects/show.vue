<script setup lang="ts">
import { ref, computed } from "vue";
import { can } from "hybridly";
import { Task } from "~/resources/types";

import
    {
        SelectContent,
        SelectValue,
        SelectItem,
        SelectTrigger,
        SelectLabel,
        Select,
    } from "@/components/ui/select";

const props = defineProps<{
    project: App.Data.ProjectData;
    users: App.Data.UserData[];
}>();

const user = useProperty( "security.user" );

const canAddCollaborators = can( props.project, "addCollaborators" );

const localProject = computed( () => props.project );

// New state for selected task and panel visibility
const selectedTask = ref<App.Data.TaskData | null>( null );
const isPanelOpen = ref( false );

const projectForm = useForm( {
    method: "PUT",
    url: route( "projects.update", { project: localProject.value.id } ),
    fields: {
        name: localProject.value.name,
        description: localProject.value.description,
    },
} );

const showModal = ref( false );
const form = useForm( {
    method: "post",
    url: route( "projects.tasks.store", { project: localProject.value.id } ),
    fields: {
        name: "",
    },
} );

const editTitle = ref( false );
const editDescription = ref( false );

const statusDropdownOpen = ref( false );
const availableStatuses = [ "active", "completed", "on_hold" ];

const showCollaboratorModal = ref( false );

function saveProject ()
{
    projectForm.submit();
}

function openModal ()
{
    showModal.value = true;
}

function closeModal ()
{
    showModal.value = false;
}

function ProjectStatus ( status: string )
{
    return availableStatuses.includes( status ) ? status : "unknown";
}

function addTask (
    task: App.Data.TaskData & { name: string; projectId: number; }
)
{
    const { name, description, status, projectId } = task;
    router.put( route( "projects.tasks.store", { project: projectId } ), {
        data: {
            name,
            description,
            status,
            projectId,
        },
        preserveScroll: true,
        preserveState: false,
        preserveUrl: true,
        hooks: {
            success: () =>
            {
                form.reset();
            },
        },
    } );
}

function updateProjectStatus ( status: string )
{
    router.put( route( "projects.update-status", localProject.value.id ), {
        data: { status },
        preserveScroll: true,
        preserveState: true,
        preserveUrl: true,
        hooks: {
            success: () =>
            {
                statusDropdownOpen.value = false;
            },
        },
    } );
}

const collaboratorForm = useForm( {
    method: "PUT",
    url: route( "projects.collaborators.store", {
        project: localProject.value.id,
    } ),
    fields: {
        user_id: "",
    },
    hooks: {
        success: ( payload: any, context: any ) =>
        {
            console.log( "collaborator added", payload, context );
            // router.reload( { only: [ 'users' ] } )
            closeCollaboratorModal();
        },
        fail: ( context: any ) =>
        {
            console.log( "fail", context );
        },
    },
} );

function addCollaborator ()
{
    collaboratorForm.submit();
}

function openCollaboratorModal ()
{
    showCollaboratorModal.value = true;
}

function closeCollaboratorModal ()
{
    showCollaboratorModal.value = false;
}

const columns = computed( () =>
{
    return props.project.stages.map( ( stage: any ) => ( {
        id: stage.slug,
        name: stage.name,
    } ) );
} );

const newTaskForms = ref(
    columns.value.map( ( column: any ) => ( {
        columnId: column.id,
        name: "",
    } ) )
);

const renderColumns = computed( () =>
{
    return columns.value.map( ( column: any ) => ( {
        ...column,
        tasks: localProject.value.tasks
            ?.filter( ( task: App.Data.TaskData ) => task.status === column.id )
            .sort( ( a: App.Data.TaskData, b: App.Data.TaskData ) => a.order - b.order ),
    } ) );
} );

function updateTasks ( updatedTasks: any )
{
    // Update local state
    updatedTasks.forEach( ( updatedTask: Task ) =>
    {
        const task = localProject.value.tasks?.find( ( t ) => t.id === updatedTask.id );
        if ( task )
        {
            task.status = updatedTask.status;
            task.order = updatedTask.order;
        }
    } );

    // Sort tasks within each column
    renderColumns.value.forEach( ( column: { tasks: Task[]; } ) =>
    {
        column.tasks.sort( ( a, b ) => a.order - b.order );
    } );

    // Send update to server
    router.put(
        route( "projects.tasks.bulk-update", { project: localProject.value.id } ),
        {
            preserveState: true,
            preserveScroll: true,
            preserveUrl: true,
            data: {
                tasks: updatedTasks,
            },
        }
    );
}

// New function to handle task selection
function selectTask ( task: App.Data.TaskData )
{
    selectedTask.value = task;
    isPanelOpen.value = true;
}

interface Stage
{
    name: string;
    slug: string;
}

// Handle stage deletion
function deleteStage ( {
    column,
    stageId,
    tasksToReassign,
}: {
    column: any;
    stageId: string;
    tasksToReassign: App.Data.TaskData[];
} )
{
    const pendingStage = localProject.value.stages.find(
        ( stage: Stage | undefined ) => stage?.name.toLowerCase() === "pending"
    );

    if ( !pendingStage )
    {
        return;
    }

    // Send update to server
    router.delete(
        route( "projects.stages.destroy", {
            project: localProject.value.id,
            stage: stageId,
            column: column,
            tasks: tasksToReassign,
        } ),
        {
            preserveState: false,
            preserveScroll: true,
            preserveUrl: true,
            hooks: {
                success: () =>
                {
                    router.post(
                        route( "projects.stages.updateOrder", {
                            project: localProject.value,
                        } ),
                        {
                            data: {
                                columns: localProject.value.stages.map(
                                    ( column: any, index: any ) => ( {
                                        id: column.id,
                                        order: index,
                                    } )
                                ),
                            },
                        }
                    );
                },
            },
            data: {
                tasksToReassign,
                newStatus: pendingStage.slug,
            },
        }
    );
}
</script>

<template layout="dashboard">
    <section class="h-[calc(100vh)]">
        <div class="hidden">{{ project }}</div>

        <div
            class="bg-gradient-to-b from-indigo-800 via-pink-500 to-indigo-200 h-full overflow-scroll pb-12 dark:from-gray-800 dark:to-gray-900">
            <div v-if=" !user?.is_premium "
                class="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 my-6 mx-4 rounded-lg shadow-sm"
                role="alert">
                <p class="text-sm">
                    Want to unlock more features?
                    <router-link :href=" route( 'upgrade.show' ) "
                        class="font-medium text-yellow-700 underline hover:text-yellow-800 transition-colors duration-200">
                        Upgrade to premium
                    </router-link>
                </p>
            </div>
            <header class="flex items-center justify-end">
                <TeamMembers :collaborators=" localProject.collaborators ">
                    <template #form>
                        <PrimaryButton
                            class="disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:hover:bg-slate-500 flex justify-center items-center !rounded-full w-8 h-8 p-1 -m-3 hover:bg-pink-600 transition duration-300"
                            :disabled=" !canAddCollaborators " @click=" openCollaboratorModal ">
                            +
                        </PrimaryButton>
                    </template>
                </TeamMembers>
            </header>
            <KanBanBoard :columns=" renderColumns " :project-id=" localProject.id " @update-tasks=" updateTasks "
                @select-task=" selectTask " @add-task=" addTask " @delete-stage=" deleteStage " />
        </div>

        <!-- Add Collaborator Modal -->
        <Modal v-model=" showCollaboratorModal ">
            <template #title>
                <h3 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    Add Collaborator to Project
                </h3>
            </template>
            <form @submit.prevent=" addCollaborator " class="mt-4">
                <div class="mb-4 text-slate-500">
                    <Select v-model=" collaboratorForm.fields.user_id "
                        @update:model-value="collaboratorForm.clearErrors()" class="w-full">
                        <SelectTrigger>
                            <SelectValue placeholder="Select a user" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectLabel>Users</SelectLabel>
                            <SelectItem class="" v-for=" user in users " :key=" user.id " :value=" user.id.toString() ">
                                {{ user.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <InputError v-if=" collaboratorForm.errors.user_id " :message=" collaboratorForm.errors.user_id "
                    class="mt-1 text-xs text-red-600" />
            </form>
            <template #footer>
                <div class="flex justify-end mt-6">
                    <PrimaryButton @click=" addCollaborator " type="submit" :disabled=" collaboratorForm.processing || !collaboratorForm.fields.user_id
                        " class="transition disabled:opacity-50 duration-300 ease-in-out transform text-sm px-4 py-2 bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700">
                        Add Collaborator
                    </PrimaryButton>
                </div>
            </template>
        </Modal>
    </section>
</template>
