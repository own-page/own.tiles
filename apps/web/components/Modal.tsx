'use client';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';

type ModalProps = {
  children: React.ReactNode;
  className?: string;
  trigger: React.ReactNode;
};

const Modal = (props: ModalProps) => {
  const { children, trigger } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          '!inset-8 fixed !transform-none max-w-full w-auto p-0 flex justify-center items-center bg-white/10 border-white/20 backdrop-blur-lg',
          props.className
        )}
      >
        <DialogTitle className="sr-only">Tile Config</DialogTitle>
        <DialogDescription className="sr-only">
          Allows configuration of the tile
        </DialogDescription>
        <div className="relative w-full max-w-screen-md">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
