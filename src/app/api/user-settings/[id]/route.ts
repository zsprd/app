import { UserSettings } from '@/app/(control-panel)/user/settings/api/types';
import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/user-settings/{id}
 */
export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const api = mockApi('app_security_settings');
	const item = await api.find<UserSettings>(id);

	if (!item) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(item), { status: 200 });
}

/**
 * PUT api/mock/user-settings/{id}
 */
export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const api = mockApi('app_security_settings');
	const data = (await req.json()) as UserSettings;
	const updatedItem = await api.update<UserSettings>(id, data);

	if (!updatedItem) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(updatedItem), { status: 200 });
}
