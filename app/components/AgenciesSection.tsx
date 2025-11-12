"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import "../styles/agencies.css";

const agencies = [
    {
        id: 1,
        name: "BeoHome",
        logo: "/agencija1.png",
        url: "https://beohome.rs",
    },
    {
        id: 2,
        name: "Delta Nekretnine",
        logo: "/agencija2.png",
        url: "https://deltanekretnine.rs",
    },
    {
        id: 3,
        name: "City Estate",
        logo: "/agencija3.png",
        url: "https://cityestate.rs",
    },
    {
        id: 4,
        name: "EuroStan",
        logo: "/agecija4.png",
        url: "https://eurostan.rs",
    },
    {
        id: 5,
        name: "BG Nekretnine",
        logo: "/agencija5.png",
        url: "https://bgnekretnine.rs",
    },
    {
        id: 6,
        name: "BG Nekretnine",
        logo: "/agencija5.png",
        url: "https://bgnekretnine.rs",
    },
    {
        id: 7,
        name: "BG Nekretnine",
        logo: "/agencija5.png",
        url: "https://bgnekretnine.rs",
    },
    {
        id: 8,
        name: "BG Nekretnine",
        logo: "/agencija5.png",
        url: "https://bgnekretnine.rs",
    },
    {
        id: 9,
        name: "BG Nekretnine",
        logo: "/agencija5.png",
        url: "https://bgnekretnine.rs",
    },

];


const AgenciesSection = () => {

    

    return (

        <section className="agencies-section">
            <h2 className="agencies-title">Agencije za nekretnine</h2>
            <div className="agencies-container">
                {agencies.map((agency, index) => (
                    <motion.a
                        key={agency.id}
                        href={agency.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="agency-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className="agency-logo">
                            <Image
                                src={agency.logo}
                                alt={agency.name}
                                fill
                                className="agency-img"
                            />
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
}

export default AgenciesSection