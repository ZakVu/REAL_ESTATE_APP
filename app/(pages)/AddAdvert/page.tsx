"use client";

import { area, desc } from "framer-motion/client";
import { useState } from "react";
import "../../styles/addAdvert.css";

const AddAdvert = () => {

    const [formData, setFormData] = useState({
        title: "",
        property_type: "",
        offer_type: "",
        description: "",
        price: "",
        city: "",
        address: "",
        area: "",
        bedrooms: "",
        rooms: "",
    });

    const [images, setImages] = useState<File[]>([]);
    const [preview, setPreview] = useState<string[]>([]);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImages(files);
            const previews = files.map(file => URL.createObjectURL(file));
            setPreview(previews);
        };



    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Ovde ide logika za slanje podataka na server
        console.log("Oglas podaci:", formData);
        console.log("Slike:", images);
        setMessage("Oglas uspješno pripremljen! (API još nije povezan)");



    }






    return (
        <div className="new-listing-container">
            <h2>Dodaj novi oglas</h2>
            <form onSubmit={handleSubmit} className="new-listing-form">
                <label>Novi oglas</label>
                <input type="text" name="title" placeholder="Naslov oglasa" value={formData.title} onChange={handleChange} required />

                <label>Tip nekretnine:</label>
                <select name="property_type" value={formData.property_type} onChange={handleChange} required>
                    <option value="">Izaberi</option>
                    <option value="stan">Stan</option>
                    <option value="kuca">Kuća</option>
                    <option value="poslovni_prostor">Poslovni prostor</option>
                </select>

                <label>Tip ponude:</label>
                <select name="offer_type" value={formData.offer_type} onChange={handleChange} required>
                    <option value="">Izaberi</option>
                    <option value="prodaja">Prodaja</option>
                    <option value="iznajmljivanje">Iznajmljivanje</option>
                </select>

                <label>Opis:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={4} required />

                <label>Cijena (EUR):</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} required />

                <label>Grad:</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />

                <label>Adresa:</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />

                <label>Kvadratura (m²):</label>
                <input type="number" name="area" value={formData.area} onChange={handleChange} required />

                <label>Broj soba:</label>
                <input type="number" name="rooms" value={formData.rooms} onChange={handleChange} required />

                <label>Slike nekretnine:</label>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} />

                {preview.length > 0 && (
                    <div className="preview-gallery">
                        {preview.map((src, index) => (
                            <img key={index} src={src} alt={`Preview ${index + 1}`} className="preview-image" />
                        ))}

                    </div>
                )}

                <button type="submit" className="submit-btn">Dodaj oglas</button>
                
            </form>

            {message && <p className="form-message">{message}</p>}

        </div>
    );
}

export default AddAdvert;