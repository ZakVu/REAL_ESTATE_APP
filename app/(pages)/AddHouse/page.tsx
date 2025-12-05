"use client";

import { useEffect, useState } from "react";
import api from "@/app/lib/api";
import { jwtDecode } from "jwt-decode";

import "../../styles/addHouse.css";

type Option = string;

const technicalEquipmentOptions: Option[] = [
  "telefon",
  "internet",
  "kablovska_tv",
  "opticka_mreza",
  "video_nadzor",
  "interfon",
  "alarmni_sistem",
  "protivpozarni_sistem",
];

const additionalEquipmentOptions: Option[] = [
  "garaza",
  "lift",
  "vrt",
  "garazno_mesto",
  "pristup_bez_barijera",
  "toplotna_izolacija",
  "spoljno_parking_mesto",
  "terasa",
  "bazen",
  "sigurnosni_uredjaji",
  "javni_parking",
  "balkon",
  "sauna",
  "lodja",
  "obezbedjenje",
  "garderoberi",
  "teretana",
  "staklena_basta",
  "vesernica",
  "recepcija",
  "ostava",
  "kamin",
  "igraliste",
  "podrum",
];

const categories = [
  "stanovi",
  "kuce",
  "sobe",
  "ostali tipovi prostora",
  "gradjevinska zemljista",
];

const subCategories = [
  "garsonjera",
  "jednosoban stan",
  "dvosoban stan",
  "trosoban stan",
  "cetvorosoban stan",
  "petosoban+ stan",
  "porodicna kuca",
  "kuce sa vise stanova",
  "montazne kuce",
  "duplex kuce",
];

const listingTypes = ["iznajmljivanje", "prodaja"];

const cities = ["beograd", "novi_sad", "nis", "kragujevac", "subotica"];

const heatingTypes = [
  "centralno grejanje",
  "ta pec",
  "klima uredjaj",
  "etazno grejanje na struju",
  "etazno grejanje na cvrsto gorivo",
  "etazno grejanje na gas",
  "podno grejanje",
];

const hotWaterTypes = [
  "toplana",
  "bojler",
  "kotao na gas",
  "kotao na struju",
  "grejanje na cvrsto gorivo",
];

const sewageSystems = [
  "javna kanalizacija",
  "septicka jama sa prelivnom jamom",
  "septicka jama bez prelivne jame",
  "bez odvodnog sistema",
];

const locatedOptions = [
  "centar",
  "vikend naselje",
  "periferija",
  "strogi centar grada",
  "zaseok",
  "stambeno naselje",
  "mirna lokacija",
];

const propertyConditions = [
  "izvorno stanje",
  "standardna gradnja",
  "novogradnja",
  "u pripremi",
  "u izgradnji",
  "zavrsena izgradnja",
  "delimicna rekonstrukcija",
];

const houseTypes = [
  "porodicna kuca",
  "kuce sa vise stanova",
  "montazne kuce",
  "duplex kuca",
];

const terrains = ["blaga kosina", "kosina", "ravno", "terasasto zemljiste", "drugo"];

const houseCategories = [
  "klasicna kuca",
  "porodicna vila",
  "bungalov",
  "drvena kuca",
  "viseporodicna kuca",
];

