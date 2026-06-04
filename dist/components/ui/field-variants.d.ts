import { VariantProps } from 'class-variance-authority';
import { ClassProp } from 'class-variance-authority/types';
/** Shared field chrome for Input, Select, and future controls. */
export declare const fieldVariants: (props?: ({
    variant?: "inset" | "border" | "filled" | null | undefined;
    invalid?: boolean | null | undefined;
} & ClassProp) | undefined) => string;
export type FieldVariantProps = VariantProps<typeof fieldVariants>;
