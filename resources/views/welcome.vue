<script setup lang="ts">
const $props = defineProps<{

}>();

useHead( {
    title: () => 'Hybridly - The Laravel project'
} );
</script>

<template layout="main">
    <div
        class="items-top relative flex justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
        <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
            <div class="flex justify-center items-center pt-8 sm:pt-0 sm:gap-12">
                <!-- Hybridly logo -->
                <div class="flex items-center">

                </div>
            </div>


            <div class="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-2">
                </div>
            </div>

            <div class="flex justify-center mt-4 sm:items-center sm:justify-end">
                <div class="ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0">
                    <!-- Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{ PHP_VERSION }}) -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.title {
	animation: title-gradient 20s ease infinite;
	background-size: 400% 400%;
  background-image: linear-gradient(
		-45deg,
		#7c3aed,
		#fda4af,
		#f0abfc,
		#a78bfa,
		#fda4af,
		#a78bfa,
		#f0abfc,
		#fda4af
	);
}

@keyframes title-gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>
