import { ButtonLink } from '@/components/ui/button';

import { GITHUB_URL, STORYBOOK_URL } from './constants';
import { Container } from './ui';

/** Sticky site nav, built from Tokonoma's own ButtonLink — the LP is Tokonoma. */
export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <a
            href="#top"
            className="text-sm font-semibold tracking-[0.15em] text-text-primary uppercase"
          >
            Tokonoma UI
          </a>
          <nav className="flex items-center gap-1">
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
