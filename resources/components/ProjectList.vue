<template>
    <div class="">
        <div class="">
            <h1 class="mb-6 text-2xl font-bold text-white dark:text-white">Your boards</h1>
            <ul class="flex gap-2 flex-wrap">
                <li v-for="(project, index) in projects.data" :key="index"
                class="bg-white block dark:bg-gray-800 rounded-lg shadow-md flex-shrink-0 flex-1 min-w-80 max-w-80 transition-transform duration-300">
                <router-link :href="`/projects/${project.id}`"
                class="flex flex-col h-full ">

                <header
                        class="bg-gradient-to-r from-gray-900 to-gray-500 p-4 rounded-t-lg flex justify-between items-center">
                        <h2 class="text-xl font-bold text-white truncate pr-3">{{ project.name }}</h2>
                        <span :class="projectClass(project.status)"
                            class="rounded-full min-w-3 min-h-3 h-3 w-3 inline-block ring-gray-700 ring-4"
                            :aria-label="`Project status: ${project.status}`"></span>
                    </header>
                    <div class="p-4 flex-1 flex flex-col justify-between">
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{{ project.description }}
                        </p>
                        <div class="flex justify-between items-center">
                            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <v-icon name="fa-tasks" scale="0.8" class="inline mr-1" /> {{ project.tasks_count }}
                            </span>
                            <span class="text-xs text-blue-600 dark:text-blue-400 hover:underline">
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

const props = defineProps({
    projects: {
        type: Object,
        required: true,
    },
});

const projectClass = (status) => {
    switch (status) {
        case 'active':
            return 'bg-green-500';
        case 'pending':
            return 'bg-yellow-500';
        case 'completed':
            return 'bg-pink-500';
        case 'on_hold':
            return 'bg-slate-500';
        default:
            return 'bg-blue-500';
    }
};
</script>
