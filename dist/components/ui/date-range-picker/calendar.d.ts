import { DateRange } from 'react-day-picker';
type CalendarProps = {
    selected?: DateRange;
    onSelect?: (range: DateRange | undefined) => void;
    defaultMonth?: Date;
    numberOfMonths?: number;
};
declare function Calendar({ selected, onSelect, defaultMonth, numberOfMonths }: CalendarProps): import("react").JSX.Element;
export { Calendar };
export type { CalendarProps };
