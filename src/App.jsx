import { useEffect, useState } from 'react';
import { MotionConfig, AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Countdown from './components/Countdown.jsx';
import Roster from './components/Roster.jsx';
import Matches from './components/Matches.jsx';
import Schedule from './components/Schedule.jsx';
import History from './components/History.jsx';
import News from './components/News.jsx';
import Footer from './components/Footer.jsx';
import Traka from './components/Traka.jsx';
import { StanjeUtakmiceProvider } from './stanjeUtakmice.jsx';

// Jednostavno "usmjeravanje": #/povijest i #/novosti otvaraju zasebne stranice,
// sve ostalo (#najava, #momcad...) je početna stranica.
function useHash() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const naPromjenu = () => setHash(window.location.hash);
    window.addEventListener('hashchange', naPromjenu);
    return () => window.removeEventListener('hashchange', naPromjenu);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHash();
  const stranica = hash.startsWith('#/povijest') ? 'povijest' : hash.startsWith('#/novosti') ? 'novosti' : 'pocetna';

  // Kad se s Povijesti vratimo na npr. #momcad, skrolaj do te sekcije
  useEffect(() => {
    if (stranica !== 'pocetna' || !hash) return;
    const id = hash.slice(1);
    // pričekaj da završi animacija prijelaza između stranica
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 350);
    return () => clearTimeout(t);
  }, [stranica, hash]);

  return (
    // reducedMotion="user" – ako korisnik u sustavu isključi animacije, poštujemo to
    <MotionConfig reducedMotion="user">
      {/* Stanje utakmice (najava, uživo, rezultat) dijele najava i žute trake */}
      <StanjeUtakmiceProvider>
        <Navbar stranica={stranica} />
        <AnimatePresence mode="wait">
          <motion.main
            key={stranica}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {stranica === 'povijest' ? (
              <History />
            ) : stranica === 'novosti' ? (
              <News />
            ) : (
              <>
                <Hero />
                <Traka />
                <Countdown />
                <Roster />
                <Matches />
                <Schedule />
                <Traka obrnuto />
              </>
            )}
          </motion.main>
        </AnimatePresence>
        <Footer />
      </StanjeUtakmiceProvider>
    </MotionConfig>
  );
}
