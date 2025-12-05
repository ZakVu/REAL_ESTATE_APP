"use client";

import { label } from "framer-motion/client";
import { useRouter } from "next/navigation";
import "../../styles/categorySelect.css"


const categories = [
    {
        id: "house",
        label: "Kuća",
        icon: "/icons/house.png",
        path: "/AddHouse ",
    },
    {
    id: "flat",
    label: "Stan",
    icon: "/icons/flat.png",
    path: "/addflat",
  },
  {
    id: "apartment",
    label: "Apartman",
    icon: "/icons/apartment.png",
    path: "/addapartment",
  },
  {
    id: "office",
    label: "Poslovni prostor",
    icon: "/icons/office.png",
    path: "/addoffice",
  },
  {
    id: "land",
    label: "Zemljište",
    icon: "/icons/land.png",
    path: "/addland",
  },
];


const SelectCategory = () => {

    const router = useRouter();

    const handleSelect = (path: string) => {
        router.push(path);
    };


    return ( 
        <div className="select-category-container">
            <h2>Izaberite tip nekretnine</h2>
            <div className="categories-grid">
                {categories.map((cat) => (
                    <div 
                    key={cat.id}
                    className="category-card"
                    onClick={() => handleSelect(cat.path)}>
                        <img src={cat.icon} alt={cat.label} className="category-icon" />
                        <p>{cat.label}</p>

                    </div>
                ))}

            </div>

        </div>
     );
}
 
export default SelectCategory;