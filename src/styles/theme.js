import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4B4A67',
    },
    secondary: {
      main: '#219EBC',
      light: '#8ECAE6',
    },
    tertiary: {
      main: '#FB8500',
      light: '#FFB703',
    },
    background: {
      main: '#2D5ABC',
      light: '#D6ECF6',
      dark: '#2753B8',
    },
    availability: {
      darkest: '#228b22',
      dark: '#48B613',
      main: '#54D93B',
      light: '#77dd77',
      lightest: '#aef5ae',
      none: '#cfd8dc',
    },
  },
});
