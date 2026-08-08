import { VariantProps } from 'class-variance-authority';
/**
 * Layout wrapper for label + content (and other stacked rows).
 * Not the shared input chrome in `../field-variants`.
 */
export declare const fieldLayoutVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
    gap?: "0" | "1" | "2" | "3" | "4" | "6" | "8" | "1.5" | null | undefined;
    align?: "center" | "end" | "start" | "stretch" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export type FieldLayoutVariantProps = VariantProps<typeof fieldLayoutVariants>;
