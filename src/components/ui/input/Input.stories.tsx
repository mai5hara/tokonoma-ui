import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "."

const meta = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    variant: {
      control: "select",
      options: ["border", "inset", "filled"],
    },
    mode: {
      control: "select",
      options: ["default", "search"],
    },
  },
  args: {
    variant: "border",
    mode: "default",
    placeholder: "Type here...",
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

const onSurface = (node: React.ReactNode) => (
  <div className="max-w-md bg-surface p-8">{node}</div>
)

export const Default: Story = {
  render: (args) => onSurface(<Input {...args} />),
}

export const Variants: Story = {
  render: () =>
    onSurface(
      <div className="space-y-4">
        <Input variant="border" placeholder="Border input" />
        <Input variant="inset" placeholder="Inset input" />
        <Input variant="filled" placeholder="Filled input" />
      </div>
    ),
}

export const Search: Story = {
  render: () =>
    onSurface(
      <div className="space-y-4">
        <Input mode="search" placeholder="Search..." />
      </div>
    ),
}

export const Password: Story = {
  render: () =>
    onSurface(
      <div className="space-y-4">
        <Input type="password" placeholder="Password" />
        <Input
          type="password"
          showPasswordToggle
          placeholder="Password with toggle"
        />
      </div>
    ),
}

export const Error: Story = {
  render: () =>
    onSurface(
      <div className="space-y-4">
        <Input
          variant="border"
          defaultValue="not-an-email"
          errorMessage="Enter a valid email address."
        />
        <Input
          variant="inset"
          mode="search"
          defaultValue="??"
          errorMessage="Search query is too short."
        />
        <Input
          variant="filled"
          type="password"
          showPasswordToggle
          errorMessage="Password must be at least 8 characters."
        />
      </div>
    ),
}
