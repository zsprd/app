import { PartialDeep } from 'type-fest';
import { User } from '@auth/user';

/**
 * Native JavaScript implementation of lodash defaults
 */
function defaults(obj: any, defaultValues: any): any {
	const result = { ...obj };
	
	for (const key in defaultValues) {
		if (result[key] === undefined || result[key] === null) {
			result[key] = defaultValues[key];
		}
	}
	
	return result;
}

/**
 * Creates a new user object with the specified data.
 */
function UserModel(data?: PartialDeep<User>): User {
	data = data || {};

	return defaults(data, {
		id: null,
		role: null, // guest
		displayName: null,
		photoURL: '',
		email: '',
		password: '',
		shortcuts: [],
		settings: {},
		loginRedirectUrl: '/'
	}) as User;
}

export default UserModel;
