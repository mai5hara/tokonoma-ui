import type { Meta, StoryObj } from "@storybook/react-vite"

import { Colors } from "."

const meta = {
  title: "Foundations/Colors",
  component: Colors,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: {
      disable: true,
    },
    docs: {
      description: {
        component:
          "Primitive color scales (`ink`, `clay`, `moss`, `mist`, `neutral`) defined in `@theme`. Components use **semantic** tokens (`text-text-primary`, `bg-surface`, `text-accent`, …) that remap when you switch the **Theme** toolbar.",
      },
    },
  },
} satisfies Meta<typeof Colors>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {}
