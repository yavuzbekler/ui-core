// Breadcrumb: konfigürasyon context'ten label map oku
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { useStkUI } from '../../providers/stk-ui-provider';

function isUUID(str: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

export function Breadcrumb() {
  const pathname = usePathname();
  const { breadcrumbLabels } = useStkUI();
  const segments = pathname.split('/').filter(Boolean);

  const items = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = breadcrumbLabels[segment] || (isUUID(segment) ? 'Detay' : segment);
    return { label, href };
  });

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <span key={item.href} className="flex items-center gap-1">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {index === items.length - 1 ? (
            <span className="font-medium text-foreground">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
