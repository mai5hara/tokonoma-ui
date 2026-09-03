import type { PointerEvent, PointerEventHandler } from 'react';

const SUIMON_VARIANTS = new Set(['raised', 'inset', 'accent', 'outline', 'flat']);

type SuimonPointerProps = {
  onPointerEnter?: PointerEventHandler<HTMLElement>;
  onPointerLeave?: PointerEventHandler<HTMLElement>;
};

type SuimonProps = SuimonPointerProps & {
  'data-suimon'?: '';
  'data-suimon-tone'?: 'accent' | 'surface';
};

function playSuimon(element: HTMLElement): void {
  element.classList.remove('is-suimon-playing');
  // Force reflow so repeated hovers retrigger the animation.
  void element.offsetWidth;
  element.classList.add('is-suimon-playing');
}

function stopSuimon(element: HTMLElement): void {
  element.classList.remove('is-suimon-playing');
}

/** Data attributes and hover handlers for the centered suimon ripple. */
export function getSuimonProps(
  variant: string | undefined,
  pointerProps: SuimonPointerProps = {},
): SuimonProps {
  if (!variant || !SUIMON_VARIANTS.has(variant)) {
    return pointerProps;
  }

  return {
    'data-suimon': '',
    'data-suimon-tone': variant === 'accent' ? 'accent' : 'surface',
    onPointerEnter: (event: PointerEvent<HTMLElement>) => {
      playSuimon(event.currentTarget);
      pointerProps.onPointerEnter?.(event);
    },
    onPointerLeave: (event: PointerEvent<HTMLElement>) => {
      stopSuimon(event.currentTarget);
      pointerProps.onPointerLeave?.(event);
    },
  };
}

/** Resolve variant before suimon lookup (cva defaults are not applied to props). */
export function resolveButtonVariant(
  variant: string | undefined,
  fallback: string = 'flat',
): string {
  return variant ?? fallback;
}
