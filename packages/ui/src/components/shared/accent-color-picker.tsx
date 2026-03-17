// Vurgu rengi seçim bileşeni
'use client';

import { Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAccentColor } from '../providers/theme-provider';
import { ACCENT_COLORS, ACCENT_COLOR_NAMES, type AccentColorName } from '../../lib/accentColors';
import { cn } from '../../lib/utils';

const ACCENT_LABELS: Record<AccentColorName, string> = {
  green: 'Yeşil', blue: 'Mavi', orange: 'Turuncu', pink: 'Pembe', gray: 'Gri', dark: 'Koyu', white: 'Beyaz',
};

export function AccentColorPicker() {
  const { resolvedTheme } = useTheme();
  const { accentColor, setAccentColor } = useAccentColor();
  const isDark = resolvedTheme === 'dark';

  return (
    <div>
      <p className="mb-2 text-xs font-medium text-muted-foreground">Vurgu Rengi</p>
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {ACCENT_COLOR_NAMES.map((name: AccentColorName) => {
          const pair = ACCENT_COLORS[name];
          const dotColor = isDark ? pair.dark : pair.light;
          const isSelected = accentColor === name;
          const isLight = name === 'white' || (!isDark && name === 'gray');
          return (
            <button
              key={name}
              onClick={() => setAccentColor(name)}
              className={cn(
                'group flex flex-col items-center gap-1 rounded-lg px-2 py-1.5 transition-colors',
                isSelected
                  ? 'bg-muted'
                  : 'hover:bg-muted/50'
              )}
              title={ACCENT_LABELS[name]}
            >
              <span
                className={cn(
                  'relative flex h-8 w-8 items-center justify-center rounded-full transition-transform',
                  isSelected && 'scale-110',
                  name === 'white' && 'border border-border',
                )}
                style={{ backgroundColor: dotColor }}
              >
                {isSelected && (
                  <Check
                    className={cn(
                      'h-4 w-4',
                      isLight ? 'text-gray-800' : 'text-white',
                    )}
                    strokeWidth={3}
                  />
                )}
              </span>
              <span
                className={cn(
                  'text-[10px] font-medium leading-none',
                  isSelected
                    ? 'text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {ACCENT_LABELS[name]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
