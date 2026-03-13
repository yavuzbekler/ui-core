// Sidebar: konfigürasyon context'ten menü oku, flat + hierarchical destekle
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStkUI } from '../../providers/stk-ui-provider';
import { Logo } from '../shared/logo';
import { Sheet, SheetContent } from '../ui/sheet';
import type { SidebarMenuItem } from '../../types';

function MenuItemLink({
  item,
  isActive,
  collapsed,
}: {
  item: { label: string; href: string; icon: any };
  isActive: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none focus-visible:ring-0',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
      )}
      title={collapsed ? item.label : undefined}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

function CollapsibleMenuItem({
  item,
  collapsed,
  activeHref,
}: {
  item: SidebarMenuItem;
  collapsed: boolean;
  activeHref: string | null;
}) {
  const isParentActive = item.children!.some(c => c.href === activeHref) || item.href === activeHref;
  const [open, setOpen] = useState(isParentActive);
  const Icon = item.icon;

  if (collapsed) {
    return (
      <Link
        href={item.children![0].href}
        className={cn(
          'flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium outline-none focus-visible:ring-0',
          isParentActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
        )}
        title={item.label}
      >
        <Icon className="h-5 w-5 shrink-0" />
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none',
          isParentActive
            ? 'text-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="ml-4 mt-1 space-y-0.5 border-l border-border pl-2">
          {item.children!.map((child) => {
            const isChildActive = child.href === activeHref;
            const ChildIcon = child.icon;
            return (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm outline-none focus-visible:ring-0',
                  isChildActive
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <ChildIcon className="h-4 w-4 shrink-0" />
                <span>{child.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  const { sidebarMenu, sidebarCollapsed, homePath, menuItemFilter } = useStkUI();

  const visibleMenuItems = menuItemFilter
    ? sidebarMenu.filter(menuItemFilter)
    : sidebarMenu;

  // Find the most specific (longest) matching href to prevent multiple active items
  const allHrefs = visibleMenuItems.flatMap((item) =>
    item.children?.length
      ? [item.href, ...item.children.map((c) => c.href)]
      : [item.href]
  );
  const activeHref = allHrefs
    .filter((href) => pathname === href || pathname.startsWith(href + '/'))
    .sort((a, b) => b.length - a.length)[0] ?? null;

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-4">
        <Link href={homePath || '/dashboard'}>
          <Logo collapsed={sidebarCollapsed} />
        </Link>
      </div>

      {/* Menü */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {visibleMenuItems.map((item) => {
          if (item.children && item.children.length > 0) {
            return (
              <CollapsibleMenuItem
                key={item.href}
                item={item}
                collapsed={sidebarCollapsed}
                activeHref={activeHref}
              />
            );
          }

          const isActive = item.href === activeHref;
          return (
            <MenuItemLink
              key={item.href}
              item={item}
              isActive={isActive}
              collapsed={sidebarCollapsed}
            />
          );
        })}
      </nav>

      {/* Daralt/Genişlet alanı (buton kaldırıldı, alan korundu) */}
      <div className="border-t p-2">
        <div className="p-2" />
      </div>
    </div>
  );
}

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebarCollapsed } = useStkUI();

  return (
    <aside
      className={cn(
        'hidden fixed inset-y-0 left-0 z-40 border-r bg-sidebar transition-all duration-300 lg:block',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <SidebarContent />
      {/* Çizgi üzerinde açma/kapama butonu */}
      <button
        onClick={toggleSidebarCollapsed}
        className="absolute top-1/2 -right-[10px] z-50 flex h-8 w-5 -translate-y-1/2 items-center justify-center rounded-sm border bg-background text-muted-foreground shadow-sm hover:text-foreground transition-colors"
      >
        <ChevronLeft
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            sidebarCollapsed && 'rotate-180'
          )}
        />
      </button>
    </aside>
  );
}

export function MobileSidebar() {
  const { sidebarOpen, setSidebarOpen } = useStkUI();

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
