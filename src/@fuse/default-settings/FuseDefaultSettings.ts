'use client';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import qs from 'qs';
import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import type {} from '@mui/material/themeCssVarsAugmentation';

/**
 * The defaultTheme object defines the default color palette for the application.
 */
const defaultTheme = {
	palette: {
		mode: 'light',
		text: {
			primary: 'rgb(17, 24, 39)',
			secondary: 'rgb(107, 114, 128)',
			disabled: 'rgb(149, 156, 169)'
		},
		common: {
			black: 'rgb(17, 24, 39)',
			white: 'rgb(255, 255, 255)'
		},
		primary: {
			light: '#bec1c5',
			main: '#252f3e',
			dark: '#0d121b',
			contrastDefaultColor: 'light'
		},
		secondary: {
			light: '#bdf2fa',
			main: '#22d3ee',
			dark: '#0cb7e2'
		},
		background: {
			paper: '#FFFFFF',
			default: '#f6f7f9'
		},
		error: {
			light: '#ffcdd2',
			main: '#f44336',
			dark: '#b71c1c'
		}
	}
};

/**
 * The defaultSettings object defines the default settings for the Fuse application.
 */
export const defaultSettings = {
	customScrollbars: true,
	direction: 'ltr',
	layout: {},
	theme: {
		main: defaultTheme,
		navbar: defaultTheme,
		toolbar: defaultTheme,
		footer: defaultTheme
	}
};

/**
 * The getParsedQuerySettings function parses the query string to retrieve the default settings for the Fuse application.
 * It returns a FuseSettingsConfigType object that can be used to configure the application.
 */
export function getParsedQuerySettings(): FuseSettingsConfigType | object {
	if (typeof window === 'undefined') {
		return null;
	}

	const parsedQueryString = qs.parse(window?.location?.search, { ignoreQueryPrefix: true });

	const { defaultSettings = {} } = parsedQueryString;

	if (typeof defaultSettings === 'string') {
		// Handle the case when defaultSettings is a string
		return JSON.parse(defaultSettings) as FuseSettingsConfigType;
	}

	return {};

	// Generating route params from settings
	/* const settings = qs.stringify({
        defaultSettings: JSON.stringify(defaultSettings, {strictNullHandling: true})
    });
    console.info(settings); */
}

/**
 * Generates style overrides for contained buttons based on color.
 */
function generateContainedButtonStyles(color: string) {
	return {
		background: `linear-gradient(180deg, rgba(48,48,48,0) 63.53%, hsla(0,0%,100%,.15)), var(--mui-palette-${color}-main)`,
		boxShadow: `0rem -0.0625rem 0rem 0.0625rem var(--mui-palette-${color}-main) inset, 0rem 0rem 0rem 0.0625rem var(--mui-palette-${color}-light) inset, 0rem 0.03125rem 0rem 0.09375rem hsla(0,0%,100%,.349) inset`,
		'&:hover, &:active, &.Mui-focusVisible': {
			boxShadow: `0rem -0.0625rem 0rem 0.0625rem var(--mui-palette-${color}-main) inset, 0rem 0rem 0rem 0.0625rem var(--mui-palette-${color}-main) inset, 0rem 0.03125rem 0rem 0.09375rem hsla(0,0%,100%,.349) inset`,
			background:
				color === 'primary' || color === 'secondary'
					? `var(--mui-palette-${color}-dark)`
					: `linear-gradient(180deg, rgba(48,48,48,0) 63.53%, hsla(0,0%,100%,.15)), var(--mui-palette-${color}-dark)`
		}
	};
}

/**
 *
 * @param value rem equivalent
 * @returns rem equivalent
 */
export function spacing(value: number) {
	return `calc(var(--mui-spacing) * ${value / 0.5 / 16})`;
}

type DefaultThemeOptions = Parameters<typeof createTheme>[0];

/**
 * The defaultThemeOptions object defines the default options for the MUI theme.
 */
