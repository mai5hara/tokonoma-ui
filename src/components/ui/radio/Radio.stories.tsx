import { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '@/components/ui/label';

import { Radio, RadioGroup } from '.';

const variantDescription =
  '`plain` — circle + label only. `border` — enclosed in a border. `filled` — borderless fill. `inset` — soft inset depth.';

const meta = {
  title: 'Components/Radio',
  component: RadioGroup,
  subcomponents: { Radio },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Mutually exclusive options. Compose `RadioGroup` with `Radio`. Option chrome via `variant` (`plain`, `border`, `filled`, `inset`). Pair with **Label** via `id` / `htmlFor`.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['plain', 'border', 'filled', 'inset'],
      description: variantDescription,
      table: {
        type: { summary: 'plain | border | filled | inset' },
        defaultValue: { summary: 'plain' },
      },
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout direction for options.',
      table: {
        type: { summary: 'vertical | horizontal' },
        defaultValue: { summary: 'vertical' },
      },
    },
    gap: {
      control: 'select',
      options: ['1', '2', '3', '4', '6'],
      description: 'Gap between options.',
      table: {
        type: { summary: '1 | 2 | 3 | 4 | 6' },
        defaultValue: { summary: '3' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'default'],
      description: 'Control and label density.',
      table: {
        type: { summary: 'sm | default' },
        defaultValue: { summary: 'default' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'When set, applies error styling and helper text below.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the entire group.',
    },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
  args: {
    variant: 'plain',
    orientation: 'vertical',
    gap: '3',
    size: 'default',
    disabled: false,
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const onSurface = (node: React.ReactNode) => (
  <div className="max-w-md bg-surface p-8">{node}</div>
);

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = useState('a');

    return onSurface(
      <RadioGroup {...args} value={value} onValueChange={setValue}>
        <Radio value="a" description="Supporting copy for this option.">
          Option A
        </Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c" disabled>
          Option C (disabled)
        </Radio>
      </RadioGroup>,
    );
  },
};

export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: function WithLabelStory() {
    const id = useId();
    const [value, setValue] = useState<string>();

    return onSurface(
      <div className="flex w-full flex-col gap-1.5">
        <Label htmlFor={id} required>
          Surface style
        </Label>
        <RadioGroup
          id={id}
          variant="border"
          value={value}
          onValueChange={setValue}
        >
          <Radio value="flat" description="Border only, no depth.">
            Flat
          </Radio>
          <Radio value="raised" description="Soft raised depth on surface.">
            Raised
          </Radio>
          <Radio value="inset" description="Soft inset depth on surface.">
            Inset
          </Radio>
        </RadioGroup>
      </div>,
    );
  },
};

export const WithError: Story = {
  parameters: { controls: { disable: true } },
  render: function WithErrorStory() {
    const id = useId();

    return onSurface(
      <div className="flex w-full flex-col gap-1.5">
        <Label htmlFor={id} required>
          Surface style
        </Label>
        <RadioGroup
          id={id}
          variant="border"
          errorMessage="Choose a surface style."
        >
          <Radio value="flat">Flat</Radio>
          <Radio value="raised">Raised</Radio>
          <Radio value="inset">Inset</Radio>
        </RadioGroup>
      </div>,
    );
  },
};
