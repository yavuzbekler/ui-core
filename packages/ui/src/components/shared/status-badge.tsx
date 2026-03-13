// Renkli durum etiketi
import { cn } from '../../lib/utils';
import { STATUS_COLORS } from '../../lib/constants';
import { Badge } from '../ui/badge';

interface StatusBadgeProps {
  status: string;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <Badge variant="secondary" className={cn('font-medium', STATUS_COLORS[status])}>
      {label ?? status}
    </Badge>
  );
}
