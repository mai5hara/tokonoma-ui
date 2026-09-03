import { Card, CardContent } from '@/components/ui/card';

/** Small stat tile used inside dashboard mockups (Card variant="flat"). */
export function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <Card variant="flat" size="sm">
      <CardContent gap="1">
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-xl font-semibold text-text-primary">{value}</p>
      </CardContent>
    </Card>
  );
}

/** Single row inside a "Recent activity" list. */
export function ActivityRow({ name, time }: { name: string; time: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2.5 text-sm last:border-b-0">
      <span className="text-text-primary">{name}</span>
      <span className="text-text-subtle">{time}</span>
    </div>
  );
}
