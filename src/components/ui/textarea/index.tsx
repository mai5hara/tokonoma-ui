import * as React from 'react';
import { useId } from 'react';

import { cn } from '@/lib/utils';
import type { ClosedElementProps } from '@/lib/closed-api';

import {
  textareaVariants,
  type FieldAppearanceProps,
} from './textarea-variants';

type TextareaProps = ClosedElementProps<React.ComponentProps<'textarea'>> &
  FieldAppearanceProps & {
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
    /** Whether the textarea can be resized. Defaults to `vertical`. */
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  };

const resizeClasses: Record<NonNullable<TextareaProps['resize']>, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

/**
 * Multi-line text field with shared field chrome.
 * Pairs with {@link Label}; colors follow the active theme.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant,
      rounded,
      resize = 'vertical',
      errorMessage,
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const textareaId = idProp ?? generatedId;
    const errorId = `${textareaId}-error`;
    const isInvalid = Boolean(errorMessage);

    return (
      <div className="flex w-full flex-col gap-1.5">
        <div
          data-variant={variant}
          data-invalid={isInvalid || undefined}
          className={cn(
            textareaVariants({ variant, invalid: isInvalid, rounded }),
            'h-auto items-stretch p-0',
          )}
        >
          <textarea
            ref={ref}
            id={textareaId}
            aria-invalid={isInvalid || undefined}
            aria-describedby={isInvalid ? errorId : undefined}
            className={cn(
              'min-h-20 w-full bg-transparent px-3 py-2 text-sm text-text-primary placeholder:text-text-subtle',
              'outline-none disabled:cursor-not-allowed',
              resizeClasses[resize],
            )}
            {...props}
          />
        </div>
        {errorMessage ? (
          <p id={errorId} role="alert" className="text-xs text-error">
            {errorMessage}
          </p>
        ) : null}
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
export type { TextareaProps };
export type {
  TextareaVariantProps,
  FieldAppearanceProps,
} from './textarea-variants';
