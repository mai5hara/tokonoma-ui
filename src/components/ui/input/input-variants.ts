import { cva, type VariantProps } from "class-variance-authority"

const inputTransition =
  "transition-[box-shadow,border-color,background-color,color] duration-200 ease-out motion-reduce:transition-none"

export const inputVariants = cva(
  [
    "flex h-9 w-full min-w-0 items-center gap-2 rounded-md px-3 text-sm text-text-primary",
    "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-surface",
    "disabled:cursor-not-allowed disabled:opacity-50",
    inputTransition,
  ],
  {
    variants: {
      variant: {
        border:
          "border border-border bg-surface-elevated hover:border-border-strong focus-within:border-border-strong focus-within:ring-ring/40",
        inset:
          "border border-transparent bg-surface shadow-[var(--shadow-button-inset)] focus-within:shadow-[var(--shadow-button-raised-hover)] focus-within:ring-ring/40",
        filled:
          "border border-transparent bg-surface text-text-primary hover:bg-surface-elevated focus-within:ring-ring/40",
      },
      invalid: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        invalid: true,
        variant: "border",
        class:
          "border-error hover:border-error focus-within:border-error focus-within:ring-error/40",
      },
      {
        invalid: true,
        variant: "inset",
        class:
          "border-error shadow-[var(--shadow-button-inset)] focus-within:border-error focus-within:shadow-[var(--shadow-button-inset)] focus-within:ring-error/40",
      },
      {
        invalid: true,
        variant: "filled",
        class:
          "border border-error hover:bg-surface focus-within:ring-error/40",
      },
    ],
    defaultVariants: {
      variant: "border",
      invalid: false,
    },
  }
)

export type InputVariantProps = VariantProps<typeof inputVariants>
