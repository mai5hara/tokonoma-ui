import { FieldAppearanceProps } from '../field-variants';
import * as React from 'react';
export type SelectOption = {
    value: string;
    label: string;
    /** Omit or disable options that cannot be selected. */
    disabled?: boolean;
};
type SelectProps = {
    /** Options shown in the dropdown. */
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** Shown when no value is selected. */
    placeholder?: string;
    disabled?: boolean;
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
    /** Associates the trigger with an external {@link Label} via `htmlFor`. */
    id?: string;
} & FieldAppearanceProps;
/**
 * Single-select dropdown with the same field chrome as {@link Input}. Pass an
 * `options` array rather than composing items manually.
 */
declare const Select: React.ForwardRefExoticComponent<{
    /** Options shown in the dropdown. */
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** Shown when no value is selected. */
    placeholder?: string;
    disabled?: boolean;
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
    /** Associates the trigger with an external {@link Label} via `htmlFor`. */
    id?: string;
} & FieldAppearanceProps & React.RefAttributes<HTMLButtonElement>>;
export { Select };
export type { SelectProps };
export type { FieldAppearanceProps as SelectVariantProps } from '../field-variants';
