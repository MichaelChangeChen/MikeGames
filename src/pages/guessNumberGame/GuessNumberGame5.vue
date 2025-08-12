<template>
	<div class="circle-container">
		<h1 @click="sss">{{ aaa }}</h1>
	</div>
</template>

<script setup>
	import guessNumberGame5 from '@/js/guessNumberGame/guessNumberGame5.js';
	const { aaa, sss } = guessNumberGame5();
</script>