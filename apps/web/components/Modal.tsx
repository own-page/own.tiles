import React, { useRef, useEffect } from 'react';
import { X } from '@phosphor-icons/react/dist/ssr';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal = (props: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (props.isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [props.isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={props.onClose}
      className={`w-full h-full ${props.className || ''}`}
    >
      {props.children}
      <button
        onClick={props.onClose}
        className="absolute right-3 top-3 hover:bg-white/20 rounded-md p-1"
      >
        <X size="24" className="text-white" weight="bold" />
      </button>
    </dialog>
  );
};

export default Modal;
