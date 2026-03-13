// Arka plan teması seçim bileşeni (5 renkli kart)
'use client';

import { useBackgroundTheme } from '../providers/theme-provider';
import { BACKGROUND_THEME_NAMES, type BackgroundThemeName } from '../../lib/backgroundThemes';
import { cn } from '../../lib/utils';

// Vivid representative colors for the picker icons (not the actual subtle theme colors)
const ICON_COLORS: Record<BackgroundThemeName, { top: string; bottom: string }> = {
  gray: { top: '#8E8E93', bottom: '#636366' },
  blue: { top: '#3B82F6', bottom: '#1D4ED8' },
  green: { top: '#34D399', bottom: '#059669' },
  orange: { top: '#FB923C', bottom: '#EA580C' },
  red: { top: '#F87171', bottom: '#DC2626' },
};

const THEME_LABELS: Record<BackgroundThemeName, string> = {
  gray: 'Gri',
  blue: 'Mavi',
  green: 'Yeşil',
  orange: 'Turuncu',
  red: 'Kırmızı',
};

export function BackgroundThemePicker() {
  const { backgroundTheme, setBackgroundTheme } = useBackgroundTheme();

  return (
    <div>
      <p className="mb-2 text-xs font-medium text-muted-foreground">Tema Rengi</p>
      <div className="flex items-center gap-2">
        {BACKGROUND_THEME_NAMES.map((name) => {
          const colors = ICON_COLORS[name];
          const isSelected = backgroundTheme === name;
          return (
            <button
              key={name}
              onClick={() => setBackgroundTheme(name)}
              className={cn(
                'h-6 w-6 rounded-md transition-all overflow-hidden',
                isSelected
                  ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background'
                  : 'ring-1 ring-border',
              )}
              title={THEME_LABELS[name]}
            >
              <div className="w-full h-1/2" style={{ backgroundColor: colors.top }} />
              <div className="w-full h-1/2" style={{ backgroundColor: colors.bottom }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
