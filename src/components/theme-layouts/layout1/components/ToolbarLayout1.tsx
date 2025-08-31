import { Layout1ConfigDefaultsType } from '@/components/theme-layouts/layout1/Layout1Config';
import useFuseLayoutSettings from '@fuse/core/FuseLayout/useFuseLayoutSettings';
import { AppBar, Divider } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import _ from 'lodash';
import { memo } from 'react';
import LightDarkModeToggle from 'src/components/LightDarkModeToggle';
import NavbarToggleButton from 'src/components/theme-layouts/components/navbar/NavbarToggleButton';
import themeOptions from 'src/configs/themeOptions';
import ToolbarTheme from 'src/contexts/ToolbarTheme';
import useThemeMediaQuery from '../../../../@fuse/hooks/useThemeMediaQuery';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import NavigationSearch from '../../components/navigation/NavigationSearch';
import QuickPanelToggleButton from '../../components/quickPanel/QuickPanelToggleButton';
import UserMenu from '../../components/UserMenu';

type ToolbarLayout1Props = {
	className?: string;
};

/**
 * The toolbar layout 1.
 */
function ToolbarLayout1(props: ToolbarLayout1Props) {
	const { className } = props;

	const settings = useFuseLayoutSettings();
	const config = settings.config as Layout1ConfigDefaultsType;
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	return (
		<ToolbarTheme>
			<AppBar
				id="fuse-toolbar"
				className={clsx('relative z-20 flex', className)}
				sx={(theme) => ({
					backgroundColor: theme.vars.palette.background.default,
					color: theme.vars.palette.text.primary
				})}
			>
				<Toolbar className="min-h-12 p-0 md:min-h-16">
					<div className="flex flex-1 items-center gap-3 px-2 md:px-4">
						{config.navbar.display && config.navbar.position === 'left' && (
							<>
								<NavbarToggleButton />

								<Divider
									orientation="vertical"
									flexItem
									variant="middle"
								/>
							</>
						)}

						<NavigationSearch />
					</div>

					<div className="flex items-center overflow-x-auto px-2 py-2 md:px-4">
						<LanguageSwitcher />
						<LightDarkModeToggle
							lightTheme={_.find(themeOptions, { id: 'Light' })}
							darkTheme={_.find(themeOptions, { id: 'Dark' })}
						/>

						<QuickPanelToggleButton />
						<UserMenu />
					</div>

					{config.navbar.display && config.navbar.position === 'right' && (
						<>
							{!isMobile && (
								<>
									<Divider
										orientation="vertical"
										flexItem
										variant="middle"
									/>
									<NavbarToggleButton />
								</>
							)}

							{isMobile && <NavbarToggleButton className="h-10 w-10 p-0 sm:mx-2" />}
						</>
					)}
				</Toolbar>
			</AppBar>
		</ToolbarTheme>
	);
}

export default memo(ToolbarLayout1);
