<script setup lang="ts">
import TaskHeader from "@/components/TaskHeader.vue";
import TaskInformation from "@/components/TaskInformation.vue";
import TaskDescription from "@/components/TaskDescription.vue";
import TaskSubtasks from "@/components/TaskSubtasks.vue";
import TaskComments from "@/components/TaskComments.vue";
import Panel from "@/components/Panel.vue";
import Dependencies from "@/components/Dependencies.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import type { Comment, Task } from "@/types";
import { useDebounceFn } from "@vueuse/core";
import { useElementVisibility } from "@vueuse/core";
import { DateFormatter, type DateValue } from "@internationalized/date";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const props = defineProps<{
    task: App.Data.TaskData;
    tasks: App.Data.TaskData[];
    comments: Comment[];
    sub_tasks: App.Data.TaskData[];
    users: App.Data.UserData[];
    project: App.Data.ProjectData;
}>();

const df = new DateFormatter("en-US", {
    dateStyle: "long",
});

const availableTasks = computed(() => {
    if (!Array.isArray(props.tasks)) {
        console.warn("$props.tasks is not an array:", props.tasks);
        return [];
    }

    const filteredTasks = props.tasks.filter(
        (t) =>
            t.id !== props.task.id &&
            !props.task.dependencies?.some((d: App.Data.TaskData) => d.id === t.id)
    );

    return filteredTasks;
});

const addDependency = ({
    id: dependencyId,
    type,
}: {
    id: number;
    type: string;
}) => {
    if (!dependencyId) return;
    // Handle adding dependency logic here. You'll likely need to emit an event to the parent component.
    // Example: emit('add-dependency', { taskId: props.task.id, dependencyId, type });
    router.put( route( 'tasks.add-dependency', { task: props.task.id }), {
        data: { dependency_id: dependencyId, type },
        preserveState: false
    } )

    router
        .put( route( "tasks.add-dependency", { task: props.task.id } ), {
            data: {
                dependency_id: dependencyId,
                type,
            },
            preserveState: false,
            preserveScroll: true,
        } )
        .then( () =>
        {
            router.reload( { only: [ "task" ] } ); // Reload the task data
        } )
        .catch( ( error ) =>
        {
            console.error( "Error adding dependency:", error );
            // You can add error handling here, such as showing an error message to the user
        } );
};

const updateDependency = ({
    id: dependencyId,
    type,
}: {
    id: number | string;
    type: string;
}) => {
    if (!dependencyId) return;
    // Handle updating dependency logic here. Emit an event to the parent component.
    // Example: emit('update-dependency', { taskId: props.task.id, dependencyId, type });
    router.put( route( "tasks.update-dependency", { task: props.task.id } ), {
        data: {
            dependency_id: dependencyId,
            type,
        },
        preserveState: false,
        preserveScroll: true,
    } );
};

const removeDependency = (dependencyId: string | number) => {
    // Handle removing dependency logic here. Emit an event to the parent component.
    // Example: emit('remove-dependency', { taskId: props.task.id, dependencyId });
    router.put( route( "tasks.remove-dependency", { task: props.task.id } ), {
        data: { dependency_id: dependencyId },
        preserveState: false,
        preserveScroll: true,
    } );
};

</script>

<template>
    <Panel>
        <template #title>
            <TaskHeader :task="props.task" @toggle-completion="$emit('toggle-main-task-completion')" />
        </template>
        <div class="grid grid-rows-[1fr_auto] h-[calc(100%-48px)] overflow-y-scroll">
            <header>
                <TaskDescription :task="props.task" :users="props.users" @update:task="$emit('update:task', $event)" />
                <TaskInformation :task="props.task" :users="props.users" :project="props.project"
                    @update:task="$emit('update:task', $event)">
                    <li class="grid grid-cols-[auto_1fr] items-center gap-2">
                        <h4 class="font-semibold text-sm">Dependencies:</h4>
                        <Dependencies :task=" props.task " :dependencies=" availableTasks "
                            @add-dependency=" addDependency " @update-dependency=" updateDependency "
                            @remove-dependency=" removeDependency " />
                    </li>
                </TaskInformation>
                <TaskSubtasks :task="props.task" :sub_tasks="props.sub_tasks"
                    @update:task="$emit('update:task', $event)" @delete-subtask="$emit('delete-subtask', $event)"
                    @toggle-subtask-completion="$emit('toggle-subtask-completion', $event)" />
            </header>
            <TaskComments :task="props.task" :comments="props.comments" :users="props.users"
                @update:task="$emit('update:task', $event)" />
        </div>
    </Panel>
</template>
