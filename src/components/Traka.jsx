import { klub, vremenskaZona } from '../data.js';
import { useStanjeUtakmice, preostalo } from '../stanjeUtakmice.jsx';

// Žuta traka s tekstom koji klizi. Pokazuje najavu sljedeće utakmice,
// rezultat uživo dok se igra i konačni rezultat nakon utakmice.

const formatTermina = new Intl.DateTimeFormat('hr-HR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: vremenskaZona,
});

const ime = klub.kratkoIme;

function stavkeZaStanje(s) {
  const zadano = [klub.ime, klub.nadimak, `${klub.grad} · od ${klub.osnovan}.`];
  if (!s?.u) return zadano.map((tekst) => ({ tekst }));

  const { u, stanje, live, sada, pocetak, nasiPoeni, njihoviPoeni, imaRezultat, pobjeda } = s;
  const domacin = u.domaci ? ime : u.protivnikIme;
  const gost = u.domaci ? u.protivnikIme : ime;

  if (stanje === 'uzivo') {
    const lijevo = u.domaci ? nasiPoeni : njihoviPoeni;
    const desno = u.domaci ? njihoviPoeni : nasiPoeni;
    return [
      { tekst: 'Uživo', tip: 'uzivo' },
      { tekst: imaRezultat ? `${domacin} ${lijevo} : ${desno} ${gost}` : `${domacin} – ${gost}` },
      { tekst: live?.opis || 'Utakmica je u tijeku' },
      { tekst: 'Navijaj za Jazine!' },
    ];
  }

  if (stanje === 'kraj') {
    if (!imaRezultat) return [{ tekst: 'Kraj utakmice' }, { tekst: `${domacin} – ${gost}` }, { tekst: 'Rezultat uskoro' }];
    return [
      { tekst: pobjeda ? 'Pobjeda!' : 'Poraz', tip: pobjeda ? 'pobjeda' : 'poraz' },
      {
        tekst: pobjeda
          ? `${ime} slavile protiv ${u.protivnikIme} ${nasiPoeni}:${njihoviPoeni}`
          : `${ime} izgubile od ${u.protivnikIme} ${nasiPoeni}:${njihoviPoeni}`,
      },
      { tekst: u.natjecanje },
      { tekst: klub.nadimak },
    ];
  }

  if (stanje === 'odgodjeno') {
    return [{ tekst: 'Utakmica odgođena' }, { tekst: `${domacin} – ${gost}` }, { tekst: 'Novi termin uskoro' }];
  }

  if (stanje === 'uskoro') {
    return [{ tekst: 'Uskoro počinje', tip: 'uzivo' }, { tekst: `${domacin} – ${gost}` }, { tekst: u.mjesto }];
  }

  // Odbrojavanje do sljedeće utakmice
  const v = preostalo(pocetak, sada);
  const jos = v.dani > 0 ? `Još ${v.dani} d ${v.sati} h ${v.minute} min` : `Još ${v.sati} h ${v.minute} min`;
  return [
    { tekst: 'Sljedeća utakmica', tip: 'najava' },
    { tekst: `${domacin} vs ${gost}` },
    { tekst: formatTermina.format(new Date(u.datum)) },
    { tekst: u.mjesto },
    { tekst: jos },
  ];
}

export default function Traka({ obrnuto = false, className = '' }) {
  const stanje = useStanjeUtakmice();
  const stavke = stavkeZaStanje(stanje);
  // Ponovi stavke da traka uvijek bude puna i na širokim ekranima
  const niz = [...stavke, ...stavke, ...stavke];

  return (
    <a
      href="#najava"
      className={`traka ${obrnuto ? 'traka--obrnuto' : ''} traka--${stanje?.stanje ?? 'prazno'} ${className}`}
      aria-label={stavke.map((s) => s.tekst).join(', ')}
    >
      <div className="traka__unutra" aria-hidden="true">
        {[0, 1].map((kopija) => (
          <div className="traka__niz" key={kopija}>
            {niz.map((s, i) => (
              <span key={i} className="traka__stavka">
                {s.tip ? (
                  <span className={`traka__oznaka traka__oznaka--${s.tip}`}>
                    {s.tip === 'uzivo' && <span className="traka__tocka" />}
                    {s.tekst}
                  </span>
                ) : (
                  s.tekst
                )}
                <img className="traka__grb" src="logo.png" alt="" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </a>
  );
}
