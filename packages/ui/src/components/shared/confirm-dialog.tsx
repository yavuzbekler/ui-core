// Silme/onay diyaloğu bileşeni
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

// Note: We use a simple dialog since AlertDialog may not be in shadcn yet.
// Using Dialog as fallback pattern:
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  variant?: 'default' | 'destructive';
  loading?: boolean;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Onayla',
  cancelLabel = 'İptal',
  onConfirm,
  variant = 'destructive',
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {cancelLabel && (
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              {cancelLabel}
            </Button>
          )}
          <Button variant={variant} onClick={onConfirm} disabled={loading}>
            {loading ? 'İşleniyor...' : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
