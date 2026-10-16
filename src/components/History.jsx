import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, animate, useScroll, useTransform } from 'motion/react';
import { klub } from '../data.js';
import { brojke, vremenskaCrta, galerija } from '../povijest.js';
import Traka from './Traka.jsx';

// Broj koji "odbroji" do vrijednosti kad dođe na ekran
function Brojac({ do: cilj }) {
  const ref = useRef(null);
  const vidljiv = useInView(ref, { once: true });
  const [vrijednost, setVrijednost] = useState(0);

  useEffect(() => {
    if (!vidljiv) return;
    const pocetak = cilj > 1000 ? cilj - 50 : 0; // godine broje od bliže vrijednosti
    const kontrola = animate(pocetak, cilj, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setVrijednost(Math.round(v)) });
    return () => kontrola.stop();
  }, [vidljiv, cilj]);

  return <span ref={ref}>{vrijednost}</span>;
}

const kategorije = ['Sve', 'Dvorane', 'Navijači', 'Zadar', 'Momčad'];

// Jedan događaj na vremenskoj crti. Slika se "otkriva" dok skrolaš,
// a unutar okvira se lagano pomiče (parallax).
function Dogadjaj({ dogadjaj: d, desno, onOtvori }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const pomakSlike = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <motion.article
      ref={ref}
      className={`dogadjaj ${desno ? 'dogadjaj--desno' : ''} ${d.slika ? 'dogadjaj--slika' : ''}`}
      initial="skriveno"
      whileInView="vidljivo"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        skriveno: { opacity: 0, x: desno ? 60 : -60 },
        vidljivo: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      <span className="dogadjaj__tocka" />
      {d.slika && (
        <motion.button
          className="dogadjaj__slika"
          onClick={() => onOtvori({ ...d.slika, opis: `${d.godina} ${d.slika.opis}` })}
          aria-label={`Povećaj sliku: ${d.slika.opis}`}
          variants={{
            skriveno: { clipPath: 'inset(0% 100% 0% 0%)' },
            vidljivo: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.2 } },
          }}
        >
          <motion.img src={d.slika.src} alt={d.slika.opis} loading="lazy" style={{ y: pomakSlike }} />
          <span className="dogadjaj__zasluge">Foto: {d.slika.autor}</span>
        </motion.button>
      )}
      <div className="dogadjaj__tekst">
        <span className="dogadjaj__godina">{d.godina}</span>
        <h3>{d.naslov}</h3>
        <p>{d.tekst}</p>
        {d.slika && <p className="dogadjaj__opis-slike">{d.slika.opis}</p>}
      </div>
    </motion.article>
  );
}

const PO_STRANICI = 18; // koliko slika se prikaže odjednom

