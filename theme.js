import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    ...baseTheme.colors, // Ensure all default colors are included
    purple: {
      500: '#805AD5', // Custom purple color
      // Add other shades if needed
    },
    // Add or override other colors as needed
  },
  // Add other theme customizations if needed
});

export default theme;