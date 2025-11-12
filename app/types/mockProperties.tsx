// data/mockProperties.ts
import type { Property } from "@/app/types/property";

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "Stan 56m², dvosoban - Vračar",
    price: 9800000,
    size_m2: 56,
    rooms: 2,
    location: "Beograd, Vračar",
    type: "Stan",
    images: ["/stan1.png"],
    shortDescription: "Prostran dvosoban stan, blizu svih sadržaja.",
  },
  {
    id: "p2",
    title: "Kuća 120m² sa dvorištem",
    price: 18000000,
    size_m2: 120,
    rooms: 4,
    location: "Novi Sad, Telep",
    type: "Kuća",
    images: ["/kuca1.png"],
    shortDescription: "Porodična kuća sa lijepim dvorištem.",
  },
  {
    id: "p3",
    title: "Apartman za odmor - Zlatibor",
    price: 4500000,
    size_m2: 40,
    rooms: 1,
    location: "Zlatibor",
    type: "Apartman",
    images: ["/apartman1.png"],
    shortDescription: "Idealno za iznajmljivanje.",
  },
  {
    id: "p4",
    title: "Plac 10 ari - Niš",
    price: 3500000,
    location: "Niš",
    type: "Zemljište",
    images: ["/zemljiste1.png"],
    shortDescription: "Ravan plac pogodna lokacija.",
  },
  // dodaj još po potrebi...
];
