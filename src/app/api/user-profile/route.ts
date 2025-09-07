import { UserProfile } from '@/app/(control-panel)/user/profile/api/types';
import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/user-profile
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('app_account_settings');
	const items = await api.findAll<UserProfile>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
