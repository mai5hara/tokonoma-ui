import { DateRange } from 'react-day-picker';
type CalendarProps = {
    selected?: DateRange;
    onSelect?: (range: DateRange | undefined) => void;
    /** Month shown on first open when no range is selected. */
    defaultMonth?: Date;
    /** Number of months shown side by side. Defaults to `1`. */
    numberOfMonths?: number;
};
/** Internal range calendar (react-day-picker). Not exported from the package. */
declare function Calendar({ selected, onSelect, defaultMonth, numberOfMonths, }: CalendarProps): import("react/jsx-runtime").JSX.Element;
export { Calendar };
export type { CalendarProps };
