/** Shared layout + enum class maps for Modal (colors stay on semantic tokens in components). */

export const modalSectionX = 'pl-6 pr-4';

export const modalTitleSize = {
  sm: 'text-sm font-medium leading-snug',
  default: 'text-base font-medium leading-snug',
  lg: 'text-lg font-medium leading-snug',
} as const;

export const modalDescriptionSize = {
  sm: 'text-xs leading-normal',
  default: 'text-sm leading-normal',
} as const;

export const modalContentSize = {
  sm: 'max-w-sm',
  default: 'max-w-lg',
  lg: 'max-w-2xl',
} as const;

export const modalFooterAlign = {
  end: 'justify-end',
  center: 'justify-center',
  start: 'justify-start',
} as const;

export const modalTextAlign = {
  start: 'text-start',
  center: 'text-center',
} as const;

export const modalOverlay = [
  'fixed inset-0 z-50 bg-[color-mix(in_oklab,var(--color-text-primary)_5%,transparent)]',
].join(' ');

export const modalContentPanel = [
  'fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg text-text-primary outline-none',
  '[background:var(--background-gradient-raised)]',
  'max-h-[min(85vh,40rem)]',
].join(' ');

export type ModalTitleSize = keyof typeof modalTitleSize;
export type ModalDescriptionSize = keyof typeof modalDescriptionSize;
export type ModalContentSize = keyof typeof modalContentSize;
export type ModalFooterAlign = keyof typeof modalFooterAlign;
export type ModalTextAlign = keyof typeof modalTextAlign;
