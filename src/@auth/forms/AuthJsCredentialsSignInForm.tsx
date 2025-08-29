import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@fuse/core/Link';
import _ from 'lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormLabel from '@mui/material/FormLabel';
import { signIn } from 'next-auth/react';
import { Alert, CircularProgress } from '@mui/material';
import signinErrors from './signinErrors';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Form Validation Schema
 */
const schema = z.object({
	email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
	password: z
		.string()
		.min(4, 'Password is too short - must be at least 4 chars.')
		.nonempty('Please enter your password.'),
	remember: z.boolean().optional()
});

type FormType = z.infer<typeof schema>;

const defaultValues = {
	email: '',
	password: '',
	remember: true
};

function SignInPageForm() {
	const { control, formState, handleSubmit, setValue, setError } = useForm<FormType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	// Auto-fill demo credentials in development
	useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			setValue('email', 'admin@fusetheme.com', {
				shouldDirty: true,
				shouldValidate: true
			});
			setValue('password', '5;4+0IOx:\\Dy', {
				shouldDirty: true,
				shouldValidate: true
			});
		}
	}, [setValue]);

	async function onSubmit(formData: FormType) {
		setIsLoading(true);
		
		try {
			const { email, password } = formData;

			const result = await signIn('credentials', {
				email,
				password,
				formType: 'signin',
				redirect: false
			});

			if (result?.error) {
				let errorMessage = signinErrors[result.error] || 'Sign in failed';
				
				// Handle specific signin errors
				if (result.error === 'CredentialsSignin') {
					errorMessage = 'Invalid email or password. Please check your credentials and try again.';
				}
				
				setError('root', { type: 'manual', message: errorMessage });
			} else if (result?.ok) {
				// Successful login
				router.push('/'); // Redirect to dashboard
			} else {
				setError('root', { type: 'manual', message: 'Sign in failed. Please try again.' });
			}
		} catch (error) {
			console.error('Signin error:', error);
			setError('root', { type: 'manual', message: 'An unexpected error occurred. Please try again.' });
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form
			name="loginForm"
			noValidate
			className="flex w-full flex-col justify-center gap-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			{errors?.root?.message && (
				<Alert
					className="mb-8"
					severity="error"
					sx={(theme) => ({
						backgroundColor: theme.palette.error.light,
						color: theme.palette.error.dark
					})}
				>
					{errors?.root?.message}
				</Alert>
			)}

			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormLabel htmlFor="email">Email address</FormLabel>
						<TextField
							{...field}
							autoFocus
							type="email"
							error={!!errors.email}
							helperText={errors?.email?.message}
							required
							fullWidth
							placeholder="Enter your email"
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="password"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormLabel htmlFor="password">Password</FormLabel>
						<TextField
							{...field}
							type="password"
							error={!!errors.password}
							helperText={errors?.password?.message}
							required
							fullWidth
							placeholder="Enter your password"
						/>
					</FormControl>
				)}
			/>

			<div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 sm:items-center sm:justify-between">
				<Controller
					name="remember"
					control={control}
					render={({ field }) => (
						<FormControl>
							<FormControlLabel
								label="Remember me"
								control={
									<Checkbox
										size="small"
										{...field}
										checked={field.value}
									/>
								}
							/>
						</FormControl>
					)}
				/>

				<Link
					className="text-md font-medium"
					to="/forgot-password"
				>
					Forgot password?
				</Link>
			</div>

			<Button
				variant="contained"
				color="secondary"
				className="w-full"
				aria-label="Sign in"
				disabled={_.isEmpty(dirtyFields) || !isValid || isLoading}
				type="submit"
				size="medium"
			>
				{isLoading ? (
					<>
						<CircularProgress size={20} className="mr-2" />
						Signing in...
					</>
				) : (
					'Sign in'
				)}
			</Button>

			<div className="flex items-center">
				<div className="mt-0.5 flex flex-auto items-center justify-center">
					<Typography className="text-sm" color="text.secondary">
						Don't have an account?
					</Typography>
					<Link className="ml-1 text-sm font-medium" to="/sign-up">
						Sign up
					</Link>
				</div>
			</div>
		</form>
	);
}

export default SignInPageForm;
