import { ref } from 'vue';
import { useRouter } from 'vue-router';

const gameOver = () => {
	const 	open = ref(false),
			message = ref(null),
			router = useRouter(),
			loading = ref(false),
			scroeText = ref(null),
			scroeList = [
				"Wow, you crushed it! High score achieved!",
				"Amazing! So stoked you got the high score!",
				"You're a beast! High score, here we come!",
				"That's the highest score I've seen! Congratulations on your high score!",
				"You've set a new record! High score achieved!",
				"Your dedication paid off! High score, well done!",
				"Way to go! Aim for even higher scores next time.",
				"Keep up the great work! You're on a roll!",
				"So happy for you! You totally deserve that high score.",
				"I knew you could do it! High score, you legend!"
			];
	const 	check = (	msg,
						newScroe) => {
				message.value = msg;
				open.value = true;

				if(newScroe)
					scroeText.value = scroeList[Math.floor(Math.random() * 10)];
			},
			goMainPage	= () => {
				router.push('/');
			};
	return {
		open,
		check,
		message,
		loading,
		scroeText,
		goMainPage
	};
};

export default gameOver;