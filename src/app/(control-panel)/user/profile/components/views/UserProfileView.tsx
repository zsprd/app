'use client';

import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Card, CardContent, FormControl, FormLabel, Stack, TextField, Typography } from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateUserProfile } from '../../api/hooks/useUpdateUserProfile';
import { useUserProfile } from '../../api/hooks/useUserProfile';
import UserProfileHeader from '../ui/UserProfileHeader';

const defaultValues: FormType = {
	id: '',
	name: '',
	username: '',
	title: '',
	company: '',
	about: '',
	email: '',
	phone: '',
	country: '',
	language: ''
};

/**
 * Form Validation Schema
 */
const schema = z.object({
	id: z.string().min(1, 'ID is required'),
	name: z.string().min(1, 'Name is required'),
	username: z.string().min(1, 'Username is required'),
	title: z.string().min(1, 'Title is required'),
	company: z.string().min(1, 'Company is required'),
	about: z.string().min(1, 'About is required'),
	email: z.string().email('Invalid email').min(1, 'Email is required'),
	phone: z.string().min(1, 'Phone is required'),
	country: z.string().min(1, 'Country is required'),
	language: z.string().min(1, 'Language is required')
});

type FormType = z.infer<typeof schema>;

function UserProfileView() {
	const { data: userProfile } = useUserProfile();
	const { mutate: updateUserProfile } = useUpdateUserProfile();

	const { control, reset, handleSubmit, formState } = useForm<FormType>({
		defaultValues,
		mode: 'all',
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		reset(userProfile);
	}, [userProfile, reset]);

	/**
	 * Form Submit
	 */
	function onSubmit(formData: FormType) {
		updateUserProfile(formData);
	}

	return (
		<FusePageCarded
			scroll="content"
			header={<UserProfileHeader />}
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
										Profile
									</Typography>
									<Typography
										color="text.secondary"
										className="mb-4"
									>
										Following information is publicly displayed, be careful!
									</Typography>
									<Box className="grid w-full gap-4 sm:grid-cols-4">
										<Box className="sm:col-span-4">
											<Controller
												control={control}
												name="name"
												render={({ field }) => (
													<FormControl className="w-full">
														<FormLabel htmlFor="name">Name</FormLabel>
														<TextField
															{...field}
															placeholder="Name"
															id="name"
															error={!!errors.name}
															helperText={errors?.name?.message}
															required
															fullWidth
															InputProps={{
																startAdornment: (
																	<FuseSvgIcon color="action">
																		lucide:circle-user
																	</FuseSvgIcon>
																)
															}}
														/>
													</FormControl>
												)}
											/>
										</Box>
										<Box className="sm:col-span-4">
											<Controller
												control={control}
												name="username"
												render={({ field }) => (
													<FormControl className="w-full">
														<FormLabel htmlFor="username">Username</FormLabel>
														<TextField
															{...field}
															placeholder="Username"
															id="username"
															error={!!errors.username}
															helperText={errors?.username?.message}
															variant="outlined"
															required
															fullWidth
															InputProps={{
																startAdornment: (
																	<Typography
																		color="text.secondary"
																		className="italic"
																	>
																		fusetheme.com/
																	</Typography>
																)
															}}
														/>
													</FormControl>
												)}
											/>
										</Box>
										<Box className="sm:col-span-2">
											<Controller
												control={control}
												name="title"
												render={({ field }) => (
													<FormControl className="w-full">
														<FormLabel htmlFor="title">Title</FormLabel>
														<TextField
															{...field}
															placeholder="Job title"
															id="title"
															error={!!errors.title}
															helperText={errors?.title?.message}
															variant="outlined"
															fullWidth
															InputProps={{
																startAdornment: (
																	<FuseSvgIcon color="action">
																		lucide:briefcase
																	</FuseSvgIcon>
																)
															}}
														/>
													</FormControl>
												)}
											/>
										</Box>
										<Box className="sm:col-span-2">
											<Controller
												control={control}
												name="company"
												render={({ field }) => (
													<FormControl className="w-full">
														<FormLabel htmlFor="company">Company</FormLabel>
														<TextField
															{...field}
															placeholder="Company"
															id="company"
															error={!!errors.company}
															helperText={errors?.company?.message}
															variant="outlined"
															fullWidth
															InputProps={{
																startAdornment: (
																	<FuseSvgIcon color="action">
																		lucide:building-2
																	</FuseSvgIcon>
																)
															}}
														/>
													</FormControl>
												)}
											/>
										</Box>
										<Box className="sm:col-span-4">
											<Controller
												control={control}
												name="about"
												render={({ field }) => (
													<FormControl className="w-full">
														<FormLabel htmlFor="about">Notes</FormLabel>
														<TextField
															{...field}
															placeholder="Notes"
															id="about"
															error={!!errors.about}
															variant="outlined"
															fullWidth
															multiline
															minRows={5}
															maxRows={10}
															InputProps={{
																startAdornment: (
																	<FuseSvgIcon
																		className="mt-1"
																		color="action"
																	>
																		lucide:align-left
																	</FuseSvgIcon>
																)
															}}
															helperText={
																<span className="flex flex-col">
																	<span>
																		Brief description for your profile. Basic HTML
																		and Emoji are allowed.
																	</span>
																	<span>{errors?.about?.message}</span>
																</span>
															}
														/>
													</FormControl>
												)}
											/>
										</Box>
									</Box>
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
										Personal Information
									</Typography>
									<Typography
										color="text.secondary"
										className="mb-4"
									>
										Communication details in case we want to connect with you. These will be kept
										private.
									</Typography>
									<Box className="grid w-full gap-4 sm:grid-cols-4">
										<Box className="sm:col-span-2">
											<Controller
												control={control}
												name="email"
												render={({ field }) => (
													<FormControl className="w-full">
														<FormLabel htmlFor="email">Email</FormLabel>
														<TextField
															{...field}
															id="email"
															placeholder="Email"
															variant="outlined"
															fullWidth
															error={!!errors.email}
															helperText={errors?.email?.message}
															InputProps={{
																startAdornment: (
																	<FuseSvgIcon color="action">
																		lucide:mail
																	</FuseSvgIcon>
																)
															}}
														/>
													</FormControl>
												)}
											/>
										</Box>
										<Box className="sm:col-span-2">
											<Controller
												control={control}
												name="phone"
												render={({ field }) => (
													<FormControl className="w-full">
														<FormLabel htmlFor="phone">Phone Number</FormLabel>
														<TextField
															{...field}
															id="phone"
															placeholder="Phone Number"
															variant="outlined"
															fullWidth
															error={!!errors.phone}
															helperText={errors?.phone?.message}
															InputProps={{
																startAdornment: (
																	<FuseSvgIcon color="action">
																		lucide:phone
																	</FuseSvgIcon>
																)
															}}
														/>
													</FormControl>
												)}
											/>
										</Box>
										<Box className="sm:col-span-2">
											<Controller
												control={control}
												name="country"
												render={({ field }) => (
													<FormControl className="w-full">
														<FormLabel htmlFor="country">Country</FormLabel>
														<TextField
															{...field}
															id="country"
															placeholder="Country"
															variant="outlined"
															fullWidth
															error={!!errors.country}
															helperText={errors?.country?.message}
															InputProps={{
																startAdornment: (
																	<FuseSvgIcon color="action">
																		lucide:flag
																	</FuseSvgIcon>
																)
															}}
														/>
													</FormControl>
												)}
											/>
										</Box>
										<Box className="sm:col-span-2">
											<Controller
												control={control}
												name="language"
												render={({ field }) => (
													<FormControl className="w-full">
														<FormLabel htmlFor="language">Language</FormLabel>
														<TextField
															{...field}
															id="language"
															placeholder="Language"
															variant="outlined"
															fullWidth
															error={!!errors.language}
															helperText={errors?.language?.message}
															InputProps={{
																startAdornment: (
																	<FuseSvgIcon color="action">
																		lucide:globe
																	</FuseSvgIcon>
																)
															}}
														/>
													</FormControl>
												)}
											/>
										</Box>
									</Box>
								</CardContent>
							</Card>
						</Stack>
						<Box className="flex items-center justify-end gap-2">
							<Button
								variant="outlined"
								disabled={_.isEmpty(dirtyFields)}
								onClick={() => reset(userProfile)}
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

export default UserProfileView;
