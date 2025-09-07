export type UserBilling = {
	id: string;
	plan?: string;
	cardHolder?: string;
	cardNumber?: string;
	cardExpiration?: string;
	cardCVC?: string;
	country?: string;
	zip?: string;
};
