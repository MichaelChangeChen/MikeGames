import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { checkName } from '@/api/getApi';
import useStore from '@/stores/useStores.js';
import Loading from '@/pages/components/Loading.vue';

const home = () => {
	const 	store = useStore(),
			router = useRouter(),
			name = ref(null),
			message = ref(''),
			isShow = ref(false),
			isloading = ref(false),
			{ loadingSwitch } = store;

	const 	start = () => {
				loadingSwitch();
				setTimeout(() => {
					router.push('/daVinciCdoe');
					loadingSwitch();
				}, 6000);
			},
			checkUserName = () => {
				isloading.value = true;
				checkName({ name: name.value })
				.then(res => {
					if(res.data.statusCode === 1) {
						isShow.value = true;
						store.getData = name;
						console.log(333,res);
						console.log(111,store.getData);

					};

						console.log(222,isloading.value);
					isloading.value = false;
					message.value = res.data.message;
				}).catch(err => {});
			},
			clearName = () => {
				isShow.value = false;
				message.value = '';
			};

	return {
		name,
		start,
		isShow,
		Loading,
		message,
		isloading,
		clearName,
		checkUserName,
	};
};

export default home;