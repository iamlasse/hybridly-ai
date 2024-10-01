<script setup lang="ts">
import { ref, computed } from "vue";
import { useDebounceFn } from "@vueuse/core";
import TextInput from "@/components/TextInput.vue";
import { Button } from "@/components/ui/button";

const props = defineProps<{
    task: App.Data.TaskData;
    sub_tasks: App.Data.TaskData[];
}>();

const emit = defineEmits<{
    (e: 'update:task', task: App.Data.TaskData): void;
    (e: 'delete-subtask', subtaskId: number): void;
    (e: 'toggle-subtask-completion', subtaskId: number): void;
}>();

const subtasks = computed(() => props.sub_tasks || []);
const newSubtask = ref("");

const addSubtask = () => {
    if (newSubtask.value.trim()) {
        const newTask = newSubtask.value;
        emit('update:task', { ...props.task, sub_tasks: [...subtasks.value, { id: 0, title: newTask, completed: false }] });
        newSubtask.value = "";
    }
};

const handleKeySubtaskDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addSubtask();
    }
};

const debouncedUpdateTask = useDebounceFn((task) => updateTask(task), 500);

const updateTask = (taskInformation: Partial<App.Data.TaskData>) => {
    emit('update:task', { ...props.task, ...taskInformation });
};

const showSubtasks = ref(false);

const deleteSubtask = (subtaskId: number) => {
    emit('delete-subtask', subtaskId);
};

const toggleSubtaskCompletion = (subtaskId: number) => {
    emit('toggle-subtask-completion', subtaskId);
};

</script>

<template>
    <div v-if="subtasks.length > 0 || showSubtasks">
        <h4 class="font-semibold text-sm">Subtasks:</h4>
        <ul class="mt-2">
            <li v-for="(subtask, index) in subtasks" :key="index" class="flex items-center mb-2 group">
                <Button @click="toggleSubtaskCompletion(subtask.id)" class="mr-2 p-0 bg-transparent hover:bg-transparent"
                    variant="ghost" size="sm">
                    <v-icon :name="subtask.completed ? 'bi-check-circle-fill' : 'bi-check-circle'"
                        :class="{ 'text-gray-400': subtask.completed } "></v-icon>
                </Button>
                <TextInput v-model="subtask.title" @update:modelValue="(modelValue) =>
                    debouncedUpdateTask({
                        id: subtask.id,
                        title: modelValue,
                    })
                "
                    :data-index="index" class="border rounded px-2 py-1 mr-2 flex-grow"
                    :class="{
                        'bg-gray-200 !text-gray-400': subtask.completed,
                    }" />
                <Button size="xs" variant="ghost" @click="deleteSubtask(subtask.id)">
                    <v-icon name="bi-trash-fill"></v-icon>
                </Button>
            </li>
            <li class="flex items-center">
                <v-icon name="bi-check-circle" class="mr-2"></v-icon>
                <TextInput v-model="newSubtask" @keydown="handleKeySubtaskDown" :data-index="subtasks.length"
                    placeholder="Enter new subtask" class="border rounded px-2 py-1 mr-2 flex-grow" />
            </li>
        </ul>
    </div>
    <Button v-else size="sm" @click="showSubtasks = true">+ Add subtasks</Button>
</template>
