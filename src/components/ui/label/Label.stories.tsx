import { useId } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/components/ui/input';

import { Label } from '.';

const meta = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible form label. Always pair with a control via `htmlFor` and matching `id`.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Label text.',
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the associated form control.',
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: 'Label text size. `sm` matches compact fields.',
      table: {
        type: { summary: 'default | sm' },
        defaultValue: { summary: 'default' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Renders a required marker (`*`) after the label text.',
    },
  },
  args: {
    children: 'Email',
    htmlFor: 'email',
    size: 'default',
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

const onSurface = (node: React.ReactNode) => (
  <div className="max-w-md bg-surface p-8">{node}</div>
);

export const Default: Story = {
  render: (args) => onSurface(<Label {...args} />),
};

export const WithInput: Story = {
  parameters: { controls: { disable: true } },
  render: function WithInputStory() {
    const id = useId();

    return onSurface(
      <div className="flex w-full flex-col gap-1.5">
        <Label htmlFor={id} required>
          Email
        </Label>
        <Input id={id} type="email" placeholder="you@example.com" />
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
          Email
        </Label>
        <Input
          id={id}
          type="email"
          defaultValue="not-an-email"
          errorMessage="Enter a valid email address."
        />
      </div>,
    );
  },
};
