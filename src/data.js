// ============================================================
//  SVI PODACI STRANICE SU OVDJE
//  Izvori (listopad 2026.): Sofascore, kkzadar.hr, HKS, Wikipedia
// ============================================================

export const klub = {
  ime: 'KK Jazine Arbanasi',
  kratkoIme: 'Jazine Arbanasi',
  grad: 'Zadar',
  sezona: '2026/27',
  liga: 'Prva muška liga',
  trener: 'Ivan Beram',
  // Podaci za karticu trenera (izvor: kkzadar.hr, lipanj 2026.)
  trenerInfo: {
    slika: 'slike/trener-beram.jpg',
    slikaAutor: 'KK Zadar',
    uloga: 'Glavni trener',
    pomocnik: 'Toni Vidaić',
    opis:
      'Ivan Beram stigao je u lipnju 2026. kao voditelj omladinskog pogona KK Zadra, trener juniora i razvojne momčadi Jazine Arbanasi. Prije toga radio je u švicarskom Vevey Riviera Basketu, gdje je seniore 2023./24. doveo do trećeg mjesta u ligi i finala Kupa. Bio je i pomoćni trener reprezentacije Armenije, a radio je na individualnom razvoju igrača poput Dragana Bendera i Ante Tonija Žižića.',
    karijera: ['Vevey Riviera Basket (Švicarska)', 'Pomoćni trener reprezentacije Armenije', 'Akademija Nikola Vujčić'],
  },
  dvorana: 'Dvorana Jazine',
  osnovan: 1975,
  nadimak: 'Žuta podmornica',
  // Fotografija za pozadinu početnog ekrana: momčad 2026/27 slavi pobjedu nad Šibenkom (Kup, 14. 10. 2026.)
  pozadinaHero: 'slike/momcad-2026-27.jpg',
  pozadinaHeroAutor: 'Ajančijev / KK Zadar', // TODO: tražiti dopuštenje kluba prije objave
  email: 'info@primjer.hr', // TODO: pravi email kluba
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
};

// Protivnici: ime, grad i grb (grbovi su u public/grbovi)
export const protivnici = {
  gorica: { ime: 'KK Gorica', grad: 'Velika Gorica', grb: 'grbovi/gorica.png' },
  mladost: { ime: 'HAKK Mladost', grad: 'Zagreb', grb: 'grbovi/mladost.png' },
  marsonia: { ime: 'KK Marsonia', grad: 'Slavonski Brod', grb: 'grbovi/marsonia.png' },
  sibenka: { ime: 'GKK Šibenka', grad: 'Šibenik', grb: 'grbovi/sibenka.png' },
  noviZagreb: { ime: 'KK Novi Zagreb', grad: 'Zagreb', grb: 'grbovi/novi-zagreb.png' },
  omis: { ime: 'KK Omiš Čagalj Tours', grad: 'Omiš', grb: 'grbovi/omis.png' },
  aleta: { ime: 'KK Aleta Puntamika', grad: 'Zadar', grb: 'grbovi/aleta-puntamika.png' },
  hermes: { ime: 'KK Hermes Analitica', grad: 'Zagreb', grb: 'grbovi/hermes-analitica.png' },
  djakovo: { ime: 'KK Đakovo', grad: 'Đakovo', grb: 'grbovi/djakovo.png' },
  ribola: { ime: 'KK Ribola Kaštela', grad: 'Kaštela', grb: 'grbovi/ribola-kastela.png' },
  zagreb: { ime: 'KK Zagreb', grad: 'Zagreb', grb: 'grbovi/zagreb.png' },
  crikvenica: { ime: 'KK Crikvenica', grad: 'Crikvenica', grb: 'grbovi/crikvenica.png' },
  radnik: { ime: 'KK Radnik Križevci', grad: 'Križevci', grb: 'grbovi/radnik-krizevci.png' },
};

