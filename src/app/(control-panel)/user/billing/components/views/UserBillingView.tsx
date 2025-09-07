'use client';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	FormControl,
	FormLabel,
	Stack,
	TextField,
	Typography
} from '@mui/material';
import clsx from 'clsx';
import _ from 'lodash';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateUserBilling } from '../../api/hooks/useUpdateUserBilling';
import { useUserBilling } from '../../api/hooks/useUserBilling';
import UserBillingHeader from '../ui/UserBillingHeader';

const plans = [
	{
		value: 'basic',
		label: 'Basic',
		details: 'Starter plan for individuals.',
		price: 9
	},
	{
		value: 'team',
		label: 'Team',
		details: 'Collaborate up to 10 people.',
		price: 29
	},
	{
		value: 'enterprise',
		label: 'Enterprise',
		details: 'For bigger businesses.',
		price: 99
	}
];

/**
 * Form Validation Schema
 */
const schema = z.object({
	id: z.string(),
	plan: z.string(),
	cardHolder: z.string(),
	cardNumber: z.string(),
	cardExpiration: z.string(),
	cardCVC: z.string(),
	country: z.string(),
	zip: z.string()
});

type FormType = z.infer<typeof schema>;

const defaultValues: FormType = {
	id: '',
	plan: 'team',
	cardHolder: '',
	cardNumber: '',
	cardExpiration: '',
	cardCVC: '',
	country: '',
	zip: ''
};

