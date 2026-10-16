import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { utakmice, protivnik, vremenskaZona } from '../data.js';
import SectionTitle from './SectionTitle.jsx';
import BoxScore from './BoxScore.jsx';
import Grb from './Grb.jsx';

const formatDatuma = new Intl.DateTimeFormat('hr-HR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: vremenskaZona });

export default function Matches() {
  const [otvorena, setOtvorena] = useState(utakmice[0]?.id ?? null);

  return (
    <section id="utakmice" className="sekcija">
      <SectionTitle oznaka="Rezultati" naslov={`Zadnjih ${utakmice.length} utakmica`}>
        <div className="forma" aria-label="Forma">
          {utakmice.map((u) => {
            const pobjeda = u.rezultat.nasi > u.rezultat.protivnik;
            return (
              <span key={u.id} className={`znacka ${pobjeda ? 'znacka--p' : 'znacka--i'}`} title={protivnik(u.protivnik).ime}>
                {pobjeda ? 'P' : 'I'}
              </span>
            );
          })}
        </div>
        <p className="naslov-sekcije__opis">Klikni na utakmicu za statistiku igrača.</p>
      </SectionTitle>

      <div className="utakmice">
        {utakmice.map((u, i) => {
          const { nasi, protivnik: njihovi } = u.rezultat;
          const p = protivnik(u.protivnik);
          const pobjeda = nasi > njihovi;
          const jeOtvorena = otvorena === u.id;

          return (
            <motion.div
              key={u.id}
              className={`utakmica ${jeOtvorena ? 'utakmica--otvorena' : ''}`}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <button
                className="utakmica__zaglavlje"
                aria-expanded={jeOtvorena}
                onClick={() => setOtvorena(jeOtvorena ? null : u.id)}
              >
                <span className={`znacka ${pobjeda ? 'znacka--p' : 'znacka--i'}`}>{pobjeda ? 'P' : 'I'}</span>

                <Grb src={p.grb} ime={p.ime} className="utakmica__grb" />

                <span className="utakmica__info">
                  <span className="utakmica__datum">
                    {formatDatuma.format(new Date(u.datum))} · {u.domaci ? 'Doma' : 'U gostima'}
                  </span>
                  <span className="utakmica__protivnik">
                    {u.domaci ? 'vs' : '@'} {p.ime}
                  </span>
                  <span className="utakmica__natjecanje">{u.natjecanje}</span>
                </span>

                <span className="utakmica__rezultat">
                  <span className={pobjeda ? 'jace' : ''}>{nasi}</span>
                  <span className="utakmica__dvotocka">:</span>
                  <span className={!pobjeda ? 'jace' : ''}>{njihovi}</span>
                </span>

                <motion.span className="utakmica__strelica" animate={{ rotate: jeOtvorena ? 180 : 0 }} aria-hidden="true">
                  ▾
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {jeOtvorena && (
                  <motion.div
                    className="utakmica__detalji"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <BoxScore utakmica={u} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
