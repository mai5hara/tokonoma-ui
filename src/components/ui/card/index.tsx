import * as React from 'react';

import type { ClosedElementProps } from '@/lib/closed-api';
import { cn } from '@/lib/utils';

import {
  cardSectionVariants,
  cardVariants,
  type CardAppearanceProps,
  type CardSectionVariantProps,
  type CardSurfaceProps,
} from './card-variants';

const cardSectionX = 'px-6 group-data-[size=sm]/card:px-4';

type CardProps = ClosedElementProps<React.ComponentProps<'div'>> &
  CardAppearanceProps;

/** Content container with header, body, footer, and optional media slots. */
function Card({
  variant,
  size,
  interactive = false,
  tabIndex,
  ...props
}: CardProps) {
  return (
    <div
      data-variant={variant}
      data-size={size}
      data-interactive={interactive || undefined}
      tabIndex={interactive ? (tabIndex ?? 0) : tabIndex}
      className={cardVariants({ variant, size, interactive })}
      {...props}
    />
  );
}

type CardLinkProps = ClosedElementProps<React.ComponentProps<'a'>> &
  CardSurfaceProps & {
    /** Destination URL. Omitted when `aria-disabled` is set. */
    href?: string;
    /** Opens in a new tab with safe `rel` when true or `href` is http(s). */
    external?: boolean;
  };

/**
 * Anchor styled as a card. Prefer over wrapping `Card` when navigation is the
 * primary action. Always uses interactive depth hover/focus. Shares `variant`
 * and `size` with {@link Card}.
 */
const CardLink = React.forwardRef<HTMLAnchorElement, CardLinkProps>(
  (
    {
      variant,
      size,
      external,
      href,
      target,
      rel,
      'aria-disabled': ariaDisabled,
      onClick,
      tabIndex,
      ...props
    },
    ref,
  ) => {
    const isExternal =
      external ?? (typeof href === 'string' && /^https?:\/\//.test(href));
    const isDisabled = ariaDisabled === true || ariaDisabled === 'true';

    return (
      <a
        ref={ref}
        href={isDisabled ? undefined : href}
        target={isExternal ? '_blank' : target}
        rel={
          isExternal
            ? [rel, 'noopener', 'noreferrer'].filter(Boolean).join(' ')
            : rel
        }
        aria-disabled={ariaDisabled}
        tabIndex={isDisabled ? -1 : tabIndex}
        data-variant={variant}
        data-size={size}
        data-interactive=""
        className={cn(
          cardVariants({ variant, size, interactive: true }),
          isDisabled && 'pointer-events-none opacity-50',
        )}
        {...props}
        onClick={
          isDisabled
            ? (event) => {
                event.preventDefault();
                onClick?.(event);
              }
            : onClick
        }
      />
    );
  },
);
CardLink.displayName = 'CardLink';

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

/**
 * Place first to bleed media to the top; top corners follow Card rounded-lg.
 * Frame is a fixed 5∶3 ratio (same as PhotoUpload) so gallery cards share height.
 */
function CardMedia(props: ClosedElementProps<React.ComponentProps<'div'>>) {
  return (
    <div
      className="-mt-6 aspect-[5/3] w-full overflow-hidden rounded-t-lg group-data-[size=sm]/card:-mt-4 [&_img]:block [&_img]:size-full [&_img]:object-cover"
      {...props}
    />
  );
}

export {
  Card,
  CardLink,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardMedia,
};
export type {
  CardProps,
  CardLinkProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
  CardAppearanceProps,
  CardSurfaceProps,
};
