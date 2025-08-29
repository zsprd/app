import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { lighten } from '@mui/material/styles';
import AuthJsForm from '@auth/forms/AuthJsForm';
import SignInPageTitle from '../ui/SignInPageTitle';
import AuthPagesMessageSection from '../ui/AuthPagesMessageSection';

/**
 * The sign in page.
 */
function SignInPageView() {
	return (
		<div className="flex min-w-0 flex-auto flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
			<Paper className="h-full w-full px-4 py-2 sm:h-auto sm:w-auto sm:rounded-xl sm:p-12 sm:shadow-sm md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-16 md:shadow-none ltr:border-r-1 rtl:border-l-1">
				<div className="mx-auto flex w-full max-w-80 flex-col gap-8 sm:mx-0 sm:w-80">
					<SignInPageTitle />

					<AuthJsForm formType="signin" />

					<Box
						className="text-md rounded-lg px-4 py-2 leading-[1.625]"
						sx={{
							backgroundColor: (theme) => lighten(theme.palette.primary.main, 0.8),
							color: 'primary.dark'
						}}
					>
						You are browsing <b>Fuse React Demo</b>. Click on the "Sign in" button to access the Demo and
						Documentation.
					</Box>
				</div>
			</Paper>

			<AuthPagesMessageSection />
		</div>
	);
}

export default SignInPageView;
