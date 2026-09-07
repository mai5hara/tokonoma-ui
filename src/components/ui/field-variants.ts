import { cva, type VariantProps } from 'class-variance-authority';

const fieldTransition =
  'transition-[box-shadow,border-color,color,--tokonoma-clarify] duration-300 ease-[var(--ease-tokonoma)] motion-reduce:transition-none';

/**
 * Shared field chrome for Input, Select, DateRangePicker, PhotoUpload, and future controls.
 *
 * border — neutral bordered surface-elevated (default).
 * inset — soft inset depth on surface.
 * filled — borderless fill on surface.
 */
export const fieldVariants = cva(
  [
    'flex h-9 w-full min-w-0 items-center gap-2 px-3 text-sm text-text-primary',
    'focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-surface',
    'has-disabled:cursor-not-allowed has-disabled:opacity-50',
    fieldTransition,
  ],
  {
    variants: {
      variant: {
        border:
          'border border-border bg-surface-elevated hover:border-border-strong focus-within:border-border-strong focus-within:ring-ring/40',
        inset: [
          'tokonoma-clarify border border-transparent bg-[var(--color-surface-clarified)] shadow-[var(--shadow-inset)]',
          'focus-within:ring-ring/40',
        ],
        raised: [
          'tokonoma-clarify border border-transparent shadow-[var(--shadow-raised)]',
          '[background:var(--background-gradient-raised)]',
          'focus-within:ring-ring/40',
        ],
        filled: [
          'tokonoma-clarify border border-transparent bg-[var(--color-surface-clarified)] text-text-primary',
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
          'border-error shadow-[var(--shadow-inset)] focus-within:border-error focus-within:shadow-[var(--shadow-inset)] focus-within:ring-error/40',
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
    },
  },
);

export type FieldVariantProps = VariantProps<typeof fieldVariants>;

export type FieldAppearanceProps = {
  /**
   * Field chrome style (shared with Select).
   * - `border` — neutral bordered `surface-elevated` (default).
   * - `inset` — soft inset depth on `surface`.
   * - `filled` — borderless fill on `surface`.
   */
  variant?: NonNullable<FieldVariantProps['variant']>;
  /** Corner radius. Defaults to `md`. */
  rounded?: NonNullable<FieldVariantProps['rounded']>;
};
