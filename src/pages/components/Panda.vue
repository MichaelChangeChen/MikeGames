<template>
	<div class="panda">
		<div class="panda-btn-group">
			<div class="btn-group">
				<v-img
					@click="selectedAward('pandapay ?謖???$111', 'A1')"
					:class="[{ actibve: awardType === 'A1' }, 'panda-btn']"
					src="A1.png.png"
					cover/>
				<v-btn
					@click="openDialog('pandapay ?謖???$111', 'A1')"
					class="detail-btn"
					rounded="lg"
					text="??????"
					color="#ff68bd"/>
			</div>
			<div class="btn-group">
				<v-img
					@click="selectedAward('pandapay ?謖???$10,000', 'A2')"
					:class="[{ actibve: awardType === 'A2' }, 'panda-btn']"
					src="A2.png.png"
					cover/>
				<v-btn
					@click="openDialog('pandapay ?謖???$10,000', 'A2')"
					class="detail-btn"
					rounded="lg"
					text="??????"
					color="#ff68bd"/>
			</div>
			<div class="btn-group">
				<v-img
					@click="selectedAward('?綜謒急謍啗????ｆ?????', 'A3')"
					:class="[{ actibve: awardType === 'A3' }, 'panda-btn']"
					src="A3.png.png"
					cover/>
				<v-btn
					@click="openDialog('?綜謒急謍啗????ｆ?????', 'A3')"
					class="detail-btn"
					rounded="lg"
					text="??????"
					color="#ff68bd"/>
			</div>
		</div>
		<h1>
			????爸{ awardText }}
			<span class="spe-text">????選?{{ awardType === 'A1' ? 111 : awardType === 'A2' ? 11 : 1 }}???/span>
			<span v-if="startDisabled" class="font-weight-thin">??甇?鞈???/span>
		</h1>
		<v-btn
			:disabled="startDisabled"
			@click="getStart()"
			class="active-btn"
			rounded="lg"
			size="x-large"
			min-width="200"
			text="?鞈????"
			color="#ff0090"/>

		<Loading :isOpen="isLoading" />
		<v-dialog
			v-model="dialog"
			max-width="1000"
			style="user-select: none;"
			persistent>
			<v-card>
				<v-card-title class="d-flex">
					<h2 class="text-pink-lighten-1">
						{{ detailText }}
						<h6 class="d-inline">????選?{{ detailtype === 'A1' ? 111 : detailtype === 'A2' ? 11 : 1 }}???/h6>
					</h2>
					<v-spacer/>
					<v-btn
						@click="closeDialog()"
						color="#ff0090"
						text="X"/>
				</v-card-title>
				<v-card-text>
					<div class="d-flex text-no-wrap font-weight-bold mb-5">
						<v-divider class="align-self-center border-opacity-50" color="error"/>
						??????????
						<v-divider class="align-self-center border-opacity-50" color="error"/>
					</div>
					<div class="d-flex ga-5 justify-center flex-wrap ga-2">
						<v-chip
							v-for="(item, index) in openList"
							:key="item.index"
							color="pink-lighten-1"
							class="min-wid text-pink font-weight-bold">
							{{ '???' + (index + 1) + ' - ' + item.name + ' - ' + item.phone }}
						</v-chip>
						<h3 v-if="openList.length === 0" class="text-pink font-weight-bold mt-5">?竣????????</h3>
					</div>
				</v-card-text>
				<v-card-actions>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script src="@/js/components/panda.js"></script>

<style lang="scss" scoped>
.min-wid {
	min-width: 280px;
}
.panda {
	user-select: none;
	display: flex;
	flex-direction: column;
	gap: 30px;
	margin: 20px 0 100px;
	.panda-btn-group {
		margin-bottom: 50px;
		display: flex;
		justify-content: center;
		.btn-group {
			.panda-btn {
				width: 300px;
				user-select: none;
				transition: .3s ease-in-out;
				cursor: pointer;
				:deep(img) {
					transition: .3s ease-in-out;
					&:hover {
						filter: drop-shadow(0 0 10px #ff0090);
					}
				}
			}
			.actibve {
				filter: drop-shadow(0 0 15px #ff0090) brightness(1.3);
			}
			.detail-btn {
				font-size: 20px;
				font-weight: bold;
				display: block;
				margin: -15px auto 0;
			}
		}
	}
	h1 {
		font-size: 44px;
		color: rgb(255, 0, 144);
		font-weight: bolder;
		text-align: center;
		text-shadow: 0 0 10px white, 0 0 20px #ff68be;
		span {
			font-size: 18px;
		}
		.spe-text {
			text-shadow: 0 0 8px white;
		}
	}
	.active-btn {
		margin-top: 20px;
		align-self: center;
		font-size: 28px;
		font-weight: bolder;
	}
}
</style>
