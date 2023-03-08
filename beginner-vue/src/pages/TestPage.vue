<template>
	<AppBox :title="$t('title')">
		<section>
			<h1>{{ $t('local') }}</h1>
			<div>
				<button @click.prevent="localOpen($t('close'), MessageBoxType.close, false, true)">
					Open [{{ $t('close') }}]</button>
				<button @click.prevent="localOpen($t('ok'), MessageBoxType.ok, false, true)">
					Open [{{ $t('ok') }}]</button>
				<button @click.prevent="localOpen($t('okCancel'), MessageBoxType.okCancel, false, true)">
					Open [{{ $t('okCancel') }}]</button>
				<button @click.prevent="localOpen($t('yesNo'), MessageBoxType.yesNo, true, false)">
					Open [{{ $t('yesNo') }}]</button>
				<button @click.prevent="localOpen($t('retryCancel'), MessageBoxType.retryCancel, true, false)">
					Open [{{ $t('retryCancel') }}]</button>
			</div>
			<div>
				<button @click.prevent="localInfo">{{ $t('info') }}</button>
				<button @click.prevent="localWarning">{{ $t('warning') }}</button>
				<button @click.prevent="localError">{{ $t('error') }}</button>
				<button @click.prevent="localQuestion">{{ $t('question') }}</button>
			</div>
		</section>

		<section>
			<h1>{{ $t('global') }}</h1>
			<div>
				<button @click.prevent="globalOpen($t('close'), MessageBoxType.close, false, true)">
					Open [{{ $t('close') }}]</button>
				<button @click.prevent="globalOpen($t('ok'), MessageBoxType.ok, false, true)">
					Open [{{ $t('ok') }}]</button>
				<button @click.prevent="globalOpen($t('okCancel'), MessageBoxType.okCancel, false, true)">
					Open [{{ $t('okCancel') }}]</button>
				<button @click.prevent="globalOpen($t('yesNo'), MessageBoxType.yesNo, true, false)">
					Open [{{ $t('yesNo') }}]</button>
				<button @click.prevent="globalOpen($t('retryCancel'), MessageBoxType.retryCancel, true, false)">
					Open [{{ $t('retryCancel') }}]</button>
			</div>
			<div>
				<button @click.prevent="globalInfo">{{ $t('info') }}</button>
				<button @click.prevent="globalWarning">{{ $t('warning') }}</button>
				<button @click.prevent="globalError">{{ $t('error') }}</button>
				<button @click.prevent="globalQuestion">{{ $t('question') }}</button>
			</div>
		</section>

		<section>
			<h1>{{ $t('wait') }}</h1>
			<div>
				<button @click.prevent="localWait()">{{ $t('localWait') }}</button>
				<button @click.prevent="globalWait()">{{ $t('globalWait') }}</button>
				<button @click.prevent="asyncWait()">{{ $t('asyncWait') }}</button>
			</div>
		</section>

		<MessageBox ref="messageBox" @message-box-closed="closedMessageLocal" />
		<WaitBox ref="waitBox" />
	</AppBox>
</template>


<script setup lang="ts">
import { useAppStore } from '@/stores/AppStore';
import { MessageBoxType, type MessageBoxOptions } from '@/components/MessageBox';
import MessageBox from '@/components/MessageBox.vue';
import WaitBox from '@/components/WaitBox.vue';
import type { WaitBoxOptions } from '@/components/WaitBox';

