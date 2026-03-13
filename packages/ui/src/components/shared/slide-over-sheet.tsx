// Sağdan açılan form paneli (değişken genişlik, portal)
'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

type SheetSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

const sizeClasses: Record<SheetSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-none',
};

interface SlideOverSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: SheetSize;
  children: React.ReactNode;
}

export function SlideOverSheet({ open, onClose, title, description, size = 'md', children }: SlideOverSheetProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 top-16 z-50 lg:left-64">
      <div className="absolute inset-0 bg-black/60 animate-fade-in" onClick={onClose} />
      <div className={cn(
        'absolute right-0 top-0 h-full w-full bg-background border-l border-border shadow-2xl',
        'flex flex-col animate-slide-in-right',
        sizeClasses[size]
      )}>
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}
