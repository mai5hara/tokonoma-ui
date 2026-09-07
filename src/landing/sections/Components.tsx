import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Input } from '@/components/ui/input';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
} from '@/components/ui/modal';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { Select } from '@/components/ui/select';

import { STORYBOOK_URL } from '../constants';
import { Section, SectionHeading } from '../ui';

const SIZE_OPTIONS = [
  { value: 'sm', label: 'Small' },
  { value: 'lg', label: 'Large' },
];

function ComponentTile({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <Card variant="flat" size="sm">
      <CardContent gap="3">
        <p className="text-xs font-medium tracking-wide text-text-subtle uppercase">
          {name}
        </p>
        <div className="flex min-h-16 items-center">{children}</div>
      </CardContent>
    </Card>
  );
}

/** A handful of live components — not screenshots — each linking the idea to the doc. */
export function Components() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Section>
      <div className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Components"
          title="Explore the components"
          description="From primitives to composed controls, Tokonoma provides a consistent vocabulary for building interfaces."
        />

        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ComponentTile name="Button">
            <Button variant="raised" size="sm">
              Button
            </Button>
          </ComponentTile>

          <ComponentTile name="Card">
            <Card variant="inset" size="default">
              <CardContent>
                <span className="text-xs text-text-muted">Content</span>
              </CardContent>
            </Card>
          </ComponentTile>

          <ComponentTile name="Input">
            <Input placeholder="Type here…" aria-label="Input example" />
          </ComponentTile>

          <ComponentTile name="Select">
            <Select options={SIZE_OPTIONS} placeholder="Choose…" />
          </ComponentTile>

          <ComponentTile name="Radio">
            <RadioGroup
              orientation="horizontal"
              defaultValue="a"
              aria-label="Radio example"
            >
              <Radio value="a" size="sm">
                A
              </Radio>
              <Radio value="b" size="sm">
                B
              </Radio>
            </RadioGroup>
          </ComponentTile>

          <ComponentTile name="Accordion">
            <Accordion type="single" collapsible>
              <AccordionItem value="a">
                <AccordionTrigger>Details</AccordionTrigger>
                <AccordionContent>Expands in place.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </ComponentTile>

          <ComponentTile name="Modal">
            <Modal open={modalOpen} onOpenChange={setModalOpen}>
              <ModalTrigger asChild>
                <Button variant="flat" size="sm">
                  Preview
                </Button>
              </ModalTrigger>
              <ModalContent size="sm">
                <ModalHeader
                  title="Modal"
                  description="A focused dialog."
                  showClose
                />
                <ModalBody>
                  <p className="text-sm text-text-muted">
                    Overlay, title, body, and footer — composed from one API.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button variant="accent" onClick={() => setModalOpen(false)}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </ComponentTile>

          <ComponentTile name="DateRangePicker">
            <DateRangePicker placeholder="Select date range…" />
          </ComponentTile>
        </div>

        <div className="flex flex-col items-center gap-4 pt-2 text-center">
          <p className="text-sm text-text-muted">
            Every component, variant and state is documented in Storybook.
          </p>
          <div className="w-full max-w-none sm:max-w-[240px]">
            <ButtonLink
              href={STORYBOOK_URL}
              variant="accent"
              size="lg"
              width="full"
            >
              Open Storybook
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
