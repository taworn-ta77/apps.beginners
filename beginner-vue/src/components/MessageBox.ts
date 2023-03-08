export enum MessageBoxType {
	close = 0,
	ok = 1,
	okCancel = 2,
	yesNo = 3,
	retryCancel = 4,
}

export interface MessageBoxOptions {
	caption: string;
	content: string;
	type: MessageBoxType;
	alternateFocus?: boolean,
	barrierDismissible?: boolean;
	barrierBackground?: string;
	titleBackground?: string;
	titleColor?: string;
	callback?: (result: boolean) => void;
}
