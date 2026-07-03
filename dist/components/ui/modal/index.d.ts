import { ModalContentSize, ModalDescriptionSize, ModalFooterAlign, ModalTextAlign, ModalTitleSize } from './modal-variants';
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
declare const Modal: React.FC<DialogPrimitive.DialogProps>;
declare const ModalTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
type ModalContentProps = {
    size?: ModalContentSize;
    /** Aligns title, description, and body text. Footer button row uses `ModalFooter` `align`. */
    textAlign?: ModalTextAlign;
    children: React.ReactNode;
};
declare function ModalContent({ size, textAlign, children, }: ModalContentProps): React.JSX.Element;
type ModalHeaderProps = {
    title: string;
    description?: string;
    titleSize?: ModalTitleSize;
    descriptionSize?: ModalDescriptionSize;
    /** Renders the default close control in the top-right corner. */
    showClose?: boolean;
};
declare function ModalHeader({ title, description, titleSize, descriptionSize, showClose, }: ModalHeaderProps): React.JSX.Element;
type ModalBodyProps = {
    children: React.ReactNode;
};
declare function ModalBody({ children }: ModalBodyProps): React.JSX.Element;
type ModalFooterProps = {
    align?: ModalFooterAlign;
    children: React.ReactNode;
};
declare function ModalFooter({ align, children }: ModalFooterProps): React.JSX.Element;
export { Modal, ModalTrigger, ModalContent, ModalHeader, ModalBody, ModalFooter };
export type { ModalContentProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps, };
export type { ModalContentSize, ModalDescriptionSize, ModalFooterAlign, ModalTextAlign, ModalTitleSize, } from './modal-variants';
