import { DayFlag, SelectionState, UI, type ClassNames } from 'react-day-picker';

/** Popover panel (matches Select dropdown chrome). */
export const dateRangePickerContent = [
  'z-50 w-auto rounded-[16px] border border-border bg-surface-elevated p-0 text-text-primary shadow-[var(--shadow-card-raised)]',
].join(' ');

const dropdownRoot = [
  'relative inline-flex min-w-0 items-center gap-1',
  'rounded-md border border-border bg-surface-elevated px-2 py-1.5',
  'text-sm font-medium text-text-primary outline-none',
  'hover:border-border-strong',
  'focus-within:border-border-strong focus-within:ring-2 focus-within:ring-ring/40 focus-within:ring-inset',
  'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
].join(' ');

/** Invisible native select layered over the visible label (react-day-picker pattern). */
const dropdownSelect = [
  'absolute inset-0 z-[2] m-0 h-full w-full cursor-pointer appearance-none border-none bg-transparent p-0 opacity-0',
].join(' ');

/** Tailwind class map for react-day-picker (single-month range). */
export const calendarClassNames: Partial<ClassNames> = {
  [UI.Root]: 'p-3 rounded-lg',
  [UI.Months]: 'flex gap-5',
  [UI.Month]: 'relative space-y-4',
  [UI.MonthCaption]: 'relative flex h-9 items-center justify-end',
  [UI.Dropdowns]: 'flex items-center justify-center gap-2',
  [UI.Nav]: 'absolute left-4 top-5 z-10 flex gap-2',
  [UI.NextMonthButton]: [
    'flex size-6 -rotate-90 items-center justify-center rounded-md text-text-muted outline-none',
    'hover:bg-surface hover:text-text-primary',
    'focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset',
  ].join(' '),
  [UI.PreviousMonthButton]: [
    'flex size-6 rotate-90 items-center justify-center rounded-md text-text-muted outline-none',
    'hover:bg-surface hover:text-text-primary',
    'focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset',
  ].join(' '),
  [UI.DropdownRoot]: dropdownRoot,
  [UI.Dropdown]: dropdownSelect,
  [UI.MonthsDropdown]: 'max-w-[5.5rem]',
  [UI.YearsDropdown]: 'min-w-[4.5rem]',
  [UI.CaptionLabel]:
    'pointer-events-none inline-flex items-center gap-1 text-sm font-medium text-text-primary',
  [UI.Chevron]: 'size-4 shrink-0 text-text-muted',
  [UI.MonthGrid]: 'w-full border-collapse',
  [UI.Weekdays]: 'flex',
  [UI.Weekday]: 'w-9 text-center text-[0.8rem] font-normal text-text-muted',
  [UI.Week]: 'mt-2 flex w-full',
  [UI.Day]: [
    'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
    '[&:not([data-selected=true])_button:hover]:bg-surface',
  ].join(' '),
  [UI.DayButton]: [
    'inline-flex size-9 items-center justify-center rounded-md p-0 font-normal',
    'text-text-primary outline-none',
    'focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-inset',
    'aria-selected:opacity-100',
  ].join(' '),
  [DayFlag.today]: 'bg-surface font-medium text-text-primary rounded-md',
  [DayFlag.outside]: 'text-text-subtle opacity-50',
  [DayFlag.disabled]: 'text-text-subtle opacity-50',
  [DayFlag.hidden]: 'invisible',
  [SelectionState.selected]:
    'rounded-md bg-accent text-surface-elevated [&_button:hover]:bg-transparent',
  /*
   * range_* share the Day cell with `selected`. Force range geometry; same-day
   * (start+end) is restored in themes.css via .tokonoma-rdp-range-start.end.
   */
  [SelectionState.range_start]:
    'tokonoma-rdp-range-start !rounded-l-md rounded-r-none bg-accent text-surface-elevated [&_button:hover]:bg-transparent',
  [SelectionState.range_end]:
    'tokonoma-rdp-range-end !rounded-r-md rounded-l-none bg-accent text-surface-elevated [&_button:hover]:bg-transparent',
  [SelectionState.range_middle]:
    'rounded-none !bg-accent/15 text-text-primary hover:bg-accent/20 [&_button:hover]:bg-transparent',
};
