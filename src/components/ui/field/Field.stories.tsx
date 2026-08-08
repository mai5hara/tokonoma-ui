import { useId } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Field } from '.';

const meta = {
  title: 'Components/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Layout wrapper for stacking children (`vertical` / `horizontal`). Compose with **Label** and form controls. Does not own labels or errors.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: '`vertical` — stacked. `horizontal` — side by side.',
      table: {
        type: { summary: 'vertical | horizontal' },
        defaultValue: { summary: 'vertical' },
      },
    },
    gap: {
      control: 'select',
      options: ['0', '1', '1.5', '2', '3', '4', '6', '8'],
      description: 'Gap between children.',
      table: {
        type: { summary: '0 | 1 | 1.5 | 2 | 3 | 4 | 6 | 8' },
        defaultValue: { summary: '1.5' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description:
        'Cross-axis alignment. Defaults to `stretch` (vertical) or `center` (horizontal).',
      table: {
        type: { summary: 'start | center | end | stretch' },
      },
    },
  },
  args: {
    orientation: 'vertical',
    gap: '1.5',
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

const onSurface = (node: React.ReactNode) => (
  <div className="max-w-md bg-surface p-8">{node}</div>
);

export const Default: Story = {
  render: function DefaultStory(args) {
    const id = useId();

    return onSurface(
      <Field {...args}>
        <Label htmlFor={id} required>
          Email
        </Label>
        <Input id={id} type="email" placeholder="you@example.com" />
      </Field>,
    );
  },
};
