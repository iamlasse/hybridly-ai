<script lang="ts" setup>
import Vue from 'vue'
const $props = defineProps<{
    task: App.Data.TaskData,
    selected: Boolean,
}>()

const $emit = defineEmits( [ 'selectTask' ] )

function getStatusClass ( status: string ): string
{
    switch ( status.toLowerCase() )
    {
        case 'todo':
            return 'bg-blue-100 text-blue-800';
        case 'in progress':
            return 'bg-yellow-100 text-yellow-800';
        case 'done':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}
</script>

<template>
    <div class="h-full border rounded" :class="{ 'border-green-800': selected }">
    <div class="task-card h-full flex flex-col border-l-6 bg-white text-gray-800 p-3 rounded shadow cursor-move"
        @click.stop="$emit('selectTask', task)">
        <h4 class="font-medium mb-2">{{ task.title }}</h4>
        <div class="flex-grow">
            <p class="text-sm text-gray-600 line-clamp-2">{{ task.description }}</p>
        </div>
        <div class="mt-2 flex justify-between items-center">
            <div class="flex gap-1 items-center">
                <v-icon name="oi-comment-discussion" class="text-gray-600"></v-icon>
                <p class="text-xs text-gray-600">{{ task.comments_count }}</p>
            </div>
        </div>
    </div>
</div>
</template>
