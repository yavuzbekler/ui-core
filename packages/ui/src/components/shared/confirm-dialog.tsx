// Inline onay diyaloğu — butonun altında veya üstünde açılır
'use client';

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface ConfirmDialogProps {
  /** Tetikleyici buton (children) */
  children: ReactNode;
  /** Onay başlığı */
  title: string;
  /** Açıklama metni */
  description: string;
  /** Onay butonu etiketi */
  confirmLabel?: string;
  /** İptal butonu etiketi */
  cancelLabel?: string;
  /** Onaylandığında çağrılır */
  onConfirm: () => void;
  /** Buton stili */
  variant?: 'default' | 'destructive';
  /** Yükleniyor durumu */
  loading?: boolean;
  /** Dışarıdan kontrol */
  open?: boolean;
  /** Dışarıdan kontrol */
  onOpenChange?: (open: boolean) => void;
}

export function ConfirmDialog({
  children,
  title,
  description,
  confirmLabel = 'Onayla',
  cancelLabel = 'İptal',
  onConfirm,
  variant = 'destructive',
  loading = false,
  open: controlledOpen,
  onOpenChange,
}: ConfirmDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      if (onOpenChange) onOpenChange(value);
      else setInternalOpen(value);
    },
    [onOpenChange],
  );

  // Viewport'taki konuma göre yön belirle
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Altta yeterli alan yoksa yukarı aç
    setDirection(spaceBelow < 200 && spaceAbove > spaceBelow ? 'up' : 'down');
  }, [isOpen]);

  // Dışarı tıklanınca kapat
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, setOpen]);

  const handleConfirm = () => {
    onConfirm();
    if (!loading) setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={() => !isOpen && setOpen(true)}>{children}</div>

      {isOpen && (
        <div
          ref={panelRef}
          className={cn(
            'absolute left-0 z-50 w-72 rounded-lg border bg-card p-4 shadow-lg',
            'animate-in fade-in-0 zoom-in-95 duration-200',
            direction === 'up'
              ? 'bottom-full mb-2 slide-in-from-bottom-2'
              : 'top-full mt-2 slide-in-from-top-2',
          )}
        >
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          <div className="mt-3 flex gap-2 justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              {cancelLabel}
            </Button>
            <Button
              size="sm"
              variant={variant}
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? 'İşleniyor...' : confirmLabel}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
