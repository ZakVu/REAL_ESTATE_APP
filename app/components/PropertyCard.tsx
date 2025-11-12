"use client";

import Link from "next/link";
import { Property } from "../types/property";
import Image from "next/image";
import { fillOffset } from "framer-motion";
import { p } from "framer-motion/client";
import "../styles/propertyCard.css";


const PropertyCard = ({property} : any) => {
    return ( 
        <Link href={`/property/${property.id}`} className="prop-card">
            <div className="prop-image">
                <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="prop-img"
                
                />
            </div>

            <div className="prop-body">
                <h3 className="prop-title">{property.title}</h3>
                <p className="prop-meta">
                    {property.location} . {property.size_m2 ? `${property.size_m2} m²` : ""}
                    {property.rooms ? ` . ${property.rooms} rooms` : ""}
                </p>
                <p className="prop-price">{property.price.toLocaleString("sr-RS")} RSD</p>
                <p className="prop-desc">{property.shortDescription}</p>

            </div>
        </Link>

     );
}
 
export default PropertyCard;