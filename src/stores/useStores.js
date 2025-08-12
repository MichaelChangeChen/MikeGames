import { defineStore } from "pinia";
import { ref } from 'vue';

export const useStore = defineStore('loading', () => {
	const isLoading = ref(false);
	const loadingSwitch = () => {
		isLoading.value = !isLoading.value;
	};

	return { isLoading, loadingSwitch };
});

export default useStore;