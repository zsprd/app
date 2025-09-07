import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import { useMainTheme } from '@fuse/core/FuseSettings/hooks/fuseThemeHooks';
import useFuseSettings from '@fuse/core/FuseSettings/hooks/useFuseSettings';
import { FuseThemeOption } from '@fuse/core/FuseThemeSelector/ThemePreview';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Moon, Sun } from 'lucide-react';
import React, { useState } from 'react';
// import { useSnackbar } from 'notistack';

type LightDarkModeToggleProps = {
	className?: string;
	lightTheme: FuseThemeOption;
	darkTheme: FuseThemeOption;
};

function LightDarkModeToggle(props: LightDarkModeToggleProps) {
	const { className = '', lightTheme, darkTheme } = props;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const { setSettings } = useFuseSettings();
	// const { isGuest, updateUserSettings } = useUser();
	// const { enqueueSnackbar } = useSnackbar();
	const mainTheme = useMainTheme();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSelectionChange = (selection: 'light' | 'dark') => {
		if (selection === 'light') {
			handleThemeSelect(lightTheme);
		} else {
			handleThemeSelect(darkTheme);
		}

		handleClose();
	};

	async function handleThemeSelect(_theme: FuseThemeOption) {
		const _newSettings = setSettings({ theme: { ..._theme?.section } } as Partial<FuseSettingsConfigType>);

		/* if (!isGuest) {
			const updatedUserData = await updateUserSettings(_newSettings);

			if (updatedUserData) {
				enqueueSnackbar('User settings saved.', {
					variant: 'success'
				});
			}
		} */
	}

	return (
		<>
			<IconButton
				onClick={handleClick}
				className={className}
			>
				{mainTheme.palette.mode === 'light' && <Sun />}
				{mainTheme.palette.mode === 'dark' && <Moon />}
			</IconButton>
			<Menu
				id="light-dark-toggle-menu"
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={handleClose}
			>
				<MenuItem
					selected={mainTheme.palette.mode === 'light'}
					onClick={() => handleSelectionChange('light')}
				>
					Light
				</MenuItem>
				<MenuItem
					selected={mainTheme.palette.mode === 'dark'}
					onClick={() => handleSelectionChange('dark')}
				>
					Dark
				</MenuItem>
			</Menu>
		</>
	);
}

export default LightDarkModeToggle;
