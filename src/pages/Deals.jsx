import { useState, useEffect } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaApple } from "react-icons/fa";
const deals = [
  {
    id: 1,
    title: "MSI Katana 17 B13VEK",
    original: 1500,
    sale: 1200,
    discount: 20,
    badge: "🔥 Hot Deal",
    tag: "Gaming",
    image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png",
    rating: 4.5,
    reviews: 312,
    stock: 8,
  },
  {
    id: 2,
    title: "ASUS ROG Strix G16",
    original: 1900,
    sale: 1500,
    discount: 21,
    badge: "⚡ Flash Sale",
    tag: "Gaming",
    image: "https://dlcdnwebimgs.asus.com/gain/E17607E8-B0AA-41B4-AFE2-8F30F0899C3E/w160",
    rating: 4.7,
    reviews: 198,
    stock: 3,
  },
  {
    id: 3,
    title: "MacBook Air M2",
    original: 1599,
    sale: 1300,
    discount: 19,
    badge: <><FaApple /> Apple Deal</>,
    tag: "MacBook",
    image: "https://10bestbuddy.com/_next/image/?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F41oh6tjXAoL._SL500_.jpg&w=384&q=75",
    rating: 4.8,
    reviews: 540,
    stock: 15,
  },
  {
    id: 4,
    title: "HP Victus 15",
    original: 1200,
    sale: 950,
    discount: 21,
    badge: "💰 Best Value",
    tag: "Budget",
    image: "https://m.media-amazon.com/images/I/71cIWAGn7LL._AC_UY327_FMwebp_QL65_.jpg",
    rating: 4.2,
    reviews: 287,
    stock: 20,
  },
  {
    id: 5,
    title: "Lenovo Legion Pro 7",
    original: 2300,
    sale: 1900,
    discount: 17,
    badge: "🎮 Gamer Pick",
    tag: "Gaming",
    image: "https://m.media-amazon.com/images/I/81SKqogPgCL._AC_UY327_FMwebp_QL65_.jpg",
    rating: 4.9,
    reviews: 423,
    stock: 5,
  },
  {
    id: 6,
    title: "Dell Alienware M16",
    original: 2600,
    sale: 2100,
    discount: 19,
    badge: "👾 Limited",
    tag: "Gaming",
    image: "https://m.media-amazon.com/images/I/71LIpVe8h6L._AC_UY327_FMwebp_QL65_.jpg",
    rating: 4.9,
    reviews: 211,
    stock: 2,
  },
];

const tags = ["All", "Gaming", "MacBook", "Budget", "Ultrabook"];

function Countdown() {
  const [time, setTime] = useState({ h: 5, m: 42, s: 17 });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const pad = n => String(n).padStart(2, "0");
  return (
    <div className="flex gap-3 items-center">
      {[{ label: "HRS", val: time.h }, { label: "MIN", val: time.m }, { label: "SEC", val: time.s }].map((t, i) => (
        <div key={i} className="text-center">
          <div className="bg-white/20 backdrop-blur text-white font-extrabold text-2xl w-14 h-14 flex items-center justify-center rounded-xl border border-white/30">
            {pad(t.val)}
          </div>
          <p className="text-white/70 text-xs mt-1 font-semibold">{t.label}</p>
        </div>
      ))}
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={`text-xs ${s <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"}`}>★</span>
      ))}
    </div>
  );
}

