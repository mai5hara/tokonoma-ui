import { CodeBlock } from '../../ui';

const PROPS = ['variant', 'size', 'rounded', 'tone'];

/** 3-3 — the closed API isn't about a rule; it's about a shared vocabulary. */
export function ClosedApi() {
  return (
    <div className="grid gap-5 sm:gap-8 rounded-xl border border-border bg-surface-elevated p-6 sm:p-8 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col justify-center gap-3">
        <CodeBlock>
          {'<Button\n'}
          {'  variant="raised"\n'}
          {'  size="md"\n'}
          {'  rounded="lg"\n'}
          {'/>'}
        </CodeBlock>
        <div className="flex flex-wrap gap-2 pt-1">
          {PROPS.map((prop) => (
            <span
              key={prop}
              className="rounded-full border border-border px-2.5 py-1 font-mono text-xs text-text-muted"
            >
              {prop}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center gap-3">
        <h3 className="text-lg font-medium text-text-primary">
          Consistency by design.
        </h3>
        <p className="text-sm text-text-muted">
          Tokonoma components expose intentional appearance props instead of
          arbitrary styling.
        </p>
        <p className="text-sm text-text-muted">
          Public components omit <code className="font-mono">className</code>,
          keeping visual decisions inside the system.
        </p>
      </div>
    </div>
  );
}
