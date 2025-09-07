import { UserNotifications } from '@/app/(control-panel)/user/notifications/api/types';
import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/user-notification-settings/{id}
 */
export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const api = mockApi('app_notification_settings');
	const item = await api.find<UserNotifications>(id);

	if (!item) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(item), { status: 200 });
}

/**
 * PUT api/mock/app-notification-settings/{id}
 */
export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params;
	const api = mockApi('app_notification_settings');
	const data = (await req.json()) as UserNotifications;
	const updatedItem = await api.update<UserNotifications>(id, data);

	if (!updatedItem) {
		return new Response(JSON.stringify({ message: 'Item not found' }), { status: 404 });
	}

	return new Response(JSON.stringify(updatedItem), { status: 200 });
}
