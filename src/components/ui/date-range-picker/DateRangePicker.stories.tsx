import { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { DateRange } from 'react-day-picker';

import { Label } from '@/components/ui/label';

import { DateRangePicker } from '.';

const meta = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  argTypes: {
    variant: {
      control: 'select',
      options: ['border', 'inset', 'filled'],
    },
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
    numberOfMonths: {
      control: 'number',
      options: [1, 2],
    },
  },
  args: {
    variant: 'border',
    rounded: 'md',
    placeholder: 'Select travel dates…',
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const onSurface = (node: React.ReactNode) => (
  <div className="max-w-md bg-surface p-8">{node}</div>
);

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = useState<DateRange>();

    return onSurface(
      <DateRangePicker {...args} value={value} onValueChange={setValue} />,
    );
  },
};

export const Variants: Story = {
  render: function VariantsStory() {
    const [border, setBorder] = useState<DateRange>();
    const [inset, setInset] = useState<DateRange>();
    const [filled, setFilled] = useState<DateRange>();

    return onSurface(
      <div className="space-y-4">
        <DateRangePicker
          variant="border"
          placeholder="Border"
          value={border}
          onValueChange={setBorder}
        />
        <DateRangePicker
          variant="inset"
          placeholder="Inset"
          value={inset}
          onValueChange={setInset}
        />
        <DateRangePicker
          variant="filled"
          placeholder="Filled"
          value={filled}
          onValueChange={setFilled}
        />
      </div>,
    );
  },
};

export const NumberOfMonths: Story = {
  render: function NumberOfMonthsStory() {
    const [value, setValue] = useState<DateRange>();

    return onSurface(
      <DateRangePicker
        numberOfMonths={2}
        value={value}
        onValueChange={setValue}
        placeholder="Select travel dates…"
      />,
    );
  },
};

export const WithLabel: Story = {
  render: function WithLabelStory() {
    const id = useId();
    const [value, setValue] = useState<DateRange>();

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

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: {
      from: new Date(2026, 4, 1),
      to: new Date(2026, 4, 10),
    },
  },
  render: (args) => onSurface(<DateRangePicker {...args} />),
};
