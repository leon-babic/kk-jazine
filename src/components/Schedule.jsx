import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { klub, raspored, protivnik, sljedecaUtakmica, vremenskaZona } from '../data.js';
import SectionTitle from './SectionTitle.jsx';
import Grb from './Grb.jsx';

const formatDana = new Intl.DateTimeFormat('hr-HR', { weekday: 'short', day: 'numeric', month: 'numeric', timeZone: vremenskaZona });
const formatSata = new Intl.DateTimeFormat('hr-HR', { hour: '2-digit', minute: '2-digit', timeZone: vremenskaZona });
const formatMjeseca = new Intl.DateTimeFormat('hr-HR', { month: 'long', year: 'numeric', timeZone: vremenskaZona });

const filteri = [
  { id: 'sve', tekst: 'Sve' },
  { id: 'doma', tekst: 'Doma' },
  { id: 'gosti', tekst: 'U gostima' },
];

export default function Schedule() {
  const [filter, setFilter] = useState('sve');
  const [sve, setSve] = useState(false);
  const sljedeca = sljedecaUtakmica();

  const filtrirano = raspored.filter((r) => filter === 'sve' || (filter === 'doma' ? r.domaci : !r.domaci));

  // Skraćeni prikaz: 2 zadnje odigrane + 6 sljedećih
  const indeksSljedece = sljedeca ? filtrirano.findIndex((r) => r.kolo >= sljedeca.kolo) : filtrirano.length;
  const od = Math.max(0, indeksSljedece - 2);
  const prikazano = sve ? filtrirano : filtrirano.slice(od, od + 8);

  // Grupiranje po mjesecima
  const mjeseci = [];
  for (const r of prikazano) {
    const mjesec = formatMjeseca.format(new Date(r.datum));
    if (mjeseci.at(-1)?.mjesec !== mjesec) mjeseci.push({ mjesec, utakmice: [] });
    mjeseci.at(-1).utakmice.push(r);
  }

  const odigrano = raspored.filter((r) => r.rezultat);
  const pobjede = odigrano.filter((r) => r.rezultat.nasi > r.rezultat.protivnik).length;

  return (
    <section id="raspored" className="sekcija">
      <SectionTitle oznaka={`${klub.liga} ${klub.sezona}`} naslov="Raspored">
        <p className="naslov-sekcije__opis">
          {raspored.length} kola · odigrano {odigrano.length} · omjer {pobjede}–{odigrano.length - pobjede}
        </p>
      </SectionTitle>

      <div className="alati">
        <div className="filteri">
          {filteri.map((f) => (
            <button
              key={f.id}
              className={`filter ${filter === f.id ? 'filter--aktivan' : ''}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {filter === f.id && (
                <motion.span layoutId="raspored-filter" className="filter__pozadina" transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }} />
              )}
              <span className="filter__tekst">{f.tekst}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="raspored">
        <AnimatePresence initial={false} mode="popLayout">
          {mjeseci.map((m) => (
            <motion.div key={`${filter}-${m.mjesec}`} layout className="raspored__mjesec" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h3 className="raspored__naslov-mjeseca">{m.mjesec}</h3>
              {m.utakmice.map((r, i) => {
                const p = protivnik(r.protivnik);
                const jeSljedeca = sljedeca?.kolo === r.kolo;
                const pobjeda = r.rezultat && r.rezultat.nasi > r.rezultat.protivnik;
                return (
                  <motion.div
                    key={r.kolo}
                    className={`termin ${jeSljedeca ? 'termin--sljedeca' : ''} ${r.rezultat ? 'termin--odigrano' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(i * 0.04, 0.3) }}
                  >
                    <span className="termin__kolo">{r.kolo}.</span>
                    <span className="termin__datum">
                      <strong>{formatDana.format(new Date(r.datum))}</strong>
                      <span>{formatSata.format(new Date(r.datum))}</span>
                    </span>
                    <span className={`termin__mjesto ${r.domaci ? 'termin__mjesto--doma' : ''}`}>{r.domaci ? 'D' : 'G'}</span>
                    <Grb src={p.grb} ime={p.ime} className="termin__grb" />
                    <span className="termin__protivnik">
                      <strong>{p.ime}</strong>
                      <span>{r.domaci ? `${klub.dvorana}, ${klub.grad}` : p.grad}</span>
                    </span>
                    {r.rezultat ? (
                      <span className={`termin__rezultat ${pobjeda ? 'termin__rezultat--p' : 'termin__rezultat--i'}`}>
                        {pobjeda ? 'P' : 'I'} {r.rezultat.nasi}:{r.rezultat.protivnik}
                      </span>
                    ) : jeSljedeca ? (
                      <span className="termin__oznaka">Sljedeća</span>
                    ) : (
                      <span className="termin__prazno" />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtrirano.length > 8 && (
        <button className="gumb gumb--sekundarni raspored__vise" onClick={() => setSve(!sve)}>
          {sve ? 'Prikaži manje' : `Prikaži cijelu sezonu (${filtrirano.length} utakmica)`}
        </button>
      )}
    </section>
  );
}
