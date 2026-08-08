import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { PhotoUpload } from '.';

const fieldVariantDescription =
  '`border` — neutral bordered surface. `raised` / `inset` — soft depth on `surface`. `filled` — borderless fill.';

const meta = {
  title: 'Components/PhotoUpload',
  component: PhotoUpload,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single-image upload with preview. Same field chrome as **Input** and **Select**. Pair with **Label** via `id` / `htmlFor`. Supports drag and drop.',
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
    placeholder: {
      control: 'text',
      description: 'Shown when no file is selected.',
    },
    accept: {
      control: 'text',
      description: 'Accepted MIME types or extensions.',
    },
    maxSizeBytes: {
      control: 'number',
      description: 'Rejects files larger than this size (bytes).',
    },
    errorMessage: {
      control: 'text',
      description: 'When set, applies error styling and helper text below.',
    },
    disabled: { control: 'boolean' },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onValueChange: { table: { disable: true } },
  },
  args: {
    variant: 'border',
    placeholder: 'Choose a photo…',
    accept: 'image/*',
    disabled: false,
  },
} satisfies Meta<typeof PhotoUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

const onSurface = (node: React.ReactNode) => (
  <div className="max-w-md bg-surface p-8">{node}</div>
);

export const Default: Story = {
  render: function DefaultStory(args) {
    const [file, setFile] = useState<File | null>(null);

    return onSurface(
      <PhotoUpload {...args} value={file} onValueChange={setFile} />,
    );
  },
};

export const Error: Story = {
  parameters: { controls: { disable: true } },
  render: () =>
    onSurface(
      <div className="space-y-4">
        <PhotoUpload
          variant="border"
          errorMessage="Upload a profile photo to continue."
        />
        <PhotoUpload
          variant="inset"
          maxSizeBytes={512 * 1024}
          placeholder="Max 512 KB"
        />
        <PhotoUpload variant="filled" disabled placeholder="Upload disabled" />
      </div>,
    ),
};
