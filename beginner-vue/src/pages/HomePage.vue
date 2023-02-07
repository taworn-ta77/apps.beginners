<template>
	<AppBox :title="$t('app')">
		<div>
			<button @click.prevent="openClose()">Open [Close]</button>
			<button @click.prevent="openOk()">Open [Ok]</button>
			<button @click.prevent="openOkCancel()">Open [Ok/Cancel]</button>
			<button @click.prevent="openYesNo()">Open [Yes/No]</button>
			<button @click.prevent="openRetryCancel()">Open [Retry/Cancel]</button>
		</div>
		<div>
			<button @click.prevent="info">Infomation</button>
			<button @click.prevent="warning">Warning</button>
			<button @click.prevent="error">Error</button>
			<button @click.prevent="question">Question</button>
		</div>
		<div>
			<button @click.prevent="theme('blue')">Blue Theme</button>
			<button @click.prevent="theme('green')">Green Theme</button>
			<button @click.prevent="theme('orange')">Orange Theme</button>
		</div>
		<div>
			<button @click.prevent="tone('default')">Default Tone</button>
			<button @click.prevent="tone('dark')">Dark Tone</button>
			<button @click.prevent="tone('lite')">Light Tone</button>
		</div>

		<div>abc<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />xyz</div>
		<div>abc<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />xyz</div>
		<div>abc<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />xyz</div>
		<div>abc<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />xyz</div>
		<div>abc<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />xyz</div>

		<MessageBox ref="messageBox" @message-box-closed="receiveClosed" />
	</AppBox>
</template>


<script setup lang="ts">
import { useAppStore } from '@/stores/AppStore';
import {
	MessageBoxResult,
	MessageBoxType,
	type MessageBoxOptions,
} from '../components/MessageBox';
import MessageBox from '../components/MessageBox.vue';
export type MessageBoxRef = InstanceType<typeof MessageBox>;
</script>


<script lang="ts">
export default {
	data: function () {
		return {
		};
	},

	mounted() {
		const messageBox = this.$refs.messageBox as MessageBoxRef;
		messageBox.setDefaults(<MessageBoxOptions>{
			barrierBackground: '#111c',
			titleBackground: '#333',
			titleColor: '#eee',
		});
	},

	methods: {
		receiveClosed: function (result: MessageBoxResult): void {
			console.log(`message box closed, result: ${result} ${MessageBoxResult[result]}`);
		},

		closed: function (result: MessageBoxResult): void {
			console.log(`ok, message box closed, result: ${result} ${MessageBoxResult[result]}`);
		},

		openClose: function (): void {
			const messageBox = this.$refs.messageBox as MessageBoxRef;
			messageBox.open({
				caption: "Close",
				content: `aaa bbbb ccccc dddddd
bbbb ccccc dddddd eeeeeee
ccccc dddddd eeeeeee ffffffff

bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbb

ha ha ha ha ha 5 5 5 5 5
`,
				type: MessageBoxType.close,
				callback: this.closed,
			});
		},

		openOk: function (): void {
			const messageBox = this.$refs.messageBox as MessageBoxRef;
			messageBox.open({
				caption: "Ok",
				content: `aaa bbbb ccccc dddddd`,
				type: MessageBoxType.ok,
				callback: this.closed,
			});
		},

		openOkCancel: function (): void {
			const messageBox = this.$refs.messageBox as MessageBoxRef;
			messageBox.open({
				caption: "Ok/Cancel",
				content: `aaa bbbb ccccc dddddd`,
				type: MessageBoxType.okCancel,
				alternateFocus: true,
				callback: this.closed,
			});
		},

		openYesNo: function (): void {
			const messageBox = this.$refs.messageBox as MessageBoxRef;
			messageBox.open({
				caption: "Yes/No",
				content: `aaa bbbb ccccc dddddd`,
				type: MessageBoxType.yesNo,
				callback: this.closed,
			});
		},

		openRetryCancel: function (): void {
			const messageBox = this.$refs.messageBox as MessageBoxRef;
			messageBox.open({
				caption: "Retry/Cancel",
				content: `aaa bbbb ccccc dddddd`,
				type: MessageBoxType.retryCancel,
				alternateFocus: true,
				barrierDismissible: false,
				callback: this.closed,
			});
		},

		info: function (): void {
			const messageBox = this.$refs.messageBox as MessageBoxRef;
			messageBox.info(`aaa bbbb ccccc dddddd`);
		},

		warning: function (): void {
			const messageBox = this.$refs.messageBox as MessageBoxRef;
			messageBox.warning(`aaa bbbb ccccc dddddd`, this.closed);
		},

		error: function (): void {
			const messageBox = this.$refs.messageBox as MessageBoxRef;
			messageBox.error(`aaa bbbb ccccc dddddd`, this.closed);
		},

		question: function (): void {
			const messageBox = this.$refs.messageBox as MessageBoxRef;
			messageBox.question(`aaa bbbb ccccc dddddd`, this.closed);
		},

		theme: function (theme: string): void {
			useAppStore().setTheme(theme);
		},

		tone: function (tone: string): void {
			useAppStore().setTone(tone);
		},
	},
};
</script>


<style scoped lang="scss">

</style>
