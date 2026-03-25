// DashboardShell: Sidebar/Topbar + Header + main content wrapper
'use client';

import { Sidebar, MobileSidebar } from './sidebar';
import { TopNavbar } from './top-navbar';
import { Header } from './header';
import { useStkUI } from '../../providers/stk-ui-provider';
import { useMenuLayout } from '../providers/theme-provider';
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
  const { menuLayout } = useMenuLayout();

  const isTopbar = menuLayout === 'topbar';

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar — sadece sidebar modunda göster */}
      {!isTopbar && <Sidebar />}
      {/* Mobilde her iki modda da sheet sidebar */}
      <MobileSidebar />
      <div className={cn(
        'flex flex-col min-h-screen transition-all duration-300',
        !isTopbar && (sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64')
      )}>
        <Header profile={profile} onSignOut={onSignOut} siteUrl={siteUrl} isTopbar={isTopbar} />
        {/* Topbar modunda yatay navigasyon */}
        {isTopbar && <TopNavbar />}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