export default function AddHousePage() {
  const [form, setForm] = useState<any>({
    technical_equipment: [] as string[],
    additional_equipment: [] as string[],
    category: "",
    sub_category: "",
    title: "",
    price: "",
    description: "",
    location: "",
    city: "",
    address: "",
    listing_type: "",
    registered: false,
    owner: false,
    area: "",
    rooms: "",
    floor: "",
    heating_type: "",
    hot_water: "",
    sewage_system: "",
    located: "",
    additional_furnishing: "",
    total_number_of_rooms: "",
    is_feautured: false,
    property_condition: "",
    house_type: "",
    land_area_in_ares: "",
    terrain: "",
    house_category: "",
    yard_area: "",
    // client may be set from token if present
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [debugLog, setDebugLog] = useState<string[]>([]);

  // get client id from token (if token includes client or user id)
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const decoded: any = jwtDecode(token);
      console.log("Decoded JWT:", decoded);
      const cid = decoded.client_id || decoded.client || decoded.user_id || decoded.id;
      if (cid) {
        setForm((f: any) => ({ ...f, client: cid }));
        console.log("Auto-filled client id from token:", cid);
      }
    } catch (err) {
      console.warn("JWT decode failed:", err);
    }
  }, []);

  const logDebug = (msg: string) => {
    console.log(msg);
    setDebugLog((d) => [msg, ...d].slice(0, 200));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const name = target.name;
    const type = target.type;

    // checkbox groups for equipment (we keep them as arrays in state)
    if (type === "checkbox" && (name === "technical_equipment" || name === "additional_equipment")) {
      const val = target.value;
      setForm((prev: any) => {
        const arr = prev[name] || [];
        if (target.checked) {
          return { ...prev, [name]: [...arr, val] };
        } else {
          return { ...prev, [name]: arr.filter((v: string) => v !== val) };
        }
      });
      return;
    }

    // boolean checkboxes (registered, owner, is_feautured)
    if (type === "checkbox") {
      setForm((prev: any) => ({ ...prev, [name]: (target as HTMLInputElement).checked }));
      return;
    }

    // default
    setForm((prev: any) => ({ ...prev, [name]: target.value }));
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImages(files);
    previewUrls.forEach((u) => URL.revokeObjectURL(u));
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviewUrls(urls);
    logDebug(`Selected ${files.length} image(s)`);
  };

  const validateRequired = (): string[] => {
    const missing: string[] = [];
    const required = ["title", "price", "location", "area", "rooms", "floor", "listing_type"];
    required.forEach((k) => {
      if (!form[k]) missing.push(k);
    });
    return missing;
  };

  const buildAndLogFormData = (fd: FormData) => {
    logDebug("FormData contents (preview):");
    for (const pair of fd.entries()) {
      if (pair[1] instanceof File) {
        logDebug(`  ${pair[0]}: File -> ${(pair[1] as File).name}`);
      } else {
        logDebug(`  ${pair[0]}: ${String(pair[1])}`);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setDebugLog([]);
    logDebug("Submitting AddHouse form...");

    const missing = validateRequired();
    if (missing.length > 0) {
      const msg = `Nedostaju obavezna polja: ${missing.join(", ")}`;
      logDebug(msg);
      alert(msg);
      setSubmitting(false);
      return;
    }

    // validate price length before sending
    if (form.price) {
      const [intPart] = String(form.price).split(".");
      if (intPart.length > 8) {
        const msg = "Cijena ne može imati više od 8 cifara prije decimalne tačke.";
        logDebug(msg);
        alert(msg);
        setSubmitting(false);
        return;
      }
    }

    try {
      const fd = new FormData();

      // --- append common fields (as before) ---
      const commonFields = [
        "title",
        "price",
        "description",
        "location",
        "city",
        "address",
        "listing_type",
        "registered",
        "owner",
        "area",
        "rooms",
        "floor",
      ];
      logDebug("Appending common fields...");
      commonFields.forEach((k) => {
        const val = form[k];
        if (val !== undefined && val !== null && val !== "") {
          if (typeof val === "boolean") fd.append(k, val ? "true" : "false");
          else fd.append(k, String(val));
          logDebug(` appended ${k} = ${String(val)}`);
        }
      });

      // --- house-specific fields ---
      const houseFields = [
        "heating_type",
        "hot_water",
        "sewage_system",
        "located",
        "additional_furnishing",
        "total_number_of_rooms",
        "is_feautured",
        "property_condition",
        "house_type",
        "land_area_in_ares",
        "terrain",
        "house_category",
        "yard_area",
        "category",
        "sub_category",
      ];
      logDebug("Appending house-specific fields...");
      houseFields.forEach((k) => {
        const val = form[k];
        if (val !== undefined && val !== null && val !== "") {
          if (typeof val === "boolean") fd.append(k, val ? "true" : "false");
          else fd.append(k, String(val));
          logDebug(` appended ${k} = ${String(val)}`);
        }
      });

      // --- IMPORTANT: arrays must be appended as repeated fields (not JSON string) ---
      logDebug("Appending equipment arrays as repeated fields...");
      if (Array.isArray(form.technical_equipment) && form.technical_equipment.length) {
        form.technical_equipment.forEach((v: string) => {
          fd.append("technical_equipment", v);
          logDebug(` appended technical_equipment -> ${v}`);
        });
      }

      if (Array.isArray(form.additional_equipment) && form.additional_equipment.length) {
        form.additional_equipment.forEach((v: string) => {
          fd.append("additional_equipment", v);
          logDebug(` appended additional_equipment -> ${v}`);
        });
      }

      // client id (if present)
      if (form.client) {
        fd.append("client", String(form.client));
        logDebug(` appended client = ${String(form.client)}`);
      }

      // Append images
      if (images.length) {
        images.forEach((file, idx) => {
          fd.append("images", file, file.name);
          logDebug(` appended image file ${idx}: ${file.name}`);
        });
      }

      // preview what will be sent
      buildAndLogFormData(fd);

      logDebug("Posting to /houses/ ...");
      const res = await api.post("/houses/", fd, {
        headers: {
          // axios will set proper multipart boundary; leaving header is okay
          "Content-Type": "multipart/form-data",
        },
        timeout: 120000,
      });

      console.log("API Response:", res);
      logDebug(`Response status: ${res.status}`);
      logDebug(`Response data: ${JSON.stringify(res.data)}`);

      alert("Kuća uspješno dodata!");
      // reset form
      setForm({
        technical_equipment: [],
        additional_equipment: [],
        category: "",
        sub_category: "",
        title: "",
        price: "",
        description: "",
        location: "",
        city: "",
        address: "",
        listing_type: "",
        registered: false,
        owner: false,
        area: "",
        rooms: "",
        floor: "",
        heating_type: "",
        hot_water: "",
        sewage_system: "",
        located: "",
        additional_furnishing: "",
        total_number_of_rooms: "",
        is_feautured: false,
        property_condition: "",
        house_type: "",
        land_area_in_ares: "",
        terrain: "",
        house_category: "",
        yard_area: "",
      });
      setImages([]);
      previewUrls.forEach((u) => URL.revokeObjectURL(u));
      setPreviewUrls([]);
    } catch (err: any) {
      console.error("AddHouse POST error:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error response status:", err.response.status);
        console.error("Error response headers:", err.response.headers);
        logDebug(`Error response status: ${err.response.status}`);
        logDebug(`Error response data: ${JSON.stringify(err.response.data)}`);
      } else if (err.request) {
        console.error("No response received, request:", err.request);
        logDebug(`No response received, request present`);
      } else {
        console.error("Error building request:", err.message);
        logDebug(`Error building request: ${err.message}`);
      }
      alert("Greška pri slanju oglasa — pogledaj konzolu za detalje.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ah-container">
      <h1 className="ah-title">Dodaj kuću</h1>

      <form className="ah-form" onSubmit={handleSubmit}>
        <div className="ah-row">
          <label>Naslov *</label>
          <input name="title" value={form.title} onChange={handleInputChange} required />
        </div>

        <div className="ah-row">
          <label>Cijena (RSD) *</label>
          <input
            name="price"
            type="number"
            max="99999999"
            step="0.01"
            value={form.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="ah-row">
          <label>Kategorija</label>
          <select name="category" value={form.category} onChange={handleInputChange}>
            <option value="">(izaberi)</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="ah-row">
          <label>Podkategorija</label>
          <select name="sub_category" value={form.sub_category} onChange={handleInputChange}>
            <option value="">(izaberi)</option>
            {subCategories.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="ah-grid">
          <div>
            <label>Lokacija (location) *</label>
            <input name="location" value={form.location} onChange={handleInputChange} required />
          </div>

          <div>
            <label>Grad</label>
            <select name="city" value={form.city} onChange={handleInputChange}>
              <option value="">(izaberi)</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="ah-row">
          <label>Adresa</label>
          <input name="address" value={form.address} onChange={handleInputChange} />
        </div>

        <div className="ah-grid">
          <div>
            <label>Tip oglasa (iznajmljivanje/prodaja) *</label>
            <select name="listing_type" value={form.listing_type} onChange={handleInputChange} required>
              <option value="">(izaberi)</option>
              {listingTypes.map((lt) => (
                <option key={lt} value={lt}>
                  {lt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Kvadratura (m²) *</label>
            <input name="area" type="number" value={form.area} onChange={handleInputChange} required />
          </div>
        </div>

        <div className="ah-grid">
          <div>
            <label>Broj soba *</label>
            <input name="rooms" type="number" value={form.rooms} onChange={handleInputChange} required />
          </div>

          <div>
            <label>Sprat *</label>
            <input name="floor" type="number" value={form.floor} onChange={handleInputChange} required />
          </div>
        </div>

        <div className="ah-section">
          <h3>Oprema / dodatno</h3>

          <div className="ah-subsection">
            <label>Tehnička oprema (više izbora)</label>
            <div className="ah-checkbox-grid">
              {technicalEquipmentOptions.map((opt) => (
                <label key={opt} className="ah-check">
                  <input
                    type="checkbox"
                    name="technical_equipment"
                    value={opt}
                    checked={form.technical_equipment.includes(opt)}
                    onChange={handleInputChange}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="ah-subsection">
            <label>Dodatna oprema (više izbora)</label>
            <div className="ah-checkbox-grid">
              {additionalEquipmentOptions.map((opt) => (
                <label key={opt} className="ah-check">
                  <input
                    type="checkbox"
                    name="additional_equipment"
                    value={opt}
                    checked={form.additional_equipment.includes(opt)}
                    onChange={handleInputChange}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="ah-grid">
            <div>
              <label>Tip grijanja</label>
              <select name="heating_type" value={form.heating_type} onChange={handleInputChange}>
                <option value="">(izaberi)</option>
                {heatingTypes.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Topla voda</label>
              <select name="hot_water" value={form.hot_water} onChange={handleInputChange}>
                <option value="">(izaberi)</option>
                {hotWaterTypes.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="ah-grid">
            <div>
              <label>Sistem odvodnjavanja</label>
              <select name="sewage_system" value={form.sewage_system} onChange={handleInputChange}>
                <option value="">(izaberi)</option>
                {sewageSystems.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Lokacija unutar naselja</label>
              <select name="located" value={form.located} onChange={handleInputChange}>
                <option value="">(izaberi)</option>
                {locatedOptions.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="ah-grid">
            <div>
              <label>Stanje nekretnine</label>
              <select name="property_condition" value={form.property_condition} onChange={handleInputChange}>
                <option value="">(izaberi)</option>
                {propertyConditions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Tip kuće</label>
              <select name="house_type" value={form.house_type} onChange={handleInputChange}>
                <option value="">(izaberi)</option>
                {houseTypes.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="ah-grid">
            <div>
              <label>Površina zemljišta (ari)</label>
              <input
                name="land_area_in_ares"
                type="number"
                step="0.01"
                value={form.land_area_in_ares}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Površina dvorišta (m²)</label>
              <input name="yard_area" type="number" step="0.01" value={form.yard_area} onChange={handleInputChange} />
            </div>
          </div>

          <div className="ah-row">
            <label>Dodatno - napomena</label>
            <input name="additional_furnishing" value={form.additional_furnishing} onChange={handleInputChange} />
          </div>
        </div>

        <div className="ah-row">
          <label>Slike (više) — izaberi fajl(ove)</label>
          <input type="file" multiple accept="image/*" onChange={handleImagesChange} />
          {previewUrls.length > 0 && (
            <div className="ah-preview">
              {previewUrls.map((u, i) => (
                <img key={i} src={u} alt={`preview-${i}`} />
              ))}
            </div>
          )}
        </div>

        <div className="ah-row ah-actions">
          <button type="submit" className="ah-submit" disabled={submitting}>
            {submitting ? "Šalje se..." : "Dodaj kuću"}
          </button>
        </div>
      </form>

      <div className="ah-debug">
        <h4>Debug log (posljednjih poruka):</h4>
        <ul>
          {debugLog.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
