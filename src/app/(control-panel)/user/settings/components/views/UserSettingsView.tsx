'use client';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Box,
	Button,
	Card,
	CardContent,
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Stack,
	Switch,
	TextField,
	Typography
} from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateUserSettings } from '../../api/hooks/useUpdateUserSettings';
import { useUserSettings } from '../../api/hooks/useUserSettings';
import UserSettingsHeader from '../ui/UserSettingsHeader';

const defaultValues: FormType = {
	id: '',
	currentPassword: '',
	newPassword: '',
	twoStepVerification: false,
	askPasswordChange: false
};

/**
 * Form Validation Schema
 */
const schema = z.object({
	id: z.string(),
	currentPassword: z.string(),
	newPassword: z.string().min(6, 'Password must be at least 6 characters').or(z.literal('')).optional(),
	twoStepVerification: z.boolean(),
	askPasswordChange: z.boolean()
});

type FormType = z.infer<typeof schema>;

function UserSecurityView() {
	const { data: securitySettings } = useUserSettings();
	const { mutate: updateSecuritySettings, isSuccess, error: updateError } = useUpdateUserSettings();

	const {
		control,
		setError,
		reset,
		handleSubmit,
		formState: { isValid, dirtyFields, errors }
	} = useForm<FormType>({
		defaultValues,
		mode: 'all',
		resolver: zodResolver(schema)
	});

	useEffect(() => {
		reset(securitySettings);
	}, [securitySettings, reset]);

	useEffect(() => {
		reset({ ...securitySettings, currentPassword: '', newPassword: '' });
	}, [isSuccess, securitySettings, reset]);

	useEffect(() => {
		if (updateError) {
			setError('root', { type: 'manual', message: updateError.message });
		}
	}, [updateError, setError]);

	/**
	 * Form Submit
	 */
	const onSubmit = (formData: FormType) => {
		updateSecuritySettings({ ...formData, id: formData.id });
	};

	return (
		<FusePageCarded
			scroll="content"
			header={<UserSettingsHeader />}
			content={
				<Box className="mx-auto w-full max-w-5xl py-8">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-12"
					>
						<Stack spacing={4}>
							<Card
								variant="outlined"
								sx={{ minWidth: 300, minHeight: 200 }}
							>
								<CardContent>
									<Typography
										variant="h6"
										className="mb-1 font-semibold"
									>
										Change your password
									</Typography>
									<Typography
										color="text.secondary"
										className="mb-4"
									>
										You can only change your password twice within 24 hours!
									</Typography>
									<Stack spacing={3}>
										<Controller
											name="currentPassword"
											control={control}
											render={({ field }) => (
												<FormControl fullWidth>
													<FormLabel htmlFor="currentPassword">
														Current password (default: changeme)
													</FormLabel>
													<TextField
														{...field}
														id="currentPassword"
														type="password"
														error={!!errors.currentPassword}
														helperText={errors?.currentPassword?.message}
														variant="outlined"
														fullWidth
														InputProps={{
															startAdornment: (
																<FuseSvgIcon
																	color="action"
																	className="mr-2"
																>
																	lucide:key
																</FuseSvgIcon>
															)
														}}
													/>
												</FormControl>
											)}
										/>
										<Controller
											name="newPassword"
											control={control}
											render={({ field }) => (
												<FormControl fullWidth>
													<FormLabel htmlFor="newPassword">New password</FormLabel>
													<TextField
														{...field}
														id="newPassword"
														type="password"
														error={!!errors.newPassword}
														helperText={errors?.newPassword?.message}
														variant="outlined"
														fullWidth
														InputProps={{
															startAdornment: (
																<FuseSvgIcon
																	color="action"
																	className="mr-2"
																>
																	lucide:key
																</FuseSvgIcon>
															)
														}}
													/>
												</FormControl>
											)}
										/>
									</Stack>
								</CardContent>
							</Card>
							<Card
								variant="outlined"
								sx={{ minWidth: 300, minHeight: 200 }}
							>
								<CardContent>
									<Typography
										variant="h6"
										className="mb-1 font-semibold"
									>
										Security preferences
									</Typography>
									<Typography
										color="text.secondary"
										className="mb-4"
									>
										Keep your account more secure with the following preferences.
									</Typography>
									<Stack spacing={2}>
										<Controller
											name="twoStepVerification"
											control={control}
											render={({ field: { onChange, value } }) => (
												<Box>
													<FormControlLabel
														label="Enable 2-step authentication"
														labelPlacement="start"
														control={
															<Switch
																onChange={(ev) => onChange(ev.target.checked)}
																checked={!!value}
																name="twoStepVerification"
															/>
														}
														classes={{ root: 'm-0', label: 'flex flex-1' }}
													/>
													<FormHelperText>
														Protects you against password theft by requesting an
														authentication code via SMS on every login.
													</FormHelperText>
												</Box>
											)}
										/>
										<Controller
											name="askPasswordChange"
											control={control}
											render={({ field: { onChange, value } }) => (
												<Box>
													<FormControlLabel
														label="Ask to change password every 6 months"
														labelPlacement="start"
														control={
															<Switch
																onChange={(ev) => onChange(ev.target.checked)}
																checked={!!value}
																name="askPasswordChange"
															/>
														}
														classes={{ root: 'm-0', label: 'flex flex-1' }}
													/>
													<FormHelperText>
														A simple but effective way to be protected against data leaks
														and password theft.
													</FormHelperText>
												</Box>
											)}
										/>
									</Stack>
								</CardContent>
							</Card>
						</Stack>
						<Box className="flex items-center justify-end gap-2">
							<Button
								variant="outlined"
								disabled={_.isEmpty(dirtyFields)}
								onClick={() => reset(securitySettings)}
								sx={{ minWidth: 120, height: 36 }}
							>
								Cancel
							</Button>
							<Button
								variant="contained"
								color="secondary"
								disabled={_.isEmpty(dirtyFields) || !isValid}
								type="submit"
								sx={{ minWidth: 120, height: 36 }}
							>
								Save
							</Button>
						</Box>
					</form>
				</Box>
			}
		/>
	);
}

export default UserSecurityView;
