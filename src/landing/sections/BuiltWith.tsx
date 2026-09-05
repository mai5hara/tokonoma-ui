import { useId, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';

import { Section, SectionHeading } from '../ui';

const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'archived', label: 'Archived' },
];

/** Design Principles showed the parts. This shows what they build together. */
export function BuiltWith() {
  const nameId = useId();
  const statusId = useId();
  const [status, setStatus] = useState('active');

  return (
    <Section>
      <div className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Built with Tokonoma"
          title="What happens when they work together?"
          description="Components designed to work together as one system."
        />

        <div className="w-full max-w-md">
          <Card variant="raised">
            <CardHeader>
              <CardTitle>New project</CardTitle>
              <CardDescription>
                Shared field chrome and soft depth — one surface, several
                controls.
              </CardDescription>
            </CardHeader>
            <CardContent gap="4">
              <Field>
                <Label htmlFor={nameId}>Project name</Label>
                <Input
                  id={nameId}
                  variant="inset"
                  placeholder="Tokonoma gallery…"
                  aria-label="Project name"
                />
              </Field>
              <Field>
                <Label htmlFor={statusId}>Status</Label>
                <Select
                  id={statusId}
                  options={STATUS_OPTIONS}
                  value={status}
                  variant="inset"
                  onValueChange={setStatus}
                  placeholder="Choose status…"
                />
              </Field>
            </CardContent>
            <CardFooter align="end" gap="3">
              <Button type="button" variant="flat">
                Cancel
              </Button>
              <Button type="button" variant="accent">
                Create project
              </Button>
            </CardFooter>
          </Card>
        </div>

        <p className="text-sm text-text-subtle">
          Built with{' '}
          <span className="text-text-muted">
            Card · Button · Input · Select
          </span>
        </p>
      </div>
    </Section>
  );
}