export default function History() {
  // otvorena = { lista, indeks } za galeriju (strelice) ili samo slika s vremenske crte
  const [otvorena, setOtvorena] = useState(null);
  const [kategorija, setKategorija] = useState('Sve');
  const [vidljivo, setVidljivo] = useState(PO_STRANICI);
  const prikazane = kategorija === 'Sve' ? galerija : galerija.filter((s) => s.kategorija === kategorija);
  const brojPoKategoriji = (k) => (k === 'Sve' ? galerija.length : galerija.filter((s) => s.kategorija === k).length);
  const crtaRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: crtaRef, offset: ['start 70%', 'end 60%'] });

  const trenutna = otvorena?.lista ? otvorena.lista[otvorena.indeks] : otvorena;
  const pomakni = (smjer) =>
    setOtvorena((o) => (o?.lista ? { ...o, indeks: (o.indeks + smjer + o.lista.length) % o.lista.length } : o));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const naTipku = (e) => {
      if (e.key === 'Escape') setOtvorena(null);
      if (e.key === 'ArrowRight') pomakni(1);
      if (e.key === 'ArrowLeft') pomakni(-1);
    };
    window.addEventListener('keydown', naTipku);
    return () => window.removeEventListener('keydown', naTipku);
  }, []);

  function promijeniKategoriju(k) {
    setKategorija(k);
    setVidljivo(PO_STRANICI);
  }

  return (
    <div className="povijest">
      <section className="povijest__uvod">
        <motion.img
          src="logo.png"
          alt={`Grb ${klub.ime}`}
          className="grb povijest__grb"
          initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.p className="oznaka-sekcije" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Od {klub.osnovan}. godine
        </motion.p>
        <motion.h1
          className="povijest__naslov"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Povijest kluba
        </motion.h1>
        <motion.p
          className="povijest__opis"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Od kvartovskog kluba iz Jazina do Premijer lige i razvojne momčadi KK Zadra – priča „{klub.nadimak}”.
        </motion.p>
      </section>

      <section className="sekcija sekcija--uska">
        <div className="brojke">
          {brojke.map((b, i) => (
            <motion.div
              key={b.tekst}
              className="brojka"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <strong><Brojac do={b.broj} /></strong>
              <span>{b.tekst}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <Traka className="traka--stranica" />

      <section className="sekcija sekcija--uska">
        <div className="crta" ref={crtaRef}>
          <div className="crta__linija">
            <motion.div className="crta__ispuna" style={{ scaleY: scrollYProgress }} />
          </div>
          {vremenskaCrta.map((d, i) => (
            <Dogadjaj key={d.godina} dogadjaj={d} desno={i % 2 === 1} onOtvori={setOtvorena} />
          ))}
        </div>
      </section>

      <section className="sekcija">
        <div className="naslov-sekcije">
          <p className="oznaka-sekcije">Galerija</p>
          <h2>Dvorane, navijači, Zadar i momčad</h2>
        </div>
        <div className="alati">
          <div className="filteri">
            {kategorije.map((k) => (
              <button
                key={k}
                className={`filter ${kategorija === k ? 'filter--aktivan' : ''}`}
                aria-pressed={kategorija === k}
                onClick={() => promijeniKategoriju(k)}
              >
                {kategorija === k && (
                  <motion.span layoutId="galerija-filter" className="filter__pozadina" transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }} />
                )}
                <span className="filter__tekst">
                  {k} <span className="filter__broj">{brojPoKategoriji(k)}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="galerija">
          <AnimatePresence mode="popLayout">
            {prikazane.slice(0, vidljivo).map((s, i) => (
              <motion.button
                layout
                key={s.src}
                className="galerija__slika"
                onClick={() => setOtvorena({ lista: prikazane, indeks: i })}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
              >
                <img src={s.src} alt={s.opis} loading="lazy" />
                <span className="galerija__kategorija">{s.kategorija}</span>
                <span className="galerija__opis">{s.opis}</span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {vidljivo < prikazane.length && (
          <div className="galerija__vise">
            <button className="gumb gumb--sekundarni" onClick={() => setVidljivo((v) => v + PO_STRANICI)}>
              Prikaži još slika ({prikazane.length - vidljivo})
            </button>
          </div>
        )}
        <p className="galerija__zasluge">
          Fotografije:{' '}
          {galerija
            .filter((s, i, sve) => sve.findIndex((x) => x.autor === s.autor) === i)
            .map((s, i) => (
              <span key={s.autor}>
                {i > 0 && ' · '}
                <a href={s.izvor} target="_blank" rel="noreferrer">{s.autor}</a>
                {s.licenca ? ` (${s.licenca}, Wikimedia Commons)` : ''}
              </span>
            ))}
        </p>
      </section>

      <div className="povijest__povratak">
        <a href="#pocetna" className="gumb gumb--primarni">← Natrag na početnu</a>
      </div>

      <AnimatePresence>
        {trenutna && (
          <motion.div
            className="lightbox"
            onClick={() => setOtvorena(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AnimatePresence mode="wait">
              <motion.figure
                key={trenutna.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={trenutna.src} alt={trenutna.opis} />
                <figcaption>
                  {otvorena.lista && (
                    <span className="lightbox__brojac">
                      {otvorena.indeks + 1} / {otvorena.lista.length}
                    </span>
                  )}
                  {trenutna.opis} · Foto: {trenutna.autor}
                  {trenutna.licenca ? ` (${trenutna.licenca})` : ''}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
            {otvorena.lista && (
              <>
                <button
                  className="lightbox__strelica lightbox__strelica--lijevo"
                  aria-label="Prethodna slika"
                  onClick={(e) => { e.stopPropagation(); pomakni(-1); }}
                >
                  ‹
                </button>
                <button
                  className="lightbox__strelica lightbox__strelica--desno"
                  aria-label="Sljedeća slika"
                  onClick={(e) => { e.stopPropagation(); pomakni(1); }}
                >
                  ›
                </button>
              </>
            )}
            <button className="lightbox__zatvori" aria-label="Zatvori" onClick={() => setOtvorena(null)}>×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
