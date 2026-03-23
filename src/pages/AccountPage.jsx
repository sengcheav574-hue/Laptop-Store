import { useState, useEffect } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { LuInbox } from "react-icons/lu";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { LuTrash2 } from "react-icons/lu";
import { LogoutButton } from "../components/AuthButtons";
import { useNavigate } from "react-router-dom";

const user = {
  name: "Jeo Nal",
  email: "jeonel@gmail.com",
  phone: "0962371302",
  profile: "https://i.pinimg.com/736x/ed/8a/0f/ed8a0f170d419078175d503b12ceef00.jpg",
  joined: "January 2024",
  reviews: 8,
};

// Demo/fallback orders shown before any real purchase
const DEMO_ORDERS = [
  {
    id: "LPT-2024-001",
    items: [{ title: "MSI Katana 17", price: 1200, qty: 1, image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png" }],
    total: 1200,
    status: 3,
    statusLabel: "Delivered",
    eta: "Mar 1, 2025",
    date: "Mar 1, 2025",
    isDemo: true,
  },
  {
    id: "LPT-2024-002",
    items: [{ title: "MacBook Air M2", price: 1300, qty: 1, image: "https://10bestbuddy.com/_next/image/?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F41oh6tjXAoL._SL500_.jpg&w=384&q=75" }],
    total: 1300,
    status: 2,
    statusLabel: "Shipped",
    eta: "Mar 3, 2025",
    date: "Mar 3, 2025",
    isDemo: true,
  },
  {
    id: "LPT-2024-003",
    items: [{ title: "HP Victus 15", price: 950, qty: 1, image: "https://m.media-amazon.com/images/I/71cIWAGn7LL._AC_UY327_FMwebp_QL65_.jpg" }],
    total: 950,
    status: 1,
    statusLabel: "Processing",
    eta: "Mar 5, 2025",
    date: "Mar 5, 2025",
    isDemo: true,
  },
];

const statusColor = {
  Delivered:  "bg-green-100 text-green-600",
  Shipped:    "bg-blue-100 text-blue-600",
  Processing: "bg-yellow-100 text-yellow-600",
  Cancelled:  "bg-red-100 text-red-500",
};

const statusFromStep = (status) => {
  if (status >= 4) return "Delivered";
  if (status >= 3) return "Shipped";
  if (status >= 2) return "Shipped";
  if (status >= 1) return "Processing";
  return "Processing";
};

const tabs = ["Profile", "My Orders", "Wishlist", "Settings"];

// ─── Settings Tab ──────────────────────────────────────────────────────────────
function SettingsTab() {
  const [toggles, setToggles] = useState({
    emailNotif: true,
    smsAlerts: false,
    darkMode: false,
    twoFactor: true,
  });

  const settings = [
    { label: "Email Notifications", desc: "Receive order updates via email",  key: "emailNotif" },
    { label: "SMS Alerts",          desc: "Get delivery updates via SMS",       key: "smsAlerts" },
    { label: "Dark Mode",           desc: "Switch to dark theme",               key: "darkMode" },
    { label: "Two-Factor Auth",     desc: "Extra security for your account",    key: "twoFactor" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6">
      <h2 className="text-xl font-extrabold text-gray-800 mb-6">Settings</h2>
      <div className="flex flex-col gap-4">
        {settings.map((s) => (
          <div key={s.key} className="flex items-center justify-between bg-pink-50 rounded-xl px-5 py-4 border border-pink-100">
            <div>
              <p className="font-bold text-gray-800 text-sm">{s.label}</p>
              <p className="text-gray-400 text-xs mt-0.5">{s.desc}</p>
            </div>
            <button
              onClick={() => setToggles((p) => ({ ...p, [s.key]: !p[s.key] }))}
              className={`w-12 h-6 rounded-full transition-colors relative ${toggles[s.key] ? "bg-pink-400" : "bg-gray-200"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${toggles[s.key] ? "left-6" : "left-0.5"}`} />
            </button>
          </div>
        ))}
        <button className="mt-2 flex justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-500 font-bold py-3 rounded-xl transition-colors border border-red-100">
          <LuTrash2 className="text-xl" /> Delete Account
        </button>
      </div>
    </div>
  );
}

// ─── Logout Modal ──────────────────────────────────────────────────────────────
function LogoutModal({ onConfirm, onCancel, loading }) {
  return (
    <>
      <style>{`
        @keyframes modalIn { from{opacity:0;transform:scale(0.88) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes backdropIn { from{opacity:0} to{opacity:1} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .modal-backdrop { animation: backdropIn 0.2s ease forwards; }
        .modal-card     { animation: modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .spinner        { animation: spin 0.7s linear infinite; }
      `}</style>
      <div className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center"
        style={{ background:"rgba(0,0,0,0.4)", backdropFilter:"blur(6px)" }} onClick={onCancel}>
        <div className="modal-card bg-white rounded-3xl shadow-2xl p-8 w-[340px] flex flex-col items-center gap-5 border border-pink-100"
          onClick={e => e.stopPropagation()}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
            style={{ background:"linear-gradient(135deg,#fee2e2,#fecaca)" }}>👋</div>
          <div className="text-center">
            <h2 className="text-xl font-extrabold text-gray-800">Leaving so soon?</h2>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              You'll be signed out of <span className="font-semibold text-pink-400">{user.name}</span>'s account.<br />You can log back in anytime.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <button onClick={onConfirm} disabled={loading}
              className="w-full py-3 rounded-2xl font-extrabold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-70"
              style={{ background:"linear-gradient(135deg,#f87171,#ef4444)", boxShadow:"0 4px 18px rgba(239,68,68,0.4)" }}>
              {loading ? (<><span className="spinner w-4 h-4 rounded-full border-2 border-white border-t-transparent" />Signing out…</>) : "Yes, Logout"}
            </button>
            <button onClick={onCancel} disabled={loading}
              className="w-full py-3 rounded-2xl font-bold text-gray-500 text-sm bg-gray-50 hover:bg-pink-50 hover:text-pink-500 border border-gray-100 hover:border-pink-200 transition-all duration-200 disabled:opacity-50">
              Stay Logged In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main AccountPage ──────────────────────────────────────────────────────────
export default function AccountPage({ likedItems = [], laptops = [], onUnlike }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]         = useState("Profile");
  const [editing, setEditing]             = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut]       = useState(false);
  const [form, setForm]                   = useState({ name: user.name, email: user.email, phone: user.phone });
  const [allOrders, setAllOrders]         = useState([]);

  // Load real orders from sessionStorage, merged with demo orders
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("orders") || "[]");
    // Real orders first, then demo orders
    setAllOrders(stored.length > 0 ? [...stored, ...DEMO_ORDERS] : DEMO_ORDERS);
  }, []);

  // Re-read whenever "My Orders" tab is opened (catches new purchases)
  useEffect(() => {
    if (activeTab === "My Orders") {
      const stored = JSON.parse(sessionStorage.getItem("orders") || "[]");
      setAllOrders(stored.length > 0 ? [...stored, ...DEMO_ORDERS] : DEMO_ORDERS);
    }
  }, [activeTab]);

  const wishlistItems = laptops.filter(l => likedItems.includes(l.id));

  const handleLogoutConfirm = () => {
    setLoggingOut(true);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    setTimeout(() => { navigate("/"); window.location.reload(); }, 900);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">

      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogoutConfirm}
          onCancel={() => !loggingOut && setShowLogoutModal(false)}
          loading={loggingOut}
        />
      )}

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-pink-200 via-pink-100 to-fuchsia-100 py-10 px-[10%]">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img src={user.profile} alt={user.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">{user.name}</h1>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <p className="text-pink-400 text-xs font-semibold mt-0.5">Member since {user.joined}</p>
          </div>
          <div className="ml-auto gap-6 text-center hidden md:flex">
            {[
              { val: allOrders.length, label: "Orders" },
              { val: wishlistItems.length, label: "Wishlist" },
              { val: user.reviews, label: "Reviews" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-2xl font-extrabold text-gray-800">{s.val}</p>
                <p className="text-gray-400 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-[10%] py-8 flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <div className="lg:w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 w-full text-left px-5 py-3.5 text-sm font-bold border-b border-pink-50 transition-colors ${
                  activeTab === tab ? "bg-pink-400 text-white" : "text-gray-600 hover:bg-pink-50"
                }`}>
                {tab === "Profile"   && <CgProfile className="text-lg" />}
                {tab === "My Orders" && <LuInbox className="text-lg" />}
                {tab === "Wishlist"  && <IoMdHeartEmpty className="text-lg" />}
                {tab === "Settings"  && <IoSettingsOutline className="text-lg" />}
                {tab}
                {tab === "My Orders" && allOrders.filter(o => !o.isDemo).length > 0 && (
                  <span className={`ml-auto text-xs font-extrabold px-2 py-0.5 rounded-full ${
                    activeTab === "My Orders" ? "bg-white text-pink-400" : "bg-pink-100 text-pink-500"
                  }`}>
                    {allOrders.filter(o => !o.isDemo).length} new
                  </span>
                )}
                {tab === "Wishlist" && wishlistItems.length > 0 && (
                  <span className={`ml-auto text-xs font-extrabold px-2 py-0.5 rounded-full ${
                    activeTab === "Wishlist" ? "bg-white text-pink-400" : "bg-pink-100 text-pink-500"
                  }`}>
                    {wishlistItems.length}
                  </span>
                )}
              </button>
            ))}
            <div className="px-3 py-3 border-t border-pink-50">
              <LogoutButton onClick={() => setShowLogoutModal(true)} className="w-full justify-center" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">

          {/* PROFILE */}
          {activeTab === "Profile" && (
            <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold text-gray-800">Profile Information</h2>
                <button onClick={() => setEditing(!editing)}
                  className="flex gap-1.5 bg-pink-100 hover:bg-pink-200 text-pink-500 font-bold px-4 py-1.5 rounded-full text-sm transition-colors">
                  <FaPenToSquare className="text-lg" />
                  {editing ? "Cancel" : "Edit"}
                </button>
              </div>
              <div className="flex flex-col gap-4">
                {[{ label:"Full Name", key:"name" }, { label:"Email", key:"email" }, { label:"Phone", key:"phone" }].map(field => (
                  <div key={field.key}>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{field.label}</label>
                    {editing ? (
                      <input value={form[field.key]} onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        className="mt-1 w-full border border-pink-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-400 text-gray-700" />
                    ) : (
                      <p className="mt-1 bg-pink-50 rounded-xl px-4 py-2.5 text-sm text-gray-700 font-semibold">{form[field.key]}</p>
                    )}
                  </div>
                ))}
                {editing && (
                  <button onClick={() => setEditing(false)}
                    className="mt-2 bg-pink-400 hover:bg-pink-500 text-white font-extrabold py-3 rounded-xl transition-colors">
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          )}

          {/* MY ORDERS */}
          {activeTab === "My Orders" && (
            <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-extrabold text-gray-800">My Orders</h2>
                <span className="text-xs font-bold text-gray-400 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                  {allOrders.length} total
                </span>
              </div>

              {allOrders.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">📦</div>
                  <p className="text-gray-500 font-semibold">No orders yet.</p>
                  <p className="text-gray-400 text-sm mt-1">Your purchases will appear here after checkout.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {allOrders.map((order) => {
                    // Support both real orders (with items[]) and demo orders
                    const firstItem = order.items?.[0];
                    const displayImg = firstItem?.image;
                    const displayName = order.items?.length === 1
                      ? firstItem?.title
                      : `${firstItem?.title?.split(" ").slice(0,3).join(" ")} +${order.items.length - 1} more`;
                    const displayTotal = order.total;
                    const statusLabel = order.statusLabel || statusFromStep(order.status);
                    const displayDate = order.date ||
                      (order.placedAt ? new Date(order.placedAt).toLocaleDateString("en-US", { month:"short", day:"numeric", year:"numeric" }) : "");
                    const isNew = !order.isDemo;

                    return (
                      <div key={order.id}
                        className={`flex items-center gap-4 rounded-xl p-4 border transition-all hover:border-pink-300 ${
                          isNew ? "bg-gradient-to-r from-pink-50 to-fuchsia-50 border-pink-200" : "bg-pink-50 border-pink-100"
                        }`}>

                        {/* Image(s) */}
                        <div className="relative w-16 h-16 flex-shrink-0">
                          {displayImg ? (
                            <img src={displayImg} alt={displayName}
                              className="w-16 h-16 object-contain bg-white rounded-lg p-1 border border-pink-100" />
                          ) : (
                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl border border-pink-100">📦</div>
                          )}
                          {isNew && (
                            <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full leading-none">
                              NEW
                            </span>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-extrabold text-gray-800 text-sm">{displayName}</p>
                          </div>
                          <p className="text-gray-400 text-xs mt-0.5">Order #{order.id} · {displayDate}</p>

                          {/* Multi-item breakdown */}
                          {order.items?.length > 1 && (
                            <div className="flex gap-1.5 mt-1.5 flex-wrap">
                              {order.items.map((it, i) => (
                                <span key={i} className="text-xs bg-white border border-pink-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold">
                                  {it.title.split(" ").slice(0,2).join(" ")} ×{it.qty||1}
                                </span>
                              ))}
                            </div>
                          )}

                          <p className="text-pink-500 font-bold text-sm mt-1">${displayTotal?.toLocaleString()}</p>
                        </div>

                        {/* Status */}
                        <span className={`text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${statusColor[statusLabel] || "bg-gray-100 text-gray-500"}`}>
                          {statusLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* WISHLIST */}
          {activeTab === "Wishlist" && (
            <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6">
              <h2 className="text-xl font-extrabold text-gray-800 mb-6">My Wishlist</h2>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">🤍</div>
                  <p className="text-gray-500 font-semibold">No items in your wishlist yet.</p>
                  <p className="text-gray-400 text-sm mt-1">Heart a laptop on the home page to save it here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3 bg-pink-50 rounded-xl p-4 border border-pink-100 hover:border-pink-300 transition-all">
                      <img src={item.image} alt={item.title} className="w-14 h-14 object-contain bg-white rounded-lg p-1" />
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                        <p className="text-pink-500 font-extrabold">${item.price.toLocaleString()}</p>
                      </div>
                      <button onClick={() => onUnlike(item.id)} className="text-xl hover:scale-110 transition-transform" title="Remove from wishlist">❤️</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "Settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}
