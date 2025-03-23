'use client';

import { X } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  trigger?: React.ReactNode;
};

const Modal = (props: ModalProps) => {
  const { children, className, trigger } = props;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="size-4 bg-red-500">asd</button>
      </DialogTrigger>
      <DialogContent
        className={`!size-full p-0 border-none bg-transparent shadow-none ${className || ''}`}
      >
        <div className="relative bg-background rounded-lg shadow-lg p-4 w-full h-full">
          {children}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-3 top-3 hover:bg-white/20 rounded-md p-1"
          >
            <X size="24" className="text-white" weight="bold" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
