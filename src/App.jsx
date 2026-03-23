import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Category from "./pages/Category";
import Delivery from "./pages/Delivery";
import Deals from "./pages/Deals";
import Cart from "./pages/Cart";
import AccountPage from "./pages/AccountPage";
import Notifications from "./pages/Notifications";
import Footer from "./components/Footer";
import Payment from "./components/Payment";
import About from "./components/About";

/* ─── Initial notifications data ─────────────────────────────── */
const INIT_NOTIFS = [
  {
    id: 1, type: "delivery", read: false,
    title: "Order Shipped! 🚀",
    body: "Your MSI Katana 17 is on its way. Estimated arrival: Mar 12, 2025.",
    time: "2 min ago", icon: "🚚", color: "#3b82f6", bg: "#eff6ff",
  },
  {
    id: 2, type: "deal", read: false,
    title: "Flash Sale — 30% Off! ⚡",
    body: "MacBook Air M2 is now $999. Only 5 units left — grab yours now!",
    time: "1 hr ago", icon: "🏷️", color: "#ec4899", bg: "#fdf2f8",
  },
  {
    id: 3, type: "order", read: false,
    title: "Order Delivered ✅",
    body: "HP Victus 15 has been delivered. We hope you love it!",
    time: "3 hrs ago", icon: "📦", color: "#22c55e", bg: "#f0fdf4",
  },
  {
    id: 4, type: "info", read: true,
    title: "Profile Updated",
    body: "Your account information has been successfully updated.",
    time: "Yesterday", icon: "✏️", color: "#f59e0b", bg: "#fffbeb",
  },
  {
    id: 5, type: "deal", read: true,
    title: "New Arrivals This Week 🆕",
    body: "Check out 12 brand new gaming laptops just added to our store.",
    time: "2 days ago", icon: "🎮", color: "#a855f7", bg: "#faf5ff",
  },
  {
    id: 6, type: "delivery", read: true,
    title: "Order Confirmed 📦",
    body: "Your order LPT-2024-002 has been confirmed and is being processed.",
    time: "3 days ago", icon: "🚚", color: "#3b82f6", bg: "#eff6ff",
  },
];

