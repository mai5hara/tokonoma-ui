import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '.';

const fieldVariantDescription =
  '`border` — neutral bordered surface. `raised` / `inset` — soft depth on `surface`. `filled` — borderless fill.';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Text field with shared field chrome (same variants as **Select**). Pair with **Label** via `id` / `htmlFor`.',
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
    mode: {
      control: 'select',
      options: ['default', 'search'],
      description: '`search` prepends a search icon.',
      table: {
        type: { summary: 'default | search' },
        defaultValue: { summary: 'default' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when empty.',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url'],
      description:
        'Native input type. Use `showPasswordToggle` with `password`.',
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Shows show/hide control when `type="password"`.',
      if: { arg: 'type', eq: 'password' },
    },
    errorMessage: {
      control: 'text',
      description: 'When set, applies error styling and helper text below.',
    },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'border',
    mode: 'default',
    type: 'text',
    showPasswordToggle: false,
    placeholder: 'Type here...',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const onSurface = (node: React.ReactNode) => (
  <div className="max-w-md bg-surface p-8">{node}</div>
);

export const Default: Story = {
  render: (args) => onSurface(<Input {...args} />),
};

export const Error: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    onSurface(
      <div className="space-y-4">
        <Input
          variant="border"
          defaultValue="not-an-email"
          errorMessage="Enter a valid email address."
        />
        <Input
          variant="inset"
          mode="search"
          defaultValue="??"
          errorMessage="Search query is too short."
        />
        <Input
          variant="filled"
          type="password"
          showPasswordToggle
          errorMessage="Password must be at least 8 characters."
        />
      </div>,
    ),
};
