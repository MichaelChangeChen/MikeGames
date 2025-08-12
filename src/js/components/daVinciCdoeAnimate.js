import { ref } from 'vue';

const daVinciCdoeAnimate = () => {
	const 	open = ref(false),
			message = ref(null);
	const check = (msg) => {
		message.value = msg;
		open.value = !open.value;
		setTimeout(() => {
			open.value = !open.value;
			message.value = null;
		}, 1800)
	}


	return {
		open,
		check,
		message
	};
};

export default daVinciCdoeAnimate;