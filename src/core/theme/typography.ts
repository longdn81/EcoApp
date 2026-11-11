import type { TextStyle } from 'react-native';

export const typography = {
  h1: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '700' as const,
    letterSpacing: -1.2,
  },
  h2: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
    letterSpacing: -0.8,
  },
  subhead: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.2,
  },
} as const satisfies Record<string, TextStyle>;

export type TypographyVariant = keyof typeof typography;
