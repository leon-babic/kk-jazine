import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { nadjiIgraca } from '../data.js';

// par = [pogođeno, pokušano] – prikazuje se kao "4/9", sortira po pogođenima
const sviStupci = [
  { kljuc: 'min', naziv: 'MIN', opis: 'Minute' },
  { kljuc: 'pts', naziv: 'PTS', opis: 'Poeni' },
  { kljuc: 'reb', naziv: 'SKO', opis: 'Skokovi' },
  { kljuc: 'ast', naziv: 'AST', opis: 'Asistencije' },
  { kljuc: 'stl', naziv: 'UKR', opis: 'Ukradene lopte' },
  { kljuc: 'blk', naziv: 'BLK', opis: 'Blokade' },
  { kljuc: 'tov', naziv: 'IZG', opis: 'Izgubljene lopte' },
  { kljuc: 'fg', naziv: 'ŠUT', opis: 'Šut iz igre (pogođeno/pokušano)', par: true },
  { kljuc: 'tri', naziv: '3P', opis: 'Trice (pogođeno/pokušano)', par: true },
  { kljuc: 'sb', naziv: 'SB', opis: 'Slobodna bacanja (pogođeno/pokušano)', par: true },
];

const istaknuto = [
  { kljuc: 'pts', naziv: 'Najviše poena' },
  { kljuc: 'reb', naziv: 'Najviše skokova' },
  { kljuc: 'ast', naziv: 'Najviše asistencija' },
];

const vrijednost = (r, kljuc) => {
  const v = r[kljuc];
  if (v == null) return -1;
  return Array.isArray(v) ? v[0] : v;
};

const prikaz = (v) => (v == null ? '–' : Array.isArray(v) ? `${v[0]}/${v[1]}` : v);

const postotak = (par) => (par && par[1] ? `${Math.round((par[0] / par[1]) * 100)}%` : '');

export default function BoxScore({ utakmica }) {
  const [sort, setSort] = useState({ kljuc: 'pts', silazno: true });

  const redovi = useMemo(
    () =>
      utakmica.statistika.map((s) => {
        const igrac = nadjiIgraca(s.igrac);
        return { ...s, broj: s.broj ?? igrac?.broj ?? null, uMomcadi: Boolean(igrac) };
      }),
    [utakmica]
  );

  if (redovi.length === 0) {
    return <p className="statistika__prazno">Statistika igrača za ovu utakmicu nije objavljena.</p>;
  }

  // Prikazujemo samo stupce za koje imamo barem jedan podatak
  const stupci = sviStupci.filter((s) => redovi.some((r) => r[s.kljuc] != null));
  const kartice = istaknuto.filter((st) => stupci.some((s) => s.kljuc === st.kljuc));
  const samoPoeni = stupci.length === 1;

  const sortirani = [...redovi].sort((a, b) =>
    sort.silazno ? vrijednost(b, sort.kljuc) - vrijednost(a, sort.kljuc) : vrijednost(a, sort.kljuc) - vrijednost(b, sort.kljuc)
  );

  const ukupno = (s) => {
    if (s.kljuc === 'pts') return utakmica.rezultat.nasi;
    if (redovi.some((r) => r[s.kljuc] == null)) return '–';
    if (s.par) {
      const par = redovi.reduce((z, r) => [z[0] + r[s.kljuc][0], z[1] + r[s.kljuc][1]], [0, 0]);
      return `${par[0]}/${par[1]}`;
    }
    return redovi.reduce((z, r) => z + r[s.kljuc], 0);
  };

  const ukupniPar = (kljuc) =>
    redovi.every((r) => r[kljuc]) ? redovi.reduce((z, r) => [z[0] + r[kljuc][0], z[1] + r[kljuc][1]], [0, 0]) : null;

  const najbolji = (kljuc) => redovi.reduce((max, r) => (vrijednost(r, kljuc) > vrijednost(max, kljuc) ? r : max));
  const najboljiStrijelac = najbolji('pts');

  function promijeniSort(kljuc) {
    setSort((s) => (s.kljuc === kljuc ? { kljuc, silazno: !s.silazno } : { kljuc, silazno: true }));
  }

  const postoci = [
    { kljuc: 'fg', naziv: 'Šut iz igre' },
    { kljuc: 'tri', naziv: 'Trice' },
    { kljuc: 'sb', naziv: 'Slobodna bacanja' },
  ]
    .map((p) => ({ ...p, par: ukupniPar(p.kljuc) }))
    .filter((p) => p.par && p.par[1]);

  return (
    <div className="statistika">
      <div className="istaknuto" style={{ '--stupci': kartice.length }}>
        {kartice.map((st, i) => {
          const r = najbolji(st.kljuc);
          return (
            <motion.div
              key={st.kljuc}
              className="istaknuto__kartica"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
            >
              <span className="istaknuto__naziv">{st.naziv}</span>
              <span className="istaknuto__broj">{r[st.kljuc]}</span>
              <span className="istaknuto__igrac">{r.igrac}</span>
            </motion.div>
          );
        })}
      </div>

      {postoci.length > 0 && (
        <div className="postoci">
          {postoci.map((p, i) => {
            const posto = Math.round((p.par[0] / p.par[1]) * 100);
            return (
              <div key={p.kljuc} className="postotak">
                <div className="postotak__vrh">
                  <span>{p.naziv}</span>
                  <strong>{posto}%</strong>
                </div>
                <div className="postotak__traka">
                  <motion.div
                    className="postotak__ispuna"
                    initial={{ width: 0 }}
                    animate={{ width: `${posto}%` }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <span className="postotak__omjer">{p.par[0]}/{p.par[1]}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="tablica-okvir">
        <table className="tablica">
          <thead>
            <tr>
              <th className="tablica__igrac">Igrač</th>
              {stupci.map((s) => (
                <th
                  key={s.kljuc}
                  aria-sort={sort.kljuc === s.kljuc ? (sort.silazno ? 'descending' : 'ascending') : 'none'}
                >
                  <button
                    className={`tablica__sort ${sort.kljuc === s.kljuc ? 'tablica__sort--aktivan' : ''}`}
                    title={`${s.opis} – klikni za sortiranje`}
                    onClick={() => promijeniSort(s.kljuc)}
                  >
                    {s.naziv}
                    <span className="tablica__smjer">{sort.kljuc === s.kljuc ? (sort.silazno ? '↓' : '↑') : ''}</span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortirani.map((r, i) => (
              <motion.tr
                layout
                key={r.igrac}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.03 }}
                className={r === najboljiStrijelac ? 'tablica__red--mvp' : ''}
              >
                <td className="tablica__igrac">
                  <span className="tablica__broj">{r.broj ?? ''}</span>
                  <span className={r.uMomcadi ? '' : 'tablica__bivsi'}>{r.igrac}</span>
                  {r === najboljiStrijelac && <span className="mvp" title="Najbolji strijelac">★</span>}
                </td>
                {stupci.map((s) => (
                  <td
                    key={s.kljuc}
                    className={sort.kljuc === s.kljuc ? 'tablica__aktivni-stupac' : ''}
                    title={s.par ? postotak(r[s.kljuc]) : undefined}
                  >
                    {prikaz(r[s.kljuc])}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="tablica__igrac">Ukupno</td>
              {stupci.map((s) => (
                <td key={s.kljuc}>{ukupno(s)}</td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      {samoPoeni && (
        <p className="statistika__napomena">Za ovu utakmicu objavljeni su samo poeni igrača.</p>
      )}
    </div>
  );
}
