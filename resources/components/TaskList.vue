<script setup lang="ts">
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import TaskFlyoutPanel from './TaskFlyoutPanel.vue';

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  },
});

const selectedTask = ref(null);
const isPanelOpen = ref(false);

const selectTask = (task) => {
  selectedTask.value = task;
  isPanelOpen.value = true;
};

const closePanel = () => {
  isPanelOpen.value = false;
};

const statusColors = {
  'todo': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'done': 'bg-green-100 text-green-800',
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
          :class="statusColors[task.status]"
        >
          {{ task.status }}
        </span>
      </li>
    </ul>

    <TaskFlyoutPanel
      :task="selectedTask"
      :isOpen="isPanelOpen"
      @close="closePanel"
    />
  </div>
</template>
