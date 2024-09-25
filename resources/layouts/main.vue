<script setup>
import useSecurity from '@/composables/security';

const { user, authenticated } = useSecurity();
</script>

<template>
    <main>
        <slot />
    </main>
</template>
