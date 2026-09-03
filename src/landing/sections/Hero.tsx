// import { Plus, SlidersHorizontal } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Select } from '@/components/ui/select';
// import { Button } from '@/components/ui/button';

import { GITHUB_URL, STORYBOOK_URL } from '../constants';
// import { StatTile } from '../mock-atoms';
import { Container, Eyebrow } from '../ui';

// const FILTER_OPTIONS = [
//   { value: 'all', label: 'All projects' },
//   { value: 'active', label: 'Active' },
//   { value: 'archived', label: 'Archived' },
// ];

/** Hero: name the system, then prove it with one composed UI — not a component grid. */
export function Hero() {
  return (
    <section id="top" className="pt-20 pb-20 sm:pt-28 sm:pb-28">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <Eyebrow>Design system for React</Eyebrow>
          <h1 className="text-4xl font-semibold tracking-tight text-text-primary sm:text-6xl">
            Tokonoma UI
          </h1>
          <p className="max-w-xl text-lg text-text-muted">
            A React design system for calm, tactile interfaces.
          </p>
          <p className="max-w-xl text-sm text-text-subtle">
            Soft-depth surfaces, switchable mood palettes, and a closed
            component API.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={STORYBOOK_URL} variant="accent" size="lg">
              Explore Storybook
            </ButtonLink>
            <ButtonLink href={GITHUB_URL} variant="outline" size="lg">
              View GitHub
            </ButtonLink>
          </div>
        </div>

        {/* <div className="mx-auto mt-16 max-w-2xl">
          <Card variant="raised">
            <CardHeader>
              <p className="text-lg font-medium text-text-primary">
                Good morning, Mai
              </p>
              <p className="text-sm text-text-muted">
                Here&apos;s what&apos;s happening today.
              </p>
            </CardHeader>
            <CardContent gap="4">
              <div className="grid grid-cols-2 gap-3">
                <StatTile label="Projects" value="12" />
                <StatTile label="Tasks" value="24" />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <p className="text-xs font-medium tracking-wide text-text-muted uppercase">
                  Recent activity
                </p>
                <div className="border-t border-border" />
              </div>

              <Input
                mode="search"
                placeholder="Search activity…"
                aria-label="Search activity"
              />

              <div className="flex items-center gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <SlidersHorizontal
                    className="size-4 shrink-0 text-text-muted"
                    aria-hidden
                  />
                  <Select options={FILTER_OPTIONS} defaultValue="all" />
                </div>
                <Button variant="accent">
                  <Plus className="size-4" aria-hidden />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </Container>
    </section>
  );
}
