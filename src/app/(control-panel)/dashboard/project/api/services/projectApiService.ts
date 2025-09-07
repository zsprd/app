import { api } from '@/utils/api';
import { ProjectDashboardWidgetType, ProjectType } from '../types';

export const projectApiService = {
	getWidgets: async (): Promise<Record<string, ProjectDashboardWidgetType>> => {
		return await api.get('dashboard-project/widgets').json();
	},
	getProjects: async (): Promise<ProjectType[]> => {
		return await api.get('dashboard-project/projects').json();
	}
};
