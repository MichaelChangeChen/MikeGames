import { createRouter, createWebHistory } from 'vue-router';
const routes = [
	{
		path: '/',
		component: () => import('@/pages/home/Home.vue'),
	},
	{
		path: '/daVinciCdoe',
		name: 'daVinciCdoe',
		component: () => import('@/pages/daVinciCdoe/DaVinciCdoe.vue'),
		meta: {}
	},
	{
		path: '/daVinciCdoeTest',
		name: 'daVinciCdoeTest',
		component: () => import('@/pages/daVinciCdoe/DaVinciCdoeTest.vue'),
		meta: {}
	},
	{
		path: '/daVinciCdoeOld',
		name: 'daVinciCdoeOld',
		component: () => import('@/pages/daVinciCdoe/daVinciCdoeOld.vue'),
		meta: {}
	},
];
const router = createRouter({
	history: createWebHistory('/MikeGames/'),
	routes
});
export default router;