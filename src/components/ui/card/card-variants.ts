import { cva, type VariantProps } from "class-variance-authority"

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

export type CardVariantProps = VariantProps<typeof cardVariants>