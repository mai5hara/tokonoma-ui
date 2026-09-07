import { PointerEventHandler } from 'react';
type SuimonPointerProps = {
    onPointerEnter?: PointerEventHandler<HTMLElement>;
    onPointerLeave?: PointerEventHandler<HTMLElement>;
};
type SuimonProps = SuimonPointerProps & {
    'data-suimon'?: '';
    'data-suimon-tone'?: 'accent' | 'surface';
};
/** Data attributes and hover handlers for the centered suimon ripple. */
export declare function getSuimonProps(variant: string | undefined, pointerProps?: SuimonPointerProps): SuimonProps;
/** Resolve variant before suimon lookup (cva defaults are not applied to props). */
export declare function resolveButtonVariant(variant: string | undefined, fallback?: string): string;
export {};
