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
			// comment this line if you want to use other save feature
			this.setLocale(localStorage.getItem('locale') || 'en');
		},

		// ----------------------------------------------------------------------

		/**
		 * Change current locale.
		 */
		setLocale(locale: string): void {
			this.i18n.global.locale = locale;
			console.log(`current locale: ${this.i18n.global.locale}`);

			// NOTE:
			// comment this line if you want to use other save feature
			localStorage.setItem('locale', this.i18n.global.locale);
		},

		//
		// more actions here...
		//
	},
})
