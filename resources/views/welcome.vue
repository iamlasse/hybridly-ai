<script setup lang="ts">
const $props = defineProps<{

}>();

useHead( {
    title: () => 'Hybridly - The Laravel project'
} );
</script>

<template layout="main">
    <LandingPage />
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
