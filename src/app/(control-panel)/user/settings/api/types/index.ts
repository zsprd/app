export type UserSettings = {
	id: string;
	currentPassword?: string;
	newPassword?: string;
	twoStepVerification?: boolean;
	askPasswordChange?: boolean;
};
