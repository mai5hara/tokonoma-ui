import { Card } from '@/components/ui/card';

import { Container, Eyebrow } from '../ui';

/** The name's origin — deliberately spacious, the concept made visible. */
export function Idea() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Card variant="inset">
            <div className="flex flex-col items-center gap-3 px-10 py-16 text-center">
              <p className="text-2xl font-semibold tracking-[0.2em] text-text-primary">
                TOKONOMA
              </p>
              <p className="text-3xl">床の間</p>
              <div className="mt-4 flex flex-col gap-1 font-mono text-xs text-text-muted">
                <span>quiet space</span>
                <span>focused content</span>
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            <Eyebrow>The idea</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              Quiet surfaces, focused content.
            </h2>
            <p className="text-base text-text-muted">
              Tokonoma takes its name from the Japanese tokonoma (床の間), an
              alcove for intentional display.
            </p>
            <p className="text-base text-text-muted">
              The same idea shapes this design system: quiet surfaces, focused
              content, and a deliberate visual hierarchy.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
