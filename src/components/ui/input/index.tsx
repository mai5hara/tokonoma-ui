import * as React from 'react';
import { useId, useState } from 'react';
import { Eye, EyeOff, Search } from 'lucide-react';

import { cn } from '@/lib/utils';

import { inputVariants, type FieldAppearanceProps } from './input-variants';

type InputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  FieldAppearanceProps & {
    /**
     * `search` prepends a search icon. Other input types use the native `type`
     * prop (`text`, `password`, `email`, …).
     */
    mode?: 'default' | 'search';
    /** Shows visibility toggle when `type="password"`. */
    showPasswordToggle?: boolean;
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
  };

/**
 * Text field with shared field chrome. Pairs with {@link Label}; colors follow
 * the active theme.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      mode = 'default',
      showPasswordToggle = false,
      errorMessage,
      type = 'text',
      id: idProp,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const errorId = `${inputId}-error`;
    const isInvalid = Boolean(errorMessage);
    const isSearch = mode === 'search';
    const isPasswordType = type === 'password';
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const canTogglePassword = isPasswordType && showPasswordToggle;
    const inputType =
      canTogglePassword && isPasswordVisible ? 'text' : (type ?? 'text');

    return (
      <div className="flex w-full flex-col gap-1.5">
        <div
          data-variant={variant}
          data-mode={mode}
          data-invalid={isInvalid || undefined}
          className={cn(
            inputVariants({ variant, invalid: isInvalid }),
            className,
          )}
        >
          {isSearch ? (
            <Search className="size-4 shrink-0 text-text-muted" aria-hidden />
          ) : null}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            aria-invalid={isInvalid || undefined}
            aria-describedby={isInvalid ? errorId : undefined}
            className={cn(
              'w-full bg-transparent text-sm text-text-primary placeholder:text-text-subtle',
              'outline-none disabled:cursor-not-allowed',
              canTogglePassword ? 'pr-1' : '',
            )}
            {...props}
          />
          {canTogglePassword ? (
            <button
              type="button"
              className="inline-flex size-5 shrink-0 items-center justify-center text-text-muted hover:text-text-primary"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            >
              {isPasswordVisible ? (
                <EyeOff className="size-4" aria-hidden />
              ) : (
                <Eye className="size-4" aria-hidden />
              )}
            </button>
          ) : null}
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
Input.displayName = 'Input';

export { Input };
export type { InputProps };
export type { InputVariantProps, FieldAppearanceProps } from './input-variants';
