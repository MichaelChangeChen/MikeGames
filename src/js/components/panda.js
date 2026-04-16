import Papa from 'papaparse';
import { computed, defineComponent, onMounted, ref } from 'vue';
import Loading from '@/pages/components/Loading.vue';

export default defineComponent({
	name: 'Panda',
	components: {
		Loading
	},
	setup() {
		const dialog = ref(false);
		const isLoading = ref(false);
		const detailText = ref(null);
		const awardType = ref('A1');
		const detailtype = ref(null);
		const awardText = ref('pandapay ?謖???$111');
		const A1List = ref([]);
		const A2List = ref([]);
		const A3List = ref([]);
		const openList = ref([]);
		const totalList = ref([]);

		const awardLists = {
			A1: A1List,
			A2: A2List,
			A3: A3List
		};

		const startDisabled = computed(() => {
			if(awardType.value === 'A1' && A1List.value.length > 0)
				return true;
			if(awardType.value === 'A2' && A2List.value.length > 0)
				return true;
			if(awardType.value === 'A3' && A3List.value.length > 0)
				return true;

			return false;
		});

		function selectedAward(typeText, type) {
			awardText.value = typeText;
			awardType.value = type;
		}

		function openDialog(text, type) {
			detailText.value = text;
			detailtype.value = type;
			openList.value = [...awardLists[type].value];
			dialog.value = true;
		}

		function closeDialog() {
			dialog.value = false;
			setTimeout(() => {
				detailText.value = null;
				openList.value = [];
			}, 500);
		}

		function getFile() {
			isLoading.value = true;
			fetch('largeData.csv')
				.then(res => res.text())
				.then(data => {
					const parsedData = Papa.parse(data, { header: true });
					totalList.value = parsedData.data;
					isLoading.value = false;
				})
				.catch(error => {
					console.error('Error loading CSV file:', error);
					isLoading.value = false;
				});
		}

		function getStart() {
			isLoading.value = true;
			setTimeout(() => {
				if(awardType.value === 'A1')
					getRandomWinners(111);
				if(awardType.value === 'A2')
					getRandomWinners(11);
				if(awardType.value === 'A3')
					getRandomWinners(1);
			}, 1000);
		}

		function downloadCSV(content, filename) {
			const blob = new Blob(["\uFEFF" + content], { type: 'text/csv;charset=utf-8;' });
			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = filename;
			link.click();
		}

		function getRandomWinners(winnerCount) {
			for(let i = totalList.value.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[totalList.value[i], totalList.value[j]] = [totalList.value[j], totalList.value[i]];
			}

			const currentList = awardLists[awardType.value];
			currentList.value = totalList.value.splice(0, winnerCount);
			downloadCSV(Papa.unparse(currentList.value), awardText.value + '.csv');
			openDialog(awardText.value, awardType.value);
			openList.value = [...currentList.value];
			isLoading.value = false;
		}

		onMounted(() => {
			getFile();
		});

		return {
			dialog,
			isLoading,
			detailText,
			awardType,
			detailtype,
			awardText,
			openList,
			startDisabled,
			selectedAward,
			openDialog,
			closeDialog,
			getStart
		};
	}
});
