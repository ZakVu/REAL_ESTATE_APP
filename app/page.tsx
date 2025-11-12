import Image from "next/image";
import styles from "./page.module.css";
import { div } from "framer-motion/client";
import Hero from "./components/Hero";
import PropertiesSection from "./components/PropertiesSection";
import FeaturedListings from "./components/FeaturedListings";
import AgenciesSection from "./components/AgenciesSection";
import Footer from "./components/Footer";
import AdviceSection from "./components/AdviceSection";

export default function Home() {
  return (
    <div className={styles.homepage}>
      <div className={styles.hero}>
        <Hero />
      </div>
      <div className={styles.propsec}>
        <PropertiesSection />
      </div>
      <div className={styles.featuredli}>
        <FeaturedListings />
      </div>
      <div className={styles.agensec}>
        <AgenciesSection />
      </div>
      <div>
        <AdviceSection />
      </div>
     
    </div>


  );
}
