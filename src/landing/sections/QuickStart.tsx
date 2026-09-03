import { ArrowRight } from 'lucide-react';

import { ButtonLink } from '@/components/ui/button';

import { README_URL } from '../constants';
import { CodeBlock, Section, SectionHeading } from '../ui';

const STEPS = [
  { label: 'Install', code: 'npm install tokonoma-ui' },
  {
    label: 'Initialize',
    code: 'import "tokonoma-ui/styles.css";\ninitTheme();',
  },
  {
    label: 'Use',
    code: '<Button variant="raised">\n  Get started\n</Button>',
  },
];

export function QuickStart() {
  return (
    <Section>
      <div className="flex flex-col items-center gap-10">
        <SectionHeading
          eyebrow="Quick start"
          title="Start building with Tokonoma."
        />

        <div className="flex flex-col gap-6 w-full max-w-xl">
          {STEPS.map((step, index) => (
            <div key={step.label} className="flex h-full flex-col gap-2">
              <p className="font-mono text-xs text-text-subtle">
                {String(index + 1).padStart(2, '0')} — {step.label}
              </p>
              <CodeBlock>{step.code}</CodeBlock>
            </div>
          ))}
        </div>

        <ButtonLink href={README_URL} variant="ghost">
          Read the documentation
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </div>
    </Section>
  );
}
