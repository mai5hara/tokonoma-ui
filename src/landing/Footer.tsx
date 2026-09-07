import { ButtonLink } from '@/components/ui/button';

import { GITHUB_URL, README_URL, STORYBOOK_URL } from './constants';
import { Container } from './ui';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container>
        <div className="flex flex-col items-center gap-4 py-10 sm:flex-row sm:justify-between">
          <span className="text-sm font-semibold tracking-[0.15em] text-text-primary uppercase">
            Tokonoma UI
          </span>
          <nav className="flex items-center gap-1">
            <ButtonLink href={STORYBOOK_URL} variant="ghost" size="sm">
              Storybook
            </ButtonLink>
            <ButtonLink href={GITHUB_URL} variant="ghost" size="sm">
              GitHub
            </ButtonLink>
            <ButtonLink href={README_URL} variant="ghost" size="sm">
              npm
            </ButtonLink>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
