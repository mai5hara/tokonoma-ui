import { ChevronDown } from 'lucide-react';
import { DayPicker, type DateRange } from 'react-day-picker';

import { calendarClassNames } from './date-range-picker-variants';

const currentYear = new Date().getFullYear();

/** Past trips + a few years ahead for planning. */
const calendarStartMonth = new Date(currentYear - 70, 0);
const calendarEndMonth = new Date(currentYear + 5, 11);

type CalendarProps = {
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
  /** Month shown on first open when no range is selected. */
  defaultMonth?: Date;
  /** Number of months shown side by side. Defaults to `1`. */
  numberOfMonths?: number;
};

/** Internal range calendar (react-day-picker). Not exported from the package. */
function Calendar({
  selected,
  onSelect,
  defaultMonth,
  numberOfMonths = 1,
}: CalendarProps) {
  return (
    <DayPicker
      mode="range"
      numberOfMonths={numberOfMonths}
      captionLayout="dropdown"
      reverseYears
      startMonth={calendarStartMonth}
      endMonth={calendarEndMonth}
      showOutsideDays
      selected={selected}
      onSelect={onSelect}
      defaultMonth={defaultMonth ?? selected?.from}
      resetOnSelect
      classNames={calendarClassNames}
      components={{
        Chevron: ({ className }: { className?: string }) => (
          <ChevronDown className={className} aria-hidden />
        ),
      }}
    />
  );
}

export { Calendar };
export type { CalendarProps };
