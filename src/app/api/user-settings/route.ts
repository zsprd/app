import { UserSettings } from '@/app/(control-panel)/user/settings/api/types';
import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/user-settings
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('app_security_settings');
	const items = await api.findAll<UserSettings>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
