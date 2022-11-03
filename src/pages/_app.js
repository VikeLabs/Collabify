import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { GlobalStyle } from '../styles/global.js';
import { getColorPalette } from '../styles/theme';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'styles/globals.css';
import 'styles/fullCalendar/fullCalendar.css';
import { THEME_STORED } from 'constants/index.js';

function MyApp({ Component, pageProps }) {
  // Gets theme from local storage (personalized theme for the site)
  const themeInStorage =
    typeof window !== 'undefined' ? localStorage.getItem(THEME_STORED) : null;
  const theme = createTheme(getColorPalette(themeInStorage ?? 'default'));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
