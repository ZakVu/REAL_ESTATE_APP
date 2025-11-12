"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import "../styles/featured.css";
import { MOCK_PROPERTIES } from "../types/mockProperties";
import Link from "next/link";

const featuredListings = MOCK_PROPERTIES;
// dupliramo niz da bi efekat beskonačnog loopa izgledao glatko
const duplicatedListings = [...featuredListings, ...featuredListings];

export default function FeaturedListings() {
  return (
    <section className="featured-section">
      <h2 className="featured-title">Izdvojeni oglasi</h2>
      <div className="featured-track-wrapper">
        <motion.div
          className="featured-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {duplicatedListings.map((listing, index) => (
            <div key={`${listing.id}-${index}`} className="featured-card">
              <div className="featured-image">
                <Link href={`/property/${listing.id}`}>
                  <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    fill
                    className="featured-img"
                  />
                </Link>

              </div>
              <div className="featured-info">
                <h3>{listing.title}</h3>
                <p>{listing.location}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
