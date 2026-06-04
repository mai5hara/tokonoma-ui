import { VariantProps } from 'class-variance-authority';
import { ClassProp } from 'class-variance-authority/types';
export declare const labelVariants: (props?: ({
    size?: "sm" | "default" | null | undefined;
} & ClassProp) | undefined) => string;
export type LabelVariantProps = VariantProps<typeof labelVariants>;
