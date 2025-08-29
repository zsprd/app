import { auth } from '@auth/authJs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected and public routes
const protectedRoutes = [
	'/dashboard',
	'/portfolios',
	'/analytics', 
	'/reports',
	'/settings',
	'/profile'
];

const authRoutes = [
	'/sign-in',
	'/sign-up', 
	'/sign-out',
	'/forgot-password',
	'/reset-password'
];

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	// Check if current route is protected
	const isProtectedRoute = protectedRoutes.some(route => 
		nextUrl.pathname.startsWith(route)
	);
	
	// Check if current route is an auth route
	const isAuthRoute = authRoutes.some(route => 
		nextUrl.pathname.startsWith(route)
	);

	// Allow access to sign-out page regardless of auth status
	if (nextUrl.pathname === '/sign-out') {
		return NextResponse.next();
	}

	// Redirect logged-in users away from auth pages (except sign-out)
	if (isLoggedIn && isAuthRoute && nextUrl.pathname !== '/sign-out') {
		return NextResponse.redirect(new URL('/', nextUrl));
	}

	// Redirect non-logged-in users to sign in from protected routes
	if (!isLoggedIn && isProtectedRoute) {
		const callbackUrl = nextUrl.pathname + nextUrl.search;
		return NextResponse.redirect(
			new URL(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl)
		);
	}

	// Default redirect for root path
	if (nextUrl.pathname === '/' && isLoggedIn) {
		return NextResponse.redirect(new URL('/dashboard', nextUrl));
	}

	if (nextUrl.pathname === '/' && !isLoggedIn) {
		return NextResponse.redirect(new URL('/sign-in', nextUrl));
	}

	return NextResponse.next();
});

export const config = {
	matcher: [
		// Skip Next.js internals and static files
		'/((?!_next/static|_next/image|favicon.ico|assets|api/auth).*)'
	]
};
