import { guessGame, resetGame } from '@/api/getApi';
import { ref, onMounted, onUnmounted } from 'vue';

const daVinciCdoe = () => {
	const 	canvasSize = ref(500),				// 畫布大小為
		 	canvasRef = ref(null),
		 	guessTime = ref(null),
		 	daVinciCdoeAnimate = ref(null),
		 	tips = ref(null),
			smallRadius = 15,					// 小球半徑
			bigRadius = canvasSize.value / 2,	// 大圓半徑 ,畫布一半（圓形容器）
			gravity = 0.3,						// 重力加速度
			friction = 0.98,					// 摩擦力（使速度逐漸降低）
			bounce = 0.9;						// 邊界彈性係數（撞牆後反彈程度）

	let	animationId = null,
		dragBall = null,
		offsetX = 0,
		offsetY = 0,
		ballCount = 0,
		ballBox = [];

	class Ball {
		constructor(x, y, radius, id) {
			// 初始位置與基本屬性
			this.x = x;
			this.y = y;
			this.vx = 0;
			this.vy = 0;
			this.radius = radius;
			this.color = `hsl(${(Math.random() - 1) * Math.random() * 360}, 75%, 70%)`;
			this.id = id;
		};
		draw(ctx) {
			ctx.beginPath();
			ctx.arc(this.x,
					this.y,
					this.radius,
					0,
					Math.PI * 2);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.fillStyle = 'white';
			ctx.font = '12px serif';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(this.id, this.x, this.y);
		};
		update() {
			if(this.id === dragBall?.id)
				return this.vy = 0;

			// 應用重力
			this.vy += gravity;		// 重力作用
			this.vy *= friction;	// 摩擦減速
			this.x += this.vx;
			this.y += this.vy;

			// 避免速度無限小但不為 0 的抖動
			if(Math.abs(this.vx) < 0.01)
				this.vx = 0;
			if(Math.abs(this.vy) < 0.01)
				this.vy = 0;
		};
		resolveBoundary() {
			const 	dx = this.x - bigRadius,
					dy = this.y - bigRadius,
					dist = Math.sqrt(dx * dx + dy * dy),
					maxDist = bigRadius - this.radius;

			if(dist > maxDist) {
				// 位置推回圓內
				const angle = Math.atan2(dy, dx);
				this.x = bigRadius + maxDist * Math.cos(angle);
				this.y = bigRadius + maxDist * Math.sin(angle);

				// 速度反彈（投影在法線方向）
				const 	normalX = dx / dist,
						normalY = dy / dist,
						dot = this.vx * normalX + this.vy * normalY;
				this.vx -= 2 * dot * normalX * bounce;
				this.vy -= 2 * dot * normalY * bounce;
			};
		};
		resolveCollision(other) {
			const 	dx = other.x - this.x,
					dy = other.y - this.y,
					dist = Math.hypot(dx, dy),
					minDist = this.radius + other.radius;

			if(dist < minDist && dist > 0) {
				// 計算重疊與法線向量
				const 	nx = dx / dist,
						ny = dy / dist,
						overlap = minDist - dist;

				// 推開彼此
				this.x -= nx * overlap * 0.5;
				this.y -= ny * overlap * 0.5;
				other.x += nx * overlap * 0.5;
				other.y += ny * overlap * 0.5;

				// 彈性碰撞速度計算 (1D 投影)
				const 	tx = -ny,
						ty = nx,
						dpTan1 = this.vx * tx + this.vy * ty,
						dpTan2 = other.vx * tx + other.vy * ty,
						dpNorm1 = this.vx * nx + this.vy * ny,
						dpNorm2 = other.vx * nx + other.vy * ny;

				// 交換法向速度分量
				this.vx = tx * dpTan1 + nx * dpNorm2;
				this.vy = ty * dpTan1 + ny * dpNorm2;
				other.vx = tx * dpTan2 + nx * dpNorm1;
				other.vy = ty * dpTan2 + ny * dpNorm1;
			};
		}
	};

	const	reset = () => {
				resetGame()
				.then((res) => {
					if(res.data.statusCode === 1) {
						ballCount = res.data.max_num;
						guessTime.value = res.data.guess_time;
						tips.value = res.data.tips;

						daVinciCdoeAnimate.value.check(res.data.message);
						initBalls();
					}
					else
						console.log('連線出現問題~');
				})
				.catch((err) => {
					console.log(err);
				});
			},
			makeGuess = async(num) => {
				guessGame({ guess: num })
				.then((res) => {
					if(res.data.statusCode === 1) {
						if(res.data.status === 'safe')
							ballBox = ballBox.filter(e => e.id < res.data.max_num && res.data.min_num < e.id);

						if(res.data.status === 'boom')
							ballBox = [];


						daVinciCdoeAnimate.value.check(res.data.message);
						tips.value = res.data.tips;
						guessTime.value = res.data.guess_time;
					}
					else {
						console.log('連線出現問題~');
					};
				})
				.catch((err) => {
					console.log(err);
				});
			},
			// 初始化所有小球位置
			initBalls = async() => {
				ballBox = [];
				for (let i = 0; i < ballCount; i ++) {
					await createSmallBall(i);
					await waitTime(15);
				};
			},
			waitTime = (ms) => {
				return new Promise(resolve => setTimeout(resolve, ms));
			},
			// 初始化小圓形（分批從頂部生成）
			createSmallBall = (i) => {
				// 隨機選擇大圓的「上半圓」區域
				const 	angle = Math.random() * Math.PI + Math.PI,		// 角度在上半圓
						radius = (Math.random() * 0.3 + 0.4) * (bigRadius - smallRadius),
						x = bigRadius + Math.cos(angle) * radius,
						y = bigRadius + Math.sin(angle) * radius;

				ballBox.push(new Ball(x, y, smallRadius, i + 1));
			},
			// 主動畫迴圈
			animate = () => {
				const canvas = canvasRef.value;

				if(!canvas)
					return;

				const ctx = canvas.getContext('2d');
				// 清除畫面
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				// 畫出大圓邊界
				ctx.beginPath();
				ctx.arc(bigRadius, bigRadius, bigRadius - 1, 0, Math.PI * 2);
				ctx.strokeStyle = '#999';
				ctx.stroke();
				ctx.fillStyle = 'white';
				ctx.fill();

				// 位置更新（重力）
				ballBox.forEach(ball => ball.update());

				// 多次處理碰撞與邊界（提高穩定性）
				for(let iter = 0; iter < 12; iter++) {
					for(let i = 0; i < ballBox.length; i++) {
						for(let j = i + 1; j < ballBox.length; j++) {
							ballBox[i].resolveCollision(ballBox[j]);
						};
						ballBox[i].resolveBoundary();
					};
				};

				// 繪製小球
				ballBox.forEach(ball => ball.draw(ctx));
				animationId = requestAnimationFrame(animate);
			},
			// 處理點擊事件
			selectNumber = (id) => {
				makeGuess(id);
			},
			getMousePos = (e) => {
				const rect = canvasRef.value.getBoundingClientRect()
				return {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				};
			},
			handleMouseMove = (e) => {
				const { x, y } = getMousePos(e);
				// 改變 cursor
				let isHover = false;
				for(const ball of ballBox) {
					const dx = x - ball.x;
					const dy = y - ball.y;
					if(Math.sqrt(dx * dx + dy * dy) <= ball.radius) {
						isHover = true;
						break;
					};
				};
				canvasRef.value.style.cursor = dragBall ? 'grabbing' : isHover ? 'pointer' : 'default';
				// 如果正在拖曳某個球 → 更新其位置
				if(dragBall) {
					dragBall.x = x - offsetX;
					dragBall.y = y - offsetY;
					dragBall.vx = 0; // 拖曳中不受速度影響
					dragBall.vy = 0;
				};
			},
			handleMouseDown = (e) => {
				const { x, y } = getMousePos(e);
				for(const ball of ballBox) {
					const dx = x - ball.x;
					const dy = y - ball.y;
					if(Math.sqrt(dx * dx + dy * dy) <= ball.radius) {
						offsetX = dx;
						offsetY = dy;
						dragBall = ball;
						break;
					};
				};
			},
			handleMouseUp = (e) => {
				if(dragBall)
					dragBall = null;
			},
			handleClick = (e) => {
				const { x, y } = getMousePos(e);
				for(const ball of ballBox) {
					const dx = x - ball.x;
					const dy = y - ball.y;
					if(Math.sqrt(dx * dx + dy * dy) <= ball.radius) {
						selectNumber(ball.id);
						break;
					};
				};
			};

	onMounted(() => {
		animate();
		reset();

		// 滑鼠移動事件：改變指標樣式
		canvasRef.value.addEventListener('mousemove', handleMouseMove);
		canvasRef.value.addEventListener('mousedown', handleMouseDown);
		canvasRef.value.addEventListener('mouseup', handleMouseUp);
		canvasRef.value.addEventListener('dblclick', handleClick);
	});
	// 卸載時停止動畫
	onUnmounted(() => {
		if(animationId)
			cancelAnimationFrame(animationId);
	});

	return {
		daVinciCdoeAnimate,
		canvasSize,
		canvasRef,
		guessTime,
		tips,
		reset
	};
};

export default daVinciCdoe;