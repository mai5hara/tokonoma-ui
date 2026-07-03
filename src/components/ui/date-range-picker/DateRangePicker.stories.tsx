import { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '@/components/ui/label';

import { DateRangePicker, type DateRangePickerValue } from '.';

const fieldVariantDescription =
  '`border` — neutral bordered surface. `raised` / `inset` — soft depth on `surface`. `filled` — borderless fill.';

const meta = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Date range field with the same field chrome as **Input** and **Select**. Opens a calendar popover to pick start and end dates. Pair with **Label** via `id` / `htmlFor`.',
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
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Corner radius of the field chrome.',
      table: {
        type: { summary: 'sm | md | lg | full' },
        defaultValue: { summary: 'md' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Shown when no dates are selected.',
    },
    numberOfMonths: {
      control: { type: 'number', min: 1, max: 2, step: 1 },
      description: 'Months visible in the calendar popover.',
      table: { defaultValue: { summary: '1' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents opening the calendar and clearing the range.',
    },
    errorMessage: {
      control: 'text',
      description: 'When set, applies error styling and helper text below.',
    },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
    id: { table: { disable: true } },
  },
  args: {
    variant: 'border',
    rounded: 'md',
    placeholder: 'Select travel dates…',
    numberOfMonths: 1,
    disabled: false,
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const onSurface = (node: React.ReactNode) => (
  <div className="max-w-md bg-surface p-8">{node}</div>
);

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = useState<DateRangePickerValue | undefined>();

    return onSurface(
      <DateRangePicker {...args} value={value} onValueChange={setValue} />,
    );
  },
};

export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: function WithLabelStory() {
    const id = useId();
    const [value, setValue] = useState<DateRangePickerValue | undefined>();

    return onSurface(
      <div className="flex w-full flex-col gap-1.5">
        <Label htmlFor={id} required>
          Travel dates
        </Label>
        <DateRangePicker
          id={id}
          placeholder="May 1 – May 10, 2026"
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
          Travel dates
        </Label>
        <DateRangePicker id={id} errorMessage="Select a start and end date." />
      </div>,
    );
  },
};
