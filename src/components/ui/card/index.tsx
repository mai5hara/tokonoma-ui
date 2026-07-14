import * as React from 'react';

import type { ClosedElementProps } from '@/lib/closed-api';

import {
  cardSectionVariants,
  cardVariants,
  type CardAppearanceProps,
  type CardSectionVariantProps,
} from './card-variants';

const cardSectionX = 'px-6 group-data-[size=sm]/card:px-4';

type CardProps = ClosedElementProps<React.ComponentProps<'div'>> &
  CardAppearanceProps;

/** Content container with header, body, footer, and optional media slots. */
function Card({ variant, size, ...props }: CardProps) {
  return (
    <div
      data-variant={variant}
      data-size={size}
      className={cardVariants({ variant, size })}
      {...props}
    />
  );
}

type CardHeaderProps = ClosedElementProps<React.ComponentProps<'div'>> & {
  /** Top-right controls (buttons, menus, links). */
  action?: React.ReactNode;
};

/** Title row with optional `action` slot in the top-right corner. */
function CardHeader({ action, children, ...props }: CardHeaderProps) {
  if (action) {
    return (
      <div className={cardSectionX} {...props}>
        <div className="grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1">
          <div className="flex min-w-0 flex-col gap-1">{children}</div>
          <div className="self-start justify-self-end">{action}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-1 ${cardSectionX}`} {...props}>
      {children}
    </div>
  );
}

function CardTitle({
  as: Comp = 'h3',
  ...props
}: ClosedElementProps<React.ComponentProps<'h3'>> & {
  /** Heading element. Defaults to `h3`. */
  as?: 'h2' | 'h3' | 'h4' | 'div';
}) {
  return (
    <Comp
      className="text-base font-medium leading-snug text-text-primary group-data-[size=sm]/card:text-sm"
      {...props}
    />
  );
}

function CardDescription(props: ClosedElementProps<React.ComponentProps<'p'>>) {
  return <p className="text-sm text-text-muted" {...props} />;
}

type CardContentProps = ClosedElementProps<React.ComponentProps<'div'>> & {
  /** Flex direction for children. Defaults to `col`. */
  direction?: NonNullable<CardSectionVariantProps['direction']>;
  /**
   * Gap between children (Tailwind scale). Defaults to `0`.
   * Maps to `gap-0` … `gap-8`.
   */
  gap?: NonNullable<CardSectionVariantProps['gap']>;
};

/** Main body slot. Use `direction` and `gap` to lay out multiple children. */
function CardContent({ direction, gap, ...props }: CardContentProps) {
  return (
    <div
      data-direction={direction}
      data-gap={gap}
      className={cardSectionVariants({ direction, gap })}
      {...props}
    />
  );
}

type CardFooterProps = ClosedElementProps<React.ComponentProps<'div'>> & {
  /** Flex direction for children. Defaults to `row`. */
  direction?: NonNullable<CardSectionVariantProps['direction']>;
  /**
   * Gap between children (Tailwind scale). Defaults to `3`.
   * Maps to `gap-0` … `gap-8`.
   */
  gap?: NonNullable<CardSectionVariantProps['gap']>;
  /** Main-axis alignment when `direction="row"`. Defaults to `start`. */
  align?: NonNullable<CardSectionVariantProps['align']>;
};

/** Footer slot for actions. Defaults to a horizontal row with `gap="3"`. */
function CardFooter({
  direction = 'row',
  gap = '3',
  align,
  ...props
}: CardFooterProps) {
  return (
    <div
      data-direction={direction}
      data-gap={gap}
      data-align={align}
      className={cardSectionVariants({ direction, gap, align })}
      {...props}
    />
  );
}

/** Place first to bleed media to the top; top corners follow Card rounded-lg. */
function CardMedia(props: ClosedElementProps<React.ComponentProps<'div'>>) {
  return (
    <div
      className="-mt-6 w-full overflow-hidden group-data-[size=sm]/card:-mt-4 [&_img]:block [&_img]:size-full [&_img]:object-cover rounded-t-lg"
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardMedia,
};
export type {
  CardProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
  CardAppearanceProps,
};
