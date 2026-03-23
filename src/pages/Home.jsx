import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import { CiSearch } from "react-icons/ci";
import { useLocation } from "react-router-dom";

const brands = ["All", "MSI", "ASUS", "Acer", "Lenovo", "Dell", "HP", "Apple"];
const priceRanges = ["All", "Under $500", "$500–$1000", "$1000–$1500", "Above $1500"];

function getPriceRange(price) {
  if (price < 500) return "Under $500";
  if (price <= 1000) return "$500–$1000";
  if (price <= 1500) return "$1000–$1500";
  return "Above $1500";
}

function getBrand(title) {
  if (title.toLowerCase().includes("msi")) return "MSI";
  if (title.toLowerCase().includes("asus")) return "ASUS";
  if (title.toLowerCase().includes("acer")) return "Acer";
  if (title.toLowerCase().includes("lenovo")) return "Lenovo";
  if (title.toLowerCase().includes("dell") || title.toLowerCase().includes("alienware")) return "Dell";
  if (title.toLowerCase().includes("hp") || title.toLowerCase().includes("omen") || title.toLowerCase().includes("victus")) return "HP";
  if (title.toLowerCase().includes("macbook") || title.toLowerCase().includes("apple")) return "Apple";
  return "Other";
}

function Home({
  laptop,
  handleAddToCart,
  handleRemoveFromCart,
  likedItems,
  handleClick,
}) {
  const location = useLocation();

  const [activeBrand, setActiveBrand] = useState("All");
  const [activePrice, setActivePrice] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  // Read URL params when navigating from Category page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const brand = params.get("brand") || "All";
    const price = params.get("price") || "All";
    const search = params.get("search") || "";
    const searched = params.get("searched") === "true";
    if (searched) {
      setActiveBrand(brand);
      setActivePrice(price);
      setSearchInput(search);
      setSearchQuery(search);
      setHasSearched(true);
    }
  }, [location.search]);

  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
    setHasSearched(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleBrandClick = (b) => {
    setActiveBrand(b);
    setHasSearched(true);
  };

  const handlePriceClick = (p) => {
    setActivePrice(p);
    setHasSearched(true);
  };

  const handleClear = () => {
    setSearchInput("");
    setSearchQuery("");
    setActiveBrand("All");
    setActivePrice("All");
    setHasSearched(false);
  };

  const filtered = laptop.filter((item) => {
    const brandMatch = activeBrand === "All" || getBrand(item.title) === activeBrand;
    const priceMatch = activePrice === "All" || getPriceRange(item.price) === activePrice;
    const searchMatch = searchQuery === "" || item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && priceMatch && searchMatch;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <Hero handleAddToCart={handleAddToCart} />

      <div className="w-full lg:px-[10%] px-5 py-8">
        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 mb-8">

          {/* Search Bar */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <CiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 text-xl" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search laptops by name..."
                className="w-full pl-11 pr-4 py-3 rounded-full border border-pink-200 outline-none focus:border-pink-400 text-sm text-gray-700 bg-pink-50 placeholder-gray-400"
              />
            </div>
            <button
              onClick={handleSearch}
              className="flex items-center gap-2 bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-sm hover:shadow-md"
            >
              <CiSearch className="text-lg" />
              Search
            </button>
            {(searchQuery || activeBrand !== "All" || activePrice !== "All") && (
              <button
                onClick={handleClear}
                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-500 px-5 py-3 rounded-full font-semibold text-sm transition-all"
              >
                ✕ Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-8">
            {/* Brand Filter */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Brand</p>
              <div className="flex flex-wrap gap-2">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => handleBrandClick(b)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                      activeBrand === b
                        ? "bg-pink-400 text-white border-pink-400 shadow"
                        : "bg-white text-gray-600 border-pink-200 hover:border-pink-400 hover:text-pink-500"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">Price Range</p>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePriceClick(p)}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                      activePrice === p
                        ? "bg-pink-400 text-white border-pink-400 shadow"
                        : "bg-white text-gray-600 border-pink-200 hover:border-pink-400 hover:text-pink-500"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        {hasSearched && (
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-extrabold text-gray-800">Product List</h3>
              <p className="text-pink-500 text-sm font-semibold mt-0.5">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} found
                {searchQuery ? ` for "${searchQuery}"` : ""}
                {activeBrand !== "All" ? ` · ${activeBrand}` : ""}
                {activePrice !== "All" ? ` · ${activePrice}` : ""}
              </p>
            </div>
            <button
              onClick={handleClear}
              className="text-pink-400 font-semibold text-sm hover:text-pink-600 transition-colors"
            >
              ✕ Clear all
            </button>
          </div>
        )}

        {/* Before Search — Prompt */}
        {!hasSearched && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h4 className="text-xl font-bold text-gray-700 mb-2">Find your perfect laptop</h4>
            <p className="text-gray-400 mb-6">Search by name, or pick a brand and price range above</p>
            <button
              onClick={handleSearch}
              className="bg-pink-400 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-pink-500 transition-colors shadow-sm"
            >
              Show All Products
            </button>
          </div>
        )}

        {/* No Results */}
        {hasSearched && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h4 className="text-xl font-bold text-gray-700 mb-2">No laptops found</h4>
            <p className="text-gray-400 mb-6">Try a different search or filter.</p>
            <button
              onClick={handleClear}
              className="bg-pink-400 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-pink-500 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Product Grid */}
        {hasSearched && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-pink-100 shadow-sm hover:shadow-md hover:-translate-y-1 transform duration-300 rounded-2xl overflow-hidden"
              >
                <div className="h-48 w-full mt-3 overflow-hidden relative">
                  <div
                    onClick={() => handleClick(item.id)}
                    className="absolute top-2 right-3 z-10 text-2xl cursor-pointer transition-transform hover:scale-125"
                  >
                    {likedItems.includes(item.id) ? "❤️" : "🤍"}
                  </div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain transition-transform hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  {/* Brand tag */}
                  <span className="bg-pink-100 text-pink-500 text-xs font-bold px-2 py-0.5 rounded-full">
                    {getBrand(item.title)}
                  </span>
                  <p className="font-extrabold text-gray-800 mt-2 text-sm leading-snug line-clamp-2">{item.title}</p>
                  <p className="font-bold text-pink-500 text-lg mt-1">
                    ${item.price}
                  </p>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2">{item.description}</p>
                  <p className="text-sm font-bold mt-1 cursor-pointer">⭐ {item.rate}</p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-pink-400 hover:bg-pink-500 text-white py-2 rounded-xl text-sm font-bold transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="flex-1 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-500 py-2 rounded-xl text-sm font-bold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
