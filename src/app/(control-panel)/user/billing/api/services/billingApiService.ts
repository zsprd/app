import { api } from '@/utils/api';
import type { UserBilling } from '../types';

export const billingApiService = {
	getUserBilling: () => api.get(`user-billing/0`).json<UserBilling>(),

	updateUserBilling: (data: UserBilling) => api.put(`user-billing/0`, { json: data }).json()
};
