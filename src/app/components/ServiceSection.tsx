import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, ChevronDown, Search, X, ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";
import { Service, getServiceCategories } from "../data/services";

function ServiceIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = (Icons as any)[name] || Icons.Pill;
  return <Icon size={size} />;
}

// Map categories to representative icons
const categoryIcons: Record<string, string> = {
  "Vaccinations": "Syringe",
  "Medication Support": "Pill",
  "Consultations": "Stethoscope",
  "Health Checks": "Activity",
  "Lifestyle": "HeartPulse",
  "Sexual Health": "ShieldPlus",
  "Specialist": "Settings",
  "Travel Health": "Plane",
  "Private Vaccinations": "Syringe",
  "Weight Management": "Scale",
  "Hair Loss": "User",
  "Skin & Dermatology": "Sparkles",
  "Ear Health": "Ear",
  "Diagnostic & Testing": "TestTube",
  "Lifestyle Treatments": "Pill",
  "Aesthetic & Cosmetic": "Sparkles",
};

function ServiceCard({ service, isNHS }: { service: Service; isNHS: boolean }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/book/${service.id}`)}
      className="group bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-brand-primary/20 transition-all cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isNHS ? "bg-brand-primary/10 text-brand-primary" : "bg-brand-secondary/10 text-brand-secondary"}`}>
          <ServiceIcon name={service.icon} size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-[0.9rem] text-gray-900 group-hover:text-brand-primary transition-colors truncate" style={{ fontWeight: 600 }}>{service.name}</h4>
            <ChevronRight size={16} className="text-gray-400 group-hover:text-brand-primary shrink-0 transition-colors" />
          </div>
          <p className="text-[0.78rem] text-gray-500 mt-0.5 line-clamp-2">{service.description}</p>
          {service.price && (
            <span className="inline-block mt-1.5 text-[0.75rem] text-brand-secondary bg-brand-secondary/8 px-2 py-0.5 rounded-full" style={{ fontWeight: 500 }}>
              {service.price?.replace(/From (\d)/, "From £$1")}
            </span>
          )}
          {isNHS && (
            <span className="inline-block mt-1.5 text-[0.75rem] text-brand-primary bg-brand-primary/8 px-2 py-0.5 rounded-full" style={{ fontWeight: 500 }}>
              Free (NHS)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryCard({
  category,
  count,
  accentColor,
  onClick,
}: {
  category: string;
  count: number;
  accentColor: string;
  onClick: () => void;
}) {
  const iconName = categoryIcons[category] || "Pill";
  return (
    <button
      onClick={onClick}
      className="group bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-brand-primary/20 transition-all cursor-pointer text-left w-full"
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 7%, transparent)`, color: accentColor }}
        >
          <ServiceIcon name={iconName} size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[0.95rem] text-gray-900 group-hover:text-brand-primary transition-colors" style={{ fontWeight: 600 }}>
            {category}
          </h4>
          <p className="text-[0.8rem] text-gray-400 mt-0.5">
            {count} {count === 1 ? "service" : "services"} available
          </p>
        </div>
        <ArrowRight size={18} className="text-gray-300 group-hover:text-brand-primary transition-colors shrink-0" />
      </div>
    </button>
  );
}

export function ServiceSection({
  id,
  title,
  subtitle,
  badge,
  services,
  isNHS,
  accentColor,
}: {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  services: Service[];
  isNHS: boolean;
  accentColor: string;
}) {
  const categories = getServiceCategories(services);
  const [expanded, setExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // When expanded, filter by active category and search
  const filtered = services.filter((s) => {
    const matchCat = !activeCategory || s.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setExpanded(true);
    setSearchQuery("");
  };

  const handleBack = () => {
    setExpanded(false);
    setActiveCategory(null);
    setSearchQuery("");
  };

  const handleViewAll = () => {
    setActiveCategory(null);
    setExpanded(true);
    setSearchQuery("");
  };

  return (
    <section id={id} className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-8">
          <span
            className="inline-block text-[0.8rem] px-3 py-1 rounded-full mb-3"
            style={{ fontWeight: 600, backgroundColor: `color-mix(in srgb, ${accentColor} 8%, transparent)`, color: accentColor }}
          >
            {badge}
          </span>
          <h2 className="text-[1.7rem] md:text-[2rem] text-gray-900 mb-2" style={{ fontWeight: 700 }}>
            {title}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {!expanded ? (
          /* ── COLLAPSED: Category cards ── */
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((cat) => {
                const count = services.filter((s) => s.category === cat).length;
                return (
                  <CategoryCard
                    key={cat}
                    category={cat}
                    count={count}
                    accentColor={accentColor}
                    onClick={() => handleCategoryClick(cat)}
                  />
                );
              })}
            </div>
            <div className="text-center mt-6">
              <button
                onClick={handleViewAll}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 text-[0.9rem] transition-colors cursor-pointer hover:bg-gray-50"
                style={{ borderColor: accentColor, color: accentColor, fontWeight: 600 }}
              >
                View All {services.length} Services
                <ChevronDown size={16} />
              </button>
            </div>
          </>
        ) : (
          /* ── EXPANDED: Full service list ── */
          <>
            {/* Toolbar: back + search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-5">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 text-[0.85rem] text-gray-500 hover:text-gray-700 transition-colors cursor-pointer shrink-0"
                style={{ fontWeight: 500 }}
              >
                <X size={16} />
                Back to categories
              </button>
              <div className="relative flex-1 max-w-sm w-full">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={`Search ${isNHS ? "NHS" : "private"} services...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 text-[0.85rem] focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary/50"
                />
              </div>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3.5 py-1.5 rounded-full text-[0.8rem] transition-colors cursor-pointer ${
                  !activeCategory ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={!activeCategory ? { backgroundColor: accentColor, fontWeight: 600 } : { fontWeight: 500 }}
              >
                All ({services.length})
              </button>
              {categories.map((cat) => {
                const count = services.filter((s) => s.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-[0.8rem] transition-colors cursor-pointer ${
                      activeCategory === cat ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    style={activeCategory === cat ? { backgroundColor: accentColor, fontWeight: 600 } : { fontWeight: 500 }}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Service grid */}
            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map((service) => (
                  <ServiceCard key={service.id} service={service} isNHS={isNHS} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-12">
                No services found matching &ldquo;{searchQuery}&rdquo;
              </p>
            )}

            {/* Collapse button at bottom */}
            <div className="text-center mt-8">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-[0.85rem] text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                style={{ fontWeight: 500 }}
              >
                Collapse services
                <ChevronDown size={16} className="rotate-180" />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}