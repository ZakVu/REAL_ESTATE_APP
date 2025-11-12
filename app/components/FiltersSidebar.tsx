"use client";

import { useState } from "react";
import "../styles/filter.css";


const FiltersSidebar = () => {

    const [city, setCity] = useState("");
    const [minPrice, setMinPrice] = useState<number | "">("");
    const [maxPrice, setMaxPrice] = useState<number | "">("");
    const [type, setType] = useState<string>("");

    //Ovo je samo izgled dok ne bude gotov api
    return (
        <aside className="filters-aside">
            <h3>Filteri</h3>

            <div className="filter-group">
                <label>Grad</label>
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Izaberite grad" />

            </div>

            <div className="filter-group">
                <label>Tip nekretnine</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Svi tipovi</option>
                    <option value="Stan">Stan</option>
                    <option value="Kuća">Kuća</option>
                    <option value="Apartman">Apartman</option>
                    <option value="Zemljište">Zemljište</option>
                </select>
            </div>

            <div className="filter-row">
                <div className="filter-col">
                    <label>Min cijena</label>
                    <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : "")} placeholder="0" />
                </div>
                <div className="filter-col">
                    <label>Max cijena</label>
                    <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : "")} placeholder="npr. 10.000.000" />
                </div>
            </div>

            <button className="filter-btn" onClick={() => { /* za sad samo dummy */ alert("Filter primijenjen (UI) — kasnije povežemo s API-jem") }}>
                Primijeni filter
            </button>

            <button className="clear-btn" onClick={() => { setCity(""); setType(""); setMinPrice(""); setMaxPrice(""); }}>
                Očisti filtere
            </button>



        </aside>

    );
}

export default FiltersSidebar;