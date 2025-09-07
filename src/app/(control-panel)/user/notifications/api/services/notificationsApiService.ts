import { api } from '@/utils/api';
import type { UserNotifications } from '../types';

export const notificationsApiService = {
	getUserNotifications: () => api.get(`user-notifications/0`).json<UserNotifications>(),

	updateUserNotifications: (data: UserNotifications) => api.put(`user-notifications/0`, { json: data }).json()
};
