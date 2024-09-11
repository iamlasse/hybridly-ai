<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>

<template>
    <div class="bg-white rounded-lg shadow-md p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
        <h3 class="text-lg font-bold mb-2">{{ project.name }}</h3>
        <p>{{ project.description }}</p>

        <Link :href="'/projects/' + project.id" class="underline text-blue-500">View Project</Link>
    </div>
</template>
