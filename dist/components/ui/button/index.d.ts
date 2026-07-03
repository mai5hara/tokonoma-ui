import { ButtonVariantProps } from './button-variants';
import * as React from "react";
type ButtonProps = React.ComponentProps<"button"> & ButtonVariantProps & {
    /** Merge styles onto the single child (e.g. `<a>`) via Radix Slot. */
    asChild?: boolean;
};
declare const Button: React.ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
type ButtonLinkProps = React.ComponentProps<"a"> & ButtonVariantProps & {
    /** Opens in a new tab with safe rel when true or href is http(s). */
    external?: boolean;
};
declare const ButtonLink: React.ForwardRefExoticComponent<Omit<ButtonLinkProps, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
export { Button, ButtonLink };
export type { ButtonProps, ButtonLinkProps };
export type { ButtonVariantProps } from './button-variants';
