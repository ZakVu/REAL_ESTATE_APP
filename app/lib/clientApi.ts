// app/lib/clientApi.ts
import api from "./api";

// -----------------------------------------------------
// GET – Trenutni klijent
// -----------------------------------------------------
export async function getCurrentClient() {
  const res = await api.get("/clients/me/");
  return res.data;
}

// -----------------------------------------------------
// UPDATE – PATCH /clients/{id}/
// Swagger: multipart/form-data
// -----------------------------------------------------
export async function updateClient(id: number, client: any) {
  try {
    const formData = new FormData();

    // REQUIRED
    formData.append("first_name", client.first_name);
    formData.append("last_name", client.last_name);
    formData.append("email", client.email);

    // OPTIONAL
    if (client.cell_phone) formData.append("cell_phone", client.cell_phone);
    if (client.post_office_box) formData.append("post_office_box", client.post_office_box);
    if (client.address) formData.append("address", client.address);
    if (client.city) formData.append("city", client.city);
    if (client.postal_code) formData.append("postal_code", client.postal_code);
    if (client.client_type) formData.append("client_type", client.client_type);

    // IMAGE
    if (client.imageFile) {
      formData.append("image", client.imageFile);
    }

    // 🔍 DEBUG
    console.group("📤 UPDATE CLIENT PAYLOAD");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.groupEnd();

    const res = await api.patch(`/clients/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("✅ UPDATE CLIENT RESPONSE:", res.data);
    return res.data;

  } catch (err: any) {
    console.error("❌ API error in updateClient");
    console.error("STATUS:", err?.response?.status);
    console.error("DATA:", err?.response?.data);
    throw err;
  }
}
