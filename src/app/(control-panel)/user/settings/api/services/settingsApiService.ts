import { api } from '@/utils/api';
import type { UserSettings } from '../types';

export const settingsApiService = {
	getUserSettings: () => api.get(`user-settings/0`).json<UserSettings>(),

	updateUserSettings: (data: UserSettings) => api.put(`user-settings/0`, { json: data }).json()
};
