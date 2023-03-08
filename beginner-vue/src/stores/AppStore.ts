import { defineStore } from 'pinia';
import { inject } from 'vue';
import type { I18n } from 'vue-i18n';
import type { MessageBoxOptions } from '@/components/MessageBox';

/**
 * Application singleton store class.
 */
export const useAppStore = defineStore({
	id: 'AppStore',

	state: () => ({
		/**
		 * Injects i18n.
		 */
		i18n: <I18n>inject('i18n'),

		/**
		 * Availables theme list.
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
		 * Availables tone list.
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

		/**
		 * DialogBox instance.
		 */
		dialogBox: <any>null,

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

		/**
		 * Setup UI dialog box.
		 */
		setupUi(dialogBox: any): void {
			this.dialogBox = dialogBox;
		},

		// ----------------------------------------------------------------------

		/**
		 * Changes current locale.
		 */
		setLocale(locale: string): void {
			// set current locale
			this.i18n.global.locale = locale;
			console.log(`current locale: ${this.i18n.global.locale}`);

			// NOTE:
			// comment this line(s) if you want to use other save feature
			localStorage.setItem('locale', this.i18n.global.locale);
		},

		/**
		 * Changes current theme.
		 */
		setTheme(theme: string): void {
			// validates parameter and reset theme to default if it is not right
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
		 * Changes current tone.
		 */
		setTone(tone: string): void {
			// validates parameter and reset tone to default if it is not right
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

		/**
		 * Checks if the message box is opened or not.
		 */
		isMessageBoxOpen: function (): boolean {
			return this.dialogBox.isMessageBoxOpen();
		},

		/**
		 * Opens message box.
		 */
		messageBox: function (options: MessageBoxOptions): boolean {
			return this.dialogBox.open(options);
		},

		/**
		 * Opens infomation box.
		 */
		info: function (content: string, callback?: (result: boolean) => void): boolean {
			return this.dialogBox.info(content, callback);
		},

		/**
		 * Opens warning box.
		 */
		warning: function (content: string, callback?: (result: boolean) => void): boolean {
			return this.dialogBox.warning(content, callback);
		},

		/**
		 * Opens error box.
		 */
		error: function (content: string, callback?: (result: boolean) => void): boolean {
			return this.dialogBox.error(content, callback);
		},

		/**
		 * Opens question box.
		 */
		question: function (content: string, callback?: (result: boolean) => void): boolean {
			return this.dialogBox.question(content, callback);
		},

		/**
		 * Checks if the wait box is opened or not.
		 */
		isWaitBoxOpen: function (): boolean {
			return this.dialogBox.isWaitBoxOpen();
		},

		/**
		 * Opens wait box.
		 */
		waitOpen: function (): boolean {
			return this.dialogBox.waitOpen();
		},

		/**
		 * Closes the wait box.
		 */
		waitClose: function (): boolean {
			return this.dialogBox.waitClose();
		},

		/**
		 * Opens wait box and closed when the callback function is returned.
		 */
		wait: async function <T>(callback: () => Promise<T>): Promise<T> {
			this.dialogBox.waitOpen();
			const ret = await callback();
			this.dialogBox.waitClose();
			return ret;
		},

		// ----------------------------------------------------------------------

		//
		// more actions here...
		//
	},
})
