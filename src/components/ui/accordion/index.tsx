import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown, Minus } from 'lucide-react';

import type { ClosedElementProps } from '@/lib/closed-api';
import { cn } from '@/lib/utils';

import {
  accordionContentInnerVariants,
  accordionContentVariants,
  accordionIndicatorVariants,
  accordionItemVariants,
  accordionRootVariants,
  accordionTriggerVariants,
  type AccordionIndicatorVariantProps,
  type AccordionTriggerVariantProps,
  type AccordionVariantProps,
} from './accordion-variants';

type AccordionAppearanceProps = {
  /**
   * Surface style.
   * - `border` — framed group (default).
   * - `underline` — divider lines between items.
   * - `filled` — separate elevated blocks with gap.
   * - `accent` — accent-filled triggers with elevated content panels.
   */
  variant?: NonNullable<AccordionVariantProps['variant']>;
  /** Open/close control icon. Defaults to `chevron`. */
  indicator?: NonNullable<AccordionIndicatorVariantProps['indicator']>;
  /** Trigger and content density. */
  size?: NonNullable<AccordionTriggerVariantProps['size']>;
};

type AccordionContextValue = AccordionAppearanceProps;

const AccordionContext = React.createContext<AccordionContextValue>({
  variant: 'border',
  indicator: 'chevron',
  size: 'default',
});

type AccordionProps =
  | (AccordionAppearanceProps &
      Omit<AccordionPrimitive.AccordionSingleProps, 'className'>)
  | (AccordionAppearanceProps &
      Omit<AccordionPrimitive.AccordionMultipleProps, 'className'>);

/** Collapsible section group. Compose with {@link AccordionItem}. */
const Accordion = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(
  (
    { variant = 'border', indicator = 'chevron', size = 'default', ...props },
    ref,
  ) => {
    return (
      <AccordionContext.Provider value={{ variant, indicator, size }}>
        <AccordionPrimitive.Root
          ref={ref}
          data-variant={variant}
          data-indicator={indicator}
          data-size={size}
          className={accordionRootVariants({ variant })}
          {...(props as React.ComponentProps<typeof AccordionPrimitive.Root>)}
        />
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = 'Accordion';

type AccordionItemProps = ClosedElementProps<
  React.ComponentProps<typeof AccordionPrimitive.Item>
>;

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ ...props }, ref) => {
  const { variant } = React.useContext(AccordionContext);

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={accordionItemVariants({ variant })}
      {...props}
    />
  );
});
AccordionItem.displayName = 'AccordionItem';

type AccordionTriggerProps = ClosedElementProps<
  React.ComponentProps<typeof AccordionPrimitive.Trigger>
>;

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ children, ...props }, ref) => {
  const {
    variant,
    indicator = 'chevron',
    size,
  } = React.useContext(AccordionContext);

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn('group', accordionTriggerVariants({ variant, size }))}
        {...props}
      >
        <span className="min-w-0 flex-1">{children}</span>
        {indicator === 'plus' ? (
          <span
            className={cn(
              'relative',
              accordionIndicatorVariants({ variant, indicator: 'plus' }),
            )}
          >
            <Minus
              className="absolute inset-0 size-4 rotate-90 transition-transform duration-200 ease-out group-data-[state=open]:rotate-180"
              aria-hidden
            />
            <Minus className="absolute inset-0 size-4" aria-hidden />
          </span>
        ) : (
          <ChevronDown
            className={cn(
              accordionIndicatorVariants({ variant, indicator: 'chevron' }),
              'transition-transform duration-200 ease-out group-data-[state=open]:rotate-180 motion-reduce:transition-none',
            )}
            aria-hidden
          />
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

type AccordionContentProps = ClosedElementProps<
  React.ComponentProps<typeof AccordionPrimitive.Content>
>;

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ children, ...props }, ref) => {
  const { variant, size } = React.useContext(AccordionContext);

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={accordionContentVariants({ size })}
      {...props}
    >
      <div className={accordionContentInnerVariants({ variant, size })}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
  AccordionAppearanceProps,
};
export type {
  AccordionVariantProps,
  AccordionIndicatorVariantProps,
} from './accordion-variants';
