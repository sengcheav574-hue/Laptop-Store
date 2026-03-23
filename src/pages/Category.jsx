import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Gaming Laptops",
    icon: "🎮",
    count: 48,
    brands: ["MSI", "ASUS ROG", "Acer Predator", "Lenovo Legion"],
    bg: "from-pink-100 to-rose-100",
    filterBrand: "All",
    filterTag: "gaming",
  },
  {
    id: 2,
    name: "Business Laptops",
    icon: "💼",
    count: 32,
    brands: ["Dell", "HP", "Lenovo ThinkPad", "MacBook"],
    bg: "from-pink-50 to-pink-100",
    filterBrand: "Dell",
    filterTag: "business",
  },
  {
    id: 3,
    name: "Student Laptops",
    icon: "🎓",
    count: 27,
    brands: ["Acer", "ASUS", "HP Victus", "Lenovo IdeaPad"],
    bg: "from-rose-50 to-pink-100",
    filterBrand: "Acer",
    filterTag: "student",
  },
  {
    id: 4,
    name: "MacBooks",
    icon: <FaApple />,
    count: 12,
    brands: ["MacBook Air", "MacBook Pro", "M1", "M2", "M3"],
    bg: "from-pink-100 to-fuchsia-100",
    filterBrand: "Apple",
    filterTag: "macbook",
  },
  {
    id: 5,
    name: "Ultrabooks",
    icon: "⚡",
    count: 21,
    brands: ["Dell XPS", "LG Gram", "Samsung Galaxy Book", "HP Spectre"],
    bg: "from-fuchsia-50 to-pink-100",
    filterBrand: "Dell",
    filterTag: "ultrabook",
  },
  {
    id: 6,
    name: "2-in-1 Convertibles",
    icon: "🔄",
    count: 15,
    brands: ["Microsoft Surface", "HP Envy", "Lenovo Yoga", "ASUS ZenBook"],
    bg: "from-pink-100 to-rose-50",
    filterBrand: "Lenovo",
    filterTag: "convertible",
  },
  {
    id: 7,
    name: "Workstations",
    icon: "🖥️",
    count: 9,
    brands: ["Dell Precision", "HP ZBook", "Lenovo ThinkPad P", "MacBook Pro M3"],
    bg: "from-rose-100 to-pink-50",
    filterBrand: "Dell",
    filterTag: "workstation",
  },
  {
    id: 8,
    name: "Budget Picks",
    icon: "💰",
    count: 36,
    brands: ["Acer Aspire", "HP 15s", "Lenovo IdeaPad", "ASUS VivoBook"],
    bg: "from-pink-50 to-fuchsia-50",
    filterBrand: "All",
    filterPrice: "Under $500",
    filterTag: "budget",
  },
];

const brands = ["All", "MSI", "ASUS", "Acer", "Lenovo", "Dell", "HP", "Apple"];
const priceRanges = ["All", "Under $500", "$500–$1000", "$1000–$1500", "Above $1500"];

export default function Category() {
  const [activeBrand, setActiveBrand] = useState("All");
  const [activePrice, setActivePrice] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleExplore = (cat) => {
    const params = new URLSearchParams();
    if (cat.filterBrand && cat.filterBrand !== "All") {
      params.set("brand", cat.filterBrand);
    }
    if (cat.filterPrice) {
      params.set("price", cat.filterPrice);
    }
    if (cat.filterTag) {
      params.set("search", cat.filterTag);
    }
    params.set("searched", "true");
    navigate(`/?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* Hero */}
      <div className="bg-gradient-to-r from-pink-200 via-pink-100 to-fuchsia-100 py-14 px-[10%]">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Browse by Category</h1>
        <p className="text-gray-500 text-lg">Find the perfect laptop for your needs</p>
        <div className="mt-6 relative max-w-md">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-white border border-pink-200 rounded-full px-5 py-3 pr-12 outline-none shadow-sm focus:border-pink-400 text-gray-700"
          />
          <span className="absolute right-5 top-4 font-bold text-lg"><CiSearch /></span>
        </div>
      </div>

      <div className="px-[10%] py-10">
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-8 mb-8">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Brand</p>
            <div className="flex flex-wrap gap-2">
              {brands.map(b => (
                <button
                  key={b}
                  onClick={() => setActiveBrand(b)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                    activeBrand === b
                      ? "bg-pink-400 text-white border-pink-400 shadow"
                      : "bg-white text-gray-600 border-pink-200 hover:border-pink-400"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Price Range</p>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map(p => (
                <button
                  key={p}
                  onClick={() => setActivePrice(p)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                    activePrice === p
                      ? "bg-pink-400 text-white border-pink-400 shadow"
                      : "bg-white text-gray-600 border-pink-200 hover:border-pink-400"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((cat) => (
            <div
              key={cat.id}
              className={`bg-gradient-to-br ${cat.bg} rounded-2xl p-6 border border-pink-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group`}
              onClick={() => handleExplore(cat)}
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
              <h3 className="text-lg font-extrabold text-gray-800">{cat.name}</h3>
              <p className="text-pink-500 text-sm font-semibold mt-1">{cat.count} Products</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {cat.brands.slice(0, 3).map(b => (
                  <span key={b} className="bg-white/70 text-gray-600 text-xs px-2 py-0.5 rounded-full border border-pink-100">{b}</span>
                ))}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); handleExplore(cat); }}
                className="mt-4 text-pink-500 text-sm font-bold hover:text-pink-700 transition-colors"
              >
                Explore →
              </button>
            </div>
          ))}
        </div>

        {/* Popular Tags */}
        <div className="mt-12">
          <h2 className="text-xl font-extrabold text-gray-800 mb-4">Popular Tags</h2>
          <div className="flex flex-wrap gap-3">
            {["RTX 4060", "Intel i7", "16GB RAM", "144Hz", "1TB SSD", "OLED", "Lightweight", "4K Display", "Long Battery", "Backlit KB"].map(tag => (
              <span
                key={tag}
                onClick={() => navigate(`/?search=${tag}&searched=true`)}
                className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-pink-200 cursor-pointer transition-colors border border-pink-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
