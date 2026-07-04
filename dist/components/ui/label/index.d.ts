import { LabelVariantProps } from './label-variants';
import * as React from 'react';
type LabelAppearanceProps = {
    /** Label text size. `sm` matches compact fields. */
    size?: NonNullable<LabelVariantProps['size']>;
};
type LabelProps = Omit<React.ComponentProps<'label'>, 'children' | 'className'> & LabelAppearanceProps & {
    children: React.ReactNode;
    /** ID of the associated form control (`htmlFor`). */
    htmlFor: string;
    /** Renders a required marker (`*`) after the label text. */
    required?: boolean;
};
/**
 * Accessible form label. Always pair with a control via `htmlFor` / `id`.
 */
declare const Label: React.ForwardRefExoticComponent<Omit<LabelProps, "ref"> & React.RefAttributes<HTMLLabelElement>>;
export { Label };
export type { LabelProps, LabelVariantProps, LabelAppearanceProps };