export const defaultThemeOptions: DefaultThemeOptions = {
	cssVariables: true,
	spacing: '0.5rem',
	typography: {
		fontFamily: ['Geist', 'Roboto', '"Helvetica"', 'Arial', 'sans-serif'].join(','),
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500
	},
	breakpoints: {
		values: {
			xs: 0, // Extra small devices
			sm: 600, // Small devices
			md: 960, // Medium devices
			lg: 1280, // Large devices
			xl: 1920 // Extra large devices
		}
	},
	shadows: [
		'none', // 0
		'0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)', // 1 (Shadcn Paper Default)
		'0 1px 4px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)', // 2
		'0 2px 4px -1px rgba(0,0,0,0.1), 0 1px 3px -1px rgba(0,0,0,0.1)', // 3
		'0 2px 5px -1px rgba(0,0,0,0.1), 0 1px 3px -1px rgba(0,0,0,0.1)', // 4
		'0 3px 5px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)', // 5 (Approaching Tailwind SM/MD mix)
		'0 3px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)', // 6
		'0 4px 6px -2px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)', // 7
		'0 4px 7px -2px rgba(0,0,0,0.11), 0 2px 5px -2px rgba(0,0,0,0.1)', // 8 (Similar to Tailwind MD)
		'0 5px 8px -2px rgba(0,0,0,0.11), 0 3px 5px -3px rgba(0,0,0,0.1)', // 9
		'0 6px 9px -3px rgba(0,0,0,0.11), 0 3px 6px -3px rgba(0,0,0,0.1)', // 10
		'0 7px 10px -3px rgba(0,0,0,0.11), 0 4px 6px -4px rgba(0,0,0,0.1)', // 11
		'0 8px 12px -3px rgba(0,0,0,0.12), 0 4px 7px -4px rgba(0,0,0,0.1)', // 12
		'0 9px 14px -4px rgba(0,0,0,0.12), 0 4px 7px -4px rgba(0,0,0,0.11)', // 13
		'0 10px 15px -4px rgba(0,0,0,0.12), 0 4px 8px -5px rgba(0,0,0,0.11)', // 14 (Similar to Tailwind LG)
		'0 11px 16px -4px rgba(0,0,0,0.12), 0 5px 8px -5px rgba(0,0,0,0.11)', // 15
		'0 12px 18px -5px rgba(0,0,0,0.13), 0 5px 9px -5px rgba(0,0,0,0.11)', // 16
		'0 14px 20px -5px rgba(0,0,0,0.13), 0 6px 10px -6px rgba(0,0,0,0.12)', // 17
		'0 16px 22px -5px rgba(0,0,0,0.13), 0 7px 11px -6px rgba(0,0,0,0.12)', // 18
		'0 18px 24px -6px rgba(0,0,0,0.14), 0 7px 12px -7px rgba(0,0,0,0.12)', // 19 (Similar to Tailwind XL)
		'0 20px 26px -6px rgba(0,0,0,0.14), 0 8px 13px -7px rgba(0,0,0,0.13)', // 20
		'0 21px 28px -7px rgba(0,0,0,0.15), 0 9px 14px -8px rgba(0,0,0,0.13)', // 21
		'0 22px 35px -8px rgba(0,0,0,0.18), 0 10px 15px -9px rgba(0,0,0,0.14)', // 22
		'0 24px 45px -10px rgba(0,0,0,0.22), 0 10px 20px -11px rgba(0,0,0,0.16)', // 23
		'0 25px 50px -12px rgba(0,0,0,0.25)' // 24 (Similar to Tailwind 2XL)
	],
	shape: {
		borderRadius: 8
	},
	components: {
		MuiSvgIcon: {
			defaultProps: {},
			styleOverrides: {
				root: {},
				fontSizeSmall: {
					fontSize: spacing(12)
				},
				fontSizeMedium: {
					fontSize: spacing(16)
				},
				fontSizeLarge: {
					fontSize: spacing(24)
				}
			}
		},
		MuiAppBar: {
			defaultProps: {
				enableColorOnDark: true,
				elevation: 0
			}
		},
		MuiToolbar: {
			styleOverrides: {
				root: {
					minHeight: spacing(48),
					'@media (min-width: 600px)': {
						minHeight: spacing(48)
					}
				},
				regular: {
					minHeight: spacing(48),
					'@media (min-width: 600px)': {
						minHeight: spacing(48)
					}
				},
				dense: {
					minHeight: spacing(40),
					'@media (min-width: 600px)': {
						minHeight: spacing(40)
					}
				}
			}
		},
		MuiChip: {
			defaultProps: {
				size: 'small'
			},
			styleOverrides: {
				root: {
					borderRadius: spacing(6),
					padding: spacing(2)
				},
				label: {
					paddingTop: 0,
					paddingBottom: 0,
					paddingRight: spacing(8),
					paddingLeft: spacing(8)
				},
				sizeSmall: {
					height: spacing(22),
					minHeight: spacing(22)
				},
				sizeMedium: {
					height: spacing(26),
					minHeight: spacing(26)
				},
				deleteIcon: {
					fontSize: spacing(16)
				}
			}
		},
		MuiAutocomplete: {
			styleOverrides: {
				inputRoot: {
					paddingTop: spacing(3),
					paddingBottom: spacing(3),
					gap: spacing(3)
				},
				root: {
					'& .MuiOutlinedInput-root .MuiAutocomplete-input': {
						padding: `${spacing(4)} ${spacing(12)}` // 4px 12px
					},
					'& .MuiOutlinedInput-root': {
						paddingLeft: spacing(4)
					}
				},
				tag: {
					margin: 0
				},
				tagSizeSmall: {
					height: spacing(20),
					minHeight: spacing(20),
					maxHeight: spacing(20)
				},
				tagSizeMedium: {
					height: spacing(24),
					minHeight: spacing(24),
					maxHeight: spacing(24)
				}
			}
		},
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true
			}
		},
		MuiIconButton: {
			defaultProps: {
				size: 'medium'
			},
			styleOverrides: {
				root: {
					borderRadius: spacing(8)
				},
				sizeMedium: {
					width: spacing(32),
					height: spacing(32),
					maxHeight: spacing(32)
				},
				sizeSmall: {
					width: spacing(28),
					height: spacing(28),
					maxHeight: spacing(28)
				},
				sizeLarge: {
					width: spacing(36),
					height: spacing(36),
					maxHeight: spacing(36)
				}
			}
		},
		MuiBadge: {
			styleOverrides: {
				root: {
					borderRadius: spacing(6),
					'& > .MuiAvatar-root': {
						fontWeight: 500 + '!important'
					}
				}
			}
		},
		MuiAvatar: {
			styleOverrides: {
				root: {
					width: spacing(36),
					height: spacing(36),
					fontSize: '0.8125rem' // 13px
				}
			}
		},
		MuiCircularProgress: {
			defaultProps: {
				size: spacing(24)
			}
		},
		MuiFab: {
			defaultProps: {},
			styleOverrides: {
				root: {
					boxShadow: 'none',
					textTransform: 'none',
					height: spacing(36)
				},
				sizeSmall: {
					height: spacing(28)
				},
				sizeMedium: {
					height: 32
				},
				circular: {
					'&.MuiFab-sizeSmall': {
						width: spacing(28),
						height: spacing(28),
						minHeight: spacing(28)
					},
					'&.MuiFab-sizeMedium': {
						width: spacing(32),
						height: spacing(32),
						minHeight: spacing(32)
					},
					'&.MuiFab-sizeLarge': {
						width: spacing(36),
						height: spacing(36),
						minHeight: spacing(36)
					}
				}
			}
		},
		MuiButton: {
			defaultProps: {
				size: 'medium',
				variant: 'text',
				color: 'primary'
			},
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 500,
					lineHeight: 1,
					transition:
						'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, padding 0.05s ease-out',
					'&.Mui-focusVisible': {
						outline: '1px solid var(--mui-palette-action-focus)',
						outlineOffset: '2px'
					}
				},
				// Size-specific padding adjustments for the active state using --mui-spacing
				sizeSmall: {
					minHeight: spacing(28), // 1.75rem 28px
					minWidth: spacing(28), // 1.75rem 28px
					padding: `${spacing(6)} ${spacing(12)}`, // 6px 12px
					'&:active': {
						paddingTop: `calc(${spacing(6)} + ${spacing(1)})`, // 0.0625rem = 1px, 0.75rem = 12px
						paddingBottom: `calc(${spacing(6)} - ${spacing(1)})` // 0.0625rem = 1px, 0.75rem = 12px
					}
				},
				sizeMedium: {
					minHeight: spacing(32), // 2rem 32px
					minWidth: spacing(32), // 2rem 32px
					padding: `${spacing(6)} ${spacing(12)}`, // 6px 12px
					'&:active': {
						paddingTop: `calc(${spacing(6)} + ${spacing(1)})`, // 0.0078125rem = 1px
						paddingBottom: `calc(${spacing(6)} - ${spacing(1)})` // 0.0078125rem = 1px
					}
				},
				sizeLarge: {
					minHeight: spacing(36), // 2.25rem 36px
					minWidth: spacing(36), // 2.25rem 36px
					padding: `${spacing(8)} ${spacing(16)}`, // 8px 16px
					'&:active': {
						paddingTop: `calc(${spacing(8)} + ${spacing(1)})`, // 0.0625rem = 1px, 1rem = 16px
						paddingBottom: `calc(${spacing(8)} - ${spacing(1)})` // 0.0625rem = 1px, 1rem = 16px
					}
				},
				containedPrimary: generateContainedButtonStyles('primary'),
				containedSecondary: generateContainedButtonStyles('secondary'),
				containedError: generateContainedButtonStyles('error'),
				containedInfo: generateContainedButtonStyles('info'),
				containedSuccess: generateContainedButtonStyles('success'),
				containedWarning: generateContainedButtonStyles('warning'),
				startIcon: {
					fontSize: spacing(16),
					'& > *:nth-of-type(1)': {
						fontSize: 'inherit'
					}
				},
				endIcon: {
					fontSize: spacing(16),
					'& > *:nth-of-type(1)': {
						fontSize: 'inherit'
					}
				}
			}
		},
		MuiButtonGroup: {
			defaultProps: {
				color: 'secondary'
			}
		},
		MuiTab: {
			styleOverrides: {
				root: {
					borderRadius: spacing(6),
					textTransform: 'none',
					minWidth: spacing(28),
					minHeight: spacing(28),
					padding: `${spacing(4)} ${spacing(12)}`, // 4px 12px
					zIndex: 1,
					'&.Mui-selected': {
						color: 'var(--mui-palette-text-primary)'
					}
				}
			}
		},
		MuiTabs: {
			styleOverrides: {
				root: {
					padding: spacing(4),
					backgroundColor: 'var(--mui-palette-FilledInput-bg)',
					borderRadius: spacing(8),
					minHeight: 'auto',
					width: 'fit-content'
				},
				indicator: {
					minHeight: '100%',
					bottom: 0,
					top: 0,
					backgroundColor: 'var(--mui-palette-background-paper)',
					zIndex: 0,
					borderRadius: spacing(6),
					boxShadow: 'none',
					border: '1px solid var(--mui-palette-divider)'
				}
			}
		},
		MuiBreadcrumbs: {
			defaultProps: {
				separator: '›'
			},
			styleOverrides: {
				separator: {
					marginRight: spacing(10),
					marginLeft: spacing(10)
				}
			}
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: spacing(8)
				}
			}
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: 'none'
				},
				rounded: {
					borderRadius: spacing(12)
				}
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: spacing(12)
				}
			}
		},
		MuiPopover: {
			styleOverrides: {
				paper: {
					borderRadius: spacing(8)
				}
			}
		},
		MuiTextField: {
			defaultProps: {
				color: 'secondary',
				size: 'medium'
			}
		},
		MuiFormControl: {
			defaultProps: {
				color: 'secondary'
			},
			styleOverrides: {
				root: {
					'& > label + .MuiInputBase-root': {
						marginTop: 0
					},
					'& > .MuiFormHelperText-root': {
						marginLeft: 0
					},
					'& > .MuiOutlinedInput-root, & > .MuiFilledInput-root': {
						'& + .MuiFormHelperText-root ': {
							marginLeft: 0
						}
					}
				}
			}
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					fontSize: '0.75rem', // 12px
					fontWeight: 500,
					lineHeight: 2
				}
			}
		},
		MuiInputLabel: {
			defaultProps: {
				color: 'secondary'
			},
			styleOverrides: {
				root: {
					transform: 'translate(0, calc(var(--mui-spacing) * 0.5)) scale(1)',
					'&.MuiInputLabel-shrink': {
						transform: 'translate(0, calc(var(--mui-spacing) / -0.8)) scale(0.8)'
					},
					'&.MuiInputLabel-outlined, &.MuiInputLabel-filled': {
						transform: 'translate(calc(var(--mui-spacing) * 1.5), calc(var(--mui-spacing) * 0.5)) scale(1)',
						'&.MuiInputLabel-shrink': {
							transform:
								'translate(calc(var(--mui-spacing) * 1.5), calc(var(--mui-spacing) / -0.8)) scale(0.8)'
						},
						'&.MuiInputLabel-sizeSmall': {
							transform:
								'translate(calc(var(--mui-spacing) * 1.5), calc(var(--mui-spacing) * 0.5)) scale(1)',
							'&.MuiInputLabel-shrink': {
								transform:
									'translate(calc(var(--mui-spacing) * 1.5), calc(var(--mui-spacing) / -0.8)) scale(0.8)'
							}
						}
					}
				}
			}
		},
		MuiSelect: {
			defaultProps: {
				color: 'secondary',
				size: 'small'
			},
			styleOverrides: {
				select: {
					minHeight: 0
				}
			}
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: {
					fontSize: '0.75rem' // 12px
				}
			}
		},
		MuiInputAdornment: {
			styleOverrides: {
				root: {
					'&:not(.MuiInputAdornment-hiddenLabel)': {}
				},
				filled: {
					lineHeight: 1
				}
			}
		},
		MuiInputBase: {
			styleOverrides: {
				root: {
					'& > textarea': {
						padding: 0
					}
				}
			}
		},
		MuiOutlinedInput: {
			defaultProps: {
				color: 'secondary'
			},
			styleOverrides: {
				root: {
					height: 'auto!important',
					minHeight: spacing(32),
					'&.MuiInputBase-sizeSmall': {
						minHeight: spacing(28)
					}
				},
				sizeSmall: {
					minHeight: spacing(28)
				},
				input: {
					padding: `${spacing(6)} ${spacing(12)}` // 6px 12px
				},
				inputSizeSmall: {
					padding: `${spacing(4)} ${spacing(12)}` // 4px 12px
				},
				multiline: {
					padding: `${spacing(6)} ${spacing(12)}` // 6px 12px
				},
				adornedStart: {
					paddingLeft: `${spacing(8)}`
				},
				inputAdornedStart: {
					paddingLeft: `${spacing(8)}`
				},
				adornedEnd: {
					paddingRight: `${spacing(8)}`
				},
				inputAdornedEnd: {
					paddingRight: `${spacing(8)}`
				}
			}
		},
		MuiFilledInput: {
			styleOverrides: {
				input: {
					padding: `${spacing(4)} ${spacing(12)}` // 4px 12px
				},
				multiline: {
					padding: `${spacing(4)} ${spacing(12)}` // 4px 12px
				},
				adornedStart: {
					paddingLeft: `${spacing(8)}`
				},
				adornedEnd: {
					paddingRight: `${spacing(8)}`
				}
			}
		},
		MuiCheckbox: {
			defaultProps: {
				color: 'secondary'
			},
			styleOverrides: {
				root: {
					borderRadius: spacing(4)
				}
			}
		},
		MuiRadio: {
			defaultProps: {
				color: 'secondary'
			},
			styleOverrides: {
				root: {
					padding: spacing(8)
				}
			}
		},
		MuiSwitch: {
			defaultProps: {
				color: 'secondary',
				size: 'small'
			},
			styleOverrides: {
				root: {
					padding: 0,
					margin: 8
				},
				sizeSmall: {
					width: spacing(28),
					height: spacing(16),
					'& .MuiSwitch-thumb': {
						width: spacing(12),
						height: spacing(12)
					},
					'& .MuiSwitch-switchBase': {
						padding: spacing(2),
						'&.Mui-checked': {
							transform: 'translateX(12px)'
						}
					},
					'& .MuiSwitch-track': {
						borderRadius: spacing(8)
					}
				},
				sizeMedium: {
					width: spacing(36),
					height: spacing(20),
					'& .MuiSwitch-thumb': {
						width: spacing(16),
						height: spacing(16)
					},
					'& .MuiSwitch-switchBase': {
						padding: spacing(2),
						'&.Mui-checked': {
							transform: `translateX(${spacing(16)})`
						}
					},
					'& .MuiSwitch-track': {
						borderRadius: spacing(10)
					}
				}
			}
		},
		MuiSlider: {
			defaultProps: {
				color: 'secondary',
				size: 'small'
			},
			styleOverrides: {
				root: {
					height: spacing(6),
					borderRadius: spacing(3)
				},
				sizeSmall: {
					height: spacing(4),
					borderRadius: spacing(2)
				},
				thumb: {
					width: spacing(16),
					height: spacing(16)
				},
				thumbSizeSmall: {
					width: spacing(12),
					height: spacing(12)
				}
			}
		},
		MuiTypography: {
			variants: []
		},
		MuiAlert: {
			styleOverrides: {
				root: {
					padding: `${spacing(12)} ${spacing(16)}`, // 12px 16px
					borderRadius: spacing(8)
				},
				icon: {
					padding: `${spacing(2)} 0`, // 2px 0
					fontSize: spacing(16)
				},
				message: {
					padding: '0'
				},
				standardSuccess: {
					border: '1px solid var(--mui-palette-success-main)',
					color: 'var(--mui-palette-success-main)'
				},
				standardInfo: {
					border: '1px solid var(--mui-palette-info-main)',
					color: 'var(--mui-palette-info-main)'
				},
				standardWarning: {
					border: '1px solid var(--mui-palette-warning-main)',
					color: 'var(--mui-palette-warning-main)'
				},
				standardError: {
					border: '1px solid var(--mui-palette-error-main)',
					color: 'var(--mui-palette-error-main)'
				}
			}
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					fontSize: '0.75rem', // 12px
					padding: `${spacing(6)} ${spacing(10)}`, // 6px 10px
					borderRadius: spacing(6)
				}
			}
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
					padding: `0 ${spacing(4)}`, // 0px 4px
					borderRadius: spacing(6)
				},
				list: {
					gap: spacing(2),
					display: 'grid'
				}
			}
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					borderRadius: spacing(4),
					padding: `${spacing(6)} ${spacing(8)}`, // 6px 8px
					'& .MuiListItemIcon-root': {
						minWidth: spacing(24),
						'& svg': {
							fontSize: spacing(16)
						}
					}
				}
			}
		},
		MuiList: {
			styleOverrides: {
				root: {
					padding: `${spacing(4)} 0` // 4px 0
				}
			}
		},
		MuiListItem: {
			styleOverrides: {
				root: {}
			}
		},
		MuiListItemText: {
			styleOverrides: {
				root: {},
				inset: {
					paddingLeft: spacing(24)
				}
			}
		},
		MuiListItemButton: {
			styleOverrides: {
				root: {
					padding: `${spacing(6)} ${spacing(8)}` // 6px 8px
				}
			}
		},
		MuiListItemAvatar: {
			styleOverrides: {
				root: {
					minWidth: spacing(44)
				}
			}
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					minWidth: spacing(24),
					'& svg': {
						fontSize: spacing(16)
					}
				}
			}
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					padding: spacing(8)
				},
				sizeSmall: {
					padding: spacing(4)
				}
			}
		},
		MuiAccordion: {
			defaultProps: {
				disableGutters: true
			},
			styleOverrides: {
				root: {
					border: '1px solid var(--mui-palette-divider)',
					minHeight: 0,
					'&:first-of-type': {
						borderBottom: 'none'
					},
					'&:before': {
						display: 'none'
					}
				}
			}
		},
		MuiStepper: {
			styleOverrides: {
				root: {
					'& .MuiStep-vertical .MuiStepContent-root, & .MuiStepConnector-vertical': {
						marginLeft: spacing(8)
					},
					'& .MuiStepConnector-horizontal': {
						top: spacing(8)
					}
				}
			}
		},
		MuiStepIcon: {
			styleOverrides: {
				text: {
					fontSize: '0.875rem' // 14px
				}
			}
		}
	}
};

