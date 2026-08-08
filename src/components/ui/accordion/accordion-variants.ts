import { cva, type VariantProps } from 'class-variance-authority';

const accordionTransition =
  'transition-[background-color,border-color,box-shadow,color] duration-200 ease-out motion-reduce:transition-none';

/**
 * border — framed group (default).
 * underline — hairline dividers only, no fill.
 * filled — separate elevated blocks with gap (no shared outer frame).
 * accent — accent-filled triggers with elevated content panels.
 */
export const accordionRootVariants = cva('w-full text-sm text-text-primary', {
  variants: {
    variant: {
      border:
        'overflow-hidden rounded-md border border-border bg-surface-elevated',
      underline: 'bg-transparent',
      filled: 'flex flex-col gap-2 bg-transparent',
      accent: 'flex flex-col gap-2 bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'border',
  },
});

export const accordionItemVariants = cva('min-w-0', {
  variants: {
    variant: {
      border: 'border-b border-border last:border-b-0',
      underline: 'border-b border-border last:border-b-0',
      filled:
        'overflow-hidden rounded-md bg-surface-elevated data-[state=open]:bg-accent/[0.04]',
      accent: 'overflow-hidden rounded-md',
    },
  },
  defaultVariants: {
    variant: 'border',
  },
});

export const accordionTriggerVariants = cva(
  [
    'flex w-full items-center justify-between gap-3 text-left font-medium',
    'outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset',
    'disabled:pointer-events-none disabled:opacity-50',
    accordionTransition,
  ],
  {
    variants: {
      variant: {
        border: 'bg-transparent px-4 py-3 hover:bg-surface/60',
        underline:
          'bg-transparent px-0 py-3 hover:bg-transparent hover:text-text-primary',
        filled: 'bg-transparent px-4 py-3 hover:bg-surface',
        accent:
          'bg-accent px-4 py-3 text-surface-elevated hover:bg-accent-hover',
      },
      size: {
        sm: 'py-2 text-xs',
        default: 'py-3 text-sm',
      },
    },
    compoundVariants: [
      {
        variant: 'border',
        size: 'sm',
        class: 'px-3',
      },
      {
        variant: 'filled',
        size: 'sm',
        class: 'px-3',
      },
      {
        variant: 'accent',
        size: 'sm',
        class: 'px-3',
      },
      {
        variant: 'underline',
        size: 'sm',
        class: 'px-0',
      },
      {
        variant: 'underline',
        size: 'default',
        class: 'px-0',
      },
    ],
    defaultVariants: {
      variant: 'border',
      size: 'default',
    },
  },
);

export const accordionContentVariants = cva(
  'overflow-hidden text-text-muted data-[state=closed]:animate-none',
  {
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-sm',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export const accordionContentInnerVariants = cva('text-text-muted', {
  variants: {
    variant: {
      border: 'px-4 pb-4',
      underline: 'px-0 pb-4',
      filled: 'px-4 pb-4',
      accent: 'bg-surface-elevated px-4 pb-4 pt-3',
    },
    size: {
      sm: 'pb-3 text-xs',
      default: 'pb-4 text-sm',
    },
  },
  compoundVariants: [
    {
      variant: 'underline',
      size: 'sm',
      class: 'px-0',
    },
    {
      variant: 'underline',
      size: 'default',
      class: 'px-0',
    },
    {
      variant: 'border',
      size: 'sm',
      class: 'px-3',
    },
    {
      variant: 'filled',
      size: 'sm',
      class: 'px-3',
    },
    {
      variant: 'accent',
      size: 'sm',
      class: 'px-3 pt-2',
    },
  ],
  defaultVariants: {
    variant: 'border',
    size: 'default',
  },
});

export const accordionIndicatorVariants = cva('size-4 shrink-0', {
  variants: {
    variant: {
      border: 'text-text-muted',
      underline: 'text-text-muted',
      filled: 'text-text-muted',
      accent: 'text-surface-elevated/90',
    },
    indicator: {
      chevron: '',
      plus: '',
    },
  },
  defaultVariants: {
    variant: 'border',
    indicator: 'chevron',
  },
});

export type AccordionVariantProps = VariantProps<typeof accordionRootVariants>;
export type AccordionTriggerVariantProps = VariantProps<
  typeof accordionTriggerVariants
>;
export type AccordionIndicatorVariantProps = VariantProps<
  typeof accordionIndicatorVariants
>;
