import { cva, type VariantProps } from 'class-variance-authority';

/**
 * flat — neutral surface with border only, no depth.
 * raised — soft raised depth on surface.
 * inset — soft inset depth on surface.
 */
export const cardVariants = cva(
  'group/card flex flex-col overflow-hidden rounded-lg text-sm text-text-primary',
  {
    variants: {
      variant: {
        flat: 'border border-border bg-surface-elevated',
        raised: [
          '[background:var(--background-gradient-raised)] shadow-[var(--shadow-card-raised)]',
        ],
        inset: 'bg-surface shadow-[var(--shadow-card-inset)]',
      },
      size: {
        default: 'gap-6 py-6',
        sm: 'gap-4 py-4',
      },
    },
    defaultVariants: {
      variant: 'flat',
      size: 'default',
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

export type CardAppearanceProps = {
  /**
   * Surface style.
   * - `flat` — neutral surface with border only, no depth.
   * - `raised` — soft raised depth on `surface`.
   * - `inset` — soft inset depth on `surface`.
   */
  variant?: NonNullable<CardVariantProps['variant']>;
  /**
   * Padding density. `sm` tightens vertical rhythm for dense layouts.
   */
  size?: NonNullable<CardVariantProps['size']>;
};
