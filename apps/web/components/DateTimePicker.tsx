/* eslint-disable react/prop-types */
import { useState, useEffect, useId } from 'react';
import { format } from 'date-fns';
import { Calendar as PhosphorCalendar } from '@phosphor-icons/react/dist/ssr';

import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

// Component props
interface DateTimePickerProps {
  id: string;
  value: Date | string | undefined;
  setValue: React.Dispatch<React.SetStateAction<Date | string | undefined>>;
  label?: string;
  placeholder?: string;
  index: number;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  setValue,
  label,
  placeholder
}) => {
  const uniqueId = useId();
  const [date, setDate] = useState<Date | undefined>(
    value instanceof Date ? value : value ? new Date(value) : undefined
  );
  const [isOpen, setIsOpen] = useState(false);

  // Update the date when the value prop changes
  useEffect(() => {
    if (value) {
      try {
        const parsedDate = value instanceof Date ? value : new Date(value);
        if (!isNaN(parsedDate.getTime())) {
          setDate(parsedDate);
        }
      } catch (error) {
        console.error('Error parsing date:', error);
      }
    } else {
      setDate(undefined);
    }
  }, [value]);

  // Update the parent component's value when our date changes
  useEffect(() => {
    if (date) {
      setValue(date);
    }
  }, [date, setValue]);

  // Add a global style for the popover when opened
  useEffect(() => {
    if (isOpen) {
      // Add a CSS variable to set popover z-index higher than modal
      document.documentElement.style.setProperty(
        `--popover-z-index-${uniqueId}`,
        '1000'
      );

      // Add a style element to position the popover correctly
      const styleEl = document.createElement('style');
      styleEl.textContent = `
        [data-radix-popper-content-id="${uniqueId}"] {
          z-index: var(--popover-z-index-${uniqueId}, 1000) !important;
          position: fixed !important;
        }
      `;
      document.head.appendChild(styleEl);

      return () => {
        document.documentElement.style.removeProperty(
          `--popover-z-index-${uniqueId}`
        );
        document.head.removeChild(styleEl);
      };
    }
  }, [isOpen, uniqueId]);

  const _hours = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Preserve time from currently selected date
      if (date) {
        selectedDate.setHours(date.getHours());
        selectedDate.setMinutes(date.getMinutes());
      }
      setDate(selectedDate);
    }
  };

  const _handleTimeChange = (
    type: 'hour' | 'minute' | 'ampm',
    value: string
  ) => {
    if (date) {
      const newDate = new Date(date);
      if (type === 'hour') {
        newDate.setHours(
          (parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0)
        );
      } else if (type === 'minute') {
        newDate.setMinutes(parseInt(value));
      } else if (type === 'ampm') {
        const currentHours = newDate.getHours();
        const isPM = currentHours >= 12;

        if (value === 'PM' && !isPM) {
          newDate.setHours(currentHours + 12);
        } else if (value === 'AM' && isPM) {
          newDate.setHours(currentHours - 12);
        }
      }
      setDate(newDate);
    } else {
      // If no date is selected, use today with the selected time
      const newDate = new Date();
      if (type === 'hour') {
        newDate.setHours(parseInt(value) % 12);
      } else if (type === 'minute') {
        newDate.setMinutes(parseInt(value));
      } else if (type === 'ampm' && value === 'PM') {
        newDate.setHours(newDate.getHours() + 12);
      }
      setDate(newDate);
    }
  };

  // Maintain the same style as other form components
  return (
    <div className="relative w-72">
      <div className="relative rounded-full bg-black/40 px-2 py-0 cursor-text h-10 flex items-center">
        <div className="absolute inset-y-0 left-3 flex items-center text-white">
          <PhosphorCalendar weight="bold" />
        </div>

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-left bg-transparent border-0 h-8 px-7 text-white hover:bg-white/10"
            >
              {date ? (
                format(date, 'MMM d, yyyy h:mm a')
              ) : (
                <span className="text-white/60">
                  {label || placeholder || 'Select date and time'}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 bg-gray-800 border-white/20"
            side="bottom"
            align="start"
            sideOffset={5}
            id={uniqueId}
            forceMount
            avoidCollisions={false}
            style={{ zIndex: 10000 }}
          >
            <div className="sm:flex">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
                className="border-white/10"
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateTimePicker;
