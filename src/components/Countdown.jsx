import { motion, AnimatePresence } from 'motion/react';
import { klub, vremenskaZona } from '../data.js';
import { useStanjeUtakmice, preostalo } from '../stanjeUtakmice.jsx';
import Grb from './Grb.jsx';

const SOFASCORE_KLUB = 'https://www.sofascore.com/basketball/team/kk-jazine-arbanasi/221861';

const formatDatuma = new Intl.DateTimeFormat('hr-HR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: vremenskaZona,
});

const dvijeZnamenke = (n) => String(n).padStart(2, '0');

function Kocka({ vrijednost, oznaka }) {
  const tekst = dvijeZnamenke(vrijednost);
  return (
    <div className="odbrojavanje__kocka">
      <div className="odbrojavanje__broj">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={tekst}
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {tekst}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="odbrojavanje__oznaka">{oznaka}</span>
    </div>
  );
}

function Ekipa({ ime, grb, nasa, domacin }) {
  return (
    <div className={`ekipa ${nasa ? 'ekipa--nasa' : ''}`}>
      <Grb src={grb} ime={ime} className="ekipa__grb" />
      <span className="ekipa__ime">{ime}</span>
      <span className="ekipa__uloga">{domacin ? 'Domaćin' : 'Gost'}</span>
    </div>
  );
}

// Broj koji "iskoči" kad se promijeni (novi koš)
function Poeni({ vrijednost, jace }) {
  return (
    <span className={`semafor__poeni ${jace ? 'semafor__poeni--jace' : ''}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={vrijednost ?? '–'}
          initial={{ scale: 1.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        >
          {vrijednost ?? '–'}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Countdown() {
  // Stanje se računa u stanjeUtakmice.jsx (zajedničko s trakama)
  const { sada, u, live, stanje, pocetak, krajPrikaza, nasiPoeni, njihoviPoeni, imaRezultat, pobjeda } =
    useStanjeUtakmice();

  if (!u) {
    return (
      <section id="najava" className="sekcija">
        <div className="najava">
          <p className="oznaka-sekcije">Najava</p>
          <p className="najava__info">Sezona je završena – vidimo se u novoj!</p>
        </div>
      </section>
    );
  }

  const prikaziSemafor = stanje === 'uzivo' || stanje === 'kraj';

  const nasi = <Ekipa ime={klub.ime} grb="logo.png" nasa domacin={u.domaci} />;
  const njihovi = <Ekipa ime={u.protivnikIme} grb={u.protivnikGrb} domacin={!u.domaci} />;
  // Na semaforu domaćin je uvijek lijevo
  const lijevo = u.domaci ? nasiPoeni : njihoviPoeni;
  const desno = u.domaci ? njihoviPoeni : nasiPoeni;

  const oznaka = {
    odbrojavanje: 'Najava',
    uskoro: 'Uskoro počinje',
    uzivo: 'Uživo',
    kraj: 'Kraj utakmice',
    odgodjeno: 'Odgođeno',
  }[stanje];

  return (
    <section id="najava" className="sekcija">
      <motion.div
        className={`najava najava--${stanje}`}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="oznaka-sekcije">
          {stanje === 'uzivo' && <span className="tockica" />}
          {oznaka} · {u.natjecanje}
          {live?.demo && <span className="najava__demo">demo</span>}
        </p>

        <div className="najava__ekipe">
          {u.domaci ? nasi : njihovi}

          {prikaziSemafor ? (
            <div className="semafor">
              <div className="semafor__rezultat">
                <Poeni vrijednost={lijevo} jace={imaRezultat && lijevo > desno} />
                <span className="semafor__dvotocka">:</span>
                <Poeni vrijednost={desno} jace={imaRezultat && desno > lijevo} />
              </div>
              {stanje === 'uzivo' && (
                <span className="semafor__status semafor__status--uzivo">{live?.opis || 'Utakmica je u tijeku'}</span>
              )}
              {stanje === 'kraj' && imaRezultat && (
                <span className={`semafor__status ${pobjeda ? 'semafor__status--p' : 'semafor__status--i'}`}>
                  {pobjeda ? 'Pobjeda!' : 'Poraz'}
                </span>
              )}
              {stanje === 'kraj' && !imaRezultat && <span className="semafor__status">Rezultat uskoro</span>}
            </div>
          ) : (
            <span className="najava__vs">VS</span>
          )}

          {u.domaci ? njihovi : nasi}
        </div>

        {prikaziSemafor && live?.cetvrtine?.length > 0 && (
          <div className="cetvrtine" aria-label="Rezultat po četvrtinama">
            {live.cetvrtine.map(([a, b], i) => {
              const [l, d] = u.domaci ? [a, b] : [b, a];
              return (
                <div key={i} className="cetvrtine__stupac">
                  <span className="cetvrtine__naslov">{i < 4 ? `Q${i + 1}` : `P${i - 3}`}</span>
                  <span>{l}</span>
                  <span>{d}</span>
                </div>
              );
            })}
          </div>
        )}

        <p className="najava__info">
          {formatDatuma.format(new Date(u.datum))} · {u.mjesto}
        </p>

        {stanje === 'odbrojavanje' && (
          <div className="odbrojavanje" role="timer" aria-live="off">
            {(() => {
              const v = preostalo(pocetak, sada);
              return (
                <>
                  <Kocka vrijednost={v.dani} oznaka="dana" />
                  <Kocka vrijednost={v.sati} oznaka="sati" />
                  <Kocka vrijednost={v.minute} oznaka="minuta" />
                  <Kocka vrijednost={v.sekunde} oznaka="sekundi" />
                </>
              );
            })()}
          </div>
        )}

        {stanje === 'uskoro' && <p className="najava__uzivo">Utakmica samo što nije počela – ostani uz nas!</p>}

        {stanje === 'odgodjeno' && <p className="najava__uzivo">Utakmica je odgođena. Novi termin bit će objavljen naknadno.</p>}

        {stanje === 'uzivo' && (
          <a className="najava__link" href={SOFASCORE_KLUB} target="_blank" rel="noreferrer">
            Prati uživo na Sofascoreu ↗
          </a>
        )}

        {stanje === 'kraj' && (
          <p className="najava__sljedeca">
            Najava sljedeće utakmice za{' '}
            <strong>
              {(() => {
                const v = preostalo(krajPrikaza, sada);
                return `${dvijeZnamenke(v.dani * 24 + v.sati)}:${dvijeZnamenke(v.minute)}:${dvijeZnamenke(v.sekunde)}`;
              })()}
            </strong>
          </p>
        )}

        <a href="#raspored" className="najava__link najava__link--tih">Cijeli raspored sezone →</a>
      </motion.div>
    </section>
  );
}
