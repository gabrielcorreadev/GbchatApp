import { extendTheme } from 'native-base';

export const theme = extendTheme({
    components: {
      Button: {
        variants: {
          rounded: ({ colorScheme }: any) => {
            return {
              bg: `${colorScheme}.900`,
              rounded: 'full',
              colorScheme:'rose'
            };
          },
        },
        defaultProps: {
          colorScheme: 'primary',
        },
      },
    },
    colors: {
      // Add new color
      primary: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        300: '#6ee7b7',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
        800: '#065f46',
        900: '#064e3b',
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#fb7185',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      useSystemColorMode: true,
      initialColorMode: 'light',
    },
  });