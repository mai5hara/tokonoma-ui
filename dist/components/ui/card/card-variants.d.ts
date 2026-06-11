import { VariantProps } from 'class-variance-authority';
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
export type CardFooterAlign = keyof typeof cardFooterAlign;
