# tokonoma-ui

A React design system for calm, tactile interfaces — soft-depth surfaces, switchable mood palettes, and a closed component API. Documented in Storybook.

Named after *tokonoma* (床の間), the Japanese alcove for intentional display — quiet surfaces, focused content.

**Storybook:** *link coming soon*

**Stack:** React 19 · Radix UI · Tailwind CSS v4 · class-variance-authority (cva)

---

## Overview

tokonoma-ui is a compact component library with:

- **Soft depth visuals** — `flat`, `raised`, and `inset` variants with a neumorphic feel on `surface` backgrounds
- **Switchable palettes** — `ink`, `clay`, `moss`, `mist`, and `neutral`
- **Closed API** — appearance is controlled through documented props (`variant`, `size`, …), not ad-hoc class overrides
- **Aligned form controls** — `Input` and `Select` share the same field styling and error treatment

Implementation follows the same patterns as [shadcn/ui](https://ui.shadcn.com/) — Radix primitives, Tailwind CSS, and cva. tokonoma-ui layers product-specific **semantic themes**, **soft-depth variants**, a **closed component API**, and **versioned distribution** to a consumer application.

---

## Components

| Component | Notes |
|-----------|--------|
| `Button` / `ButtonLink` | `flat` · `raised` · `inset` · `accent` · `outline` · `ghost` |
| `Card` | `flat` · `raised` · `inset`; header, content, footer, and media slots |
| `Input` | `border` · `inset` · `filled`; search and password modes |
| `Label` | Accessible labels with optional required marker |
| `Modal` | Dialog with header, body, and footer |
| `Select` | Single select with an `options[]` API |

See **Storybook** for interactive examples of every variant.

---

## Usage

### Install

Pin a release tag:

```json
{
  "dependencies": {
    "tokonoma-ui": "github:mai5hara/tokonoma-ui#v0.1.0"
  }
}
```

```bash
pnpm install
```

Replace `v0.1.0` with the version you need. Release notes are on [GitHub Releases](https://github.com/mai5hara/tokonoma-ui/releases).

### Styles & theme

Import styles once at your application entry:

```ts
import "tokonoma-ui/styles.css"
import { initTheme } from "tokonoma-ui"

initTheme()
```

`initTheme()` applies the active palette (`ink` by default) and restores the user’s saved choice when available.

### Example

```tsx
import { Button, Card, CardHeader, CardTitle, initTheme } from "tokonoma-ui"
import "tokonoma-ui/styles.css"

initTheme()

export function App() {
  return (
    <Card variant="raised">
      <CardHeader>
        <CardTitle>Sample Card</CardTitle>
      </CardHeader>
      <Button variant="accent">Sample Button</Button>
    </Card>
  )
}
```

**Peer dependencies:** `react` and `react-dom` ^19.

---

## Storybook

Component documentation and live previews are published via Storybook (*URL coming soon*).

---

## License

MIT — see [LICENSE](./LICENSE).
