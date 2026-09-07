import { cva, type VariantProps } from 'class-variance-authority';

const radioTransition =
  'transition-[box-shadow,border-color,background-color,color,--tokonoma-clarify] duration-300 ease-[var(--ease-tokonoma)] motion-reduce:transition-none';

/**
 * plain — radio circle + label only (default).
 * border — option enclosed in a neutral border.
 * filled — borderless fill on surface.
 * inset — soft inset depth on surface.
 */
export const radioItemVariants = cva(
  [
    'group/radio flex cursor-pointer items-start gap-2.5 text-left text-sm text-text-primary',
    'focus-within:outline-none',
    'has-disabled:cursor-not-allowed has-disabled:opacity-50',
    radioTransition,
  ],
  {
    variants: {
      variant: {
        plain: 'bg-transparent p-0',
        border: [
          'rounded-md border border-border bg-surface-elevated px-3 py-2.5',
          'hover:border-border-strong',
          'has-[[data-state=checked]]:border-accent has-[[data-state=checked]]:bg-accent/1',
        ],
        filled: [
          'tokonoma-clarify rounded-md border border-transparent bg-[var(--color-surface-clarified)] px-3 py-2.5',
          'has-[[data-state=checked]]:bg-accent/10',
        ],
        inset: [
          'tokonoma-clarify rounded-md border border-transparent bg-[var(--color-surface-clarified)] px-3 py-2.5',
          'shadow-[var(--shadow-inset)]',
          'has-[[data-state=checked]]:bg-accent/4',
        ],
      },
      size: {
        sm: 'text-xs',
        default: 'text-sm',
      },
      invalid: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'plain',
        size: 'sm',
        class: 'gap-2',
      },
      {
        variant: ['border', 'filled', 'inset'],
        size: 'sm',
        class: 'gap-2 px-2.5 py-2',
      },
      {
        invalid: true,
        variant: 'border',
        class: 'border-error hover:border-error',
      },
      {
        invalid: true,
        variant: 'filled',
        class: 'border border-error',
      },
      {
        invalid: true,
        variant: 'inset',
        class: 'border border-error',
      },
    ],
    defaultVariants: {
      variant: 'plain',
      size: 'default',
      invalid: false,
    },
  },
);

export const radioControlVariants = cva(
  [
    'flex shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated',
    'outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
    'data-[state=checked]:border-accent data-[state=checked]:bg-surface-elevated',
    'disabled:cursor-not-allowed',
    radioTransition,
  ],
  {
    variants: {
      size: {
        sm: 'size-4.5',
        default: 'size-5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export const radioIndicatorVariants = cva('rounded-full bg-accent', {
  variants: {
    size: {
      sm: 'size-2.5',
      default: 'size-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export const radioGroupVariants = cva('flex', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row flex-wrap',
    },
    gap: {
      '1': 'gap-1',
      '2': 'gap-2',
      '3': 'gap-3',
      '4': 'gap-4',
      '6': 'gap-6',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    gap: '3',
  },
});

export type RadioItemVariantProps = VariantProps<typeof radioItemVariants>;
export type RadioGroupVariantProps = VariantProps<typeof radioGroupVariants>;
