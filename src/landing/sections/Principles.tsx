import { Section, SectionHeading } from '../ui';
import { AlignedFields } from './principles/AlignedFields';
import { ClosedApi } from './principles/ClosedApi';
import { MoodPalettes } from './principles/MoodPalettes';
import { SoftDepth } from './principles/SoftDepth';

export function Principles() {
  return (
    <Section id="principles">
      <div className="flex flex-col gap-12">
        <SectionHeading eyebrow="Design principles" title="How it behaves." />
        <div className="flex flex-col gap-6">
          <SoftDepth />
          <MoodPalettes />
          <ClosedApi />
          <AlignedFields />
        </div>
      </div>
    </Section>
  );
}
