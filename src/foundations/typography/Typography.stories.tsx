import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '.';

const meta = {
  title: 'Foundations/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      disable: true,
    },
    docs: {
      description: {
        component:
          'Font families (Inter, Geist Mono), size scale, weights, line heights, and composite **text styles** for product UI. Tokens live in `@theme` in `index.css`.',
      },
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};
