import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ButtonLink } from '.';

const variantDescription =
  '`flat` — neutral secondary. `raised` / `inset` — soft depth on `surface`. `accent` — filled primary. `outline` — accent secondary. `ghost` — borderless.';

const meta = {
  title: 'Components/Button/ButtonLink',
  component: ButtonLink,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Anchor styled as a button. Prefer over `Button asChild` when navigation is the primary action. Shares `variant` and `size` with **Button**.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'raised', 'inset', 'accent', 'outline', 'ghost'],
      description: variantDescription,
      table: {
        type: { summary: 'flat | raised | inset | accent | outline | ghost' },
        defaultValue: { summary: 'flat' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'icon'],
      description:
        'Hit target size. Use `icon` with `ghost` or `accent` for icon-only links.',
      table: {
        type: { summary: 'xs | sm | default | lg | icon' },
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
    children: {
      control: 'text',
      description: 'Link label.',
    },
    width: {
      control: 'select',
      options: ['auto', 'full'],
      description: 'Horizontal span. `full` fills the container width.',
      table: {
        type: { summary: 'auto | full' },
        defaultValue: { summary: 'auto' },
      },
    },
  },
  args: {
    variant: 'flat',
    size: 'default',
    width: 'auto',
    href: '#destination',
    external: false,
    children: 'Link',
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

const onSurface = (node: ReactNode) => (
  <div className="bg-surface p-8">{node}</div>
);

export const Default: Story = {
  render: (args) => onSurface(<ButtonLink {...args} />),
};

export const Examples: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    onSurface(
      <div className="flex flex-wrap gap-4">
        <ButtonLink variant="flat" href="#works">
          Internal link
        </ButtonLink>
        <ButtonLink variant="accent" href="https://example.com" external>
          External accent
        </ButtonLink>
      </div>,
    ),
};
