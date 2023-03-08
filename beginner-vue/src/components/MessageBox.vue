<template>
    <div v-if="opened" class="shader" :style="{ background: options.barrierBackground }" @click.prevent="shader">
        <div class="center">
            <div class="dialog">
                <div class="head" :style="{ background: options.titleBackground, color: options.titleColor }">{{
                    options.caption
                }}</div>

                <div class="body" v-html="options.content"></div>

                <div class="actions" ref="actions">
                    <button ref="close" @click.prevent="close(false)" @keydown="handleKeyDownButton"
                        v-show="options.type === MessageBoxType.close">{{
                            $t('close')
                        }}</button>
                    <button ref="ok" @click.prevent="close(true)" @keydown="handleKeyDownButton"
                        v-show="options.type === MessageBoxType.ok || options.type === MessageBoxType.okCancel">{{
                            $t('ok')
                        }}</button>
                    <button ref="retry" @click.prevent="close(true)" @keydown="handleKeyDownButton"
                        v-show="options.type === MessageBoxType.retryCancel">{{
                            $t('retry')
                        }}</button>
                    <button ref="cancel" @click.prevent="close(false)" @keydown="handleKeyDownButton"
                        v-show="options.type === MessageBoxType.okCancel || options.type === MessageBoxType.retryCancel">{{
                            $t('cancel')
                        }}</button>
                    <button ref="yes" @click.prevent="close(true)" @keydown="handleKeyDownButton"
                        v-show="options.type === MessageBoxType.yesNo">{{
                            $t('yes')
                        }}</button>
                    <button ref="no" @click.prevent="close(false)" @keydown="handleKeyDownButton"
                        v-show="options.type === MessageBoxType.yesNo">{{
                            $t('no')
                        }}</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { MessageBoxType, type MessageBoxOptions } from './MessageBox';

export type HTMLDivRef = InstanceType<typeof HTMLDivElement>;
export type HTMLButtonRef = InstanceType<typeof HTMLButtonElement>;
</script>


