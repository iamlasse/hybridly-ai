<template>
    <div class="flex items-start">
        <img :src="comment.user?.profile_photo_url" :alt="comment.user?.name" class="w-12 h-12 rounded-full mr-4">
        <div class="flex-1">
            <div class="text-sm">
                <span class="font-bold">{{ comment.user.name }}</span>
                <span class="text-gray-600 ml-2">{{ comment.readable_created_time }}</span>
            </div>
            <p class="mt-2 text-sm">{{ comment.body }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    comment: {
        type: Object,
        required: true,
    },
});
</script>
