'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Link from '@fuse/core/Link';
import Paper from '@mui/material/Paper';
import SignOutPageMessageSection from '../ui/SignOutPageMessageSection';
import { signOut as nextAuthSignOut } from 'next-auth/react'; // Import directly

function SignOutPageView() {
	const [countdown, setCountdown] = useState<number | null>(null);
	const router = useRouter();
	const hasSignedOut = useRef(false);

	useEffect(() => {
		// Only sign out once
		if (!hasSignedOut.current) {
			hasSignedOut.current = true;
			nextAuthSignOut({ redirect: false }).then(() => {
				setCountdown(5); // Start countdown after sign out
			});
		}
	}, []);

	useEffect(() => {
		if (countdown === null) return;

		if (countdown === 0) {
			router.push('/sign-in');
			return;
		}

		const interval = setInterval(() => {
			setCountdown((prev) => (prev !== null ? Math.max(prev - 1, 0) : null));
		}, 1000);
		return () => clearInterval(interval);
	}, [countdown, router]);

	return (
		<div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center md:p-8">
			<Paper className="flex min-h-full w-full overflow-hidden rounded-none sm:min-h-auto sm:w-auto sm:rounded-xl sm:shadow-sm md:w-full md:max-w-6xl">
				<div className="flex w-full items-center px-4 py-8 sm:w-auto sm:p-12 md:p-16 ltr:border-r-1 rtl:border-l-1">
					<div className="mx-auto w-full max-w-80 sm:mx-0 sm:w-80">
						<div className="w-full">
							<img
								className="mx-auto w-12"
								src="/assets/images/logo/logo.svg"
								alt="logo"
							/>

							<Typography className="mt-8 text-center text-4xl leading-[1.25] font-extrabold tracking-tight">
								You have signed out!
							</Typography>

							<Typography className="mt-0.5 flex justify-center font-medium">
								{countdown > 0 ? `Redirecting in ${countdown} seconds` : 'Redirecting...'}
							</Typography>
						</div>

						<Typography
							className="text-md mt-4 text-center font-medium"
							color="text.secondary"
						>
							Go to <Link to="/sign-in">sign in</Link> now
						</Typography>
					</div>
				</div>

				<SignOutPageMessageSection />
			</Paper>
		</div>
	);
}

export default SignOutPageView;
