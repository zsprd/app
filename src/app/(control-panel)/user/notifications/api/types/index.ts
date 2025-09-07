export type UserNotifications = {
	id: string;
	communication?: boolean;
	security?: boolean;
	meetups?: boolean;
	comments?: boolean;
	mention?: boolean;
	follow?: boolean;
	inquiry?: boolean;
};
