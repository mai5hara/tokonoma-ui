import { ChevronDown } from "lucide-react"
import { DayPicker, type DateRange } from "react-day-picker"

import { calendarClassNames } from "./date-range-picker-variants"

const currentYear = new Date().getFullYear()

/** Past trips + a few years ahead for planning. */
const calendarStartMonth = new Date(currentYear - 70, 0)
const calendarEndMonth = new Date(currentYear + 5, 11)

type CalendarProps = {
  selected?: DateRange
  onSelect?: (range: DateRange | undefined) => void
  defaultMonth?: Date
  numberOfMonths?: number
}

function Calendar({ selected, onSelect, defaultMonth, numberOfMonths = 1 }: CalendarProps) {
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
        Chevron: ({ className }) => (
          <ChevronDown className={className} aria-hidden />
        ),
      }}
    />
  )
}

export { Calendar }
export type { CalendarProps }
