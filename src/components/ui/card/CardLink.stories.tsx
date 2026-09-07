import type { Meta, StoryObj } from '@storybook/react';

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardLink,
  CardTitle,
} from '.';

const meta = {
  title: 'Components/Card/CardLink',
  component: CardLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Anchor styled as a card. Prefer over wrapping `Card` when navigation is the primary action. Shares `variant` and `size` with **Card**; depth hover/focus is always on.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'inset', 'raised'],
      description:
        '`flat` — border at rest; hover softens into soft depth. `raised` / `inset` — soft depth on `surface`.',
      table: {
        type: { summary: 'flat | raised | inset' },
        defaultValue: { summary: 'flat' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: 'Padding density. `sm` for compact layouts.',
      table: {
        type: { summary: 'default | sm' },
        defaultValue: { summary: 'default' },
      },
    },
    href: {
      control: 'text',
      description: 'Destination URL.',
    },
    external: {
      control: 'boolean',
      description:
        'Opens in a new tab with `rel="noopener noreferrer"`. Defaults to true for `http(s)` URLs.',
    },
  },
  args: {
    variant: 'raised',
    size: 'default',
    href: '#destination',
    external: false,
  },
} satisfies Meta<typeof CardLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="max-w-md bg-surface p-8">
      <CardLink {...args}>
        <CardHeader>
          <CardTitle>Card link</CardTitle>
          <CardDescription>
            Whole surface navigates. Hover or Tab to see depth and the inset
            focus ring.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-text-muted">
            Use for galleries, result lists, and other card-shaped destinations.
          </p>
        </CardContent>
      </CardLink>
    </div>
  ),
};

export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex max-w-2xl flex-col gap-4 bg-surface p-8">
      <CardLink variant="flat" href="#works">
        <CardHeader>
          <CardTitle>Internal flat</CardTitle>
          <CardDescription>Border softens into depth on hover.</CardDescription>
        </CardHeader>
      </CardLink>
      <CardLink variant="raised" href="https://example.com" external>
        <CardHeader>
          <CardTitle>External raised</CardTitle>
          <CardDescription>
            Opens in a new tab with safe{' '}
            <code className="text-text-subtle">rel</code>.
          </CardDescription>
        </CardHeader>
      </CardLink>
    </div>
  ),
};