export default function Deals({ handleAddToCart, cartItems = [] }) {
  const [activeTag, setActiveTag] = useState("All");
  const [addedId, setAddedId] = useState(null);
  const navigate = useNavigate();

  const filtered = activeTag === "All" ? deals : deals.filter(d => d.tag === activeTag);

  const totalCartCount = cartItems.reduce((sum, i) => sum + (i.qty || 1), 0);

  const handleAdd = (deal) => {
    handleAddToCart({ ...deal, price: deal.sale });
    setAddedId(deal.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const getQtyInCart = (id) => {
    const item = cartItems.find(i => i.id === id);
    return item ? item.qty : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-pink-400 via-pink-300 to-fuchsia-300 py-14 px-[10%] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-72 h-72 rounded-full bg-white -top-20 -right-20"></div>
          <div className="absolute w-48 h-48 rounded-full bg-white bottom-0 left-1/3"></div>
        </div>
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 mb-3 inline-block">⚡ FLASH SALE</span>
            <h1 className="text-5xl font-extrabold text-white leading-tight">Today's <br />Best Deals</h1>
            <p className="text-white/80 mt-2 text-lg">Up to 25% off on premium laptops</p>
          </div>
          <div>
            <p className="text-white/70 text-sm font-semibold mb-3 uppercase tracking-wider">Sale Ends In</p>
            <Countdown />
          </div>
        </div>
      </div>

      <div className="px-[10%] py-10">
        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: "🏷️", val: "25%", label: "Max Discount" },
            { icon: "📦", val: `${deals.length}+`, label: "Products on Sale" },
            { icon: "⏰", val: "Today Only", label: "Limited Time" },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-pink-100">
              <div className="text-3xl mb-1">{s.icon}</div>
              <p className="text-2xl font-extrabold text-gray-800">{s.val}</p>
              <p className="text-gray-400 text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tags.map(t => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`px-5 py-2 rounded-full font-bold text-sm border transition-all ${
                activeTag === t
                  ? "bg-pink-400 text-white border-pink-400 shadow"
                  : "bg-white text-gray-600 border-pink-200 hover:border-pink-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(deal => {
            const qtyInCart = getQtyInCart(deal.id);
            const justAdded = addedId === deal.id;

            return (
              <div key={deal.id} className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all group">
                {/* Image */}
                <div className="relative bg-pink-50 flex items-center justify-center h-44">
                  <span className="absolute top-3 left-3 bg-pink-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                    -{deal.discount}%
                  </span>
                  <span className="absolute flex justify-center items-center gap-2 z-100 top-3 right-3 bg-white text-xs font-bold px-3 py-1 rounded-full border border-pink-100 shadow-sm">
                    {deal.badge}
                  </span>
                  <img src={deal.image} alt={deal.title} className="h-36 object-contain group-hover:scale-105 transition-transform" />
                </div>

                <div className="p-5">
                  <span className="bg-pink-100 text-pink-500 text-xs font-bold px-2 py-0.5 rounded-full">{deal.tag}</span>
                  <h3 className="font-extrabold text-gray-800 mt-2 text-sm leading-snug">{deal.title}</h3>

                  <div className="flex items-center gap-2 mt-2">
                    <StarRating rating={deal.rating} />
                    <span className="text-gray-400 text-xs">({deal.reviews})</span>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-2xl font-extrabold text-gray-900">${deal.sale}</span>
                    <span className="text-gray-400 line-through text-sm">${deal.original}</span>
                    <span className="text-green-500 text-xs font-bold">Save ${deal.original - deal.sale}</span>
                  </div>

                  {deal.stock <= 5 && (
                    <p className="text-red-400 text-xs font-semibold mt-1">⚠️ Only {deal.stock} left in stock!</p>
                  )}

                  {/* qty badge */}
                  {qtyInCart > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="bg-green-100 text-green-600 text-xs font-bold px-2.5 py-1 rounded-full">
                        ✓ {qtyInCart} in cart
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => handleAdd(deal)}
                    className={`mt-4 flex justify-center gap-2 w-full font-bold py-2.5 rounded-xl transition-all text-sm ${
                      justAdded
                        ? "bg-green-400 text-white scale-95"
                        : "bg-pink-400 hover:bg-pink-500 text-white"
                    }`}
                  >
                    <MdOutlineShoppingCart className="text-xl" />
                    {justAdded ? "Added! ✓" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Newsletter */}
        <div className="mt-16 bg-gradient-to-r from-pink-200 via-fuchsia-100 to-pink-200 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Never Miss a Deal!</h2>
          <p className="text-gray-500 mb-6">Subscribe and get exclusive offers delivered to your inbox</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              placeholder="Enter your email..."
              className="flex-1 bg-white border border-pink-200 rounded-full px-5 py-3 outline-none focus:border-pink-400 text-sm"
            />
            <button className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Floating Cart Toast */}
      {totalCartCount > 0 && (
        <button
          onClick={() => navigate("/cart")}
          className="fixed bottom-6 right-6 bg-pink-400 hover:bg-pink-500 text-white px-5 py-3 rounded-2xl shadow-lg font-bold text-sm flex items-center gap-2 transition-all hover:scale-105 z-50"
        >
          🛒 {totalCartCount} item{totalCartCount > 1 ? "s" : ""} in cart →
        </button>
      )}
    </div>
  );
}
