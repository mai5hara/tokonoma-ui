export const THEME_IDS = ['ink', 'clay', 'moss', 'mist', 'neutral'] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export const DEFAULT_THEME: ThemeId = 'ink';

const STORAGE_KEY = 'tokonoma-theme';

export function setTheme(theme: ThemeId): void {
  document.documentElement.setAttribute('data-theme', theme);
}

export function getTheme(): ThemeId {
  const value = document.documentElement.getAttribute('data-theme');
  if (value && THEME_IDS.includes(value as ThemeId)) {
    return value as ThemeId;
  }
  return DEFAULT_THEME;
}

/** Persist choice (e.g. app shell); optional for Storybook-only usage */
export function setThemeWithPersistence(theme: ThemeId): void {
  setTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode, etc. */
  }
}

export function initTheme(): ThemeId {
  let theme: ThemeId = DEFAULT_THEME;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && THEME_IDS.includes(stored as ThemeId)) {
      theme = stored as ThemeId;
    }
  } catch {
    /* ignore */
  }
  setTheme(theme);
  return theme;
}
