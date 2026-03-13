// DashboardShell: Sidebar + Header + main content wrapper
'use client';

import { Sidebar, MobileSidebar } from './sidebar';
import { Header } from './header';
import { useStkUI } from '../../providers/stk-ui-provider';
import { cn } from '../../lib/utils';
import type { UserProfile } from '../../types';

interface DashboardShellProps {
  children: React.ReactNode;
  profile: UserProfile | null;
  onSignOut: () => void;
  siteUrl?: string | null;
}

export function DashboardShell({ children, profile, onSignOut, siteUrl }: DashboardShellProps) {
  const { sidebarCollapsed } = useStkUI();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileSidebar />
      <div className={cn(
        'flex flex-col min-h-screen transition-all duration-300',
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      )}>
        <Header profile={profile} onSignOut={onSignOut} siteUrl={siteUrl} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
