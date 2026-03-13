// Accent color definitions for dynamic theme system
// Source: dashboard-ui/src/lib/accentColors.ts

export type AccentColorName = 'green' | 'blue' | 'orange' | 'pink' | 'gray' | 'dark' | 'white';

export type AccentColorPair = {
  dark: string;
  light: string;
  fgOnAccentDark: string;
  fgOnAccentLight: string;
};

export const ACCENT_COLORS: Record<AccentColorName, AccentColorPair> = {
  green: {
    dark: '#4ADE80', light: '#4ADE80',
    fgOnAccentDark: '#0D0D0D', fgOnAccentLight: '#0D0D0D',
  },
  blue: {
    dark: '#0A81FF', light: '#0A81FF',
    fgOnAccentDark: '#FFFFFF', fgOnAccentLight: '#FFFFFF',
  },
  orange: {
    dark: '#F97316', light: '#F97316',
    fgOnAccentDark: '#FFFFFF', fgOnAccentLight: '#FFFFFF',
  },
  pink: {
    dark: '#FF385D', light: '#FF385D',
    fgOnAccentDark: '#FFFFFF', fgOnAccentLight: '#FFFFFF',
  },
  gray: {
    dark: '#8D8D91', light: '#8D8D91',
    fgOnAccentDark: '#0D0D0D', fgOnAccentLight: '#FFFFFF',
  },
  dark: {
    dark: '#1C1C1E', light: '#1C1C1E',
    fgOnAccentDark: '#FFFFFF', fgOnAccentLight: '#FFFFFF',
  },
  white: {
    dark: '#FFFFFF', light: '#FFFFFF',
    fgOnAccentDark: '#1C1C1E', fgOnAccentLight: '#1C1C1E',
  },
};

export const ACCENT_COLOR_NAMES: AccentColorName[] = ['green', 'blue', 'orange', 'pink', 'gray', 'dark', 'white'];
export const DEFAULT_ACCENT: AccentColorName = 'green';
