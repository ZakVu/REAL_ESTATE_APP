import api from "./api";

// -----------------------------------------------------
// GET – Trenutni klijent (ulogovani)
// -----------------------------------------------------
export async function getCurrentClient() {
    const res = await api.get("/clients/me/");
    return res.data;
}

// -----------------------------------------------------
// CREATE – Kreiranje novog klijenta (ako uopšte treba)
// -----------------------------------------------------
export async function createClient(data: any) {
    const res = await api.post("/clients/", data);
    return res.data;
}

// -----------------------------------------------------
// UPDATE – Ažuriranje klijenta (PATCH je ispravan izbor)
// -----------------------------------------------------
export async function updateClient(id: number, clientData: any) {
    try {
        const payload = {
            user: {
                username: clientData.user?.username || "",
                email: clientData.user?.email || clientData.email || "",
            },
            first_name: clientData.first_name || "",
            last_name: clientData.last_name || "",
            cell_phone: clientData.cell_phone || "",
            email: clientData.email,
            post_office_box: clientData.post_office_box || "",
            address: clientData.address || "",
            city: clientData.city || "",
            postal_code: clientData.postal_code || "",
            client_type: clientData.client_type || "",
        };

        const res = await api.patch(`/clients/${id}/`, payload);
        return res.data;
    } catch (err) {
        console.error("❌ API error in updateClient:", err);
        throw err;
    }
}

// -----------------------------------------------------
// PARTIAL UPDATE
// -----------------------------------------------------
export async function patchClient(id: number, data: any) {
    const res = await api.patch(`/clients/${id}/`, data);
    return res.data;
}

// -----------------------------------------------------
// DELETE
// -----------------------------------------------------
export async function deleteClient(id: number) {
    const res = await api.delete(`/clients/${id}/`);
    return res.status === 204;
}

// -----------------------------------------------------
// UPLOAD IMAGE (ISPRAVLJENO)
// -----------------------------------------------------
export async function uploadProfilrImage(clientId: number, formData: FormData) {
    try {
        const res = await api.post(
            `/clients/${clientId}/image/`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return res.data;
    } catch (error) {
        console.error("❌ Error uploading profile image:", error);
        throw error;
    }
}
