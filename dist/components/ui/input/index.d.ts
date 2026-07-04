import { ClosedElementProps } from '../../../lib/closed-api';
import { FieldAppearanceProps } from './input-variants';
import * as React from 'react';
type InputProps = ClosedElementProps<Omit<React.ComponentProps<'input'>, 'size'>> & FieldAppearanceProps & {
    /**
     * `search` prepends a search icon. Other input types use the native `type`
     * prop (`text`, `password`, `email`, …).
     */
    mode?: 'default' | 'search';
    /** Shows visibility toggle when `type="password"`. */
    showPasswordToggle?: boolean;
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
};
/**
 * Text field with shared field chrome. Pairs with {@link Label}; colors follow
 * the active theme.
 */
declare const Input: React.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export { Input };
export type { InputProps };
export type { InputVariantProps, FieldAppearanceProps } from './input-variants';
