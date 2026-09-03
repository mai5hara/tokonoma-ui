import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { colorBgClass } from '@/foundations/colors/color-tokens';
import { THEME_IDS, type ThemeId } from '@/theme';
import { cn } from '@/lib/utils';

import { StatTile } from '../../mock-atoms';

/**
 * 3-2 — one system, five moods. `data-theme` is set on the preview wrapper
 * only, so switching it never touches the rest of the page (semantic tokens
 * cascade to descendants; nothing outside this box re-themes).
 */
export function MoodPalettes() {
  const [mood, setMood] = useState<ThemeId>('ink');

  return (
    <div className="flex flex-col gap-8 rounded-xl border border-border bg-surface-elevated p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="text-lg font-medium text-text-primary">
          One system. Different moods.
        </h3>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6">
        {THEME_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setMood(id)}
            aria-pressed={mood === id}
            className="flex cursor-pointer flex-col items-center gap-2 min-w-14"
          >
            <span
              className={cn(
                'size-8 rounded-full ring-2 ring-offset-2 ring-offset-surface-elevated transition',
                colorBgClass(id, 500),
                mood === id ? 'ring-accent' : 'ring-transparent',
              )}
            />
            <span className="font-mono text-xs tracking-wide text-text-muted uppercase">
              {id}
            </span>
          </button>
        ))}
      </div>

      <div data-theme={mood} className="rounded-lg bg-surface p-6 sm:p-10">
        <div className="mx-auto max-w-sm">
          <Card variant="raised">
            <CardHeader>
              <p className="text-sm font-medium text-text-primary">Dashboard</p>
            </CardHeader>
            <CardContent gap="4">
              <div className="grid grid-cols-2 gap-3">
                <StatTile label="Projects" value="12" />
                <StatTile label="Tasks" value="24" />
              </div>
              <Input placeholder="Enter details…" aria-label="Details" />
            </CardContent>
            <CardFooter align="end">
              <Button variant="accent">Continue</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <p className="mx-auto max-w-md text-center text-sm text-text-muted">
        Semantic colors adapt automatically to the active palette. Components
        choose variants — not individual colors.
      </p>
    </div>
  );
}
