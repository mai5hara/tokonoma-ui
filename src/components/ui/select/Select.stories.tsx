import { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '@/components/ui/label';

import { Select, type SelectOption } from '.';

const countryOptions: SelectOption[] = [
  { value: 'jp', label: 'Japan' },
  { value: 'us', label: 'United States' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'de', label: 'Germany', disabled: true },
];

const fieldVariantDescription =
  '`border` — neutral bordered surface. `raised` / `inset` — soft depth on `surface`. `filled` — borderless fill.';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single-select dropdown with the same field chrome as **Input**. Pass an `options` array.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['border', 'inset', 'raised', 'filled'],
      description: fieldVariantDescription,
      table: {
        type: { summary: 'border | inset | raised | filled' },
        defaultValue: { summary: 'border' },
      },
    },
    options: {
      description: 'Selectable items (`value`, `label`, optional `disabled`).',
    },
    placeholder: {
      control: 'text',
      description: 'Shown when no value is selected.',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents opening the dropdown.',
    },
    errorMessage: {
      control: 'text',
      description: 'When set, applies error styling and helper text below.',
    },
    value: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
  args: {
    variant: 'border',
    placeholder: 'Choose a country…',
    options: countryOptions,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const onSurface = (node: React.ReactNode) => (
  <div className="max-w-md bg-surface p-8">{node}</div>
);

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = useState<string>();

    return onSurface(
      <Select {...args} value={value} onValueChange={setValue} />,
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
          Country
        </Label>
        <Select
          id={id}
          options={countryOptions}
          value={value}
          onValueChange={setValue}
        />
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
          Country
        </Label>
        <Select
          id={id}
          options={countryOptions}
          errorMessage="Choose a country."
        />
      </div>,
    );
  },
};
