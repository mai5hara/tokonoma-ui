import { DateRange } from 'react-day-picker';
import { FieldVariantProps } from '../field-variants';
import * as React from "react";
export type { DateRange as DateRangePickerValue };
type DateRangePickerProps = {
    value?: DateRange;
    defaultValue?: DateRange;
    onValueChange?: (value: DateRange | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
    id?: string;
    numberOfMonths?: number;
} & FieldVariantProps;
declare const DateRangePicker: React.ForwardRefExoticComponent<{
    value?: DateRange;
    defaultValue?: DateRange;
    onValueChange?: (value: DateRange | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
    id?: string;
    numberOfMonths?: number;
} & FieldVariantProps & React.RefAttributes<HTMLButtonElement>>;
export { DateRangePicker };
export type { DateRangePickerProps, FieldVariantProps as DateRangePickerVariantProps };
