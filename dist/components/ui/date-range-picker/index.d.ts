import { FieldAppearanceProps } from '../field-variants';
import * as React from 'react';
/** Selected date range (`from` / `to`). */
export type DateRangePickerValue = {
    /** Start date (inclusive). */
    from: Date | undefined;
    /** End date (inclusive). May be omitted while the user is still selecting. */
    to?: Date | undefined;
};
type DateRangePickerProps = {
    /** Current range. Pair with `onValueChange` for controlled usage. */
    value?: DateRangePickerValue;
    /** Initial range when uncontrolled. */
    defaultValue?: DateRangePickerValue;
    /** Called when the range changes. */
    onValueChange?: (value: DateRangePickerValue | undefined) => void;
    /** Shown when no dates are selected. */
    placeholder?: string;
    disabled?: boolean;
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
    /** Associates the trigger with an external {@link Label} via `htmlFor`. */
    id?: string;
    /** Number of months shown in the calendar popover. Defaults to `1`. */
    numberOfMonths?: number;
} & FieldAppearanceProps;
/**
 * Date range field with the same field chrome as {@link Input} and
 * {@link Select}. Opens a calendar popover to pick start and end dates. Pair
 * with {@link Label}.
 */
declare const DateRangePicker: React.ForwardRefExoticComponent<{
    /** Current range. Pair with `onValueChange` for controlled usage. */
    value?: DateRangePickerValue;
    /** Initial range when uncontrolled. */
    defaultValue?: DateRangePickerValue;
    /** Called when the range changes. */
    onValueChange?: (value: DateRangePickerValue | undefined) => void;
    /** Shown when no dates are selected. */
    placeholder?: string;
    disabled?: boolean;
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
    /** Associates the trigger with an external {@link Label} via `htmlFor`. */
    id?: string;
    /** Number of months shown in the calendar popover. Defaults to `1`. */
    numberOfMonths?: number;
} & FieldAppearanceProps & React.RefAttributes<HTMLButtonElement>>;
export { DateRangePicker };
export type { DateRangePickerProps };
export type { FieldAppearanceProps as DateRangePickerVariantProps } from '../field-variants';
