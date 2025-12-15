"use client";

import api from "@/app/lib/api";
import { useEffect, useState } from "react";
import "../../styles/addHouse.css";


/* ---------------- TYPES ---------------- */

type Choices = Record<string, Record<string, string>>;
type Value = string | string[];
type FormState = Record<string, Value>;

/* ---------------- FIELD CONFIG ---------------- */

const FIELD_CONFIG: Record<
  string,
  { type: "select" | "radio" | "checkbox"; label: string }
> = {
  drzave: { type: "select", label: "Država" },
  gradovi: { type: "select", label: "Grad" },
  kategorija: { type: "select", label: "Kategorija" },
  pod_kategorija: { type: "select", label: "Podkategorija" },

  rent_choices: { type: "radio", label: "Tip oglasa" },
  klijent: { type: "radio", label: "Tip klijenta" },

  dodatna_opremljenost: { type: "checkbox", label: "Dodatna opremljenost" },
  sigurnosna_oprema: { type: "checkbox", label: "Sigurnosna oprema" },
  tehnicka_opremljenost: { type: "checkbox", label: "Tehnička opremljenost" },
  gradski_prevoz: { type: "checkbox", label: "Gradski prevoz" },
};

/* ---------------- PAGE ---------------- */

export default function AddPropertyPage() {
  const [choices, setChoices] = useState<Choices>({});
  const [form, setForm] = useState<FormState>({});

  useEffect(() => {
    api.get("/choices/").then((res) => {
      setChoices(res.data);

      const initial: FormState = {};
      Object.entries(res.data).forEach(([key]) => {
        initial[key] = FIELD_CONFIG[key]?.type === "checkbox" ? [] : "";
      });
      setForm(initial);
    });
  }, []);

  const setValue = (key: string, value: Value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleCheckbox = (group: string, value: string) => {
    const current = (form[group] as string[]) || [];
    setValue(
      group,
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("PAYLOAD:", form);
    // api.post("/properties/", form);
  };

  return (
    <form className="add-property-form" onSubmit={handleSubmit}>
      <h1 className="form-title">Dodaj oglas</h1>

      {Object.entries(choices).map(([key, options]) => {
        const config = FIELD_CONFIG[key];
        if (!config) return null;

        return (
          <section key={key} className="form-section">
            <h2 className="section-title">{config.label}</h2>

            {/* SELECT */}
            {config.type === "select" && (
              <select
                className="form-select"
                value={form[key] as string}
                onChange={(e) => setValue(key, e.target.value)}
              >
                <option value="">Izaberi</option>
                {Object.entries(options).map(([v, t]) => (
                  <option key={v} value={v}>
                    {t}
                  </option>
                ))}
              </select>
            )}

            {/* RADIO */}
            {config.type === "radio" && (
              <div className="radio-grid">
                {Object.entries(options).map(([v, t]) => (
                  <label key={v} className="radio-item">
                    <input
                      type="radio"
                      checked={form[key] === v}
                      onChange={() => setValue(key, v)}
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            )}

            {/* CHECKBOX */}
            {config.type === "checkbox" && (
              <div className="checkbox-grid">
                {Object.entries(options).map(([v, t]) => (
                  <label key={v} className="checkbox-item">
                    <input
                      type="checkbox"
                      checked={(form[key] as string[])?.includes(v)}
                      onChange={() => toggleCheckbox(key, v)}
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            )}
          </section>
        );
      })}

      <button type="submit" className="submit-btn">
        Sačuvaj oglas
      </button>
    </form>
  );
}
