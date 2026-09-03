import { Card, CardContent } from '@/components/ui/card';

import { ActivityRow, StatTile } from '../mock-atoms';
import { Section, SectionHeading } from '../ui';

const ACTIVITY = [
  { name: 'Project A', time: '2h ago' },
  { name: 'Project B', time: '5h ago' },
  { name: 'Project C', time: 'yesterday' },
];

/** Design Principles showed the parts. This shows what they build together. */
export function BuiltWith() {
  return (
    <Section>
      <div className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Built with Tokonoma"
          title="What happens when they work together?"
          description="Components designed to work together as one system."
        />

        <div className="w-full max-w-2xl">
          <Card variant="raised">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <span className="text-xs font-semibold tracking-[0.15em] text-text-primary uppercase">
                Tokonoma
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">Profile</span>
                <span className="size-6 rounded-full bg-accent" />
              </div>
            </div>

            <CardContent gap="6">
              <div className="flex flex-col gap-1 pt-6">
                <p className="text-lg font-medium text-text-primary">
                  Good morning, Tokonoma
                </p>
                <p className="text-sm text-text-muted">
                  Here&apos;s what&apos;s happening today.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <StatTile label="Projects" value="12" />
                <StatTile label="Tasks" value="24" />
                <StatTile label="Progress" value="78%" />
              </div>

              <div className="flex flex-col gap-2 pb-6">
                <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
                  Recent activity
                </p>
                <div className="rounded-lg border border-border px-4">
                  {ACTIVITY.map((item) => (
                    <ActivityRow key={item.name} {...item} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-sm text-text-subtle">
          Built with{' '}
          <span className="text-text-muted">
            Card · Button · Input · Select
          </span>
        </p>
      </div>
    </Section>
  );
}
