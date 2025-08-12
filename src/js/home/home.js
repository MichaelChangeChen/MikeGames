import Loading from '@/pages/components/Loading.vue';
import { useRouter } from 'vue-router';
import useStore from '@/stores/useStores.js';


const home = () => {
	const 	store = useStore(),
			{ loadingSwitch } = store;
	const router = useRouter();

	const start = () => {
		loadingSwitch();
		setTimeout(() => {
			router.push('/guessNumberGame');
			loadingSwitch();
		}, 6000);
	}

	return {
		Loading,
		start
	};
};

export default home;