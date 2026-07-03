import { cva, type VariantProps } from "class-variance-authority"

/**
 * flat — neutral surface with border only, no depth.
 * raised — soft raised depth on surface.
 * inset — soft inset depth on surface.
 */
export const cardVariants = cva(
  "group/card flex flex-col overflow-hidden rounded-lg text-sm text-text-primary",
  {
    variants: {
      variant: {
        flat: "border border-border bg-surface-elevated",
        raised: [
          "[background:var(--background-gradient-raised)] shadow-[var(--shadow-card-raised)]",
        ],
        inset: "bg-surface shadow-[var(--shadow-card-inset)]",
      },
      size: {
        default: "gap-6 py-6",
        sm: "gap-4 py-4",
      },
    },
    defaultVariants: {
      variant: "flat",
      size: "default",
    },
  }
)

export const cardFooterAlign = {
  end: "justify-end",
  center: "justify-center",
  start: "justify-start",
} as const

export type CardVariantProps = VariantProps<typeof cardVariants>

export type CardAppearanceProps = {
  /**
   * Surface style.
   * - `flat` — neutral surface with border only, no depth.
   * - `raised` — soft raised depth on `surface`.
   * - `inset` — soft inset depth on `surface`.
   */
  variant?: NonNullable<CardVariantProps["variant"]>
  /**
   * Padding density. `sm` tightens vertical rhythm for dense layouts.
   */
  size?: NonNullable<CardVariantProps["size"]>
}
export type CardFooterAlign = keyof typeof cardFooterAlign