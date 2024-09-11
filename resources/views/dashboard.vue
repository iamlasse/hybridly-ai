<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps( {
    projects: {
        type: Object,
        required: true,
    }
} );

const showCreateProjectModal = ref( false );

const openCreateProjectModal = () =>
{
    showCreateProjectModal.value = true;
};

const closeCreateProjectModal = () =>
{
    showCreateProjectModal.value = false;
};
</script>

<template layout="dashboard">
    <section>
        <div class="p-6 flex justify-between items-center mb-4">
            <h1 class="text-2xl font-semibold">Projects</h1>
            <PrimaryButton @click=" openCreateProjectModal ">Create board</PrimaryButton>
        </div>
        <div class="p-6">
            <ProjectList :projects=" projects " />
        </div>
        <CreateProjectModal v-model=" showCreateProjectModal " @close=" closeCreateProjectModal " />
    </section>
</template>
