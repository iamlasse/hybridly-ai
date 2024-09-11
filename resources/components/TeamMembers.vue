<script setup>
import { ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
defineProps({
    collaborators: {
        type: Array,
        required: true,
    },
});

const randomBackground = () => {
    const colors = [
        'ffd6d6',
        'fff2cc',
        'ccf2ff',
        'ffe6ff',
        'cce0ff',
        'e6d9ff',
        'd9f7e6',
        'ffd6d6',
        'ffe6ff',
        'cce0ff',
        'e6d9ff',
        'd9f7e6',
        'fff2cc',
        'ccf2ff',
        'ffd6d6',
    ];

    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
};

const getDarkerBorderColor = (backgroundColor) => {
    const r = parseInt(backgroundColor.slice(0, 2), 16);
    const g = parseInt(backgroundColor.slice(2, 4), 16);
    const b = parseInt(backgroundColor.slice(4, 6), 16);

    const darkerR = Math.max(0, r - 40).toString(16).padStart(2, '0');
    const darkerG = Math.max(0, g - 40).toString(16).padStart(2, '0');
    const darkerB = Math.max(0, b - 40).toString(16).padStart(2, '0');

    return `#${darkerR}${darkerG}${darkerB}`;
};

</script>

<template>
    <div class="">
        <div class="p-6">
            <div class="flex flex-wrap items-center gap-3">

                <div v-for="collaborator in collaborators" :key="collaborator.id" class="-m-3">
                    <img :src="collaborator.avatar ?? `https://ui-avatars.com/api/?name=${collaborator.name}&background=${randomBackground()}`"
                        :alt="collaborator.name" class="w-8 h-8 rounded-full border-2 shadow-md"
                        :style="{ borderColor: getDarkerBorderColor(randomBackground()) }" :title="collaborator.name">
                </div>
                <slot name="form"></slot>
            </div>
        </div>
    </div>
</template>
