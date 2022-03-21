import { CustomThemeOptions } from 'theme';

export function getComponentStylesOverrides(themeOptions: CustomThemeOptions) {
  const backgroundColor = themeOptions.colors.grey50;

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '4px',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: `${themeOptions.customization.borderRadius}px`,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: themeOptions.colors?.textDark,
          padding: '24px',
        },
        title: {
          fontSize: '1.125rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: themeOptions.darkTextPrimary,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: themeOptions.menuSelected,
            backgroundColor: themeOptions.menuSelectedBack,
            '&:hover': {
              backgroundColor: themeOptions.menuSelectedBack,
            },
            '& .MuiListItemIcon-root': {
              color: themeOptions.menuSelected,
            },
          },
          '&:hover': {
            backgroundColor: themeOptions.menuSelectedBack,
            color: themeOptions.menuSelected,
            '& .MuiListItemIcon-root': {
              color: themeOptions.menuSelected,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: themeOptions.darkTextPrimary,
          minWidth: '36px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: themeOptions.textDark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: themeOptions.textDark,
          '&::placeholder': {
            color: themeOptions.darkTextSecondary,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: backgroundColor,
          borderRadius: `${themeOptions.customization.borderRadius}px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: themeOptions.colors?.grey400,
          },
          '&:hover $notchedOutline': {
            borderColor: themeOptions.colors?.primaryLight,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: backgroundColor,
          padding: '15.5px 14px',
          borderRadius: `${themeOptions.customization.borderRadius}px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `${themeOptions.customization.borderRadius}px`,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: themeOptions.colors?.grey300,
          },
        },
        mark: {
          backgroundColor: themeOptions.paper,
          width: '4px',
        },
        valueLabel: {
          color: themeOptions.colors?.primaryLight,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: themeOptions.divider,
          opacity: 1,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: themeOptions.colors?.primaryDark,
          background: themeOptions.colors?.primary200,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: themeOptions.paper,
          background: themeOptions.colors?.grey700,
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        columnSeparator: {
          visibility: 'hidden',
        },
      },
    },
  };
}
