import { ClosedElementProps } from '../../../lib/closed-api';
import { AccordionIndicatorVariantProps, AccordionTriggerVariantProps, AccordionVariantProps } from './accordion-variants';
import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
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
type AccordionProps = (AccordionAppearanceProps & Omit<AccordionPrimitive.AccordionSingleProps, 'className'>) | (AccordionAppearanceProps & Omit<AccordionPrimitive.AccordionMultipleProps, 'className'>);
/** Collapsible section group. Compose with {@link AccordionItem}. */
declare const Accordion: React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<HTMLDivElement>>;
type AccordionItemProps = ClosedElementProps<React.ComponentProps<typeof AccordionPrimitive.Item>>;
declare const AccordionItem: React.ForwardRefExoticComponent<Omit<AccordionItemProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
type AccordionTriggerProps = ClosedElementProps<React.ComponentProps<typeof AccordionPrimitive.Trigger>>;
declare const AccordionTrigger: React.ForwardRefExoticComponent<Omit<AccordionTriggerProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
type AccordionContentProps = ClosedElementProps<React.ComponentProps<typeof AccordionPrimitive.Content>>;
declare const AccordionContent: React.ForwardRefExoticComponent<Omit<AccordionContentProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export type { AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps, AccordionAppearanceProps, };
export type { AccordionVariantProps, AccordionIndicatorVariantProps, } from './accordion-variants';
