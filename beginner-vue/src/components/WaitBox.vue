<template>
	<div v-if="opened" class="shader" :style="{ background: options.barrierBackground }">
		<div class="center">
			<div class="dialog" :style="{ background: options.edgeBackground }">
				<div class="body">
					<p>{{ $t('text0') }}</p>
					<p>
						{{ $t('text1') }}
						<span :class="step > 0 ? 'visible' : 'hidden'">.</span>
						<span :class="step > 1 ? 'visible' : 'hidden'">.</span>
						<span :class="step > 2 ? 'visible' : 'hidden'">.</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>


<script setup lang="ts">
import type { WaitBoxOptions } from './WaitBox';
</script>


<script lang="ts">
export default {
	expose: [
		'setDefaults',
		'isOpen',
		'open',
		'close',
	],

	data: function () {
		return {
			defaultOptions: <WaitBoxOptions>{
				barrierBackground: '#3339',
				edgeBackground: '#000',
			},
			options: <WaitBoxOptions>{
			},
			opened: false,
			step: 0,
			timer: 0,
		};
	},

	mounted() {
	},

	methods: {
		/**
		 * Set defaults options, before calling open().
		 */
		setDefaults: function (options: WaitBoxOptions): void {
			this.defaultOptions = { ...options };
		},

		/**
		 * Checks if the wait box is opened or not.
		 */
		isOpen: function (): boolean {
			return this.opened;
		},

		/**
		 * Opens wait box.
		 * Return true if the wait box is opened successfully.
		 * Otherwise, it is false.
		 */
		open: function (options?: WaitBoxOptions): boolean {
			// checks if it already opened
			if (this.opened) {
				return false;
			}

			this.options = { ...this.defaultOptions };
			if (options) {
				if (typeof options.barrierBackground === 'string')
					this.options.barrierBackground = options.barrierBackground;
				if (typeof options.edgeBackground === 'string')
					this.options.edgeBackground = options.edgeBackground;
			}
			this.opened = true;
			this.step = 0;
			this.timer = setInterval(() => {
				if (this.step >= 3)
					this.step = 0;
				else
					this.step++;

			}, 1000);

			const e = document.activeElement as HTMLElement;
			e.blur();

			return true;
		},

		/**
		 * Closes the wait box.
		 */
		close: function (): void {
			if (this.opened) {
				clearInterval(this.timer);
				this.opened = false;
			}
		},
	},

	watch: {
	},

	i18n: {
		messages: {
			en: {
				text0: "Now Loading",
				text1: "Please wait",
			},
			th: {
				text0: "กำลังโหลดข้อมูล",
				text1: "กรุณารอสักครู่",
			},
		},
	},
};
</script>


<style scoped lang="scss">
$border-radius-width: 0.75rem;
$shadow-width: 0.25rem;
$shadow-height: 0.25rem;
$shadow-color: #666c;
$padding-around-width: 1rem;
$padding-around-height: 1rem;
$body-background: #fff;
$body-color: #000;

.shader {
	position: fixed;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
}

.center {
	left: 50%;
	top: 50%;
	width: 10rem;
}

.dialog {
	border-radius: $border-radius-width;
	box-shadow: $shadow-width $shadow-height $shadow-color;
	padding: 0.25rem 0.25rem;
	transform: translateX(-50%) translateY(-50%);
}

.body {
	border-radius: $border-radius-width;
	padding: $padding-around-height $padding-around-width;
	background: $body-background;
	color: $body-color;
}

.visible {
	visibility: visible;
}

.hidden {
	visibility: hidden;
}
</style>
