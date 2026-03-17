import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const neoButtonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus:ring-2 focus:ring-ring focus:outline-0 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        base: 'border-2 border-foreground bg-card px-5 py-3 text-foreground shadow-[4px_4px_0_0_var(--foreground)] hover:bg-primary hover:text-primary-foreground',
        pressed:
          'border-2 border-foreground bg-card px-5 py-3 text-foreground shadow-[4px_4px_0_0_var(--foreground)] hover:translate-[4px] hover:shadow-none',
        'pressed-inset':
          'border-2 border-foreground bg-card px-5 py-3 text-foreground shadow-[4px_4px_0_0_var(--foreground)] hover:translate-[4px] hover:shadow-[-1px_-1px_0_0_var(--foreground)]',
        underlined:
          'relative border-foreground bg-card px-5 py-3 text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-foreground hover:text-card hover:after:h-full',
        'double-border':
          'border-2 border-foreground bg-card px-5 py-3 text-foreground ring-2 ring-foreground ring-offset-2 ring-offset-primary hover:bg-primary hover:text-primary-foreground',
      },
      size: {
        default: 'text-sm',
        sm: 'px-3 py-1.5 text-xs',
        lg: 'px-8 py-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'base',
      size: 'default',
    },
  }
);

export interface NeoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neoButtonVariants> {
  asChild?: boolean;
}

const NeoButton = React.forwardRef<HTMLButtonElement, NeoButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    if (variant === 'underlined') {
      return (
        <button
          className={cn(neoButtonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          <span className="relative z-10">{children}</span>
        </button>
      );
    }

    return (
      <button
        className={cn(neoButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
NeoButton.displayName = 'NeoButton';

export { NeoButton, neoButtonVariants };
