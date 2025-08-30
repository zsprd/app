import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@fuse/core/Link';

function ConfirmationRequiredPageView() {
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
							Confirmation required
						</Typography>
						<div className="mt-0.5 flex items-baseline font-medium">
							<Typography>
								A confirmation mail with instructions has been sent to your email address. Follow those
								instructions to confirm your email address and activate your account.
							</Typography>
						</div>
					</div>
					<div>
						<Typography
							className="text-md mt-8 font-medium"
							color="text.secondary"
						>
							Return to <Link to="/sign-in">sign in</Link>
						</Typography>
					</div>
				</div>
			</Paper>
		</div>
	);
}

export default ConfirmationRequiredPageView;
