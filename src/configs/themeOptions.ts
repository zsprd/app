import themesConfig from 'src/configs/themesConfig';

const themeOptions = [
	{
		id: 'Light',
		section: {
			main: themesConfig.default,
			navbar: themesConfig.defaultNavbar,
			toolbar: themesConfig.default,
			footer: themesConfig.default
		}
	},
	{
		id: 'Dark',
		section: {
			main: themesConfig.defaultDark,
			navbar: themesConfig.defaultDark,
			toolbar: themesConfig.defaultDark,
			footer: themesConfig.defaultDark
		}
	}
];

export default themeOptions;
