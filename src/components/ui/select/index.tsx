import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { useId } from "react"
import { Check, ChevronDown } from "lucide-react"

import { fieldVariants, type FieldAppearanceProps } from "../field-variants"

import {
  selectContent,
  selectItem,
  selectItemIndicator,
  selectViewport,
} from "./select-variants"

export type SelectOption = {
  value: string
  label: string
  /** Omit or disable options that cannot be selected. */
  disabled?: boolean
}

type SelectProps = {
  /** Options shown in the dropdown. */
  options: SelectOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Shown when no value is selected. */
  placeholder?: string
  disabled?: boolean
  /** When set, applies error styling and renders helper text below. */
  errorMessage?: string
  /** Associates the trigger with an external {@link Label} via `htmlFor`. */
  id?: string
} & FieldAppearanceProps

/**
 * Single-select dropdown with the same field chrome as {@link Input}. Pass an
 * `options` array rather than composing items manually.
 */
const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder = "Select…",
      disabled = false,
      errorMessage,
      id: idProp,
      variant,
    },
    ref
  ) => {
    const generatedId = useId()
    const selectId = idProp ?? generatedId
    const errorId = `${selectId}-error`
    const isInvalid = Boolean(errorMessage)

    return (
      <div className="flex w-full flex-col gap-1.5">
        <SelectPrimitive.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <div
            data-variant={variant}
            data-invalid={isInvalid || undefined}
            className={fieldVariants({ variant, invalid: isInvalid })}
          >
            <SelectPrimitive.Trigger
              ref={ref}
              id={selectId}
              aria-invalid={isInvalid || undefined}
              aria-describedby={isInvalid ? errorId : undefined}
              className="flex h-full w-full min-w-0 items-center justify-between gap-2 bg-transparent text-sm outline-none disabled:cursor-not-allowed"
            >
              <SelectPrimitive.Value
                placeholder={placeholder}
                className="truncate text-text-primary data-placeholder:text-text-subtle"
              />
              <SelectPrimitive.Icon asChild>
                <ChevronDown
                  className="size-4 shrink-0 text-text-muted"
                  aria-hidden
                />
              </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
          </div>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className={selectContent}
              position="popper"
              sideOffset={4}
            >
              <SelectPrimitive.Viewport className={selectViewport}>
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={selectItem}
                  >
                    <SelectPrimitive.ItemText>
                      {option.label}
                    </SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator
                      className={selectItemIndicator}
                    >
                      <Check className="size-4" aria-hidden />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        {errorMessage ? (
          <p id={errorId} role="alert" className="text-xs text-error">
            {errorMessage}
          </p>
        ) : null}
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
export type { SelectProps }
export type { FieldAppearanceProps as SelectVariantProps } from "../field-variants"
