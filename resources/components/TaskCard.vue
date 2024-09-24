<script lang="ts" setup>
import Vue from 'vue';
import { computed } from 'vue';
import { generateHTML } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const $props = defineProps<{
    task: App.Data.TaskData,
    selected: Boolean,
}>();

const $emit = defineEmits( [ 'selectTask' ] );

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

const parsedDescription = computed( () =>
{
    if ( !$props.task.description ) return '';
    const descriptionObj = JSON.parse( $props.task.description );
    return generateHTML( descriptionObj, [ StarterKit ] );
} );
</script>

<template>
    <div class="h-full border rounded-lg" :class=" { 'border-indigo-800 ': selected } ">
        <div :class=" { 'bg-indigo-100/30': selected } "
            class="task-card h-full flex flex-col border-l-6 bg-white text-gray-800 p-3 rounded-lg shadow cursor-move"
            @click.stop="$emit( 'selectTask', task )">
            <h4 class="font-medium mb-2">{{ task.title }}</h4>
            <div class="flex-grow">
                <div class="text-sm text-gray-600 line-clamp-2" v-html=" parsedDescription "></div>
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
