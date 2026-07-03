import type { ReactNode } from 'react';

import {
  FONT_FAMILIES,
  FONT_SIZE_SCALE,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  SAMPLE_TEXT,
  TEXT_STYLES,
  readThemeValue,
} from './typography-tokens';

function FoundationSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight text-text-primary">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-text-muted">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function MetaLine({ children }: { children: ReactNode }) {
  return <p className="font-mono text-xs text-text-subtle">{children}</p>;
}

export function FontFamilySection() {
  return (
    <FoundationSection
      title="Font Family"
      description="Sans for UI copy; Mono for code and technical labels."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {FONT_FAMILIES.map(({ id, label, familyName, className, themeVar }) => (
          <article
            key={id}
            className="space-y-3 rounded-lg border border-border bg-surface-elevated p-5"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-sm font-medium text-text-primary">{label}</h3>
              <span className="text-sm text-text-muted">{familyName}</span>
            </div>
            <p className={`text-lg text-text-primary ${className}`}>
              {SAMPLE_TEXT}
            </p>
            <MetaLine>
              {className} · {themeVar}
            </MetaLine>
          </article>
        ))}
      </div>
    </FoundationSection>
  );
}

export function FontSizeScaleSection() {
  return (
    <FoundationSection
      title="Font Size Scale"
      description="Primitive sizes mapped to common UI roles."
    >
      <ul className="divide-y divide-border rounded-lg border border-border bg-surface-elevated">
        {FONT_SIZE_SCALE.map(({ token, label, value, className }) => (
          <li
            key={token}
            className="grid grid-cols-[5.5rem_8rem_1fr] items-baseline gap-4 px-5 py-4 sm:grid-cols-[4rem_9rem_1fr]"
          >
            <span className="font-mono text-xs text-text-subtle">{token}</span>
            <span className="font-mono text-xs text-text-subtle">{value}</span>
            <p className={`truncate font-sans text-text-primary ${className}`}>
              {label}
            </p>
          </li>
        ))}
      </ul>
    </FoundationSection>
  );
}

export function FontWeightSection() {
  return (
    <FoundationSection
      title="Font Weight"
      description="Regular through Bold for hierarchy."
    >
      <ul className="divide-y divide-border rounded-lg border border-border bg-surface-elevated">
        {FONT_WEIGHTS.map(({ label, token, value, className }) => (
          <li
            key={token}
            className="grid grid-cols-[5.5rem_4rem_1fr] items-center gap-4 px-5 py-4"
          >
            <span className="font-mono text-xs text-text-subtle">{label}</span>
            <span className="font-mono text-xs text-text-subtle">{value}</span>
            <p className={`font-sans text-lg text-text-primary ${className}`}>
              {SAMPLE_TEXT}
            </p>
          </li>
        ))}
      </ul>
    </FoundationSection>
  );
}

export function LineHeightSection() {
  return (
    <FoundationSection
      title="Line Height"
      description="Rhythm tokens for density vs. readability."
    >
      <ul className="space-y-4">
        {LINE_HEIGHTS.map(({ token, label, className, value }) => (
          <li
            key={token}
            className="space-y-2 rounded-lg border border-border bg-surface-elevated p-5"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-xs text-text-subtle">
                {token}
              </span>
              <span className="text-sm text-text-muted">{label}</span>
              <span className="font-mono text-xs text-text-subtle">
                ({value})
              </span>
            </div>
            <p
              className={`max-w-2xl font-sans text-base text-text-primary ${className}`}
            >
              {SAMPLE_TEXT} {SAMPLE_TEXT}
            </p>
          </li>
        ))}
      </ul>
    </FoundationSection>
  );
}

export function TextStylesSection() {
  return (
    <FoundationSection
      title="Text Styles"
      description="Composite styles for product UI — combine size, weight, and leading."
    >
      <ul className="divide-y divide-border rounded-lg border border-border bg-surface-elevated">
        {TEXT_STYLES.map(({ name, description, className }) => (
          <li key={name} className="space-y-2 px-5 py-5">
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium text-text-primary">{name}</h3>
              <p className="text-xs text-text-muted">{description}</p>
            </div>
            <p className={className}>
              {name === 'Code' ? 'const palette = "tokonoma"' : SAMPLE_TEXT}
            </p>
            <MetaLine>{className}</MetaLine>
          </li>
        ))}
      </ul>
    </FoundationSection>
  );
}

/** Typography primitives and composite text styles used across components. */
export function Typography() {
  return (
    <div className="min-h-screen bg-surface p-8 text-text-primary">
      <header className="mb-10 space-y-2">
        <h1 className="font-sans text-2xl font-semibold tracking-tight">
          Typography
        </h1>
        <p className="text-sm text-text-muted">
          Tokens live in{' '}
          <code className="rounded bg-ink-100 px-1 py-0.5 font-mono text-ink-800">
            @theme
          </code>{' '}
          in <code className="font-mono text-ink-700">src/index.css</code>.
          Fonts: <span className="font-sans">Inter</span>,{' '}
          <span className="font-mono">Geist Mono</span>.
        </p>
        <MetaLine>
          font-sans → {readThemeValue('--font-sans') || 'Inter, …'}
        </MetaLine>
      </header>
      <div className="space-y-14">
        <FontFamilySection />
        <FontSizeScaleSection />
        <FontWeightSection />
        <LineHeightSection />
        <TextStylesSection />
      </div>
    </div>
  );
}
