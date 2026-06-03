/** Dropdown panel and items (trigger uses shared fieldVariants). */

export const selectContent = [
  "relative z-50 overflow-hidden rounded-md border border-border bg-surface-elevated text-text-primary shadow-[var(--shadow-card-raised)]",
  "min-w-[var(--radix-select-trigger-width)]",
  "max-h-[min(var(--radix-select-content-available-height),16rem)]",
].join(" ")

export const selectViewport = "p-1"

export const selectItem = [
  "relative flex cursor-default select-none items-center rounded-sm py-2 pr-8 pl-3 text-sm outline-none",
  "data-highlighted:bg-surface data-highlighted:text-text-primary",
  "data-disabled:pointer-events-none data-disabled:opacity-50",
].join(" ")

export const selectItemIndicator =
  "absolute right-2 inline-flex size-4 items-center justify-center text-text-muted"
