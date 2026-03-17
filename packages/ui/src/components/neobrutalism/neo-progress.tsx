import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const neoProgressBarVariants = cva('h-3', {
  variants: {
    variant: {
      base: 'bg-foreground',
      striped:
        'bg-[repeating-linear-gradient(45deg,var(--primary)_0,var(--primary)_10px,color-mix(in_srgb,var(--primary)_80%,black)_10px,color-mix(in_srgb,var(--primary)_80%,black)_20px)]',
      status: 'bg-green-600',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

export interface NeoProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof neoProgressBarVariants> {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
}

const NeoProgress = React.forwardRef<HTMLDivElement, NeoProgressProps>(
  ({ className, variant, value, max = 100, label, showPercentage = false, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={cn('text-foreground', className)}
        {...props}
      >
        {(label || showPercentage) && (
          <div className="flex justify-between gap-4 mb-2">
            {label && <span className="text-sm font-semibold">{label}</span>}
            {showPercentage && <span className="text-sm font-semibold">{Math.round(percentage)}%</span>}
          </div>
        )}
        <div className="flex w-full overflow-hidden border-2 border-foreground bg-card p-1 shadow-[2px_2px_0_0_var(--foreground)]">
          <div
            className={cn(neoProgressBarVariants({ variant }))}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
NeoProgress.displayName = 'NeoProgress';

export { NeoProgress, neoProgressBarVariants };
