export const SAMPLE_TEXT = 'The quick brown fox jumps over the lazy dog';

export const FONT_FAMILIES = [
  {
    id: 'sans',
    label: 'Sans',
    familyName: 'Inter',
    className: 'font-sans',
    themeVar: '--font-sans',
  },
  {
    id: 'mono',
    label: 'Mono',
    familyName: 'Geist Mono',
    className: 'font-mono',
    themeVar: '--font-mono',
  },
] as const;

export const FONT_SIZE_SCALE = [
  { token: 'xs', label: 'Caption', value: '0.75rem', className: 'text-xs' },
  { token: 'sm', label: 'Body Small', value: '0.875rem', className: 'text-sm' },
  { token: 'base', label: 'Body', value: '1rem', className: 'text-base' },
  { token: 'lg', label: 'Lead', value: '1.125rem', className: 'text-lg' },
  { token: 'xl', label: 'Heading 2', value: '1.25rem', className: 'text-xl' },
  { token: '2xl', label: 'Heading 1', value: '1.5rem', className: 'text-2xl' },
  {
    token: '3xl',
    label: 'Display Large',
    value: '1.875rem',
    className: 'text-3xl',
  },
] as const;

export const FONT_WEIGHTS = [
  { token: 'normal', label: 'Regular', value: 400, className: 'font-normal' },
  { token: 'medium', label: 'Medium', value: 500, className: 'font-medium' },
  {
    token: 'semibold',
    label: 'Semibold',
    value: 600,
    className: 'font-semibold',
  },
  { token: 'bold', label: 'Bold', value: 700, className: 'font-bold' },
] as const;

export const LINE_HEIGHTS = [
  {
    token: 'tight',
    label: 'compact',
    value: '1.25',
    className: 'leading-tight',
  },
  {
    token: 'normal',
    label: 'readable',
    value: '1.5',
    className: 'leading-normal',
  },
  {
    token: 'relaxed',
    label: 'calm',
    value: '1.625',
    className: 'leading-relaxed',
  },
] as const;

export const TEXT_STYLES = [
  {
    name: 'Display',
    description: 'Hero / marketing headlines',
    className:
      'font-sans text-3xl font-bold leading-tight tracking-tight text-text-primary',
  },
  {
    name: 'Page Title',
    description: 'Top-level page headings',
    className:
      'font-sans text-2xl font-semibold leading-tight tracking-tight text-text-primary',
  },
  {
    name: 'Section Heading',
    description: 'Section titles within a page',
    className: 'font-sans text-xl font-semibold leading-snug text-text-primary',
  },
  {
    name: 'Body',
    description: 'Default paragraph text',
    className:
      'font-sans text-base font-normal leading-normal text-text-primary',
  },
  {
    name: 'Body Small',
    description: 'Secondary paragraphs, descriptions',
    className: 'font-sans text-sm font-normal leading-normal text-text-muted',
  },
  {
    name: 'Caption',
    description: 'Metadata, hints, footnotes',
    className: 'font-sans text-xs font-normal leading-normal text-text-subtle',
  },
  {
    name: 'Label',
    description: 'Form labels, UI labels',
    className: 'font-sans text-sm font-medium leading-normal text-text-primary',
  },
  {
    name: 'Code',
    description: 'Inline code and monospace snippets',
    className: 'font-mono text-sm font-normal leading-normal text-text-primary',
  },
] as const;

export function readThemeValue(themeVar: string): string {
  if (typeof document === 'undefined') return '';
  return getComputedStyle(document.documentElement)
    .getPropertyValue(themeVar)
    .trim();
}
