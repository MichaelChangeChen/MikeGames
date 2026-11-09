<template>
	<div v-if="loadingShow" :class="[ 'loading', checkOpenClass ]" :style="loadingStyle">
		<div class="loading-text">LOADING...</div>
		<div :style="{ backgroundColor: topBgc }" class="top-bg"/>
		<div class="ball-box">
			<svg
				width="100%"
				height="100%"
				id="circleSvg">
				<g v-for="item in smallCircles" :key="item.x">
					<circle
						:cx="item.x"
						:cy="item.y"
						:r="smallRadius"
						:fill="item.color"
						class="small-circle"/>
				</g>
			</svg>
		</div>
		<div :style="{ backgroundColor: bootomBgc }" class="bot-bg"/>
		<div class="loading-number">
			<div class="linebox">
				<div :style="`--loading-text: ${checkOpenClass ? loadingText : 0.5}%`" class="line"/>
			</div>
			<span class="text">{{ loadingText }}%</span>
		</div>
	</div>
</template>

<script src="@/js/components/loading.js"></script>

<style lang="scss" scoped>
	.loading {
		--panel-overlap: clamp(24px, 10vh, 120px);
		user-select: none;
		opacity: 0;
		position: fixed;
		z-index: 9999;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		overflow: hidden;
		transition: opacity .8s .5s ease-in-out;
		.loading-text {
			position: absolute;
			z-index: 3;
			top: 10%;
			left: 0;
			right: 0;
			text-align: center;
			color: rgba(255, 255, 255, 0.8);
			text-shadow: 5px 5px 20px rgb(73, 73, 73);
			font-family: 'Bitcount_Roman';
			font-size: clamp(28px, 7vw, 60px);
			font-weight: bolder;
			transition: opacity .8s 3s ease-in-out;
			animation: loading 1s infinite linear;
		}
		.top-bg {
			position: absolute;
			top: -100vmax;
			bottom: calc(100% - var(--slope-top) - var(--panel-overlap));
			left: 0;
			right: 0;
			transform: translateY(-100%) skewY(var(--slope-angle));
			transform-origin: bottom left;
			background-color: rgb(0, 0, 0);
			transition: transform 1s ease-in-out;
		}
		.bot-bg {
			position: absolute;
			top: var(--slope-top);
			bottom: -100vmax;
			left: 0;
			right: 0;
			transform: translateY(100%) skewY(var(--slope-angle));
			transform-origin: top left;
			background-color: rgb(0, 0, 0);
			box-shadow: inset 8px 8px 20px rgba(0, 0, 0, 0.1);
			transition: transform 1s ease-in-out;
		}
		.ball-box {
			position: absolute;
			inset: 0;
			z-index: 1;
			pointer-events: none;
		}
		.loading-number {
			position: absolute;
			z-index: 2;
			bottom: 15%;
			right: 0;
			left: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 5px;
			.linebox {
				border-radius: 20px;
				height: 3px;
				width: 80%;
				background-color: rgba(255, 255, 255, 0.2);
				.line {
					background-color: rgba(255, 255, 255);
					box-shadow: 5px 5px 20px rgb(160, 160, 160);
					height: 100%;
					width: var(--loading-text);
					transition: .8s ease-in-out;
				}
			}
			.text {
				color: rgba(255, 255, 255, 0.8);
				font-family: 'Bitcount_Roman';
				font-size: 20px;
				font-weight: bolder;
			}
		}
	}

	.loading.open {
		opacity: 1;
		transition: opacity .8s .2s ease-in-out;
		.top-bg {
			transform: skewY(var(--slope-angle));
		}
		.bot-bg {
			transform: skewY(var(--slope-angle));
		}
	}

	@keyframes loading {
		0% {
			opacity: 0;
		}
		10% {
			opacity: 0.6;
		}
		50% {
			opacity: 0.4;
		}
		70% {
			opacity: 0.9;
		}
		100% {
			opacity: 0;
		}
	}
</style>
