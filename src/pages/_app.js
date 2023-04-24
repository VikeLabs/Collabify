import React from 'react';
import Head from 'next/head.js';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SessionProvider } from "next-auth/react"
import { GlobalStyle } from '../styles/global.js';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'tippy.js/dist/tippy.css';
import 'styles/globals.css';
import { BugReport } from 'components/common';
import { theme } from 'styles/muiglobals';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <CssBaseline />
        <GlobalStyle />
        <Head>
          <title>Collabify</title>
          <meta
            name='description'
            content='Collabify makes coordinating times easier'
          />
        </Head>
        <Component {...pageProps} />
        <BugReport />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
