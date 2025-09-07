import { UserProfile } from '@/app/(control-panel)/user/profile/api/types';
import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/user-profile/{id}
 */
export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const api = mockApi('app_account_settings');
	const item = await api.find<UserProfile>(id);

	if (!item) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(item), { status: 200 });
}

/**
 * PUT api/mock/app-account-settings/{id}
 */
export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const api = mockApi('app_account_settings');
	const data = (await req.json()) as UserProfile;
	const updatedItem = await api.update<UserProfile>(id, data);

	if (!updatedItem) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(updatedItem), { status: 200 });
}
