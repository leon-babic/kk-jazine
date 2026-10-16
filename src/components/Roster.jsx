import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { klub, igraci, statistikaSezone } from '../data.js';
import SectionTitle from './SectionTitle.jsx';

const filteri = [
  { id: 'Svi', tekst: 'Svi' },
  { id: 'Bek', tekst: 'Bekovi' },
  { id: 'Krilo', tekst: 'Krila' },
  { id: 'Centar', tekst: 'Centri' },
];

const sortiranja = [
  { id: 'broj', tekst: 'Broj' },
  { id: 'pts', tekst: 'Poeni' },
  { id: 'reb', tekst: 'Skokovi' },
  { id: 'ast', tekst: 'Asistencije' },
];

function KarticaIgraca({ igrac, stat }) {
  return (
    <motion.article
      layout
      className="igrac"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -8 }}
    >
      {igrac.broj != null && (
        <span className="igrac__veliki-broj" aria-hidden="true">{igrac.broj}</span>
      )}

      {igrac.slika ? (
        <img className="igrac__slika" src={igrac.slika} alt={`${igrac.ime} ${igrac.prezime}`} />
      ) : (
        <div className="igrac__avatar" aria-hidden="true">
          {igrac.ime[0]}{igrac.prezime[0]}
        </div>
      )}

      <p className="igrac__pozicija">
        {igrac.broj != null ? `#${igrac.broj} · ` : ''}{igrac.pozicija}
      </p>
      <h3 className="igrac__ime">
        {igrac.ime} <strong>{igrac.prezime}</strong>
      </h3>

      <dl className="igrac__podaci">
        <div>
          <dt>Visina</dt>
          <dd>{igrac.visina ? `${igrac.visina} cm` : '–'}</dd>
        </div>
        <div>
          <dt>Godište</dt>
          <dd>{igrac.godiste ? `${igrac.godiste}.` : '–'}</dd>
        </div>
      </dl>

      <div className="igrac__sezona">
        <span className="igrac__sezona-naslov">
          Prva liga {klub.sezona} · {stat ? `${stat.utakmica} ${stat.utakmica === 1 ? 'utakmica' : 'utakmice'}` : 'bez nastupa'}
        </span>
        <div className="igrac__sezona-brojke">
          <div>
            <strong>{stat?.pts ?? '–'}</strong>
            <span>PTS</span>
          </div>
          <div>
            <strong>{stat?.reb ?? '–'}</strong>
            <span>SKO</span>
          </div>
          <div>
            <strong>{stat?.ast ?? '–'}</strong>
            <span>AST</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Trener() {
  const t = klub.trenerInfo;
  if (!t) return null;
  return (
    <motion.article
      className="trener"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="trener__slika">
        <img src={t.slika} alt={`Trener ${klub.trener}`} loading="lazy" />
        <span className="trener__zasluge">Foto: {t.slikaAutor}</span>
      </div>
      <div className="trener__tekst">
        <p className="igrac__pozicija">{t.uloga}</p>
        <h3 className="trener__ime">{klub.trener}</h3>
        <p className="trener__opis">{t.opis}</p>
        <ul className="trener__karijera">
          {t.karijera.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
        {t.pomocnik && (
          <p className="trener__pomocnik">
            Pomoćni trener: <strong>{t.pomocnik}</strong>
          </p>
        )}
      </div>
    </motion.article>
  );
}

export default function Roster() {
  const [filter, setFilter] = useState('Svi');
  const [sortiraj, setSortiraj] = useState('broj');
  const stat = useMemo(statistikaSezone, []);

  const punoIme = (i) => `${i.ime} ${i.prezime}`;
  const prikazani = (filter === 'Svi' ? igraci : igraci.filter((i) => i.pozicija === filter))
    .slice()
    .sort((a, b) => {
      if (sortiraj === 'broj') return (a.broj ?? 999) - (b.broj ?? 999);
      return (Number(stat[punoIme(b)]?.[sortiraj]) || -1) - (Number(stat[punoIme(a)]?.[sortiraj]) || -1);
    });

  return (
    <section id="momcad" className="sekcija">
      <SectionTitle oznaka={`Sezona ${klub.sezona}`} naslov="Momčad">
        <p className="naslov-sekcije__opis">
          {igraci.length} igrača · prosjeci po utakmici samo iz Prve muške lige
        </p>
      </SectionTitle>

      <Trener />

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
                <motion.span layoutId="filter-pozadina" className="filter__pozadina" transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }} />
              )}
              <span className="filter__tekst">{f.tekst}</span>
            </button>
          ))}
        </div>

        <label className="sortiranje">
          Poredaj po
          <select value={sortiraj} onChange={(e) => setSortiraj(e.target.value)}>
            {sortiranja.map((s) => (
              <option key={s.id} value={s.id}>{s.tekst}</option>
            ))}
          </select>
        </label>
      </div>

      <motion.div layout className="momcad">
        <AnimatePresence mode="popLayout">
          {prikazani.map((igrac) => (
            <KarticaIgraca key={punoIme(igrac)} igrac={igrac} stat={stat[punoIme(igrac)]} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
