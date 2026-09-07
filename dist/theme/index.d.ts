export declare const THEME_IDS: readonly ["ink", "clay", "moss", "mist", "neutral", "dark"];
export type ThemeId = (typeof THEME_IDS)[number];
export declare const DEFAULT_THEME: ThemeId;
export declare function setTheme(theme: ThemeId): void;
export declare function getTheme(): ThemeId;
/** Persist choice (e.g. app shell); optional for Storybook-only usage */
export declare function setThemeWithPersistence(theme: ThemeId): void;
export declare function initTheme(): ThemeId;
