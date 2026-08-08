import { VariantProps } from 'class-variance-authority';
/**
 * border — framed group (default).
 * underline — hairline dividers only, no fill.
 * filled — separate elevated blocks with gap (no shared outer frame).
 * accent — accent-filled triggers with elevated content panels.
 */
export declare const accordionRootVariants: (props?: ({
    variant?: "border" | "underline" | "filled" | "accent" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const accordionItemVariants: (props?: ({
    variant?: "border" | "underline" | "filled" | "accent" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const accordionTriggerVariants: (props?: ({
    variant?: "border" | "underline" | "filled" | "accent" | null | undefined;
    size?: "sm" | "default" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const accordionContentVariants: (props?: ({
    size?: "sm" | "default" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const accordionContentInnerVariants: (props?: ({
    variant?: "border" | "underline" | "filled" | "accent" | null | undefined;
    size?: "sm" | "default" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export declare const accordionIndicatorVariants: (props?: ({
    variant?: "border" | "underline" | "filled" | "accent" | null | undefined;
    indicator?: "chevron" | "plus" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export type AccordionVariantProps = VariantProps<typeof accordionRootVariants>;
export type AccordionTriggerVariantProps = VariantProps<typeof accordionTriggerVariants>;
export type AccordionIndicatorVariantProps = VariantProps<typeof accordionIndicatorVariants>;
