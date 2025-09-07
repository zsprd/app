import { LanguageType } from '@i18n/I18nContext';
import useI18n from '@i18n/useI18n';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Languages } from 'lucide-react';
import { useState } from 'react';

/**
 * The language switcher.
 */
function LanguageSwitcher() {
	const { languages, changeLanguage, language, langDirection } = useI18n();

	const [menu, setMenu] = useState<null | HTMLElement>(null);

	const langMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setMenu(event.currentTarget);
	};

	const langMenuClose = () => {
		setMenu(null);
	};

	function handleLanguageChange(lng: LanguageType) {
		changeLanguage(lng.id);

		langMenuClose();
	}

	return (
		<>
			<IconButton onClick={langMenuClick}>
				<Languages size={16} />
			</IconButton>
			<Menu
				id="language-switcher-menu"
				open={Boolean(menu)}
				anchorEl={menu}
				onClose={langMenuClose}
			>
				{languages.map((lng) => (
					<MenuItem
						key={lng.id}
						onClick={() => handleLanguageChange(lng)}
						selected={lng.id === language?.id}
					>
						<ListItemIcon>
							<img
								src={`/assets/images/flags/${lng.flag}.svg`}
								alt={lng.title}
								style={{
									width: 24,
									height: 16,
									...(langDirection === 'rtl' ? { marginLeft: 8 } : { marginRight: 8 })
								}}
							/>
						</ListItemIcon>
						<ListItemText primary={lng.title} />
					</MenuItem>
				))}
			</Menu>
		</>
	);
}

export default LanguageSwitcher;
