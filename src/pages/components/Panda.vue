<template>
	<div class="panda">
		<div class="panda-btn-group">
			<div class="btn-group">
				<v-img
					@click="selectedAward('pandapay 胖達幣 $111', 'A1')"
					:class="[{ 'actibve': awardType === 'A1' }, 'panda-btn']"
					src="A1.png.png"
					cover/>
				<v-btn
					@click="openDialog('pandapay 胖達幣 $111', 'A1')"
					class="detail-btn"
					rounded="lg"
					text="中獎名單"
					color="#ff68bd"/>
			</div>
			<div class="btn-group">
				<v-img
					@click="selectedAward('pandapay 胖達幣 $10,000', 'A2')"
					:class="[{ 'actibve': awardType === 'A2' }, 'panda-btn']"
					src="A2.png.png"
					cover/>
				<v-btn
					@click="openDialog('pandapay 胖達幣 $10,000', 'A2')"
					class="detail-btn"
					rounded="lg"
					text="中獎名單"
					color="#ff68bd"/>
			</div>
			<div class="btn-group">
				<v-img
					@click="selectedAward('黑白廚師韓國美食之旅', 'A3')"
					:class="[{ 'actibve': awardType === 'A3' }, 'panda-btn']"
					src="A3.png.png"
					cover/>
				<v-btn
					@click="openDialog('黑白廚師韓國美食之旅', 'A3')"
					class="detail-btn"
					rounded="lg"
					text="中獎名單"
					color="#ff68bd"/>
			</div>
		</div>
		<h1>
			獎項：{{ awardText }}
			<span class="spe-text">【名額：{{ this.awardType === 'A1' ? 111 : this.awardType === 'A2' ? 11 : 1 }}名】</span>
			<span v-if="startDisabled" class="font-weight-thin">（已抽完）</span>
		</h1>
		<v-btn
			:disabled="startDisabled"
			@click="getStart()"
			class="active-btn"
			rounded="lg"
			size="x-large"
			min-width="200"
			text="抽獎按鈕"
			color="#ff0090"/>

	<Loading :isLoading="isLoading" />
	<v-dialog
		v-model="dialog"
		max-width="1000"
		style="user-select: none;"
		persistent>
		<v-card>
     		 <v-card-title class="d-flex">
				<h2 class="text-pink-lighten-1">
					{{ detailText }}
					<h6 class="d-inline">【名額：{{ this.detailtype === 'A1' ? 111 : this.detailtype === 'A2' ? 11 : 1 }}名】</h6>
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
					　中獎名單　
					<v-divider class="align-self-center border-opacity-50" color="error"/>
				</div>
				<div class="d-flex ga-5 justify-center flex-wrap ga-2">
					<v-chip
						v-for="(item, index) in openList"
						:key="item.index"
						color="pink-lighten-1"
						class="min-wid text-pink font-weight-bold">
						{{ '名額' + (index + 1) + ' - ' + item.name + ' - ' + item.phone }}
					</v-chip>
					<h3 v-if="openList.length === 0" class="text-pink font-weight-bold mt-5">～尚未抽獎～</h3>
				</div>
			</v-card-text>
			<v-card-actions>
			</v-card-actions>
		</v-card>
	</v-dialog>
	</div>
</template>

<script>
import Papa from 'papaparse';
import Loading from '@/components/Loading.vue';

export default {
	components: { Loading },
	data(){
		return {
			dialog: false,
			isLoading: false,
			detailText: null,
			awardType: 'A1',
			detailtype: null,
			awardText: 'pandapay 胖達幣 $111',
			A1List: [],
			A2List: [],
			A3List: [],
			openList: [],
			totalList: []
		}
	},
	mounted() {
		this.getFile();
	},
	computed: {
		startDisabled() {
			if(this.awardType === 'A1' && this.A1List.length > 0)
				return true;
			if(this.awardType === 'A2' && this.A2List.length > 0)
				return true;
			if(this.awardType === 'A3' && this.A3List.length > 0)
				return true;
		}
	},
	methods: {
		selectedAward(	typeText,
						type) {
			this.awardText = typeText;
			this.awardType = type;
		},
		openDialog(	text,
					type) {
			this.detailText = text;
			this.detailtype = type;

			if(type === 'A1')
				this.openList = [ ...this.A1List ];
			if(type === 'A2')
				this.openList = [ ...this.A2List ];
			if(type === 'A3')
				this.openList = [ ...this.A3List ];

			this.dialog = true;
		},
		closeDialog() {
			this.dialog = false;
			setTimeout(() => {
				this.detailText = null;
				this.openList = [];
			}, 500);
		},
		getFile() {
			this.isLoading = true;
			fetch('largeData.csv')
			.then(res => res.text())
			.then(data => {
				const parsedData = Papa.parse(	data,
												{ header: true });
				this.totalList = parsedData.data;
				this.isLoading = false;
			})
			.catch(error => {
				console.error("Error loading CSV file:", error);
				this.isLoading = false;
			});
		},
		getStart() {
			this.isLoading = true;
			setTimeout(()=> {
				if(this.awardType === 'A1')
					this.getRandomWinners(111);
				if(this.awardType === 'A2')
					this.getRandomWinners(11);
				if(this.awardType === 'A3')
					this.getRandomWinners(1);
			},1000);
		},
		downloadCSV(content,
					filename) {
			const blob = new Blob(	["\uFEFF" + content],
									{ type: 'text/csv;charset=utf-8;' });
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = filename;
			link.click();
		},
		getRandomWinners(winnerCount) {
			for(let i = this.totalList.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[this.totalList[i], this.totalList[j]] = [this.totalList[j], this.totalList[i]];
			};
			this[`${this.awardType}List`] = this.totalList.splice(0, winnerCount);
			this.downloadCSV(Papa.unparse(this[`${this.awardType}List`]), this.awardText + '.csv');
			this.openDialog(this.awardText,
							this.awardType);
			this.openList = [ ...this[`${this.awardType}List`] ];
			this.isLoading = false;
		}
	}
}
</script>

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