import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { klub } from '../data.js';

const linkovi = [
  { href: '#najava', tekst: 'Najava' },
  { href: '#momcad', tekst: 'Momčad' },
  { href: '#utakmice', tekst: 'Utakmice' },
  { href: '#raspored', tekst: 'Raspored' },
  { href: '#/novosti', tekst: 'Novosti' },
  { href: '#/povijest', tekst: 'Povijest' },
];

export default function Navbar({ stranica }) {
  const [skrolano, setSkrolano] = useState(false);
  const [otvoren, setOtvoren] = useState(false);

  useEffect(() => {
    const naSkrol = () => setSkrolano(window.scrollY > 40);
    naSkrol();
    window.addEventListener('scroll', naSkrol, { passive: true });
    return () => window.removeEventListener('scroll', naSkrol);
  }, []);

  const aktivan = (href) => href === `#/${stranica}`;

  return (
    <header className={`navbar ${skrolano || otvoren || stranica !== 'pocetna' ? 'navbar--puna' : ''}`}>
      <div className="navbar__unutra">
        <a href="#pocetna" className="logo" onClick={() => setOtvoren(false)}>
          <img className="grb logo__znak" src="logo.png" alt="" />
          <span className="logo__tekst">{klub.kratkoIme}</span>
        </a>

        <nav className="navbar__linkovi" aria-label="Glavna navigacija">
          {linkovi.map((l) => (
            <a key={l.href} href={l.href} className={aktivan(l.href) ? 'aktivan' : ''}>
              {l.tekst}
            </a>
          ))}
        </nav>

        <button
          className={`hamburger ${otvoren ? 'hamburger--otvoren' : ''}`}
          aria-label="Izbornik"
          aria-expanded={otvoren}
          onClick={() => setOtvoren(!otvoren)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {otvoren && (
          <motion.nav
            className="mobilni-izbornik"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {linkovi.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOtvoren(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                {l.tekst}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
