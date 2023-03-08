<template>
	<div id="body">
		<header>
			<PageHeader :title="title"></PageHeader>
		</header>

		<main>
			<slot></slot>
		</main>

		<footer>
			<PageFooter></PageFooter>
		</footer>

		<DialogBox ref="dialogBox" />
	</div>
</template>


<script setup lang="ts">
import PageHeader from './PageHeader.vue';
import PageFooter from './PageFooter.vue';
import DialogBox from './DialogBox.vue';
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
		const dialogBox = this.$refs.dialogBox as InstanceType<typeof DialogBox>
		useAppStore().setupUi(dialogBox);
	},

	methods: {
	},
};
</script>


<style scoped lang="scss">
#body {
	display: flex;
	flex-direction: column;
	height: 100vh;
}

header {
	padding: 1rem 1.5rem 1rem;
	background-color: var(--c-top-header-bg);
	color: var(--c-top-header-fg);
}

main {
	padding: 2rem 1.5rem;
	flex: 1 0;
}

footer {
	padding: 0.25rem 1.5rem;
	text-align: center;
	background-color: #ccc;
	color: #000;
}
</style>
