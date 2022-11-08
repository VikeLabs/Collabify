export const getColorPalette = (mode) => ({
  palette: {
    ...(mode === 'default' && {
      primary: {
        main: '#4B4A67',
      },
      secondary: {
        main: '#f78c14',
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
    }),
    ...(mode === 'blue&yellow' && {
      primary: {
        main: '#14185c',
      },
      secondary: {
        main: '#f2b830',
        light: '#e8da3a',
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
    }),
  },
});
