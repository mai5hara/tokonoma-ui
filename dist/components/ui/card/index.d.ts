import { ClosedElementProps } from '../../../lib/closed-api';
import { CardAppearanceProps, CardFooterAlign } from './card-variants';
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
declare function CardContent(props: ClosedElementProps<React.ComponentProps<'div'>>): import("react/jsx-runtime").JSX.Element;
type CardFooterProps = ClosedElementProps<React.ComponentProps<'div'>> & {
    /** Horizontal alignment of footer content. */
    align?: CardFooterAlign;
};
declare function CardFooter({ align, ...props }: CardFooterProps): import("react/jsx-runtime").JSX.Element;
/** Place first to bleed media to the top; top corners follow Card rounded-lg. */
declare function CardMedia(props: ClosedElementProps<React.ComponentProps<'div'>>): import("react/jsx-runtime").JSX.Element;
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardMedia, };
export type { CardProps, CardHeaderProps, CardFooterProps, CardAppearanceProps, };
export type { CardFooterAlign } from './card-variants';
