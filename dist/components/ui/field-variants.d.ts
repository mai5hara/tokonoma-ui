import { VariantProps } from 'class-variance-authority';
/** Shared field chrome for Input, Select, and future controls. */
export declare const fieldVariants: (props?: ({
    variant?: "inset" | "border" | "filled" | null | undefined;
    invalid?: boolean | null | undefined;
    rounded?: "sm" | "lg" | "md" | "full" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export type FieldVariantProps = VariantProps<typeof fieldVariants>;