<script lang="ts">
export default {
    expose: [
        'setDefaults',
        'isOpen',
        'open',
        'info',
        'warning',
        'error',
        'question',
        'close',
    ],

    data: function () {
        return {
            defaultOptions: <MessageBoxOptions>{
                caption: "",
                content: "",
                type: MessageBoxType.close,
                alternateFocus: false,
                barrierDismissible: true,
                barrierBackground: '#3339',
                titleBackground: '#000',
                titleColor: '#fff',
            },
            options: <MessageBoxOptions>{
            },
            opened: false,
            firstKey: <HTMLButtonRef | null>null,
            lastKey: <HTMLButtonRef | null>null,
            timer: 0,
        };
    },

    mounted() {
    },

    methods: {
        /**
         * Handles ESC key.
         */
        handleKeyDownEscape: function (event: KeyboardEvent) {
            if (event.key === 'Escape') {
                this.close(false);
                event.preventDefault();
            }
        },

        /**
         * Handles Tab/Shift+Tab keys.
         */
        handleKeyDownButton: function (event: KeyboardEvent) {
            if (event.key === 'Tab') {
                if (event.shiftKey) {
                    if (event.target == this.firstKey) {
                        this.lastKey?.focus();
                        event.preventDefault();
                    }
                }
                else {
                    if (event.target == this.lastKey) {
                        this.firstKey?.focus();
                        event.preventDefault();
                    }
                }
            }
        },

        /**
         * Set defaults options, before calling open().
         */
        setDefaults: function (options: MessageBoxOptions): void {
            this.defaultOptions = { ...options };
        },

        /**
         * Closes automatically if barrierDismissible is true.
         */
        shader: function (): void {
            if (this.opened && this.options.barrierDismissible) {
                this.close(false);
            }
        },

        /**
         * Changes CR/LF to <br/>.
         */
        nl2br: function (s: string): string {
            return s.replace(/\r\n|\n|\r/gm, '<br/>');
        },

        /**
         * Checks if the message box is opened or not.
         */
        isOpen: function (): boolean {
            return this.opened;
        },

        /**
         * Opens message box.
         * Return true if the message box is opened successfully.
         * Otherwise, it is false.
         */
        open: function (options: MessageBoxOptions): boolean {
            // checks if it already opened
            if (this.opened) {
                return false;
            }

            this.options = { ...this.defaultOptions };
            this.options.caption = options.caption;
            this.options.content = this.nl2br(options.content);
            this.options.type = options.type;
            if (typeof options.alternateFocus === 'boolean')
                this.options.alternateFocus = options.alternateFocus;
            if (typeof options.barrierDismissible === 'boolean')
                this.options.barrierDismissible = options.barrierDismissible;
            if (typeof options.barrierBackground === 'string')
                this.options.barrierBackground = options.barrierBackground;
            if (typeof options.titleBackground === 'string')
                this.options.titleBackground = options.titleBackground;
            if (typeof options.titleColor === 'string')
                this.options.titleColor = options.titleColor;
            this.options.callback = options.callback;
            this.opened = true;
            window.addEventListener('keydown', this.handleKeyDownEscape);

            this.timer = setTimeout(() => {
                if (this.options.type === MessageBoxType.close) {
                    const button = this.$refs.close as HTMLButtonRef;
                    this.firstKey = button;
                    this.lastKey = button;
                    button.focus();
                }
                else if (this.options.type === MessageBoxType.ok) {
                    const button = this.$refs.ok as HTMLButtonRef;
                    this.firstKey = button;
                    this.lastKey = button;
                    button.focus();
                }
                else if (this.options.type === MessageBoxType.okCancel) {
                    const button = (this.options.alternateFocus ? this.$refs.ok : this.$refs.cancel) as HTMLButtonRef;
                    this.firstKey = this.$refs.ok as HTMLButtonRef;
                    this.lastKey = this.$refs.cancel as HTMLButtonRef;
                    button.focus();
                }
                else if (this.options.type === MessageBoxType.yesNo) {
                    const button = (this.options.alternateFocus ? this.$refs.yes : this.$refs.no) as HTMLButtonRef;
                    this.firstKey = this.$refs.yes as HTMLButtonRef;
                    this.lastKey = this.$refs.no as HTMLButtonRef;
                    button.focus();
                }
                else if (this.options.type === MessageBoxType.retryCancel) {
                    const button = (this.options.alternateFocus ? this.$refs.retry : this.$refs.cancel) as HTMLButtonRef;
                    this.firstKey = this.$refs.retry as HTMLButtonRef;
                    this.lastKey = this.$refs.cancel as HTMLButtonRef;
                    button.focus();
                }
            }, 0);

            return true;
        },

        /**
         * Opens infomation box.
         */
        info: function (content: string, callback?: (result: boolean) => void): boolean {
            return this.open({
                caption: this.$t('info'),
                content,
                type: MessageBoxType.close,
                alternateFocus: false,
                barrierDismissible: true,
                barrierBackground: '#3939',
                titleBackground: '#393',
                titleColor: '#fff',
                callback,
            });
        },

        /**
         * Opens warning box.
         */
        warning: function (content: string, callback?: (result: boolean) => void): boolean {
            return this.open({
                caption: this.$t('warning'),
                content,
                type: MessageBoxType.close,
                alternateFocus: false,
                barrierDismissible: false,
                barrierBackground: '#f639',
                titleBackground: '#f63',
                titleColor: '#fff',
                callback,
            });
        },

        /**
         * Opens error box.
         */
        error: function (content: string, callback?: (result: boolean) => void): boolean {
            return this.open({
                caption: this.$t('error'),
                content,
                type: MessageBoxType.close,
                alternateFocus: false,
                barrierDismissible: false,
                barrierBackground: '#9009',
                titleBackground: '#900',
                titleColor: '#fff',
                callback,
            });
        },

        /**
         * Opens question box.
         */
        question: function (content: string, callback?: (result: boolean) => void): boolean {
            return this.open({
                caption: this.$t('question'),
                content,
                type: MessageBoxType.yesNo,
                alternateFocus: false,
                barrierDismissible: false,
                barrierBackground: '#3699',
                titleBackground: '#369',
                titleColor: '#fff',
                callback,
            });
        },

        /**
         * Closes the message box.
         */
        close: function (result: boolean): void {
            if (this.opened) {
                clearTimeout(this.timer);
                window.removeEventListener('keydown', this.handleKeyDownEscape);
                this.opened = false;
                this.$emit('message-box-closed', result);
                if (this.options.callback)
                    this.options.callback(result);
            }
        },
    },

    watch: {
    },

    i18n: {
        messages: {
            en: {
                close: "Close",
                ok: "OK",
                cancel: "Cancel",
                yes: "Yes",
                no: "No",
                retry: "Retry",
                info: "Infomation",
                warning: "Warning",
                error: "Error",
                question: "Question",
            },
            th: {
                close: "ปิด",
                ok: "ตกลง",
                cancel: "ยกเลิก",
                yes: "ใช่",
                no: "ไม่ใช่",
                retry: "ลองใหม่",
                info: "ข่าวสาร",
                warning: "แจ้งเตือน",
                error: "เกิดข้อผิดพลาด",
                question: "คำถาม",
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
$body-min-height: 5.5rem;
$actions-background: #ccc;
$actions-color: #000;
$button-margin-between: 0.5rem;
$button-padding-width: 0.5rem;
$button-padding-height: 0.25rem;
$button-min-width: 5rem;

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
    width: 60%;
}

.dialog {
    border-radius: $border-radius-width;
    box-shadow: $shadow-width $shadow-height $shadow-color;
    transform: translateX(-50%) translateY(-50%);
}

.head {
    padding: $padding-around-height $padding-around-width;
    border-radius: $border-radius-width $border-radius-width 0 0;
    font-weight: bold;
    font-size: 120%
}

.body {
    padding: $padding-around-height $padding-around-width;
    background: $body-background;
    color: $body-color;
    min-height: $body-min-height;
}

.actions {
    padding: $padding-around-height $padding-around-width;
    border-radius: 0 0 $border-radius-width $border-radius-width;
    background: $actions-background;
    color: $actions-color;
    text-align: right;
}

.actions button {
    margin-left: $button-margin-between;
    padding: $button-padding-height $button-padding-width;
    min-width: $button-min-width;
}

@media (min-width: 800px) {
    .center {
        width: 50%;
    }
}

@media (min-width: 1280px) {
    .center {
        width: 40%;
    }
}
</style>
