import { ClosedElementProps } from '../../../lib/closed-api';
import { FieldAppearanceProps } from '../field-variants';
import * as React from 'react';
type PhotoUploadProps = ClosedElementProps<Omit<React.ComponentProps<'input'>, 'size' | 'type' | 'value' | 'defaultValue'>> & FieldAppearanceProps & {
    /**
     * Current image. Pass a `File` for a new pick, or a URL `string` to preview
     * an already-uploaded image. Pair with `onValueChange` for controlled usage.
     */
    value?: File | string | null;
    /** Initial file when uncontrolled. */
    defaultValue?: File | null;
    /** Called when the file changes or is cleared. */
    onValueChange?: (file: File | null) => void;
    /** Accepted MIME types or extensions. Defaults to `image/*`. */
    accept?: string;
    /** Shown when no file is selected. */
    placeholder?: string;
    /** When set, applies error styling and renders helper text below. */
    errorMessage?: string;
    /** Rejects files larger than this size (bytes) with inline feedback. */
    maxSizeBytes?: number;
    /** Associates the control with an external {@link Label} via `htmlFor`. */
    id?: string;
};
/**
 * Single-image upload with full-width preview. Uses the same field chrome as
 * {@link Input}. Pair with {@link Label}.
 */
declare const PhotoUpload: React.ForwardRefExoticComponent<Omit<PhotoUploadProps, "ref"> & React.RefAttributes<HTMLInputElement>>;
export { PhotoUpload };
export type { PhotoUploadProps };
export type { PhotoUploadVariantProps } from './photo-upload-variants';
export type { FieldAppearanceProps as PhotoUploadAppearanceProps } from '../field-variants';