export type MessageBoxRef = InstanceType<typeof MessageBox>;
export type WaitBoxRef = InstanceType<typeof WaitBox>;
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
			barrierBackground: '#113c',
			titleBackground: '#336',
			titleColor: '#eef',
		});

		const waitBox = this.$refs.waitBox as WaitBoxRef;
		waitBox.setDefaults(<WaitBoxOptions>{
			barrierBackground: '#113c',
			edgeBackground: '#69c',
		});
	},

	methods: {
		closedMessageLocal: function (result: boolean): void {
			console.log(`[message] message box closed, result: ${result}`);
		},

		closedLocal: function (result: boolean): void {
			console.log(`[callback] message box closed, result: ${result}`);
		},

		closedShared: function (result: boolean): void {
			console.log(`[shared callback] message box closed, result: ${result}`);
		},

		localOpen: function (caption: string, type: MessageBoxType, alternateFocus: boolean, barrierDismissible: boolean): void {
			const messageBox = this.$refs.messageBox as MessageBoxRef;
			if (!messageBox.isOpen()) {
				messageBox.open({
					caption,
					content: this.$t('content'),
					type,
					alternateFocus,
					barrierDismissible,
					callback: this.closedLocal,
				});
			}
		},

		localInfo: function (): void {
			const messageBox = this.$refs.messageBox as MessageBoxRef;
			if (!messageBox.isOpen()) {
				messageBox.info(this.$t('content'), this.closedLocal);
			}
		},

		localWarning: function (): void {
			const messageBox = this.$refs.messageBox as MessageBoxRef;
			if (!messageBox.isOpen()) {
				messageBox.warning(this.$t('content'), this.closedLocal);
			}
		},

		localError: function (): void {
			const messageBox = this.$refs.messageBox as MessageBoxRef;
			if (!messageBox.isOpen()) {
				messageBox.error(this.$t('content'), this.closedLocal);
			}
		},

		localQuestion: function (): void {
			const messageBox = this.$refs.messageBox as MessageBoxRef;
			if (!messageBox.isOpen()) {
				messageBox.question(this.$t('content'), this.closedLocal);
			}
		},

		globalOpen: function (caption: string, type: MessageBoxType, alternateFocus: boolean, barrierDismissible: boolean): void {
			if (!useAppStore().isMessageBoxOpen()) {
				useAppStore().messageBox({
					caption,
					content: this.$t('content'),
					type,
					alternateFocus,
					barrierDismissible,
					callback: this.closedShared,
				});
			}
		},

		globalInfo: function (): void {
			if (!useAppStore().isMessageBoxOpen()) {
				useAppStore().info(this.$t('content'), this.closedShared);
			}
		},

		globalWarning: function (): void {
			if (!useAppStore().isMessageBoxOpen()) {
				useAppStore().warning(this.$t('content'), this.closedShared);
			}
		},

		globalError: function (): void {
			if (!useAppStore().isMessageBoxOpen()) {
				useAppStore().error(this.$t('content'), this.closedShared);
			}
		},

		globalQuestion: function (): void {
			if (!useAppStore().isMessageBoxOpen()) {
				useAppStore().question(this.$t('content'), this.closedShared);
			}
		},

		localWait: function (): void {
			const waitBox = this.$refs.waitBox as InstanceType<typeof WaitBox>;
			if (!waitBox.isOpen()) {
				waitBox.open();
				let n = 0;
				const timer = setInterval(() => {
					n++;
					if (n >= 3) {
						clearInterval(timer);
						waitBox.close();
					}
				}, 1000);
			}
		},

		globalWait: function (): void {
			if (!useAppStore().isWaitBoxOpen()) {
				useAppStore().waitOpen();
				let n = 0;
				const timer = setInterval(() => {
					n++;
					if (n >= 3) {
						clearInterval(timer);
						useAppStore().waitClose();
					}
				}, 1000);
			}
		},

		asyncWait: async function (): Promise<void> {
			if (!useAppStore().isWaitBoxOpen()) {
				useAppStore().wait(async () => {
					await new Promise(r => setTimeout(r, 3000));
					return;
				});
			}
		},
	},

	i18n: {
		messages: {
			en: {
				title: "Test",
				local: "Test with local MessageBox",
				global: "Test with global MessageBox",
				close: "Close",
				ok: "OK",
				okCancel: "OK/Cancel",
				yesNo: "Yes/No",
				retryCancel: "Retry/Cancel",
				info: "Infomation",
				warning: "Warning",
				error: "Error",
				question: "Question",
				content: "Aaaa Bbbb Cccc Dddd\nใช่ใช่ใช่ใช่ ไม่ไม่ไม่ไม่",
				wait: "Test Waiting",
				localWait: "Wait local",
				globalWait: "Wait global",
				asyncWait: "Wait async",
			},
			th: {
				title: "ทดสอบ",
				local: "ทดสอบกับ กล่องข้อความ local",
				global: "ทดสอบกับ กล่องข้อความ global",
				close: "ปิด",
				ok: "ตกลง",
				okCancel: "ตกลง/ยกเลิก",
				yesNo: "ใช่/ไม่ใช่",
				retryCancel: "ลองใหม่/ยกเลิก",
				info: "ข่าวสาร",
				warning: "แจ้งเตือน",
				error: "เกิดข้อผิดพลาด",
				question: "คำถาม",
				content: "ใช่ใช่ใช่ใช่ ไม่ไม่ไม่ไม่\nAaaa Bbbb Cccc Dddd",
				wait: "ทดสอบการรอ",
				localWait: "การรอ locale",
				globalWait: "การรอ global",
				asyncWait: "การรอ async",
			},
		},
	},
};
</script>


<style scoped lang="scss">
section {
	margin: 0 0 2rem;
	padding: 1rem;
	border: 2px solid #333;
}

section h1 {
	margin: 0 0 1rem;
}
</style>
