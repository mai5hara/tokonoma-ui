export const COLOR_STEPS = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;

export type ColorStep = (typeof COLOR_STEPS)[number];
export type ColorFamily = 'neutral' | 'ink' | 'clay' | 'moss' | 'mist';

export const COLOR_FAMILIES: ColorFamily[] = [
  'neutral',
  'ink',
  'clay',
  'moss',
  'mist',
];

/** Tailwind @theme variable, e.g. --color-ink-500 */
export function colorThemeVar(family: ColorFamily, step: ColorStep): string {
  return `--color-${family}-${step}`;
}

/** Utility class name for Storybook / components, e.g. bg-ink-500 */
export function colorBgClass(family: ColorFamily, step: ColorStep): string {
  return COLOR_BG_CLASSES[family][step];
}

export function colorTokenName(family: ColorFamily, step: ColorStep): string {
  return `${family}-${step}`;
}

export function readThemeColor(themeVar: string): string {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement)
    .getPropertyValue(themeVar)
    .trim();
}

/** Literal class map so Tailwind generates every swatch utility */
const COLOR_BG_CLASSES: Record<ColorFamily, Record<ColorStep, string>> = {
  neutral: {
    50: 'bg-neutral-50',
    100: 'bg-neutral-100',
    200: 'bg-neutral-200',
    300: 'bg-neutral-300',
    400: 'bg-neutral-400',
    500: 'bg-neutral-500',
    600: 'bg-neutral-600',
    700: 'bg-neutral-700',
    800: 'bg-neutral-800',
    900: 'bg-neutral-900',
  },
  ink: {
    50: 'bg-ink-50',
    100: 'bg-ink-100',
    200: 'bg-ink-200',
    300: 'bg-ink-300',
    400: 'bg-ink-400',
    500: 'bg-ink-500',
    600: 'bg-ink-600',
    700: 'bg-ink-700',
    800: 'bg-ink-800',
    900: 'bg-ink-900',
  },
  clay: {
    50: 'bg-clay-50',
    100: 'bg-clay-100',
    200: 'bg-clay-200',
    300: 'bg-clay-300',
    400: 'bg-clay-400',
    500: 'bg-clay-500',
    600: 'bg-clay-600',
    700: 'bg-clay-700',
    800: 'bg-clay-800',
    900: 'bg-clay-900',
  },
  moss: {
    50: 'bg-moss-50',
    100: 'bg-moss-100',
    200: 'bg-moss-200',
    300: 'bg-moss-300',
    400: 'bg-moss-400',
    500: 'bg-moss-500',
    600: 'bg-moss-600',
    700: 'bg-moss-700',
    800: 'bg-moss-800',
    900: 'bg-moss-900',
  },
  mist: {
    50: 'bg-mist-50',
    100: 'bg-mist-100',
    200: 'bg-mist-200',
    300: 'bg-mist-300',
    400: 'bg-mist-400',
    500: 'bg-mist-500',
    600: 'bg-mist-600',
    700: 'bg-mist-700',
    800: 'bg-mist-800',
    900: 'bg-mist-900',
  },
};
