import React, { useCallback, useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Layout } from '@/components/Layout';
import { darkTheme, lightTheme } from '@/themes/themes';

const isDarkThemeKey = 'isDarkTheme';
let item = false;

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [ isDarkTheme, setIsDarkTheme ] = useState(item);

  const handleChangeTheme = useCallback(() => {
    setIsDarkTheme((isDarkTheme) => {
      if (typeof window !== 'undefined') localStorage.setItem(isDarkThemeKey, `${isDarkTheme}`);

      return !isDarkTheme;
    });
  }, []);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />

      <Layout isDarkTheme={isDarkTheme} onThemeToggle={handleChangeTheme}>
        {children}
      </Layout>
    </ThemeProvider>
  );
};