<script setup>
	import { ref } from 'vue';
	import { onClickOutside } from '@vueuse/core';
	import { useAuthStore } from '@/stores/storeAuth';

	const authStore = useAuthStore();
	const showMobileNav = ref(false);
	const navBarMenuRef = ref(null);
	const navBarBurgerRef = ref(null);

	const logout = () => {
		authStore.logOut();
		showMobileNav.value = false;
	};

	onClickOutside(
		navBarMenuRef,
		(event) => {
			showMobileNav.value = false;
		},
		{
			ignore: [navBarBurgerRef],
		}
	);
</script>

<template>
	<nav
		class="navbar is-success"
		role="navigation"
		aria-label="main navigation">
		<div class="container is-max-desktop px-2">
			<div class="navbar-brand">
				<div class="navbar-item is-size-4 is-family-monospace">
					Noteballs
				</div>
				<a
					@click.prevent="showMobileNav = !showMobileNav"
					role="button"
					class="navbar-burger"
					ref="navBarBurgerRef"
					:class="{ 'is-active': showMobileNav }"
					aria-label="menu"
					aria-expanded="false"
					data-target="navbarBasicExample">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div
				id="navbarBasicExample"
				class="navbar-menu"
				ref="navBarMenuRef"
				:class="{ 'is-active': showMobileNav }">
				<div class="navbar-start">
					<button
						v-if="authStore.user.id"
						class="button is-small is-info mt-3 ml-3"
						@click="logout()">
						Logout {{ authStore.user.email }}
					</button>
				</div>
				<div class="navbar-end">
					<router-link
						@click="showMobileNav = false"
						class="navbar-item"
						to="/"
						active-class="is-active">
						Notes
					</router-link>
					<router-link
						@click="showMobileNav = false"
						class="navbar-item"
						to="/stats"
						active-class="is-active">
						Stats
					</router-link>
				</div>
			</div>
		</div>
	</nav>
</template>

<style>
	@media (max-width: 1023px) {
		.navbar-menu {
			position: absolute;
			left: 0;
			width: 100%;
		}
	}
</style>
