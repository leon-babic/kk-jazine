// ============================================================
//  PODACI ZA STRANICU "POVIJEST"
//  Izvor: hr.wikipedia.org/wiki/KK_Jazine_Arbanasi_Zadar, Zadarski list
// ============================================================

export const brojke = [
  { broj: 1975, tekst: 'godina osnutka' },
  { broj: 4, tekst: 'naslova prvaka A-2 lige Jug' },
  { broj: 3500, tekst: 'mjesta u dvorani Jazine' },
  { broj: 1968, tekst: 'otvorena dvorana Jazine' },
];

const commons = (put, sirina = 1280) => {
  const datoteka = put.split('/').pop();
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${put}/${sirina}px-${datoteka}`;
};

// slika (nije obavezna): { src, opis, autor, izvor } – prikazuje se uz događaj na vremenskoj crti
export const vremenskaCrta = [
  {
    godina: '1975.',
    naslov: 'Rođen je KK Jazine',
    tekst: 'Klub je osnovan u zadarskom kvartu Jazine i godinama gradi svoju priču u nižim ligama.',
    slika: {
      src: commons('d/de/Mural_u_sivim_tonovima_s_natpisom_%E2%80%9EJazine_za_sva_vremena%E2%80%9D.jpg', 960),
      opis: 'Mural „Jazine za sva vremena” u kvartu gdje je sve počelo',
      autor: 'Inks (CC BY-SA 4.0)',
      izvor: 'https://commons.wikimedia.org/wiki/File:Mural_u_sivim_tonovima_s_natpisom_%E2%80%9EJazine_za_sva_vremena%E2%80%9D.jpg',
    },
  },
  {
    godina: '2002./03.',
    naslov: 'Ulazak u A-2 ligu Jug',
    tekst: 'Nakon godina u B-1 ligi, klub se plasira u drugi rang natjecanja – A-2 ligu Jug.',
    slika: {
      src: 'slike/jazine-dvorana-krov.jpg',
      opis: 'Dvorana Jazine – legendarni „hram košarke” u kojem klub raste',
      autor: 'KK Zadar',
      izvor: 'https://kkzadar.hr/zadar-u-velicanstvenoj-atmosferi-jazina-zadar-slavio-protiv-cedevite-olimpije/',
    },
  },
  {
    godina: '2005./06.',
    naslov: 'Prvi naslov prvaka',
    tekst: 'Jazine osvajaju A-2 ligu Jug i igraju u ligi za popunu A-1 lige.',
  },
  {
    godina: '2014.',
    naslov: 'Novo ime: Jazine Arbanasi',
    tekst: 'Klub mijenja ime u KK Jazine Arbanasi i iste sezone ponovno postaje prvak A-2 lige Jug.',
  },
  {
    godina: '2016./17.',
    naslov: 'Treći naslov zaredom',
    tekst: 'Nakon naslova 2014./15. i 2015./16. dolazi i treći uzastopni, uz prvo mjesto u kvalifikacijama za Premijer ligu.',
  },
  {
    godina: '2017./18.',
    naslov: 'Premijer liga!',
    tekst: 'Najveći uspjeh u povijesti kluba – sezona u najjačem hrvatskom košarkaškom natjecanju, uz gradski derbi s KK Zadrom.',
    slika: {
      src: 'slike/povijest/2018-premijer-liga.jpg',
      opis: 'Klupa „Jazine Zadar” na utakmici HT Premijer lige, 2018.',
      autor: 'eZadar',
      izvor: 'https://ezadar.net.hr/sport/227341/u-direktnom-okrsaju-dvaju-davljenika-jazine-porazile-momcad-zagreba/',
    },
  },
  {
    godina: 'Ožujak 2018.',
    naslov: 'Remi Barry i velika pobjeda',
    tekst: 'Usred borbe za opstanak u Premijer ligi, fenomenalni Remi Barry donio je Jazinama važnu pobjedu.',
    slika: {
      src: 'slike/povijest/2018-remi-barry.jpg',
      opis: 'Remi Barry u dresu Jazina, Premijer liga 2017./18.',
      autor: 'eZadar',
      izvor: 'https://ezadar.net.hr/sport/226855/fenomenalni-remi-barry-donio-vaznu-pobjedu-jazinama/',
    },
  },
  {
    godina: '2019./20.',
    naslov: 'Prvi u Prvoj ligi',
    tekst: 'Jazine su bile na vrhu Prve lige kad je sezona prekinuta i poništena zbog pandemije.',
  },
  {
    godina: '2020.',
    naslov: 'Razvojna momčad KK Zadra',
    tekst: 'Dogovor s KK Zadrom – Jazine postaju razvojni klub i neko vrijeme igraju kao „Jazine-Zadar II”.',
    slika: {
      src: 'slike/povijest/2020-jazine-zadar-ii.jpg',
      opis: 'Mladi Zadrani u dresovima Jazine-Zadar II, prosinac 2020.',
      autor: 'eZadar',
      izvor: 'https://ezadar.net.hr/sport/246753/jazine-preokretom-u-posljednjoj-minuti-stigle-do-nove-pobjede/',
    },
  },
  {
    godina: '2026./27.',
    naslov: 'Najmlađa momčad u povijesti',
    tekst: 'Pod vodstvom trenera Ivana Berama, prvi put u povijesti kluba nijedan igrač seniorske momčadi nije stariji od 26 godina.',
    slika: {
      src: 'slike/momcad-2026-27.jpg',
      opis: 'Slavlje klupe nakon pobjede nad Šibenkom u Kupu, listopad 2026.',
      autor: 'Ajančijev / KK Zadar',
      izvor: 'https://kkzadar.hr/jazine-arbanasi-bolje-od-sibenke-u-finalu-kupa-protiv-ribole-kastela/',
    },
  },
];

// Galerija. kategorija: 'Dvorane', 'Navijači', 'Zadar' ili 'Momčad'.
// Svoje slike stavi u public/slike i upiši npr. src: 'slike/ekipa-2018.jpg'
// Slike s Wikimedia Commonsa imaju slobodnu licencu – autor se mora navesti.
// Fotografije KK Zadra i eZadra su zaštićene – prije objave stranice treba njihovo dopuštenje.

// Ručno odabrane slike (prikazuju se prve)
const odabrane = [
  {
    src: 'slike/momcad-2026-27.jpg',
    kategorija: 'Momčad',
    opis: 'Momčad 2026./27. slavi pobjedu nad Šibenkom',
    autor: 'Ajančijev / KK Zadar',
    izvor: 'https://kkzadar.hr/jazine-arbanasi-bolje-od-sibenke-u-finalu-kupa-protiv-ribole-kastela/',
  },
  {
    src: 'slike/momcad-timeout.jpg',
    kategorija: 'Momčad',
    opis: 'Time-out Jazina (travanj 2026.)',
    autor: 'KK Zadar',
    izvor: 'https://kkzadar.hr/fotografija/prva-muska-liga-kk-jazine-arbanasi-kk-vrijednosnice-osijek/',
  },
  {
    src: commons('d/de/Mural_u_sivim_tonovima_s_natpisom_%E2%80%9EJazine_za_sva_vremena%E2%80%9D.jpg'),
    kategorija: 'Navijači',
    opis: 'Mural „Jazine za sva vremena” u kvartu Jazine',
    autor: 'Inks',
    licenca: 'CC BY-SA 4.0',
    izvor: 'https://commons.wikimedia.org/wiki/File:Mural_u_sivim_tonovima_s_natpisom_%E2%80%9EJazine_za_sva_vremena%E2%80%9D.jpg',
  },
  {
    src: 'slike/jazine-puna-dvorana.jpg',
    kategorija: 'Navijači',
    opis: 'Pune Jazine i Tornado – ABA liga, studeni 2024.',
    autor: 'KK Zadar',
    izvor: 'https://kkzadar.hr/zadar-u-velicanstvenoj-atmosferi-jazina-zadar-slavio-protiv-cedevite-olimpije/',
  },
  {
    src: 'slike/jazine-dvorana-krov.jpg',
    kategorija: 'Dvorane',
    opis: 'Dvorana Jazine – otvorena 1968., 3.500 mjesta',
    autor: 'KK Zadar',
    izvor: 'https://kkzadar.hr/zadar-u-velicanstvenoj-atmosferi-jazina-zadar-slavio-protiv-cedevite-olimpije/',
  },
  {
    src: 'slike/povijest/2018-premijer-liga.jpg',
    kategorija: 'Momčad',
    opis: 'Jazine u HT Premijer ligi, 2018.',
    autor: 'eZadar',
    izvor: 'https://ezadar.net.hr/sport/227341/u-direktnom-okrsaju-dvaju-davljenika-jazine-porazile-momcad-zagreba/',
  },
  {
    src: 'slike/povijest/2020-jazine-zadar-ii.jpg',
    kategorija: 'Momčad',
    opis: 'Jazine-Zadar II, 2020.',
    autor: 'eZadar',
    izvor: 'https://ezadar.net.hr/sport/246753/jazine-preokretom-u-posljednjoj-minuti-stigle-do-nove-pobjede/',
  },
  {
    src: 'slike/momcad-klupa.jpg',
    kategorija: 'Momčad',
    opis: 'Mladi Jazina na klupi',
    autor: 'KK Zadar',
    izvor: 'https://kkzadar.hr/fotografija/prva-muska-liga-kk-jazine-arbanasi-kk-vrijednosnice-osijek/',
  },
  {
    src: 'slike/utakmica-osijek.jpg',
    kategorija: 'Momčad',
    opis: 'Jazine Arbanasi – Vrijednosnice Osijek, travanj 2026.',
    autor: 'KK Zadar',
    izvor: 'https://kkzadar.hr/fotografija/prva-muska-liga-kk-jazine-arbanasi-kk-vrijednosnice-osijek/',
  },
  {
    src: commons('4/48/Zadar_%2848912735628%29.jpg'),
    kategorija: 'Navijači',
    opis: 'Street art u Jazinama – Ravnice',
    autor: 'Fred Romero',
    licenca: 'CC BY 2.0',
    izvor: 'https://commons.wikimedia.org/wiki/File:Zadar_(48912735628).jpg',
  },
  {
    src: commons('8/88/Dvorana_Kre%C5%A1imir_%C4%86osi%C4%87_%28Zadar%2C_CRO%29_2018.jpg'),
    kategorija: 'Dvorane',
    opis: 'Dvorana Krešimira Ćosića na Višnjiku – druga dvorana kluba',
    autor: 'Silverije',
    licenca: 'CC BY-SA 4.0',
    izvor: 'https://commons.wikimedia.org/wiki/File:Dvorana_Kre%C5%A1imir_%C4%86osi%C4%87_(Zadar,_CRO)_2018.jpg',
  },
  {
    src: commons('3/3a/Dvorana_%27Kre%C5%A1imir_%C4%86osi%C4%87%27_na_Vi%C5%A1njiku%2C_Zadar_-_grede.jpg'),
    kategorija: 'Dvorane',
    opis: 'Unutrašnjost dvorane na Višnjiku',
    autor: 'Silverije',
    licenca: 'CC BY-SA 4.0',
    izvor: "https://commons.wikimedia.org/wiki/File:Dvorana_'Kre%C5%A1imir_%C4%86osi%C4%87'_na_Vi%C5%A1njiku,_Zadar_-_grede.jpg",
  },
  {
    src: commons('4/4e/Church_of_Saint_Donatus%2C_Zadar_-_September_2017.jpg'),
    kategorija: 'Zadar',
    opis: 'Crkva sv. Donata – simbol Zadra i našeg grba',
    autor: 'Martin Falbisoner',
    licenca: 'CC BY-SA 4.0',
    izvor: 'https://commons.wikimedia.org/wiki/File:Church_of_Saint_Donatus,_Zadar_-_September_2017.jpg',
  },
  {
    src: commons('d/d5/Sunset_over_the_Adriatic_Sea_as_seen_from_the_Sea_Organ_in_Zadar_%2848670423612%29.jpg'),
    kategorija: 'Zadar',
    opis: 'Zalazak sunca kod Morskih orgulja',
    autor: 'dronepicr',
    licenca: 'CC BY 2.0',
    izvor: 'https://commons.wikimedia.org/wiki/File:Sunset_over_the_Adriatic_Sea_as_seen_from_the_Sea_Organ_in_Zadar_(48670423612).jpg',
  },
];

// ---------- Momčad: Jazine Arbanasi – Vrijednosnice Osijek (travanj 2026.) ----------
// Datoteke su u public/slike/galerija (momcad-01.jpg … momcad-20.jpg)
const GALERIJA_OSIJEK = 'https://kkzadar.hr/fotografija/prva-muska-liga-kk-jazine-arbanasi-kk-vrijednosnice-osijek/';
const momcadSlike = Array.from({ length: 20 }, (_, i) => ({
  src: `slike/galerija/momcad-${String(i + 1).padStart(2, '0')}.jpg`,
  kategorija: 'Momčad',
  opis: 'Jazine Arbanasi : Vrijednosnice Osijek, Prva liga, travanj 2026.',
  autor: 'KK Zadar',
  izvor: GALERIJA_OSIJEK,
}));

// ---------- Navijači: Tornado i puni Višnjik (finale Premijer lige, lipanj 2026.) ----------
// Zadarski košarkaški navijači na utakmici KK Zadra – ista publika koja dolazi i na Jazine.
const GALERIJA_FINALE = 'https://kkzadar.hr/fotografija/supersport-premijer-liga-finale-g5-kk-zadar-kk-cibona/';
const opisiNavijaci = [
  'Puna dvorana prije utakmice', 'Tribine u plavo-bijelom', 'Navijači sa šalovima', 'Tornado pjeva',
  'Atmosfera s tribina', 'Slavlje na tribini', 'Koreografija Tornada', 'Transparenti na tribini',
  '„Grad košarke”', 'Baklje i dim na tribinama',
];
const navijaciSlike = opisiNavijaci.map((opis, i) => ({
  src: `slike/galerija/navijaci-${String(i + 1).padStart(2, '0')}.jpg`,
  kategorija: 'Navijači',
  opis: `${opis} – zadarski navijači na Višnjiku, 2026.`,
  autor: 'KK Zadar',
  izvor: GALERIJA_FINALE,
}));

// ---------- Zadar: slobodne slike s Wikimedia Commonsa ----------
const zadar = (put, opis, autor, licenca) => ({
  src: commons(put),
  kategorija: 'Zadar',
  opis,
  autor,
  licenca,
  izvor: `https://commons.wikimedia.org/wiki/File:${put.split('/').pop()}`,
});

