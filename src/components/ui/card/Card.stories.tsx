import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from "."

const meta = {
  title: "Components/Card",
  component: Card,
  subcomponents: {
    CardHeader,
    CardTitle,
    CardFooter,
  },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Content container composed of `CardHeader`, `CardContent`, `CardFooter`, and optional `CardMedia`. Colors follow the active theme.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["flat", "inset", "raised"],
      description:
        "`flat` — border only, no depth. `raised` / `inset` — soft depth on `surface`.",
      table: {
        type: { summary: "flat | raised | inset" },
        defaultValue: { summary: "flat" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm"],
      description: "Padding density. `sm` for compact layouts.",
      table: {
        type: { summary: "default | sm" },
        defaultValue: { summary: "default" },
      },
    },
    className: { table: { disable: true } },
  },
  args: {
    variant: "flat",
    size: "default",
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

const cardBody = (
  <>
    <CardHeader>
      <CardTitle>Focal content</CardTitle>
      <CardDescription>
        Keep supporting copy quiet so the main content reads first.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-text-muted">
        <strong className="text-text-primary">flat</strong> uses a border only.{" "}
        <strong className="text-text-primary">raised</strong> and{" "}
        <strong className="text-text-primary">inset</strong> match the page{" "}
        <code className="text-text-subtle">surface</code> background with light
        depth shadows.
      </p>
    </CardContent>
    <CardFooter>
      <span className="text-text-subtle text-xs">Footer</span>
    </CardFooter>
  </>
)

const cardOnSurface = (args: Story["args"], children = cardBody) => (
  <div className="max-w-md bg-surface p-8">
    <Card {...args}>{children}</Card>
  </div>
)

/** Canonical entry — keeps the `components-ui-card--default` story id. */
export const Default: Story = {
  args: { variant: "flat" },
  render: (args) => cardOnSurface(args),
}

export const WithAction: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="max-w-md bg-surface p-8">
      <Card variant="flat">
        <CardHeader
          action={
            <Button variant="flat" size="sm">
              Edit
            </Button>
          }
        >
          <CardTitle>Title</CardTitle>
          <CardDescription>
            Pass controls via the <code className="text-text-subtle">action</code>{" "}
            prop on CardHeader.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-text-muted">The action prop is optional.</p>
        </CardContent>
      </Card>
    </div>
  ),
}

export const WithMedia: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="max-w-md bg-surface p-8">
      <Card variant="raised">
        <CardMedia>
          <img
            src="https://picsum.photos/seed/tokonoma/640/240"
            alt="Sample artwork"
            width={640}
            height={240}
          />
        </CardMedia>
        <CardHeader>
          <CardTitle>With media</CardTitle>
          <CardDescription>
            CardMedia as the first child bleeds to the top edge.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-text-muted">Useful for gallery-style layouts.</p>
        </CardContent>
      </Card>
    </div>
  ),
}
