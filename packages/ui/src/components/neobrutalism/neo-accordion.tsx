'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const neoAccordionVariants = cva('', {
  variants: {
    variant: {
      base: 'space-y-3',
      contained: 'space-y-3',
      grouped:
        'flex flex-col items-start divide-y-2 divide-foreground border-2 border-foreground shadow-[4px_4px_0_0_var(--foreground)]',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

export interface NeoAccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof neoAccordionVariants> {}

const NeoAccordion = React.forwardRef<HTMLDivElement, NeoAccordionProps>(
  ({ className, variant, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(neoAccordionVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  )
);
NeoAccordion.displayName = 'NeoAccordion';

// Accordion item
export interface NeoAccordionItemProps extends React.HTMLAttributes<HTMLDetailsElement> {
  title: string;
  grouped?: boolean;
  defaultOpen?: boolean;
}

const NeoAccordionItem = React.forwardRef<HTMLDetailsElement, NeoAccordionItemProps>(
  ({ className, title, grouped = false, defaultOpen = false, children, ...props }, ref) => {
    if (grouped) {
      return (
        <details
          ref={ref}
          open={defaultOpen}
          className={cn('group w-full [&_summary::-webkit-details-marker]:hidden', className)}
          {...props}
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 bg-card px-4 py-3 font-medium text-foreground focus-within:bg-primary focus-within:text-primary-foreground hover:bg-primary/10 focus:outline-0">
            <span className="font-semibold">{title}</span>
            <svg
              className="size-5 shrink-0 transition-transform group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="border-t-2 border-foreground p-4">{children}</div>
        </details>
      );
    }

    return (
      <details
        ref={ref}
        open={defaultOpen}
        className={cn(
          'group border-2 border-foreground shadow-[4px_4px_0_0_var(--foreground)] [&_summary::-webkit-details-marker]:hidden',
          className
        )}
        {...props}
      >
        <summary className="flex cursor-pointer items-center justify-between gap-4 bg-card px-4 py-3 font-medium text-foreground hover:bg-primary/10 focus:bg-primary/10 focus:outline-0">
          <span className="font-semibold">{title}</span>
          <svg
            className="size-5 shrink-0 transition-transform group-open:-rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="border-t-2 border-foreground p-4">{children}</div>
      </details>
    );
  }
);
NeoAccordionItem.displayName = 'NeoAccordionItem';

export { NeoAccordion, NeoAccordionItem, neoAccordionVariants };
