import { useId } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Input } from "@/components/ui/input"

import { Label } from "."

const meta = {
  title: "Components/Label",
  component: Label,
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
  args: {
    children: "Email",
    htmlFor: "email",
    size: "default",
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

const onSurface = (node: React.ReactNode) => (
  <div className="max-w-md bg-surface p-8">{node}</div>
)

export const Default: Story = {
  render: (args) => onSurface(<Label {...args} />),
}

export const Required: Story = {
  args: {
    required: true,
  },
  render: (args) => onSurface(<Label {...args} />),
}

export const WithInput: Story = {
  render: function WithInputStory() {
    const id = useId()

    return onSurface(
      <div className="flex w-full flex-col gap-1.5">
        <Label htmlFor={id} required>
          Email
        </Label>
        <Input id={id} type="email" placeholder="you@example.com" />
      </div>
    )
  },
}

export const WithError: Story = {
  render: function WithErrorStory() {
    const id = useId()

    return onSurface(
      <div className="flex w-full flex-col gap-1.5">
        <Label htmlFor={id} required>
          Email
        </Label>
        <Input
          id={id}
          type="email"
          defaultValue="not-an-email"
          errorMessage="Enter a valid email address."
        />
      </div>
    )
  },
}
