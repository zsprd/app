import { UserBilling } from '@/app/(control-panel)/user/billing/api/types';
import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/user-billing/{id}
 */
export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const api = mockApi('app_plan_billing_settings');
	const item = await api.find<UserBilling>(id);

	if (!item) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(item), { status: 200 });
}

/**
 * PUT api/mock/app-plan-billing-settings/{id}
 */
export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const api = mockApi('app_plan_billing_settings');
	const data = (await req.json()) as UserBilling;
	const updatedItem = await api.update<UserBilling>(id, data);

	if (!updatedItem) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(updatedItem), { status: 200 });
}
