<template>
    <div class="">
        <div class="">
            <h2 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                <slot name="title"> Your boards </slot>
            </h2>
            <ul class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <li v-for="(project, index) in projects" :key="index"
                    class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <router-link :href="`/projects/${project.id}`" class="flex flex-col h-full">
                        <header
                            class="bg-indigo-600 dark:bg-gray-700 p-4 rounded-t-lg flex justify-between items-center">
                            <h3 class="text-lg font-semibold text-white dark:text-white truncate pr-3 leading-tight">
                                {{ project.name }}
                            </h3>
                            <span :class=" [ projectClass( project.status ), 'shadow-md' ] "
                                class="rounded-full min-w-4 min-h-4 h-4 w-4 inline-block"
                                :aria-label=" `Project status: ${ project.status }` "></span>
                        </header>
                        <div class="p-4 flex-1 flex flex-col justify-between">
                            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3" v-html="parsedDescription(project.description)">
                            </p>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-gray-600 dark:text-gray-300">
                                    <v-icon name="fa-tasks" scale="0.9" class="inline mr-2" />
                                    {{ project.tasks_count }} tasks
                                </span>
                                <span
                                    class="text-sm text-blue-600 dark:text-blue-400">
                                    View board
                                </span>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { generateHTML } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const parsedDescription =  (description) =>
{
    if ( !description ) return '';
    const descriptionObj = JSON.parse( description );
    return generateHTML( descriptionObj, [ StarterKit ] );
} ;

const props = defineProps<{
    projects: App.Data.ProjectData[];
}>();

console.log( props );

const localProjects = computed<App.Data.ProjectData[]>( () => props.projects );
const projectClass = ( status: string | null ) =>
{
    switch ( status )
    {
        case "active":
            return "bg-green-500";
        case "pending":
            return "bg-yellow-500";
        case "completed":
            return "bg-pink-500";
        case "on_hold":
            return "bg-slate-500";
        default:
            return "bg-blue-500";
    }
};
</script>
