import type { LucideIcon } from 'lucide-react';

export interface SidebarMenuChild {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface SidebarMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
  packageCheck?: string;
  children?: SidebarMenuChild[];
}

export interface UserNavItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  chevron?: boolean;
}

export interface UserProfile {
  full_name?: string | null;
  email?: string | null;
  avatar_url?: string | null;
}

export interface StkUIConfig {
  /** Sidebar menü öğeleri — flat veya hierarchical */
  sidebarMenu: SidebarMenuItem[];
  /** URL segment → görüntülenecek etiket (breadcrumb için) */
  breadcrumbLabels: Record<string, string>;
  /** User nav dropdown'da gösterilecek ek menü öğeleri */
  userNavItems?: UserNavItem[];
  /** Logo tıklandığında gidilecek path */
  homePath?: string;
  /** Menü öğelerini filtreleme fonksiyonu (paket kontrolü vb.) */
  menuItemFilter?: (item: SidebarMenuItem) => boolean;
}
