"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentClient,
  updateClient,
  uploadProfilrImage,
} from "@/app/lib/clientApi";

import "../../styles/profile.css";
import { FaBars, FaTimes } from "react-icons/fa";
import Loading from "@/app/components/Loading";

const cities = [
  "aleksinac","alibunar","arandjelovac","asanja","badanj","badovinci","bajina_basta",
  "banja_koviljaca","beograd","novi_sad","nis","kragujevac","subotica"
];

const clientTypes = [
  "fizicko_lice", "agencija", "investitor", "banka", "drugo pravno lice"
];

export default function ProfilePage() {
  const [client, setClient] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();

  // LOAD CLIENT
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await getCurrentClient();
        setClient(data);
      } catch (err) {
        console.error("Greška pri učitavanju klijenta:", err);
      }
    };

    fetchClient();
  }, []);

  // -------------------- HANDLERS --------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // email mora i u user.email
    if (name === "email") {
      setClient({
        ...client,
        email: value,
        user: { ...client.user, email: value },
      });
      return;
    }

    setClient({ ...client, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setClient({ ...client, imageFile: file });
  };

  const handleSave = async () => {
    try {
      if (!client) return;

      // 1️⃣ UPLOAD SLIKE AKO POSTOJI
      if (client.imageFile) {
        const formData = new FormData();
        formData.append("image", client.imageFile);

        const updated = await uploadProfilrImage(client.id, formData);
        client.image = updated.image; // url iz backend-a
      }

      // 2️⃣ UPDATE PODATAKA
      const payload = {
        user: {
          username: client.user.username,
          email: client.user.email,
        },
        first_name: client.first_name,
        last_name: client.last_name,
        cell_phone: client.cell_phone,
        email: client.email,
        post_office_box: client.post_office_box,
        address: client.address,
        postal_code: client.postal_code,
        city: client.city,
        client_type: client.client_type,
        image: client.image,
      };

      await updateClient(client.id, payload);

      setMessage("Podaci su uspješno ažurirani!");
      setIsEditing(false);
      setTimeout(() => setMessage(""), 3000);

    } catch (err) {
      console.error("❌ Greška pri čuvanju:", err);
      setMessage("Greška pri ažuriranju.");
    }
  };

  // -------------------- UI --------------------

  if (!client) return <Loading />;

  return (
    <div className="profile-wrapper">
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </div>

      {/* ASIDE */}
      <aside className={`profile-sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img
            src={preview || client.image || "/default-avatar.png"}
            alt="Profil"
            className="sidebar-avatar"
          />
          <h3>{client.first_name} {client.last_name}</h3>
        </div>

        <nav className="profile-nav">
          <button onClick={() => router.push("/SelectCategory")} className="nav-btn active">➕ Novi oglas</button>
          <button onClick={() => router.push("/my-listings")} className="nav-btn">📦 Moji oglasi</button>
          <button onClick={() => router.push("/saved-listings")} className="nav-btn">💚 Spašeni</button>
          <button onClick={() => router.push("/messages")} className="nav-btn">💬 Poruke</button>
          <button onClick={() => router.push("/settings")} className="nav-btn">⚙ Podešavanja</button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="profile-content">
        <div className="profile-card">
          <h2>Profil</h2>

          <div className="profile-info">
            
            {/* fields... sve isto kao kod tebe */}
            <label>Ime</label>
            <input
              name="first_name"
              value={client.first_name || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <label>Prezime</label>
            <input
              name="last_name"
              value={client.last_name || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <label>Email</label>
            <input
              name="email"
              value={client.email || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <label>Telefon</label>
            <input
              name="cell_phone"
              value={client.cell_phone || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <label>Grad</label>
            <select
              name="city"
              value={client.city || ""}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="">Izaberite grad</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c.replace(/_/g, " ")}
                </option>
              ))}
            </select>

            <label>Adresa</label>
            <input
              name="address"
              value={client.address || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <label>Poštansko sanduče</label>
            <input
              name="post_office_box"
              value={client.post_office_box || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <label>Poštanski broj</label>
            <input
              name="postal_code"
              value={client.postal_code || ""}
              onChange={handleChange}
              disabled={!isEditing}
            />

            <label>Tip klijenta</label>
            <select
              name="client_type"
              value={client.client_type || ""}
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value="">Izaberite tip</option>
              {clientTypes.map((t) => (
                <option key={t} value={t}>{t.replace(/_/g, " ")}</option>
              ))}
            </select>

            {isEditing && (
              <>
                <label>Profilna slika</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </>
            )}
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
}