/* ─── ✅ NEW: Protected Route — redirects to "/" if not logged in ── */
function ProtectedRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
  /* ─── Notifications state (lifted so Header badge stays in sync) ── */
  const [notifs, setNotifs] = useState(INIT_NOTIFS);
  const unreadCount = notifs.filter(n => !n.read).length;

  /* ─── Cart state ──────────────────────────────────────────────── */
  const [cartItems, setCartItems] = useState([]);
  const handleClearCart = () => setCartItems([]);

  /* ─── Liked items state ───────────────────────────────────────── */
  const [likedItems, setLikedItems] = useState([]);

  const user = { name: "Seng Chiev", tel: "0962371302" };

  const laptop = [
    { id: 1,  title: "MSI Katana 17 B13VEK",           price: 1200, description: "13th Gen Intel Core, RTX 4050, 144Hz FHD display.",                    rate: 4.5, image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png" },
    { id: 2,  title: "MSI Katana 15 B13VFK",           price: 1250, description: "Powerful gaming laptop with RTX 4060 and DDR5 RAM.",                   rate: 4.6, image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png" },
    { id: 3,  title: "ASUS ROG Strix G16",             price: 1500, description: "Intel i7 13th Gen, RTX 4060, 165Hz display.",                          rate: 4.7, image: "https://dlcdnwebimgs.asus.com/gain/E17607E8-B0AA-41B4-AFE2-8F30F0899C3E/w160" },
    { id: 4,  title: "ASUS TUF F15",                   price: 1100, description: "Military-grade durability, RTX 3050 gaming power.",                     rate: 4.4, image: "https://s.alicdn.com/@sc04/kf/H83de9484b58047e88a0200ca87c9b735D.png_300x300xzq80.jpg" },
    { id: 5,  title: "Acer Nitro 5",                   price: 999,  description: "Budget gaming laptop with RTX graphics.",                               rate: 4.3, image: "https://s.alicdn.com/@sc04/kf/Af00b51a5869c4b24b3c0af1a91932fc67.jpeg_300x300xzq80.jpg" },
    { id: 6,  title: "Acer Predator Helios 16",        price: 1650, description: "High-end gaming performance with RTX 4070.",                            rate: 4.8, image: "https://s.alicdn.com/@sc04/kf/A17b1c67d26694d9cbb65a003eefce87dt.jpg_300x300xzq80.jpg" },
    { id: 7,  title: "Lenovo Legion Pro 7i Gen 10 16", price: 1350, description: "Intel Core Ultra 9 275HX, RTX 5080 16GB, 32GB RAM, 1TB SSD.",          rate: 4.6, image: "https://m.media-amazon.com/images/I/515W50hwJmL._AC_UY327_FMwebp_QL65_.jpg" },
    { id: 8,  title: "Lenovo Legion Pro 7",            price: 1900, description: "16\" WQXGA OLED, 240Hz, RTX 5070 Ti, 32GB RAM, 2TB.",                  rate: 4.9, image: "https://m.media-amazon.com/images/I/81SKqogPgCL._AC_UY327_FMwebp_QL65_.jpg" },
    { id: 9,  title: "HP Omen 16",                     price: 1400, description: "Core Ultra 7, RTX 5060, 16GB DDR5, 165Hz IPS.",                        rate: 4.6, image: "https://m.media-amazon.com/images/I/61OiiHJjNbL._AC_UY327_FMwebp_QL65_.jpg" },
    { id: 10, title: "HP Victus 15",                   price: 950,  description: "15.6\" FHD 144Hz, RTX 4050, Ryzen 7, 16GB DDR5.",                      rate: 4.2, image: "https://m.media-amazon.com/images/I/71cIWAGn7LL._AC_UY327_FMwebp_QL65_.jpg" },
    { id: 11, title: "Dell G15 Gaming",                price: 1200, description: "Intel i7 + RTX 3060, 32GB DDR5, 2TB SSD.",                             rate: 4.4, image: "https://m.media-amazon.com/images/I/41zX9idNkeL._SL500_.jpg" },
    { id: 12, title: "Dell Alienware M16",             price: 2100, description: "16\" WQXGA, Intel Core 7, RTX 5060 8GB GDDR7.",                        rate: 4.9, image: "https://m.media-amazon.com/images/I/71LIpVe8h6L._AC_UY327_FMwebp_QL65_.jpg" },
    { id: 13, title: "ASUS V16 Gaming Laptop",         price: 2200, description: "16\" WUXGA 144Hz, Core 7 240H, RTX 5060, 16GB.",                       rate: 4.8, image: "https://m.media-amazon.com/images/I/71jUWgXKPvL._AC_SX679_.jpg" },
    { id: 14, title: "GIGABYTE Gaming A16",            price: 2500, description: "165Hz WUXGA, RTX 5060, i7-13620H, 1TB, 16GB DDR5.",                    rate: 5,   image: "https://m.media-amazon.com/images/I/81NkQcTxKDL._AC_SX679_.jpg" },
    { id: 15, title: "MacBook Pro M3",                 price: 2400, description: "Apple M3 chip for creators and developers.",                             rate: 4.9, image: "https://m.media-amazon.com/images/I/61dnax4xchL._AC_SX679_.jpg" },
    { id: 16, title: "MacBook Air M2",                 price: 1300, description: "Lightweight and powerful for everyday work.",                            rate: 4.8, image: "https://10bestbuddy.com/_next/image/?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F41oh6tjXAoL._SL500_.jpg&w=384&q=75" },
  ];

  /* ─── Cart handlers ───────────────────────────────────────────── */
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing && existing.qty > 1) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty - 1 } : i);
      }
      return prev.filter((i) => i.id !== product.id);
    });
  };

  const handleRemoveAllFromCart = (product) => {
    setCartItems((prev) => prev.filter((i) => i.id !== product.id));
  };

  /* ─── Like handler ────────────────────────────────────────────── */
  const handleClick = (id) => {
    setLikedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <BrowserRouter>
      {/* unreadCount auto-updates whenever notifs changes */}
      <Header user={user} cartCount={cartItems} unreadNotifCount={unreadCount} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              laptop={laptop}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              likedItems={likedItems}
              handleClick={handleClick}
            />
          }
        />
        <Route path="/category" element={<Category />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route
          path="/deals"
          element={
            <Deals
              handleAddToCart={handleAddToCart}
              cartItems={cartItems}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleRemoveAllFromCart={handleRemoveAllFromCart}
            />
          }
        />
        <Route path="/payment" element={<Payment onClearCart={handleClearCart} />} />
        <Route path="/about_us" element={<About />} />

        {/*  CHANGED: wrapped with ProtectedRoute */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountPage
                likedItems={likedItems}
                laptops={laptop}
                onUnlike={handleClick}
              />
            </ProtectedRoute>
          }
        />

        {/* Pass notifs + setNotifs so the bell badge syncs with the page */}
        <Route
          path="/notifications"
          element={<Notifications notifs={notifs} setNotifs={setNotifs} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
