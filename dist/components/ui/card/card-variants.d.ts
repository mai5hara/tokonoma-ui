import { VariantProps } from 'class-variance-authority';
/**
 * flat — neutral surface with border only, no depth.
 * raised — soft raised depth on surface.
 * inset — soft inset depth on surface.
 */
export declare const cardVariants: (props?: ({
    variant?: "flat" | "raised" | "inset" | null | undefined;
    size?: "sm" | "default" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const cardSectionVariants: (props?: ({
    direction?: "col" | "row" | null | undefined;
    gap?: "0" | "1" | "2" | "3" | "4" | "6" | "8" | null | undefined;
    align?: "center" | "end" | "start" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export type CardVariantProps = VariantProps<typeof cardVariants>;
export type CardSectionVariantProps = VariantProps<typeof cardSectionVariants>;
export type CardAppearanceProps = {
    /**
     * Surface style.
     * - `flat` — neutral surface with border only, no depth.
     * - `raised` — soft raised depth on `surface`.
     * - `inset` — soft inset depth on `surface`.
     */
    variant?: NonNullable<CardVariantProps['variant']>;
    /**
     * Padding density. `sm` tightens vertical rhythm for dense layouts.
     */
    size?: NonNullable<CardVariantProps['size']>;
};
