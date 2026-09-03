import { ButtonLink } from '@/components/ui/button';

import { GITHUB_URL, STORYBOOK_URL } from '../constants';
import { Container } from '../ui';

export function FinalCta() {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            Build calm, tactile interfaces.
          </h2>
          <p className="max-w-md text-base text-text-muted">
            Explore the system or dive into the source.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href={STORYBOOK_URL} variant="accent" size="lg">
              Explore Storybook
            </ButtonLink>
            <ButtonLink href={GITHUB_URL} variant="outline" size="lg">
              View on GitHub
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
