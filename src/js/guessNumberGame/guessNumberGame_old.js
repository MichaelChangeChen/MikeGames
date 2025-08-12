import { guessGame, resetGame } from '@/api/getApi';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const guessNumberGameOld = () => {
	const 	bigRadius = ref(250), 			// 大圓半徑
			smallRadius = ref(15), 			// 小圓半徑
			smallCircleCount = ref(0), 		// 小圓數量
			gravity = ref(4), 				// 重力加速度
			friction = ref(0,95), 			// 摩擦力
			bounce = ref(0.3), 				// 反彈係數
			smallCircles = ref([]), 		// 儲存小圓形資料
			animationFrameId = ref(null);	// 儲存動畫 ID

	const	reset = () => {
				resetGame()
				.then((res) => {
					if(res.data.statusCode === 1) {
						smallCircleCount.value = res.data.max_num;
						initializeCircles();
						updateCircles();
					}
					else {
						console.log('連線出現問題~');
					};
				})
				.catch((err) => {
					console.log(err);
				});
			},
			waitTime = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms));
			},
			initializeCircles = async () => {
				smallCircles.value = [];

				for(let i = 0; i < smallCircleCount.value; i ++) {
					await createSmallBall(i);
					await waitTime(100);
				};
			},
			// 初始化小圓形（分批從頂部生成）
			createSmallBall = (i) => {
				let angle = Math.random() * Math.PI + Math.PI,
					x = bigRadius.value + Math.cos(angle) * (Math.random() - 0.5) * (bigRadius.value - smallRadius.value),
					y = bigRadius.value + Math.sin(angle) * Math.random() * (bigRadius.value - smallRadius.value);

				smallCircles.value.push({
					id: i + 1,
					x: x,
					y: y,
					vx: (Math.random() - 0.5) * 2,
					vy: 0,
					settled: false,
				});
			},
			checkCollision = (ball) => {
				return smallCircles.value.find(other => {
					if(other === ball || other.falling)
						return false;

					const dx = ball.x - other.x;
					const dy = (ball.y + ball.radius) - (other.y - other.radius);
					const distance = Math.sqrt(dx * dx + dy * dy);
					return distance < ball.radius * 2;
				});
			},
			// 更新小圓形位置
			updateCircles = () => {
				smallCircles.value = smallCircles.value.map(circle => {
					// 應用重力
					circle.vy += gravity.value;
					let newY = circle.y + circle.vy;
					let newX = circle.x;
					// 大圓底部碰撞
					const distance = Math.sqrt((newX - bigRadius.value) ** 2 + (newY - bigRadius.value) ** 2);

					if(distance + smallRadius.value > bigRadius.value) {
						newY = bigRadius.value + Math.sqrt(bigRadius.value ** 2 - (newX - bigRadius.value) ** 2) - smallRadius.value;
						circle.vy = -circle.vy * bounce.value;
					};

					// 其他小圓形碰撞
					let collisionDetected = false;
					smallCircles.value.forEach(other => {
						if(circle.id === other.id )
							return;

						const dx = newX - other.x;
						const dy = newY - other.y;
						const distance = Math.sqrt(dx ** 2 + dy ** 2);
						const minDistance = 2 * smallRadius.value;

						if(distance < minDistance && distance > 0) {
							collisionDetected = true;
							const angle = Math.atan2(dy, dx);
							const overlap = minDistance - distance;
							const pushX = overlap * Math.cos(angle);
							const pushY = overlap * Math.sin(angle);

							if(!other.settled) {
								newX += pushX / 2;
								newY += pushY / 2;
								other.x -= pushX / 2;
								other.y -= pushY / 2;
							};

							// 確保仍在圓內
							const newDistance = Math.sqrt((newX - bigRadius.value) ** 2 + (newY - bigRadius.value) ** 2);

							if(newDistance + smallRadius.value > bigRadius.value) {
								const angle = Math.atan2(newY - bigRadius.value, newX - bigRadius.value);

								newX = bigRadius.value + (bigRadius.value - smallRadius.value) * Math.cos(angle);
								newY = bigRadius.value + (bigRadius.value - smallRadius.value) * Math.sin(angle);
								circle.vy = -circle.vy * bounce.value;
							};
						};
					});

					// 僅在無碰撞時更新位置
					if(!collisionDetected) {
						circle.x = newX;
						circle.y = newY;
					}
					else {
						// 若碰撞，保留新位置供下一次迭代
						circle.x = newX;
						circle.y = newY;
					};

					circle.vy *= friction.value;
					return circle;
				});

				// 再次檢查所有圓形對，確保無重疊
				for(let i = 0; i < smallCircles.value.length; i++) {
					for(let j = i + 1; j < smallCircles.value.length; j++) {
						const circle = smallCircles.value[i];
						const other = smallCircles.value[j];
						const dx = circle.x - other.x;
						const dy = circle.y - other.y;
						const distance = Math.sqrt(dx ** 2 + dy ** 2);
						const minDistance = 2 * smallRadius.value;

						if(distance < minDistance && distance > 0) {
							const angle = Math.atan2(dy, dx);
							const overlap = minDistance - distance;
							const pushX = (overlap * Math.cos(angle)) / 2;
							const pushY = (overlap * Math.sin(angle)) / 2;

							if(!circle.settled) {
								circle.x += pushX;
								circle.y += pushY;
							};

							if(!other.settled) {
								other.x -= pushX;
								other.y -= pushY;
							};

							// 確保仍在圓內
							const newDistance1 = Math.sqrt((circle.x - bigRadius.value) ** 2 + (circle.y - bigRadius.value) ** 2);

							if(newDistance1 + smallRadius.value > bigRadius.value) {
								const angle = Math.atan2(circle.y - bigRadius.value, circle.x - bigRadius.value);
								circle.x = bigRadius.value + (bigRadius.value - smallRadius.value) * Math.cos(angle);
								circle.y = bigRadius.value + (bigRadius.value - smallRadius.value) * Math.sin(angle);
								circle.vy = -circle.vy * bounce.value;

								// if(Math.abs(circle.vy) < 0.1)
								// 	circle.settled = true;
							};

							const newDistance2 = Math.sqrt((other.x - bigRadius.value) ** 2 + (other.y - bigRadius.value) ** 2);

							if(newDistance2 + smallRadius.value > bigRadius.value) {
								const angle = Math.atan2(other.y - bigRadius.value, other.x - bigRadius.value);
								other.x = bigRadius.value + (bigRadius.value - smallRadius.value) * Math.cos(angle);
								other.y = bigRadius.value + (bigRadius.value - smallRadius.value) * Math.sin(angle);
								other.vy = -other.vy * bounce.value;

								// if(Math.abs(other.vy) < 0.1)
								// 	other.settled = true;
							};
						};
					};
				};

				for (let k = 0; k < 3; k++) {
					resolveCollisions();
				}
				// 繼續動畫
				if(smallCircles.value.length < smallCircleCount.value || smallCircles.value.some(circle => !circle.settled))
					animationFrameId.value = requestAnimationFrame(updateCircles);
				else
					cancelAnimationFrame(animationFrameId.value);
			},
			resolveCollisions = () => {
				for (let i = 0; i < smallCircles.value.length; i++) {
					for (let j = i + 1; j < smallCircles.value.length; j++) {
						const c1 = smallCircles.value[i];
						const c2 = smallCircles.value[j];

						const dx = c2.x - c1.x;
						const dy = c2.y - c1.y;
						const distance = Math.sqrt(dx * dx + dy * dy);
						const minDistance = 2 * smallRadius.value;

						if (distance < minDistance && distance > 0) {
							// 推開方向
							const overlap = minDistance - distance;
							const nx = dx / distance;
							const ny = dy / distance;

							// 平分位移
							const shiftX = (overlap / 2) * nx;
							const shiftY = (overlap / 2) * ny;

							c1.x -= shiftX;
							c1.y -= shiftY;
							c2.x += shiftX;
							c2.y += shiftY;

							// 可選：停掉碰撞時的速度（增加穩定度）
							c1.vx *= 0.8;
							c1.vy *= 0.8;
							c2.vx *= 0.8;
							c2.vy *= 0.8;
						}
					}
				}
			},
			// 處理點擊事件
			selectNumber = (id) => {
				makeGuess(id);
			},
			makeGuess = async(num) => {
				guessGame({ guess: num })
				.then((res) => {
					if(res.data.statusCode === 1) {
						if(res.data.status === 'wrong')
							smallCircles.value = smallCircles.value.filter(e => e.id < res.data.max_num && res.data.min_num < e.id);
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
			};

	onMounted(() => {
		reset();
	});
	onBeforeUnmount(() => {
		if(animationFrameId.value)
			cancelAnimationFrame(animationFrameId.value);
	});

	return {
		bigRadius,
		smallRadius,
		smallCircles,
		selectNumber
	};
};

export default guessNumberGameOld;


