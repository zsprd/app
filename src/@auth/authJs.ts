import NextAuth from 'next-auth';
import { User } from '@auth/user';
import { createStorage } from 'unstorage';
import memoryDriver from 'unstorage/drivers/memory';
import vercelKVDriver from 'unstorage/drivers/vercel-kv';
import { UnstorageAdapter } from '@auth/unstorage-adapter';
import type { NextAuthConfig } from 'next-auth';
import type { Provider } from 'next-auth/providers';
import Credentials from 'next-auth/providers/credentials';
import Facebook from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';
import { authGetDbUserByEmail, authCreateDbUser, authValidateUserCredentials } from './authApi';
import bcrypt from 'bcryptjs';

const storage = createStorage({
	driver: process.env.VERCEL
		? vercelKVDriver({
				url: process.env.AUTH_KV_REST_API_URL,
				token: process.env.AUTH_KV_REST_API_TOKEN,
				env: false
			})
		: memoryDriver()
});

export const providers: Provider[] = [
	Credentials({
		name: 'credentials',
		credentials: {
			email: { label: 'Email', type: 'email' },
			password: { label: 'Password', type: 'password' },
			displayName: { label: 'Display Name', type: 'text' },
			formType: { label: 'Form Type', type: 'text' }
		},
		async authorize(formInput) {
			try {
				const { email, password, displayName, formType } = formInput;

				if (!email || !password) {
					console.log('Missing email or password');
					return null;
				}

				/**
				 * Sign In Logic
				 */
				if (formType === 'signin') {
					// Validate user credentials against mock database
					const isValid = await authValidateUserCredentials(email, password);
					
					if (!isValid) {
						console.log('Invalid credentials for signin');
						return null;
					}

					return {
						id: email,
						email: email,
						name: displayName || email.split('@')[0]
					};
				}

				/**
				 * Sign Up Logic
				 */
				if (formType === 'signup') {
					if (!displayName) {
						console.log('Missing display name for signup');
						return null;
					}

					// Check if user already exists
					try {
						const existingUserResponse = await authGetDbUserByEmail(email);
						if (existingUserResponse.ok) {
							console.log('User already exists');
							return null; // User already exists
						}
					} catch (error) {
						// User doesn't exist, which is good for signup
					}

					// Create new user
					const hashedPassword = await bcrypt.hash(password, 12);
					const newUserResponse = await authCreateDbUser({
						email: email,
						password: hashedPassword,
						displayName: displayName,
						role: ['user'], // Default role for new users
						photoURL: '',
						settings: {
							layout: {},
							theme: {}
						},
						shortcuts: []
					});

					if (newUserResponse.ok) {
						return {
							id: email,
							email: email,
							name: displayName
						};
					}

					console.log('Failed to create user');
					return null;
				}

				return null;
			} catch (error) {
				console.error('Auth error:', error);
				return null;
			}
		}
	}),
	Google({
		clientId: process.env.AUTH_GOOGLE_ID || '',
		clientSecret: process.env.AUTH_GOOGLE_SECRET || ''
	}),
	Facebook({
		clientId: process.env.AUTH_FACEBOOK_ID || '',
		clientSecret: process.env.AUTH_FACEBOOK_SECRET || ''
	})
];

const config = {
	theme: { logo: '/assets/images/logo/logo.svg' },
	adapter: UnstorageAdapter(storage),
	pages: {
		signIn: '/sign-in',
		signUp: '/sign-up',
		forgotPassword: '/forgot-password',
		resetPassword: '/reset-password'
	},
	providers,
	basePath: '/auth',
	trustHost: true,
	callbacks: {
		authorized() {
			return true; // We'll handle authorization in middleware
		},
		jwt({ token, trigger, account, user, session }) {
			if (trigger === 'update') {
				token.name = user.name;
			}

			if (account?.provider === 'keycloak') {
				return { ...token, accessToken: account.access_token };
			}

			// Include user info in JWT token
			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.name;
			}

			return token;
		},
		async session({ session, token }) {
			if (token.accessToken && typeof token.accessToken === 'string') {
				session.accessToken = token.accessToken;
			}

			if (session?.user?.email) {
				try {
					// Get the session user from database
					const response = await authGetDbUserByEmail(session.user.email);

					if (response.ok) {
						const userDbData = (await response.json()) as User;
						session.db = userDbData;
						session.user.id = userDbData.id;
						session.user.name = userDbData.displayName;
						session.user.image = userDbData.photoURL;
					} else {
						// If user not found, create a new user (for OAuth providers)
						const newUserResponse = await authCreateDbUser({
							email: session.user.email,
							role: ['user'],
							displayName: session.user.name || session.user.email.split('@')[0],
							photoURL: session.user.image || '',
							settings: {
								layout: {},
								theme: {}
							},
							shortcuts: []
						});

						if (newUserResponse.ok) {
							const newUser = (await newUserResponse.json()) as User;
							session.db = newUser;
							session.user.id = newUser.id;
						}
					}

					return session;
				} catch (error) {
					console.error('Error in session callback:', error);
					return session;
				}
			}

			return session;
		}
	},
	experimental: {
		enableWebAuthn: true
	},
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60 // 30 days
	},
	debug: process.env.NODE_ENV !== 'production'
} satisfies NextAuthConfig;

export type AuthJsProvider = {
	id: string;
	name: string;
	style?: {
		text?: string;
		bg?: string;
	};
};

export const authJsProviderMap: AuthJsProvider[] = providers
	.map((provider) => {
		const providerData = typeof provider === 'function' ? provider() : provider;

		return {
			id: providerData.id,
			name: providerData.name,
			style: {
				text: (providerData as { style?: { text: string } }).style?.text,
				bg: (providerData as { style?: { bg: string } }).style?.bg
			}
		};
	})
	.filter((provider) => provider.id !== 'credentials');

export const { handlers, auth, signIn, signOut } = NextAuth(config);
