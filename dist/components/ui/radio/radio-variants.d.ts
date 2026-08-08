import { VariantProps } from 'class-variance-authority';
/**
 * plain — radio circle + label only (default).
 * border — option enclosed in a neutral border.
 * filled — borderless fill on surface.
 * inset — soft inset depth on surface.
 */
export declare const radioItemVariants: (props?: ({
    variant?: "border" | "filled" | "inset" | "plain" | null | undefined;
    size?: "sm" | "default" | null | undefined;
    invalid?: boolean | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const radioControlVariants: (props?: ({
    size?: "sm" | "default" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const radioIndicatorVariants: (props?: ({
    size?: "sm" | "default" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const radioGroupVariants: (props?: ({
    orientation?: "horizontal" | "vertical" | null | undefined;
    gap?: "1" | "2" | "3" | "4" | "6" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export type RadioItemVariantProps = VariantProps<typeof radioItemVariants>;
export type RadioGroupVariantProps = VariantProps<typeof radioGroupVariants>;
