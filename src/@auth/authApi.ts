import { User } from '@auth/user';
import UserModel from '@auth/user/models/UserModel';
import { PartialDeep } from 'type-fest';
import api from '@/utils/api';

/**
 * Get user by id
 */
export async function authGetDbUser(userId: string): Promise<Response> {
	return api.get(`mock/auth/user/${userId}`);
}

/**
 * Get user by email
 */
export async function authGetDbUserByEmail(email: string): Promise<Response> {
	return api.get(`mock/auth/user-by-email/${email}`);
}

/**
 * Update user
 */
export function authUpdateDbUser(user: PartialDeep<User>) {
	return api.put(`mock/auth/user/${user.id}`, {
		body: JSON.stringify(UserModel(user))
	});
}

/**
 * Create user
 */
export async function authCreateDbUser(user: PartialDeep<User>) {
	return api.post('mock/users', {
		body: JSON.stringify(UserModel(user))
	});
}

/**
 * Validate user credentials for sign in
 */
export async function authValidateUserCredentials(email: string, password: string): Promise<boolean> {
	try {
		// Get user by email
		const response = await authGetDbUserByEmail(email);

		if (!response.ok) {
			return false;
		}

		const user = (await response.json()) as User;

		// Simple plain text comparison for mock data
		if (user.password) {
			return user.password === password;
		}

		return false;
	} catch (error) {
		console.error('Error validating credentials:', error);
		return false;
	}
}

/**
 * Request password reset
 */
export async function authRequestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
	try {
		const response = await authGetDbUserByEmail(email);

		if (!response.ok) {
			return { success: false, message: 'User not found' };
		}

		// Mock implementation - just simulate success
		console.log(`Password reset requested for: ${email}`);

		return { success: true, message: 'Password reset link sent to your email' };
	} catch (error) {
		console.error('Error requesting password reset:', error);
		return { success: false, message: 'An error occurred. Please try again.' };
	}
}

/**
 * Reset password
 */
export async function authResetPassword(
	email: string,
	token: string,
	_newPassword: string
): Promise<{ success: boolean; message: string }> {
	console.log('Password reset for:', email, 'with token:', token);

	return {
		success: true,
		message: 'Password has been successfully reset.'
	};
}
