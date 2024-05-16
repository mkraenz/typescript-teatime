import {
  defineStyle,
  defineStyleConfig,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const colors = {
  brightPurple: {
    900: '#33001f',
    800: '#46002c',
    700: '#5b0139',
    600: '#700147',
    500: '#860254',
    400: '#9d0362',
    300: '#b50470',
    200: '#cd047f',
    100: '#e6058d',
    50: '#ff059b',
  },
  primaryFont: {
    // lightMode: 'brightPurple.900',
    // darkMode: 'brightPurple.100',
    lightMode: 'red',
    darkMode: '#ff9ed8',
  },
  secondaryFont: {
    // lightMode: 'brightPurple.600',
    // darkMode: 'brightPurple.300',
    lightMode: 'red',
    darkMode: 'red',
  },
};

const outline = defineStyle({
  border: '0px', // change the appearance of the border
  borderRadius: '50%', // remove the border radius
});

export const buttonTheme = defineStyleConfig({
  variants: { outline },
  baseStyle: {
    color: 'primaryFont.darkMode',
    textColor: 'primaryFont.darkMode',
  },
});
export const tooltipTheme = defineStyleConfig({
  baseStyle: {
    background: mode('brightPurple.100', 'brightPurple.100'),
    color: mode('primaryFont.lightMode', 'primaryFont.darkMode'),
    fontWeight: 700,
  },
});

export const theme = extendTheme(
  {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    components: {
      Button: buttonTheme,
      variants: {
        base: {},
      },
      defaultProps: {
        variant: 'base',
      },
      Tooltip: tooltipTheme,
    },
    colors,
    styles: {
      global: (props: any) => ({
        body: {
          bg: mode('white', '#092327')(props),
          color: mode('black', 'primaryFont.darkMode')(props),
          // textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)',
          textShadow: '#000 1px 0 6px',
        },
      }),
    },
  },
  withDefaultColorScheme({ colorScheme: 'brightPurple' })
);
