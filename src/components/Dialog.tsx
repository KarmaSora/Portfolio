"use client";

import { useEffect, useId, useRef, type KeyboardEventHandler, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
  title: string;
  description?: string;
  closeLabel?: string;
  onClose: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLDialogElement>;
  className?: string;
  children: ReactNode;
}

export function Dialog({ title, description, closeLabel = "Close dialog", onClose, onKeyDown, className, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) {
        trigger.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      className={cn(
        "fixed inset-0 m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-5xl overflow-y-auto overscroll-contain rounded-2xl border border-border bg-card p-0 text-foreground shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-sm",
        className,
      )}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented || event.key !== "Tab") return;

        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )).filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first) {
          event.preventDefault();
          return;
        }
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
          onClose();
        }
      }}
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-card p-4 sm:px-6">
        <div className="min-w-0 self-center">
          <h2 id={titleId} className="text-lg font-semibold break-words">{title}</h2>
          {description && <p id={descriptionId} className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>}
        </div>
        <button type="button" onClick={onClose} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg hover:bg-secondary" aria-label={closeLabel}>
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </dialog>
  );
}
