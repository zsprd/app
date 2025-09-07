import { useQuery } from '@tanstack/react-query';
import { settingsApiService } from '../services/settingsApiService';

export const userSettingsQueryKey = ['settings', 'security'] as const;

export function useUserSettings() {
	return useQuery({
		queryFn: settingsApiService.getUserSettings,
		queryKey: userSettingsQueryKey
	});
}
