<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
import TextInput from "@/components/TextInput.vue";
import TiptapEditor from "@/components/TiptapEditor.vue";
import InputLabel from "@/components/InputLabel.vue";

const props = defineProps<{
    task: App.Data.TaskData;
    users: App.Data.UserData[];
}>();

const emit = defineEmits<{
    (e: 'update:task', task: App.Data.TaskData): void;
}>();

const debouncedUpdateTask = useDebounceFn((task) => updateTask(task), 500);

const updateTask = (taskInformation: Partial<App.Data.TaskData>) => {
    emit('update:task', { ...props.task, ...taskInformation });
};

</script>

<template>
    <div class="description p-2">
        <TextInput
            class="border border-transparent transition-all hover:border-indigo-500 w-full !shadow-none text-xl font-semibold"
            @change="
                debouncedUpdateTask({
                    id: task.id,
                    title: task.title,
                    description: null,
                })
            "
            :value="props.task.title"
            v-model="props.task.title" />
    </div>
    <div class="p-4">
        <InputLabel value="Description" class="ml-2 mb-1" />
        <TiptapEditor :model-value="props.task.description" :users="props.users"
            @update:model-value="(modelValue) =>
                debouncedUpdateTask({
                    id: props.task.id,
                    description: modelValue,
                })
            "
            class="w-full p-2" />
    </div>
</template>
