import { ButtonLink } from '@/components/ui/button';
import { GITHUB_URL, STORYBOOK_URL } from '../constants';
import { Container, Eyebrow } from '../ui';

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
                View GitHub
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
