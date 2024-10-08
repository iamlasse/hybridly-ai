<script lang="ts" setup>
import Vue from 'vue';
import { computed } from 'vue';
import { generateHTML } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Mention from '@tiptap/extension-mention';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

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
    console.log(descriptionObj)
    return generateHTML( descriptionObj, [
        StarterKit,
        Underline,
        TextAlign.configure( {
            types: [ 'heading', 'paragraph' ],
        } ),
        Color.configure( { types: [ TextStyle.name, ListItem.name ] } ),
        TextStyle.configure( { types: [ ListItem.name ] } ),
        Mention.configure( {
            HTMLAttributes: {
                class: 'mention',
            },
        } ),
     ] );
} );

const formattedDueDate = computed(() => {
    if (!$props.task.due_date) return '';
    const dueDate = dayjs($props.task.due_date);
    const now = dayjs();
    const diffInDays = dueDate.diff(now, 'day');

    if (diffInDays < 1 && diffInDays > -1) {
        return dueDate.fromNow(); // "in 3 hours" or "3 hours ago"
    } else {
        return dueDate.format('MMM D, YYYY'); // "Apr 15, 2023"
    }
});
</script>

<template>
    <div class="h-full border rounded-lg" :class=" { 'border-indigo-800 ': selected } ">
        <div :class=" { 'bg-indigo-100/30': selected } "
            class="task-card h-full flex flex-col border-l-6 bg-white text-gray-800 p-3 rounded-lg shadow cursor-move"
            @click.stop="$emit( 'selectTask', task )">
            <h4 class="font-medium mb-2 flex items-center gap-1">
                <v-icon :name=" task.completed ? 'bi-check-circle-fill' : 'bi-check-circle' "
                    class="text-indigo-400" ></v-icon>
                {{ task.title }}
            </h4>
            <div class="flex-grow">
                <div class="text-sm text-gray-600 line-clamp-2" v-html=" parsedDescription "></div>
            </div>
            <div class="mt-2 flex items-center">
                <div class="flex flex-1 gap-2 items-center justify-start ">
                    <div class="flex gap-1 items-center">
                        <v-icon name="oi-comment-discussion" class="text-gray-600"></v-icon>
                        <p class="text-xs text-gray-600">{{ task.comments_count }}</p>
                    </div>
                    <div v-if=" task.dependencies " class="flex items-center hover:bg-slate-100">
                        <v-icon class="h-[14px]" name="bi-hourglass"></v-icon>
                        <span class="text-sm">{{ task.dependencies.length }}</span>
                    </div>
                    <div v-if="formattedDueDate" class="flex gap-1 items-center flex-1 flex-shrink-0">
                        <v-icon name="oi-calendar" class="text-gray-600"></v-icon>
                        <p class="text-xs text-gray-600 flex-shrink-0"> {{ formattedDueDate }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