/**
 * The mustHaveThemeOptions object defines the options that must be present in the MUI theme.
 */
export const mustHaveThemeOptions = {
	typography: {
		htmlFontSize: 16,
		fontSize: 13,
		body1: {
			fontSize: '0.8125rem'
		},
		body2: {
			fontSize: '0.8125rem'
		}
	}
};

/**
 * The defaultThemes object defines the default themes for the application.
 */
export const defaultThemes = {
	default: {
		palette: {
			mode: 'light'
		}
	},
	defaultDark: {
		palette: {
			mode: 'dark'
		}
	}
};

/**
 * The extendThemeWithMixins function extends the theme with mixins.
 */
export function extendThemeWithMixins(obj: ThemeOptions) {
	const theme = createTheme(obj);
	return {
		border: (width = 1) => ({
			borderWidth: width,
			borderStyle: 'solid',
			borderColor: theme.vars.palette.divider
		}),
		borderLeft: (width = 1) => ({
			borderLeftWidth: width,
			borderStyle: 'solid',
			borderColor: theme.vars.palette.divider
		}),
		borderRight: (width = 1) => ({
			borderRightWidth: width,
			borderStyle: 'solid',
			borderColor: theme.vars.palette.divider
		}),
		borderTop: (width = 1) => ({
			borderTopWidth: width,
			borderStyle: 'solid',
			borderColor: theme.vars.palette.divider
		}),
		borderBottom: (width = 1) => ({
			borderBottomWidth: width,
			borderStyle: 'solid',
			borderColor: theme.vars.palette.divider
		})
	};
}
