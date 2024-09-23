<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '@/types';
import PrimaryButton from '../components/PrimaryButton.vue';

const props = defineProps<{
    projects: Project | Project[],
    collaborating_projects: Project[];
    canCreateMoreProjects: boolean;

}>();

const user = useProperty( 'security.user' );

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
        <div v-if=" !user?.is_premium "
            class="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 my-6 mx-4 rounded-lg shadow-sm"
            role="alert">
            <p class="text-sm">Want to unlock more features?
                <router-link :href=" route( 'upgrade.show' ) "
                    class="font-medium text-yellow-700 underline hover:text-yellow-800 transition-colors duration-200">
                    Upgrade to premium
                </router-link>
            </p>
        </div>
        <div class="p-6 flex justify-between items-center mb-4">
            <h1 class="text-2xl font-semibold"></h1>
            <PrimaryButton
                class="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-500 disabled:bg-slate-500"
                @click=" openCreateProjectModal " :disabled=" !canCreateMoreProjects ">
                Create board
            </PrimaryButton>
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
