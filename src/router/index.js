import { createRouter, createWebHistory } from 'vue-router';
const routes = [
	{
		path: '/',
		component: () => import('@/pages/home/Home.vue'),
	},
	{
		path: '/guessNumberGameTest',
		name: 'guessNumberGameTest',
		component: () => import('@/pages/guessNumberGame/guessNumberGameTest.vue'),
		meta: {}
	},
	{
		path: '/guessNumberGame',
		name: 'guessNumberGame',
		component: () => import('@/pages/guessNumberGame/guessNumberGame.vue'),
		meta: {}
	},
	{
		path: '/guessNumberGame/old',
		name: 'guessNumberGameOld',
		component: () => import('@/pages/guessNumberGame/guessNumberGame_old.vue'),
		meta: {}
	},
	{
		path: '/guessNumberGame5',
		name: 'guessNumberGame5',
		component: () => import('@/pages/guessNumberGame/guessNumberGame5.vue'),
		meta: {}
	},
];
const router = createRouter({
	history: createWebHistory('/MikeGames/'),
	routes
});
export default router;