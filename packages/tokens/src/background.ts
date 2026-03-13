// Background theme definitions for dynamic theme system
// Each theme provides tinted surface colors for both light and dark modes.
// Selection flow: 1) Light/Dark  2) Background Theme  3) Accent Color

export type BackgroundThemeName = 'gray' | 'blue' | 'green' | 'orange' | 'red';

export interface BackgroundThemePalette {
  /** Deepest layer — page background, sidebar background */
  background: string;
  /** Elevated surface — cards, popovers, muted areas */
  card: string;
  /** Slightly elevated from card — secondary surfaces, accent areas */
  secondary: string;
  /** Separators, input borders */
  border: string;
  /** Subdued text on this theme */
  mutedForeground: string;
}

export interface BackgroundTheme {
  dark: BackgroundThemePalette;
  light: BackgroundThemePalette;
}

export const BACKGROUND_THEMES: Record<BackgroundThemeName, BackgroundTheme> = {
  gray: {
    dark: {
      background: '#0D0D0D',
      card: '#1C1C1E',
      secondary: '#232325',
      border: '#2C2C2E',
      mutedForeground: '#A3A3A3',
    },
    light: {
      background: '#E8E8EC',
      card: '#FFFFFF',
      secondary: '#F0F0F2',
      border: '#C7C7CC',
      mutedForeground: '#6E6E73',
    },
  },

  blue: {
    dark: {
      background: '#0B1018',
      card: '#151D2C',
      secondary: '#1C2536',
      border: '#263248',
      mutedForeground: '#8B9FB8',
    },
    light: {
      background: '#E0E5F0',
      card: '#F5F7FC',
      secondary: '#E8ECF5',
      border: '#B5BFD6',
      mutedForeground: '#5A6578',
    },
  },

  green: {
    dark: {
      background: '#0B140F',
      card: '#152119',
      secondary: '#1C2B22',
      border: '#263D2F',
      mutedForeground: '#8BB8A0',
    },
    light: {
      background: '#DFF0E5',
      card: '#F3FBF5',
      secondary: '#E6F5EB',
      border: '#ADD6B8',
      mutedForeground: '#5A7364',
    },
  },

  orange: {
    dark: {
      background: '#140F0B',
      card: '#211A13',
      secondary: '#2B221A',
      border: '#3D3026',
      mutedForeground: '#B8A08B',
    },
    light: {
      background: '#F0E5DF',
      card: '#FCF7F3',
      secondary: '#F5EDE6',
      border: '#D6BFA8',
      mutedForeground: '#78655A',
    },
  },

  red: {
    dark: {
      background: '#140B0C',
      card: '#211315',
      secondary: '#2B1A1D',
      border: '#3D2629',
      mutedForeground: '#B88B90',
    },
    light: {
      background: '#F0DFDF',
      card: '#FCF3F3',
      secondary: '#F5E6E6',
      border: '#D6ADAD',
      mutedForeground: '#785A5C',
    },
  },
};

export const BACKGROUND_THEME_NAMES: BackgroundThemeName[] = ['gray', 'blue', 'green', 'orange', 'red'];
export const DEFAULT_BACKGROUND_THEME: BackgroundThemeName = 'gray';
