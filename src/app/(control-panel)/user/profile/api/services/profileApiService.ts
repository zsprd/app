import { api } from '@/utils/api';
import { UserProfile } from '../types';

export const profileApiService = {
	getUserProfile: () => api.get(`user-profile/0`).json<UserProfile>(),

	updateUserProfile: (data: UserProfile) => api.put(`user-profile/0`, { json: data }).json()
};
