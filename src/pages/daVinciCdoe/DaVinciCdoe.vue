<template>
	<div class="da-vinci-cdoe">
		<!-- <div class="score-box">
			<div class="score best">BEST SCORE: {{ 'qweqwe' }}</div>
			<div class="score best">BEST SCORE ID: {{ 'asdasdasd' }}</div>
		</div> -->
		<h1 @click="reset" class="restart">RESTART</h1>
		<div>
			<canvas
				:width="canvasSize"
				:height="canvasSize"
				ref="canvasRef"
				class="canv" />
		</div>
		<div class="detail">
			<span class="your-time">YOUR TIMES: {{ guessTime }}</span>
			<div v-if="tips" :class="`tips ${guessTime > 5 ? 'danger' : ''}`">{{ tips }}</div>
		</div>

		<DaVinciCdoeAnimate ref="daVinciCdoeAnimate" />
	</div>
</template>

<script setup>
	import daVinciCdoe from '@/js/daVinciCdoe/daVinciCdoe.js';
	import DaVinciCdoeAnimate from '@/pages/components/DaVinciCdoeAnimate.vue';
	const {
		daVinciCdoeAnimate,
		canvasSize,
		canvasRef,
		guessTime,
		tips,
		reset
	} = daVinciCdoe();
</script>

<style lang="scss" scoped>
.da-vinci-cdoe {
	width: 100%;
	height: 100%;
	background-color:rgb(10, 10, 10);
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	color: white;
	font-family: 'Bitcount_Roman';
	.restart {
		transition: .2s ease-in-out;
		cursor: pointer;
		user-select: none;
		&:hover {
			transform: scale(1.3);
			text-shadow: -10px 0px 5px rgba(255, 0, 0, 0.4),
							10px 0px 5px rgb(0, 255, 242, 0.4),
							0px 0px 5px rgb(84, 144, 255),
							0px 0px 25px rgb(255, 224, 84) ;

		}
	}
	.detail {
		padding-top: 20px;
		text-align: center;
		user-select: none;
		.your-time {
			font-size: 20px;
			color: antiquewhite;
		}
		.tips {
			padding-top: 10px;
			padding-left: 10px;
			font-size: 14px;
			animation: tips 2s infinite ease-in-out;
		}
		.tips.danger {
			animation: danger .8s infinite ease-in-out;
		}
	}
	@keyframes tips {
		0% {
			color: white;
			text-shadow: 0px 0px 15px rgb(255, 140, 140);
			transform: scale(1);
		}
		50% {
			color: rgb(255, 140, 140);
			text-shadow: 0px 0px 15px rgb(255, 255, 255);
			transform: scale(1.1);
		}
		100% {
			color: white;
			text-shadow: 0px 0px 15px rgb(255, 140, 140);
			transform: scale(1);
		}
	}
	@keyframes danger {
		0% {
			color: white;
			text-shadow: 0px 0px 35px rgb(255, 53, 53);
			transform: scale(1);
		}
		50% {
			color: rgb(253, 30, 30);
			text-shadow: 0px 0px 35px rgb(255, 255, 255);
			transform: scale(1.5);
		}
		100% {
			color: white;
			text-shadow: 0px 0px 35px rgb(255, 52, 52);
			transform: scale(1);
		}
	}
}
</style>