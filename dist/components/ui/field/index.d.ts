import { ClosedElementProps } from '../../../lib/closed-api';
import { FieldLayoutVariantProps } from './field-layout-variants';
import * as React from 'react';
type FieldProps = ClosedElementProps<React.ComponentProps<'div'>> & {
    /**
     * Stack direction.
     * - `vertical` — label above content (default).
     * - `horizontal` — label beside content.
     */
    orientation?: NonNullable<FieldLayoutVariantProps['orientation']>;
    /** Gap between children. Defaults to `1.5`. */
    gap?: NonNullable<FieldLayoutVariantProps['gap']>;
    /**
     * Cross-axis alignment.
     * Defaults to `stretch` (vertical) / prefer `center` for horizontal rows.
     */
    align?: NonNullable<FieldLayoutVariantProps['align']>;
};
/**
 * Thin layout wrapper for stacking children vertically or horizontally.
 * Compose with {@link Label} and form controls — does not replace them.
 */
declare function Field({ orientation, gap, align, children, ...props }: FieldProps): import("react/jsx-runtime").JSX.Element;
export { Field };
export type { FieldProps };
export type { FieldLayoutVariantProps } from './field-layout-variants';
