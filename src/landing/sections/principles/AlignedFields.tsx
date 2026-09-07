import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

const CATEGORY_OPTIONS = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'research', label: 'Research' },
];

/** 3-4 — Input, Select, and DateRangePicker share the same field chrome. */
export function AlignedFields() {
  return (
    <div className="flex flex-col gap-5 sm:gap-8 rounded-xl border border-border bg-surface-elevated p-6 sm:p-8">
      <h3 className="text-lg font-medium text-text-primary text-center">
        Different fields. One visual language.
      </h3>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field>
          <Label htmlFor="lp-name">Name</Label>
          <Input id="lp-name" placeholder="Enter your name" />
        </Field>
        <Field>
          <Label htmlFor="lp-category">Category</Label>
          <Select
            id="lp-category"
            options={CATEGORY_OPTIONS}
            placeholder="Select category"
          />
        </Field>
        <Field>
          <Label htmlFor="lp-date">Date</Label>
          <DateRangePicker id="lp-date" placeholder="Select a date" />
        </Field>
      </div>

      <div className="max-w-sm">
        <Field>
          <Label htmlFor="lp-email">Email</Label>
          <Input
            id="lp-email"
            defaultValue="invalid@email"
            errorMessage="Please enter a valid email."
          />
        </Field>
      </div>

      <p className="text-sm text-text-muted text-center">
        Input, Select, and DateRangePicker share the same field chrome and error
        treatment.
      </p>
    </div>
  );
}
