import { ProjectType } from '@/app/(control-panel)/dashboard/project/api/types';
import mockApi from 'src/@mock-utils/mockApi';

/**
 * GET api/mock/project-dashboard/projects
 */
export async function GET(req: Request) {
	const url = new URL(req.url);
	const queryParams = Object.fromEntries(url.searchParams.entries());
	const api = mockApi('project_dashboard_projects');
	const items = await api.findAll<ProjectType>(queryParams);

	return new Response(JSON.stringify(items), { status: 200 });
}
