import { ModalContentSize, ModalDescriptionSize, ModalFooterAlign, ModalTextAlign, ModalTitleSize } from './modal-variants';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
declare const Modal: React.FC<DialogPrimitive.DialogProps>;
/** Unstyled trigger; use with `asChild` to wrap a {@link Button}. */
declare const ModalTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
type ModalContentProps = {
    /** Maximum panel width. */
    size?: ModalContentSize;
    /**
     * Aligns title, description, and body text. Footer button row uses
     * {@link ModalFooter} `align`.
     */
    textAlign?: ModalTextAlign;
    children: React.ReactNode;
};
/** Dialog panel with overlay. Compose with {@link ModalHeader}, {@link ModalBody}, and {@link ModalFooter}. */
declare function ModalContent({ size, textAlign, children, }: ModalContentProps): import("react/jsx-runtime").JSX.Element;
type ModalHeaderProps = {
    title: string;
    description?: string;
    /** Title typography scale. */
    titleSize?: ModalTitleSize;
    /** Description typography scale. */
    descriptionSize?: ModalDescriptionSize;
    /** Renders the default close control in the top-right corner. */
    showClose?: boolean;
};
/** Accessible title and optional description. Inherits `textAlign` from {@link ModalContent}. */
declare function ModalHeader({ title, description, titleSize, descriptionSize, showClose, }: ModalHeaderProps): import("react/jsx-runtime").JSX.Element;
type ModalBodyProps = {
    children: React.ReactNode;
};
/** Scrollable content region between header and footer. */
declare function ModalBody({ children }: ModalBodyProps): import("react/jsx-runtime").JSX.Element;
type ModalFooterProps = {
    /** Horizontal alignment of action buttons. */
    align?: ModalFooterAlign;
    children: React.ReactNode;
};
/** Action row. Use `flat` for cancel and `accent` for the primary action. */
declare function ModalFooter({ align, children }: ModalFooterProps): import("react/jsx-runtime").JSX.Element;
export { Modal, ModalTrigger, ModalContent, ModalHeader, ModalBody, ModalFooter, };
export type { ModalContentProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps, };
export type { ModalContentSize, ModalDescriptionSize, ModalFooterAlign, ModalTextAlign, ModalTitleSize, } from './modal-variants';
