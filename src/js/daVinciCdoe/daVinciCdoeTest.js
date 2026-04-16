import { defineComponent, onMounted, ref } from 'vue';
import { guessGame, resetGame } from '@/api/getApi';

export default defineComponent({
	name: 'DaVinciCdoeTest',
	setup() {
		const maxNum = ref(0);
		const minNum = ref(0);
		const radius = ref(150);
		const numList = ref([]);

		function generateCircles() {
			for(let i = 0; i < maxNum.value; i++) {
				numList.value.push({ number: i + 1 });
			}
		}

		function selectNumber(num) {
			makeGuess(num);
		}

		async function makeGuess(num) {
			guessGame({ guess: num })
				.then((res) => {
					if(res.data.statusCode === 1) {
						if(res.data.status === 'wrong') {
							minNum.value = res.data.min_num;
							maxNum.value = res.data.max_num;
							numList.value = numList.value.filter(
								e => e.number < res.data.max_num && res.data.min_num < e.number
							);
						}
						if(res.data.status === 'correct')
							alert(res.data.message);
					}
					else {
						console.log('????ºç¾?é?~');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}

		function reset() {
			resetGame()
				.then((res) => {
					if(res.data.statusCode === 1) {
						numList.value = [];
						minNum.value = 0;
						maxNum.value = res.data.max_num;
						generateCircles();
					}
					else {
						console.log('????ºç¾?é?~');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}

		onMounted(() => {
			reset();
		});

		return {
			maxNum,
			minNum,
			radius,
			numList,
			selectNumber,
			reset
		};
	}
});
