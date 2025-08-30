'use client';

import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@fuse/core/Link';
import _ from 'lodash';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormLabel from '@mui/material/FormLabel';
import { Alert, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { authResetPassword } from '@auth/authApi';

/**
 * Form Validation Schema
 */
const schema = z
	.object({
		password: z
			.string()
			.nonempty('Please enter your password.')
			.min(8, 'Password is too short - should be 8 chars minimum.'),
		passwordConfirm: z.string().nonempty('Password confirmation is required')
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords must match',
		path: ['passwordConfirm']
	});

type FormType = z.infer<typeof schema>;

const defaultValues = {
	password: '',
	passwordConfirm: ''
};

function ResetPasswordPageForm() {
	const { control, formState, handleSubmit, reset } = useForm<FormType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
	const searchParams = useSearchParams();
	const router = useRouter();
	const email = searchParams.get('email');
	const token = searchParams.get('token');

	useEffect(() => {
		// Validate that email and token are present
		if (!email || !token) {
			setMessage({
				type: 'error',
				text: 'Invalid or missing reset link. Please request a new password reset.'
			});
		}
	}, [email, token]);

	async function onSubmit(formData: FormType) {
		if (!email || !token) {
			setMessage({
				type: 'error',
				text: 'Invalid reset link. Please request a new password reset.'
			});
			return;
		}

		setIsLoading(true);
		setMessage(null);

		try {
			const result = await authResetPassword(email, token, formData.password);

			if (result.success) {
				setMessage({ type: 'success', text: result.message });
				reset(defaultValues);

				// Redirect to sign in after successful reset
				setTimeout(() => {
					router.push('/sign-in');
				}, 3000);
			} else {
				setMessage({ type: 'error', text: result.message });
			}
		} catch (_error) {
			setMessage({
				type: 'error',
				text: 'An error occurred. Please try again.'
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<form
			name="resetPasswordForm"
			noValidate
			className="mt-4 flex w-full flex-col justify-center gap-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			{message && (
				<Alert
					className="mb-4"
					severity={message.type}
					sx={(theme) => ({
						backgroundColor:
							message.type === 'error' ? theme.palette.error.light : theme.palette.success.light,
						color: message.type === 'error' ? theme.palette.error.dark : theme.palette.success.dark
					})}
				>
					{message.text}
					{message.type === 'success' && (
						<Typography
							variant="caption"
							display="block"
							className="mt-1"
						>
							Redirecting to sign in page...
						</Typography>
					)}
				</Alert>
			)}

			{email && (
				<Typography className="mb-4 text-center text-sm text-gray-600">
					Resetting password for: <strong>{email}</strong>
				</Typography>
			)}

			<Controller
				name="password"
				control={control}
				render={({ field }) => (
					<FormControl>
						<FormLabel htmlFor="password">New Password</FormLabel>
						<TextField
							{...field}
							id="password"
							type="password"
							error={!!errors.password}
							helperText={errors?.password?.message}
							required
							fullWidth
							placeholder="Enter your new password"
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
							placeholder="Confirm your new password"
						/>
					</FormControl>
				)}
			/>

			<Button
				variant="contained"
				color="secondary"
				className="w-full"
				aria-label="Reset Password"
				disabled={_.isEmpty(dirtyFields) || !isValid || isLoading || !email || !token}
				type="submit"
				size="medium"
			>
				{isLoading ? (
					<>
						<CircularProgress
							size={20}
							className="mr-2"
						/>
						Resetting...
					</>
				) : (
					'Reset Password'
				)}
			</Button>

			<Typography
				className="text-md font-medium"
				color="text.secondary"
			>
				Return to <Link to="/sign-in">sign in</Link>
			</Typography>
		</form>
	);
}

export default ResetPasswordPageForm;
