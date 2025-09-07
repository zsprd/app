import { useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsApiService } from '../services/settingsApiService';
import { userSettingsQueryKey } from './useUserSettings';

export function useUpdateUserSettings() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: settingsApiService.updateUserSettings,
		onSuccess: (data) => {
			queryClient.setQueryData(userSettingsQueryKey, data);
		}
	});
}
