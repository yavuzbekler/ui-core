// StkUI konfigürasyon context + sidebar state yönetimi
'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { StkUIConfig } from '../types';

// --- Sidebar state (Zustand yerine context ile) ---
interface SidebarState {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
}

const StkUIContext = createContext<(StkUIConfig & SidebarState) | null>(null);

export function StkUIProvider({
  config,
  persistKey = 'stk-ui-preferences',
  children,
}: {
  config: StkUIConfig;
  persistKey?: string;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // localStorage'dan collapsed state'i oku
  useEffect(() => {
    try {
      const saved = localStorage.getItem(persistKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.state?.sidebarCollapsed !== undefined) {
          setSidebarCollapsed(parsed.state.sidebarCollapsed);
        }
      }
    } catch {}
    setMounted(true);
  }, [persistKey]);

  // Collapsed state değişince kaydet
  useEffect(() => {
    if (!mounted) return;
    try {
      const saved = localStorage.getItem(persistKey);
      const existing = saved ? JSON.parse(saved) : { state: {} };
      existing.state = { ...existing.state, sidebarCollapsed };
      localStorage.setItem(persistKey, JSON.stringify(existing));
    } catch {}
  }, [sidebarCollapsed, mounted, persistKey]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const toggleSidebarCollapsed = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const handleSetSidebarOpen = useCallback((open: boolean) => {
    setSidebarOpen(open);
  }, []);

  const value = {
    ...config,
    sidebarOpen,
    sidebarCollapsed,
    toggleSidebar,
    setSidebarOpen: handleSetSidebarOpen,
    toggleSidebarCollapsed,
  };

  return (
    <StkUIContext.Provider value={value}>
      {children}
    </StkUIContext.Provider>
  );
}

export function useStkUI() {
  const ctx = useContext(StkUIContext);
  if (!ctx) throw new Error('useStkUI must be used within StkUIProvider');
  return ctx;
}
