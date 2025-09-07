import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationsApiService } from '../services/notificationsApiService';
import { userNotificationsQueryKey } from './useUserNotifications';

export function useUpdateUserNotifications() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: notificationsApiService.updateUserNotifications,
		onSuccess: (data) => {
			queryClient.setQueryData(userNotificationsQueryKey, data);
		}
	});
}
