import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const neoTextareaVariants = cva('', {
  variants: {
    variant: {
      base: '',
      'actions-inside': '',
      'actions-outside': '',
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

export interface NeoTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof neoTextareaVariants> {
  label?: string;
  onClear?: () => void;
  onSave?: () => void;
  clearText?: string;
  saveText?: string;
}

const NeoTextarea = React.forwardRef<HTMLTextAreaElement, NeoTextareaProps>(
  (
    {
      className,
      variant = 'base',
      label = 'Notes',
      rows = 4,
      onClear,
      onSave,
      clearText = 'Clear',
      saveText = 'Save',
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || `neo-textarea-${React.useId()}`;

    if (variant === 'actions-inside') {
      return (
        <div className="text-foreground">
          <label htmlFor={textareaId}>
            <span className="text-sm font-semibold">{label}</span>
            <div className="relative mt-0.5 overflow-hidden border-2 border-foreground shadow-[4px_4px_0_0_var(--foreground)] focus-within:ring-2 focus-within:ring-ring">
              <textarea
                ref={ref}
                id={textareaId}
                rows={rows}
                className={cn('w-full resize-none border-0 bg-card text-foreground focus:ring-0 sm:text-sm', className)}
                {...props}
              />
              <div className="flex items-center justify-end gap-3 border-t-2 border-foreground bg-card p-3">
                <button
                  type="button"
                  onClick={onClear}
                  className="border-2 border-foreground bg-card px-3 py-1.5 text-sm font-semibold shadow-[2px_2px_0_0_var(--foreground)] hover:bg-primary/10 focus:ring-2 focus:ring-ring focus:outline-0"
                >
                  {clearText}
                </button>
                <button
                  type="button"
                  onClick={onSave}
                  className="border-2 border-foreground bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-[2px_2px_0_0_var(--foreground)] hover:bg-primary/80 focus:bg-primary focus:ring-2 focus:ring-ring focus:outline-0"
                >
                  {saveText}
                </button>
              </div>
            </div>
          </label>
        </div>
      );
    }

    if (variant === 'actions-outside') {
      return (
        <div className="text-foreground">
          <label htmlFor={textareaId}>
            <span className="text-sm font-semibold">{label}</span>
            <textarea
              ref={ref}
              id={textareaId}
              rows={rows}
              className={cn(
                'mt-0.5 w-full resize-none border-2 border-foreground bg-card text-foreground shadow-[4px_4px_0_0_var(--foreground)] focus:ring-2 focus:ring-ring sm:text-sm',
                className
              )}
              {...props}
            />
          </label>
          <div className="mt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClear}
              className="border-2 border-foreground bg-card px-3 py-1.5 text-sm font-semibold shadow-[2px_2px_0_0_var(--foreground)] hover:bg-primary/10 focus:ring-2 focus:ring-ring focus:outline-0"
            >
              {clearText}
            </button>
            <button
              type="button"
              onClick={onSave}
              className="border-2 border-foreground bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-[2px_2px_0_0_var(--foreground)] hover:bg-primary/80 focus:bg-primary focus:ring-2 focus:ring-ring focus:outline-0"
            >
              {saveText}
            </button>
          </div>
        </div>
      );
    }

    // Base variant
    return (
      <label htmlFor={textareaId} className="text-foreground">
        <span className="text-sm font-semibold">{label}</span>
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          className={cn(
            'mt-0.5 w-full resize-none border-2 border-foreground bg-card text-foreground shadow-[4px_4px_0_0_var(--foreground)] focus:ring-2 focus:ring-ring sm:text-sm',
            className
          )}
          {...props}
        />
      </label>
    );
  }
);
NeoTextarea.displayName = 'NeoTextarea';

export { NeoTextarea, neoTextareaVariants };
