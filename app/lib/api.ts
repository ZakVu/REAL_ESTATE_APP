import axios from "axios";

// Kreiramo axios instancu
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://217.17.110.54:8008/api",
  headers: {
    
    "Content-Type": "application/json",
  },
});

// 🔹 Pre svakog requesta automatski dodaj access token ako postoji
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 🔹 Ako istekne access token, pokušaj automatski refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Ako je token istekao i nije već pokušan refresh
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh_token");
        if (!refresh) {
          console.warn("Nema refresh tokena. Potrebna je ponovna prijava.");
          return Promise.reject(error);
        }

        // Pokušaj refresh tokena
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || "http://217.17.110.54:8008/api"}/token/refresh/`,
          { refresh }
        );

        const newAccess = res.data.access;
        localStorage.setItem("access_token", newAccess);

        // Postavi novi token u header
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccess}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

        // Ponovi originalni zahtev
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Greška pri osvežavanju tokena:", refreshError);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
