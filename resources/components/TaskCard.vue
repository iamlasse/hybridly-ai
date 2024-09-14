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
    <div class="border rounded" :class=" {
        'border-green-800': selected,
    } ">
        <div class="task-card h-full border-l-6 bg-white text-gray-800 p-3 mb-2 rounded shadow cursor-move"
            @click.stop="$emit( 'selectTask', task )">
            <h4 class="font-medium">{{ task.title }}</h4>
            <div class="flex justify-between items-center">
                <p class="text-sm text-gray-600 truncate">{{ task.description }}</p>
            </div>
            <div class="flex flex-col">
                <div class="mt-2 flex gap-1 items-center">
                    <v-icon name="oi-comment-discussion" class="text-gray-600"></v-icon>
                    <p class="text-xs text-gray-600">{{ task.comments_count }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
