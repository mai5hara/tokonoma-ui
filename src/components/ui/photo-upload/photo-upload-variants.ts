import { cva, type VariantProps } from 'class-variance-authority';

const photoUploadTransition =
  'transition-[box-shadow,border-color,color,--tokonoma-clarify] duration-300 ease-[var(--ease-tokonoma)] motion-reduce:transition-none';

/**
 * Shared upload chrome — mirrors field variants with a taller drop zone.
 */
export const photoUploadVariants = cva(
  [
    'relative flex w-full min-w-0 overflow-hidden text-sm text-text-primary',
    'focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-surface',
    'has-disabled:cursor-not-allowed has-disabled:opacity-50',
    photoUploadTransition,
  ],
  {
    variants: {
      variant: {
        border:
          'border border-border bg-surface-elevated hover:border-border-strong focus-within:border-border-strong focus-within:ring-ring/40',
        inset: [
          'tokonoma-clarify border border-transparent bg-[var(--color-surface-clarified)] shadow-[var(--shadow-button-inset)]',
          'focus-within:ring-ring/40',
        ],
        raised: [
          'tokonoma-clarify border border-transparent shadow-[var(--shadow-button-raised)]',
          '[background:var(--background-gradient-raised)]',
          'focus-within:ring-ring/40',
        ],
        filled: [
          'tokonoma-clarify border border-transparent bg-[var(--color-surface-clarified)]',
          'focus-within:ring-ring/40',
        ],
      },
      invalid: {
        true: '',
        false: '',
      },
      rounded: {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
      empty: {
        true: 'aspect-[5/3] items-center justify-center px-3 py-3',
        false: 'aspect-[5/3] p-0',
      },
    },
    compoundVariants: [
      {
        invalid: true,
        variant: 'border',
        class:
          'border-error hover:border-error focus-within:border-error focus-within:ring-error/40',
      },
      {
        invalid: true,
        variant: 'inset',
        class:
          'border-error shadow-[var(--shadow-button-inset)] focus-within:border-error focus-within:shadow-[var(--shadow-button-inset)] focus-within:ring-error/40',
      },
      {
        invalid: true,
        variant: 'raised',
        class:
          'border border-error focus-within:border-error focus-within:ring-error/40',
      },
      {
        invalid: true,
        variant: 'filled',
        class:
          'border border-error hover:bg-surface focus-within:ring-error/40',
      },
    ],
    defaultVariants: {
      variant: 'border',
      invalid: false,
      rounded: 'md',
      empty: true,
    },
  },
);

export type PhotoUploadVariantProps = VariantProps<typeof photoUploadVariants>;
