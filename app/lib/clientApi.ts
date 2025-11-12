import api from "./api";


//GET dohvati podatke o klijentu po ID-u
export async function getCurrentClient() {
    const res = await api.get("/clients/me/");
    return res.data;
}

// POST - Kreiraj novog klijenta
export async function createClient(data: any) {
    const res = await api.post("/clients/${id}/", data);
    return res.data;
}

// PUT - Ažuriraj klijenta (svi podaci)
export async function updateClient(id: number, clientData: any) {
  try {
    const payload = {
      user: {
        username: clientData.user?.username || clientData.username || "",
        email: clientData.user?.email || clientData.email || "",
      },
      first_name: clientData.first_name,
      last_name: clientData.last_name,
      cell_phone: clientData.cell_phone,
      email: clientData.email,
      post_office_box: clientData.post_office_box,
      address: clientData.address || "",
      city: clientData.city,
      postal_code: clientData.postal_code,
      client_type: clientData.client_type,
    };

    const response = await api.patch(`/clients/${id}/`, payload);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating client data:", error);
    throw error;
  }
}
// PATCH - Djelimično ažuriranje klijenta
export async function patchClient(id: number, data: any) {
    const res = await api.patch(`/clients/${id}/`, data);
    return res.data;
}

// DELETE - Briši klijenta
export async function deleteClient(id: number) {
    const res = await api.delete(`/clients/${id}/`);
    return res.status === 204;
}

//upload slike 
export async function uploadProfilrImage(clientId: number, formData: FormData) {
    const res = await api.put(`/clients/${clientId}/upload_image/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
}

