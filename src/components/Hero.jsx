import { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { klub } from '../data.js';
import Hoop from './Hoop.jsx';

const rijeci = ['Jazine', 'Arbanasi'];
const glatko = [0.22, 1, 0.36, 1];

export default function Hero() {
  const [imaFoto, setImaFoto] = useState(Boolean(klub.pozadinaHero));

  // Parallax: pozadina se pomiče sporije od sadržaja dok skrolaš
  const { scrollY } = useScroll();
  const pomakPozadine = useTransform(scrollY, [0, 800], [0, 200]);
  const prozirnost = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="pocetna" className={`hero ${imaFoto ? 'hero--foto' : ''}`}>
      <motion.div className="hero__pozadina" style={{ y: pomakPozadine }} aria-hidden="true">
        {imaFoto && (
          <motion.img
            className="hero__foto"
            src={klub.pozadinaHero}
            alt=""
            onError={() => setImaFoto(false)}
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: glatko }}
          />
        )}
        <div className="hero__zatamnjenje" />
        <div className="hero__sjaj hero__sjaj--1" />
        <div className="hero__sjaj hero__sjaj--2" />
        <svg className="hero__teren" viewBox="0 0 940 500" fill="none">
          <rect x="10" y="10" width="920" height="480" />
          <line x1="470" y1="10" x2="470" y2="490" />
          <circle cx="470" cy="250" r="60" />
          <rect x="10" y="170" width="190" height="160" />
          <circle cx="200" cy="250" r="60" />
          <path d="M10 40 H150 A220 220 0 0 1 150 460 H10" />
          <rect x="740" y="170" width="190" height="160" />
          <circle cx="740" cy="250" r="60" />
          <path d="M930 40 H790 A220 220 0 0 0 790 460 H930" />
        </svg>
      </motion.div>

      <motion.div className="hero__sadrzaj" style={{ opacity: prozirnost }}>
        <motion.p
          className="oznaka-sekcije"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Košarkaški klub · {klub.grad} · od {klub.osnovan}.
        </motion.p>

        <h1 className="hero__naslov">
          <span className="hero__kk">KK</span>
          {rijeci.map((rijec, i) => (
            <span key={rijec} className="hero__rijec-okvir">
              <motion.span
                className={`hero__rijec ${i === 1 ? 'hero__rijec--akcent' : ''}`}
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.25 + i * 0.15, duration: 0.9, ease: glatko }}
              >
                {rijec}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="hero__opis"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {klub.nadimak} iz Jazina – srce, borba i zajedništvo do zadnje sekunde.
        </motion.p>

        <motion.div
          className="hero__gumbi"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
        >
          <a href="#najava" className="gumb gumb--primarni">Sljedeća utakmica</a>
          <a href="#raspored" className="gumb gumb--sekundarni">Raspored</a>
        </motion.div>
      </motion.div>

      <Hoop />

      {imaFoto && klub.pozadinaHeroAutor && (
        <span className="hero__zasluge">Foto: {klub.pozadinaHeroAutor}</span>
      )}

      <a href="#najava" className="hero__strelica" aria-label="Skrolaj dolje">
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          ↓
        </motion.span>
      </a>
    </section>
  );
}
