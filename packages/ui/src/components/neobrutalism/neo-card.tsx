import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const neoCardVariants = cva(
  'block border-2 border-foreground bg-card text-foreground p-4 sm:p-6',
  {
    variants: {
      variant: {
        base: 'shadow-[4px_4px_0_0_var(--foreground)] hover:bg-primary/10',
        stacked:
          'shadow-[4px_4px_0_0_var(--foreground),8px_8px_0_0_var(--foreground),12px_12px_0_0_var(--foreground)] hover:translate-[12px] hover:bg-primary/10 hover:shadow-none',
        dashed: '',
        'retro-window': 'shadow-[4px_4px_0_0_var(--foreground),8px_8px_0_0_var(--foreground)] p-0',
      },
    },
    defaultVariants: {
      variant: 'base',
    },
  }
);

export interface NeoCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof neoCardVariants> {
  href?: string;
}

const NeoCard = React.forwardRef<HTMLDivElement, NeoCardProps>(
  ({ className, variant, href, children, ...props }, ref) => {
    if (variant === 'dashed') {
      return (
        <div ref={ref} className={cn('group/card relative', className)} {...props}>
          <span className="absolute inset-0 border-2 border-dashed border-foreground bg-card" />
          <div className="relative flex min-h-72 flex-col justify-end border-2 border-foreground bg-card p-4 text-foreground group-hover/card:-translate-[8px] hover:bg-primary/10 sm:p-6">
            {children}
          </div>
        </div>
      );
    }

    if (variant === 'retro-window') {
      return (
        <article
          ref={ref as React.Ref<HTMLElement>}
          className={cn(neoCardVariants({ variant }), className)}
          {...props}
        >
          {children}
        </article>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(neoCardVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
NeoCard.displayName = 'NeoCard';

// Retro window header
const NeoCardWindowHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { title?: string }
>(({ className, title = 'System Message', children, ...props }, ref) => (
  <div ref={ref} className={cn('bg-primary p-3 text-primary-foreground', className)} {...props}>
    <div className="flex items-center justify-between">
      <strong className="text-xs/none font-bold uppercase">{title}</strong>
      <div className="flex gap-1">
        <div className="size-3 border-2 border-foreground bg-card" />
        <div className="size-3 border-2 border-foreground bg-card" />
      </div>
    </div>
  </div>
));
NeoCardWindowHeader.displayName = 'NeoCardWindowHeader';

const NeoCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('border-t-2 border-foreground p-4 sm:p-6', className)} {...props}>
    {children}
  </div>
));
NeoCardContent.displayName = 'NeoCardContent';

export { NeoCard, NeoCardWindowHeader, NeoCardContent, neoCardVariants };
