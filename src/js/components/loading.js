import { defineComponent, ref, toRef, watch } from 'vue';

export default defineComponent({
	name: 'Loading',
	props: {
		isOpen: {
			type: Boolean,
			required: true
		}
	},
	setup(props) {
		const isOpen = toRef(props, 'isOpen');
		const 	smallRadius = ref(15),
				smallCircleCount = ref(3),
				smallCircles = ref([]),
				baseY = 315,
				gravity = ref(1.5),
				friction = ref(1.07),
				bounce = 0.7,
				animationFrameId = ref(null),
				checkOpenClass = ref(null),
				loadingText = ref(0),
				loadingShow = ref(false),
				topBgc = ref('black'),
				bootomBgc = ref('black');

		let slopeAngle = -5 * Math.PI / 180;

		const	slopeYAt = (x) => {
					return baseY - Math.tan(slopeAngle) * x;
				},
				initializeCircles = () => {
					smallCircles.value = [];
					setTimeout(() => createSmallBall(smallCircleCount.value), 1000);
				},
				createSmallBall = () => {
					smallCircles.value.push({
						x: 50,
						y: 50,
						vx: 0,
						vy: 0,
						color: `hsl(${(Math.random() - 1) * Math.random() * 360}, 75%, 60%)`,
						settled: false,
					});
					updateCircles(smallCircles.value);
				},
				updateCircles = () => {
					smallCircles.value = smallCircles.value.map(circle => {
						if(circle.settled)
							return circle;

						circle.vy += gravity.value;

						let newX = circle.x + circle.vx,
							newY = circle.y + circle.vy;

						const slopeY = slopeYAt(newX);

						if(newY + smallRadius.value >= slopeY) {
							newY = slopeY - smallRadius.value;

							const 	normalX = Math.sin(-slopeAngle),
									normalY = Math.cos(-slopeAngle),
									vDotN = circle.vx * normalX + circle.vy * normalY,
									bounceV = -vDotN * bounce,
									tangentX = Math.cos(-slopeAngle),
									tangentY = Math.sin(-slopeAngle),
									vDotT = circle.vx * tangentX + circle.vy * tangentY;

							circle.vx = tangentX * vDotT + normalX * bounceV;
							circle.vy = tangentY * vDotT + normalY * bounceV;
							circle.vx *= friction.value;
							circle.vy *= friction.value;

							if(Math.abs(circle.vx) < 0.01 && Math.abs(circle.vy) < 0.01) {
								circle.vx = 0;
								circle.vy = 0;
								circle.settled = true;
							}
						}

						circle.x = newX;
						circle.y = newY;

						if(circle.x < smallRadius.value)
							circle.x = smallRadius.value;

						return circle;
					});

					if (smallCircles.value.length < smallCircleCount.value || smallCircles.value.some(c => !c.settled))
						animationFrameId.value = requestAnimationFrame(updateCircles);
					else
						cancelAnimationFrame(animationFrameId.value);
				},
				easeOutQuad = (t) => {
					return t * (2 - t);
				},
				runLoadingTime = () => {
					const 	totalDuration = 3000,
							freezeDuration = 700;

					let startTime = Date.now(),
						freezeTimeUsed = false;

					function animate() {
						let now = Date.now(),
							elapsed = now - startTime,
							t = Math.min(elapsed / totalDuration, 1),
							eased = easeOutQuad(t),
							targetLoadingText = Math.floor(eased * 100);

						if(!freezeTimeUsed && targetLoadingText >= 80 && targetLoadingText < 100) {
							freezeTimeUsed = true;
							const pausedAt = Date.now();
							setTimeout(() => {
								startTime += Date.now() - pausedAt;
								requestAnimationFrame(animate);
							}, freezeDuration);
							return;
						}

						loadingText.value = targetLoadingText;

						if(t < 1)
							requestAnimationFrame(animate);
					}

					requestAnimationFrame(animate);
				},
				changeBGColor = () => {
					topBgc.value = `rgb(${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100})`;
					bootomBgc.value = `rgb(${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100}, ${Math.floor(Math.random() * 156) + 100})`;
				};

		watch(isOpen, async(val) => {
			if(val) {
				await changeBGColor();
				await setTimeout(() => loadingShow.value = true, 100);
				await setTimeout(() => {
					checkOpenClass.value = 'open';
					initializeCircles();
					runLoadingTime();
				}, 500);
			}
			else {
				checkOpenClass.value = null;
				setTimeout(() => {
					loadingShow.value = false;
					cancelAnimationFrame(animationFrameId.value);
				}, 800);
			}
		});

		return {
			smallRadius,
			smallCircles,
			checkOpenClass,
			loadingText,
			loadingShow,
			topBgc,
			bootomBgc
		};
	}
});