// Momčad (podaci sa Sofascorea). Pozicija: 'Bek', 'Krilo' ili 'Centar'.
// null = podatak nije poznat (na kartici piše "–").
// Za fotografiju igrača stavi sliku u public/igraci i dodaj npr. slika: 'igraci/porobic.jpg'
export const igraci = [
  { broj: 1, ime: 'Maksim', prezime: 'Matulina', pozicija: 'Bek', visina: 189, godiste: 2003, slika: 'igraci/matulina.png' },
  { broj: 5, ime: 'Roko', prezime: 'Gizdavčić', pozicija: 'Bek', visina: 190, godiste: 2001, slika: 'igraci/gizdavcic.png' },
  { broj: 13, ime: 'Šimun', prezime: 'Lončar', pozicija: 'Bek', visina: 192, godiste: 2005, slika: 'igraci/loncar.png' },
  { broj: 25, ime: 'Bruno', prezime: 'Baričević', pozicija: 'Bek', visina: 194, godiste: 2009, slika: 'igraci/baricevic.png' },
  { broj: 37, ime: 'Vito', prezime: 'Porobić', pozicija: 'Bek', visina: 198, godiste: 2001, slika: 'igraci/porobic.png' },
  { broj: 7, ime: 'Luka', prezime: 'Jerak', pozicija: 'Krilo', visina: 201, godiste: 2009, slika: 'igraci/jerak.png' },
  { broj: 8, ime: 'Šime', prezime: 'Grbin', pozicija: 'Krilo', visina: 196, godiste: 2008, slika: 'igraci/grbin.png' },
  { broj: 9, ime: 'Frane', prezime: 'Bajković', pozicija: 'Krilo', visina: 196, godiste: 2009, slika: 'igraci/bajkovic.png' },
  { broj: 10, ime: 'Josip', prezime: 'Badrak', pozicija: 'Krilo', visina: 191, godiste: 2005, slika: 'igraci/badrak.png' },
  { broj: 11, ime: 'Luka', prezime: 'Brajković', pozicija: 'Krilo', visina: 204, godiste: 2008, slika: 'igraci/brajkovic.png' },
  { broj: 15, ime: 'Yaw', prezime: 'Obeng-Mensah', pozicija: 'Krilo', visina: 202, godiste: 2000, slika: 'igraci/obeng.png' },
  { broj: 51, ime: 'Viktor', prezime: 'Šarić', pozicija: 'Centar', visina: 203, godiste: 2001, slika: 'igraci/saric.png' },
];

