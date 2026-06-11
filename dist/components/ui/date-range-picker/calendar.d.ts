import { DateRange } from 'react-day-picker';
type CalendarProps = {
    selected?: DateRange;
    onSelect?: (range: DateRange | undefined) => void;
    defaultMonth?: Date;
};
declare function Calendar({ selected, onSelect, defaultMonth }: CalendarProps): import("react").JSX.Element;
export { Calendar };
export type { CalendarProps };
