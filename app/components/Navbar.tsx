"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { FaBarcode, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import "../styles/navbar.css";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const {isAuthenticated, logout} = useAuth();
    return (


        <motion.nav
            className="hero-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}>
            <div className="nav-logo">
                <Link href="/">🏡 Realty Srbija</Link>
            </div>

            <div className="burger-icon" onClick={() => setMenu(!menu)}>
                {menu ? <FaTimes /> : <FaBars />}
            </div>

            <ul className={`nav-links ${menu ? "open" : ""}`}>
                <li><Link href="/">Home</Link></li>
                <div className="nav-right">
                    {isAuthenticated ? (
                        <>
                            <Link href="/ProfilePage">
                               <FaUserCircle size={26} />
                            </Link>
                            <Link href="/" onClick={logout} className="logout-btn">
                                Odjavi se
                            </Link>
                        </>
                    ) : (
                        <Link href="/Login">Prijavi se</Link>
                    )}
                </div>
                <li><Link href="/Register" className="btn-register">Registruj se</Link></li>
            </ul>

        </motion.nav>

    );
}

export default Navbar;