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
import { useState } from 'react';
import { authRequestPasswordReset } from '@auth/authApi';

/**
 * Form Validation Schema
 */
const schema = z.object({
	email: z.string().email('You must enter a valid email').nonempty('You must enter an email')
});

type FormType = z.infer<typeof schema>;

const defaultValues = {
	email: ''
};

function ForgotPasswordPageForm() {
	const { control, formState, handleSubmit, reset } = useForm<FormType>({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

	async function onSubmit(formData: FormType) {
		setIsLoading(true);
		setMessage(null);

		try {
			const result = await authRequestPasswordReset(formData.email);

			if (result.success) {
				setMessage({ type: 'success', text: result.message });
				reset(defaultValues);
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
			name="forgotPasswordForm"
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
				</Alert>
			)}

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

			<Button
				variant="contained"
				color="secondary"
				className="w-full"
				aria-label="Send reset link"
				disabled={_.isEmpty(dirtyFields) || !isValid || isLoading}
				type="submit"
				size="medium"
			>
				{isLoading ? (
					<>
						<CircularProgress
							size={20}
							className="mr-2"
						/>
						Sending...
					</>
				) : (
					'Send reset link'
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

export default ForgotPasswordPageForm;
