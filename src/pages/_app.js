import React from 'react';
import Head from 'next/head.js';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { GlobalStyle } from '../styles/global.js';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'tippy.js/dist/tippy.css';
import 'styles/globals.css';
import { BugReport } from 'components/BugReport/BugReport';
import { theme } from 'styles/muiglobals';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Head>
        <title>Collabify</title>
        <meta
          property='og:title'
          content='Collabify'
          key='title'
        />
      </Head>
      <Component {...pageProps} />
      <BugReport />
    </ThemeProvider>
  );
}

export default MyApp;
