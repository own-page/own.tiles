import { useRef, useEffect } from 'react';
import { X } from '@phosphor-icons/react/dist/ssr';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal = (props: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (props.isOpen) {
      // Store the element that had focus before opening the modal
      previousFocusRef.current = document.activeElement as HTMLElement;
      dialog.showModal();

      // Add event listener for the Escape key to close the modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          props.onClose();
        }
      };

      dialog.addEventListener('keydown', handleKeyDown);

      // Focus trap setup
      const focusableElements = dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }

      return () => {
        dialog.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      dialog.close();
      // Restore focus when modal closes
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [props.isOpen, props.onClose]);

  return (
    <dialog
      ref={dialogRef}
      onClose={props.onClose}
      className={`w-full h-full ${props.className || ''}`}
      aria-modal="true"
      aria-labelledby="modal-title"
      role="dialog"
    >
      <div id="modal-title" className="sr-only">
        Modal dialog
      </div>
      {props.children}
      <button
        onClick={props.onClose}
        className="absolute right-3 top-3 hover:bg-white/20 rounded-md p-1"
        aria-label="Close modal"
      >
        <X
          size="24"
          className="text-white"
          weight="bold"
          aria-label="Close modal"
        />
      </button>
    </dialog>
  );
};

export default Modal;
