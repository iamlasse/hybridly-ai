<script setup lang="ts">
import { ref } from 'vue';
const sortBy = ref( 'Date' );

function logout ()
{
    // router.post( route( 'logout' ) );
}
</script>

<template>
    <div class="min-h-screen flex bg-gradient-to-br from-gray-800 to-gray-700 text-white">
        <!-- Sidebar -->
        <aside class="w-64 p-6 flex flex-col bg-gray-900">
            <!-- User Profile -->
            <!-- <div class="mb-8">
                <img :src=" $page.props.auth.user.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent( $page.props.auth.user.name ) "
                    :alt=" $page.props.auth.user.name " class="h-24 w-24 rounded-full mb-4" />
                <h2 class="text-xl font-bold">{{ $page.props.auth.user.name }}</h2>
                <p class="text-sm opacity-75">{{ $page.props.auth.user.email }}</p>
            </div> -->

            <!-- Navigation -->
            <nav class="flex-grow">
                <ul class="space-y-2">
                    <li>
                        <router-link :href=" route( 'dashboard' ) " class="flex items-center p-2 rounded hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        Dashboard
                        </router-link>
                    </li>
                    <li>
                        <router-link :href=" route( 'dashboard' ) " class="flex items-center p-2 rounded hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                        Sent
                        </router-link>
                    </li>
                </ul>
            </nav>

            <!-- Project List -->

            <!-- <div class="profile-section bg-white shadow-md rounded px-8 py-4 mt-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <img :src=" $page.props.auth.user.profile_photo_url " alt="Profile"
                            class="h-10 w-10 rounded-full mr-3">
                        <span class="text-gray-800">{{ $page.props.auth.user.name }}</span>
                    </div>
                </div>
            </div> -->
            <!-- <Link :href=" route( 'logout' ) " method="post" as="button"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 mt-3 px-4 rounded" preserve-scroll>
            Logout
            </Link> -->
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
    </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>
