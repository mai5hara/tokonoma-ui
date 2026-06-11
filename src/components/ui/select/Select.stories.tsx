import { useId, useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { Label } from "@/components/ui/label"

import { Select, type SelectOption } from "."

const countryOptions: SelectOption[] = [
  { value: "jp", label: "Japan" },
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "de", label: "Germany", disabled: true },
]

const meta = {
  title: "Components/Select",
  component: Select,
  argTypes: {
    variant: {
      control: "select",
      options: ["border", "inset", "filled"],
    },
  },
  args: {
    variant: "border",
    placeholder: "Choose a country…",
    options: countryOptions,
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const onSurface = (node: React.ReactNode) => (
  <div className="max-w-md bg-surface p-8">{node}</div>
)

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = useState<string>()

    return onSurface(
      <Select {...args} value={value} onValueChange={setValue} />
    )
  },
}

export const Variants: Story = {
  render: function VariantsStory() {
    const [border, setBorder] = useState<string>()
    const [inset, setInset] = useState<string>()
    const [filled, setFilled] = useState<string>()

    return onSurface(
      <div className="space-y-4">
        <Select
          variant="border"
          options={countryOptions}
          value={border}
          onValueChange={setBorder}
          placeholder="Border"
        />
        <Select
          variant="inset"
          options={countryOptions}
          value={inset}
          onValueChange={setInset}
          placeholder="Inset"
        />
        <Select
          variant="filled"
          options={countryOptions}
          value={filled}
          onValueChange={setFilled}
          placeholder="Filled"
        />
      </div>
    )
  },
}

export const Rounded: Story = {
  render: () => onSurface(
    <div className="flex w-full flex-col gap-1.5">
      <Select options={countryOptions} rounded="sm" />
      <Select options={countryOptions} rounded="md" />
      <Select options={countryOptions} rounded="lg" />
      <Select options={countryOptions} rounded="full" />
    </div>
  ),
}

export const WithLabel: Story = {
  render: function WithLabelStory() {
    const id = useId()
    const [value, setValue] = useState<string>()

    return onSurface(
      <div className="flex w-full flex-col gap-1.5">
        <Label htmlFor={id} required>
          Country
        </Label>
        <Select
          id={id}
          options={countryOptions}
          value={value}
          onValueChange={setValue}
        />
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
          Country
        </Label>
        <Select
          id={id}
          options={countryOptions}
          errorMessage="Choose a country."
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "jp",
  },
  render: (args) => onSurface(<Select {...args} />),
}
