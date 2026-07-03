import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

import { buttonVariants, type ButtonVariantProps } from "./button-variants"

type ButtonAppearanceProps = {
  /**
   * Surface style.
   * - `flat` — neutral secondary: bordered `surface-elevated`, no depth (e.g. cancel).
   * - `raised` / `inset` — soft depth on `surface`.
   * - `accent` — filled primary action.
   * - `outline` — accent secondary: accent border and label on a transparent background.
   * - `ghost` — borderless, quiet or icon-only actions.
   */
  variant?: NonNullable<ButtonVariantProps["variant"]>
  /**
   * Hit target size. Use `icon` with `ghost` or `accent` for square icon-only
   * buttons (provide `aria-label`).
   */
  size?: NonNullable<ButtonVariantProps["size"]>
}

type ButtonProps = React.ComponentProps<"button"> &
  ButtonAppearanceProps & {
    /** Merge styles onto the single child (e.g. `<a>`) via Radix Slot. */
    asChild?: boolean
  }

/**
 * Primary action control. Colors follow the active theme — choose `variant` and
 * `size`, not palette colors.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type = "button", ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

type ButtonLinkProps = React.ComponentProps<"a"> &
  ButtonAppearanceProps & {
    /** Opens in a new tab with safe `rel` when true or `href` is http(s). */
    external?: boolean
  }

/**
 * Anchor styled as a button. Prefer over `Button asChild` when navigation is the
 * primary action.
 */
const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      className,
      variant,
      size,
      external,
      href,
      target,
      rel,
      "aria-disabled": ariaDisabled,
      ...props
    },
    ref
  ) => {
    const isExternal =
      external ?? (typeof href === "string" && /^https?:\/\//.test(href))
    const isDisabled = ariaDisabled === true || ariaDisabled === "true"

    return (
      <a
        ref={ref}
        href={isDisabled ? undefined : href}
        target={isExternal ? "_blank" : target}
        rel={
          isExternal
            ? [rel, "noopener", "noreferrer"].filter(Boolean).join(" ")
            : rel
        }
        aria-disabled={ariaDisabled}
        tabIndex={isDisabled ? -1 : props.tabIndex}
        data-variant={variant}
        data-size={size}
        className={cn(
          buttonVariants({ variant, size }),
          isDisabled && "pointer-events-none opacity-50",
          className
        )}
        onClick={
          isDisabled
            ? (event) => {
                event.preventDefault()
                props.onClick?.(event)
              }
            : props.onClick
        }
        {...props}
      />
    )
  }
)
ButtonLink.displayName = "ButtonLink"

export { Button, ButtonLink }
export type { ButtonProps, ButtonLinkProps, ButtonAppearanceProps }
export type { ButtonVariantProps } from "./button-variants"
