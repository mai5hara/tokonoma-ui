import { ClosedElementProps } from '../../../lib/closed-api';
import { FieldAppearanceProps } from './textarea-variants';
import * as React from 'react';
type TextareaProps = ClosedElementProps<React.ComponentProps<'textarea'>> & FieldAppearanceProps & {
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
    /** Whether the textarea can be resized. Defaults to `vertical`. */
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
};
/**
 * Multi-line text field with shared field chrome.
 * Pairs with {@link Label}; colors follow the active theme.
 */
declare const Textarea: React.ForwardRefExoticComponent<Omit<TextareaProps, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea };
export type { TextareaProps };
export type { TextareaVariantProps, FieldAppearanceProps, } from './textarea-variants';
