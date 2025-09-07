import { useMutation, useQueryClient } from '@tanstack/react-query';
import { billingApiService } from '../services/billingApiService';
import { userBillingQueryKey } from './useUserBilling';

export function useUpdateUserBilling() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: billingApiService.updateUserBilling,
		onSuccess: (data) => {
			queryClient.setQueryData(userBillingQueryKey, data);
		}
	});
}
