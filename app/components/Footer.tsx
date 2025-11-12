"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import "../styles/footer.css";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo i opis */}
        <div className="footer-section about">
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={50}
            className="footer-logo"
          />
          <p>
            Naš portal povezuje ljude i nekretnine širom Srbije. Kupujte, prodajte
            i iznajmljujte jednostavno i sigurno.
          </p>
        </div>

        {/* Brzi linkovi */}
        <div className="footer-section links">
          <h3>Brzi linkovi</h3>
          <ul>
            <li><Link href="/">Početna</Link></li>
            <li><Link href="/onama">O nama</Link></li>
            <li><Link href="/kontakt">Kontakt</Link></li>
            <li><Link href="/AllAd">Oglasi</Link></li>
            <li><Link href="/agencije">Agencije</Link></li>
          </ul>
        </div>

        {/* Kontakt */}
        <div className="footer-section contact">
          <h3>Kontakt</h3>
          <p>Email: info@nekretnine.rs</p>
          <p>Telefon: +381 11 555 333</p>
          <p>Adresa: Beograd, Srbija</p>
        </div>

        {/* Društvene mreže */}
        <div className="footer-section social">
          <h3>Pratite nas</h3>
          <div className="social-icons">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Donja traka */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Nekretnine.rs — Sva prava zadržana.</p>
      </div>
    </footer>
  );
}
