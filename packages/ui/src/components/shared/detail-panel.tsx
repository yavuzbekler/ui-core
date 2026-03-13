// Sağdan açılan salt okunur detay paneli (440px)
'use client';

import { useEffect, useCallback } from 'react';
import { X, Pencil, Trash2 } from 'lucide-react';

interface DetailPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  onEdit?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

export function DetailPanel({ open, onClose, title, onEdit, onDelete, children }: DetailPanelProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 top-16 z-40 lg:left-64" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-16 z-50 flex h-[calc(100vh-64px)] w-[440px] flex-col border-l border-border bg-background shadow-2xl animate-slide-in-right">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold text-foreground truncate pr-2">{title}</h2>
          <div className="flex items-center gap-1">
            {onEdit && (
              <button onClick={onEdit} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                <Pencil className="h-4 w-4" />
              </button>
            )}
            {onDelete && (
              <button onClick={onDelete} className="flex h-8 w-8 items-center justify-center rounded-lg text-destructive/70 transition-colors hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </>
  );
}
