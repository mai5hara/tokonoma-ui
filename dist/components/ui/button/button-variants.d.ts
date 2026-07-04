import { VariantProps } from 'class-variance-authority';
/**
 * flat — neutral secondary: bordered surface-elevated, no shadow (cancel, quiet actions).
 * raised | inset — soft depth on surface.
 * accent — filled primary action.
 * outline — accent secondary: accent border and label, transparent background.
 * ghost — no border or shadow (icon-only controls, quiet actions).
 * Use size="icon" for square icon-only hit targets (pair with ghost or accent).
 */
export declare const buttonVariants: (props?: ({
    variant?: "flat" | "raised" | "inset" | "accent" | "outline" | "ghost" | null | undefined;
    size?: "xs" | "sm" | "default" | "lg" | "icon" | null | undefined;
    rounded?: "sm" | "lg" | "md" | "full" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
