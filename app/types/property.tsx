export type Property = {
    id: string;
  title: string;
  price: number;
  size_m2?: number;
  rooms?: number;
  location: string;
  type: "Kuća" | "Stan" | "Apartman" | "Zemljište" | string;
  images: string[]; // putanje u public/
  shortDescription?: string;
};