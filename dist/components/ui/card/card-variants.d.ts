import { VariantProps } from 'class-variance-authority';
/**
 * flat — border only at rest; interactive hover/focus softens the line into depth.
 * raised — soft raised depth on surface.
 * inset — soft inset depth on surface.
 */
export declare const cardVariants: (props?: ({
    variant?: "flat" | "raised" | "inset" | null | undefined;
    size?: "sm" | "default" | null | undefined;
    interactive?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const cardSectionVariants: (props?: ({
    direction?: "col" | "row" | null | undefined;
    gap?: "0" | "1" | "2" | "3" | "4" | "6" | "8" | null | undefined;
    align?: "center" | "end" | "start" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export type CardVariantProps = VariantProps<typeof cardVariants>;
export type CardSectionVariantProps = VariantProps<typeof cardSectionVariants>;
/** Shared surface props for `Card` and `CardLink`. */
export type CardSurfaceProps = {
    /**
     * Surface style.
     * - `flat` — border only at rest; interactive hover softens into soft depth.
     * - `raised` — soft raised depth on `surface`.
     * - `inset` — soft inset depth on `surface`.
     */
    variant?: NonNullable<CardVariantProps['variant']>;
    /**
     * Padding density. `sm` tightens vertical rhythm for dense layouts.
     */
    size?: NonNullable<CardVariantProps['size']>;
};
export type CardAppearanceProps = CardSurfaceProps & {
    /**
     * When true, the card is a clickable surface: pointer cursor, inset focus ring,
     * and depth on hover/focus. When false (default), the card stays still.
     * For navigation, prefer `CardLink` instead.
     */
    interactive?: boolean;
};
