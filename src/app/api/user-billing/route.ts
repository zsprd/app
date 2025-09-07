import { UserBilling } from '@/app/(control-panel)/user/billing/api/types';
import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/user-billing
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('app_plan_billing_settings');
	const items = await api.findAll<UserBilling>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
