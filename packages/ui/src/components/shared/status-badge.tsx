// Renkli durum etiketi
'use client';

import { cn } from '../../lib/utils';
import { STATUS_COLORS, STATUS_BORDER_COLORS } from '../../lib/constants';
import { Badge } from '../ui/badge';
import { useTheme } from 'next-themes';

interface StatusBadgeProps {
  status: string;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const borderColor = isDark ? STATUS_BORDER_COLORS[status] : undefined;

  return (
    <Badge
      variant="outline"
      className={cn('font-medium py-1', STATUS_COLORS[status])}
      style={borderColor ? { borderColor } : undefined}
    >
      {label ?? status}
    </Badge>
  );
}
