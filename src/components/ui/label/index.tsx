import * as React from "react"

import { labelVariants, type LabelVariantProps } from "./label-variants"

type LabelProps = Omit<React.ComponentProps<"label">, "children" | "className"> &
  LabelVariantProps & {
    children: React.ReactNode
    htmlFor: string
    required?: boolean
  }

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
    )
  }
)
Label.displayName = "Label"

export { Label }
export type { LabelProps, LabelVariantProps }