// Odigrane utakmice, NAJNOVIJA PRVA.
// igrac = puno ime (ako je u momčadi gore, povuče se broj i pozicija).
// min = minute, pts = poeni, reb = skokovi, ast = asistencije, stl = ukradene,
// blk = blokade, tov = izgubljene lopte, fg = šut iz igre [pogođeno, pokušano],
// tri = trice [pogođeno, pokušano], sb = slobodna bacanja [pogođeno, pokušano].
// Što nije poznato, samo izostavi.
export const utakmice = [
  {
    id: 'kup-sf-sibenka',
    datum: '2026-10-14T18:00:00Z',
    natjecanje: 'Kup Krešimir Ćosić · polufinale (regija Jug)',
    sezona: '2026/27',
    sluzbena: true,
    protivnik: 'sibenka',
    domaci: true,
    rezultat: { nasi: 101, protivnik: 88 },
    // Za utakmice Kupa objavljeni su samo poeni
    statistika: [
      { igrac: 'Bruno Baričević', pts: 22 },
      { igrac: 'Yaw Obeng-Mensah', pts: 17 },
      { igrac: 'Viktor Šarić', pts: 17 },
      { igrac: 'Roko Gizdavčić', pts: 15 },
      { igrac: 'Vito Porobić', pts: 10 },
      { igrac: 'Josip Badrak', pts: 8 },
      { igrac: 'Luka Brajković', pts: 6 },
      { igrac: 'Maksim Matulina', pts: 4 },
      { igrac: 'Šime Grbin', pts: 2 },
      { igrac: 'Luka Jerak', pts: 0 },
      { igrac: 'Frane Bajković', pts: 0 },
      { igrac: 'Gambiroža', pts: 0 },
    ],
  },
  {
    id: 'liga-1-radnik',
    datum: '2026-10-10T18:00:00Z',
    natjecanje: 'Prva muška liga · 1. kolo',
    sezona: '2026/27',
    sluzbena: true,
    protivnik: 'radnik',
    domaci: false,
    rezultat: { nasi: 70, protivnik: 64 },
    statistika: [
      { igrac: 'Vito Porobić', min: 32, pts: 14, reb: 4, ast: 4, stl: 0, blk: 0, tov: 3, fg: [6, 13], tri: [1, 3], sb: [1, 2] },
      { igrac: 'Roko Gizdavčić', min: 34, pts: 11, reb: 4, ast: 1, stl: 1, blk: 0, tov: 3, fg: [4, 9], tri: [1, 5], sb: [2, 2] },
      { igrac: 'Yaw Obeng-Mensah', min: 29, pts: 10, reb: 12, ast: 0, stl: 1, blk: 0, tov: 3, fg: [5, 12], tri: [0, 3], sb: [0, 0] },
      { igrac: 'Maksim Matulina', min: 21, pts: 9, reb: 3, ast: 0, stl: 3, blk: 0, tov: 0, fg: [4, 5], tri: [1, 1], sb: [0, 0] },
      { igrac: 'Josip Badrak', min: 29, pts: 9, reb: 3, ast: 1, stl: 0, blk: 0, tov: 3, fg: [3, 11], tri: [2, 8], sb: [1, 1] },
      { igrac: 'Bruno Baričević', min: 14, pts: 8, reb: 1, ast: 1, stl: 0, blk: 0, tov: 0, fg: [3, 5], tri: [2, 3], sb: [0, 0] },
      { igrac: 'Viktor Šarić', min: 18, pts: 6, reb: 5, ast: 0, stl: 0, blk: 0, tov: 1, fg: [3, 10], tri: [0, 0], sb: [0, 0] },
      { igrac: 'Luka Brajković', min: 9, pts: 3, reb: 1, ast: 0, stl: 0, blk: 0, tov: 1, fg: [1, 2], tri: [1, 2], sb: [0, 0] },
      { igrac: 'Luka Jerak', min: 9, pts: 0, reb: 0, ast: 0, stl: 0, blk: 0, tov: 0, fg: [0, 2], tri: [0, 1], sb: [0, 0] },
      { igrac: 'Frane Bajković', min: 4, pts: 0, reb: 0, ast: 0, stl: 1, blk: 0, tov: 1, fg: [0, 1], tri: [0, 0], sb: [0, 0] },
    ],
  },
  {
    id: 'kup-cf-puntamika',
    datum: '2026-10-07T18:00:00Z', // točan datum nije objavljen (izvještaj je od 8. 10.) – provjeri
    natjecanje: 'Kup Krešimir Ćosić · četvrtfinale (regija Jug)',
    sezona: '2026/27',
    sluzbena: true,
    protivnik: 'aleta',
    domaci: false,
    rezultat: { nasi: 86, protivnik: 73 },
    statistika: [
      { igrac: 'Josip Badrak', pts: 26 },
      { igrac: 'Vito Porobić', pts: 19 },
      { igrac: 'Yaw Obeng-Mensah', pts: 15 },
      { igrac: 'Viktor Šarić', pts: 11 },
      { igrac: 'Roko Gizdavčić', pts: 8 },
      { igrac: 'Luka Jerak', pts: 3 },
      { igrac: 'Frane Bajković', pts: 3 },
      { igrac: 'Maksim Matulina', pts: 1 },
    ],
  },
  {
    id: 'prij-sibenka',
    datum: '2026-09-23T15:00:00Z',
    natjecanje: 'Prijateljska utakmica',
    sezona: '2026/27',
    sluzbena: false,
    protivnik: 'sibenka',
    domaci: false,
    rezultat: { nasi: 77, protivnik: 90 },
    statistika: [],
  },
  {
    id: 'liga-2526-crikvenica',
    datum: '2026-04-16T16:00:00Z',
    natjecanje: 'Prva muška liga 2025/26 · 26. kolo',
    sezona: '2025/26',
    sluzbena: true,
    protivnik: 'crikvenica',
    domaci: false,
    rezultat: { nasi: 95, protivnik: 82 },
    statistika: [
      { igrac: 'Bruno Rebić', broj: 12, min: 32, pts: 23, reb: 4, ast: 9, stl: 3, blk: 0, tov: 2, fg: [7, 17], tri: [5, 7], sb: [4, 4] },
      { igrac: 'Šime Lovre Lisica', broj: 10, min: 27, pts: 18, reb: 6, ast: 3, stl: 1, blk: 0, tov: 1, fg: [7, 14], tri: [4, 9], sb: [0, 0] },
      { igrac: 'Filip Bilokapić', broj: 17, min: 23, pts: 18, reb: 1, ast: 0, stl: 1, blk: 0, tov: 0, fg: [6, 7], tri: [3, 4], sb: [3, 5] },
      { igrac: 'Bruno Baričević', broj: 4, min: 20, pts: 11, reb: 2, ast: 1, stl: 0, blk: 0, tov: 3, fg: [4, 7], tri: [3, 5], sb: [0, 0] },
      { igrac: 'Gvido Gustin', broj: 9, min: 36, pts: 10, reb: 6, ast: 4, stl: 1, blk: 1, tov: 4, fg: [3, 5], tri: [1, 2], sb: [3, 6] },
      { igrac: 'Frane Bajković', broj: 15, min: 23, pts: 7, reb: 7, ast: 3, stl: 2, blk: 0, tov: 1, fg: [3, 6], tri: [0, 2], sb: [1, 2] },
      { igrac: 'Luka Jerak', broj: 5, min: 4, pts: 3, reb: 0, ast: 0, stl: 0, blk: 0, tov: 0, fg: [1, 2], tri: [1, 2], sb: [0, 0] },
      { igrac: 'Luka Brajković', broj: 11, min: 9, pts: 3, reb: 0, ast: 2, stl: 1, blk: 0, tov: 0, fg: [1, 1], tri: [1, 1], sb: [0, 0] },
      { igrac: 'Alexander Božiković', broj: 24, min: 6, pts: 2, reb: 0, ast: 0, stl: 0, blk: 0, tov: 0, fg: [1, 1], tri: [0, 0], sb: [0, 0] },
      { igrac: 'Šime Grbin', broj: 18, min: 16, pts: 0, reb: 4, ast: 0, stl: 0, blk: 0, tov: 1, fg: [0, 5], tri: [0, 1], sb: [0, 0] },
      { igrac: 'Ivan Katalinić', broj: 14, min: 5, pts: 0, reb: 1, ast: 0, stl: 0, blk: 0, tov: 0, fg: [0, 0], tri: [0, 0], sb: [0, 0] },
    ],
  },
];

