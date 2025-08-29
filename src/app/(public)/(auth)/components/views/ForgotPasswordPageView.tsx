import Paper from '@mui/material/Paper';
import ForgotPasswordPageTitle from '../ui/ForgotPasswordPageTitle';
import ForgotPasswordPageForm from '../../../../../@auth/forms/AuthCredentialsForgotPasswordPageForm';
import ForgotPasswordPageMessageSection from '../ui/ForgotPasswordPageMessageSection';

function ForgotPasswordPageView() {
	return (
		<div className="flex min-w-0 flex-auto flex-col items-center sm:justify-center md:p-8">
			<Paper className="flex min-h-full w-full overflow-hidden rounded-none sm:min-h-auto sm:w-auto sm:rounded-xl sm:shadow-sm md:w-full md:max-w-6xl">
				<div className="w-full px-4 py-8 sm:w-auto sm:p-12 md:p-16 ltr:border-r-1 rtl:border-l-1">
					<div className="mx-auto w-full max-w-80 sm:mx-0 sm:w-80">
						<ForgotPasswordPageTitle />

						<ForgotPasswordPageForm />
					</div>
				</div>

				<ForgotPasswordPageMessageSection />
			</Paper>
		</div>
	);
}

export default ForgotPasswordPageView;
