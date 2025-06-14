
import React from "react";

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
    description:
      "Custom web development solutions tailored to meet your business needs, ensuring seamless user experience and robust functionality.",
    price: 1500,
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    description:
      "Innovative mobile app solutions that enhance user engagement and streamline business operations on both iOS and Android platforms.",
    price: 2500,
  },
  {
    id: "seo-optimization",
    name: "SEO Optimization",
    description:
      "Boost your online presence with our expert SEO services, designed to improve search rankings and drive organic traffic to your website.",
    price: 600,
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    description:
      "Comprehensive digital marketing strategies that increase brand visibility and customer engagement across various online platforms.",
    price: 1200,
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    description:
      "Creative design services that capture your brand's essence and communicate your message clearly and effectively.",
    price: 700,
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    description:
      "Protect your business and customer data with our advanced cybersecurity solutions, ensuring peace of mind and operational integrity.",
    price: 900,
  },
  {
    id: "custom-software",
    name: "Custom Software Development",
    description:
      "Tailored software solutions designed to address your specific business challenges and streamline your operations.",
    price: 2000,
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    description:
      "User-centered design services that create intuitive, engaging interfaces to enhance user satisfaction and drive conversions.",
    price: 800,
  },
  {
    id: "software-testing",
    name: "Software & App Testing",
    description:
      "Comprehensive testing services to ensure your software and applications are bug-free, secure, and perform optimally across all platforms.",
    price: 600,
  },
  {
    id: "ecommerce",
    name: "E-commerce Solutions",
    description: "Online storefronts with payment integration.",
    price: 1800,
  },
];

interface ServiceQuoteGeneratorProps {
  selected: string[];
  onChange: (selected: string[]) => void;
  readOnly?: boolean; // If true, disables user selection
}

const ServiceQuoteGenerator: React.FC<ServiceQuoteGeneratorProps> = ({
  selected,
  onChange,
  readOnly = false,
}) => {
  const handleToggle = (serviceId: string) => {
    if (readOnly) return;
    onChange(
      selected.includes(serviceId)
        ? selected.filter((id) => id !== serviceId)
        : [...selected, serviceId]
    );
  };

  const selectedServices = SERVICES.filter((s) => selected.includes(s.id));
  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);

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
            className={`border rounded-lg p-4 flex gap-4 cursor-pointer transition shadow hover:border-askus-purple bg-white ${
              selected.includes(service.id)
                ? "border-askus-purple ring-2 ring-askus-purple"
                : "border-gray-200"
            } ${readOnly ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <input
              type="checkbox"
              checked={selected.includes(service.id)}
              onChange={() => handleToggle(service.id)}
              className="accent-askus-purple w-5 h-5 mt-1"
              disabled={readOnly}
            />
            <div>
              <div className="font-bold text-askus-dark">{service.name}</div>
              <div className="text-gray-500 text-sm mt-1">
                {service.description}
              </div>
              <div className="mt-2 font-semibold text-askus-purple">
                ₹{service.price.toLocaleString()}
              </div>
            </div>
          </label>
        ))}
      </div>
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 shadow-inner">
        <h3 className="text-lg font-bold text-askus-dark mb-2">
          <span role="img" aria-label="cart">
            🧾
          </span>{" "}
          Cart & Estimation
        </h3>
        {selectedServices.length === 0 ? (
          <div className="text-gray-500">No services selected.</div>
        ) : (
          <ul className="mb-2">
            {selectedServices.map((s) => (
              <li
                key={s.id}
                className="flex justify-between py-1 border-b last:border-b-0"
              >
                <span>{s.name}</span>
                <span className="text-askus-purple font-medium">
                  ₹{s.price.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 pt-2 border-t font-semibold flex justify-between">
          <span>Total Estimate:</span>
          <span className="text-askus-purple text-lg">
            ₹{total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServiceQuoteGenerator;
export { SERVICES };
