<script setup lang="ts">
import { ref } from "vue";
import { Link } from "@inertiajs/vue3";

const props = defineProps<{
  tasks: App.Data.TaskData[];
}>();

const selectedTask = ref<App.Data.TaskData | null>(null);
const isPanelOpen = ref(false);

const selectTask = (task: App.Data.TaskData) => {
  selectedTask.value = task;
  isPanelOpen.value = true;
};

const closePanel = () => {
  isPanelOpen.value = false;
};

const statusColors = (index: string | null) => {
  switch (index) {
    case "todo":
      return "bg-gray-100 text-gray-800";
    case "in-progress":
      return "bg-blue-100 text-blue-800";
    case "done":
      return "bg-green-100 text-green-800";
    default:
      return "";
  }
};
</script>

<template>
  <div class="relative">
    <ul class="space-y-4">
      <li
        v-for="(task, index) in tasks"
        :key="index"
        @click="selectTask(task)"
        class="cursor-pointer hover:bg-gray-100 p-2 rounded flex items-center space-x-2"
      >
        <span>{{ task.title }}</span>
        <span
          class="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium"
          :class="statusColors(task.status)"
        >
          {{ task.status }}
        </span>
      </li>
    </ul>
  </div>
</template>
