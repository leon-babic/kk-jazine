import { motion } from 'motion/react';
import { klub } from '../data.js';

export default function Footer() {
  return (
    <footer id="kontakt" className="footer">
      <motion.div
        className="footer__unutra"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p className="footer__ime">{klub.ime}</p>
          <p className="footer__tekst">Dođi navijati – svaka utakmica je bolja uz tebe.</p>
        </div>
        <div className="footer__kontakt">
          <a href={`mailto:${klub.email}`}>{klub.email}</a>
          <div className="footer__mreze">
            <a href={klub.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <a href={klub.facebook} target="_blank" rel="noreferrer">Facebook</a>
          </div>
        </div>
      </motion.div>
      <p className="footer__dno">© {new Date().getFullYear()} {klub.ime} · {klub.grad}</p>
    </footer>
  );
}
