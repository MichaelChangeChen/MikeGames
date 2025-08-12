import { ref, watch } from 'vue';

const loading = (isOpen) => {
	const 	smallRadius = ref(15), 			// 小圓半徑
			smallCircleCount = ref(3), 		// 小圓數量
			smallCircles = ref([]), 		// 儲存小圓形資料
			baseY = 315,					// 斜面左邊 Y 座標
			gravity = ref(1.5), 			// 重力加速度
			friction = ref(1.07), 			// 反彈係數
			bounce = 0.7,					// 反彈
			animationFrameId = ref(null),	// 儲存動畫 ID
			checkOpenClass = ref(null),
			loadingText = ref(0),
			loadingShow = ref(false),
			topBgc = ref('black'),
			bootomBgc = ref('black');

	let slopeAngle = -5 * Math.PI / 180; // -15 度轉弧度

	const	slopeYAt = (x) => {
				return baseY - Math.tan(slopeAngle) * x;
			},
			initializeCircles = () => {
				smallCircles.value = [];
				setTimeout(() => createSmallBall(smallCircleCount.value), 1000);
			},
			// 初始化小圓形（分批從頂部生成）
			createSmallBall = (i) => {
				smallCircles.value.push({
					x: 50,
					y: 50,
					vx: 0,
					vy: 0,
					color: `hsl(${(Math.random() - 1) * Math.random() * 360}, 75%, 70%)`,
					settled: false,
				});
				updateCircles(smallCircles.value);
			},
			// 更新小圓形位置
			updateCircles = () => {
				smallCircles.value = smallCircles.value.map(circle => {
					if(circle.settled)
						return circle;

					// 1. 先加重力（固定往下）
					circle.vy += gravity.value;

					// 2. 預測下一位置
					let newX = circle.x + circle.vx,
						newY = circle.y + circle.vy;

					// 3. 計算斜面高度
					const slopeY = slopeYAt(newX);

					// 4. 如果球底碰到斜面
					if(newY + smallRadius.value >= slopeY) {
						// 將球擺放在斜面上
						newY = slopeY - smallRadius.value;

						const 	normalX = Math.sin(-slopeAngle),						// 計算法向量（垂直斜面方向）
								normalY = Math.cos(-slopeAngle),						// 計算法向量（垂直斜面方向）
								vDotN = circle.vx * normalX + circle.vy * normalY, 		// 計算速度在法向量上的分量（點積）
								bounceV = -vDotN * bounce,								// 反彈：反轉法向速度分量並乘反彈係數
								tangentX = Math.cos(-slopeAngle),						// 計算切向速度分量（沿斜面方向）
								tangentY = Math.sin(-slopeAngle),
								vDotT = circle.vx * tangentX + circle.vy * tangentY;

						// 將反彈後速度分解組合回 vx, vy
						circle.vx = tangentX * vDotT + normalX * bounceV;
						circle.vy = tangentY * vDotT + normalY * bounceV;

						// 摩擦力作用：切向速度衰減
						circle.vx *= friction.value;
						circle.vy *= friction.value;

						// 若速度非常小，視為停止
						if(Math.abs(circle.vx) < 0.01 && Math.abs(circle.vy) < 0.01) {
							circle.vx = 0;
							circle.vy = 0;
							circle.settled = true;
						};
					};

					// 5. 更新位置
					circle.x = newX;
					circle.y = newY;

					// 6. 邊界限制（可選）
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
						freezeDuration = 700; // 卡住時間（毫秒）

				let startTime = Date.now(),
					freezeTimeUsed = false;

				function animate() {
					let now = Date.now(),
						elapsed = now - startTime,
						t = Math.min(elapsed / totalDuration, 1),
						eased = easeOutQuad(t), // Easing 曲線
						targetLoadingText = Math.floor(eased * 100);

					// 模擬 80% 卡住一下
					if(!freezeTimeUsed && targetLoadingText >= 80 && targetLoadingText < 100) {
						freezeTimeUsed = true;

						// 記下目前時間，暫停更新
						const pausedAt = Date.now();

						// 等 freezeDuration 後繼續動畫
						setTimeout(() => {
							// 延長 startTime，以補償 freeze 時間
							startTime += Date.now() - pausedAt;
							requestAnimationFrame(animate); // 繼續動畫
						}, freezeDuration);
						return; // 暫停當前 frame，不更新 loadingText
					};

					loadingText.value = targetLoadingText;

					if(t < 1)
						requestAnimationFrame(animate);
				};

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
		};
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
};

export default loading;