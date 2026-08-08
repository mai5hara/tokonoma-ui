import { VariantProps } from 'class-variance-authority';
/**
 * Shared upload chrome — mirrors field variants with a taller drop zone.
 */
export declare const photoUploadVariants: (props?: ({
    variant?: "border" | "filled" | "raised" | "inset" | null | undefined;
    invalid?: boolean | null | undefined;
    rounded?: "sm" | "lg" | "md" | "full" | null | undefined;
    empty?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export type PhotoUploadVariantProps = VariantProps<typeof photoUploadVariants>;
