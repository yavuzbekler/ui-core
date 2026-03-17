import * as React from 'react';
import { cn } from '../../lib/utils';

export interface NeoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

const NeoInput = React.forwardRef<HTMLInputElement, NeoInputProps>(
  ({ className, label, icon, id, type = 'text', ...props }, ref) => {
    const inputId = id || `neo-input-${React.useId()}`;

    if (icon) {
      return (
        <label htmlFor={inputId} className="text-foreground">
          {label && <span className="text-sm font-semibold">{label}</span>}
          <div className="relative mt-0.5">
            <input
              ref={ref}
              type={type}
              id={inputId}
              className={cn(
                'w-full border-2 border-foreground bg-card text-foreground pe-8 shadow-[4px_4px_0_0_var(--foreground)] focus:ring-2 focus:ring-ring sm:text-sm',
                className
              )}
              {...props}
            />
            <span className="absolute top-1 right-1 grid size-8 place-content-center bg-foreground text-card">
              {icon}
            </span>
          </div>
        </label>
      );
    }

    return (
      <label htmlFor={inputId} className="text-foreground">
        {label && <span className="text-sm font-semibold">{label}</span>}
        <input
          ref={ref}
          type={type}
          id={inputId}
          className={cn(
            'mt-0.5 w-full border-2 border-foreground bg-card text-foreground shadow-[4px_4px_0_0_var(--foreground)] focus:ring-2 focus:ring-ring sm:text-sm',
            className
          )}
          {...props}
        />
      </label>
    );
  }
);
NeoInput.displayName = 'NeoInput';

// Search variant
export interface NeoSearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: () => void;
  buttonText?: string;
}

const NeoSearchInput = React.forwardRef<HTMLInputElement, NeoSearchInputProps>(
  ({ className, onSearch, buttonText = 'Search', id, ...props }, ref) => {
    const inputId = id || `neo-search-${React.useId()}`;

    return (
      <label htmlFor={inputId} className="text-foreground">
        <span className="sr-only">Search</span>
        <div className="flex border-2 border-foreground shadow-[4px_4px_0_0_var(--foreground)] focus-within:ring-2 focus-within:ring-ring">
          <input
            ref={ref}
            type="search"
            id={inputId}
            className={cn('w-full border-none bg-card text-foreground focus:ring-0 sm:text-sm', className)}
            {...props}
          />
          <button
            type="submit"
            onClick={onSearch}
            className="bg-primary px-4 py-2 text-xs/none font-bold tracking-wide uppercase text-primary-foreground hover:bg-primary/80 focus:bg-primary/80 focus:outline-0"
          >
            {buttonText}
          </button>
        </div>
      </label>
    );
  }
);
NeoSearchInput.displayName = 'NeoSearchInput';

export { NeoInput, NeoSearchInput };
