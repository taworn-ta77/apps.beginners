<template>
	<AppBox :title="$t('app')">
		<div>
			<button @click.prevent="theme('blue')">{{ $t('blue') }}</button>
			<button @click.prevent="theme('green')">{{ $t('green') }}</button>
			<button @click.prevent="theme('orange')">{{ $t('orange') }}</button>
		</div>
		<div>
			<button @click.prevent="tone('default')">{{ $t('default') }}</button>
			<button @click.prevent="tone('dark')">{{ $t('dark') }}</button>
			<button @click.prevent="tone('lite')">{{ $t('lite') }}</button>
		</div>
	</AppBox>
</template>


<script setup lang="ts">
import { useAppStore } from '@/stores/AppStore';
</script>


<script lang="ts">
export default {
	data: function () {
		return {
		};
	},

	mounted() {
	},

	methods: {
		theme: function (theme: string): void {
			useAppStore().setTheme(theme);
		},

		tone: function (tone: string): void {
			useAppStore().setTone(tone);
		},
	},

	i18n: {
		messages: {
			en: {
				blue: "Blue Theme",
				green: "Green Theme",
				orange: "Orange Theme",
				default: "Default Tone",
				dark: "Dark Tone",
				lite: "Lite Tone",
			},
			th: {
				blue: "สีฟ้า",
				green: "สีเขียว",
				orange: "สีส้ม",
				default: "โทนสีมาตรฐาน",
				dark: "โทนสีดำ",
				lite: "โทนสีขาว",
			},
		},
	},
};
</script>


<style scoped lang="scss"></style>
