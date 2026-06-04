import { CardFooterAlign, CardVariantProps } from './card-variants';
import * as React from "react";
type CardProps = React.ComponentProps<"div"> & CardVariantProps;
declare function Card({ className, variant, size, ...props }: CardProps): React.JSX.Element;
type CardHeaderProps = React.ComponentProps<"div"> & {
    /** Top-right controls (buttons, menus, links). */
    action?: React.ReactNode;
};
declare function CardHeader({ className, action, children, ...props }: CardHeaderProps): React.JSX.Element;
declare function CardTitle({ className, as: Comp, ...props }: React.ComponentProps<"h3"> & {
    as?: "h2" | "h3" | "h4" | "div";
}): React.JSX.Element;
declare function CardDescription({ className, ...props }: React.ComponentProps<"p">): React.JSX.Element;
declare function CardContent({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
type CardFooterProps = React.ComponentProps<"div"> & {
    align?: CardFooterAlign;
};
declare function CardFooter({ className, align, ...props }: CardFooterProps): React.JSX.Element;
/** Place first to bleed media to the top; top corners follow Card rounded-lg. */
declare function CardMedia({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardMedia, };
export type { CardProps, CardHeaderProps, CardFooterProps };
export type { CardFooterAlign } from './card-variants';
