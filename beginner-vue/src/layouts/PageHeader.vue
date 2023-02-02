<template>
	<div id="container">
		<h1>{{ title || $t('app') }}</h1>
		<div id="right-outer-bar">
			<div id="right-bar">
				<button @click.prevent="setLocale('en')">EN</button>
				<button @click.prevent="setLocale('th')">TH</button>
			</div>
		</div>
	</div>
</template>


<script setup lang="ts">
import { useAppStore } from '../stores/AppStore';
</script>


<script lang="ts">
export default {
	props: {
		/**
		 * Display title.
		 */
		'title': String,
	},

	data: function () {
		return {
		};
	},

	mounted() {
	},

	methods: {
		setLocale: function (locale: string): void {
			useAppStore().setLocale(locale);
		},
	},
};
</script>


<style scoped lang="scss">
#container {
	display: flex;
	flex-direction: row;
}

#right-outer-bar {
	flex: 1 0;
	display: flex;
	flex-direction: column;
}

#right-bar {
	flex: 1 0;
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: flex-end;
}

h1 {
	margin-right: 1rem;
	font-size: 200%;
}

#right-bar button {
	padding: 0.5rem 0.5rem;
}
</style>
