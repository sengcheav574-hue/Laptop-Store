import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";

const headlines = [
  { top: "Find Your", bottom: "Perfect Laptop" },
  { top: "Power Meets", bottom: "Elegance" },
  { top: "Tech That", bottom: "Inspires You" },
];

const stats = [
  { val: "500+", label: "Products" },
  { val: "50K+", label: "Happy Buyers" },
  { val: "4.9★", label: "Rating" },
];

const floatingBadges = [
  { emoji: "💻", text: "Gaming Laptops", style: { top: "18%", left: "4%" } },
  { emoji: "⚡", text: "Fast Delivery", style: { top: "55%", left: "2%" } },
  { emoji: "🔒", text: "Secure Payment", style: { top: "75%", right: "3%" } },
  { emoji: "🎁", text: "Best Deals", style: { top: "20%", right: "2%" } },
];

const featuredLaptop = {
  id: 99,
  title: "MSI Titan GT77 HX",
  price: 2499,
  image:
    "https://storage-asset.msi.com/global/picture/image/feature/nb/GT/GT77-13V/images/kv-laptop.png",
  description: "Intel i9 · RTX 4090 · 64GB RAM",
  rate: 4.9,
};

export default function Hero({ handleAddToCart }) {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % headlines.length);
        setVisible(true);
      }, 350);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const h = headlines[idx];

  const handleAdd = () => {
    if (handleAddToCart) handleAddToCart(featuredLaptop);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <style>{`
        .hero-root {
          position: relative;
          min-height: 88vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: linear-gradient(135deg, #fff0f6 0%, #fce7f3 40%, #fdf2f8 70%, #fff5f9 100%);
          font-family: 'Nunito', sans-serif;
        }
        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
          opacity: 0.55;
        }
        .hero-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(236,72,153,0.12) 1.5px, transparent 1.5px);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .headline-text {
          transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .headline-visible { opacity: 1; transform: translateY(0); }
        .headline-hidden  { opacity: 0; transform: translateY(14px); }
        .float-badge {
          position: absolute;
          background: white;
          border: 1px solid rgba(236,72,153,0.18);
          border-radius: 50px;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #4b5563;
          box-shadow: 0 4px 16px rgba(236,72,153,0.12);
          white-space: nowrap;
          animation: floatUp 4s ease-in-out infinite;
        }
        .float-badge:nth-child(2) { animation-delay: 0.8s; }
        .float-badge:nth-child(3) { animation-delay: 1.6s; }
        .float-badge:nth-child(4) { animation-delay: 2.4s; }
        @keyframes floatUp {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        .laptop-card {
          background: white;
          border-radius: 28px;
          padding: 24px;
          box-shadow: 0 24px 64px rgba(236,72,153,0.18), 0 4px 16px rgba(0,0,0,0.06);
          border: 1px solid rgba(236,72,153,0.1);
          animation: floatUp 5s ease-in-out infinite;
          max-width: 360px;
          width: 100%;
        }
        .ring-pulse {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(236,72,153,0.35);
          animation: ring 2.5s ease-out infinite;
        }
        @keyframes ring {
          0%   { transform: scale(1);    opacity: 0.6; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #f472b6, #ec4899, #db2777);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 14px 32px;
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow: 0 8px 28px rgba(236,72,153,0.45);
          position: relative;
          overflow: hidden;
        }
        .cta-primary:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 14px 36px rgba(236,72,153,0.6); }
        .cta-primary .arrow { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .cta-primary:hover .arrow { transform: translateX(5px); }
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          color: #ec4899;
          border: 2px solid rgba(236,72,153,0.25);
          border-radius: 50px;
          padding: 13px 28px;
          font-family: 'Nunito', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(236,72,153,0.1);
        }
        .cta-secondary:hover { background: #fff0f6; border-color: #ec4899; transform: translateY(-2px); }
        .stat-pill {
          background: white;
          border: 1px solid rgba(236,72,153,0.15);
          border-radius: 16px;
          padding: 12px 20px;
          text-align: center;
          box-shadow: 0 2px 12px rgba(236,72,153,0.08);
          transition: transform 0.25s ease;
        }
        .stat-pill:hover { transform: translateY(-3px); }

        /* Add to cart button states */
        .add-btn {
          border: none;
          border-radius: 50px;
          padding: 10px 20px;
          font-size: 0.85rem;
          font-weight: 800;
          font-family: 'Nunito', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
          white-space: nowrap;
        }
        .add-btn.idle {
          background: linear-gradient(135deg,#f472b6,#ec4899);
          color: white;
          box-shadow: 0 4px 14px rgba(236,72,153,0.4);
        }
        .add-btn.idle:hover { transform: translateY(-2px) scale(1.05); box-shadow: 0 8px 22px rgba(236,72,153,0.55); }
        .add-btn.success {
          background: linear-gradient(135deg,#4ade80,#22c55e);
          color: white;
          box-shadow: 0 4px 14px rgba(34,197,94,0.4);
          transform: scale(1.05);
        }

        @keyframes bounce-down {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(6px); }
        }
        .scroll-hint { animation: bounce-down 1.8s ease-in-out infinite; }

        /* Toast */
        @keyframes toastIn {
          from { opacity:0; transform: translateY(16px) scale(0.9); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        .cart-toast {
          position: fixed;
          bottom: 32px;
          right: 32px;
          background: white;
          border: 1.5px solid rgba(34,197,94,0.3);
          border-radius: 16px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 32px rgba(34,197,94,0.2);
          z-index: 9999;
          animation: toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
          font-family: 'Nunito', sans-serif;
        }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .float-badge { display: none; }
        }
      `}</style>

      {/* Cart added toast */}
      {added && (
        <div className="cart-toast">
          <BsCartCheckFill style={{ color: "#22c55e", fontSize: "1.3rem" }} />
          <div>
            <p
              style={{
                fontWeight: 800,
                color: "#1f2937",
                fontSize: "0.875rem",
              }}
            >
              Added to cart! 🎉
            </p>
            <p
              style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: 600 }}
            >
              MSI Titan GT77 HX
            </p>
          </div>
          <Link
            to="/cart"
            style={{
              marginLeft: "8px",
              background: "linear-gradient(135deg,#f472b6,#ec4899)",
              color: "white",
              borderRadius: "50px",
              padding: "6px 14px",
              fontSize: "0.75rem",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            View Cart
          </Link>
        </div>
      )}

      <section className="hero-root">
        <div className="hero-dots" />
        <div
          className="hero-blob"
          style={{
            width: 500,
            height: 500,
            background: "radial-gradient(circle,#fce7f3,transparent)",
            top: "-120px",
            right: "-80px",
          }}
        />
        <div
          className="hero-blob"
          style={{
            width: 350,
            height: 350,
            background: "radial-gradient(circle,#fbcfe8,transparent)",
            bottom: "-60px",
            left: "-60px",
            opacity: 0.4,
          }}
        />

        {floatingBadges.map((b, i) => (
          <div key={i} className="float-badge" style={b.style}>
            <span>{b.emoji}</span>
            {b.text}
          </div>
        ))}

        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 5%",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* LEFT */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "28px" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "white",
                border: "1px solid rgba(236,72,153,0.2)",
                borderRadius: "50px",
                padding: "6px 16px",
                width: "fit-content",
                boxShadow: "0 2px 12px rgba(236,72,153,0.1)",
              }}
            >
              <MdVerified style={{ color: "#ec4899", fontSize: "1rem" }} />
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#ec4899",
                }}
              >
                Cambodia's #1 Laptop Store
              </span>
            </div>

            <div
              className={`headline-text ${visible ? "headline-visible" : "headline-hidden"}`}
            >
              <h1
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
                  fontWeight: 900,
                  lineHeight: 1.12,
                  color: "#1f2937",
                }}
              >
                {h.top}
                <br />
                <span
                  style={{
                    background:
                      "linear-gradient(135deg,#f472b6,#ec4899,#db2777)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {h.bottom}
                </span>
              </h1>
            </div>

            <p
              style={{
                fontSize: "1.05rem",
                color: "#6b7280",
                lineHeight: 1.75,
                maxWidth: "480px",
              }}
            >
              Discover premium laptops for gaming, work, and creativity — with
              lightning-fast delivery right to your door.
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <Link to="/" className="cta-primary">
                Shop Now <HiArrowRight className="arrow" />
              </Link>
              <Link to="/deals" className="cta-secondary">
                🔥 View Deals
              </Link>
            </div>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {stats.map((s, i) => (
                <div key={i} className="stat-pill">
                  <p
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 900,
                      color: "#ec4899",
                    }}
                  >
                    {s.val}
                  </p>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#9ca3af",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Product card */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <div className="ring-pulse" style={{ width: 300, height: 300 }} />
            <div
              className="ring-pulse"
              style={{ width: 300, height: 300, animationDelay: "1.2s" }}
            />

            <div className="laptop-card">
              {/* Product image */}
              <div
                style={{
                  background: "linear-gradient(135deg,#fff0f6,#fce7f3)",
                  borderRadius: "16px",
                  padding: "16px",
                  textAlign: "center",
                  marginBottom: "16px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={featuredLaptop.image}
                  alt={featuredLaptop.title}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "contain",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.06)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <p
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "#ec4899",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginTop: "8px",
                  }}
                >
                  Featured Pick
                </p>
              </div>

              <p
                style={{
                  fontWeight: 900,
                  fontSize: "1rem",
                  color: "#1f2937",
                  marginBottom: "4px",
                }}
              >
                {featuredLaptop.title}
              </p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#9ca3af",
                  marginBottom: "12px",
                }}
              >
                {featuredLaptop.description}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: 900,
                    color: "#ec4899",
                  }}
                >
                  ${featuredLaptop.price.toLocaleString()}
                </span>
                <button
                  className={`add-btn ${added ? "success" : "idle"}`}
                  onClick={handleAdd}
                >
                  {added ? (
                    <>
                      <BsCartCheckFill /> Added!
                    </>
                  ) : (
                    <>
                      <IoMdCart /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="scroll-hint"
          style={{
            position: "absolute",
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            color: "#f9a8d4",
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1.5,
              height: 28,
              background: "linear-gradient(to bottom,#ec4899,transparent)",
              borderRadius: 4,
            }}
          />
        </div>
      </section>
    </>
  );
}
