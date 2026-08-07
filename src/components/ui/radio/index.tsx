import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import type { ClosedElementProps } from '@/lib/closed-api';
import { cn } from '@/lib/utils';

import {
  radioControlVariants,
  radioGroupVariants,
  radioIndicatorVariants,
  radioItemVariants,
  type RadioGroupVariantProps,
  type RadioItemVariantProps,
} from './radio-variants';

type RadioAppearanceProps = {
  /**
   * Option chrome.
   * - `plain` — radio circle + label only (default).
   * - `border` — radio and label enclosed in a border.
   * - `filled` — borderless fill on `surface`.
   * - `inset` — soft inset depth on `surface`.
   */
  variant?: NonNullable<RadioItemVariantProps['variant']>;
  /** Control and label density. */
  size?: NonNullable<RadioItemVariantProps['size']>;
};

type RadioGroupContextValue = {
  variant?: RadioAppearanceProps['variant'];
  size?: RadioAppearanceProps['size'];
  orientation?: NonNullable<RadioGroupVariantProps['orientation']>;
};

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

type RadioGroupProps = ClosedElementProps<
  React.ComponentProps<typeof RadioGroupPrimitive.Root>
> & {
  /** Layout direction for options. Defaults to `vertical`. */
  orientation?: NonNullable<RadioGroupVariantProps['orientation']>;
  /** Gap between options. Defaults to `3`. */
  gap?: NonNullable<RadioGroupVariantProps['gap']>;
  /** Default option chrome for child {@link Radio} items. */
  variant?: RadioAppearanceProps['variant'];
  /** Default size for child {@link Radio} items. */
  size?: RadioAppearanceProps['size'];
};

/** Mutually exclusive option group. Compose with {@link Radio}. */
const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
  (
    { orientation = 'vertical', gap = '3', variant, size, children, ...props },
    ref,
  ) => {
    return (
      <RadioGroupContext.Provider value={{ variant, size, orientation }}>
        <RadioGroupPrimitive.Root
          ref={ref}
          orientation={orientation}
          className={radioGroupVariants({ orientation, gap })}
          {...props}
        >
          {children}
        </RadioGroupPrimitive.Root>
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

type RadioProps = ClosedElementProps<
  Omit<React.ComponentProps<typeof RadioGroupPrimitive.Item>, 'children'>
> &
  RadioAppearanceProps & {
    /** Label content shown beside the radio control. */
    children: React.ReactNode;
    /** Optional supporting text under the label. */
    description?: React.ReactNode;
  };

/** Single option inside a {@link RadioGroup}. */
const Radio = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  RadioProps
>(
  (
    {
      variant: variantProp,
      size: sizeProp,
      children,
      description,
      disabled,
      id,
      ...props
    },
    ref,
  ) => {
    const group = React.useContext(RadioGroupContext);
    const variant = variantProp ?? group.variant ?? 'plain';
    const size = sizeProp ?? group.size ?? 'default';
    const orientation = group.orientation ?? 'vertical';
    const generatedId = React.useId();
    const itemId = id ?? generatedId;
    const descriptionId = description ? `${itemId}-description` : undefined;

    return (
      <label
        data-variant={variant}
        data-size={size}
        className={cn(
          radioItemVariants({ variant, size }),
          orientation === 'vertical' ? 'w-full' : 'w-auto',
        )}
      >
        <RadioGroupPrimitive.Item
          ref={ref}
          id={itemId}
          disabled={disabled}
          aria-describedby={descriptionId}
          className={radioControlVariants({ size })}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
            <span className={radioIndicatorVariants({ size })} aria-hidden />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="leading-snug font-medium text-text-primary">
            {children}
          </span>
          {description ? (
            <span
              id={descriptionId}
              className={
                size === 'sm'
                  ? 'text-[0.7rem] leading-snug text-text-muted'
                  : 'text-xs leading-snug text-text-muted'
              }
            >
              {description}
            </span>
          ) : null}
        </span>
      </label>
    );
  },
);
Radio.displayName = 'Radio';

export { RadioGroup, Radio };
export type {
  RadioGroupProps,
  RadioProps,
  RadioAppearanceProps,
  RadioItemVariantProps,
  RadioGroupVariantProps,
};
