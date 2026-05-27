import type { ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button, ButtonLink } from "."

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["flat", "raised", "inset", "accent", "outline"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    variant: "flat",
    size: "default",
    disabled: false,
    children: "Button",
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

const onSurface = (node: ReactNode) => (
  <div className="bg-surface p-8">{node}</div>
)

export const Default: Story = {
  render: (args) => onSurface(<Button {...args} />),
}

export const Flat: Story = {
  args: { variant: "flat", children: "Flat" },
  render: (args) => onSurface(<Button {...args} />),
}

export const Raised: Story = {
  args: { variant: "raised", children: "Raised" },
  render: (args) => onSurface(<Button {...args} />),
}

export const Accent: Story = {
  args: { variant: "accent", children: "Accent" },
  render: (args) => onSurface(<Button {...args} />),
}

export const Outline: Story = {
  args: { variant: "outline", children: "Outline" },
  render: (args) => onSurface(<Button {...args} />),
}

export const AllVariants: Story = {
  render: () =>
    onSurface(
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="flat">Flat</Button>
        <Button variant="raised">Raised</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="outline">Outline</Button>
      </div>
    ),
}

export const Sizes: Story = {
  render: () =>
    onSurface(
      <div className="flex flex-wrap items-end gap-4">
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </div>
    ),
}

export const Disabled: Story = {
  render: () =>
    onSurface(
      <div className="flex flex-wrap gap-4">
        <Button variant="raised" disabled>
          Raised
        </Button>
        <Button variant="accent" disabled>
          Accent
        </Button>
      </div>
    ),
}

export const AsChildLink: Story = {
  render: () =>
    onSurface(
      <Button variant="accent" asChild>
        <a href="#gallery">Gallery (Slot)</a>
      </Button>
    ),
}

export const Link: Story = {
  render: () =>
    onSurface(
      <div className="flex flex-wrap gap-4">
        <ButtonLink variant="flat" href="#works">
          Internal link
        </ButtonLink>
        <ButtonLink variant="accent" href="https://example.com" external>
          External accent
        </ButtonLink>
      </div>
    ),
}
