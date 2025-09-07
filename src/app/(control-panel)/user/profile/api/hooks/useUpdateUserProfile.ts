import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApiService } from '../services/profileApiService';
import { userProfileQueryKey } from './useUserProfile';

export function useUpdateUserProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: profileApiService.updateUserProfile,
		onSuccess: (data) => {
			queryClient.setQueryData(userProfileQueryKey, data);
		}
	});
}
