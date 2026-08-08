import { VariantProps } from 'class-variance-authority';
/**
 * Shared field chrome for Input, Select, DateRangePicker, PhotoUpload, and future controls.
 *
 * border — neutral bordered surface-elevated (default).
 * inset — soft inset depth on surface.
 * filled — borderless fill on surface.
 */
export declare const fieldVariants: (props?: ({
    variant?: "border" | "filled" | "raised" | "inset" | null | undefined;
    invalid?: boolean | null | undefined;
    rounded?: "sm" | "lg" | "md" | "full" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export type FieldVariantProps = VariantProps<typeof fieldVariants>;
export type FieldAppearanceProps = {
    /**
     * Field chrome style (shared with Select).
     * - `border` — neutral bordered `surface-elevated` (default).
     * - `inset` — soft inset depth on `surface`.
     * - `filled` — borderless fill on `surface`.
     */
    variant?: NonNullable<FieldVariantProps['variant']>;
    /** Corner radius. Defaults to `md`. */
    rounded?: NonNullable<FieldVariantProps['rounded']>;
};
