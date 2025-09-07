import { useQuery } from '@tanstack/react-query';
import { billingApiService } from '../services/billingApiService';

export const userBillingQueryKey = ['settings', 'billing'] as const;

export function useUserBilling() {
	return useQuery({
		queryKey: userBillingQueryKey,
		queryFn: billingApiService.getUserBilling
	});
}
