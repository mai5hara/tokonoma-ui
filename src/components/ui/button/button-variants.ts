import { cva, type VariantProps } from 'class-variance-authority';

const buttonTransition =
  'transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out motion-reduce:transition-none';

/**
 * flat — neutral secondary: bordered surface-elevated, no shadow (cancel, quiet actions).
 * raised | inset — soft depth on surface.
 * accent — filled primary action.
 * outline — accent secondary: accent border and label, transparent background.
 * ghost — no border or shadow (icon-only controls, quiet actions).
 * Use size="icon" for square icon-only hit targets (pair with ghost or accent).
 */
export const buttonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
    buttonTransition,
  ],
  {
    variants: {
      variant: {
        flat: [
          'border border-border bg-surface-elevated text-text-primary',
          'hover:border-border-strong hover:bg-surface hover:text-text-primary',
          'active:scale-[0.98]',
        ],
        raised: [
          '[background:var(--background-gradient-raised)] border border-transparent bg-surface text-text-primary',
          'shadow-[var(--shadow-button-raised)]',
          'hover:-translate-y-px hover:text-text-primary hover:shadow-[var(--shadow-button-raised-hover)]',
          'active:translate-y-0 active:scale-[0.99] active:shadow-[var(--shadow-button-inset)]',
        ],
        inset: [
          'border border-transparent bg-surface text-text-primary',
          'shadow-[var(--shadow-button-inset)]',
          'hover:-translate-y-px hover:text-text-primary hover:shadow-[var(--shadow-button-raised-hover)]',
          'active:translate-y-px active:scale-[0.99] active:shadow-[var(--shadow-button-inset)]',
        ],
        accent: [
          'border border-transparent bg-accent text-surface-elevated',
          'hover:bg-accent-hover hover:text-surface-elevated',
          'active:scale-[0.98]',
        ],
        outline: [
          'border border-accent bg-transparent text-accent',
          'hover:bg-accent/10 hover:text-accent',
          'active:scale-[0.98]',
        ],
        ghost: [
          'border border-transparent bg-transparent text-text-primary',
          'hover:bg-surface',
          'active:opacity-80',
        ],
      },
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-sm',
        default: 'h-9 px-4 text-sm',
        lg: 'h-10 px-5 text-base',
        icon: 'size-8 shrink-0 gap-0 p-0',
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      }
    },
    compoundVariants: [
      {
        size: 'icon',
        variant: 'accent',
        class: 'rounded-md active:scale-[0.98]',
      },
    ],
    defaultVariants: {
      variant: "flat",
      size: "default",
      rounded: "md",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
