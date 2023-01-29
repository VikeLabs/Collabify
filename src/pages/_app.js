import React from 'react';
import Head from 'next/head.js';
import { Analytics } from '@vercel/analytics/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { GlobalStyle } from '../styles/global.js';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'tippy.js/dist/tippy.css';
import 'styles/globals.css';
import { BugReport } from 'components/common';
import { theme } from 'styles/muiglobals';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyle />
      <Analytics />
      <Head>
        <title>Collabify</title>
        <meta
          name='description'
          content='Collabify makes coordinating times easier'
        />
      </Head>
      <Component {...pageProps} />
      <BugReport />
    </ThemeProvider>
  );
}

export default MyApp;
