// UserNav: profile ve onSignOut prop olarak al, extra menü itemları context'ten
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, User, Palette, ChevronDown, ChevronRight } from 'lucide-react';
import { getInitials } from '../../lib/utils';
import { useStkUI } from '../../providers/stk-ui-provider';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ThemeToggle } from '../shared/theme-toggle';
import { BackgroundThemePicker } from '../shared/background-theme-picker';
import { AccentColorPicker } from '../shared/accent-color-picker';
import { StylePicker } from '../shared/style-picker';
import type { UserProfile } from '../../types';

interface UserNavProps {
  profile: UserProfile | null;
  onSignOut: () => void;
}

export function UserNav({ profile, onSignOut }: UserNavProps) {
  const router = useRouter();
  const { userNavItems } = useStkUI();
  const [themeOpen, setThemeOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium shadow-sm outline-none hover:bg-accent hover:text-accent-foreground transition-colors">
        <Avatar className="h-8 w-8 ring-2 ring-primary/20">
          <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.full_name ?? ''} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {profile?.full_name ? getInitials(profile.full_name) : <User className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-semibold leading-tight">
            {profile?.full_name ?? 'Kullanıcı'}
          </span>
          <span className="text-[11px] text-muted-foreground leading-tight">
            {profile?.email ?? ''}
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" alignOffset={-16} className="w-64" sideOffset={8}>
        {/* Profil bilgisi */}
        <DropdownMenuLabel className="p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.full_name ?? ''} />
              <AvatarFallback>
                {profile?.full_name ? getInitials(profile.full_name) : <User className="h-5 w-5" />}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-semibold">{profile?.full_name ?? 'Kullanıcı'}</p>
              <p className="text-xs text-muted-foreground">{profile?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Konfigüre edilebilir menü öğeleri */}
        {userNavItems?.map((item, i) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem
              key={i}
              onClick={() => {
                if (item.onClick) item.onClick();
                else if (item.href) router.push(item.href);
              }}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
              {item.chevron && <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />}
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        {/* Tema ve Stil — açılır alan */}
        <div>
          <button
            type="button"
            onClick={() => setThemeOpen((prev) => !prev)}
            className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Palette className="h-4 w-4" />
            <span className="font-medium">Tema ve Stil</span>
            <ChevronDown
              className={`ml-auto h-4 w-4 text-muted-foreground transition-transform duration-200 ${themeOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {themeOpen && (
            <div className="border-t border-border">
              <div className="px-3 py-2">
                <p className="mb-2 text-xs font-semibold text-muted-foreground">Tema</p>
                <ThemeToggle />
              </div>
              <div className="px-3 py-2">
                <StylePicker />
              </div>
              <div className="px-3 py-2">
                <BackgroundThemePicker />
              </div>
              <div className="px-3 py-2">
                <AccentColorPicker />
              </div>
            </div>
          )}
        </div>

        <DropdownMenuSeparator />

        {/* Çıkış */}
        <DropdownMenuItem
          onClick={onSignOut}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Çıkış Yap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
