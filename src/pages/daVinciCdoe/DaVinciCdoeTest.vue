<template>
	<div class="guess-number-game">
		<div class="">
			<button @click="reset()">重新開始</button>
			<TransitionGroup tag="div" name="fade" class="container box-group">
				<div
					v-for="item in numList"
					:key="item.number"
					@click="selectNumber(item.number)"
					class="the-number">
					{{ item.number }}
				</div>
			</TransitionGroup>
		</div>
		<!-- <button @click="makeGuess">Make Guess</button> -->
	</div>
</template>

<script src="@/js/daVinciCdoe/daVinciCdoeTest.js"/>

<style lang="scss" scoped>
	@use "@/css/guessNumberGame/guess-number-game.scss";
</style>