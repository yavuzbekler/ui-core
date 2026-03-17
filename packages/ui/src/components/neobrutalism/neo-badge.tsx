import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const neoBadgeVariants = cva(
  'inline-flex items-center border-2 border-foreground px-3 py-1.5 text-sm/none font-semibold shadow-[2px_2px_0_0_var(--foreground)]',
  {
    variants: {
      variant: {
        info: 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200',
        success: 'bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-200',
        error: 'bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200',
        default: 'bg-card text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface NeoBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof neoBadgeVariants> {}

const NeoBadge = React.forwardRef<HTMLSpanElement, NeoBadgeProps>(
  ({ className, variant, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(neoBadgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </span>
  )
);
NeoBadge.displayName = 'NeoBadge';

// Badge with status dot
export interface NeoBadgeStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: 'success' | 'error' | 'warning' | 'info';
}

const statusColors: Record<string, string> = {
  success: 'bg-green-600',
  error: 'bg-red-600',
  warning: 'bg-yellow-600',
  info: 'bg-blue-600',
};

const NeoBadgeStatus = React.forwardRef<HTMLSpanElement, NeoBadgeStatusProps>(
  ({ className, status = 'success', children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1.5 border-2 border-foreground bg-card px-3 py-1.5 text-sm/none font-semibold text-foreground shadow-[2px_2px_0_0_var(--foreground)]',
        className
      )}
      {...props}
    >
      <span className={cn('size-2', statusColors[status])} />
      {children}
    </span>
  )
);
NeoBadgeStatus.displayName = 'NeoBadgeStatus';

// Badge with dismiss button
export interface NeoBadgeDismissProps extends React.HTMLAttributes<HTMLSpanElement> {
  onDismiss?: () => void;
}

const NeoBadgeDismiss = React.forwardRef<HTMLSpanElement, NeoBadgeDismissProps>(
  ({ className, onDismiss, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-3 border-2 border-foreground bg-card px-3 py-1.5 text-sm/none font-semibold text-foreground shadow-[2px_2px_0_0_var(--foreground)]',
        className
      )}
      {...props}
    >
      {children}
      <button
        type="button"
        onClick={onDismiss}
        className="bg-foreground p-0.5 text-card shadow-[2px_2px_0_0_var(--foreground)] hover:translate-[2px] hover:shadow-none focus:ring-2 focus:ring-ring"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
          <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
        </svg>
      </button>
    </span>
  )
);
NeoBadgeDismiss.displayName = 'NeoBadgeDismiss';

export { NeoBadge, NeoBadgeStatus, NeoBadgeDismiss, neoBadgeVariants };
