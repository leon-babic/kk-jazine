import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'motion/react';

// ============================================================
//  EASTER EGG: mala igrica šutiranja na koš.
//  Klikni (ili dodirni) koš – lopta poleti prema mjestu klika.
//  Fizika: gravitacija + odbijanje od rubova obruča.
//  Kad lopta padne ispod mrežice, šut se resetira.
//  Pogodak se može postići samo jednom (do osvježavanja stranice).
// ============================================================

// Sve mjere su u koordinatama SVG-a (viewBox 0 0 300 420)
const GRAVITACIJA = 1600;
const R_LOPTE = 19;
const OBRUC_Y = 152;
const OBRUC_LIJEVO = 104;
const OBRUC_DESNO = 196;
const R_RUBA = 4;
const DNO_MREZICE = 232;
const ODSKOK = 0.55; // koliko brzine lopta zadrži nakon udarca u obruč
const START = { x: 10, y: 470 }; // odakle se šutira (dolje lijevo)
const VRH_LUKA = OBRUC_Y - 110; // koliko visoko ide luk iznad obruča

// Pamti se izvan komponente, pa vrijedi dok se stranica ne osvježi
let vecZabio = false;

// Početna brzina tako da lopta padne točno na x klika u visini obruča
function brzinaZaCilj(ciljX) {
  const vy = -Math.sqrt(2 * GRAVITACIJA * (START.y - VRH_LUKA));
  const doVrha = -vy / GRAVITACIJA;
  const doObruca = Math.sqrt((2 * (OBRUC_Y - VRH_LUKA)) / GRAVITACIJA);
  return { vx: (ciljX - START.x) / (doVrha + doObruca), vy };
}

// Odbijanje lopte od jednog ruba obruča (mali krug)
function odbijOdRuba(l, rubX) {
  const dx = l.x - rubX;
  const dy = l.y - OBRUC_Y;
  const udaljenost = Math.hypot(dx, dy);
  const minimum = R_LOPTE + R_RUBA;
  if (udaljenost >= minimum || udaljenost === 0) return false;
  const nx = dx / udaljenost;
  const ny = dy / udaljenost;
  // izgurati loptu van ruba
  l.x = rubX + nx * minimum;
  l.y = OBRUC_Y + ny * minimum;
  // odbiti brzinu po normali
  const brzinaPoNormali = l.vx * nx + l.vy * ny;
  if (brzinaPoNormali < 0) {
    l.vx -= (1 + ODSKOK) * brzinaPoNormali * nx;
    l.vy -= (1 + ODSKOK) * brzinaPoNormali * ny;
    l.vx *= 0.9;
  }
  return true;
}

function Dvogled() {
  return (
    <svg viewBox="0 0 64 40" className="skaut__dvogled" aria-hidden="true">
      <rect x="4" y="10" width="22" height="24" rx="9" fill="#1e2e5e" />
      <rect x="38" y="10" width="22" height="24" rx="9" fill="#1e2e5e" />
      <rect x="22" y="14" width="20" height="10" rx="4" fill="#2c4a9e" />
      <rect x="9" y="4" width="12" height="9" rx="3" fill="#2c4a9e" />
      <rect x="43" y="4" width="12" height="9" rx="3" fill="#2c4a9e" />
      <circle cx="15" cy="25" r="6" fill="#ecc219" />
      <circle cx="49" cy="25" r="6" fill="#ecc219" />
      <circle cx="13" cy="23" r="2" fill="#fff" opacity="0.8" />
      <circle cx="47" cy="23" r="2" fill="#fff" opacity="0.8" />
    </svg>
  );
}

