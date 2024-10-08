// import { Scales } from '@phosphor-icons/react/dist/ssr';

import { useState } from 'react';
import Modal from './Modal';

const Impressum = () => {
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
              <p>own.page FlexCo</p>
              <br />
              <p>Entwicklung und Vertrieb von Software</p>
              <br />
              <p>UID-Nr: ATU80645937</p>
              <p>FN: 622398 t</p>
              <p>FB-Gericht: Wien</p>
              <p>Sitz: Süßenbrunner Straße 68/3/3 1220 Wien</p>
              <br />
              <p>Tel: 0676_6936944</p>
              <p>E-Mail: contact@own.page</p>
              <br />
              <p>Mitglied der WKÖ, WKW, UBIT</p>
              <p>Magistrat 1220 Wien</p>
              <p>
                Berufsrecht:{' '}
                <a href="https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=10007517">
                  Gewerbeordnung
                </a>
                : www.ris.bka.gv.at
              </p>
              <br />
              <p>
                Verbraucher haben die Möglichkeit, Beschwerden an die Online-
                Streitbeilegungsplattform der EU zu richten:
                http://ec.europa.eu/odr. Sie können allfällige Beschwerde auch
                an die oben angegebene E-Mail-Adresse richten.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Impressum;
