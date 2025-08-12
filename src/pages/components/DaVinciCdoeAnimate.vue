<template>
	<div v-if="open" class="da-vinci-cdoe-animate">
		<div class="block-track">
			<div class="block-box">
				<div class="block"/>
				<div class="block next"/>
				<div class="block"/>
				<div class="block next"/>
			</div>
			<div class="block"/>
			<div class="block next"/>
			<div class="block-box">
				<div class="block"/>
				<div class="block next"/>
				<div class="block"/>
				<div class="block next"/>
			</div>
			<div class="block"/>
			<div class="block next"/>
			<div class="block-box">
				<div class="block"/>
				<div class="block next"/>
				<div class="block"/>
				<div class="block next"/>
			</div>
		</div>
		<div :class="`text-track ${message}`">{{ message }}</div>
	</div>
</template>

<script setup>
	import daVinciCdoeAnimate from '@/js/components/daVinciCdoeAnimate.js';
	import { defineExpose } from 'vue';

	const { open, check, message } = daVinciCdoeAnimate();
	defineExpose({check})
</script>

<style lang="scss" scoped>
	.da-vinci-cdoe-animate {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		animation: flash 1.5s linear;
		overflow: hidden;
		.text-track {
			position: absolute;
			top: 10vw;
			height: 250px;
			font-size: 160px;
			font-weight: bloder;
			text-shadow: 8px 8px 20px white, 8px -8px 20px white;
			text-wrap: nowrap;
			transform: rotate(-10deg) translateX(-250vw) translateY(20vh);
			animation: textMove 1.2s cubic-bezier(0.1, 1.2, 0.5, 0.1);
		}
		.SAFE {
			color: hsl(118, 100%, 50%);
			text-shadow: 	0px 0px 15px hsl(0, 0%, 0%)
							8px 8px 30px hsl(128, 100%, 80%),
							8px -8px 30px hsl(128, 100%, 80%),
							-8px 8px 30px hsl(128, 90%, 90%),
							-8px -8px 30px hsl(128, 90%, 90%);
		}
		.BOOOM {
			color: hsl(0, 100%, 70%);
			text-shadow:	0px 0px 15px hsl(0, 0%, 0%)
							8px 8px 30px hsl(0, 100%, 80%),
							8px -8px 30px hsl(0, 100%, 80%),
							-8px 8px 30px hsl(0, 90%, 90%),
							-8px -8px 30px hsl(0, 90%, 90%);
		}

		.block-track {
			position: absolute;
			top: 0;
			display: flex;
			flex-direction: column;
			gap: 3px;
			transform: rotate(-10deg) translateX(-200vw) translateY(20vh);
			animation: blockMove 1.3s 0.1s linear;
			.block-box {
				gap: 1px;
				.block {
					height: 10px;
				}
			}
			.block {
				width: 120vw;
				height: 30px;
				background: linear-gradient(to right,
											rgba(0,0,0,0) 1%,
											rgba(0,0,0,1) 25%,
											rgba(0,0,0,1) 75% ,
											rgba(0,0,0,0) 99%);
			}
			.block.next {
				transform: translateX(500px);
			}
		}
	}

	@keyframes flash {
		0% {
			background-color: rgb(255, 255, 255);
		}
		15% {
			background-color: rgba(0, 0, 0, 0.9);
		}
		100% {
			background-color: rgba(0, 0, 0, 0);
		}
	}
	@keyframes blockMove {
		0% {
			transform: rotate(-10deg) translateX(-200vw) translateY(20vh);
		}
		30% {
			transform: rotate(-10deg) translateX(-15vw) translateY(20vh);
		}
		80% {
			transform: rotate(-10deg) translateX(-15vw) translateY(20vh);
		}
		100% {
			transform: rotate(-10deg) translateX(200vw) translateY(20vh);
		}
	}
	@keyframes textMove {
		0% {
			transform: rotate(-10deg) translateX(-250vw) translateY(20vh);
		}
		100% {
			transform: rotate(-10deg) translateX(200vw) translateY(20vh);
		}
	}
</style>