import { ref } from 'vue';
import guessNumberGame3 from './guessNumberGame3';


const guessNumberGame5 = () => {
	const aaa = ref('hellow');

	const sss = () => {
		console.log(aaa.value);

		if(aaa.value === 'hellow')
			aaa.value = 'bbb';
		else if(aaa.value === 'bbb')
			aaa.value = 'hellow';
	};

	return { aaa, sss };
}

export default guessNumberGame5;