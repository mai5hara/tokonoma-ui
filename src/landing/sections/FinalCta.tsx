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
          <div className="w-full flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="w-full max-w-none sm:max-w-[240px]">
              <ButtonLink
                href={STORYBOOK_URL}
                variant="accent"
                size="lg"
                width="full"
              >
                Explore Storybook
              </ButtonLink>
            </div>
            <div className="w-full max-w-none sm:max-w-[240px]">
              <ButtonLink
                href={GITHUB_URL}
                variant="outline"
                size="lg"
                width="full"
              >
                View on GitHub
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
