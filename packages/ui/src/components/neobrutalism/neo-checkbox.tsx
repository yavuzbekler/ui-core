import * as React from 'react';
import { cn } from '../../lib/utils';

export interface NeoCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

const NeoCheckbox = React.forwardRef<HTMLInputElement, NeoCheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const checkboxId = id || `neo-checkbox-${React.useId()}`;

    return (
      <label htmlFor={checkboxId} className={cn('inline-flex items-start gap-3 text-foreground', className)}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className="size-6 border-2 border-foreground shadow-[2px_2px_0_0_var(--foreground)] checked:bg-foreground focus:ring-2 focus:ring-foreground"
          {...props}
        />
        {description ? (
          <div>
            <strong className="font-semibold">{label}</strong>
            <p className="mt-0.5 text-sm text-pretty text-muted-foreground">{description}</p>
          </div>
        ) : (
          <span className="font-semibold">{label}</span>
        )}
      </label>
    );
  }
);
NeoCheckbox.displayName = 'NeoCheckbox';

// Grouped checkbox container
export interface NeoCheckboxGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  legend?: string;
  grouped?: boolean;
}

const NeoCheckboxGroup = React.forwardRef<HTMLFieldSetElement, NeoCheckboxGroupProps>(
  ({ className, legend = 'Checkboxes', grouped = false, children, ...props }, ref) => (
    <fieldset ref={ref} {...props}>
      <legend className="sr-only">{legend}</legend>
      <div
        className={cn(
          grouped
            ? 'flex flex-col items-start divide-y-2 divide-foreground border-2 border-foreground shadow-[4px_4px_0_0_var(--foreground)]'
            : 'flex flex-col items-start gap-3',
          className
        )}
      >
        {grouped
          ? React.Children.map(children, (child) => (
              <div className="w-full p-4 focus-within:bg-primary focus-within:text-primary-foreground hover:bg-primary/10">
                {child}
              </div>
            ))
          : children}
      </div>
    </fieldset>
  )
);
NeoCheckboxGroup.displayName = 'NeoCheckboxGroup';

export { NeoCheckbox, NeoCheckboxGroup };
