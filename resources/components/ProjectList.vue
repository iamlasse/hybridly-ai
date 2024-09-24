<template>
    <div class="">
        <div class="">
            <h1 class="mb-4 text-2xl font-bold text-gray-800 dark:text-white drop-shadow-md">
                <slot name="title"> Your boards </slot>
            </h1>
            <ul class="flex gap-2 flex-wrap">
                <li v-for="(   project, index) in projects" :key=" index "
                    class="bg-white block dark:bg-gray-800 rounded-lg shadow-md  flex-shrink-0 flex-1 min-w-80 max-w-80 transition-all duration-300 hover:shadow-lg  border border-gray-200 dark:border-gray-700 ">
                    <router-link :href=" `/projects/${ project.id }` " class="flex flex-col h-full">
                        <header
                            class="bg-gradient-to-r from-blue-500 to-purple-600 p-5 rounded-t-lg flex justify-between items-center border-b-4 border-blue-300">
                            <h2 class="text-xl font-bold text-white truncate pr-3 leading-tight">
                                {{ project.name }}
                            </h2>
                            <span :class=" [ projectClass( project.status ), 'shadow-md' ] "
                                class="rounded-full min-w-4 min-h-4 h-4 w-4 inline-block"
                                :aria-label=" `Project status: ${ project.status }` "></span>
                        </header>
                        <div class="p-5 flex-1 flex flex-col justify-between bg-gray-50 dark:bg-gray-750">
                            <p class="text-sm text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed" v-html=" parsedDescription( project.description ) ">

                            </p>
                            <div class="flex justify-between items-center">
                                <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    <v-icon name="fa-tasks" scale="0.9" class="inline mr-2" />
                                    {{ project.tasks_count }}
                                </span>
                                <span
                                    class="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors duration-300 hover:text-blue-800 dark:hover:text-blue-300">
                                    View board →
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
