// import { Scales } from '@phosphor-icons/react/dist/ssr';

import { useState } from 'react';
import Modal from './Modal';

const Imprint = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="flex-1 py-1.5 px-3.5 sm-2
      rounded-full text-sm antialiased
      backdrop-blur-xl
     
      border border-solid 
      border-white/0
      text-white

      hover:opacity-70

      flex items-center gap-2
      cursor-pointer
      ease-in-out"
        onClick={() => setIsOpen(true)}
      >
        {/* <Scales size={16} weight="fill" /> */}
        Imprint
      </button>
      {isOpen && (
        <Modal
          className="rounded-3xl max-w-lg bg-gray-50/70 backdrop-blur-xl border border-white/20"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <div className="max-w-xl flex flex-col m-auto p-6 font-mono text-black/70">
            <h1 className="text-2xl font-bold">Imprint</h1>
            <div className="w-full h-2/3 mt-6 font-mono">
              {process.env.NEXT_PUBLIC_IMPRINT_DATA}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Imprint;
