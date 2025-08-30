import { FuseThemesType } from '@fuse/core/FuseSettings/FuseSettings';

/**
 * The lightPaletteText object defines the text color palette for the light theme.
 */
export const lightPaletteText = {
	primary: '#111827',
	secondary: '#6B7280',
	disabled: '#959CA9'
};

/**
 * The darkPaletteText object defines the text color palette for the dark theme.
 */
export const darkPaletteText = {
	primary: '#FFFFFF',
	secondary: '#94A3B8',
	disabled: '#9CA3AF'
};

/**
 * Shared neutral ramp & status colours
 * Light theme
 */
const neutralsLightTheme = {
	grey: {
		100: '#F3F4F6',
		200: '#E5E7EB',
		300: '#D1D5DB',
		400: '#9CA3AF',
		500: '#6B7280',
		600: '#4B5563',
		700: '#374151',
		800: '#272F3C',
		900: '#1F232B'
	},
	success: { main: '#6BCB77', light: '#8ED692', dark: '#4FB25B', contrastText: '#FFFFFF' },
	info: { main: '#8E7CC3', light: '#A998D1', dark: '#6B5B9B', contrastText: '#FFFFFF' },
	warning: { main: '#FFB562', light: '#FFCA87', dark: '#E8883D', contrastText: '#000000' },
	error: { main: '#FF6B6B', light: '#FF9090', dark: '#E03E3E', contrastText: '#FFFFFF' }
};

/**
 * Shared neutral ramp & status colours
 * Dark theme
 */
const neutralsDarkTheme = {
	grey: {
		100: '#16181D',
		200: '#1E2026',
		300: '#25282F',
		400: '#2D3139',
		500: '#6B7280',
		600: '#8A8F99',
		700: '#A5ABB5',
		800: '#CDD1D9',
		900: '#E5E7EB'
	},
	success: { main: '#6BCB77', light: '#8ED692', dark: '#4FB25B', contrastText: '#000000' },
	info: { main: '#8E7CC3', light: '#A998D1', dark: '#6B5B9B', contrastText: '#FFFFFF' },
	warning: { main: '#FFB562', light: '#FFCA87', dark: '#E8883D', contrastText: '#000000' },
	error: { main: '#FF6B6B', light: '#FF9090', dark: '#E03E3E', contrastText: '#FFFFFF' }
};

/**
 * The themesConfig object is a configuration object for the color themes of the Fuse application.
 */
export const themesConfig: FuseThemesType = {
	default: {
		palette: {
			mode: 'light',
			primary: {
				main: '#01048A',
				light: '#2A2FB4',
				dark: '#000362',
				contrastText: '#FFFFFF'
			},
			secondary: {
				main: '#1AA7E8',
				light: '#4BBFF2',
				dark: '#0E85BE',
				contrastText: '#FFFFFF'
			},
			...neutralsLightTheme,
			text: { primary: '#1F232B', secondary: '#4B5563', disabled: '#9CA3AF' },
			background: { default: '#F6F7F8', paper: '#FFFFFF' },
			divider: '#E5E7EB',
			action: {
				active: '#4B5563',
				hover: '#F6EBCE',
				selected: '#F6E5BA',
				disabled: '#BFC4CC',
				disabledBackground: '#F6F7F8',
				focus: '#F6E8C4'
			}
		}
	},
	defaultDark: {
		palette: {
			mode: 'dark',
			primary: {
				main: '#01048A',
				light: '#2A2FB4',
				dark: '#000362',
				contrastText: '#FFFFFF'
			},
			secondary: {
				main: '#1AA7E8',
				light: '#4BBFF2',
				dark: '#0E85BE',
				contrastText: '#FFFFFF'
			},
			...neutralsDarkTheme,
			text: {
				primary: '#E5E7EB',
				secondary: '#A5ABB5',
				disabled: '#6B7280'
			},
			background: {
				default: '#0F1115',
				paper: '#1A1D22'
			},
			divider: '#2D3139',
			action: {
				active: '#CDD1D9',
				hover: '#3E3318',
				selected: '#564625',
				disabled: '#4D4D4D',
				disabledBackground: '#1F1F1F',
				focus: '#4A3C1F'
			}
		}
	},
	defaultNavbar: {
		palette: {
			mode: 'light',
			...neutralsLightTheme,
			primary: {
				main: '#01048A',
				light: '#2A2FB4',
				dark: '#000362',
				contrastText: '#FFFFFF'
			},
			secondary: {
				main: '#1AA7E8',
				light: '#4BBFF2',
				dark: '#0E85BE',
				contrastText: '#FFFFFF'
			},
			text: { primary: '#1F232B', secondary: '#4B5563', disabled: '#9CA3AF' },
			background: { default: '#E5E7EB', paper: '#FFFFFF' },
			divider: '#E5E7EB',
			action: {
				active: '#4B5563',
				hover: '#E5E7EB',
				selected: '#D1D5DB',
				disabled: '#BFC4CC',
				disabledBackground: '#F6F7F8',
				focus: '#D1D5DB'
			}
		}
	}
};

export default themesConfig;
