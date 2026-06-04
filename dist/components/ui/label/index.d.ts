import { LabelVariantProps } from './label-variants';
import * as React from "react";
type LabelProps = Omit<React.ComponentProps<"label">, "children" | "className"> & LabelVariantProps & {
    children: React.ReactNode;
    htmlFor: string;
    required?: boolean;
};
declare const Label: React.ForwardRefExoticComponent<Omit<LabelProps, "ref"> & React.RefAttributes<HTMLLabelElement>>;
export { Label };
export type { LabelProps, LabelVariantProps };
