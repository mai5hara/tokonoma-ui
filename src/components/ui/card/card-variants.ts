import { cva, type VariantProps } from 'class-variance-authority';

const cardTransition =
  'transition-[box-shadow,border-color,background-color] duration-300 ease-[var(--ease-tokonoma)] motion-reduce:transition-none';

/**
 * flat — border only at rest; interactive hover/focus softens the line into depth.
 * raised — soft raised depth on surface.
 * inset — soft inset depth on surface.
 */
export const cardVariants = cva(
  [
    'group/card flex w-full flex-col overflow-hidden rounded-lg text-sm text-text-primary',
    cardTransition,
  ],
  {
    variants: {
      variant: {
        flat: 'border border-border bg-surface-elevated shadow-[var(--shadow-card-flat)]',
        raised:
          '[background:var(--background-gradient-raised)] shadow-[var(--shadow-card-raised)]',
        inset: 'bg-surface shadow-[var(--shadow-card-inset)]',
      },
      size: {
        default: 'gap-6 py-6',
        sm: 'gap-4 py-4',
      },
      /**
       * Clickable card — pointer, inset focus ring, and depth on hover/focus.
       * Non-interactive stays still.
       */
      interactive: {
        true: [
          'cursor-pointer outline-none',
          'focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset',
        ],
        false: '',
      },
    },
    compoundVariants: [
      {
        interactive: true,
        variant: 'flat',
        class: [
          'hover:border-transparent hover:shadow-[var(--shadow-card-flat-hover)]',
          'focus-visible:border-transparent focus-visible:shadow-[var(--shadow-card-flat-hover)]',
        ],
      },
      {
        interactive: true,
        variant: 'raised',
        class: [
          'hover:shadow-[var(--shadow-card-raised-hover)]',
          'focus-visible:shadow-[var(--shadow-card-raised-hover)]',
        ],
      },
      {
        interactive: true,
        variant: 'inset',
        class: [
          'hover:shadow-[var(--shadow-card-inset-hover)]',
          'focus-visible:shadow-[var(--shadow-card-inset-hover)]',
        ],
      },
    ],
    defaultVariants: {
      variant: 'flat',
      size: 'default',
      interactive: false,
    },
  },
);

export const cardSectionVariants = cva(
  'flex min-w-0 px-6 group-data-[size=sm]/card:px-4',
  {
    variants: {
      direction: {
        col: 'flex-col',
        row: 'flex-row flex-wrap items-center',
      },
      gap: {
        '0': 'gap-0',
        '1': 'gap-1',
        '2': 'gap-2',
        '3': 'gap-3',
        '4': 'gap-4',
        '6': 'gap-6',
        '8': 'gap-8',
      },
      align: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
      },
    },
    defaultVariants: {
      direction: 'col',
      gap: '0',
      align: 'start',
    },
  },
);

export type CardVariantProps = VariantProps<typeof cardVariants>;
export type CardSectionVariantProps = VariantProps<typeof cardSectionVariants>;

/** Shared surface props for `Card` and `CardLink`. */
export type CardSurfaceProps = {
  /**
   * Surface style.
   * - `flat` — border only at rest; interactive hover softens into soft depth.
   * - `raised` — soft raised depth on `surface`.
   * - `inset` — soft inset depth on `surface`.
   */
  variant?: NonNullable<CardVariantProps['variant']>;
  /**
   * Padding density. `sm` tightens vertical rhythm for dense layouts.
   */
  size?: NonNullable<CardVariantProps['size']>;
};

export type CardAppearanceProps = CardSurfaceProps & {
  /**
   * When true, the card is a clickable surface: pointer cursor, inset focus ring,
   * and depth on hover/focus. When false (default), the card stays still.
   * For navigation, prefer `CardLink` instead.
   */
  interactive?: boolean;
};
