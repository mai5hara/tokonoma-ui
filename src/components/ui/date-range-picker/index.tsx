import * as React from "react"
import { useId, useState } from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { format } from "date-fns"
import { CalendarIcon, XIcon } from "lucide-react"

import { fieldVariants, type FieldVariantProps } from "../field-variants"

import { Calendar } from "./calendar"
import { dateRangePickerContent } from "./date-range-picker-variants"
import { Button } from "../button"

/** Public range value (mirrors react-day-picker's DateRange without exposing that dependency). */
export type DateRangePickerValue = {
  from: Date | undefined
  to?: Date | undefined
}

type DateRangePickerProps = {
  value?: DateRangePickerValue
  defaultValue?: DateRangePickerValue
  onValueChange?: (value: DateRangePickerValue | undefined) => void
  placeholder?: string
  disabled?: boolean
  /** When set, applies error styling and renders helper text below. */
  errorMessage?: string
  id?: string
  numberOfMonths?: number
} & FieldVariantProps

function formatDateRange(
  range: DateRangePickerValue | undefined,
  placeholder: string
): string {
  if (!range?.from) return placeholder

  const fromLabel = format(range.from, "MMM d, yyyy")
  if (!range.to) return `${fromLabel} – …`

  const toLabel = format(range.to, "MMM d, yyyy")
  if (fromLabel === toLabel) return fromLabel

  return `${fromLabel} – ${toLabel}`
}

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      placeholder = "Select date range…",
      disabled = false,
      errorMessage,
      id: idProp,
      variant,
      rounded,
      numberOfMonths,
    },
    ref
  ) => {
    const generatedId = useId()
    const pickerId = idProp ?? generatedId
    const errorId = `${pickerId}-error`
    const isInvalid = Boolean(errorMessage)
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = useState<
      DateRangePickerValue | undefined
    >(defaultValue)
    const [open, setOpen] = useState(false)
    const selected = isControlled ? value : internalValue
    const label = formatDateRange(selected, placeholder)

    const handleSelect = (range: DateRangePickerValue | undefined) => {
      if (!isControlled) {
        setInternalValue(range)
      }
      onValueChange?.(range)

      if (range?.from && range?.to) {
        setOpen(false)
      }
    }

    const handleClear = (event: React.MouseEvent) => {
      event.preventDefault()
      event.stopPropagation()
      setOpen(false)
      if (!isControlled) {
        setInternalValue({ from: undefined, to: undefined })
      }
      onValueChange?.({ from: undefined, to: undefined })
    }

    const toggleOpen = () => {
      if (!disabled) setOpen((prev) => !prev)
    }

    const hasSelection = Boolean(selected?.from)

    return (
      <div className="flex w-full flex-col gap-1.5">
        <PopoverPrimitive.Root
          open={disabled ? false : open}
          onOpenChange={(next) => {
            if (!disabled) setOpen(next)
          }}
        >
          <div
            data-variant={variant}
            data-invalid={isInvalid || undefined}
            className={fieldVariants({
              variant,
              invalid: isInvalid,
              rounded,
            })}
          >
            <PopoverPrimitive.Trigger
              ref={ref}
              id={pickerId}
              type="button"
              disabled={disabled}
              aria-invalid={isInvalid || undefined}
              aria-describedby={isInvalid ? errorId : undefined}
              className="flex h-full w-full min-w-0 items-center justify-between gap-2 bg-transparent text-sm outline-none disabled:cursor-not-allowed"
            >
              <span
                className={
                  selected?.from
                    ? "truncate text-text-primary"
                    : "truncate text-text-subtle"
                }
              >
                {label}
              </span>
            </PopoverPrimitive.Trigger>
            <div className="flex shrink-0 items-center gap-0.5">
              {hasSelection ? (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Clear date range"
                  className="size-6"
                  disabled={disabled}
                  onClick={handleClear}
                >
                  <XIcon className="size-4 text-text-muted" aria-hidden />
                </Button>
              ) : null}
              <button
                type="button"
                disabled={disabled}
                aria-label="Open calendar"
                className="inline-flex size-6 shrink-0 items-center justify-center text-text-muted outline-none hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                onClick={toggleOpen}
              >
                <CalendarIcon className="size-4" aria-hidden />
              </button>
            </div>
          </div>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              className={dateRangePickerContent}
              align="start"
              sideOffset={4}
            >
              <Calendar selected={selected} onSelect={handleSelect} numberOfMonths={numberOfMonths} />
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

        {errorMessage ? (
          <p id={errorId} role="alert" className="text-xs text-error">
            {errorMessage}
          </p>
        ) : null}
      </div>
    )
  }
)
DateRangePicker.displayName = "DateRangePicker"

export { DateRangePicker }
export type { DateRangePickerProps, FieldVariantProps as DateRangePickerVariantProps }
