import { createTheme } from '@mui/material/styles';
import { getColorPalette } from 'styles/theme';
import { THEME_STORED } from 'constants/index.js';

// Gets theme from local storage (personalized theme for the site)
const themeInStorage =
  typeof window !== 'undefined' ? localStorage.getItem(THEME_STORED) : null;

const palette = getColorPalette(themeInStorage ?? 'default');

const theme = createTheme({
  ...palette,
});

export { theme };
