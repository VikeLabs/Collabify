import { CssBaseline } from '@mui/material';
import { GlobalStyle } from '../styles/global.js';
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp;
