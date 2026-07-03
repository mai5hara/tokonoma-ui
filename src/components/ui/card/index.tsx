import * as React from 'react';

import { cn } from '@/lib/utils';

import {
  cardFooterAlign,
  cardVariants,
  type CardAppearanceProps,
  type CardFooterAlign,
} from './card-variants';

const cardSectionX = 'px-6 group-data-[size=sm]/card:px-4';

type CardProps = React.ComponentProps<'div'> & CardAppearanceProps;

/** Content container with header, body, footer, and optional media slots. */
function Card({ className, variant, size, ...props }: CardProps) {
  return (
    <div
      data-variant={variant}
      data-size={size}
      className={cn(cardVariants({ variant, size }), className)}
      {...props}
    />
  );
}

type CardHeaderProps = React.ComponentProps<'div'> & {
  /** Top-right controls (buttons, menus, links). */
  action?: React.ReactNode;
};

/** Title row with optional `action` slot in the top-right corner. */
function CardHeader({
  className,
  action,
  children,
  ...props
}: CardHeaderProps) {
  if (action) {
    return (
      <div className={cn(cardSectionX, className)} {...props}>
        <div className="grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-1">
          <div className="flex min-w-0 flex-col gap-1">{children}</div>
          <div className="self-start justify-self-end">{action}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn('flex flex-col gap-1', cardSectionX, className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardTitle({
  className,
  as: Comp = 'h3',
  ...props
}: React.ComponentProps<'h3'> & {
  /** Heading element. Defaults to `h3`. */
  as?: 'h2' | 'h3' | 'h4' | 'div';
}) {
  return (
    <Comp
      className={cn(
        'text-base font-medium leading-snug text-text-primary group-data-[size=sm]/card:text-sm',
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn('text-sm text-text-muted', className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn(cardSectionX, className)} {...props} />;
}

type CardFooterProps = React.ComponentProps<'div'> & {
  /** Horizontal alignment of footer content. */
  align?: CardFooterAlign;
};

function CardFooter({ className, align = 'start', ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-3',
        cardSectionX,
        cardFooterAlign[align],
        className,
      )}
      {...props}
    />
  );
}

/** Place first to bleed media to the top; top corners follow Card rounded-lg. */
function CardMedia({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        '-mt-6 w-full overflow-hidden group-data-[size=sm]/card:-mt-4',
        '[&_img]:block [&_img]:size-full [&_img]:object-cover',
        'rounded-t-lg',
        className,
      )}
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
  CardFooterProps,
  CardAppearanceProps,
};
export type { CardFooterAlign } from './card-variants';
