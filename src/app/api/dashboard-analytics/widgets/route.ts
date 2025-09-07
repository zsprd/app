import { AnalyticsDashboardWidgetType } from '@/app/(control-panel)/dashboard/analytics/api/types';
import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/analytics-dashboard/widgets
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('analytics_dashboard_widgets');
	const items = await api.findAll<AnalyticsDashboardWidgetType>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
