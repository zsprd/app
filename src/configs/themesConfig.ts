import { FuseThemesType } from '@fuse/core/FuseSettings/FuseSettings';

/**
 * The lightPaletteText object defines the text color palette for the light theme.
 */
export const lightPaletteText = {
	primary: 'rgb(17, 24, 39)',
	secondary: 'rgb(107, 114, 128)',
	disabled: 'rgb(149, 156, 169)'
};

/**
 * The darkPaletteText object defines the text color palette for the dark theme.
 */
export const darkPaletteText = {
	primary: 'rgb(255,255,255)',
	secondary: 'rgb(148, 163, 184)',
	disabled: 'rgb(156, 163, 175)'
};

/**
 * Shared neutral ramp & status colours
 * Light theme
 */
const neutralsLightTheme = {
	grey: {
		50: '#F9FAFB',
		100: '#F3F4F6',
		200: '#E5E7EB',
		300: '#D1D5DB',
		400: '#9CA3AF',
		500: '#6B7280',
		600: '#4B5563',
		700: '#374151',
		800: '#272F3C',
		900: '#1F232B',
		A100: '#F3F4F6',
		A200: '#E5E7EB',
		A400: '#6B7280',
		A700: '#374151'
	},
	success: { main: '#22C55E', light: '#4ADE80', dark: '#15803D', contrastText: '#1F232B' },
	info: { main: '#3B82F6', light: '#60A5FA', dark: '#1D4ED8', contrastText: '#FFFFFF' },
	warning: { main: '#F59E0B', light: '#FBBF24', dark: '#B45309', contrastText: '#1F232B' },
	error: { main: '#EF4444', light: '#F87171', dark: '#B91C1C', contrastText: '#FFFFFF' }
};

/**
 * Shared neutral ramp & status colours
 * Dark theme
 */
const neutralsDarkTheme = {
	grey: {
		50: '#101214',
		100: '#16181D',
		200: '#1E2026',
		300: '#25282F',
		400: '#2D3139',
		500: '#6B7280',
		600: '#8A8F99',
		700: '#A5ABB5',
		800: '#CDD1D9',
		900: '#E5E7EB',
		A100: '#16181D',
		A200: '#1E2026',
		A400: '#2D3139',
		A700: '#6B7280'
	},
	success: { main: '#22C55E', light: '#4ADE80', dark: '#15803D', contrastText: '#0F1115' },
	info: { main: '#3B82F6', light: '#60A5FA', dark: '#1D4ED8', contrastText: '#FFFFFF' },
	warning: { main: '#F59E0B', light: '#FBBF24', dark: '#B45309', contrastText: '#0F1115' },
	error: { main: '#EF4444', light: '#F87171', dark: '#B91C1C', contrastText: '#FFFFFF' }
};

/**
 * The themesConfig object is a configuration object for the color themes of the Fuse application.
 */
export const themesConfig: FuseThemesType = {
	default: {
		palette: {
			mode: 'light',
			primary: { main: '#1F232B', light: '#363B44', dark: '#0F1115', contrastText: '#FFFFFF' },
			secondary: { main: '#1565C0', light: '#3C83D6', dark: '#0E4B90', contrastText: '#FFFFFF' },
			...neutralsLightTheme,
			text: { primary: '#1F232B', secondary: '#4B5563', disabled: '#9CA3AF' },
			background: { default: '#F6F7F8', paper: '#FFFFFF' },
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
	},
	defaultDark: {
		palette: {
			mode: 'dark',
			primary: {
				main: '#2B2F38',
				light: '#414652',
				dark: '#16191E',
				contrastText: '#FFFFFF'
			},
			secondary: {
				main: '#3C83D6',
				light: '#5A9AF0',
				dark: '#1D5EB0',
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
				hover: 'rgba(255,255,255,0.08)',
				selected: 'rgba(255,255,255,0.16)',
				disabled: 'rgba(255,255,255,0.3)',
				disabledBackground: 'rgba(255,255,255,0.12)',
				focus: 'rgba(255,255,255,0.12)'
			}
		}
	},
	defaultNavbar: {
		palette: {
			mode: 'light',
			...neutralsLightTheme,
			primary: { main: '#1F232B', light: '#363B44', dark: '#0F1115', contrastText: '#FFFFFF' },
			secondary: { main: '#1565C0', light: '#3C83D6', dark: '#0E4B90', contrastText: '#FFFFFF' },
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
