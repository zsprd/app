import useUser from '@auth/useUser';
import Link from '@fuse/core/Link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { darken, styled } from '@mui/material/styles';
import clsx from 'clsx';
import {
	ArrowDown,
	Bell,
	CircleQuestionMark,
	CreditCard,
	LogIn,
	LogOut,
	Settings,
	Shield,
	UserPen,
	UserPlus
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type UserMenuProps = {
	className?: string;
	onlyAvatar?: boolean;
	dense?: boolean;
};

const StyledButton = styled(Button)(({ theme }) => ({
	color: theme.palette.text.primary,
	'&:hover': {
		backgroundColor: darken(theme.palette.background.default, 0.04)
	}
}));

function UserMenu({ className = '', onlyAvatar = false, dense = true }: UserMenuProps) {
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
				className={clsx('min-h-10 min-w-10 px-2 md:px-2', className)}
				onClick={userMenuClick}
				color="inherit"
			>
				<div className="flex items-center">
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
							<div className={clsx('mr-2 ml-2 flex flex-auto flex-col', dense ? '' : 'gap-2')}>
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
							<div className="flex shrink-0 items-center">
								<ArrowDown size={16} />
							</div>
						</>
					)}
				</div>
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
									<LogIn size={16} />
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
									<UserPlus size={16} />
								</ListItemIcon>
								<ListItemText primary="Sign up" />
							</MenuItem>
						]
					: [
							<MenuItem
								key="profile"
								component={Link}
								to="/user/profile"
								onClick={userMenuClose}
								role="button"
							>
								<ListItemIcon>
									<UserPen size={16} />
								</ListItemIcon>
								<ListItemText primary="Profile" />
							</MenuItem>,
							<MenuItem
								key="settings"
								component={Link}
								to="/user/settings"
								onClick={userMenuClose}
								role="button"
							>
								<ListItemIcon>
									<Settings size={16} />
								</ListItemIcon>
								<ListItemText primary="Settings" />
							</MenuItem>,
							<MenuItem
								key="notifications"
								component={Link}
								to="/user/notifications"
								onClick={userMenuClose}
								role="button"
							>
								<ListItemIcon>
									<Bell size={16} />
								</ListItemIcon>
								<ListItemText primary="Notifications" />
							</MenuItem>,
							<Divider key="divider-1" />,
							<MenuItem
								key="privacy"
								component={Link}
								to="/privacy"
								onClick={userMenuClose}
								role="button"
							>
								<ListItemIcon>
									<Shield size={16} />
								</ListItemIcon>
								<ListItemText primary="Privacy" />
							</MenuItem>,
							<MenuItem
								key="help"
								component={Link}
								to="/help"
								onClick={userMenuClose}
								role="button"
							>
								<ListItemIcon>
									<CircleQuestionMark size={16} />
								</ListItemIcon>
								<ListItemText primary="Help" />
							</MenuItem>,
							<MenuItem
								key="billing"
								component={Link}
								to="/user/billing"
								onClick={userMenuClose}
								role="button"
							>
								<ListItemIcon>
									<CreditCard size={16} />
								</ListItemIcon>
								<ListItemText primary="Billing" />
							</MenuItem>,
							<Divider key="divider-2" />,
							<MenuItem
								key="sign-out"
								onClick={handleSignOut}
							>
								<ListItemIcon>
									<LogOut size={16} />
								</ListItemIcon>
								<ListItemText primary="Sign out" />
							</MenuItem>
						]}
			</Menu>
		</>
	);
}

export default UserMenu;
