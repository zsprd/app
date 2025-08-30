import { CryptoDashboardWidgetType } from '@/app/(control-panel)/dashboard/crypto/api/types';
import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/crypto-dashboard/widgets
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('crypto_dashboard_widgets');
	const items = await api.findAll<CryptoDashboardWidgetType>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
