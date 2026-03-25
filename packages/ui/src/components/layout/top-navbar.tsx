// TopNavbar: üst menü modu için yatay navigasyon barı
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useStkUI } from '../../providers/stk-ui-provider';
import type { SidebarMenuItem } from '../../types';

function TopMenuItem({
  item,
  isActive,
}: {
  item: { label: string; href: string; icon: any };
  isActive: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{item.label}</span>
    </Link>
  );
}

function TopCollapsibleMenuItem({
  item,
  activeHref,
  isOpen,
  onToggle,
  onClose,
}: {
  item: SidebarMenuItem;
  activeHref: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isParentActive = item.children!.some(c => c.href === activeHref) || item.href === activeHref;
  const Icon = item.icon;

  // Dışarı tıklanınca kapat
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className={cn(
          'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors',
          isParentActive
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span>{item.label}</span>
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded-lg border bg-popover p-1 shadow-md">
          {item.children!.map((child) => {
            const isChildActive = child.href === activeHref;
            const ChildIcon = child.icon;
            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
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

export function TopNavbar() {
  const pathname = usePathname();
  const { sidebarMenu, menuItemFilter } = useStkUI();

  const visibleMenuItems = menuItemFilter
    ? sidebarMenu.filter(menuItemFilter)
    : sidebarMenu;

  // Aktif href hesapla (sidebar ile aynı logic)
  const allHrefs = visibleMenuItems.flatMap((item) =>
    item.children?.length
      ? [item.href, ...item.children.map((c) => c.href)]
      : [item.href]
  );
  const activeHref = allHrefs
    .filter((href) => pathname === href || pathname.startsWith(href + '/'))
    .sort((a, b) => b.length - a.length)[0] ?? null;

  // Akordion: sadece bir dropdown açık kalır
  const [openAccordionHref, setOpenAccordionHref] = useState<string | null>(null);

  const handleAccordionToggle = (href: string) => {
    setOpenAccordionHref((prev) => (prev === href ? null : href));
  };

  const handleClose = useCallback(() => {
    setOpenAccordionHref(null);
  }, []);

  return (
    <nav className="hidden lg:flex items-center gap-1 border-b bg-background px-4 py-2 overflow-x-auto">
      {visibleMenuItems.map((item) => {
        if (item.children && item.children.length > 0) {
          return (
            <TopCollapsibleMenuItem
              key={item.href}
              item={item}
              activeHref={activeHref}
              isOpen={openAccordionHref === item.href}
              onToggle={() => handleAccordionToggle(item.href)}
              onClose={handleClose}
            />
          );
        }

        const isActive = item.href === activeHref;
        return (
          <TopMenuItem
            key={item.href}
            item={item}
            isActive={isActive}
          />
        );
      })}
    </nav>
  );
}
