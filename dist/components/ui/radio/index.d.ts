import { ClosedElementProps } from '../../../lib/closed-api';
import { RadioGroupVariantProps, RadioItemVariantProps } from './radio-variants';
import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
type RadioAppearanceProps = {
    /**
     * Option chrome.
     * - `plain` — radio circle + label only (default).
     * - `border` — radio and label enclosed in a border.
     * - `filled` — borderless fill on `surface`.
     * - `inset` — soft inset depth on `surface`.
     */
    variant?: NonNullable<RadioItemVariantProps['variant']>;
    /** Control and label density. */
    size?: NonNullable<RadioItemVariantProps['size']>;
};
type RadioGroupProps = ClosedElementProps<React.ComponentProps<typeof RadioGroupPrimitive.Root>> & {
    /** Layout direction for options. Defaults to `vertical`. */
    orientation?: NonNullable<RadioGroupVariantProps['orientation']>;
    /** Gap between options. Defaults to `3`. */
    gap?: NonNullable<RadioGroupVariantProps['gap']>;
    /** Default option chrome for child {@link Radio} items. */
    variant?: RadioAppearanceProps['variant'];
    /** Default size for child {@link Radio} items. */
    size?: RadioAppearanceProps['size'];
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
};
/** Mutually exclusive option group. Compose with {@link Radio}. */
declare const RadioGroup: React.ForwardRefExoticComponent<Omit<RadioGroupProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
type RadioProps = ClosedElementProps<Omit<React.ComponentProps<typeof RadioGroupPrimitive.Item>, 'children'>> & RadioAppearanceProps & {
    /** Label content shown beside the radio control. */
    children: React.ReactNode;
    /** Optional supporting text under the label. */
    description?: React.ReactNode;
};
/** Single option inside a {@link RadioGroup}. */
declare const Radio: React.ForwardRefExoticComponent<Omit<RadioProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export { RadioGroup, Radio };
export type { RadioGroupProps, RadioProps, RadioAppearanceProps, RadioItemVariantProps, RadioGroupVariantProps, };
