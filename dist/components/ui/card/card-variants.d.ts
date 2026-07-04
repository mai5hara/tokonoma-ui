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
export declare const cardFooterAlign: {
    readonly end: "justify-end";
    readonly center: "justify-center";
    readonly start: "justify-start";
};
export type CardVariantProps = VariantProps<typeof cardVariants>;
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
export type CardFooterAlign = keyof typeof cardFooterAlign;
