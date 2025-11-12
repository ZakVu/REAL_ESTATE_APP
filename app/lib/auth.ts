// src/lib/auth.ts  (ili app/lib/auth.ts - kako već imaš)
import api from "./api"; // koristi jedinstvenu axios instancu


export async function registerUser(data: {
  username: string;
  email: string;
  password1: string;
  password2: string;
}) {
  // Swagger ti je pokazao "/auth/registration/" kao endpoint
  const res = await api.post("/auth/register/", data);
  return res.data;
}

export async function loginUser(data: {
  username: string;
  password: string;
}) {
  // backend developer ti je rekao: POST /token/ vraća { access, refresh }
  const res = await api.post("/auth/token/", data);
  const tokens = res.data;

  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
    // postavi default header u api instanci
    api.defaults.headers.common["Authorization"] = `Bearer ${tokens.access}`;
  }

  return tokens;
}

export async function refreshToken() {
  const refresh = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;
  if (!refresh) return null;

  const res = await api.post("auth/token/refresh/", { refresh });
  const newAccess = res.data.access;

  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", newAccess);
    api.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
  }

  return newAccess;
}

export async function loginWithGoogle(data: { access_token?: string; code?: string; id_token?: string; }) {
  const res = await api.post("/auth/google/", data);
  return res.data;
}

export async function loginWithFacebook(data: { access_token?: string; code?: string; id_token?: string; }) {
  const res = await api.post("/auth/facebook/", data);
  return res.data;
}

export function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    delete api.defaults.headers.common["Authorization"];
  }
}


export function getClientIdFromToken(): number | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64); // dekodira base64
    const payload = JSON.parse(payloadJson);
    return payload.client_id ?? payload.user_id ?? null;
  } catch (err) {
    console.error("Neuspjelo dekodiranje tokena", err);
    return null;
  }
}