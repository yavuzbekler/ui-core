'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface DatePickerProps {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  dateFormat?: string;
}

function DatePicker({
  value,
  onValueChange,
  placeholder = 'Tarih seçin...',
  className,
  disabled = false,
  dateFormat = 'PPP',
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, dateFormat, { locale: tr }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onValueChange}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
