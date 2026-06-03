import { cva, type VariantProps } from "class-variance-authority"

export const labelVariants = cva(
  "inline-flex cursor-pointer items-center gap-1 font-medium text-text-primary",
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export type LabelVariantProps = VariantProps<typeof labelVariants>
