import { Section, SectionHeading } from '../ui';

const TOOLS = ['React', 'Radix UI', 'Tailwind CSS', 'CVA'];

/** Deliberately short — what was built matters more than what it's built on. */
export function UnderTheSurface() {
  return (
    <Section>
      <div className="flex flex-col items-center gap-10">
        <SectionHeading
          eyebrow="Under the surface"
          title="Built with familiar tools."
        />

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          {TOOLS.map((tool) => (
            <span
              key={tool}
              className="font-mono text-sm text-text-muted sm:text-base rounded-full border border-border px-6 py-2"
            >
              {tool}
            </span>
          ))}
        </div>

        <p className="whitespace-pre-wrap text-center text-sm text-text-subtle">
          Built on Radix, Tailwind, and cva — with Tokonoma&apos;s themes and
          closed API on top.
        </p>
      </div>
    </Section>
  );
}
