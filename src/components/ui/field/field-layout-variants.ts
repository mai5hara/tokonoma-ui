import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Layout wrapper for label + content (and other stacked rows).
 * Not the shared input chrome in `../field-variants`.
 */
export const fieldLayoutVariants = cva('flex w-full min-w-0', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal:
        'flex-row [&>*:first-child]:shrink-0 [&>*:last-child]:min-w-0 [&>*:last-child]:flex-1',
    },
    gap: {
      '0': 'gap-0',
      '1': 'gap-1',
      '1.5': 'gap-1.5',
      '2': 'gap-2',
      '3': 'gap-3',
      '4': 'gap-4',
      '6': 'gap-6',
      '8': 'gap-8',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
    gap: '1.5',
    align: 'stretch',
  },
});

export type FieldLayoutVariantProps = VariantProps<typeof fieldLayoutVariants>;
