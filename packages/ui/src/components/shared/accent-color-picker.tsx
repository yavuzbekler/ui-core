// Vurgu rengi seçim bileşeni (5 renk dot)
'use client';

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
      <div className="flex items-center gap-2">
        {ACCENT_COLOR_NAMES.map((name) => {
          const pair = ACCENT_COLORS[name];
          const dotColor = isDark ? pair.dark : pair.light;
          const isSelected = accentColor === name;
          return (
            <button
              key={name}
              onClick={() => setAccentColor(name)}
              className={cn(
                'h-6 w-6 rounded-full transition-all',
                isSelected && 'ring-2 ring-foreground ring-offset-2 ring-offset-background',
                name === 'white' && 'border border-border'
              )}
              style={{ backgroundColor: dotColor }}
              title={ACCENT_LABELS[name]}
            />
          );
        })}
      </div>
    </div>
  );
}
