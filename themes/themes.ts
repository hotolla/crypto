import { createTheme, Theme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000080'
    },
    secondary: {
      main: '#ffb300'
    },
    info: {
      main: '#8ee2f1'
    },
    error: {
      main: '#ec4343'
    },
    success: {
      main: '#2b6e22'
    },
    background: {
      default: '#FFFFFF'
    }
  },
  typography: {
    caption: {
      fontFamily: 'Lato',
      lineHeight: 1.92
    },
    fontWeightLight: 100,
    h1: {
      fontFamily: 'Lora',
      lineHeight: 1.15
    },
    h2: {
      fontFamily: 'Lato'
    },
    button: {
      fontWeight: 600
    }
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f5f0e8'
    },
    secondary: {
      main: '#ffb300'
    },
    info: {
      main: '#8ee2f1'
    },
    error: {
      main: '#ec4343'
    },
    success: {
      main: '#affdb1'
    },
    background: {
      default: '#181A20'
    }
  }
});