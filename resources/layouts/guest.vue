<script setup lang="ts">
import ApplicationLogo from '@/components/ApplicationLogo.vue';
</script>

<template>
    <div class="min-h-screen bg-indigo-600 flex flex-col sm:justify-center items-center pt-6 sm:pt-0  dark:bg-gray-900">
        <div>
            <router-link href="/" class="flex items-center gap-2">
                <ApplicationLogo class="w-20 h-20 fill-current text-indigo-100" />
                <h1 class="text-white font-bold">TaskFlow Pro</h1>
            </router-link>
        </div>

        <div
            class="w-full  sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
            <slot />
        </div>
    </div>
</template>
