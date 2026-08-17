import * as React from 'react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { ImagePlus, XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { ClosedElementProps } from '@/lib/closed-api';

import { Button } from '../button';
import type { FieldAppearanceProps } from '../field-variants';

import { photoUploadVariants } from './photo-upload-variants';

function formatMaxSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${Math.round(bytes / (1024 * 1024))} MB`;
  }

  return `${Math.round(bytes / 1024)} KB`;
}

function _isFile(value: File | string | null): value is File {
  return value instanceof File;
}

type PhotoUploadProps = ClosedElementProps<
  Omit<
    React.ComponentProps<'input'>,
    'size' | 'type' | 'value' | 'defaultValue'
  >
> &
  FieldAppearanceProps & {
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
const PhotoUpload = React.forwardRef<HTMLInputElement, PhotoUploadProps>(
  (
    {
      value,
      defaultValue = null,
      onValueChange,
      accept = 'image/*',
      placeholder = 'Choose a photo…',
      disabled = false,
      errorMessage,
      maxSizeBytes,
      id: idProp,
      name,
      variant,
      rounded,
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const errorId = `${inputId}-error`;
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [sizeError, setSizeError] = useState<string | null>(null);
    const isControlled = value !== undefined;
    const [internalFile, setInternalFile] = useState<File | null>(defaultValue);
    const selected = isControlled ? (value ?? null) : internalFile;

    const previewUrl = useMemo(() => {
      if (!selected) {
        return null;
      }
      if (typeof selected === 'string') {
        return selected;
      }
      return URL.createObjectURL(selected);
    }, [selected]);

    const displayError = errorMessage ?? sizeError ?? undefined;
    const isInvalid = Boolean(displayError);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      if (!previewUrl || typeof selected === 'string') {
        return;
      }

      return () => {
        URL.revokeObjectURL(previewUrl);
      };
    }, [previewUrl, selected]);

    const setFile = (next: File | null) => {
      if (!isControlled) {
        setInternalFile(next);
      }
      onValueChange?.(next);
    };

    const resetInput = () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    };

    const acceptFile = (next: File | null) => {
      setSizeError(null);

      if (!next) {
        setFile(null);
        resetInput();
        return;
      }

      if (maxSizeBytes !== undefined && next.size > maxSizeBytes) {
        setSizeError(`File must be under ${formatMaxSize(maxSizeBytes)}.`);
        resetInput();
        return;
      }

      setFile(next);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      acceptFile(event.target.files?.[0] ?? null);
    };

    const openPicker = () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    };

    const handleClear = (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setSizeError(null);
      setFile(null);
      resetInput();
    };

    const handleDragEnter = (event: React.DragEvent) => {
      event.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (event: React.DragEvent) => {
      event.preventDefault();
      if (event.currentTarget.contains(event.relatedTarget as Node)) {
        return;
      }
      setIsDragging(false);
    };

    const handleDragOver = (event: React.DragEvent) => {
      event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent) => {
      event.preventDefault();
      setIsDragging(false);

      if (disabled) {
        return;
      }

      const dropped = event.dataTransfer.files?.[0];
      if (dropped) {
        acceptFile(dropped);
      }
    };

    const hasPreview = Boolean(selected && previewUrl);

    return (
      <div className="flex w-full flex-col gap-1.5">
        <div
          data-variant={variant}
          data-invalid={isInvalid || undefined}
          data-dragging={isDragging || undefined}
          className={cn(
            photoUploadVariants({
              variant,
              invalid: isInvalid,
              rounded,
              empty: !hasPreview,
            }),
            isDragging &&
              'border-accent ring-2 ring-accent/20 ring-offset-2 ring-offset-surface',
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={accept}
            name={name}
            disabled={disabled}
            multiple={false}
            aria-invalid={isInvalid || undefined}
            aria-describedby={isInvalid ? errorId : undefined}
            className="sr-only"
            onChange={handleInputChange}
            {...props}
          />

          {hasPreview && previewUrl ? (
            <>
              <button
                type="button"
                disabled={disabled}
                onClick={openPicker}
                aria-label="Replace photo"
                className="absolute inset-0 bg-transparent outline-none disabled:cursor-not-allowed"
              >
                <img
                  src={previewUrl}
                  alt={
                    _isFile(selected)
                      ? (selected.name ?? 'Selected photo preview')
                      : 'Selected photo preview'
                  }
                  className="size-full object-cover"
                />
              </button>
              <div className="absolute top-2 right-2 z-10 [&_button]:size-7 [&_button]:bg-surface-elevated/90 [&_button]:shadow-sm">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove photo"
                  disabled={disabled}
                  onClick={handleClear}
                >
                  <XIcon className="size-4 text-text-muted" aria-hidden />
                </Button>
              </div>
            </>
          ) : (
            <button
              type="button"
              disabled={disabled}
              onClick={openPicker}
              className="flex flex-col items-center gap-2 bg-transparent px-2 py-1 text-center outline-none disabled:cursor-not-allowed"
            >
              <ImagePlus className="size-5 text-text-muted" aria-hidden />
              <span className="text-sm text-text-subtle">{placeholder}</span>
            </button>
          )}
        </div>

        {displayError ? (
          <p id={errorId} role="alert" className="text-xs text-error">
            {displayError}
          </p>
        ) : null}
      </div>
    );
  },
);
PhotoUpload.displayName = 'PhotoUpload';

export { PhotoUpload };
export type { PhotoUploadProps };
export type { PhotoUploadVariantProps } from './photo-upload-variants';
export type { FieldAppearanceProps as PhotoUploadAppearanceProps } from '../field-variants';
