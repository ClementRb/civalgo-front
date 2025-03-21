'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: { light: true },
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;
