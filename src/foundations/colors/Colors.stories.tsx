import type { Meta, StoryObj } from '@storybook/react-vite';

import { ColorPalette, Colors } from '.';

const meta = {
  title: 'Foundations/Colors',
  component: Colors,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};

export const Neutral: Story = {
  render: () => (
    <div className="min-h-screen bg-surface p-8">
      <ColorPalette family="neutral" title="Neutral" />
    </div>
  ),
};

export const Ink: Story = {
  render: () => (
    <div className="min-h-screen bg-surface p-8">
      <ColorPalette family="ink" title="Ink" />
    </div>
  ),
};

export const Clay: Story = {
  render: () => (
    <div className="min-h-screen bg-surface p-8">
      <ColorPalette family="clay" title="Clay" />
    </div>
  ),
};

export const Moss: Story = {
  render: () => (
    <div className="min-h-screen bg-surface p-8">
      <ColorPalette family="moss" title="Moss" />
    </div>
  ),
};

export const Mist: Story = {
  render: () => (
    <div className="min-h-screen bg-surface p-8">
      <ColorPalette family="mist" title="Mist" />
    </div>
  ),
};