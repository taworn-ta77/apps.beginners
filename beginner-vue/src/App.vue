<template>
	<router-view></router-view>
</template>


<script setup lang="ts">
import { useAppStore } from './stores/AppStore';
</script>


<script lang="ts">
export default {
	name: 'App',

	data: function () {
		return {
		};
	},

	mounted() {
		useAppStore().setup();
	},

	methods: {
	},
};
</script>


<style scoped lang="scss">
#app {
	margin: 0;
	padding: 0;
	height: 100%;
}
</style>
