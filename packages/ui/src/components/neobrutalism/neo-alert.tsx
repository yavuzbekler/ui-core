import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const neoAlertVariants = cva(
  'border-2 border-foreground p-4 shadow-[4px_4px_0_0_var(--foreground)]',
  {
    variants: {
      variant: {
        info: 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-200',
        success: 'bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-200',
        error: 'bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const alertIcons: Record<string, React.ReactNode> = {
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="mt-0.5 size-4 shrink-0">
      <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="mt-0.5 size-4 shrink-0">
      <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="mt-0.5 size-4 shrink-0">
      <path fillRule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
    </svg>
  ),
};

export interface NeoAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof neoAlertVariants> {
  showIcon?: boolean;
}

const NeoAlert = React.forwardRef<HTMLDivElement, NeoAlertProps>(
  ({ className, variant = 'info', showIcon = true, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(neoAlertVariants({ variant }), className)}
      {...props}
    >
      <div className="flex items-start gap-3">
        {showIcon && alertIcons[variant || 'info']}
        <strong className="block flex-1 leading-tight font-semibold">{children}</strong>
      </div>
    </div>
  )
);
NeoAlert.displayName = 'NeoAlert';

export { NeoAlert, neoAlertVariants };
