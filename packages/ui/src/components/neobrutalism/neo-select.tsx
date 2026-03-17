import * as React from 'react';
import { cn } from '../../lib/utils';

export interface NeoSelectOption {
  value: string;
  label: string;
}

export interface NeoSelectOptionGroup {
  label: string;
  options: NeoSelectOption[];
}

export interface NeoSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: NeoSelectOption[];
  optionGroups?: NeoSelectOptionGroup[];
  placeholder?: string;
}

const NeoSelect = React.forwardRef<HTMLSelectElement, NeoSelectProps>(
  ({ className, label, options, optionGroups, placeholder = 'Please select', id, ...props }, ref) => {
    const selectId = id || `neo-select-${React.useId()}`;

    return (
      <label htmlFor={selectId} className="text-foreground">
        {label && <span className="text-sm font-semibold">{label}</span>}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'mt-0.5 w-full border-2 border-foreground bg-card text-foreground shadow-[4px_4px_0_0_var(--foreground)] focus:ring-2 focus:ring-ring sm:text-sm',
            className
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {optionGroups
            ? optionGroups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              ))
            : options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
        </select>
      </label>
    );
  }
);
NeoSelect.displayName = 'NeoSelect';

export { NeoSelect };
