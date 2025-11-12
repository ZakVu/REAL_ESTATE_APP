"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import "../../styles/register.css";
import { registerUser } from "@/app/lib/auth";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(formData);
      router.push("/Login");
    } catch (err: any) {
      if(err.response && err.response.data){
        setError(JSON.stringify(err.response.data));
      }else{
     
      setError("Greška pri registraciji. Provjeri podatke.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Registracija</h1>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Korisničko ime"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Lozinka"
            value={formData.password1}
            onChange={(e) =>
              setFormData({ ...formData, password1: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Ponovi lozinku"
            value={formData.password2}
            onChange={(e) =>
              setFormData({ ...formData, password2: e.target.value })
            }
            required
          />

          <button type="submit">Registruj se</button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}
