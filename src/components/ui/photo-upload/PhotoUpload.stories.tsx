import { useId, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '@/components/ui/label';

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

export const WithLabel: Story = {
  parameters: { controls: { disable: true } },
  render: function WithLabelStory() {
    const id = useId();
    const [file, setFile] = useState<File | null>(null);

    return onSurface(
      <div className="flex w-full flex-col gap-1.5">
        <Label htmlFor={id} required>
          Profile photo
        </Label>
        <PhotoUpload id={id} value={file} onValueChange={setFile} />
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
          Profile photo
        </Label>
        <PhotoUpload
          id={id}
          errorMessage="Upload a profile photo to continue."
        />
      </div>,
    );
  },
};
