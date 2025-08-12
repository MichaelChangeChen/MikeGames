<template>
	<div class="index">
		<div class="title">
			<a @click="start()">GAME START</a>
		</div>
	</div>
</template>

<script setup>
	import home from '@/js/home/home.js';

	const { start } = home();
</script>

<style lang="scss" scoped>
.index {
	width: 100%;
	height: 100%;
	background-color: black;
	display: flex;
	justify-content: center;
	align-items: center;
	a {
		user-select: none;
		cursor: pointer;
		color: white;
		text-decoration: none;
		font-family: 'Bitcount_Roman';
		font-size: 30px;
		transition: .2s ease-in-out;
		&:hover {
			font-size: 40px;
			letter-spacing: 5px;
			text-shadow: -10px 0px 5px rgba(0, 255, 242, 0.4),
							10px 0px 5px rgb(0, 255, 242, 0.4),
							0px 0px 5px rgb(255, 224, 84),
							0px 0px 25px rgb(255, 224, 84);
		}
	}
}
</style>