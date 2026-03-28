'use client';

import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export interface CellSelectOption {
  value: string;
  label: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

interface CellSelectProps {
  value: string;
  options: CellSelectOption[];
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

function CellSelect({
  value,
  options,
  onValueChange,
  disabled = false,
  className,
}: CellSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (optionValue !== value) {
      onValueChange?.(optionValue);
    }
    setOpen(false);
  };

  if (disabled || !onValueChange) {
    return (
      <Badge
        variant={selectedOption?.variant ?? 'outline'}
        className={cn(selectedOption?.className, className)}
      >
        {selectedOption?.label ?? value}
      </Badge>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="focus:outline-none"
        >
          <Badge
            variant={selectedOption?.variant ?? 'outline'}
            className={cn(
              'cursor-pointer gap-1 select-none hover:opacity-80 transition-opacity',
              selectedOption?.className,
              className
            )}
          >
            {selectedOption?.label ?? value}
            <ChevronDown className="h-3 w-3 opacity-60" />
          </Badge>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto min-w-[140px] p-1"
        align="start"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                className={cn(
                  'flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground text-left',
                  isSelected && 'bg-accent/50'
                )}
                onClick={(e) => handleSelect(option.value, e)}
              >
                <Check
                  className={cn(
                    'h-3.5 w-3.5 shrink-0',
                    isSelected ? 'opacity-100' : 'opacity-0'
                  )}
                />
                <Badge
                  variant={option.variant ?? 'outline'}
                  className={cn('pointer-events-none', option.className)}
                >
                  {option.label}
                </Badge>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { CellSelect };
