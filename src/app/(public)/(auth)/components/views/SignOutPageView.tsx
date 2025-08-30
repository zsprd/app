import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Link from '@fuse/core/Link';
import Paper from '@mui/material/Paper';
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
		<div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center">
			<Paper className="flex min-h-full w-full items-center rounded-none px-4 py-8 sm:min-h-auto sm:w-auto sm:rounded-xl sm:p-12 sm:shadow-sm">
				<div className="mx-auto w-full max-w-80 sm:mx-0 sm:w-80">
					<div className="w-full">
						<img
							className="mx-auto w-240"
							src="/assets/images/logo/logo-text.svg"
							alt="logo"
						/>
						<Typography className="mt-8 text-4xl leading-[1.25] font-extrabold tracking-tight">
							You have signed out!
						</Typography>
						<div className="mt-0.5 flex items-baseline font-medium">
							<Typography>
								{countdown > 0 ? `Redirecting in ${countdown} seconds` : 'Redirecting...'}
							</Typography>
						</div>
					</div>
					<div>
						<Typography
							className="text-md mt-8 font-medium"
							color="text.secondary"
						>
							Go to <Link to="/sign-in">sign in</Link> now
						</Typography>
					</div>
				</div>
			</Paper>
		</div>
	);
}

export default SignOutPageView;
