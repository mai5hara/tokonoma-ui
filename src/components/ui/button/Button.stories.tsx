import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '.';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Primary action control. Colors follow the active theme. For navigation, use **ButtonLink** (see **Components/Button/ButtonLink**).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'raised', 'inset', 'accent', 'outline', 'ghost'],
      description:
        '`flat` — neutral secondary (bordered surface, no depth). `raised` / `inset` — soft depth on `surface`. `accent` — filled primary. `outline` — accent secondary (accent border, transparent fill). `ghost` — borderless.',
      table: {
        type: { summary: 'flat | raised | inset | accent | outline | ghost' },
        defaultValue: { summary: 'flat' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'icon'],
      description:
        'Hit target size. Use `icon` with `ghost` or `accent` for icon-only buttons.',
      table: {
        type: { summary: 'xs | sm | default | lg | icon' },
        defaultValue: { summary: 'default' },
      },
    },
    asChild: {
      control: 'boolean',
      description:
        'Merge button styles onto a single child element (e.g. `<a>`) via Radix Slot.',
    },
    disabled: {
      control: 'boolean',
      description: 'Prevents interaction and dims the button.',
    },
    children: {
      control: 'text',
      description: 'Button label or icon content.',
    },
    className: { table: { disable: true } },
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
    },
  },
  args: {
    variant: 'flat',
    size: 'default',
    disabled: false,
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const onSurface = (node: ReactNode) => (
  <div className="bg-surface p-8">{node}</div>
);

export const Default: Story = {
  render: (args) => onSurface(<Button {...args} />),
};
