<script setup lang="ts">
import ApplicationLogo from '@/Components/ApplicationLogo.vue';

</script>

<template>
    <div
        class="min-h-screen bg-indigo-600 flex flex-col sm:justify-center items-center pt-6 sm:pt-0  dark:bg-gray-900">
        <div>
            <router-link href="/">
                <ApplicationLogo class="w-20 h-20 fill-current text-white" />
            </router-link>
        </div>

        <div
            class="w-full  sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
            <slot />
        </div>
    </div>
</template>