// Raspored Prve muške lige 2026/27 (Sofascore). Vrijeme je u UTC-u ("Z"),
// a stranica ga sama prikaže po zagrebačkom vremenu.
// Kad se utakmica odigra, dodaj rezultat: { nasi: 80, protivnik: 75 }
// (dok rezultat ne upišeš, najava ga sama povuče sa Sofascorea).
// sofascore = broj utakmice na Sofascoreu – odatle se čita rezultat uživo.
export const raspored = [
  { kolo: 1, datum: '2026-10-10T18:00:00Z', protivnik: 'radnik', domaci: false, sofascore: 16872897, rezultat: { nasi: 70, protivnik: 64 } },
  { kolo: 2, datum: '2026-10-18T15:30:00Z', protivnik: 'gorica', domaci: false, sofascore: 17073277 },
  { kolo: 3, datum: '2026-10-24T14:00:00Z', protivnik: 'mladost', domaci: true, sofascore: 17073306 },
  { kolo: 4, datum: '2026-10-30T18:00:00Z', protivnik: 'marsonia', domaci: false, sofascore: 17073310 },
  { kolo: 5, datum: '2026-11-07T18:00:00Z', protivnik: 'sibenka', domaci: true, sofascore: 17073336 },
  { kolo: 6, datum: '2026-11-14T18:00:00Z', protivnik: 'noviZagreb', domaci: false, sofascore: 17073345 },
  { kolo: 7, datum: '2026-11-21T18:00:00Z', protivnik: 'omis', domaci: true, sofascore: 17073364 },
  { kolo: 8, datum: '2026-11-28T18:00:00Z', protivnik: 'aleta', domaci: false, sofascore: 17073378 },
  { kolo: 9, datum: '2026-12-05T18:00:00Z', protivnik: 'hermes', domaci: true, sofascore: 17073394 },
  { kolo: 10, datum: '2026-12-12T18:00:00Z', protivnik: 'djakovo', domaci: false, sofascore: 17073412 },
  { kolo: 11, datum: '2026-12-19T18:00:00Z', protivnik: 'ribola', domaci: true, sofascore: 17073422 },
  { kolo: 12, datum: '2027-01-09T18:00:00Z', protivnik: 'zagreb', domaci: false, sofascore: 17073442 },
  { kolo: 13, datum: '2027-01-16T18:00:00Z', protivnik: 'crikvenica', domaci: true, sofascore: 17073448 },
  { kolo: 14, datum: '2027-01-23T18:00:00Z', protivnik: 'radnik', domaci: true, sofascore: 17073461 },
  { kolo: 15, datum: '2027-01-30T18:00:00Z', protivnik: 'gorica', domaci: true, sofascore: 17073462 },
  { kolo: 16, datum: '2027-02-06T18:00:00Z', protivnik: 'mladost', domaci: false, sofascore: 17073298 },
  { kolo: 17, datum: '2027-02-13T18:00:00Z', protivnik: 'marsonia', domaci: true, sofascore: 17073302 },
  { kolo: 18, datum: '2027-02-20T18:00:00Z', protivnik: 'sibenka', domaci: false, sofascore: 17073326 },
  { kolo: 19, datum: '2027-02-27T18:00:00Z', protivnik: 'noviZagreb', domaci: true, sofascore: 17073335 },
  { kolo: 20, datum: '2027-03-06T18:00:00Z', protivnik: 'omis', domaci: false, sofascore: 17073354 },
  { kolo: 21, datum: '2027-03-13T18:00:00Z', protivnik: 'aleta', domaci: true, sofascore: 17073368 },
  { kolo: 22, datum: '2027-03-20T18:00:00Z', protivnik: 'hermes', domaci: false, sofascore: 17073385 },
  { kolo: 23, datum: '2027-03-23T18:00:00Z', protivnik: 'djakovo', domaci: true, sofascore: 17073402 },
  { kolo: 24, datum: '2027-04-03T17:00:00Z', protivnik: 'ribola', domaci: false, sofascore: 17073413 },
  { kolo: 25, datum: '2027-04-10T17:00:00Z', protivnik: 'zagreb', domaci: true, sofascore: 17073433 },
  { kolo: 26, datum: '2027-04-17T17:00:00Z', protivnik: 'crikvenica', domaci: false, sofascore: 17073439 },
];

