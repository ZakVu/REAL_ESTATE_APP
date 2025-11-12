"use client";
import { loginUser, loginWithFacebook, loginWithGoogle } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../../styles/login.css";
import { useAuth } from "@/app/context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const {login} = useAuth(); //koristim login iz autha zbog update stanja bez reloada

  // Funkcije za socijalnu prijavu
  const handleGoogleLogin = async () => {
    try {
      const data = {
        access_token: "token_koji_dobiješ_od_googlea",
        code: "kod_ako_ga_koristiš",
        id_token: "id_token_ako_ga_koristiš",
      };
      const response = await loginWithGoogle(data);
      console.log("Uspješna prijava:", response);
    } catch (error) {
      console.error("Greška prilikom Google prijave:", error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const data = {
        access_token: "token_koji_dobiješ_od_facebooka",
      };
      const response = await loginWithFacebook(data);
      console.log("Uspješna prijava:", response);
    } catch (error) {
      console.error("Greška prilikom Facebook prijave:", error);
    }
  };

  // Funkcija za submit forme
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const token = await loginUser(formData);
      login(token.access); // ažuriraj stanje autentifikacije
      router.push("/AllAd");
    } catch (err: any) {
      setError("Neispravni podaci za prijavu");
    }
  };

  // JSX koji se renderuje mora biti ovdje, a ne unutar handleSubmit
  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Prijava</h2>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Korisničko ime"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Lozinka"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <button className="login-btn" type="submit">
            Prijavi se
          </button>
        </form>

        {error && <p className="login-message">{error}</p>}

        <div className="login-socials">
          <button onClick={handleGoogleLogin} className="google-btn">
            Prijava putem Google naloga
          </button>
          <button onClick={handleFacebookLogin} className="facebook-btn">
            Prijava putem Facebook-a
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
