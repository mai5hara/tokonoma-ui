import { ClosedElementProps } from '../../../lib/closed-api';
import { CardAppearanceProps, CardSectionVariantProps, CardSurfaceProps } from './card-variants';
import * as React from 'react';
type CardProps = ClosedElementProps<React.ComponentProps<'div'>> & CardAppearanceProps;
/** Content container with header, body, footer, and optional media slots. */
declare function Card({ variant, size, interactive, tabIndex, ...props }: CardProps): import("react/jsx-runtime").JSX.Element;
type CardLinkProps = ClosedElementProps<React.ComponentProps<'a'>> & CardSurfaceProps & {
    /** Destination URL. Omitted when `aria-disabled` is set. */
    href?: string;
    /** Opens in a new tab with safe `rel` when true or `href` is http(s). */
    external?: boolean;
};
/**
 * Anchor styled as a card. Prefer over wrapping `Card` when navigation is the
 * primary action. Always uses interactive depth hover/focus. Shares `variant`
 * and `size` with {@link Card}.
 */
declare const CardLink: React.ForwardRefExoticComponent<Omit<CardLinkProps, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
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
/**
 * Place first to bleed media to the top; top corners follow Card rounded-lg.
 * Frame is a fixed 5∶3 ratio (same as PhotoUpload) so gallery cards share height.
 */
declare function CardMedia(props: ClosedElementProps<React.ComponentProps<'div'>>): import("react/jsx-runtime").JSX.Element;
export { Card, CardLink, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardMedia, };
export type { CardProps, CardLinkProps, CardHeaderProps, CardContentProps, CardFooterProps, CardAppearanceProps, CardSurfaceProps, };
