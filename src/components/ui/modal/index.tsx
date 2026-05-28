import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  modalContentPanel,
  modalContentSize,
  modalDescriptionSize,
  modalFooterAlign,
  modalOverlay,
  modalSectionX,
  modalTextAlign,
  modalTitleSize,
  type ModalContentSize,
  type ModalDescriptionSize,
  type ModalFooterAlign,
  type ModalTextAlign,
  type ModalTitleSize,
} from "./modal-variants"

const Modal = DialogPrimitive.Root
const ModalTrigger = DialogPrimitive.Trigger

const ModalTextAlignContext = React.createContext<ModalTextAlign>("start")

function useModalTextAlign() {
  return React.useContext(ModalTextAlignContext)
}

type ModalContentProps = {
  size?: ModalContentSize
  /** Aligns title, description, and body text. Footer button row uses `ModalFooter` `align`. */
  textAlign?: ModalTextAlign
  children: React.ReactNode
}

function ModalContent({
  size = "default",
  textAlign = "start",
  children,
}: ModalContentProps) {
  return (
    <ModalTextAlignContext.Provider value={textAlign}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={modalOverlay} />
        <DialogPrimitive.Content
          className={`${modalContentPanel} ${modalContentSize[size]}`}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </ModalTextAlignContext.Provider>
  )
}

type ModalHeaderProps = {
  title: string
  description?: string
  titleSize?: ModalTitleSize
  descriptionSize?: ModalDescriptionSize
  /** Renders the default close control in the top-right corner. */
  showClose?: boolean
}

function ModalHeader({
  title,
  description,
  titleSize = "default",
  descriptionSize = "default",
  showClose = false,
}: ModalHeaderProps) {
  const textAlign = useModalTextAlign()
  const heading = (
    <div
      className={`flex min-w-0 flex-col gap-1 ${textAlign === "start" && showClose ? "pr-3" : ""}`}
    >
      <DialogPrimitive.Title
        className={`${modalTitleSize[titleSize]} text-text-primary`}
      >
        {title}
      </DialogPrimitive.Title>
      {description ? (
        <DialogPrimitive.Description
          className={`${modalDescriptionSize[descriptionSize]} text-text-muted`}
        >
          {description}
        </DialogPrimitive.Description>
      ) : null}
    </div>
  )

  const sectionClass = `pt-5 pb-2 ${modalSectionX} ${modalTextAlign[textAlign]}`

  if (!showClose) {
    return <div className={sectionClass}>{heading}</div>
  }

  return (
    <div className={`relative ${sectionClass}`}>
      {heading}
      <DialogPrimitive.Close asChild className="absolute right-2.5 top-2.5">
        <Button type="button" variant="ghost" size="icon" aria-label="Close">
          <X className="size-4" aria-hidden />
        </Button>
      </DialogPrimitive.Close>
    </div>
  )
}

type ModalBodyProps = {
  children: React.ReactNode
}

function ModalBody({ children }: ModalBodyProps) {
  const textAlign = useModalTextAlign()

  return (
    <div
      className={`flex-1 overflow-y-auto py-3 ${modalSectionX} ${modalTextAlign[textAlign]}`}
    >
      {children}
    </div>
  )
}

type ModalFooterProps = {
  align?: ModalFooterAlign
  children: React.ReactNode
}

function ModalFooter({ align = "end", children }: ModalFooterProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 py-4 ${modalFooterAlign[align]} ${modalSectionX}`}
    >
      {children}
    </div>
  )
}

export { Modal, ModalTrigger, ModalContent, ModalHeader, ModalBody, ModalFooter }
export type {
  ModalContentProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
}
export type {
  ModalContentSize,
  ModalDescriptionSize,
  ModalFooterAlign,
  ModalTextAlign,
  ModalTitleSize,
} from "./modal-variants"
