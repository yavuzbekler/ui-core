// Menü konumu seçim bileşeni (Sol / Üst)
'use client';

import { PanelLeft, PanelTop } from 'lucide-react';
import { useMenuLayout, type MenuLayoutName } from '../providers/theme-provider';
import { cn } from '../../lib/utils';

const options: { value: MenuLayoutName; icon: typeof PanelLeft; label: string }[] = [
  { value: 'sidebar', icon: PanelLeft, label: 'Sol' },
  { value: 'topbar', icon: PanelTop, label: 'Üst' },
];

export function MenuLayoutPicker() {
  const { menuLayout, setMenuLayout } = useMenuLayout();

  return (
    <div>
      <p className="mb-2 text-xs font-medium text-muted-foreground">Menü Konumu</p>
      <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary p-1">
        {options.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setMenuLayout(value)}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
              menuLayout === value
                ? 'bg-background text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
            title={label}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
