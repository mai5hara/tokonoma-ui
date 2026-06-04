import { VariantProps } from 'class-variance-authority';
import { ClassProp } from 'class-variance-authority/types';
export declare const cardVariants: (props?: ({
    variant?: "flat" | "raised" | "inset" | null | undefined;
    size?: "sm" | "default" | null | undefined;
} & ClassProp) | undefined) => string;
export declare const cardFooterAlign: {
    readonly end: "justify-end";
    readonly center: "justify-center";
    readonly start: "justify-start";
};
export type CardVariantProps = VariantProps<typeof cardVariants>;
export type CardFooterAlign = keyof typeof cardFooterAlign;
