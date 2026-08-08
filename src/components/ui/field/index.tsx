import * as React from 'react';

import type { ClosedElementProps } from '@/lib/closed-api';

import {
  fieldLayoutVariants,
  type FieldLayoutVariantProps,
} from './field-layout-variants';

type FieldProps = ClosedElementProps<React.ComponentProps<'div'>> & {
  /**
   * Stack direction.
   * - `vertical` — label above content (default).
   * - `horizontal` — label beside content.
   */
  orientation?: NonNullable<FieldLayoutVariantProps['orientation']>;
  /** Gap between children. Defaults to `1.5`. */
  gap?: NonNullable<FieldLayoutVariantProps['gap']>;
  /**
   * Cross-axis alignment.
   * Defaults to `stretch` (vertical) / prefer `center` for horizontal rows.
   */
  align?: NonNullable<FieldLayoutVariantProps['align']>;
};

/**
 * Thin layout wrapper for stacking children vertically or horizontally.
 * Compose with {@link Label} and form controls — does not replace them.
 */
function Field({
  orientation = 'vertical',
  gap = '1.5',
  align,
  children,
  ...props
}: FieldProps) {
  const resolvedAlign =
    align ?? (orientation === 'horizontal' ? 'center' : 'stretch');

  return (
    <div
      data-orientation={orientation}
      data-gap={gap}
      data-align={resolvedAlign}
      className={fieldLayoutVariants({
        orientation,
        gap,
        align: resolvedAlign,
      })}
      {...props}
    >
      {children}
    </div>
  );
}

export { Field };
export type { FieldProps };
export type { FieldLayoutVariantProps } from './field-layout-variants';
