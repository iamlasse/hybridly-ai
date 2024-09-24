<script setup lang="ts">
import { ref } from "vue";
import type { Project } from "@/types";
import PrimaryButton from "../components/PrimaryButton.vue";

const props = defineProps<{
  projects: Paginator<App.Data.ProjectData>;
  collaborating_projects: Paginator<App.Data.ProjectData>;
  canCreateMoreProjects: boolean;
}>();

const user = useProperty("security.user");

const showCreateProjectModal = ref(false);

const openCreateProjectModal = () => {
  showCreateProjectModal.value = true;
};

const closeCreateProjectModal = () => {
  showCreateProjectModal.value = false;
};
</script>

<template layout="dashboard">
  <section class="bg-gradient-to-b from-blue-50 to-white min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        v-if="!user?.is_premium"
        class="bg-gradient-to-r from-yellow-100 to-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg shadow-md"
        role="alert"
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-800">
              Want to unlock more features?
              <router-link
                :href="route('upgrade.show')"
                class="font-medium text-yellow-700 underline hover:text-yellow-800 transition-colors duration-200"
              >
                Upgrade to premium
              </router-link>
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <PrimaryButton
          class="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 disabled:bg-blue-500 shadow-md hover:shadow-lg transition-all duration-200"
          @click="openCreateProjectModal"
          :disabled="!canCreateMoreProjects"
        >
          Create board
        </PrimaryButton>
      </div>
      <div class="space-y-8">
        <ProjectList :projects="projects.data" />
        <ProjectList :projects="collaborating_projects.data">
          <template #title>Collaborating boards</template>
        </ProjectList>
      </div>
    </div>
    <CreateProjectModal
      v-model="showCreateProjectModal"
      @close="closeCreateProjectModal"
    />
  </section>
</template>
