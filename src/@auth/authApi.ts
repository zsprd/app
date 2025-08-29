import { User } from '@auth/user';
import UserModel from '@auth/user/models/UserModel';
import { PartialDeep } from 'type-fest';
import api from '@/utils/api';
import bcrypt from 'bcryptjs';

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

		const user = await response.json() as User;
		
		// For development, we'll handle both hashed and plain text passwords
		if (user.password) {
			// Check if password is already hashed (starts with $2a$ or $2b$)
			if (user.password.startsWith('$2')) {
				// Compare with bcrypt
				return await bcrypt.compare(password, user.password);
			} else {
				// Plain text comparison for existing mock data
				return user.password === password;
			}
		}
		
		return false;
	} catch (error) {
		console.error('Error validating credentials:', error);
		return false;
	}
}

/**
 * Request password reset (sends reset token)
 */
export async function authRequestPasswordReset(email: string): Promise<{ success: boolean; message: string }> {
	try {
		const response = await authGetDbUserByEmail(email);
		
		if (!response.ok) {
			return { success: false, message: 'User not found' };
		}

		// In a real app, you would:
		// 1. Generate a secure reset token
		// 2. Store it in the database with expiration
		// 3. Send email with reset link
		
		// For mock implementation, we'll just simulate success
		console.log(`Password reset requested for: ${email}`);
		
		// You can expand this to actually store reset tokens in your mock data
		return { success: true, message: 'Password reset link sent to your email' };
	} catch (error) {
		console.error('Error requesting password reset:', error);
		return { success: false, message: 'An error occurred. Please try again.' };
	}
}

/**
 * Reset password with token
 */
export async function authResetPassword(
	email: string, 
	token: string, 
	newPassword: string
): Promise<{ success: boolean; message: string }> {
	try {
		// In a real app, you would validate the reset token here
		// For mock implementation, we'll skip token validation
		
		const response = await authGetDbUserByEmail(email);
		
		if (!response.ok) {
			return { success: false, message: 'User not found' };
		}

		const user = await response.json() as User;
		
		// Hash the new password
		const hashedPassword = await bcrypt.hash(newPassword, 12);
		
		// Update user with new password
		const updateResponse = await authUpdateDbUser({
			...user,
			password: hashedPassword
		});

		if (updateResponse.ok) {
			return { success: true, message: 'Password reset successfully' };
		} else {
			return { success: false, message: 'Failed to reset password' };
		}
	} catch (error) {
		console.error('Error resetting password:', error);
		return { success: false, message: 'An error occurred. Please try again.' };
	}
}

/**
 * Change user password (for authenticated users)
 */
export async function authChangePassword(
	userId: string,
	currentPassword: string,
	newPassword: string
): Promise<{ success: boolean; message: string }> {
	try {
		const response = await authGetDbUser(userId);
		
		if (!response.ok) {
			return { success: false, message: 'User not found' };
		}

		const user = await response.json() as User;
		
		// Validate current password
		const isCurrentPasswordValid = user.password?.startsWith('$2') 
			? await bcrypt.compare(currentPassword, user.password)
			: user.password === currentPassword;

		if (!isCurrentPasswordValid) {
			return { success: false, message: 'Current password is incorrect' };
		}

		// Hash and update new password
		const hashedPassword = await bcrypt.hash(newPassword, 12);
		const updateResponse = await authUpdateDbUser({
			...user,
			password: hashedPassword
		});

		if (updateResponse.ok) {
			return { success: true, message: 'Password changed successfully' };
		} else {
			return { success: false, message: 'Failed to change password' };
		}
	} catch (error) {
		console.error('Error changing password:', error);
		return { success: false, message: 'An error occurred. Please try again.' };
	}
}
