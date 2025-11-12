"use client";
import FiltersSidebar from "@/app/components/FiltersSidebar";
import type { Property } from "../../types/property";
import PropertyCard from "@/app/components/PropertyCard";
import "../../styles/propertiesList.css";
import AddSection from "@/app/components/AddSection";
import { MOCK_PROPERTIES } from "../../types/mockProperties";





const AllAd = () => {

  // za sada prikažemo sve mock-ove; kasnije umjesto MOCK_PROPERTIES doći će fetch()
  return (
    <main className="property-page container">
      <div className="props-grid">
        <aside className="props-sidebar">
          <FiltersSidebar />
          <div style={{ marginTop: "1.5rem" }}>
            <AddSection />

          </div>

        </aside>
        <section className="props-list">
          <h1>Svi Oglasi</h1>
          <p className="props-sub">Pregled svih aktivnih oglasa na sajtu</p>

          <div className="props-cards">
            {MOCK_PROPERTIES.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}

          </div>

        </section>

      </div>

    </main>
  );
}

export default AllAd;