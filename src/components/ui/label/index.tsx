import * as React from 'react';

import { labelVariants, type LabelVariantProps } from './label-variants';

type LabelAppearanceProps = {
  /** Label text size. `sm` matches compact fields. */
  size?: NonNullable<LabelVariantProps['size']>;
};

type LabelProps = Omit<
  React.ComponentProps<'label'>,
  'children' | 'className'
> &
  LabelAppearanceProps & {
    children: React.ReactNode;
    /** ID of the associated form control (`htmlFor`). */
    htmlFor: string;
    /** Renders a required marker (`*`) after the label text. */
    required?: boolean;
  };

/**
 * Accessible form label. Always pair with a control via `htmlFor` / `id`.
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ size, children, htmlFor, required = false, ...props }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={labelVariants({ size })}
        {...props}
      >
        <span>{children}</span>
        {required ? (
          <>
            <span className="text-error" aria-hidden>
              *
            </span>
          </>
        ) : null}
      </label>
    );
  },
);
Label.displayName = 'Label';

export { Label };
export type { LabelProps, LabelVariantProps, LabelAppearanceProps };
