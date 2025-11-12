"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import "../styles/advice.css";

const AdviceSection = () => {
    return (
        <section className="advice-section">
            <div className="advice-content">
                {/*Lijeva strana*/}
                <motion.div className="advice-text"
                    initial={{ x: -80, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="vertical-title">Savet Dana</h3>
                    <p>
                        Prije nego što kupite nekretninu, provjerite sve pravne aspekte –
                        vlasnički list, urbanistički plan i mogućnosti renoviranja.
                        Pametna kupovina znači sigurnu budućnost.
                    </p>

                </motion.div>
                {/*Desna strana*/}
                <motion.div className="advice-image-container"
                    initial={{ x: 80, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <img className="advice-image"
                        src="/savjet-img.png"
                        alt="Savet Dana" />


                </motion.div>

            </div>
        </section>

    );
}

export default AdviceSection;