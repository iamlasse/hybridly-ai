<script setup lang="ts">
import { ref, computed } from "vue";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const props = defineProps<{
    task: App.Data.TaskData;
}>();

const formattedCreatedDate = computed(() => {
    if (!props.task.created_at) return '';
    const createdDate = dayjs(props.task.created_at);
    const now = dayjs();
    const diffInDays = createdDate.diff(now, 'day');

    if (diffInDays < 1 && diffInDays > -1) {
        return createdDate.fromNow(); // "in 3 hours" or "3 hours ago"
    } else {
        return createdDate.format('MMM D, YYYY'); // "Apr 15, 2023"
    }
});

</script>

<template>
    <div class="flex items-center justify-between">
        <Button size="sm" :variant="props.task.completed ? 'secondary' : 'outline'" @click="$emit('toggle-completion')">
            <v-icon :name="!props.task.completed ? 'bi-check-circle' : 'io-close-circle-outline'"
                class="mr-1"></v-icon>
            {{ props.task.completed ? "Mark Incomplete" : "Mark Complete" }}
        </Button>
        <div class="actions ml-auto"></div>
    </div>
</template>
