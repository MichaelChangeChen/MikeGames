import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'DaVinciCdoeAnimate',
	setup(props, { expose }) {
		const open = ref(false);
		const message = ref(null);

		const check = (msg) => {
			message.value = msg;
			open.value = !open.value;
			setTimeout(() => {
				open.value = !open.value;
				message.value = null;
			}, 1800);
		};

		expose({ check });

		return {
			open,
			check,
			message
		};
	}
});
