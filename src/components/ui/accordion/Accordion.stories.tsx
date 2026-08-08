import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type AccordionAppearanceProps,
} from '.';

const variantDescription =
  '`border` — framed group. `underline` — dividers only. `filled` — elevated blocks. `accent` — accent trigger fill.';

const meta = {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Collapsible sections. Compose `Accordion` with `AccordionItem`, `AccordionTrigger`, and `AccordionContent`. Use `variant` for chrome and `indicator` for chevron or plus/minus.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['border', 'underline', 'filled', 'accent'],
      description: variantDescription,
      table: {
        type: { summary: 'border | underline | filled | accent' },
        defaultValue: { summary: 'border' },
      },
    },
    indicator: {
      control: 'select',
      options: ['chevron', 'plus'],
      description: '`chevron` — rotate on open. `plus` — toggles + / −.',
      table: {
        type: { summary: 'chevron | plus' },
        defaultValue: { summary: 'chevron' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'default'],
      description: 'Trigger and content density.',
      table: {
        type: { summary: 'sm | default' },
        defaultValue: { summary: 'default' },
      },
    },
  },
  args: {
    variant: 'border',
    indicator: 'chevron',
    size: 'default',
  },
} satisfies Meta<AccordionAppearanceProps>;

export default meta;
type Story = StoryObj<AccordionAppearanceProps>;

const onSurface = (node: React.ReactNode) => (
  <div className="max-w-lg bg-surface p-8">{node}</div>
);

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = useState<string>('raised');

    return onSurface(
      <Accordion
        type="single"
        collapsible
        variant={args.variant}
        indicator={args.indicator}
        size={args.size}
        value={value}
        onValueChange={setValue}
      >
        <AccordionItem value="raised">
          <AccordionTrigger>Raised surfaces</AccordionTrigger>
          <AccordionContent>
            Soft raised depth sits on the page surface so the outer light edge
            stays readable without a hard border.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="inset">
          <AccordionTrigger>Inset surfaces</AccordionTrigger>
          <AccordionContent>
            Inset depth pulls the face slightly into the surface — useful for
            quiet secondary panels and denser forms.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="palettes">
          <AccordionTrigger>Mood palettes</AccordionTrigger>
          <AccordionContent>
            Switch ink, clay, moss, mist, or neutral from the theme toolbar.
            Semantic tokens remap automatically.
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
  },
};
