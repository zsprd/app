import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { darken } from '@mui/material/styles';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { styled } from '@mui/material/styles';
import { PopoverProps } from '@mui/material/Popover';
import Link from '@fuse/core/Link';
import useUser from '@auth/useUser';
import clsx from 'clsx';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/navigation';

type UserMenuProps = {
	className?: string;
	onlyAvatar?: boolean;
	dense?: boolean;
	arrowIcon?: string;
	popoverProps?: Partial<PopoverProps>;
};

const StyledButton = styled(Button)(({ theme }) => ({
	color: theme.palette.text.primary,
	'&:hover': {
		backgroundColor: darken(theme.palette.background.default, 0.04)
	}
}));

function UserMenu({
	className = '',
	onlyAvatar = false,
	dense = false,
	arrowIcon = 'lucide:chevron-down',
	popoverProps
}: UserMenuProps) {
	const { data: user, isGuest } = useUser();
	const router = useRouter();
	const [userMenu, setUserMenu] = useState<HTMLElement | null>(null);

	const userMenuClose = () => {
		setUserMenu(null);
	};

	const userMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setUserMenu(event.currentTarget);
	};

	// Updated sign-out handler to redirect to sign-out page first
	const handleSignOut = async () => {
		userMenuClose();
		router.push('/sign-out'); // Go to sign-out page
	};

	return (
		<>
			<StyledButton
				className={clsx('min-h-10 min-w-10 px-2 md:px-4', dense ? 'p-2' : 'p-4', className)}
				onClick={userMenuClick}
				color="inherit"
			>
				{user?.photoURL ? (
					<Avatar
						sx={{
							background: (theme) =>
								theme.palette.mode === 'light'
									? darken(theme.palette.background.default, 0.04)
									: theme.palette.text.secondary
						}}
						className="text-32 font-bold"
						src={user.photoURL}
						alt={user.displayName}
					>
						{user?.displayName?.[0]}
					</Avatar>
				) : (
					<Avatar
						sx={{
							background: (theme) =>
								theme.palette.mode === 'light'
									? darken(theme.palette.background.default, 0.04)
									: theme.palette.text.secondary
						}}
						className="text-32 font-bold"
					>
						{user?.displayName?.[0]}
					</Avatar>
				)}
				{!onlyAvatar && (
					<>
						<div className={clsx('flex flex-auto flex-col', dense ? '' : 'gap-2')}>
							<Typography
								component="span"
								className={clsx(
									'title flex truncate leading-none font-semibold tracking-tight capitalize',
									dense ? 'text-md' : 'text-base'
								)}
							>
								{user?.displayName}
							</Typography>
							<Typography
								className={clsx(
									'flex leading-none font-medium tracking-tighter',
									dense ? 'text-sm' : 'text-md'
								)}
								color="text.secondary"
							>
								{user?.email}
							</Typography>
						</div>
						<div className="flex shrink-0 items-center gap-2">
							<Tooltip
								title={
									<>
										{user.role?.toString()}
										{(!user.role || (Array.isArray(user.role) && user.role.length === 0)) &&
											'Guest'}
									</>
								}
							>
								<FuseSvgIcon className="info-icon">lucide:info</FuseSvgIcon>
							</Tooltip>
							<FuseSvgIcon
								className="arrow"
								size={13}
							>
								{arrowIcon}
							</FuseSvgIcon>
						</div>
					</>
				)}
			</StyledButton>
			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
				classes={{
					paper: 'min-w-32'
				}}
				{...popoverProps}
			>
				{isGuest ? (
					<>
						<MenuItem
							component={Link}
							to="/sign-in"
							role="button"
						>
							<ListItemIcon>
								<FuseSvgIcon>lucide:lock</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Sign In" />
						</MenuItem>
						<MenuItem
							component={Link}
							to="/sign-up"
							role="button"
						>
							<ListItemIcon>
								<FuseSvgIcon>lucide:user-plus</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Sign up" />
						</MenuItem>
					</>
				) : (
					<>
						<MenuItem
							component={Link}
							to="/apps/profile"
							onClick={userMenuClose}
							role="button"
						>
							<ListItemIcon>
								<FuseSvgIcon>lucide:circle-user</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="My Profile" />
						</MenuItem>
						<MenuItem
							component={Link}
							to="/apps/mailbox"
							onClick={userMenuClose}
							role="button"
						>
							<ListItemIcon>
								<FuseSvgIcon>lucide:mail</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Inbox" />
						</MenuItem>
						<MenuItem onClick={handleSignOut}>
							<ListItemIcon>
								<FuseSvgIcon>lucide:square-arrow-right</FuseSvgIcon>
							</ListItemIcon>
							<ListItemText primary="Sign out" />
						</MenuItem>
					</>
				)}
			</Popover>
		</>
	);
}

export default UserMenu;
