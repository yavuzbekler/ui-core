// Stil seçim bileşeni (3 radius × 2 border/shadow = 6 preset, 3×2 grid)
'use client';

import { useStylePreset } from '../providers/theme-provider';
import { STYLE_PRESET_NAMES, type StylePresetName } from '../../lib/stylePresets';
import { cn } from '../../lib/utils';

const PRESET_LABELS: Record<StylePresetName, string> = {
  sharp: 'Köşeli',
  'sharp-bold': 'Köşeli Kalın',
  default: 'Normal',
  'default-bold': 'Normal Kalın',
  round: 'Yuvarlak',
  'round-bold': 'Yuvarlak Kalın',
  neobrutalism: 'Neobrutalism',
};

// Mini preview card radius values for icons
const PREVIEW_RADIUS: Record<StylePresetName, string> = {
  sharp: '0px',
  'sharp-bold': '0px',
  default: '4px',
  'default-bold': '4px',
  round: '8px',
  'round-bold': '8px',
  neobrutalism: '3px',
};

const IS_BOLD: Record<StylePresetName, boolean> = {
  sharp: false,
  'sharp-bold': true,
  default: false,
  'default-bold': true,
  round: false,
  'round-bold': true,
  neobrutalism: true,
};

const IS_NEOBRUTALISM: Record<StylePresetName, boolean> = {
  sharp: false,
  'sharp-bold': false,
  default: false,
  'default-bold': false,
  round: false,
  'round-bold': false,
  neobrutalism: true,
};

export function StylePicker() {
  const { stylePreset, setStylePreset } = useStylePreset();

  return (
    <div>
      <p className="mb-2 text-xs font-medium text-muted-foreground">Stil</p>
      <div className="grid grid-cols-7 gap-1.5">
        {STYLE_PRESET_NAMES.map((name) => {
          const isSelected = stylePreset === name;
          const bold = IS_BOLD[name];
          const neo = IS_NEOBRUTALISM[name];
          const radius = PREVIEW_RADIUS[name];
          return (
            <button
              key={name}
              onClick={() => setStylePreset(name)}
              className={cn(
                'flex items-center justify-center h-8 w-full rounded-md transition-all',
                isSelected
                  ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background'
                  : 'ring-1 ring-border hover:ring-foreground/30',
              )}
              title={PRESET_LABELS[name]}
            >
              {/* Mini card preview */}
              <div
                className="w-5 h-5 bg-muted-foreground/20"
                style={{
                  borderRadius: radius,
                  borderWidth: bold ? '2px' : '1px',
                  borderStyle: 'solid',
                  borderColor: 'currentColor',
                  boxShadow: neo
                    ? '2px 2px 0px currentColor'
                    : bold
                      ? '1px 2px 4px rgba(0,0,0,0.3)'
                      : 'none',
                  opacity: 0.7,
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
