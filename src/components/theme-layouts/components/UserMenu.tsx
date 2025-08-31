import useUser from '@auth/useUser';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Link from '@fuse/core/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { darken, styled } from '@mui/material/styles';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type UserMenuProps = {
	className?: string;
	onlyAvatar?: boolean;
	dense?: boolean;
	arrowIcon?: string;
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
	arrowIcon = 'lucide:chevron-down'
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
			<Menu
				id="user-menu"
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
			>
				{isGuest
					? [
							<MenuItem
								key="sign-in"
								component={Link}
								to="/sign-in"
								role="button"
							>
								<ListItemIcon>
									<FuseSvgIcon>lucide:lock</FuseSvgIcon>
								</ListItemIcon>
								<ListItemText primary="Sign In" />
							</MenuItem>,
							<MenuItem
								key="sign-up"
								component={Link}
								to="/sign-up"
								role="button"
							>
								<ListItemIcon>
									<FuseSvgIcon>lucide:user-plus</FuseSvgIcon>
								</ListItemIcon>
								<ListItemText primary="Sign up" />
							</MenuItem>
						]
					: [
							<MenuItem
								key="profile"
								component={Link}
								to="/apps/profile"
								onClick={userMenuClose}
								role="button"
							>
								<ListItemIcon>
									<FuseSvgIcon>lucide:circle-user</FuseSvgIcon>
								</ListItemIcon>
								<ListItemText primary="My Profile" />
							</MenuItem>,
							<MenuItem
								key="inbox"
								component={Link}
								to="/apps/mailbox"
								onClick={userMenuClose}
								role="button"
							>
								<ListItemIcon>
									<FuseSvgIcon>lucide:mail</FuseSvgIcon>
								</ListItemIcon>
								<ListItemText primary="Inbox" />
							</MenuItem>,
							<MenuItem
								key="sign-out"
								onClick={handleSignOut}
							>
								<ListItemIcon>
									<FuseSvgIcon>lucide:square-arrow-right</FuseSvgIcon>
								</ListItemIcon>
								<ListItemText primary="Sign out" />
							</MenuItem>
						]}
			</Menu>
		</>
	);
}

export default UserMenu;
