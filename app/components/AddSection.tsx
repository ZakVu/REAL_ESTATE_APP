"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import "../styles/ads.css";

type Ad = {
    id: string;
    image: string;
    title: string;
    description: string;
    link: string;
};

const mockAds: Ad[] = [
    {
        id: "ad1",
        image: "/ad1.png",
        title: "Kupovina stana nikad nije bila lakša!",
        description: "Posjetite naš portal i pronađite dom iz snova.",
        link: "https://www.unicredit.ba/ba/stanovnistvo/kreditiranje/stambeni.html",
    },
    {
        id: "ad2",
        image: "/ad2.png",
        title: "Najpovoljnije kamate na stambene kredite",
        description: "Partneri: Banka XYZ – ostvarite svoje snove.",
        link: "https://primjer-banka.rs",
    },
    {
        id: "ad3",
        image: "/ad3.png",
        title: "Besplatna procjena vrijednosti nekretnine",
        description: "Naši stručnjaci su tu da pomognu.",
        link: "https://primjer-agencija2.rs",
    },
];

const AddSection = () => {

    const [current, setCurrent] = useState(0);

    //automacko mjenjanje reklama svakih 5 sekundi

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % mockAds.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const ad = mockAds[current];


    return (
        <div className="ad-section">
            <h3 className="ad-title">Reklame</h3>
            <div className="ad-container" >
                <AnimatePresence mode="wait">
                    <motion.a
                        key={ad.id}
                        href={ad.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ad-item"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="ad-image-wrapper">
                            <img src={ad.image} alt={ad.title} className="ad-image" />
                    

                        </div>
                        <div className="add-content">
                            <h4>{ad.title}</h4>
                            <p>{ad.description}</p>

                        </div>

                    </motion.a>

                </AnimatePresence>

            </div>

            <div className="ad-dots">
                {mockAds.map((_, index) => (
                    <button
                    key={index}
                    className={`dot ${current === index ? "active" : "" }`}
                    onClick={() => setCurrent(index)}
                    />
                ))}

            </div>

        </div>
    );
}

export default AddSection;