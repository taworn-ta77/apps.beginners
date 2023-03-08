<template>
	<div>
		<MessageBox ref="messageBox" />
		<WaitBox ref="waitBox" />
	</div>
</template>


<script lang="ts">
import type { MessageBoxOptions } from '../components/MessageBox';
import type { WaitBoxOptions } from '../components/WaitBox';
import MessageBox from '../components/MessageBox.vue';
import WaitBox from '../components/WaitBox.vue';

export default {
	components: {
		MessageBox,
		WaitBox,
	},

	expose: [
		'isMessageBoxOpen',
		'open',
		'info',
		'warning',
		'error',
		'question',
		'isWaitBoxOpen',
		'waitOpen',
		'waitClose',
	],

	data: function () {
		return {
			messageBox: <InstanceType<typeof MessageBox> | null>null,
			waitBox: <InstanceType<typeof WaitBox> | null>null,
		};
	},

	mounted() {
		this.messageBox = this.$refs.messageBox as InstanceType<typeof MessageBox>;
		this.messageBox.setDefaults(<MessageBoxOptions>{
			barrierBackground: '#111c',
			titleBackground: '#333',
			titleColor: '#eee',
		});

		this.waitBox = this.$refs.waitBox as InstanceType<typeof WaitBox>;
		this.waitBox.setDefaults(<WaitBoxOptions>{
			barrierBackground: '#111c',
			edgeBackground: '#999',
		});
	},

	methods: {
		isMessageBoxOpen: function (): boolean {
			return this.messageBox?.isOpen() ?? false;
		},

		open: function (options: MessageBoxOptions): boolean {
			return this.messageBox?.open(options) ?? false;
		},

		info: function (content: string, callback?: (result: boolean) => void): boolean {
			return this.messageBox?.info(content, callback) ?? false;
		},

		warning: function (content: string, callback?: (result: boolean) => void): boolean {
			return this.messageBox?.warning(content, callback) ?? false;
		},

		error: function (content: string, callback?: (result: boolean) => void): boolean {
			return this.messageBox?.error(content, callback) ?? false;
		},

		question: function (content: string, callback?: (result: boolean) => void): boolean {
			return this.messageBox?.question(content, callback) ?? false;
		},

		isWaitBoxOpen: function (): boolean {
			return this.waitBox?.isOpen() ?? false;
		},

		waitOpen: function (): boolean {
			return this.waitBox?.open() ?? false;
		},

		waitClose: function (): void {
			return this.waitBox?.close();
		},
	},
};
</script>


<style scoped lang="scss"></style>
