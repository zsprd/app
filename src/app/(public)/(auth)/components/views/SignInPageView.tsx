import Paper from '@mui/material/Paper';
import AuthJsForm from '@auth/forms/AuthJsForm';
import Typography from '@mui/material/Typography';
import Link from '@fuse/core/Link';
import SignInPageMessageSection from '../ui/SignInPageMessageSection';

function SignInPageView() {
	return (
		<div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center md:p-8">
			<Paper className="flex min-h-full w-full overflow-hidden rounded-none sm:min-h-auto sm:w-auto sm:rounded-xl sm:shadow-sm md:w-full md:max-w-6xl">
				<div className="w-full px-4 py-8 sm:w-auto sm:p-12 md:p-16 ltr:border-r-1 rtl:border-l-1">
					<div className="mx-auto flex w-full max-w-80 flex-col gap-8 sm:mx-0 sm:w-80">
						<div className="w-full">
							<img
								className="w-12"
								src="/assets/images/logo/logo.svg"
								alt="logo"
							/>

							<Typography className="mt-8 text-4xl leading-[1.25] font-extrabold tracking-tight">
								Sign in
							</Typography>
							<div className="mt-0.5 flex items-baseline font-medium">
								<Typography>Don't have an account?</Typography>
								<Link
									className="ml-1"
									to="/sign-up"
								>
									Sign up
								</Link>
							</div>
						</div>
						<AuthJsForm formType="signin" />
					</div>
				</div>
				<SignInPageMessageSection />
			</Paper>
		</div>
	);
}

export default SignInPageView;
