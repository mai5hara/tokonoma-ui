import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  FontFamilySection,
  FontSizeScaleSection,
  FontWeightSection,
  LineHeightSection,
  TextStylesSection,
  Typography,
} from '.';

const meta = {
  title: 'Foundations/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};

export const FontFamily: Story = {
  render: () => (
    <div className="min-h-screen bg-surface p-8">
      <FontFamilySection />
    </div>
  ),
};

export const FontSizeScale: Story = {
  render: () => (
    <div className="min-h-screen bg-surface p-8">
      <FontSizeScaleSection />
    </div>
  ),
};

export const FontWeight: Story = {
  render: () => (
    <div className="min-h-screen bg-surface p-8">
      <FontWeightSection />
    </div>
  ),
};

export const LineHeight: Story = {
  render: () => (
    <div className="min-h-screen bg-surface p-8">
      <LineHeightSection />
    </div>
  ),
};

export const TextStyles: Story = {
  render: () => (
    <div className="min-h-screen bg-surface p-8">
      <TextStylesSection />
    </div>
  ),
};
