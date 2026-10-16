import { useState } from 'react';
import { inicijali } from '../data.js';

// Grb kluba; ako slika ne postoji, prikažu se inicijali
export default function Grb({ src, ime, className = '' }) {
  const [greska, setGreska] = useState(false);

  if (!src || greska) {
    return <span className={`grb grb--inicijali ${className}`}>{inicijali(ime)}</span>;
  }
  return <img className={`grb ${className}`} src={src} alt={`Grb ${ime}`} loading="lazy" onError={() => setGreska(true)} />;
}
