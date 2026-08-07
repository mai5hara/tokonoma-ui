import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

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
          'Mutually exclusive options. Compose `RadioGroup` with `Radio`. Option chrome via `variant` (`plain`, `border`, `filled`, `inset`).',
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

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    onSurface(
      <RadioGroup defaultValue="a" disabled variant="border">
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c">Option C</Radio>
      </RadioGroup>,
    ),
};
