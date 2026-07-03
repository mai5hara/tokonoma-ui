import {
  COLOR_FAMILIES,
  COLOR_STEPS,
  colorBgClass,
  colorThemeVar,
  colorTokenName,
  readThemeColor,
  type ColorFamily,
  type ColorStep,
} from './color-tokens';

type ColorSwatchProps = {
  family: ColorFamily;
  step: ColorStep;
};

export function ColorSwatch({ family, step }: ColorSwatchProps) {
  const themeVar = colorThemeVar(family, step);
  const token = colorTokenName(family, step);
  const hex = readThemeColor(themeVar).toUpperCase();

  return (
    <figure className="flex w-30 flex-col gap-2">
      <div
        className={`aspect-square w-full rounded-md border border-ink-200 shadow-sm ${colorBgClass(family, step)}`}
        aria-label={token}
      />
      <figcaption className="space-y-0.5 text-xs leading-snug">
        <p className="font-medium text-text-primary">{token}</p>
        <p className="font-mono text-text-subtle">{hex}</p>
        <p className="font-mono text-[0.65rem] text-text-muted">{themeVar}</p>
      </figcaption>
    </figure>
  );
}

type ColorPaletteProps = {
  /** Primitive color family (`ink`, `clay`, `moss`, `mist`, `neutral`). */
  family: ColorFamily;
  /** Section heading. Defaults to the capitalized family name. */
  title?: string;
};

export function ColorPalette({ family, title }: ColorPaletteProps) {
  const heading = title ?? family.charAt(0).toUpperCase() + family.slice(1);

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight text-text-primary">
        {heading}
      </h2>
      <div className="flex flex-wrap gap-4">
        {COLOR_STEPS.map((step) => (
          <ColorSwatch key={step} family={family} step={step} />
        ))}
      </div>
    </section>
  );
}

/** Primitive palettes and semantic token reference. Use the Theme toolbar to preview remapped semantics. */
export function Colors() {
  return (
    <div className="min-h-screen bg-surface p-8 text-text-primary">
      <header className="mb-10 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Color palette</h1>
        <p className="text-sm text-text-muted">
          Primitives are defined in{' '}
          <code className="rounded bg-ink-100 px-1 py-0.5 font-mono text-ink-800">
            @theme
          </code>{' '}
          in <code className="font-mono text-ink-700">src/index.css</code>. Use
          semantic tokens (
          <code className="font-mono text-ink-700">text-text-primary</code>,{' '}
          <code className="font-mono text-ink-700">bg-surface</code>) in
          components.
        </p>
      </header>
      <div className="space-y-12">
        {COLOR_FAMILIES.map((family) => (
          <ColorPalette key={family} family={family} />
        ))}
      </div>
      <section className="mt-12 space-y-3 border-t border-border pt-8">
        <h2 className="text-lg font-semibold tracking-tight">Semantic</h2>
        <ul className="grid gap-2 text-sm text-text-muted sm:grid-cols-2">
          <li>
            <code className="text-ink-800">text-text-primary</code> → ink-900
          </li>
          <li>
            <code className="text-ink-800">text-text-muted</code> → ink-600
          </li>
          <li>
            <code className="text-ink-800">bg-surface</code> → ink-50
          </li>
          <li>
            <code className="text-ink-800">text-accent</code> → clay-500
          </li>
        </ul>
      </section>
    </div>
  );
}
