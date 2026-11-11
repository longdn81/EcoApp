export const colors = {
  primary: '#0F4A3C',
  accent: '#10B981',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  text: '#0F172A',
  textMuted: '#475569',
  white: '#FFFFFF',
  black: '#0F172A',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  shadow: '#0F172A',
} as const;

export type ColorToken = keyof typeof colors;
