import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

import { buttonVariants, type ButtonVariantProps } from "./button-variants"

type ButtonProps = React.ComponentProps<"button"> &
  ButtonVariantProps & {
    /** Merge styles onto the single child (e.g. `<a>`) via Radix Slot. */
    asChild?: boolean
  }

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
  ButtonVariantProps & {
    /** Opens in a new tab with safe rel when true or href is http(s). */
    external?: boolean
  }

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
export type { ButtonProps, ButtonLinkProps }
export type { ButtonVariantProps } from "./button-variants"
