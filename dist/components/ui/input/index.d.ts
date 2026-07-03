import { InputVariantProps } from './input-variants';
import * as React from "react";
type InputProps = Omit<React.ComponentProps<"input">, "size"> & InputVariantProps & {
    mode?: "default" | "search";
    /** Shows visibility toggle when `type="password"`. */
    showPasswordToggle?: boolean;
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
};
declare const Input: React.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export { Input };
export type { InputProps, InputVariantProps };
