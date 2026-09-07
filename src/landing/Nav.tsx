import { ButtonLink } from '@/components/ui/button';

import { GITHUB_URL, STORYBOOK_URL } from './constants';
import { Container } from './ui';

/** Sticky site nav, built from Tokonoma's own ButtonLink — the LP is Tokonoma. */
export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-md">
      <Container>
        <div className="flex h-14 items-center justify-between gap-3 sm:h-16">
          <a
            href="#top"
            className="shrink-0 text-xs font-semibold tracking-[0.12em] text-text-primary uppercase sm:text-sm sm:tracking-[0.15em]"
          >
            Tokonoma UI
          </a>
          <nav className="flex min-w-0 items-center gap-0 sm:gap-1 [&_a]:h-7 [&_a]:px-2 [&_a]:text-xs sm:[&_a]:h-8 sm:[&_a]:px-3 sm:[&_a]:text-sm">
            <ButtonLink href="#principles" variant="ghost" size="sm">
              Principles
            </ButtonLink>
            <ButtonLink href={STORYBOOK_URL} variant="ghost" size="sm">
              Storybook
            </ButtonLink>
            <ButtonLink href={GITHUB_URL} variant="ghost" size="sm">
              GitHub
            </ButtonLink>
          </nav>
        </div>
      </Container>
    </header>
  );
}
