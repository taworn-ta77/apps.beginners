import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';
import { messages as en } from './locales/en';
import { messages as th } from './locales/th';
import router from './router';
import './assets/main.css';
import MessageBox from './components/MessageBox.vue';
import WaitBox from './components/WaitBox.vue';
import AppBox from './layouts/AppBox.vue';
import App from './App.vue';

const i18n = createI18n({
	legacy: true,  // you must set to false, if you want to use Composition API
	locale: 'en',
	fallbackLocale: 'en',
	messages: {
		en,
		th,
	},
});

const app = createApp(App);
app
	.provide('i18n', i18n)
	.use(i18n)
	.use(createPinia())
	.use(router)
	.component('MessageBox', MessageBox)
	.component('WaitBox', WaitBox)
	.component('AppBox', AppBox)
	.mount('#app');
