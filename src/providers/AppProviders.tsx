import React from 'react';
import { useColorScheme } from 'react-native';
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
  PaperProvider,
} from 'react-native-paper';
import { TamaguiProvider } from 'tamagui';

import { queryClient } from '@/services/queryClient';
import { useAppStore } from '@/stores/useAppStore';
import { tamaguiConfig } from '../../tamagui.config';

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const systemColorScheme = useColorScheme();
  const themePreference = useAppStore((state) => state.themePreference);

  // Compute active theme based on preference and system settings
  const isDark =
    themePreference === 'dark' ||
    (themePreference === 'system' && systemColorScheme === 'dark');

  const paperTheme = isDark ? PaperDarkTheme : PaperLightTheme;
  const navTheme = isDark ? NavDarkTheme : NavLightTheme;
  const tamaguiTheme = isDark ? 'dark' : 'light';

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={tamaguiTheme}>
        <PaperProvider theme={paperTheme}>
          <NavigationThemeProvider value={navTheme}>
            {children}
          </NavigationThemeProvider>
        </PaperProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
