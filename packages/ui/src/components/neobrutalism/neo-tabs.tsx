'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const neoTabsVariants = cva('', {
  variants: {
    variant: {
      base: '',
      contained: '',
      pills: '',
      vertical: 'flex gap-8',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

export interface NeoTabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface NeoTabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof neoTabsVariants> {
  tabs: NeoTabItem[];
  defaultTab?: string;
}

const NeoTabs = React.forwardRef<HTMLDivElement, NeoTabsProps>(
  ({ className, variant = 'base', tabs, defaultTab, ...props }, ref) => {
    const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id);
    const activeContent = tabs.find((t) => t.id === activeTab)?.content;

    if (variant === 'vertical') {
      return (
        <div ref={ref} className={cn(neoTabsVariants({ variant }), 'text-foreground', className)} {...props}>
          <div className="border-r-2 border-foreground py-2">
            <div role="tablist" className="-mr-0.5 flex flex-col">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-6 py-2 font-semibold focus:ring-2 focus:ring-ring focus:outline-0',
                    activeTab === tab.id
                      ? 'border-2 border-foreground bg-primary text-primary-foreground'
                      : 'border-2 border-transparent hover:bg-foreground hover:text-card'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div role="tabpanel" className="flex-1 py-2">
            {activeContent}
          </div>
        </div>
      );
    }

    if (variant === 'pills') {
      return (
        <div ref={ref} className={cn('text-foreground', className)} {...props}>
          <div>
            <div role="tablist" className="-mb-0.5 flex gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'border-2 border-foreground px-6 py-2 font-semibold shadow-[4px_4px_0_0_var(--foreground)] focus:ring-2 focus:ring-ring focus:outline-0',
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card hover:translate-[4px] hover:shadow-none'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div role="tabpanel" className="mt-4">
            {activeContent}
          </div>
        </div>
      );
    }

    if (variant === 'contained') {
      return (
        <div ref={ref} className={cn('text-foreground', className)} {...props}>
          <div className="border-b-2 border-foreground px-2">
            <div role="tablist" className="-mb-0.5 flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-6 py-2 font-semibold focus:ring-2 focus:ring-ring focus:outline-0',
                    activeTab === tab.id
                      ? 'border-2 border-foreground bg-primary text-primary-foreground'
                      : 'border-2 border-transparent hover:bg-foreground hover:text-card'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div role="tabpanel" className="mt-4">
            {activeContent}
          </div>
        </div>
      );
    }

    // Base variant
    return (
      <div ref={ref} className={cn('text-foreground', className)} {...props}>
        <div className="border-b-2 border-foreground px-2">
          <div role="tablist" className="-mb-0.5 flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-6 py-2 font-semibold focus:ring-2 focus:ring-ring focus:outline-0',
                  activeTab === tab.id
                    ? 'border-2 border-foreground bg-primary text-primary-foreground'
                    : 'border-2 border-transparent hover:bg-foreground hover:text-card'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div role="tabpanel" className="mt-4">
          {activeContent}
        </div>
      </div>
    );
  }
);
NeoTabs.displayName = 'NeoTabs';

export { NeoTabs, neoTabsVariants };
