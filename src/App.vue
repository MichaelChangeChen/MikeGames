<template>
	<div>
		<v-app>
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</v-app>

		<Loading :isOpen="isLoading" />
	</div>
</template>

<script setup>
	import Loading from '@/pages/components/Loading.vue';
	import useStore from '@/stores/useStores.js';
	import { storeToRefs } from 'pinia';
	const store = useStore();
	const { isLoading } = storeToRefs(store);
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'Bitcount_Roman';
  src: url('@/assets/fonts/Bitcount_Roman-Light.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

</style>