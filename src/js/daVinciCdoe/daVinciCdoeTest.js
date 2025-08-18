import { guessGame, resetGame } from '@/api/getApi';

export default {
	data() {
		return {
			maxNum: 0,
			minNum: 0, // 小圓圈數量
			radius: 150, // 大圓圈的半徑
			numList: [], // 存儲每個小圓圈的位置
		};
	},
	mounted() {
		this.reset();
	},
	methods: {
		selectNumber(num) {
			this.makeGuess(num);
		},
		generateCircles() {
			for (let i = 0; i < this.maxNum; i++) {
				this.numList.push({ number: i + 1 });
			};
		},
		async makeGuess(num) {
			guessGame({ guess: num })
			.then((res) => {
				if(res.data.statusCode === 1) {
					if(res.data.status === 'wrong')
						this.numList = this.numList.filter(e => e.number < res.data.max_num && res.data.min_num < e.number);
					if(res.data.status === 'correct')
						alert(res.data.message);
				}
				else {
					console.log('連線出現問題~');
				};
			})
			.catch((err) => {
				console.log(err);
			});
		},
		reset() {
			resetGame()
			.then((res) => {
				if(res.data.statusCode === 1) {
					this.numList = [];
					this.maxNum = res.data.max_num;
					this.generateCircles();
				}
				else {
					console.log('連線出現問題~');
				};
			})
			.catch((err) => {
				console.log(err);
			});
		}
	}
};