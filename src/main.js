import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// axios - https://www.npmjs.com/package/vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// VUE-ROUTER - https://router.vuejs.org/
import router from './router';

import { createPinia } from 'pinia';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
const vuetify = createVuetify({
	components,
	directives
});
const app = createApp(App);
app.provide('router', router); // 提供 router
app.use(vuetify).use(VueAxios, axios).use(router).use(createPinia()).mount('#app');