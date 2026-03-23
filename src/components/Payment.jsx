import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdLock, MdCheckCircle, MdCreditCard } from "react-icons/md";
import { FaPaypal, FaApplePay, FaGooglePay } from "react-icons/fa";
import { SiVisa, SiMastercard } from "react-icons/si";

export default function Payment({ onClearCart }) {
  const navigate = useNavigate();
  const location = useLocation();

  // ── Real cart values passed from Cart via navigate state ──
  const {
    cartItems = [],
    total = 0,
    shipping = 0,
    grandTotal = 0,
  } = location.state || {};

  const tax = Math.round(total * 0.08);
  const finalTotal = grandTotal + tax;
  const [payMethod, setPayMethod] = useState("card");
  const [step, setStep] = useState(1); // 1 = form, 2 = success
  const [loading, setLoading] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "cardNumber") value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    if (name === "expiry") {
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (name === "cvv") value = value.replace(/\D/g, "").slice(0, 3);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const orderId = "LPT-" + Date.now().toString().slice(-6);
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 5);
      const eta = deliveryDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const newOrder = {
        id: orderId,
        items: cartItems,
        total: finalTotal,
        status: 1,
        eta,
        placedAt: new Date().toISOString(),
        steps: ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"],
      };
      const existing = JSON.parse(sessionStorage.getItem("orders") || "[]");
      existing.unshift(newOrder);
      sessionStorage.setItem("orders", JSON.stringify(existing));
      sessionStorage.setItem("latestOrderId", orderId);
      if (onClearCart) onClearCart();
      setLoading(false);
      setStep(2);
    }, 2200);
  };

  const cardDisplay = form.cardNumber || "•••• •••• •••• ••••";
  const cardName = form.name || "YOUR NAME";
  const cardExpiry = form.expiry || "MM/YY";

  const isVisa = form.cardNumber.startsWith("4");
  const isMaster = form.cardNumber.startsWith("5");

  // ─── SUCCESS SCREEN ───────────────────────────────────────────────────────
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 flex items-center justify-center px-4">
        <style>{`
          @keyframes pop { 0%{transform:scale(0)} 70%{transform:scale(1.15)} 100%{transform:scale(1)} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          @keyframes confetti {
            0%{transform:translateY(-10px) rotate(0deg);opacity:1}
            100%{transform:translateY(120px) rotate(720deg);opacity:0}
          }
          .pop { animation: pop 0.5s cubic-bezier(.36,.07,.19,.97) forwards; }
          .fadeUp { animation: fadeUp 0.5s ease forwards; }
          .confetti-piece { position:absolute; width:8px; height:8px; border-radius:2px; animation: confetti 1.2s ease-out forwards; }
        `}</style>
        <div className="relative text-center max-w-sm w-full">
          {/* confetti */}
          {[...Array(14)].map((_, i) => (
            <div key={i} className="confetti-piece" style={{
              left: `${Math.random() * 100}%`,
              top: 0,
              background: ["#f472b6","#fb7185","#c084fc","#60a5fa","#34d399"][i % 5],
              animationDelay: `${i * 0.07}s`,
            }} />
          ))}
          <div className="pop flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-400 flex items-center justify-center shadow-xl shadow-pink-200">
              <MdCheckCircle className="text-white text-5xl" />
            </div>
          </div>
          <div className="fadeUp" style={{ animationDelay: "0.3s", opacity: 0 }}>
            <h2 className="text-3xl font-black text-gray-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-400 mb-6 text-sm">Your order has been confirmed. We'll send a confirmation to your email shortly.</p>
            <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5 mb-6 text-left">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-3">Order Details</p>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Order ID</span>
                <span className="font-bold text-gray-700">#{sessionStorage.getItem("latestOrderId") || "LPT-000000"}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Estimated Delivery</span>
                <span className="font-bold text-gray-700">3–5 Business Days</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Total Paid</span>
                <span className="font-bold text-pink-500">${finalTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="font-bold text-green-500">Confirmed ✓</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/delivery")}
              className="w-full bg-gradient-to-r from-pink-400 to-fuchsia-400 text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-pink-200 hover:shadow-pink-300 transition-all hover:scale-105 text-sm mb-3"
            >
              Track My Order 📦
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-white border border-pink-200 text-pink-500 font-extrabold py-3.5 rounded-2xl transition-all hover:scale-105 text-sm"
            >
              Continue Shopping →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── PAYMENT FORM ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-fuchsia-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        .payment-root { font-family: 'DM Sans', sans-serif; }
        .mono { font-family: 'Space Mono', monospace; }

        @keyframes cardFlip {
          0%   { transform: perspective(800px) rotateY(0deg); }
          100% { transform: perspective(800px) rotateY(180deg); }
        }
        @keyframes cardUnflip {
          0%   { transform: perspective(800px) rotateY(180deg); }
          100% { transform: perspective(800px) rotateY(0deg); }
        }
        @keyframes slideIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .card-3d { transition: transform 0.6s; transform-style: preserve-3d; }
        .card-flip { animation: cardFlip 0.5s forwards; }
        .card-unflip { animation: cardUnflip 0.5s forwards; }
        .slideIn { animation: slideIn 0.4s ease both; }

        .pay-input {
          width: 100%;
          background: #fff;
          border: 1.5px solid #fce7f3;
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1f2937;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .pay-input:focus {
          border-color: #f472b6;
          box-shadow: 0 0 0 3px rgba(244,114,182,0.12);
        }
        .pay-input::placeholder { color: #d1d5db; }

        .method-btn {
          flex: 1;
          padding: 12px 8px;
          border-radius: 14px;
          border: 2px solid #fce7f3;
          background: white;
          cursor: pointer;
          font-weight: 700;
          font-size: 13px;
          color: #9ca3af;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: all 0.2s;
        }
        .method-btn.active {
          border-color: #f472b6;
          background: #fdf2f8;
          color: #db2777;
          box-shadow: 0 4px 12px rgba(244,114,182,0.18);
        }
        .method-btn:hover:not(.active) { border-color: #fbcfe8; }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #f472b6, #c084fc);
          color: white;
          font-weight: 800;
          font-size: 15px;
          padding: 16px;
          border-radius: 16px;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(244,114,182,0.35);
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.02em;
        }
        .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 28px rgba(244,114,182,0.4); }
        .submit-btn:active { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
      `}</style>

      <div className="payment-root">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-pink-200 via-fuchsia-100 to-pink-100 py-8 px-[5%]">
          <button onClick={() => navigate("/cart")} className="text-pink-400 font-bold text-sm mb-3 hover:text-pink-600 transition-colors">← Back to Cart</button>
          <h1 className="text-3xl font-black text-gray-800">Secure Checkout</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <MdLock className="text-green-500 text-sm" />
            <span className="text-xs text-gray-400 font-semibold">256-bit SSL encrypted · Your data is safe</span>
          </div>
        </div>

        <div className="px-[5%] py-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── LEFT: Form ── */}
          <div className="lg:col-span-3 flex flex-col gap-6 slideIn">

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6">
              <h2 className="font-black text-gray-800 text-base mb-4">Payment Method</h2>
              <div className="flex gap-3">
                {[
                  { id: "card", icon: <MdCreditCard size={22} />, label: "Card" },
                  { id: "paypal", icon: <FaPaypal size={20} />, label: "PayPal" },
                  { id: "apple", icon: <FaApplePay size={24} />, label: "Apple Pay" },
                  { id: "google", icon: <FaGooglePay size={24} />, label: "Google Pay" },
                ].map((m) => (
                  <button key={m.id} className={`method-btn ${payMethod === m.id ? "active" : ""}`} onClick={() => setPayMethod(m.id)}>
                    {m.icon}
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {payMethod === "card" && (
              <>
                {/* Card Preview */}
                <div
                  className={`card-3d relative h-48 rounded-3xl overflow-hidden select-none cursor-pointer shadow-xl shadow-pink-200 ${flipped ? "card-flip" : ""}`}
                  style={{ background: "linear-gradient(135deg, #f472b6 0%, #c084fc 50%, #818cf8 100%)" }}
                  onClick={() => setFlipped(f => !f)}
                >
                  {/* Decorative circles */}
                  <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
                  <div className="absolute -bottom-10 -left-6 w-48 h-48 rounded-full bg-white/10" />
                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <div className="w-10 h-7 rounded-md bg-yellow-300/80 shadow-sm" />
                      </div>
                      <div>
                        {isVisa && <SiVisa className="text-white text-4xl" />}
                        {isMaster && <SiMastercard className="text-white text-4xl" />}
                        {!isVisa && !isMaster && <div className="w-8 h-8 rounded-full bg-white/20" />}
                      </div>
                    </div>
                    <div>
                      <p className="mono text-white text-xl font-bold tracking-widest mb-3 drop-shadow">
                        {cardDisplay}
                      </p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-pink-100 text-xs uppercase tracking-widest mb-0.5">Card Holder</p>
                          <p className="mono text-white font-bold text-sm uppercase tracking-wider">{cardName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-pink-100 text-xs uppercase tracking-widest mb-0.5">Expires</p>
                          <p className="mono text-white font-bold text-sm">{cardExpiry}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6 flex flex-col gap-4">
                  <h2 className="font-black text-gray-800 text-base">Card Details</h2>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Cardholder Name</label>
                    <input className="pay-input" name="name" placeholder="Jane Doe" value={form.name} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Card Number</label>
                    <input className="pay-input mono" name="cardNumber" placeholder="1234 5678 9012 3456" value={form.cardNumber} onChange={handleChange} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Expiry Date</label>
                      <input className="pay-input mono" name="expiry" placeholder="MM/YY" value={form.expiry} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">CVV</label>
                      <input className="pay-input mono" name="cvv" placeholder="•••" value={form.cvv} onChange={handleChange} onFocus={() => setFlipped(true)} onBlur={() => setFlipped(false)} />
                    </div>
                  </div>
                </div>
              </>
            )}

            {(payMethod === "paypal" || payMethod === "apple" || payMethod === "google") && (
              <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-8 flex flex-col items-center justify-center gap-4 text-center">
                <div className="text-5xl">
                  {payMethod === "paypal" && <FaPaypal className="text-blue-500" />}
                  {payMethod === "apple" && <FaApplePay className="text-gray-800" />}
                  {payMethod === "google" && <FaGooglePay className="text-gray-600" />}
                </div>
                <p className="text-gray-500 text-sm font-semibold">
                  You'll be redirected to {payMethod === "paypal" ? "PayPal" : payMethod === "apple" ? "Apple Pay" : "Google Pay"} to complete your payment securely.
                </p>
              </div>
            )}

            {/* Contact + Billing */}
            <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6 flex flex-col gap-4">
              <h2 className="font-black text-gray-800 text-base">Contact & Billing</h2>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Email Address</label>
                <input className="pay-input" name="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Billing Address</label>
                <input className="pay-input" name="address" placeholder="123 Main Street" value={form.address} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">City</label>
                  <input className="pay-input" name="city" placeholder="Phnom Penh" value={form.city} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">ZIP / Postal</label>
                  <input className="pay-input" name="zip" placeholder="12000" value={form.zip} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Summary ── */}
          <div className="lg:col-span-2">
            <div className="sticky top-6 flex flex-col gap-4">

              {/* Mini order card */}
              <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-5">
                <h2 className="font-black text-gray-800 text-base mb-4">Order Summary</h2>

                {/* Real cart items */}
                {cartItems.length > 0 && (
                  <div className="flex flex-col gap-1.5 mb-4 max-h-36 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-xs gap-2">
                        <span className="text-gray-500 truncate">{item.title.split(" ").slice(0,3).join(" ")} ×{item.qty || 1}</span>
                        <span className="font-bold text-gray-700 flex-shrink-0">${(item.price * (item.qty || 1)).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span className="font-bold text-gray-700">${total.toLocaleString()}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Shipping</span><span className="font-bold text-green-500">{shipping === 0 ? "FREE" : `$${shipping}`}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Tax (8%)</span><span className="font-bold text-gray-700">${tax.toLocaleString()}</span></div>
                </div>
                <div className="border-t border-pink-100 pt-3 flex justify-between items-center">
                  <span className="font-black text-gray-800">Total</span>
                  <span className="font-black text-pink-500 text-xl">${finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-gradient-to-br from-pink-50 to-fuchsia-50 rounded-2xl border border-pink-100 p-4">
                <div className="flex flex-col gap-2.5">
                  {[
                    { icon: "🔒", text: "Secured by SSL encryption" },
                    { icon: "↩️", text: "30-day hassle-free returns" },
                    { icon: "🚚", text: "Free shipping on orders $500+" },
                    { icon: "💳", text: "No hidden fees ever" },
                  ].map((b, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm">
                      <span className="text-base">{b.icon}</span>
                      <span className="text-gray-500 font-semibold">{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accepted cards */}
              <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Accepted Payments</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <SiVisa className="text-3xl text-blue-700" />
                  <SiMastercard className="text-3xl text-red-500" />
                  <FaPaypal className="text-2xl text-blue-500" />
                  <FaApplePay className="text-3xl text-gray-800" />
                  <FaGooglePay className="text-3xl text-gray-500" />
                </div>
              </div>

              {/* PAY BUTTON */}
              <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <><div className="spinner" /> Processing Payment...</>
                ) : (
                  <><MdLock size={18} /> Pay ${finalTotal.toLocaleString()} Now</>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 font-semibold">
                By paying, you agree to our <span className="text-pink-400 cursor-pointer">Terms</span> & <span className="text-pink-400 cursor-pointer">Privacy Policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
