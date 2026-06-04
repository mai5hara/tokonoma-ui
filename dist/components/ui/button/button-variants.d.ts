import { VariantProps } from 'class-variance-authority';
import { ClassProp } from 'class-variance-authority/types';
/**
 * flat | raised | inset — neumorphism on surface.
 * accent | outline — emphasis without neumorphism.
 * ghost — no border or shadow (icon-only controls, quiet actions).
 * Use size="icon" for square icon-only hit targets (pair with ghost or accent).
 */
export declare const buttonVariants: (props?: ({
    variant?: "flat" | "raised" | "inset" | "accent" | "outline" | "ghost" | null | undefined;
    size?: "xs" | "sm" | "default" | "lg" | "icon" | null | undefined;
} & ClassProp) | undefined) => string;
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
