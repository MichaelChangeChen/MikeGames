<template>
	<div class="da-vinci-cdoe">
		<div class="left-section">
			<v-card class="score-box-card">
				<div class="score-box">
					<div class="score best">1. {{ 'qweqwe' }}</div>
					<div class="score best">2. {{ 'ggdd' }}</div>
					<div class="score best">3. {{ 'ccxxcvb' }}</div>
				</div>
			</v-card>
		</div>
		<div class="middle-section">
			<h1 @click="reset" class="restart">RESTART</h1>
			<div>
				<canvas
					:width="canvasSize"
					:height="canvasSize"
					ref="canvasRef"
					class="canv" />
			</div>
			<div class="detail">
				<span class="your-time">{{ playerName }}: {{ guessTime }}</span>
				<div v-if="tips" :class="`tips ${guessTime > 5 ? 'danger' : ''}`">{{ tips }}</div>
			</div>
		</div>
		<div class="right-section">
			<v-card class="score-box-card">
				<div class="score-box">
					<div class="score best">BEST SCORE: {{ bestScroe.guess_time || '???' }}</div>
					<div class="score best">BEST SCORE ID: {{ bestScroe.name || '???' }}</div>
				</div>
			</v-card>
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
		playerName,
		bestScroe,
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
	justify-content: space-evenly;
	align-items: center;
	color: white;
	font-family: 'Bitcount_Roman';
	.left-section,
	.right-section {
		padding: 20px;
	}
	.middle-section {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.score-box-card {
		user-select: none;
		margin: auto;
		min-width: 200px;
		background-color:rgba(73, 73, 73, 0.1);
		color: wheat;
		transition: .3s ease-in-out;
		.score-box {
			padding: 15px 20px;
			font-size: 14px;
			:hover {
				background-color:rgba(73, 73, 73, 0.5);
			}
		}
		&:hover {
			background-color:rgba(73, 73, 73, 0.5);
		}
	}
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