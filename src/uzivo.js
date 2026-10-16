import { useEffect, useState } from 'react';

// ============================================================
//  REZULTAT UŽIVO – čita se sa Sofascorea izravno iz preglednika.
//  Ako Sofascore ne odgovori, najava se ravna samo po vremenu.
// ============================================================

const API = 'https://www.sofascore.com/api/v1/event/';
const OSVJEZI_SVAKIH_MS = 20000;

const prijevodi = {
  '1st quarter': '1. četvrtina',
  '2nd quarter': '2. četvrtina',
  '3rd quarter': '3. četvrtina',
  '4th quarter': '4. četvrtina',
  Halftime: 'Poluvrijeme',
  Pause: 'Pauza',
  Overtime: 'Produžetak',
  'Awaiting extra time': 'Čeka se produžetak',
  Ended: 'Kraj',
  AET: 'Kraj nakon produžetka',
  'After overtime': 'Kraj nakon produžetka',
  Postponed: 'Odgođeno',
  Canceled: 'Otkazano',
  'Not started': 'Nije počela',
};

// Pretvara Sofascore odgovor u naš oblik (naši poeni uvijek prvi)
function procitaj(event, domaci) {
  const nasi = domaci ? event.homeScore : event.awayScore;
  const njihovi = domaci ? event.awayScore : event.homeScore;
  const cetvrtine = [1, 2, 3, 4, 5, 6, 7]
    .map((n) => [nasi?.[`period${n}`], njihovi?.[`period${n}`]])
    .filter(([a, b]) => a != null && b != null);
  return {
    status: event.status?.type, // 'notstarted' | 'inprogress' | 'finished' | 'postponed' | 'canceled'
    opis: prijevodi[event.status?.description] ?? event.status?.description ?? '',
    nasi: nasi?.current ?? null,
    protivnik: njihovi?.current ?? null,
    cetvrtine,
  };
}

// Demo za isprobavanje: dodaj ?demo=uzivo ili ?demo=kraj na adresu stranice
export function demoStanje() {
  const demo = new URLSearchParams(window.location.search).get('demo');
  if (demo === 'uzivo') {
    return { status: 'inprogress', opis: '3. četvrtina', nasi: 58, protivnik: 51, cetvrtine: [[22, 18], [19, 20], [17, 13]], demo: true };
  }
  if (demo === 'kraj') {
    return { status: 'finished', opis: 'Kraj', nasi: 84, protivnik: 77, cetvrtine: [[22, 18], [19, 20], [24, 17], [19, 22]], demo: true };
  }
  return null;
}

// aktivno = true kad ima smisla pitati Sofascore (utakmica uskoro, traje ili je završila)
export function useRezultatUzivo(sofascoreId, domaci, aktivno) {
  const [podaci, setPodaci] = useState(null);

  useEffect(() => {
    setPodaci(null);
    if (!sofascoreId || !aktivno) return;
    let prekinuto = false;
    let timer;

    async function dohvati() {
      try {
        const odgovor = await fetch(API + sofascoreId);
        if (!odgovor.ok) throw new Error(odgovor.status);
        const { event } = await odgovor.json();
        if (prekinuto) return;
        const novo = procitaj(event, domaci);
        setPodaci(novo);
        // Kad je utakmica gotova, više ne treba osvježavati
        if (novo.status === 'finished' || novo.status === 'canceled') return;
      } catch {
        // Sofascore nije odgovorio – pokušaj ponovno malo kasnije
      }
      if (!prekinuto) timer = setTimeout(dohvati, OSVJEZI_SVAKIH_MS);
    }

    dohvati();
    return () => {
      prekinuto = true;
      clearTimeout(timer);
    };
  }, [sofascoreId, domaci, aktivno]);

  return podaci;
}
