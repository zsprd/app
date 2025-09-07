import { useQuery } from '@tanstack/react-query';
import { profileApiService } from '../services/profileApiService';

export const userProfileQueryKey = ['profile', 'user'] as const;

export function useUserProfile() {
	return useQuery({
		queryFn: profileApiService.getUserProfile,
		queryKey: userProfileQueryKey
	});
}
