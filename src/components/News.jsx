import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { klub, protivnik } from '../data.js';
import { novosti } from '../novosti.js';
import Grb from './Grb.jsx';
import Traka from './Traka.jsx';

const formatDatuma = new Intl.DateTimeFormat('hr-HR', { day: 'numeric', month: 'long', year: 'numeric' });

export default function News() {
  const kategorije = ['Sve', ...new Set(novosti.map((n) => n.kategorija))];
  const [kategorija, setKategorija] = useState('Sve');
  const prikazane = kategorija === 'Sve' ? novosti : novosti.filter((n) => n.kategorija === kategorija);
  const [glavna, ...ostale] = prikazane;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="novosti">
      <section className="novosti__uvod">
        <motion.p className="oznaka-sekcije" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {klub.ime}
        </motion.p>
        <motion.h1
          className="povijest__naslov"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
        >
          Novosti
        </motion.h1>
        <motion.p
          className="povijest__opis"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Izvještaji s utakmica i vijesti o klubu. Klikni na članak za cijeli tekst na izvornoj stranici.
        </motion.p>
      </section>

      <Traka className="traka--stranica" />

      <section className="sekcija">
        <div className="alati">
          <div className="filteri">
            {kategorije.map((k) => (
              <button
                key={k}
                className={`filter ${kategorija === k ? 'filter--aktivan' : ''}`}
                aria-pressed={kategorija === k}
                onClick={() => setKategorija(k)}
              >
                {kategorija === k && (
                  <motion.span layoutId="novosti-filter" className="filter__pozadina" transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }} />
                )}
                <span className="filter__tekst">{k}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={kategorija}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {glavna && <Clanak clanak={glavna} istaknut />}
            <div className="clanci">
              {ostale.map((n, i) => (
                <Clanak key={n.link} clanak={n} redniBroj={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      <div className="povijest__povratak">
        <a href="#pocetna" className="gumb gumb--primarni">← Natrag na početnu</a>
      </div>
    </div>
  );
}

function Clanak({ clanak, istaknut, redniBroj = 0 }) {
  const p = clanak.protivnik ? protivnik(clanak.protivnik) : null;
  return (
    <motion.a
      href={clanak.link}
      target="_blank"
      rel="noreferrer"
      className={`clanak ${istaknut ? 'clanak--istaknut' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: Math.min(redniBroj * 0.06, 0.3) }}
      whileHover={{ y: -6 }}
    >
      <div className="clanak__slika">
        {clanak.slika ? (
          <img src={clanak.slika} alt={clanak.naslov} loading="lazy" />
        ) : (
          <div className="clanak__slika-prazna" />
        )}
        <div className="clanak__grbovi" aria-hidden="true">
          <img className="grb clanak__grb" src="logo.png" alt="" />
          {p && (
            <>
              <span className="clanak__vs">vs</span>
              <Grb src={p.grb} ime={p.ime} className="clanak__grb" />
            </>
          )}
        </div>
        {clanak.slikaAutor && <span className="clanak__zasluge">Foto: {clanak.slikaAutor}</span>}
      </div>
      <div className="clanak__tijelo">
        <div className="clanak__meta">
          <span className="clanak__kategorija">{clanak.kategorija}</span>
          <span>{formatDatuma.format(new Date(clanak.datum))}</span>
        </div>
        <h2 className="clanak__naslov">{clanak.naslov}</h2>
        <p className="clanak__sazetak">{clanak.sazetak}</p>
        <span className="clanak__izvor">
          Pročitaj na: {clanak.izvor} <span aria-hidden="true">↗</span>
        </span>
      </div>
    </motion.a>
  );
}
