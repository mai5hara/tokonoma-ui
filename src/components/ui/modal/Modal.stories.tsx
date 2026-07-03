import { useState, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
} from '.';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  subcomponents: {
    ModalContent,
    ModalHeader,
    ModalFooter,
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Dialog built on Radix. Compose `Modal` (root) with `ModalContent`, `ModalHeader`, `ModalBody`, and `ModalFooter`. Use `ModalTrigger` when controlled open state is not needed.',
      },
    },
    controls: { disable: true },
  },
  // Stories use custom `render`; args satisfy ModalContent's required `children` for types.
  args: {
    size: 'default',
    textAlign: 'start',
    children: null,
  },
} satisfies Meta<typeof ModalContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const onSurface = (node: ReactNode) => (
  <div className="min-h-[320px] bg-surface p-8">{node}</div>
);

export const Default: Story = {
  render: function DefaultStory() {
    const [open, setOpen] = useState(false);

    return onSurface(
      <>
        <Button variant="accent" onClick={() => setOpen(true)}>
          Open modal
        </Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent>
            <ModalHeader
              showClose
              title="Quiet focus"
              description="Radix Dialog handles focus, escape, and scroll lock. Colors follow the active theme."
            />
            <ModalBody>
              <p className="text-sm text-text-muted">
                Body scrolls independently when content is long. Header and
                footer stay fixed.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="accent" onClick={() => setOpen(false)}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>,
    );
  },
};

export const WithTrigger: Story = {
  render: () =>
    onSurface(
      <Modal>
        <ModalTrigger asChild>
          <Button variant="raised">Open with trigger</Button>
        </ModalTrigger>
        <ModalContent size="sm">
          <ModalHeader showClose title="Small dialog" titleSize="sm" />
          <ModalBody>
            <p className="text-sm text-text-muted">
              Use ModalTrigger when you do not need controlled open state.
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>,
    ),
};

export const CenteredConfirm: Story = {
  render: function CenteredConfirmStory() {
    const [open, setOpen] = useState(false);

    return onSurface(
      <>
        <Button variant="flat" onClick={() => setOpen(true)}>
          Open confirm
        </Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent size="sm" textAlign="center">
            <ModalHeader
              showClose
              title="Remove this item?"
              description="This action cannot be undone."
            />
            <ModalBody>
              <p className="text-sm text-text-muted">
                The item will be removed from your alcove.
              </p>
            </ModalBody>
            <ModalFooter align="center">
              <Button variant="flat" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="accent" onClick={() => setOpen(false)}>
                Remove
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>,
    );
  },
};

export const LongContent: Story = {
  render: function LongContentStory() {
    const [open, setOpen] = useState(false);

    return onSurface(
      <>
        <Button variant="flat" onClick={() => setOpen(true)}>
          Open long content
        </Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent>
            <ModalHeader showClose title="Scrollable body" />
            <ModalBody>
              <div className="space-y-3 text-sm text-text-muted">
                {Array.from({ length: 12 }, (_, i) => (
                  <p key={i}>
                    Paragraph {i + 1}. The alcove keeps the frame calm while
                    content moves inside the body region only.
                  </p>
                ))}
              </div>
            </ModalBody>
            <ModalFooter align="center">
              <Button variant="accent" onClick={() => setOpen(false)}>
                Done
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>,
    );
  },
};
