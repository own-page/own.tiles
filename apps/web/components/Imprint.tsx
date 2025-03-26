// import { Scales } from '@phosphor-icons/react/dist/ssr';

import Modal from './Modal';

const Imprint = () => {
  return (
    <Modal
      className="rounded-3xl max-w-lg !left-1/2 !translate-x-[-50%] !translate-y-[-50%] !top-[50%] !h-[600px] w-full bg-white/10 backdrop-blur-xl border border-white/20"
      trigger={
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
        >
          {/* <Scales size={16} weight="fill" /> */}
          Imprint
        </button>
      }
    >
      <div className="max-w-xl flex flex-col m-auto p-6 font-mono text-white">
        <h1 className="text-2xl font-bold mb-6">Imprint</h1>

        <div className="space-y-2">
          <h2 className="text-lg font-bold">own.page FlexCo</h2>

          <p>
            <span className="font-semibold">Registered address:</span>{' '}
            Süßenbrunner Straße 68/3/3, 1220 Vienna, Austria
          </p>
          <p>
            <span className="font-semibold">Email:</span>{' '}
            <a
              href="mailto:contact@own.page"
              className="text-white underline hover:text-white/70"
            >
              contact@own.page
            </a>
          </p>
          <p>
            <span className="font-semibold">Website:</span>{' '}
            <a
              href="https://www.own.page"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-white/70"
            >
              www.own.page
            </a>
          </p>

          <p>
            <span className="font-semibold">Legal Form:</span> Flexible Company
          </p>
          <p>
            <span className="font-semibold">Business Purpose:</span> Providing
            software services for website development and hosting solutions
            tailored for businesses and individuals.
          </p>

          <p>
            <span className="font-semibold">Company Register number:</span>{' '}
            622398 t
          </p>
          <p>
            <span className="font-semibold">UID:</span> ATU80645937
          </p>
          <p>
            <span className="font-semibold">Commercial register court:</span>{' '}
            Commercial Court of Vienna
          </p>

          <div className="mt-4">
            <p className="font-semibold">
              Managing director and responsible for content:
            </p>
            <p>Dominik Scholz and Elitza Vasileva</p>
            <p>Vienna, Austria</p>
          </div>
        </div>

        <div
          className="w-full mt-6 font-mono"
          dangerouslySetInnerHTML={{
            __html: process.env.NEXT_PUBLIC_IMPRINT_DATA || ''
          }}
        />
      </div>
    </Modal>
  );
};

export default Imprint;
