<template>
	 <v-skeleton-loader
	 	v-if="open"
		:loading="loading"
		elevation="1"
		class="game-over">
		<div v-if="scroeText" class="new-score">{{ scroeText }}</div>
		<div v-if="scroeText" class="trun">NEW SCROE!!</div>
		<div class="text">GAME OVER</div>
		<div class="message">{{ message }}</div>
		<div @click="goMainPage" class="continue">CONTINUE</div>
		<div v-if="scroeText" class="trun back">NEW SCROE!!</div>
		<div v-if="scroeText" class="new-score bottom">{{ scroeText }}</div>
	 </v-skeleton-loader>
</template>

<script setup>
	import gameOver from '@/js/components/gameOver.js';
	import { defineExpose } from 'vue';

	const {
		open,
		check,
		message,
		loading,
		scroeText,
		goMainPage
	} = gameOver();
	defineExpose({check})
</script>

<style lang="scss" scoped>
	.game-over {
		user-select: none;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		animation: show 2s ease forwards;
		background-color: black;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 8px;
		.new-score {
			text-wrap: nowrap;
			position: absolute;
			top: -5%;
			left: 0;
			right: 0;
			font-size: 120px;
			animation: move 6s linear infinite reverse, color 4s linear infinite reverse;
		}
		.new-score.bottom {
			top: unset;
			bottom: -5%;
			animation: move 6s linear infinite, color 4s linear infinite;
		}
		.trun {
			font-size: 20px;
			position: absolute;
			top: 35%;
			left: 10%;
			animation: trun 6s linear infinite reverse, color 4s linear infinite reverse;
		}
		.trun.back {
			bottom: 35%;
			right: 10%;
			top: unset;
			left: unset;
			animation: trun 6s linear infinite, color 4s linear infinite;
		}
		.text {
			font-size: 70px;
		}
		.message {
			font-size: 15px;
			margin-bottom: 100px;
		}
		.continue {
			cursor: pointer;
			color: wheat;
			font-size: 22px;
			transition: .2s ease-out;
			&:hover {
				transform: scale(1.2);
			}
		}
	}

	@keyframes show {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes trun {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes move {
		0% {
			transform: translateX(-350vw);
		}
		100% {
			transform: translateX(110vw);
		}
	}
	@keyframes color {
		0% {
			color: aquamarine;
		}
		10% {
			color: burlywood;
		}
		20% {
			color:darkorange;
		}
		30% {
			color: rgb(255, 127, 244);
		}
		40% {
			color: rgb(238, 236, 114);
		}
		50% {
			color:rgb(106, 245, 124);
		}
		60% {
			color: rgb(72, 121, 255);
		}
		70% {
			color: burlywood;
		}
		80% {
			color:rgb(239, 118, 255);
		}
		90% {
			color:rgb(253, 205, 146);
		}
		100% {
			color:rgb(87, 236, 41);
		}
	}
</style>