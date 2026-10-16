import { createContext, useContext, useEffect, useState } from 'react';
import { aktualnaUtakmica, TRAJANJE_UTAKMICE_MIN, REZULTAT_VIDLJIV_SATI } from './data.js';
import { useRezultatUzivo, demoStanje } from './uzivo.js';

// ============================================================
//  STANJE AKTUALNE UTAKMICE – računa se na jednom mjestu,
//  a koriste ga najava i žute trake (jedan dohvat sa Sofascorea).
// ============================================================

const StanjeContext = createContext(null);

// Faza utakmice: odbrojavanje, uskoro, uzivo, kraj ili odgodjeno
function odrediStanje(u, sada, live) {
  const pocetak = new Date(u.datum).getTime();
  const kraj = pocetak + TRAJANJE_UTAKMICE_MIN * 60000;
  if (live?.status === 'inprogress') return 'uzivo';
  if (live?.status === 'finished') return 'kraj';
  if (live?.status === 'postponed' || live?.status === 'canceled') return 'odgodjeno';
  if (u.rezultat) return 'kraj';
  if (sada < pocetak) return 'odbrojavanje';
  if (live?.status === 'notstarted' && sada < kraj) return 'uskoro';
  if (sada < kraj) return 'uzivo';
  return 'kraj';
}

export function StanjeUtakmiceProvider({ children }) {
  const [sada, setSada] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setSada(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // 24 sata nakon kraja utakmice ovo se samo prebaci na sljedeću
  const u = aktualnaUtakmica(sada);
  const pocetak = u ? new Date(u.datum).getTime() : 0;
  const pitajSofascore = Boolean(u) && !u.rezultat && sada > pocetak - 15 * 60000;
  const demo = demoStanje();
  const sofascore = useRezultatUzivo(u?.sofascore, u?.domaci, pitajSofascore && !demo);
  const live = demo ?? sofascore;

  let vrijednost = { sada, u: null };
  if (u) {
    const nasiPoeni = live?.nasi ?? u.rezultat?.nasi ?? null;
    const njihoviPoeni = live?.protivnik ?? u.rezultat?.protivnik ?? null;
    const imaRezultat = nasiPoeni != null && njihoviPoeni != null;
    vrijednost = {
      sada,
      u,
      live,
      stanje: odrediStanje(u, sada, live),
      pocetak,
      krajPrikaza: pocetak + TRAJANJE_UTAKMICE_MIN * 60000 + REZULTAT_VIDLJIV_SATI * 3600000,
      nasiPoeni,
      njihoviPoeni,
      imaRezultat,
      pobjeda: imaRezultat && nasiPoeni > njihoviPoeni,
    };
  }

  return <StanjeContext.Provider value={vrijednost}>{children}</StanjeContext.Provider>;
}

export function useStanjeUtakmice() {
  return useContext(StanjeContext);
}

// Preostalo vrijeme do nekog trenutka
export function preostalo(cilj, sada) {
  const razlika = Math.max(0, cilj - sada);
  return {
    dani: Math.floor(razlika / 86400000),
    sati: Math.floor(razlika / 3600000) % 24,
    minute: Math.floor(razlika / 60000) % 60,
    sekunde: Math.floor(razlika / 1000) % 60,
  };
}
