"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import "../styles/properties.css";


const propertyTypes = [
    { name: "Kuće", image: "/house.png", path: "/Kuce" },
    { name: "Stanovi", image: "/apartment.png", path: "/Stanovi" },
    { name: "Apartmani", image: "/kondo.png", path: "/Apartmani" },
    { name: "Zemljište", image: "/land.png", path: "/Zemljiste" },
]
const PropertiesSection = () => {
    return (
        <section className="properties-section">
            {propertyTypes.map((item) => (
                <Link key={item.name} href={item.path}>
                    <motion.div
                        className="property-card"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="property-image">
                            <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="property-img"
                            />

                        </div>

                        <div className="property-overlay">
                            <h2>{item.name}</h2>

                        </div>

                    </motion.div>
                </Link>
            ))}

        </section>

    );
}

export default PropertiesSection;