<script setup>
	import Navbar from '@/components/layout/Navbar.vue';
	import { onMounted } from 'vue';
	import { useAuthStore } from '@/stores/storeAuth';

	const authStore = useAuthStore();

	onMounted(() => {
		authStore.init();
	});
</script>

<template>
	<Navbar />
	<div class="container is-max-desktop px-2 py-4">
		<RouterView />
	</div>
</template>

<style>
	@import 'bulma/css/bulma.min.css';
</style>
