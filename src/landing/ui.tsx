import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Centered content column shared by every landing section. */
export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">{children}</div>
  );
}

/** Small mono-uppercase label used above section headings. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs font-medium tracking-[0.2em] text-text-subtle uppercase">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'start';
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p
          className={`text-base text-text-muted ${align === 'center' ? 'max-w-xl' : 'max-w-lg'}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

/** Full-bleed section wrapper with consistent vertical rhythm and a top divider. */
export function Section({
  id,
  children,
  divider = true,
}: {
  id?: string;
  children: ReactNode;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      className={`py-20 sm:py-28 ${divider ? 'border-t border-border' : ''}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** Monospace snippet block — recessed like an inset field. */
export function CodeBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <pre
      className={cn(
        'w-full overflow-x-auto rounded-lg bg-surface p-4 font-mono text-xs leading-relaxed text-text-primary shadow-[var(--shadow-inset)] sm:text-sm',
        className,
      )}
    >
      <code>{children}</code>
    </pre>
  );
}
