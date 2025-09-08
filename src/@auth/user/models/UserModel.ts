import { User } from '@auth/user';
import { PartialDeep } from 'type-fest';

/**
 * Creates a new user object with the specified data.
 */
function UserModel(data?: PartialDeep<User>): User {
	data = data || {};

	// Manually apply defaults (Edge Runtime safe)
	return {
		id: data.id ?? null,
		role: data.role ?? null, // guest
		displayName: data.displayName ?? null,
		photoURL: data.photoURL ?? '',
		email: data.email ?? '',
		password: data.password ?? '',
		shortcuts: data.shortcuts ?? [],
		settings: data.settings ?? {},
		loginRedirectUrl: data.loginRedirectUrl ?? '/'
	} as User;
}

export default UserModel;
