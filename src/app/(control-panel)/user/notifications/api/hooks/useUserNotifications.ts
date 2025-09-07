import { useQuery } from '@tanstack/react-query';
import { notificationsApiService } from '../services/notificationsApiService';

export const userNotificationsQueryKey = ['settings', 'notifications'] as const;

export function useUserNotifications() {
	return useQuery({
		queryKey: userNotificationsQueryKey,
		queryFn: notificationsApiService.getUserNotifications
	});
}
