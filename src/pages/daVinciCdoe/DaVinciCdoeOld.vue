<template>
	<div class="circle-container">
		<div class="ball-box">
			<svg
				:width="bigRadius * 2"
				:height="bigRadius * 2"
				id="circleSvg">
				<!-- 大圓形 -->
				<circle
					:cx="bigRadius"
					:cy="bigRadius"
					:r="bigRadius"
					class="big-circle"/>
				<TransitionGroup tag="g" name="fade">
					<!-- 小圓形 -->
					<g v-for="item in smallCircles" :key="item.id">
						<circle
							:cx="item.x"
							:cy="item.y"
							:r="smallRadius"
							@click="selectNumber(item.id)"
							class="small-circle"/>
						<text
							:x="item.x"
							:y="item.y"
							@click="selectNumber(item.id)"
							text-anchor="middle"
							dy=".3em"
							class="small-circle-text">
							{{ item.id }}
						</text>
					</g>
				</TransitionGroup>
			</svg>
		</div>
		<div class="area-info"/>
	</div>
</template>

<script setup>
	import daVinciCdoeOld from '@/js/daVinciCdoe/daVinciCdoeOld.js';
	const {
		bigRadius,
		smallRadius,
		smallCircles,
		selectNumber
	} = daVinciCdoeOld();
</script>

<style lang="scss" scoped>
.circle-container {
	width: 100%;
	height: 100%;
	background-color:black;
	display: flex;
	justify-content: center;
	align-items: center;
	.ball-box {
		border: red solid 2px;
		#circleSvg {
			display: block;
			margin: 0 auto;
			.big-circle {
				fill: #ffffff;
				stroke: #000;
				stroke-width: 2;
			}
			.small-circle {
				fill: #e74c3c;
				stroke: #000;
				stroke-width: 1;
				cursor: pointer;
			}
			.small-circle-text {
				fill: #fff;
				font-size: 12px;
				cursor: pointer;
				user-select: none;
			}
		}
	}
	.area-info {
		font-size: 16px;
		margin-top: 10px;
		text-align: center;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>