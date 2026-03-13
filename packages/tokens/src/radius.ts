// Style preset tokens: radius + border weight + shadow combinations
// 3 radius levels × 2 border/shadow styles = 6 presets

export type StylePresetName =
  | 'sharp'        // No radius, normal border
  | 'sharp-bold'   // No radius, thick border + heavy shadow
  | 'default'      // Medium radius, normal border
  | 'default-bold' // Medium radius, thick border + heavy shadow
  | 'round'        // Large radius, normal border
  | 'round-bold'   // Large radius, thick border + heavy shadow
  | 'neobrutalism'; // No radius, thick border + hard offset shadow

export interface StylePreset {
  radius: string;
  borderWidth: string;
  shadow: string;
  /** Override border/shadow color per mode (for neobrutalism etc.) */
  borderColorLight?: string;
  borderColorDark?: string;
  shadowLight?: string;
  shadowDark?: string;
}

export const STYLE_PRESETS: Record<StylePresetName, StylePreset> = {
  sharp: {
    radius: '0rem',
    borderWidth: '1px',
    shadow: 'none',
  },
  'sharp-bold': {
    radius: '0rem',
    borderWidth: '2px',
    shadow: '0 8px 32px -4px rgba(0,0,0,0.3)',
  },
  default: {
    radius: '0.75rem',
    borderWidth: '1px',
    shadow: 'none',
  },
  'default-bold': {
    radius: '0.75rem',
    borderWidth: '2px',
    shadow: '0 8px 32px -4px rgba(0,0,0,0.3)',
  },
  round: {
    radius: '1.25rem',
    borderWidth: '1px',
    shadow: 'none',
  },
  'round-bold': {
    radius: '1.25rem',
    borderWidth: '2px',
    shadow: '0 8px 32px -4px rgba(0,0,0,0.3)',
  },
  neobrutalism: {
    radius: '0rem',
    borderWidth: '2px',
    shadow: '4px 4px 0 0 #262626',
    borderColorLight: '#262626',
    borderColorDark: 'rgba(255,255,255,0.25)',
    shadowLight: '4px 4px 0 0 #262626',
    shadowDark: '4px 4px 0 0 #E8E8EC',
  },
};

export const STYLE_PRESET_NAMES: StylePresetName[] = [
  'sharp', 'sharp-bold',
  'default', 'default-bold',
  'round', 'round-bold',
  'neobrutalism',
];

export const DEFAULT_STYLE_PRESET: StylePresetName = 'default';

// Backward compat
export type RadiusPreset = 'rounded' | 'sharp';
export const RADIUS_PRESETS: Record<RadiusPreset, string> = {
  rounded: '0.75rem',
  sharp: '0.25rem',
};
export const DEFAULT_RADIUS: RadiusPreset = 'rounded';
