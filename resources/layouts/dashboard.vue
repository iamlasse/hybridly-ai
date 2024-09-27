<script setup lang="ts">
import { ref } from "vue";
import Toaster from '@/components/ui/toast/Toaster.vue'

const sortBy = ref("Date");

function logout() {
  // router.post( route( 'logout' ) );
}

const user = useProperty<App.Data.UserData>("security.user");
</script>

<template>
    <div class="min-h-screen flex bg-gradient-to-br from-gray-800 to-gray-700">
        <!-- Sidebar -->
        <aside class="w-64 px-6 pb-4 flex flex-col bg-gray-900 text-white">
            <!-- User Profile -->
            <header class="flex gap-2 items-center mb-4 mt-2">
                <svg class="h-8 w-auto text-indigo-600" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12L9 15L10.5 16.5L12 15L15 18L16.5 16.5L12 12Z"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <h1>TaskFlow Pro</h1>
            </header>
            <!-- Navigation -->
            <nav class="flex-grow">
                <ul class="space-y-2">
                    <li>
                        <router-link :href="route('dashboard')" class="flex items-center p-2 rounded hover:bg-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            Dashboard
                        </router-link>
                    </li>
                </ul>
            </nav>

            <!-- User Details -->
            <div class="mt-auto" v-if="user">
                <div class="bg-gray-800 rounded-lg p-4">
                    <img :src="
              user.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
              )}`
            " :alt="user.name" class="h-12 w-12 rounded-full mb-2 mx-auto" />
                    <h3 class="text-lg font-semibold text-center">{{ user.name }}</h3>
                    <p class="text-sm text-gray-400 text-center">{{ user.email }}</p>
                    <p class="text-xs text-gray-400 text-center mt-1">
                        {{ user.is_premium ? "Premium" : "Free" }} Plan
                    </p>
                </div>
            </div>

            <!-- Project List -->

            <!-- <div class="profile-section bg-white shadow-md rounded px-8 py-4 mt-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <img :src=" user.profile_photo_url " alt="Profile"
                            class="h-10 w-10 rounded-full mr-3">
                        <span class="text-gray-800">{{ user.name }}</span>
                    </div>
                </div>
            </div> -->
            <router-link :href="route('billing.show')"
                class="inline-flex cursor-pointer justify-center mt-2 items-center p-2 rounded hover:bg-gray-800"
                as="primary-button">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd" />
                </svg>
                Billing
            </router-link>
            <router-link :href="route('logout')" method="post" as="primary-button"
                class="bg-red-500 hover:bg-red-700 cursor-pointer justify-center inline-flex text-white font-bold py-2 mt-3 px-4 rounded"
                preserve-scroll>
                Logout
            </router-link>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto">
            <slot name="header" />
            <!-- Top Bar -->
            <slot />

            <!-- Content Area -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <slot name="message-list"></slot>
                <slot name="task-visualization"></slot>
            </div>
        </main>
        <Toaster />
    </div>
</template>
