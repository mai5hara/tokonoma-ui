# tokonoma-ui

A React design system for calm, tactile interfaces — soft-depth surfaces, switchable mood palettes, and a closed component API. Documented in Storybook.

Named after _tokonoma_ (床の間), the Japanese alcove for intentional display — quiet surfaces, focused content.

**Storybook:** [mai5hara.github.io/tokonoma-ui/storybook](https://mai5hara.github.io/tokonoma-ui/storybook/)

**Landing:** [mai5hara.github.io/tokonoma-ui](https://mai5hara.github.io/tokonoma-ui/)

**Stack:** React 19 · Radix UI · Tailwind CSS v4 · class-variance-authority (cva)

---

## Overview

tokonoma-ui is a compact component library with:

- **Soft depth visuals** — `flat`, `raised`, and `inset` variants with a neumorphic feel on `surface` backgrounds
- **Switchable palettes** — `ink`, `clay`, `moss`, `mist`, `neutral`, and `dark`
- **Closed API** — appearance is controlled through documented props (`variant`, `size`, `rounded`, …), not `className` on components
- **Aligned form controls** — `Input`, `Select`, and `DateRangePicker` share the same field styling and error treatment

Implementation follows the same patterns as [shadcn/ui](https://ui.shadcn.com/) — Radix primitives, Tailwind CSS, and cva. tokonoma-ui layers product-specific **semantic themes**, **soft-depth variants**, a **closed component API**, and **versioned distribution** to a consumer application.

Consumers do **not** need to configure Tailwind. Import the prebuilt `tokonoma-ui/styles.css` — Tailwind is used when building this library, not in your app setup.

---

## Components

| Component               | Notes                                                                 |
| ----------------------- | --------------------------------------------------------------------- |
| `Button` / `ButtonLink` | `flat` · `raised` · `inset` · `accent` · `outline` · `ghost`          |
| `Card` / `CardLink`     | `flat` · `raised` · `inset`; header, content, footer, and media slots |
| `Input`                 | `border` · `inset` · `raised` · `filled`; search and password modes   |
| `Label`                 | Accessible labels with optional required marker                       |
| `Field`                 | Layout wrapper for `vertical` / `horizontal` stacks                   |
| `RadioGroup` / `Radio`  | `plain` · `border` · `filled` · `inset`                               |
| `PhotoUpload`           | Single-image upload with full-width preview                           |
| `Accordion`             | `border` · `underline` · `filled` · `accent`; chevron / plus          |
| `Modal`                 | Dialog with header, body, and footer                                  |
| `Select`                | Single select with an `options[]` API                                 |
| `DateRangePicker`       | Date range field with calendar popover                                |

See **Storybook** for interactive examples of every variant.

---

## Usage

### Install

Pin a release tag (GitHub). Replace the tag with the version you need — see [Releases](https://github.com/mai5hara/tokonoma-ui/releases).

```bash
npm install github:mai5hara/tokonoma-ui#v0.2.7
```

Or in `package.json`:

```json
{
  "dependencies": {
    "tokonoma-ui": "github:mai5hara/tokonoma-ui#v0.2.7"
  }
}
```

```bash
pnpm install
```

**Peer dependencies:** `react` and `react-dom` ^19. Radix UI, Lucide, and other runtime dependencies are bundled in the published `dist` build.

### Styles & theme

Import styles and call `initTheme()` once at your application entry (for example `main.tsx` or the root layout):

```ts
import 'tokonoma-ui/styles.css';
import { initTheme } from 'tokonoma-ui';

initTheme();
```

`initTheme()` applies the active palette (`ink` by default) and restores a saved choice from `localStorage` when available.

Palettes are selected with the `data-theme` attribute on the document root (`<html>`). The stylesheet remaps semantic tokens (`surface`, `accent`, …) from that attribute.

#### Switching palettes

Palettes: `ink` · `clay` · `moss` · `mist` · `neutral` · `dark`.

**Static / SSR default** — set the attribute on `<html>` (for example in a root layout):

```html
<html lang="en" data-theme="moss"></html>
```

**Runtime** — use the theme helpers (they set `data-theme` for you):

```ts
import {
  setTheme,
  setThemeWithPersistence,
  getTheme,
  THEME_IDS,
  type ThemeId,
} from 'tokonoma-ui';

// Session only
setTheme('clay');

// Persist for the next visit (localStorage + data-theme)
setThemeWithPersistence('moss');

getTheme(); // current ThemeId
THEME_IDS; // readonly list of palette ids
```

If you call `initTheme()` on entry, it may overwrite a hard-coded `data-theme` when a saved palette exists (or fall back to `ink`). For a fixed product theme, prefer `setTheme('moss')` / `setThemeWithPersistence('moss')` after init, or skip `initTheme()` and keep only the HTML attribute.

### Example

Soft-depth variants (`raised` / `inset`) are designed on a `surface` page background. With only `styles.css` imported, set that background via the theme CSS variable (no Tailwind setup required in your app):

```tsx
import { Button, Card, CardHeader, CardTitle, initTheme } from 'tokonoma-ui';
import 'tokonoma-ui/styles.css';

initTheme();

export function App() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--color-surface)',
        padding: '2rem',
      }}
    >
      <Card variant="raised">
        <CardHeader>
          <CardTitle>Sample Card</CardTitle>
        </CardHeader>
        <Button variant="accent">Sample Button</Button>
      </Card>
    </div>
  );
}
```

If your app already uses Tailwind and includes tokonoma’s theme tokens, `className="min-h-dvh bg-surface p-8"` works the same way.

---

## Storybook

Component documentation and live previews:

**https://mai5hara.github.io/tokonoma-ui/storybook/**

Landing page:

**https://mai5hara.github.io/tokonoma-ui/**

---

## License

MIT — see [LICENSE](./LICENSE).
