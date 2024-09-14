<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '@/types';

const props = defineProps<{
    projects: Project | Project[],
    collaborating_projects: Project[]
}>();

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
            <h1 class="text-2xl font-semibold"></h1>
            <PrimaryButton @click=" openCreateProjectModal ">Create board</PrimaryButton>
        </div>
        <div class="p-6 flex flex-col gap-6">
            <ProjectList :projects=" projects " />
            <ProjectList :projects=" collaborating_projects ">
                <template #title>Collaborating boards</template>
            </ProjectList>
        </div>
        <CreateProjectModal v-model=" showCreateProjectModal " @close=" closeCreateProjectModal " />
    </section>
</template>
