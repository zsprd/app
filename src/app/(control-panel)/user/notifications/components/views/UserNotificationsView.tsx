'use client';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Box,
	Button,
	Card,
	CardContent,
	FormControlLabel,
	FormHelperText,
	Stack,
	Switch,
	Typography
} from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateUserNotifications } from '../../api/hooks/useUpdateUserNotifications';
import { useUserNotifications } from '../../api/hooks/useUserNotifications';
import UserNotificationsHeader from '../ui/UserNotificationsHeader';

const defaultValues: FormType = {
	id: '',
	communication: false,
	security: false,
	meetups: false,
	comments: false,
	mention: false,
	follow: false,
	inquiry: false
};

/**
 * Form Validation Schema
 */
const schema = z.object({
	id: z.string(),
	communication: z.boolean(),
	security: z.boolean(),
	meetups: z.boolean(),
	comments: z.boolean(),
	mention: z.boolean(),
	follow: z.boolean(),
	inquiry: z.boolean()
});

type FormType = z.infer<typeof schema>;

function UserNotificationsView() {
	const { data: notificationSettings } = useUserNotifications();
	const { mutate: updateNotificationSettings } = useUpdateUserNotifications();

	const { control, reset, handleSubmit, formState } = useForm<FormType>({
		defaultValues,
		mode: 'all',
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields } = formState;

	useEffect(() => {
		reset(notificationSettings);
	}, [notificationSettings, reset]);

	/**
	 * Form Submit
	 */
	function onSubmit(formData: FormType) {
		updateNotificationSettings({ ...formData, id: formData.id });
	}

	return (
		<FusePageCarded
			scroll="content"
			header={<UserNotificationsHeader />}
			content={
				<Box className="mx-auto w-full max-w-5xl py-8">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-12"
					>
						<Stack spacing={4}>
							<Card
								variant="outlined"
								sx={{ minWidth: 300 }}
							>
								<CardContent>
									<Typography
										variant="h6"
										className="mb-1 font-semibold"
									>
										Alerts
									</Typography>
									<Typography
										color="text.secondary"
										className="mb-4"
									>
										Manage how you receive news, security alerts, and event notifications.
									</Typography>
									<Stack spacing={2}>
										<Controller
											name="communication"
											control={control}
											render={({ field: { onChange, value } }) => (
												<Box>
													<FormControlLabel
														label="Communication"
														labelPlacement="start"
														control={
															<Switch
																onChange={(ev) => onChange(ev.target.checked)}
																checked={value}
																name="communication"
															/>
														}
														classes={{ root: 'm-0', label: 'flex flex-1' }}
													/>
													<FormHelperText>
														Get news, announcements, and product updates.
													</FormHelperText>
												</Box>
											)}
										/>
										<Controller
											name="security"
											control={control}
											render={({ field: { onChange, value } }) => (
												<Box>
													<FormControlLabel
														label="Security"
														labelPlacement="start"
														control={
															<Switch
																onChange={(ev) => onChange(ev.target.checked)}
																checked={value}
																name="security"
															/>
														}
														classes={{ root: 'm-0', label: 'flex flex-1' }}
													/>
													<FormHelperText>
														Get important notifications about your account security.
													</FormHelperText>
												</Box>
											)}
										/>
										<Controller
											name="meetups"
											control={control}
											render={({ field: { onChange, value } }) => (
												<Box>
													<FormControlLabel
														label="Meetups"
														labelPlacement="start"
														control={
															<Switch
																onChange={(ev) => onChange(ev.target.checked)}
																checked={value}
																name="meetups"
															/>
														}
														classes={{ root: 'm-0', label: 'flex flex-1' }}
													/>
													<FormHelperText>
														Get an email when a Meetup is posted close to my location.
													</FormHelperText>
												</Box>
											)}
										/>
									</Stack>
								</CardContent>
							</Card>
							<Card
								variant="outlined"
								sx={{ minWidth: 300 }}
							>
								<CardContent>
									<Typography
										variant="h6"
										className="mb-1 font-semibold"
									>
										Account Activity
									</Typography>
									<Typography
										color="text.secondary"
										className="mb-4"
									>
										Email me when:
									</Typography>
									<Stack spacing={2}>
										<Controller
											name="comments"
											control={control}
											render={({ field: { onChange, value } }) => (
												<FormControlLabel
													label="Someone comments on one of my items"
													labelPlacement="start"
													control={
														<Switch
															onChange={(ev) => onChange(ev.target.checked)}
															checked={value}
															name="comments"
														/>
													}
													classes={{ root: 'm-0', label: 'flex flex-1' }}
												/>
											)}
										/>
										<Controller
											name="mention"
											control={control}
											render={({ field: { onChange, value } }) => (
												<FormControlLabel
													label="Someone mentions me"
													labelPlacement="start"
													control={
														<Switch
															onChange={(ev) => onChange(ev.target.checked)}
															checked={value}
															name="mention"
														/>
													}
													classes={{ root: 'm-0', label: 'flex flex-1' }}
												/>
											)}
										/>
										<Controller
											name="follow"
											control={control}
											render={({ field: { onChange, value } }) => (
												<FormControlLabel
													label="Someone follows me"
													labelPlacement="start"
													control={
														<Switch
															onChange={(ev) => onChange(ev.target.checked)}
															checked={value}
															name="follow"
														/>
													}
													classes={{ root: 'm-0', label: 'flex flex-1' }}
												/>
											)}
										/>
										<Controller
											name="inquiry"
											control={control}
											render={({ field: { onChange, value } }) => (
												<FormControlLabel
													label="Someone replies to my job posting"
													labelPlacement="start"
													control={
														<Switch
															onChange={(ev) => onChange(ev.target.checked)}
															checked={value}
															name="inquiry"
														/>
													}
													classes={{ root: 'm-0', label: 'flex flex-1' }}
												/>
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
								onClick={() => reset(notificationSettings)}
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

export default UserNotificationsView;
