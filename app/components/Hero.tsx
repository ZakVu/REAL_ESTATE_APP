"use client";

import Link from "next/link";
import { motion } from 'framer-motion'
import "../styles/hero.css";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Hero = () => {

    
    return (
        <section className="hero">
           
            {/* Hero Content */}
            <div className="hero-content">
                <motion.div
                    className="hero-text"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1 }}
                >
                    <h1>Pronađi svoj novi dom iz snova</h1>
                    <p>Prodaja i izdavanje nekretnina širom Srbije. Pouzdano, jednostavno i moderno.</p>
                    <Link href="/AllAd" className="hero-btn">Pregledaj ponudu</Link>

                </motion.div>
               
            </div>

           
        </section>
    );
}

export default Hero;