import { Card, CardContent } from '@/components/ui/card';

const VARIANTS = ['flat', 'raised', 'inset'] as const;

/** 3-1 — same Card, three depth treatments; the difference should read on sight. */
export function SoftDepth() {
  return (
    <div className="grid gap-8 rounded-xl border border-border bg-surface-elevated p-8 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-medium text-text-primary">Soft depth</h3>
        <p className="text-sm text-text-muted">
          Create hierarchy through subtle surfaces.
        </p>
        <ul className="mt-2 flex flex-col gap-1 font-mono text-xs text-text-subtle">
          {VARIANTS.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        {VARIANTS.map((variant) => (
          <Card key={variant} variant={variant} size="sm">
            <CardContent>
              <span className="font-mono text-xs text-text-muted">
                {variant}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
