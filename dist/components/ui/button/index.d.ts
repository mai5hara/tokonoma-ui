import { ClosedElementProps } from '../../../lib/closed-api';
import { ButtonVariantProps } from './button-variants';
import * as React from 'react';
type ButtonAppearanceProps = {
    /**
     * Surface style.
     * - `flat` — neutral secondary: bordered `surface-elevated`, no depth (e.g. cancel).
     * - `raised` / `inset` — soft depth on `surface`.
     * - `accent` — filled primary action.
     * - `outline` — accent secondary: accent border and label on a transparent background.
     * - `ghost` — borderless, quiet or icon-only actions.
     */
    variant?: NonNullable<ButtonVariantProps['variant']>;
    /**
     * Hit target size. Use `icon` with `ghost` or `accent` for square icon-only
     * buttons (provide `aria-label`).
     */
    size?: NonNullable<ButtonVariantProps['size']>;
    /** Corner radius. Defaults to `md`. */
    rounded?: NonNullable<ButtonVariantProps['rounded']>;
};
type ButtonProps = ClosedElementProps<React.ComponentProps<'button'>> & ButtonAppearanceProps & {
    /** Merge styles onto the single child (e.g. `<a>`) via Radix Slot. */
    asChild?: boolean;
};
/**
 * Primary action control. Colors follow the active theme — choose `variant` and
 * `size`, not palette colors.
 */
declare const Button: React.ForwardRefExoticComponent<Omit<ButtonProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
type ButtonLinkProps = ClosedElementProps<React.ComponentProps<'a'>> & ButtonAppearanceProps & {
    /** Destination URL. Omitted when `aria-disabled` is set. */
    href?: string;
    /** Opens in a new tab with safe `rel` when true or `href` is http(s). */
    external?: boolean;
};
/**
 * Anchor styled as a button. Prefer over `Button asChild` when navigation is the
 * primary action.
 */
declare const ButtonLink: React.ForwardRefExoticComponent<Omit<ButtonLinkProps, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
export { Button, ButtonLink };
export type { ButtonProps, ButtonLinkProps, ButtonAppearanceProps };
export type { ButtonVariantProps } from './button-variants';
