import { guessGame, resetGame } from '@/api/getApi';
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';

export default defineComponent({
	name: 'DaVinciCdoeOld',
	setup() {
	const 	bigRadius = ref(250), 			// Â§ßÂ??äÂ?
			smallRadius = ref(15), 			// Â∞èÂ??äÂ?
			smallCircleCount = ref(0), 		// Â∞èÂ??∏È?
			gravity = ref(4), 				// ?çÂ??†ÈÄüÂ∫¶
			friction = ref(0,95), 			// ?©Êì¶??
			bounce = ref(0.3), 				// ?çÂ?‰øÇÊï∏
			smallCircles = ref([]), 		// ?≤Â?Â∞èÂ?ÂΩ¢Ë???
			animationFrameId = ref(null);	// ?≤Â??ïÁï´ ID

	const	reset = () => {
				resetGame()
				.then((res) => {
					if(res.data.statusCode === 1) {
						smallCircleCount.value = res.data.max_num;
						initializeCircles();
						updateCircles();
					}
					else {
						console.log('????∫Áèæ?èÈ?~');
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
			// ?ùÂ??ñÂ??ìÂΩ¢ÔºàÂ??πÂ??ÇÈÉ®?üÊ?Ôº?
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
			// ?¥Êñ∞Â∞èÂ?ÂΩ¢‰?ÁΩ?
			updateCircles = () => {
				smallCircles.value = smallCircles.value.map(circle => {
					// ?âÁî®?çÂ?
					circle.vy += gravity.value;
					let newY = circle.y + circle.vy;
					let newX = circle.x;
					// Â§ßÂ?Â∫ïÈÉ®Á¢∞Ê?
					const distance = Math.sqrt((newX - bigRadius.value) ** 2 + (newY - bigRadius.value) ** 2);

					if(distance + smallRadius.value > bigRadius.value) {
						newY = bigRadius.value + Math.sqrt(bigRadius.value ** 2 - (newX - bigRadius.value) ** 2) - smallRadius.value;
						circle.vy = -circle.vy * bounce.value;
					};

					// ?∂‰?Â∞èÂ?ÂΩ¢Á¢∞??
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

							// Á¢∫‰?‰ªçÂú®?ìÂÖß
							const newDistance = Math.sqrt((newX - bigRadius.value) ** 2 + (newY - bigRadius.value) ** 2);

							if(newDistance + smallRadius.value > bigRadius.value) {
								const angle = Math.atan2(newY - bigRadius.value, newX - bigRadius.value);

								newX = bigRadius.value + (bigRadius.value - smallRadius.value) * Math.cos(angle);
								newY = bigRadius.value + (bigRadius.value - smallRadius.value) * Math.sin(angle);
								circle.vy = -circle.vy * bounce.value;
							};
						};
					});

					// ?ÖÂú®?°Á¢∞?ûÊ??¥Êñ∞‰ΩçÁΩÆ
					if(!collisionDetected) {
						circle.x = newX;
						circle.y = newY;
					}
					else {
						// ?•Á¢∞?ûÔ?‰øùÁ??∞‰?ÁΩÆ‰?‰∏ã‰?Ê¨°Ëø≠‰ª?
						circle.x = newX;
						circle.y = newY;
					};

					circle.vy *= friction.value;
					return circle;
				});

				// ?çÊ¨°Ê™¢Êü•?Ä?âÂ?ÂΩ¢Â?ÔºåÁ¢∫‰øùÁÑ°?çÁ?
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

							// Á¢∫‰?‰ªçÂú®?ìÂÖß
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
				// ÁπºÁ??ïÁï´
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
							// ?®È??πÂ?
							const overlap = minDistance - distance;
							const nx = dx / distance;
							const ny = dy / distance;

							// Âπ≥Â?‰ΩçÁßª
							const shiftX = (overlap / 2) * nx;
							const shiftY = (overlap / 2) * ny;

							c1.x -= shiftX;
							c1.y -= shiftY;
							c2.x += shiftX;
							c2.y += shiftY;

							// ?ØÈÅ∏ÔºöÂ??âÁ¢∞?ûÊ??ÑÈÄüÂ∫¶ÔºàÂ??†Á©©ÂÆöÂ∫¶Ôº?
							c1.vx *= 0.8;
							c1.vy *= 0.8;
							c2.vx *= 0.8;
							c2.vy *= 0.8;
						}
					}
				}
			},
			// ?ïÁ?ÈªûÊ?‰∫ã‰ª∂
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
						console.log('????∫Áèæ?èÈ?~');
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
	}
});