function UserBillingView() {
	const { data: planBillingSettings } = useUserBilling();
	const { mutate: updatePlanBillingSettings } = useUpdateUserBilling();

	const { control, reset, handleSubmit, formState } = useForm<FormType>({
		defaultValues,
		mode: 'all',
		resolver: zodResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;

	useEffect(() => {
		reset(planBillingSettings);
	}, [planBillingSettings, reset]);

	/**
	 * Form Submit
	 */
	function onSubmit(formData: FormType) {
		updatePlanBillingSettings({ ...formData, id: formData.id });
	}

	return (
		<FusePageCarded
			scroll="content"
			header={<UserBillingHeader />}
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
										Change your plan
									</Typography>
									<Typography
										color="text.secondary"
										className="mb-4"
									>
										Upgrade or downgrade your current plan.
									</Typography>
									<Alert
										severity="info"
										className="mb-4"
									>
										Changing the plan will take effect immediately. You will be charged for the rest
										of the current month.
									</Alert>
									<Controller
										name="plan"
										control={control}
										render={({ field }) => (
											<Stack
												direction={{ xs: 'column', sm: 'row' }}
												spacing={2}
											>
												{plans.map((plan) => (
													<Box
														key={plan.value}
														sx={{ flex: 1 }}
													>
														<Card
															variant="outlined"
															sx={(theme) => ({
																border:
																	field.value === plan.value
																		? `2px solid ${theme.vars.palette.secondary.main}`
																		: `1px solid ${theme.vars.palette.divider}`,
																cursor: 'pointer',
																position: 'relative',
																boxShadow: field.value === plan.value ? 2 : 0
															})}
															className={clsx(
																'rounded-md p-6',
																field.value === plan.value && 'selected'
															)}
															onClick={() => field.onChange(plan.value)}
														>
															{field.value === plan.value && (
																<FuseSvgIcon
																	className="absolute top-0 right-0 mt-3 mr-3"
																	color="secondary"
																>
																	lucide:circle-check
																</FuseSvgIcon>
															)}
															<Typography className="font-semibold uppercase">
																{plan.label}
															</Typography>
															<Typography
																className="mt-1"
																color="text.secondary"
															>
																{plan.details}
															</Typography>
															<Box flexGrow={1} />
															<Box className="mt-2 flex items-end text-lg">
																<Typography>
																	{plan.price.toLocaleString('en-US', {
																		style: 'currency',
																		currency: 'USD'
																	})}
																</Typography>
																<Typography color="text.secondary"> / month</Typography>
															</Box>
														</Card>
													</Box>
												))}
											</Stack>
										)}
									/>
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
										Payment Details
									</Typography>
									<Typography
										color="text.secondary"
										className="mb-4"
									>
										Update your billing information. Make sure to set your location correctly as it
										could affect your tax rates.
									</Typography>
									<Box className="grid w-full grid-cols-4 gap-4">
										<Box className="col-span-4">
											<Controller
												control={control}
												name="cardHolder"
												render={({ field }) => (
													<FormControl className="w-full">
														<FormLabel htmlFor="cardHolder">Card holder</FormLabel>
														<TextField
															{...field}
															id="cardHolder"
															placeholder="Card holder"
															error={!!errors.cardHolder}
															helperText={errors?.cardHolder?.message}
															variant="outlined"
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
										<Box className="col-span-4 sm:col-span-2">
											<Controller
												control={control}
												name="cardNumber"
												render={({ field }) => (
													<FormControl className="w-full">
														<FormLabel htmlFor="cardNumber">Card number</FormLabel>
														<TextField
															{...field}
															id="cardNumber"
															placeholder="Card number"
															error={!!errors.cardNumber}
															helperText={errors?.cardNumber?.message}
															variant="outlined"
															fullWidth
															InputProps={{
																startAdornment: (
																	<FuseSvgIcon color="action">
																		lucide:credit-card
																	</FuseSvgIcon>
																)
															}}
														/>
													</FormControl>
												)}
											/>
										</Box>
										<Box className="col-span-2 sm:col-span-1">
											<Controller
												control={control}
												name="cardExpiration"
												render={({ field }) => (
													<FormControl className="w-full">
														<FormLabel htmlFor="cardExpiration">Expiration date</FormLabel>
														<TextField
															{...field}
															id="cardExpiration"
															placeholder="MM / YY"
															error={!!errors.cardExpiration}
															helperText={errors?.cardExpiration?.message}
															variant="outlined"
															fullWidth
															InputProps={{
																startAdornment: (
																	<FuseSvgIcon color="action">
																		lucide:credit-card
																	</FuseSvgIcon>
																)
															}}
														/>
													</FormControl>
												)}
											/>
										</Box>
										<Box className="col-span-2 sm:col-span-1">
											<Controller
												control={control}
												name="cardCVC"
												render={({ field }) => (
													<FormControl className="w-full">
														<FormLabel htmlFor="cardCVC">CVC / CVC2</FormLabel>
														<TextField
															{...field}
															id="cardCVC"
															placeholder="CVC / CVC2"
															error={!!errors.cardCVC}
															helperText={errors?.cardCVC?.message}
															variant="outlined"
															fullWidth
															InputProps={{
																startAdornment: (
																	<FuseSvgIcon color="action">
																		lucide:lock
																	</FuseSvgIcon>
																)
															}}
														/>
													</FormControl>
												)}
											/>
										</Box>
										<Box className="col-span-4 sm:col-span-2">
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
															error={!!errors.country}
															helperText={errors?.country?.message}
															variant="outlined"
															fullWidth
															InputProps={{
																startAdornment: (
																	<FuseSvgIcon color="action">lucide:map</FuseSvgIcon>
																)
															}}
														/>
													</FormControl>
												)}
											/>
										</Box>
										<Box className="col-span-4 sm:col-span-2">
											<Controller
												control={control}
												name="zip"
												render={({ field }) => (
													<FormControl className="w-full">
														<FormLabel htmlFor="zip">ZIP / Postal code</FormLabel>
														<TextField
															{...field}
															id="zip"
															placeholder="ZIP / Postal code"
															error={!!errors.zip}
															helperText={errors?.zip?.message}
															variant="outlined"
															fullWidth
															InputProps={{
																startAdornment: (
																	<FuseSvgIcon color="action">
																		lucide:hash
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
								onClick={() => reset(planBillingSettings)}
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

export default UserBillingView;
