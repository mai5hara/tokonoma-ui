/** Shared layout + enum class maps for Modal (colors stay on semantic tokens in components). */
export declare const modalSectionX = "pl-6 pr-4";
export declare const modalTitleSize: {
    readonly sm: "text-sm font-medium leading-snug";
    readonly default: "text-base font-medium leading-snug";
    readonly lg: "text-lg font-medium leading-snug";
};
export declare const modalDescriptionSize: {
    readonly sm: "text-xs leading-normal";
    readonly default: "text-sm leading-normal";
};
export declare const modalContentSize: {
    readonly sm: "max-w-sm";
    readonly default: "max-w-lg";
    readonly lg: "max-w-2xl";
};
export declare const modalFooterAlign: {
    readonly end: "justify-end";
    readonly center: "justify-center";
    readonly start: "justify-start";
};
export declare const modalTextAlign: {
    readonly start: "text-start";
    readonly center: "text-center";
};
export declare const modalOverlay: string;
export declare const modalContentPanel: string;
export type ModalTitleSize = keyof typeof modalTitleSize;
export type ModalDescriptionSize = keyof typeof modalDescriptionSize;
export type ModalContentSize = keyof typeof modalContentSize;
export type ModalFooterAlign = keyof typeof modalFooterAlign;
export type ModalTextAlign = keyof typeof modalTextAlign;
