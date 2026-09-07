## 0.2.8

- Add `dark` theme palette (soft ink night surfaces + dark-tuned depth shadows)
- Add `CardLink` for navigational cards; strengthen `Card` interactive hover/focus depth
- Fix `CardMedia` to a fixed 5∶3 aspect ratio with `object-cover`
- Add Button Suimon ripple and shared motion styles; polish Accordion and Modal animations
- Fix DateRangePicker range endpoints and focus rings
- Add marketing landing page; deploy LP at site root and Storybook under `/storybook/`

## 0.2.7

- Add `Textarea` component

## 0.2.6

- Allow `PhotoUpload` `value` to be a URL `string` (in addition to `File`) so already-uploaded images can be previewed

## 0.2.5

- Add `RadioGroup` / `Radio` (`plain` · `border` · `filled` · `inset`) with group `errorMessage`
- Add `PhotoUpload` single-image field with full-width preview, drag-and-drop, and clear
- Add `Field` layout wrapper (`vertical` / `horizontal`)
- Add `Accordion` (`border` · `underline` · `filled` · `accent`; `chevron` / `plus` indicators)
- Align form Storybook stories (`Default`, `WithLabel`, `WithError`)

## 0.2.4

- Add `direction` and `gap` layout props to `CardContent` and `CardFooter` (shared section variants)

## 0.2.3

- Add MIT LICENSE and update README for public release
- Add `width` (`auto` | `full`) to `Button` and `ButtonLink`
- Remove `className` from public component props (closed API)
- Add `raised` variant to form fields (`Input`, `Select`, `DateRangePicker`)

## 0.2.2

- Add clear button to DateRangePicker

## 0.2.1

- Fix DateRangePicker type

## 0.2.0

- Add DateRangePicker

## 0.1.2

- Add `rounded` variant to Button; rebuild dist

## 0.1.1

- Add `rounded` variant to Input and Select; rebuild dist

## 0.1.0

- Initial library release (Button, Card, Input, Label, Modal, Select, theme)
