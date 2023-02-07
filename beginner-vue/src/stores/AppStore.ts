import { defineStore } from 'pinia';
import { inject } from 'vue';
import type { I18n } from 'vue-i18n';

/**
 * Application singleton store class.
 */
export const useAppStore = defineStore({
	id: 'AppStore',

	state: () => ({
		/**
		 * Inject i18n.
		 */
		i18n: <I18n>inject('i18n'),

		/**
		 * Available theme list.
		 */
		themeList: [
			'blue',
			'green',
			'orange',
		],

		/**
		 * Current theme name.
		 */
		theme: '',

		/**
		 * Available tone list.
		 */
		toneList: [
			'default',
			'dark',
			'lite',
		],

		/**
		 * Current tone name.
		 */
		tone: '',

		//
		// more state variables here...
		//
	}),

	actions: {
		/**
		 * Begin current session.
		 */
		async setup(): Promise<void> {
			// NOTE:
			// comment this line(s) if you want to use other save feature
			this.setLocale(localStorage.getItem('locale') || 'en');
			this.setTheme(localStorage.getItem('theme') || '');
			this.setTone(localStorage.getItem('tone') || '');
		},

		// ----------------------------------------------------------------------

		/**
		 * Change current locale.
		 */
		setLocale(locale: string): void {
			this.i18n.global.locale = locale;
			console.log(`current locale: ${this.i18n.global.locale}`);

			// NOTE:
			// comment this line(s) if you want to use other save feature
			localStorage.setItem('locale', this.i18n.global.locale);
		},

		/**
		 * Change current theme.
		 */
		setTheme(theme: string): void {
			// validate parameter and reset theme to default if it is not right
			const index = this.themeList.findIndex((e: string) => e === theme);
			if (index < 0 || index >= this.themeList.length)
				theme = this.themeList[0];

			// set theme
			const root = document.querySelector(':root') as any;
			const style = root.style;
			style.setProperty(`--c-top-header-bg`, `var(--c-${theme}-top-header-bg)`);
			style.setProperty(`--c-top-header-fg`, `var(--c-${theme}-top-header-fg)`);
			document.documentElement.setAttribute('theme', theme);
			this.theme = theme;
			console.log(`current theme: ${this.theme}`);

			// NOTE:
			// comment this line(s) if you want to use other save feature
			localStorage.setItem('theme', this.theme);
		},

		/**
		 * Change current tone.
		 */
		setTone(tone: string): void {
			// validate parameter and reset tone to default if it is not right
			const index = this.toneList.findIndex((e: string) => e === tone);
			if (index < 0 || index >= this.toneList.length)
				tone = this.toneList[0];

			// set tone
			const root = document.querySelector(':root') as any;
			const style = root.style;
			style.setProperty(`--c-background`, `var(--c-${tone}-background)`);
			style.setProperty(`--c-background-soft`, `var(--c-${tone}-background-soft)`);
			style.setProperty(`--c-background-mute`, `var(--c-${tone}-background-mute)`);
			style.setProperty(`--c-border`, `var(--c-${tone}-border)`);
			style.setProperty(`--c-border-hover`, `var(--c-${tone}-border-hover)`);
			style.setProperty(`--c-heading`, `var(--c-${tone}-heading)`);
			style.setProperty(`--c-text`, `var(--c-${tone}-text)`);
			document.documentElement.setAttribute('tone', tone);
			this.tone = tone;
			console.log(`current tone: ${this.tone}`);

			// NOTE:
			// comment this line(s) if you want to use other save feature
			localStorage.setItem('tone', this.tone);
		},

		// ----------------------------------------------------------------------

		//
		// more actions here...
		//
	},
})