// ---------- Pomoćne funkcije (ne treba mijenjati) ----------

export const vremenskaZona = 'Europe/Zagreb';

export function nadjiIgraca(punoIme) {
  return igraci.find((i) => `${i.ime} ${i.prezime}` === punoIme);
}

export function protivnik(kljuc) {
  return protivnici[kljuc] ?? { ime: kljuc, grad: '', grb: null };
}

// Koliko otprilike traje utakmica i koliko dugo nakon kraja najava pokazuje rezultat
export const TRAJANJE_UTAKMICE_MIN = 150;
export const REZULTAT_VIDLJIV_SATI = 24;

const kraj = (r) => new Date(r.datum).getTime() + TRAJANJE_UTAKMICE_MIN * 60000;

// Utakmica za najavu: ona koja još nije počela, traje ili je završila
// prije manje od 24 sata. Nakon toga najava prelazi na sljedeću.
export function aktualnaUtakmica(sada = Date.now()) {
  const u = raspored.find((r) => kraj(r) + REZULTAT_VIDLJIV_SATI * 3600000 > sada);
  return u ? opisUtakmice(u) : null;
}

// Sljedeća utakmica koja još nije završila (za istaknuti red u rasporedu)
export function sljedecaUtakmica(sada = Date.now()) {
  const u = raspored.find((r) => !r.rezultat && kraj(r) > sada);
  return u ? opisUtakmice(u) : null;
}

function opisUtakmice(u) {
  const p = protivnik(u.protivnik);
  return {
    ...u,
    protivnikIme: p.ime,
    protivnikGrb: p.grb,
    mjesto: u.domaci ? `${klub.dvorana}, ${klub.grad}` : p.grad,
    natjecanje: `${klub.liga} · ${u.kolo}. kolo`,
  };
}

// Prosjeci igrača u Prvoj muškoj ligi ove sezone (Kup i prijateljske se ne broje)
export function statistikaSezone() {
  const zbroj = {};
  for (const u of utakmice) {
    if (u.sezona !== klub.sezona || !u.natjecanje.startsWith(klub.liga)) continue;
    for (const s of u.statistika) {
      const z = (zbroj[s.igrac] ??= { utakmica: 0, pts: 0, reb: 0, ast: 0, sReb: 0, sAst: 0 });
      z.utakmica += 1;
      z.pts += s.pts ?? 0;
      if (s.reb != null) { z.reb += s.reb; z.sReb += 1; }
      if (s.ast != null) { z.ast += s.ast; z.sAst += 1; }
    }
  }
  const prosjek = (a, b) => (b ? (a / b).toFixed(1) : null);
  return Object.fromEntries(
    Object.entries(zbroj).map(([ime, z]) => [
      ime,
      { utakmica: z.utakmica, pts: prosjek(z.pts, z.utakmica), reb: prosjek(z.reb, z.sReb), ast: prosjek(z.ast, z.sAst) },
    ])
  );
}

export function inicijali(tekst) {
  return tekst
    .split(' ')
    .filter((rijec) => !['KK', 'GKK', 'HAKK', 'MKK'].includes(rijec))
    .slice(0, 2)
    .map((rijec) => rijec[0])
    .join('')
    .toUpperCase();
}
