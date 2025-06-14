
import React, { useState } from "react";

type Service = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const SERVICES: Service[] = [
  {
    id: "web-development",
    name: "Web Development",
    description: "Professional websites tailored to your business.",
    price: 1500,
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    description: "iOS & Android apps for brand presence anywhere.",
    price: 2500,
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    description: "Modern, user-friendly interfaces for digital products.",
    price: 800,
  },
  {
    id: "ecommerce",
    name: "E-commerce Solutions",
    description: "Online storefronts with payment integration.",
    price: 1800,
  },
  {
    id: "seo",
    name: "SEO Optimization",
    description: "Boost your Google ranking and visibility.",
    price: 600,
  },
  {
    id: "branding",
    name: "Branding & Logo",
    description: "Professional logos & cohesive brand assets.",
    price: 400,
  },
  {
    id: "maintenance",
    name: "Website Maintenance",
    description: "Ongoing updates, backups & support.",
    price: 250,
  },
];

const ServiceQuoteGenerator = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const selected = SERVICES.filter((s) => selectedServices.includes(s.id));
  const total = selected.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="mb-12">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-askus-purple flex items-center gap-2">
        🛒 Auto Quote Generator
      </h2>
      <p className="text-gray-700 mb-6">
        Select the IT services you need, and get an instant quote summary below.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {SERVICES.map((service) => (
          <label
            key={service.id}
            className={`border rounded-lg p-4 flex gap-4 cursor-pointer transition shadow hover:border-askus-purple bg-white ${selectedServices.includes(service.id) ? "border-askus-purple ring-2 ring-askus-purple" : "border-gray-200"}`}
          >
            <input
              type="checkbox"
              checked={selectedServices.includes(service.id)}
              onChange={() => handleToggle(service.id)}
              className="accent-askus-purple w-5 h-5 mt-1"
            />
            <div>
              <div className="font-bold text-askus-dark">{service.name}</div>
              <div className="text-gray-500 text-sm mt-1">{service.description}</div>
              <div className="mt-2 font-semibold text-askus-purple">
                ₹{service.price.toLocaleString()}
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 shadow-inner">
        <h3 className="text-lg font-bold text-askus-dark mb-2">
          <span role="img" aria-label="cart">🧾</span> Cart & Estimation
        </h3>
        {selected.length === 0 ? (
          <div className="text-gray-500">No services selected.</div>
        ) : (
          <ul className="mb-2">
            {selected.map((s) => (
              <li key={s.id} className="flex justify-between py-1 border-b last:border-b-0">
                <span>{s.name}</span>
                <span className="text-askus-purple font-medium">₹{s.price.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 pt-2 border-t font-semibold flex justify-between">
          <span>Total Estimate:</span>
          <span className="text-askus-purple text-lg">₹{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceQuoteGenerator;
