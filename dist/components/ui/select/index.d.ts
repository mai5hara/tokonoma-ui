import { FieldVariantProps } from '../field-variants';
import * as React from "react";
export type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};
type SelectProps = {
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
    id?: string;
} & FieldVariantProps;
declare const Select: React.ForwardRefExoticComponent<{
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
    id?: string;
} & FieldVariantProps & React.RefAttributes<HTMLButtonElement>>;
export { Select };
export type { SelectProps, FieldVariantProps as SelectVariantProps };
