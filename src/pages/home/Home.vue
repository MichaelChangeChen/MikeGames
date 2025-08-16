<template>
	<div class="index">
		<div class="welcome title-text">Welcome
			<span v-if="isShow">{{ name }}</span>
		</div>
		<div
			v-if="isShow"
			@click="start()"
			class="start title-text">GAME START</div>
		<div class="input-box">
			<v-text-field
				v-model="name"
				:messages="message"
				:disabled="isShow"
				:loading="isloading"
				placeholder="Enter Your Name"
				variant="outlined"
				autocomplete="off"
				class="name"
				clearable/>
			<div class="d-flex justify-space-between ga-2">
				<v-btn
					:disabled="isShow || isloading || !name"
					@click="checkUserName"
					class="flex-grow-1"
					variant="outlined"
					color="#a5ffa5b6">
					<v-icon icon="check" size="x-large"/>
				</v-btn>
				<v-btn
					:disabled="!isShow"
					@click="clearName"
					class="flex-grow-1"
					variant="outlined"
					color="#af5f5fb6">
					<v-icon icon="close" size="x-large"/>
				</v-btn>
			</div>
		</div>
	</div>
</template>

<script setup>
	import home from '@/js/home/home.js';

	const {
		name,
		start,
		isShow,
		message,
		isloading,
		clearName,
		checkUserName, } = home();
</script>

<style lang="scss" scoped>
.index {
	user-select: none;
	width: 100%;
	height: 100%;
	background-color: black;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 15px;
	.title-text {
		color: white;
		font-family: 'Bitcount_Roman';
		transition: .2s ease-in-out;
		font-size: 30px;
		animation: flash 1.5s ease infinite alternate, show 3s ease-in-out;
	}
	.welcome {
		position: absolute;
		top: 10vh;
		font-size: 70px;
		letter-spacing: 3px;
		transform: scale(1) !important;
	}
	.start {
		width: 350px;
		height: 100px;
		margin-bottom: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		&:hover {
			font-size: 45px;
			letter-spacing: 3px;
			transform: scale(1) !important;
		}
	}
	.input-box {
		position: absolute;
		top: 60vh;
		display: flex;
		flex-direction: column;
		gap: 30px;
		.name {
			width: 250px;
			max-height: 50px;
			:deep(.v-input__control) {
				color: rgb(255, 240, 198);
				.v-field__field {
					input {
						padding-top: 0;
						padding-bottom: 0;
						min-height: 40px;
						text-align: center;
					}
				}
			}
			:deep(.v-input__details) {
				color: rgb(255, 240, 198);
				padding-bottom: 3px;
				text-align: center;
			}
		}
	}

	@keyframes flash {
		0% {
			text-shadow: -6px -5px 15px rgba(0, 255, 242),
							10px 5px 5px rgb(0, 255, 242),
							0px 5px 5px rgb(255, 224, 84),
							0px 5px 5px rgb(255, 224, 84);
			transform: scale(1);
		}
		33% {
			text-shadow: -6px -2px 5px rgba(93, 255, 247),
							10px 5px 5px rgba(200, 255, 0),
							0px 5px 5px rgb(255, 84, 246),
							0px 5px 25px rgb(95, 84, 255);
			transform: scale(1.05);
		}
		66% {
			text-shadow: -6px -4px 5px rgba(255, 0, 212),
							10px 5px 5px rgb(0, 209, 52),
							0px 5px 5px rgb(151, 72, 72),
							0px 5px 10px rgb(10, 0, 153);
			transform: scale(1);
		}
		100% {
			text-shadow: -6px -5px 15px rgba(0, 255, 242),
							10px 5px 5px rgb(0, 255, 242),
							0px 5px 5px rgb(255, 224, 84),
							0px 5px 25px rgb(255, 224, 84);
			transform: scale(1.05);
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
}
</style>