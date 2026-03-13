// Semantic color tokens — extracted from dashboard-ui globals.css
// These tokens are the single source of truth for all platforms.

import type { BackgroundThemePalette } from './background';

export interface SemanticTokens {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarBorder: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarMuted: string;
  sidebarRing: string;
}

export const lightTokens: SemanticTokens = {
  background: '#E8E8EC',
  foreground: '#1A1A1C',
  card: '#FFFFFF',
  cardForeground: '#1A1A1C',
  popover: '#FFFFFF',
  popoverForeground: '#1A1A1C',
  primary: '#4ADE80',
  primaryForeground: '#0D0D0D',
  secondary: '#F0F0F2',
  secondaryForeground: '#1A1A1C',
  muted: '#F0F0F2',
  mutedForeground: '#6E6E73',
  accent: '#F0F0F2',
  accentForeground: '#1A1A1C',
  destructive: '#FF453A',
  destructiveForeground: '#FFFFFF',
  border: '#C7C7CC',
  input: '#C7C7CC',
  ring: '#4ADE80',
  sidebar: '#E8E8EC',
  sidebarForeground: '#1A1A1C',
  sidebarPrimary: '#4ADE80',
  sidebarPrimaryForeground: '#0D0D0D',
  sidebarBorder: '#C7C7CC',
  sidebarAccent: '#F0F0F2',
  sidebarAccentForeground: '#1A1A1C',
  sidebarMuted: '#6E6E73',
  sidebarRing: '#4ADE80',
};

export const darkTokens: SemanticTokens = {
  background: '#0D0D0D',
  foreground: '#FBFBFB',
  card: '#1C1C1E',
  cardForeground: '#FBFBFB',
  popover: '#1C1C1E',
  popoverForeground: '#FBFBFB',
  primary: '#4ADE80',
  primaryForeground: '#0D0D0D',
  secondary: '#232325',
  secondaryForeground: '#FBFBFB',
  muted: '#1C1C1E',
  mutedForeground: '#A3A3A3',
  accent: '#232325',
  accentForeground: '#FBFBFB',
  destructive: '#FF453A',
  destructiveForeground: '#FBFBFB',
  border: '#2C2C2E',
  input: '#2C2C2E',
  ring: '#4ADE80',
  sidebar: '#0D0D0D',
  sidebarForeground: '#FBFBFB',
  sidebarPrimary: '#4ADE80',
  sidebarPrimaryForeground: '#0D0D0D',
  sidebarBorder: '#2C2C2E',
  sidebarAccent: '#1C1C1E',
  sidebarAccentForeground: '#FBFBFB',
  sidebarMuted: '#A3A3A3',
  sidebarRing: '#4ADE80',
};

/**
 * Applies a background theme palette to semantic tokens.
 * Maps theme surface colors to all relevant token slots.
 */
export function applyBackgroundTheme(
  base: SemanticTokens,
  palette: BackgroundThemePalette,
): SemanticTokens {
  return {
    ...base,
    background: palette.background,
    card: palette.card,
    popover: palette.card,
    secondary: palette.secondary,
    muted: palette.card,
    mutedForeground: palette.mutedForeground,
    accent: palette.secondary,
    border: palette.border,
    input: palette.border,
    sidebar: palette.background,
    sidebarBorder: palette.border,
    sidebarAccent: palette.card,
    sidebarMuted: palette.mutedForeground,
  };
}
