import api from "./api";

export async function getChoices() {
    const res = await api.get("/choices/");
    return  res.data;
    
}