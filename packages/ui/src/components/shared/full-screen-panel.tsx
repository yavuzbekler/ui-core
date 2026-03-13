// Tam ekran düzenleme/detay paneli — sidebar hariç tüm alanı kaplar
'use client';

import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStkUI } from '../../providers/stk-ui-provider';

interface FullScreenPanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  /** Header sağ tarafına ekstra aksiyonlar */
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function FullScreenPanel({ open, onClose, title, description, actions, children }: FullScreenPanelProps) {
  const { sidebarCollapsed } = useStkUI();

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
    <div
      className={cn(
        'fixed inset-0 top-16 z-50 flex flex-col bg-background animate-fade-in',
        sidebarCollapsed ? 'lg:left-16' : 'lg:left-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {actions}
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {children}
      </div>
    </div>,
    document.body
  );
}