const zadarSlike = [
  zadar('a/aa/Zadar%2C_Promenade.jpg', 'Zadarska riva', 'Wistula', 'CC BY-SA 4.0'),
  zadar('9/92/Kopnena_Vrata_%28Zadar%29_01.jpg', 'Kopnena vrata', 'Bernard Gagnon', 'CC BY-SA 4.0'),
  zadar('0/0d/Five_Wells_Square_-_panoramio.jpg', 'Trg pet bunara', 'lienyuan lee', 'CC BY 3.0'),
  zadar('4/4f/The_Greeting_to_the_Sun_monument_in_Zadar%2C_Croatia_%2848607769932%29.jpg', 'Pozdrav Suncu', 'dronepicr', 'CC BY 2.0'),
  zadar('6/63/Aerial_view_of_The_Greeting_to_the_Sun_and_the_Sea_Organ_in_Zadar%2C_Croatia_%2848607771252%29.jpg', 'Pozdrav Suncu i Morske orgulje iz zraka', 'dronepicr', 'CC BY 2.0'),
  zadar('f/fe/Roman_Forum_in_Zadar%2C_Croatia_with_a_view_to_The_Greeting_to_the_Sun_%2848607678941%29.jpg', 'Rimski forum iz zraka', 'dronepicr', 'CC BY 2.0'),
  zadar('6/6f/Zadar_air_view.jpg', 'Zadarski poluotok iz zraka', 'nepoznat autor', 'CC0'),
  zadar('7/71/Zadar_Sunset.jpg', 'Zalazak sunca u Zadru', 'Michael Gwyther-Jones', 'CC BY 2.0'),
  zadar('4/4c/Roman_forum%2C_Zadar_%28P1080975%29.jpg', 'Rimski forum', 'Matti Blume', 'CC BY-SA 4.0'),
  zadar('d/d0/Zadar_-_Flickr_-_jns001_%2830%29.jpg', 'Ulicama starog grada', 'János Tamás', 'CC BY 2.0'),
  zadar('b/bc/Zadar%2C_Sunset_-_Pozdrav_Suncu.jpg', 'Zalazak kod Pozdrava Suncu', 'MarioMagdic', 'CC BY 4.0'),
  zadar('1/17/Zadar_sunsets.jpg', 'Zadarski zalasci', 'Aleksandr Zykov', 'CC BY-SA 2.0'),
  zadar('5/59/Zadar_-_Narodni_trg_%2848947012336%29.jpg', 'Narodni trg', 'Fred Romero', 'CC BY 2.0'),
  zadar('f/fb/Zadar_-_Gradska_lo%C5%BEa_%2848946469028%29.jpg', 'Gradska loža', 'Fred Romero', 'CC BY 2.0'),
  zadar('e/ed/Steps_of_the_Sea_Organ_in_Zadar%2C_Croatia_%2848670000773%29.jpg', 'Stepenice Morskih orgulja', 'dronepicr', 'CC BY 2.0'),
  zadar('8/84/Zadar_Panorama_Nord.jpg', 'Panorama Zadra', 'Böhringer Friedrich', 'CC BY-SA 2.5'),
  zadar('2/27/Zadar%2C_luka_Jazine_-_jedrenjak_%28sprijeda%29.jpg', 'Luka Jazine – naš kvart', 'Silverije', 'CC BY-SA 4.0'),
  zadar('8/8c/City_Bridge%2C_Zadar_%28P1080731-Pano%29.jpg', 'Gradski most i luka', 'Matti Blume', 'CC BY-SA 4.0'),
];

// Sve slike: najprije odabrane, pa ostale izmiješane po kategorijama
const izmijesaj = (...nizovi) => {
  const rezultat = [];
  const najdulji = Math.max(...nizovi.map((n) => n.length));
  for (let i = 0; i < najdulji; i++) nizovi.forEach((n) => n[i] && rezultat.push(n[i]));
  return rezultat;
};

export const galerija = [...odabrane, ...izmijesaj(momcadSlike, zadarSlike, navijaciSlike)];
