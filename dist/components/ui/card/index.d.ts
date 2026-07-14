import { ClosedElementProps } from '../../../lib/closed-api';
import { CardAppearanceProps, CardSectionVariantProps } from './card-variants';
import * as React from 'react';
type CardProps = ClosedElementProps<React.ComponentProps<'div'>> & CardAppearanceProps;
/** Content container with header, body, footer, and optional media slots. */
declare function Card({ variant, size, ...props }: CardProps): import("react/jsx-runtime").JSX.Element;
type CardHeaderProps = ClosedElementProps<React.ComponentProps<'div'>> & {
    /** Top-right controls (buttons, menus, links). */
    action?: React.ReactNode;
};
/** Title row with optional `action` slot in the top-right corner. */
declare function CardHeader({ action, children, ...props }: CardHeaderProps): import("react/jsx-runtime").JSX.Element;
declare function CardTitle({ as: Comp, ...props }: ClosedElementProps<React.ComponentProps<'h3'>> & {
    /** Heading element. Defaults to `h3`. */
    as?: 'h2' | 'h3' | 'h4' | 'div';
}): import("react/jsx-runtime").JSX.Element;
declare function CardDescription(props: ClosedElementProps<React.ComponentProps<'p'>>): import("react/jsx-runtime").JSX.Element;
type CardContentProps = ClosedElementProps<React.ComponentProps<'div'>> & {
    /** Flex direction for children. Defaults to `col`. */
    direction?: NonNullable<CardSectionVariantProps['direction']>;
    /**
     * Gap between children (Tailwind scale). Defaults to `0`.
     * Maps to `gap-0` … `gap-8`.
     */
    gap?: NonNullable<CardSectionVariantProps['gap']>;
};
/** Main body slot. Use `direction` and `gap` to lay out multiple children. */
declare function CardContent({ direction, gap, ...props }: CardContentProps): import("react/jsx-runtime").JSX.Element;
type CardFooterProps = ClosedElementProps<React.ComponentProps<'div'>> & {
    /** Flex direction for children. Defaults to `row`. */
    direction?: NonNullable<CardSectionVariantProps['direction']>;
    /**
     * Gap between children (Tailwind scale). Defaults to `3`.
     * Maps to `gap-0` … `gap-8`.
     */
    gap?: NonNullable<CardSectionVariantProps['gap']>;
    /** Main-axis alignment when `direction="row"`. Defaults to `start`. */
    align?: NonNullable<CardSectionVariantProps['align']>;
};
/** Footer slot for actions. Defaults to a horizontal row with `gap="3"`. */
declare function CardFooter({ direction, gap, align, ...props }: CardFooterProps): import("react/jsx-runtime").JSX.Element;
/** Place first to bleed media to the top; top corners follow Card rounded-lg. */
declare function CardMedia(props: ClosedElementProps<React.ComponentProps<'div'>>): import("react/jsx-runtime").JSX.Element;
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardMedia, };
export type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps, CardAppearanceProps, };
