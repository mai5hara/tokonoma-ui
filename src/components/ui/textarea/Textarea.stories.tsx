import { useId } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '@/components/ui/label';

import { Textarea } from '.';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line text field with shared field chrome (same variants as **Input** and **Select**). Pair with **Label** via `id` / `htmlFor`.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['border', 'inset', 'raised', 'filled'],
      description:
        '`border` — neutral bordered surface. `raised` / `inset` — soft depth. `filled` — borderless fill.',
      table: {
        type: { summary: 'border | inset | raised | filled' },
        defaultValue: { summary: 'border' },
      },
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior.',
      table: {
        type: { summary: 'none | vertical | horizontal | both' },
        defaultValue: { summary: 'vertical' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when empty.',
    },
    errorMessage: {
      control: 'text',
      description: 'When set, applies error styling and helper text below.',
    },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'border',
    resize: 'vertical',
    placeholder: 'Write something...',
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

const onSurface = (node: React.ReactNode) => (
  <div className="max-w-md bg-surface p-8">{node}</div>
);

export const Default: Story = {
  render: (args) => onSurface(<Textarea {...args} />),
};

export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: function WithLabelStory() {
    const id = useId();

    return onSurface(
      <div className="flex w-full flex-col gap-1.5">
        <Label htmlFor={id} required>
          Message
        </Label>
        <Textarea id={id} placeholder="Your message..." />
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
          Bio
        </Label>
        <Textarea
          id={id}
          defaultValue="x"
          errorMessage="Bio must be at least 20 characters."
        />
      </div>,
    );
  },
};