export default function Hoop() {
  const svgRef = useRef(null);
  const loptaRef = useRef(null);
  const animacija = useRef(null);
  const letiRef = useRef(false);
  const [uLetu, setULetu] = useState(false);
  const [zabio, setZabio] = useState(vecZabio);
  const [oblacic, setOblacic] = useState(false);
  const mrezica = useAnimationControls();

  useEffect(() => () => cancelAnimationFrame(animacija.current), []);

  function nacrtaj(l) {
    loptaRef.current?.setAttribute('transform', `translate(${l.x} ${l.y}) rotate(${l.kut})`);
  }

  function sutni(e) {
    // nema spamanja (samo jedna lopta u zraku) i nema drugog pogotka
    if (letiRef.current || vecZabio) return;
    letiRef.current = true;
    const svg = svgRef.current;
    const tocka = svg.createSVGPoint();
    tocka.x = e.clientX;
    tocka.y = e.clientY;
    const klik = tocka.matrixTransform(svg.getScreenCTM().inverse());

    const { vx, vy } = brzinaZaCilj(klik.x);
    const l = { x: START.x, y: START.y, vx, vy, kut: 0, prosaoObruc: false, prosliY: START.y };
    setULetu(true);
    nacrtaj(l);

    let prosli = performance.now();
    const korak = (sada) => {
      const dt = Math.min((sada - prosli) / 1000, 1 / 30);
      prosli = sada;

      l.prosliY = l.y;
      l.vy += GRAVITACIJA * dt;
      l.x += l.vx * dt;
      l.y += l.vy * dt;
      l.kut += l.vx * dt * 2;

      const udarac = odbijOdRuba(l, OBRUC_LIJEVO) | odbijOdRuba(l, OBRUC_DESNO);
      if (udarac) mrezica.start({ rotate: [0, -2, 2, 0], transition: { duration: 0.3 } });

      // Pogodak: lopta prođe kroz obruč odozgo prema dolje
      if (
        !l.prosaoObruc &&
        l.vy > 0 &&
        l.prosliY < OBRUC_Y &&
        l.y >= OBRUC_Y &&
        l.x > OBRUC_LIJEVO + R_RUBA &&
        l.x < OBRUC_DESNO - R_RUBA
      ) {
        l.prosaoObruc = true;
        mrezica.start({
          scaleY: [1, 1.25, 0.9, 1],
          scaleX: [1, 0.88, 1.04, 1],
          transition: { duration: 0.6 },
        });
      }

      // U mrežici: mrežica usporava loptu i drži je unutra
      if (l.prosaoObruc && l.y < DNO_MREZICE) {
        l.vx *= 0.85;
        l.vy *= 0.97;
        l.x = Math.min(Math.max(l.x, 118), 182);
      }

      nacrtaj(l);

      // Reset: lopta je pala ispod mrežice ili odletjela sa strane
      const ispodMrezice = l.y - R_LOPTE > DNO_MREZICE && l.vy > 0;
      if (ispodMrezice || l.x < -260 || l.x > 560) {
        letiRef.current = false;
        setULetu(false);
        if (l.prosaoObruc && !vecZabio) {
          vecZabio = true;
          setZabio(true);
          setOblacic(true);
          setTimeout(() => setOblacic(false), 6000);
        }
        return;
      }
      animacija.current = requestAnimationFrame(korak);
    };
    animacija.current = requestAnimationFrame(korak);
  }

  const mozeSutnuti = !uLetu && !zabio;

  return (
    <motion.div
      className="kos"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence>
        {oblacic && (
          <motion.div
            className="skaut"
            role="status"
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          >
            <Dvogled />
            <span>
              <strong>Jazine vas skautiraju!</strong>
              <small>Pravi šuter. Vidimo se na treningu.</small>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <svg
        ref={svgRef}
        className="kos__svg"
        viewBox="0 0 300 420"
        overflow="visible"
        onPointerDown={sutni}
        style={{ cursor: mozeSutnuti ? 'pointer' : 'default' }}
        aria-label={zabio ? 'Koš' : 'Koš – klikni za šut'}
      >
        <defs>
          {/* Žuta lopta s tamnoplavim šavovima – kao u grbu kluba */}
          <radialGradient id="kos-lopta" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#fff2a6" />
            <stop offset="55%" stopColor="#ecc219" />
            <stop offset="100%" stopColor="#b08a05" />
          </radialGradient>
        </defs>

        {/* Stražnji dio: stalak, tabla i stražnja polovica obruča */}
        <rect x="140" y="140" width="20" height="290" rx="4" fill="#1b2442" />
        <rect x="50" y="20" width="200" height="124" rx="10" fill="rgba(255,255,255,0.08)" stroke="#e9edf7" strokeWidth="5" />
        <rect x="114" y="74" width="72" height="54" fill="none" stroke="#e9edf7" strokeWidth="4" />
        <rect x="136" y="140" width="28" height="14" fill="#c9ced9" />
        <path d="M104 152 A46 9 0 0 1 196 152" fill="none" stroke="#c2410c" strokeWidth="5" />

        {/* Lopta (crta se samo dok je u letu) */}
        <g ref={loptaRef} style={{ display: uLetu ? 'inline' : 'none' }}>
          <circle r={R_LOPTE} fill="url(#kos-lopta)" stroke="#1e2e5e" strokeWidth="1.4" />
          <g fill="none" stroke="#1e2e5e" strokeWidth="1.5" strokeLinecap="round">
            <path d={`M${-R_LOPTE} 0 H${R_LOPTE}`} />
            <path d={`M0 ${-R_LOPTE} V${R_LOPTE}`} />
            <path d="M-13 -13 C-5 -5 -5 5 -13 13" />
            <path d="M13 -13 C5 -5 5 5 13 13" />
          </g>
        </g>

        {/* Prednji dio: mrežica i prednja polovica obruča (iznad lopte) */}
        <motion.g
          animate={mrezica}
          style={{ originX: '150px', originY: '152px' }}
          fill="none"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="2"
        >
          <path d="M106 154 L122 228 M125 160 L134 230 M150 161 L150 232 M175 160 L166 230 M194 154 L178 228" />
          <path d="M108 172 Q150 186 192 172 M114 196 Q150 208 186 196 M120 218 Q150 228 180 218" />
        </motion.g>
        <path d="M104 152 A46 9 0 0 0 196 152" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />

        {/* Nevidljiva površina za klik preko table i obruča */}
        <rect x="40" y="10" width="220" height="230" fill="transparent" />
      </svg>
    </motion.div>
  );
}
