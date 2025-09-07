import { UserNotifications } from '@/app/(control-panel)/user/notifications/api/types';
import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/user-notification-settings
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('app_notification_settings');
	const items = await api.findAll<UserNotifications>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
