import mockApi from 'src/@mock-utils/mockApi';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@auth/user';
import { v4 as uuidv4 } from 'uuid';

/**
 * GET /api/mock/users - Get all users (admin only)
 */
export async function GET(req: NextRequest) {
	try {
		const api = mockApi('users');
		const users = await api.findAll();
		
		// Remove passwords from response for security
		const safeUsers = users.map((user: User) => {
			const { password, ...safeUser } = user;
			return safeUser;
		});

		return NextResponse.json(safeUsers, { status: 200 });
	} catch (error) {
		console.error('Error fetching users:', error);
		return NextResponse.json(
			{ message: 'Failed to fetch users' }, 
			{ status: 500 }
		);
	}
}

/**
 * POST /api/mock/users - Create new user
 */
export async function POST(req: NextRequest) {
	try {
		const userData = await req.json() as Partial<User>;
		
		// Validate required fields
		if (!userData.email) {
			return NextResponse.json(
				{ message: 'Email is required' }, 
				{ status: 400 }
			);
		}

		// Check if user already exists
		const api = mockApi('users');
		const existingUser = await api.find({ email: userData.email });
		
		if (existingUser) {
			return NextResponse.json(
				{ message: 'User already exists' }, 
				{ status: 409 }
			);
		}

		// Create new user with generated ID
		const newUser = {
			...userData,
			id: uuidv4(),
			role: userData.role || ['user'],
			settings: userData.settings || {
				layout: {},
				theme: {}
			},
			shortcuts: userData.shortcuts || [],
			loginRedirectUrl: userData.loginRedirectUrl || '/'
		};

		const createdUser = await api.create(newUser);

		// Remove password from response
		const { password, ...safeUser } = createdUser as User;

		return NextResponse.json(safeUser, { status: 201 });
	} catch (error) {
		console.error('Error creating user:', error);
		return NextResponse.json(
			{ message: 'Failed to create user' }, 
			{ status: 500 }
		);
	}
}
