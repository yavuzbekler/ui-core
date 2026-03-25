// Header: breadcrumb + kullanıcı menüsü + bildirimler
'use client';

import Link from 'next/link';
import { Menu, Bell, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import { useStkUI } from '../../providers/stk-ui-provider';
import { Breadcrumb } from './breadcrumb';
import { UserNav } from './user-nav';
import { Logo } from '../shared/logo';
import type { UserProfile } from '../../types';

interface HeaderProps {
  profile: UserProfile | null;
  onSignOut: () => void;
  siteUrl?: string | null;
  isTopbar?: boolean;
}

export function Header({ profile, onSignOut, siteUrl, isTopbar }: HeaderProps) {
  const { toggleSidebar, homePath } = useStkUI();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      {/* Mobilde hamburger menü (her iki modda) */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Menü</span>
      </Button>

      {/* Topbar modunda logo header'da gösterilir */}
      {isTopbar && (
        <Link href={homePath || '/dashboard'} className="hidden lg:flex items-center shrink-0">
          <Logo />
        </Link>
      )}

      <Breadcrumb />

      <div className="ml-auto flex items-center gap-2">
        {siteUrl && (
          <Button variant="ghost" size="icon" className="h-9 w-9" title="Siteyi Görüntüle" asChild>
            <a href={siteUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Siteyi Görüntüle</span>
            </a>
          </Button>
        )}
        <Button variant="ghost" size="icon" className="h-9 w-9" title="Bildirimler">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Bildirimler</span>
        </Button>
        <UserNav profile={profile} onSignOut={onSignOut} />
      </div>
    </header>
  );
}
