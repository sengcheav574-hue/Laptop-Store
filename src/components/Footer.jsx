import { Link } from "react-router-dom";
import { FaFacebook, FaXTwitter, FaTelegram, FaInstagram } from "react-icons/fa6";
import { MdOutlineLocalShipping, MdOutlineSupportAgent, MdOutlineVerified } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";

const footerLinks = {
  Shop: [
    { label: "All Laptops", to: "/" },
    { label: "Gaming", to: "/category" },
    { label: "Business", to: "/category" },
    { label: "Product Deals", to: "/deals" },
    { label: "New Arrivals", to: "/" },
  ],
  Support: [
    { label: "Track Order", to: "/delivery" },
    { label: "Returns & Refunds", to: "/" },
    { label: "Warranty Info", to: "/" },
    { label: "FAQ", to: "/" },
    { label: "Contact Us", to: "/" },
  ],
  Company: [
    { label: "About Us", to: "/about_us" },
    { label: "Careers", to: "/" },
    { label: "Press", to: "/" },
    { label: "Privacy Policy", to: "/" },
    { label: "Terms of Service", to: "/" },
  ],
};

const badges = [
  { icon: <MdOutlineLocalShipping className="text-2xl" />, label: "Free Shipping", sub: "Orders over $500" },
  { icon: <MdOutlineVerified className="text-2xl" />, label: "Genuine Products", sub: "100% Authentic" },
  { icon: <MdOutlineSupportAgent className="text-2xl" />, label: "24/7 Support", sub: "Always here for you" },
];

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');

        .footer-root {
          font-family: 'Nunito', sans-serif;
        }

        @keyframes floatDot {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.15; }
          50%       { transform: translateY(-18px) scale(1.2); opacity: 0.3; }
        }
        @keyframes shimmerLine {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .footer-dot {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, #f9a8d4, transparent);
          animation: floatDot var(--dur, 6s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
          pointer-events: none;
        }

        .shimmer-text {
          background: linear-gradient(90deg, #ec4899, #f9a8d4, #db2777, #f472b6, #ec4899);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerLine 4s linear infinite;
        }

        .footer-link {
          position: relative;
          color: #9ca3af;
          font-size: 0.875rem;
          font-weight: 600;
          transition: color 0.25s ease;
          display: inline-block;
        }
        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: linear-gradient(90deg, #ec4899, #f472b6);
          border-radius: 2px;
          transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .footer-link:hover {
          color: #ec4899;
        }
        .footer-link:hover::after {
          width: 100%;
        }

        .social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 1.5px solid rgba(236,72,153,0.2);
          background: rgba(236,72,153,0.45);
          color: #f9a8d4;
          cursor: pointer;
        }
        .social-btn:hover {
          transform: translateY(-4px) scale(1.12);
          background: linear-gradient(135deg, #ec4899, #db2777);
          border-color: transparent;
          color: white;
          box-shadow: 0 8px 20px rgba(236,72,153,0.45);
        }

        .badge-card {
          background: rgba(236,72,153,0.45);
          border: 1px solid rgba(236,72,153,0.18);
          border-radius: 16px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
        }
        .badge-card:hover {
          background: rgba(236,72,153,0.1);
          border-color: rgba(236,72,153,0.4);
          transform: translateY(-2px);
        }

        .newsletter-input {
          background: rgba(255,255,255,0.08);
          border: 1.5px solid rgba(236,72,153,0.25);
          border-radius: 50px;
          padding: 10px 20px;
          color: white;
          font-size: 0.875rem;
          font-family: 'Nunito', sans-serif;
          outline: none;
          flex: 1;
          min-width: 0;
          transition: border-color 0.25s;
        }
        .newsletter-input::placeholder { color: rgba(249,168,212,0.5); }
        .newsletter-input:focus { border-color: #ec4899; }

        .newsletter-btn {
          background: linear-gradient(135deg, #f472b6, #ec4899);
          border: none;
          border-radius: 50px;
          padding: 10px 22px;
          color: white;
          font-weight: 800;
          font-size: 0.875rem;
          font-family: 'Nunito', sans-serif;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(236,72,153,0.4);
        }
        .newsletter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(236,72,153,0.6);
        }

        .divider-shimmer {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(236,72,153,0.4), rgba(244,114,182,0.6), rgba(236,72,153,0.4), transparent);
        }
      `}</style>

      <footer
        className="footer-root relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #1a0a12 0%, #2d0f20 40%, #1f0d18 70%, #150810 100%)",
        }}
      >
        {/* Floating decorative dots */}
        {[
          { w: 300, h: 300, top: "-80px", left: "-60px", dur: "7s", delay: "0s" },
          { w: 200, h: 200, top: "30%", right: "-50px", dur: "9s", delay: "1.5s" },
          { w: 150, h: 150, bottom: "10%", left: "20%", dur: "6s", delay: "0.8s" },
          { w: 100, h: 100, top: "60%", left: "60%", dur: "8s", delay: "2s" },
        ].map((d, i) => (
          <span
            key={i}
            className="footer-dot"
            style={{
              width: d.w, height: d.h,
              top: d.top, left: d.left, right: d.right, bottom: d.bottom,
              "--dur": d.dur, "--delay": d.delay,
            }}
          />
        ))}

        {/* ── Trust Badges ── */}
        <div className="relative z-10 border-b" style={{ borderColor: "rgba(236,72,153,0.12)" }}>
          <div className="max-w-7xl mx-auto px-[5%] py-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {badges.map((b, i) => (
              <div className="badge-card" key={i}>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg,rgba(236,72,153,0.3),rgba(244,114,182,0.2))", color: "#f472b6" }}
                >
                  {b.icon}
                </div>
                <div>
                  <p style={{ color: "white", fontWeight: 800, fontSize: "0.875rem" }}>{b.label}</p>
                  <p style={{ color: "rgba(249,168,212,0.6)", fontSize: "0.75rem" }}>{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main Footer Body ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-[5%] py-14 grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Logo text */}
            <div>
              <h2
                className="shimmer-text text-3xl font-black tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                LaptopStore
              </h2>
              <p style={{ color: "rgba(249,168,212,0.55)", fontSize: "0.82rem", marginTop: "6px", lineHeight: 1.7 }}>
                Your trusted destination for premium laptops.<br />
                Quality tech, unbeatable prices, and fast delivery.
              </p>
            </div>

            {/* Newsletter */}
            <div>
              <p style={{ color: "#f9a8d4", fontWeight: 700, fontSize: "0.8rem", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                <HiOutlineMail className="inline mr-1.5 text-base" />
                Stay in the loop
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <input className="newsletter-input" placeholder="Enter your email…" type="email" />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>

            {/* Socials */}
            <div>
              <p style={{ color: "rgba(249,168,212,0.5)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>Follow us</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <Link to="https://web.facebook.com/sengcheav123" className="social-btn"><FaFacebook /></Link>
                <Link to="https://www.instagram.com/juker1046?igsh=aHZtenZiZ2ZobXR5&utm_source=qr" className="social-btn"><FaInstagram /></Link>
                <Link to="https://x.com/cheav231990e?s=21" className="social-btn"><FaXTwitter /></Link>
                <Link to="https://t.me/STEPHENCHOW007" className="social-btn"><FaTelegram /></Link>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4
                style={{
                  color: "white",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  borderLeft: "3px solid #ec4899",
                  paddingLeft: "10px",
                }}
              >
                {section}
              </h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="relative z-10 mx-[5%]">
          <div className="divider-shimmer" />
        </div>

        {/* ── Bottom Bar ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-[5%] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ color: "rgba(249,168,212,0.4)", fontSize: "0.78rem" }}>
            © {new Date().getFullYear()} <span style={{ color: "#ec4899", fontWeight: 700 }}>LaptopStore</span>. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <Link
                key={item}
                to="/"
                style={{ color: "rgba(249,168,212,0.4)", fontSize: "0.78rem", fontWeight: 600, transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = "#ec4899")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(249,168,212,0.4)")}
              >
                {item}
              </Link>
            ))}
          </div>
          <p style={{ color: "rgba(249,168,212,0.3)", fontSize: "0.75rem" }}>
            Made with <span style={{ color: "#ec4899" }}>♥</span> in Cambodia
          </p>
        </div>
      </footer>
    </>
  );
}
