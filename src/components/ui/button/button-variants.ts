import { cva, type VariantProps } from 'class-variance-authority';

const buttonTransition =
  'transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-[var(--ease-tokonoma)] motion-reduce:transition-none';

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
    'relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden font-medium',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'disabled:pointer-events-none disabled:opacity-50',
    'aria-disabled:pointer-events-none aria-disabled:opacity-50',
    buttonTransition,
  ],
  {
    variants: {
      variant: {
        flat: [
          'border border-border bg-surface-elevated text-text-primary',
          'hover:border-border-strong hover:bg-surface hover:text-text-primary',
          'active:bg-[color-mix(in_oklab,var(--color-text-primary)_8%,var(--color-surface))]',
        ],
        raised: [
          '[background:var(--background-gradient-raised)] border border-transparent bg-surface text-text-primary',
          'shadow-[var(--shadow-raised)]',
          'active:shadow-[var(--shadow-inset-active)]',
        ],
        inset: [
          'border border-transparent bg-surface text-text-primary',
          'shadow-[var(--shadow-inset)]',
          'active:shadow-[var(--shadow-inset-active)]',
        ],
        accent: [
          'border border-transparent bg-accent text-surface-elevated',
          'hover:bg-accent-hover hover:text-surface-elevated',
          'active:bg-accent-hover active:shadow-[var(--shadow-inset-active)]',
        ],
        outline: [
          'border border-accent bg-transparent text-accent',
          'hover:bg-accent/10 hover:text-accent',
          'active:bg-accent/20',
        ],
        ghost: [
          'border border-transparent bg-transparent text-text-primary',
          'hover:opacity-70 duration-300 transition-opacity',
          'active:bg-[color-mix(in_oklab,var(--color-text-primary)_8%,var(--color-surface))]',
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
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
      width: {
        auto: 'w-auto',
        full: 'w-full',
      },
    },
    compoundVariants: [
      {
        size: 'icon',
        variant: 'accent',
        class: 'rounded-md',
      },
    ],
    defaultVariants: {
      variant: 'flat',
      size: 'default',
      rounded: 'md',
      width: 'auto',
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
