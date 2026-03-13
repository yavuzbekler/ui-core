// Light / Dark / System tema geçiş bileşeni
'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

const options = [
  { value: 'light', icon: Sun, label: 'Açık' },
  { value: 'dark', icon: Moon, label: 'Koyu' },
  { value: 'system', icon: Monitor, label: 'Sistem' },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary p-1">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
            theme === value
              ? 'bg-background text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
          title={label}
        >
          <Icon className="h-3.5 w-3.5" />
        </button>
      ))}
    </div>
  );
}
