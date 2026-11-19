import { useEffect, useRef, type ReactNode } from "react";
import { CloseIcon } from "./Icons";

type DialogProps = { children: ReactNode; onClose: () => void; className?: string; labelledBy: string };

export default function Dialog({ children, onClose, className = "", labelledBy }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const node = ref.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const scrollStyle = document.body.style.overflow;
    node?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node?.close();
      document.body.style.overflow = scrollStyle;
      if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog ref={ref} className={`dialog ${className}`} aria-labelledby={labelledBy}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}>
      <button type="button" className="dialog-close" aria-label="Close dialog" onClick={onClose}><CloseIcon /></button>
      {children}
    </dialog>
  );
}