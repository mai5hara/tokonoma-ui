import { FieldVariantProps } from '../field-variants';
import * as React from "react";
/** Public range value (mirrors react-day-picker's DateRange without exposing that dependency). */
export type DateRangePickerValue = {
    from: Date | undefined;
    to?: Date | undefined;
};
type DateRangePickerProps = {
    value?: DateRangePickerValue;
    defaultValue?: DateRangePickerValue;
    onValueChange?: (value: DateRangePickerValue | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
    id?: string;
    numberOfMonths?: number;
} & FieldVariantProps;
declare const DateRangePicker: React.ForwardRefExoticComponent<{
    value?: DateRangePickerValue;
    defaultValue?: DateRangePickerValue;
    onValueChange?: (value: DateRangePickerValue | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
    id?: string;
    numberOfMonths?: number;
} & FieldVariantProps & React.RefAttributes<HTMLButtonElement>>;
export { DateRangePicker };
export type { DateRangePickerProps, FieldVariantProps as DateRangePickerVariantProps };
