"use client";

import { getCurrentClient, updateClient, uploadProfilrImage } from "@/app/lib/clientApi";
import { useEffect, useState } from "react";
import "../../styles/profile.css";
import { useRouter } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const cities = [ "beograd", "novi_sad", "nis", "kragujevac", "subotica" ];
const clientTypes = ["fizicko lice", "agencija", "investitor", "banka", "drugo pravno lice"];

const ProfilePage = () => {
  const [client, setClient] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // 🔹 Dohvati trenutnog klijenta sa /clients/me/
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await getCurrentClient();
        setClient(data);
      } catch (err) {
        console.error("Greška pri dohvaćanju profila:", err);
      }
    };
    fetchClient();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      setClient({ ...client, imageFile: file });
    }
  };

  const handleSave = async () => {
    try {
      if (!client) return;

      // 🔹 Ako korisnik doda novu sliku, prvo upload
      if (client.imageFile) {
        const formData = new FormData();
        formData.append("image", client.imageFile);
        const updatedImage = await uploadProfilrImage(client.id, formData);
        client.image = updatedImage.image;
      }

      // 🔹 PUT /clients/{id}/
      await updateClient(client.id, client);

      setMessage("Podaci uspešno ažurirani!");
      setIsEditing(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error updating client data:", err);
      setMessage("Došlo je do greške prilikom ažuriranja podataka.");
    }
  };

  if (!client) return <p>Učitavanje podataka...</p>;

  return (
    <div className="profile-wrapper">
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </div>

      {/* LEVI MENI */}
      <aside className={`profile-sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img
            src={preview || client.image || "/default-avatar.png"}
            alt="Profilna slika"
            className="sidebar-avatar"
          />
          <h3>{client.first_name} {client.last_name}</h3>
        </div>

        <nav className="profile-nav">
          <button onClick={() => router.push("/AddAdvert")} className="nav-btn active">👤 Novi oglas</button>
          <button onClick={() => router.push("/my-listings")} className="nav-btn">📦 Moji oglasi</button>
          <button onClick={() => router.push("/saved-listings")} className="nav-btn">💚 Spašeni oglasi</button>
          <button onClick={() => router.push("/messages")} className="nav-btn">💬 Poruke</button>
          <button onClick={() => router.push("/settings")} className="nav-btn">⚙️ Podešavanja</button>
        </nav>
      </aside>

      {/* DESNA STRANA */}
      <div className="profile-content">
        <div className="profile-card">
          <h2>Podaci o profilu</h2>

          <div className="profile-info">
            <label>Ime</label>
            <input name="first_name" value={client.first_name || ""} onChange={handleChange} disabled={!isEditing} />

            <label>Prezime</label>
            <input name="last_name" value={client.last_name || ""} onChange={handleChange} disabled={!isEditing} />

            <label>Email</label>
            <input name="email" value={client.email || ""} onChange={handleChange} disabled={!isEditing} />

            <label>Telefon</label>
            <input name="cell_phone" value={client.cell_phone || ""} onChange={handleChange} disabled={!isEditing} />

            <label>Grad</label>
            <select name="city" value={client.city || ""} onChange={handleChange} disabled={!isEditing}>
              <option value="">Izaberite grad</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c.replace(/_/g, " ")}</option>
              ))}
            </select>

            <label>Adresa</label>
            <input name="address" value={client.address || ""} onChange={handleChange} disabled={!isEditing} />

            <label>Poštansko sanduče</label>
            <input name="post_office_box" value={client.post_office_box || ""} onChange={handleChange} disabled={!isEditing} />

            <label>Poštanski broj</label>
            <input name="postal_code" value={client.postal_code || ""} onChange={handleChange} disabled={!isEditing} />

            <label>Tip Klijenta</label>
            <select name="client_type" value={client.client_type || ""} onChange={handleChange} disabled={!isEditing}>
              <option value="">Izaberite tip klijenta</option>
              {clientTypes.map((t) => (
                <option key={t} value={t}>{t.replace(/_/g, " ")}</option>
              ))}
            </select>
          </div>

          <div className="profile-buttons">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="save-btn">Sačuvaj</button>
                <button onClick={() => setIsEditing(false)} className="cancel-btn">Otkaži</button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="edit-btn">Izmeni profil</button>
            )}
          </div>

          {message && <p className="profile-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
