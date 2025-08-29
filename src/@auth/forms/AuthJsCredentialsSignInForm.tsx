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
import { Alert } from '@mui/material';
import signinErrors from './signinErrors';
import { useEffect } from 'react';

/**
 * Form Validation Schema
 */
const schema = z.object({
	email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
	password: z
		.string()
		.min(8, 'Password is too short - must be at least 8 chars.')
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

	useEffect(() => {
		setValue('email', 'admin@fusetheme.com', {
			shouldDirty: true,
			shouldValidate: true
		});
		setValue('password', '5;4+0IOx:\\Dy', {
			shouldDirty: true,
			shouldValidate: true
		});
	}, [setValue]);

	async function onSubmit(formData: FormType) {
		const { email, password } = formData;

		const result = await signIn('credentials', {
			email,
			password,
			formType: 'signin',
			redirect: false
		});

		if (result?.error) {
			setError('root', { type: 'manual', message: signinErrors[result.error] });
			return false;
		}

		return true;
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
						/>
					</FormControl>
				)}
			/>

			<div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
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
				disabled={_.isEmpty(dirtyFields) || !isValid}
				type="submit"
				size="medium"
			>
				Sign in
			</Button>

		</form>
	);
}

export default SignInPageForm;
