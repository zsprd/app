'use client';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import _ from 'lodash';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import { signIn } from 'next-auth/react';
import { Alert, CircularProgress } from '@mui/material';
import signinErrors from './signinErrors';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Form Validation Schema
 */
const schema = z
	.object({
		displayName: z.string().nonempty('You must enter your name'),
		email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
		password: z
			.string()
			.nonempty('Please enter your password.')
			.min(8, 'Password is too short - should be 8 chars minimum.')
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
		passwordConfirm: z.string().nonempty('Password confirmation is required'),
		acceptTermsConditions: z.boolean().refine((val) => val === true, 'The terms and conditions must be accepted.')
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords must match',
		path: ['passwordConfirm']
	});

type FormType = z.infer<typeof schema>;

const defaultValues = {
	displayName: '',
	email: '',
	password: '',
	passwordConfirm: '',
	acceptTermsConditions: false
};

function SignUpPageForm() {
	const { control, formState, handleSubmit, setError, reset } = useForm<FormType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	async function onSubmit(formData: FormType) {
		setIsLoading(true);

		try {
			const { displayName, email, password } = formData;
			
			const result = await signIn('credentials', {
				displayName,
				email,
				password,
				formType: 'signup',
				redirect: false
			});

			if (result?.error) {
				let errorMessage = signinErrors[result.error] || 'An error occurred during signup';
				
				// Handle specific signup errors
				if (result.error === 'CredentialsSignin') {
					errorMessage = 'Account with this email already exists';
				}
				
				setError('root', { type: 'manual', message: errorMessage });
			} else if (result?.ok) {
				// Successful signup and automatic login
				router.push('/'); // Redirect to dashboard
			} else {
				setError('root', { type: 'manual', message: 'Signup failed. Please try again.' });
			}
		} catch (error) {
			console.error('Signup error:', error);
			setError('root', { type: 'manual', message: 'An unexpected error occurred. Please try again.' });
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form
			name="registerForm"
			noValidate
			className="mt-8 flex w-full flex-col justify-center gap-4"
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
				name="displayName"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormLabel htmlFor="displayName">Full Name</FormLabel>
						<TextField
							{...field}
							id="displayName"
							autoFocus
							type="text"
							error={!!errors.displayName}
							helperText={errors?.displayName?.message}
							required
							fullWidth
							placeholder="Enter your full name"
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormLabel htmlFor="email">Email</FormLabel>
						<TextField
							{...field}
							id="email"
							type="email"
							error={!!errors.email}
							helperText={errors?.email?.message}
							required
							fullWidth
							placeholder="Enter your email address"
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
							id="password"
							type="password"
							error={!!errors.password}
							helperText={errors?.password?.message || 'Must contain uppercase, lowercase, and number'}
							required
							fullWidth
							placeholder="Enter your password"
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="passwordConfirm"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormLabel htmlFor="passwordConfirm">Confirm Password</FormLabel>
						<TextField
							{...field}
							id="passwordConfirm"
							type="password"
							error={!!errors.passwordConfirm}
							helperText={errors?.passwordConfirm?.message}
							required
							fullWidth
							placeholder="Confirm your password"
						/>
					</FormControl>
				)}
			/>

			<Controller
				name="acceptTermsConditions"
				control={control}
				render={({ field }) => (
					<FormControl
						className="items-center"
						error={!!errors.acceptTermsConditions}
					>
						<FormControlLabel
							label="I agree to the Terms of Service and Privacy Policy"
							control={
								<Checkbox
									size="small"
									{...field}
									checked={field.value}
								/>
							}
						/>
						<FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
					</FormControl>
				)}
			/>

			<Button
				variant="contained"
				color="secondary"
				className="w-full mt-4"
				aria-label="Create Account"
				disabled={_.isEmpty(dirtyFields) || !isValid || isLoading}
				type="submit"
				size="medium"
			>
				{isLoading ? (
					<>
						<CircularProgress size={20} className="mr-2" />
						Creating Account...
					</>
				) : (
					'Create Account'
				)}
			</Button>
		</form>
	);
}

export default SignUpPageForm;
