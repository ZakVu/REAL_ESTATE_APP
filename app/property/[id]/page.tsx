"use client";

import { useParams } from "next/navigation";
import { MOCK_PROPERTIES } from "@/app/types/mockProperties";
import "../../styles/propertyDetails.css";

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const property = MOCK_PROPERTIES.find((p) => p.id === id);

  if (!property) {
    return <p>Oglas nije pronađen.</p>;
  }

  return (
    <div className="property-details-container">
      <div className="property-images">
        {property.images.map((img, index) => (
          <img key={index} src={img} alt={property.title} className="preview-img" />
        ))}
      </div>

      <div className="property-info-section">
        <h1>{property.title}</h1>
        <p className="price">{property.price.toLocaleString()} RSD</p>
        <p><strong>Lokacija:</strong> {property.location}</p>
        <p><strong>Tip:</strong> {property.type}</p>
        {property.size_m2 && <p><strong>Površina:</strong> {property.size_m2} m²</p>}
        {property.rooms && <p><strong>Sobe:</strong> {property.rooms}</p>}
        <p className="desc">{property.shortDescription}</p>

        <div className="actions">
          <button className="call-btn">Pozovi</button>
          <button className="msg-btn">Poruka</button>
        </div>
      </div>
    </div>
  );
}
