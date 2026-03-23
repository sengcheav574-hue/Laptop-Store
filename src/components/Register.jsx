import { MdOutlineClear } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useState } from "react";

function Register({ setAuthMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [form, setForm] = useState({ name: "", email: "", gender: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, val) => setForm((p) => ({ ...p, [field]: val }));

  const filledCount = [form.name, form.email, form.gender, form.password].filter(Boolean).length;
  const progress = (filledCount / 4) * 100;

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  const getPasswordStrength = (pw) => {
    if (!pw) return null;
    const score = [pw.length >= 6, pw.length >= 10, /[A-Z]/.test(pw), /[0-9]/.test(pw), /[^a-zA-Z0-9]/.test(pw)].filter(Boolean).length;
    if (score <= 2) return { level: "weak",   label: "Weak",     color: "#ef4444" };
    if (score <= 3) return { level: "medium", label: "Good",     color: "#f59e0b" };
    return             { level: "strong", label: "Strong 🔥", color: "#10b981" };
  };
  const pwStrength = getPasswordStrength(form.password);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }

        .reg-overlay {
          position: fixed; inset: 0;
          background: rgba(8, 2, 18, 0.65);
          backdrop-filter: blur(14px);
          display: flex; align-items: center; justify-content: center;
          z-index: 1000;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.88) translateY(30px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shimmerSlide {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes checkPop {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          70%  { transform: scale(1.25) rotate(5deg); opacity: 1; }
          100% { transform: scale(1) rotate(0); opacity: 1; }
        }
        @keyframes gradientShift {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes twinkle {
          0%,100% { opacity: 0; transform: scale(0); }
          50%      { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }

        .reg-card {
          animation: modalIn 0.45s cubic-bezier(0.34, 1.35, 0.64, 1) forwards;
          width: 440px;
          max-height: 94vh;
          overflow-y: auto;
          background: #0d0818;
          border-radius: 32px;
          padding: 0;
          position: relative;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.07),
            0 32px 80px rgba(0,0,0,0.7),
            0 0 80px rgba(236,72,153,0.1);
          scrollbar-width: none;
        }
        .reg-card::-webkit-scrollbar { display: none; }

        .reg-banner {
          position: relative;
          padding: 34px 32px 26px;
          background: linear-gradient(160deg, #180828 0%, #2a0a3c 50%, #180828 100%);
          border-radius: 32px 32px 0 0;
          overflow: hidden;
        }
        .reg-banner-glow {
          position: absolute; top: -50px; right: -50px;
          width: 220px; height: 220px; border-radius: 50%;
          background: radial-gradient(circle, rgba(244,114,182,0.22) 0%, transparent 70%);
          pointer-events: none;
        }
        .reg-banner-glow2 {
          position: absolute; bottom: -40px; left: -30px;
          width: 160px; height: 160px; border-radius: 50%;
          background: radial-gradient(circle, rgba(192,132,252,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .reg-star {
          position: absolute;
          width: 5px; height: 5px;
          background: white;
          clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
        }
        .reg-star-1 { top: 20px; left: 28px; opacity: 0.35; animation: twinkle 2.5s 0s ease-in-out infinite; }
        .reg-star-2 { top: 45px; right: 55px; opacity: 0.3; animation: twinkle 2.5s 0.8s ease-in-out infinite; width:7px;height:7px; }
        .reg-star-3 { bottom: 18px; left: 55%; opacity: 0.2; animation: twinkle 2.5s 1.6s ease-in-out infinite; width:4px;height:4px; }
        .reg-star-4 { top: 60px; left: 44%; opacity: 0.25; animation: twinkle 2.5s 0.4s ease-in-out infinite; width:5px;height:5px; }

        .reg-avatar-wrap {
          position: relative; width: 68px; height: 68px;
          margin: 0 auto 14px;
          animation: float 4s ease-in-out infinite;
          z-index: 1;
        }
        .reg-avatar-ring {
          position: absolute; inset: -3px; border-radius: 50%;
          background: linear-gradient(135deg, #f472b6, #c084fc, #818cf8);
          background-size: 300%;
          animation: gradientShift 3s ease infinite;
        }
        .reg-avatar-ring-pulse {
          position: absolute; inset: -3px; border-radius: 50%;
          background: linear-gradient(135deg, #f472b6, #c084fc);
          background-size: 300%;
          animation: pulseRing 2.2s ease-out infinite;
        }
        .reg-avatar-inner {
          position: absolute; inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, #2a1550, #180828);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.75rem;
          margin: 3px;
          border-radius: 50%;
        }

        .reg-heading {
          font-family: 'Playfair Display', serif;
          font-size: 1.7rem; font-weight: 900;
          text-align: center; color: white;
          margin: 0 0 4px;
          position: relative; z-index: 1;
          letter-spacing: -0.01em;
        }
        .reg-heading-accent {
          background: linear-gradient(90deg, #f472b6, #c084fc 60%, #a78bfa);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .reg-subhead {
          text-align: center; color: rgba(255,255,255,0.38);
          font-size: 0.78rem; font-weight: 500;
          position: relative; z-index: 1;
          letter-spacing: 0.02em; margin-bottom: 0;
        }

        .reg-progress-wrap {
          margin-top: 20px; position: relative; z-index: 1;
        }
        .reg-progress-track {
          height: 3px; background: rgba(255,255,255,0.07);
          border-radius: 99px; overflow: hidden;
        }
        .reg-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #f472b6, #c084fc);
          border-radius: 99px;
          transition: width 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 0 8px rgba(244,114,182,0.7);
        }
        .reg-progress-labels {
          display: flex; justify-content: space-between;
          margin-top: 5px; font-size: 0.68rem; font-weight: 600;
          color: rgba(255,255,255,0.25);
        }
        .reg-progress-pct { color: #f472b6; }

        .reg-body {
          padding: 26px 32px 30px;
          display: flex; flex-direction: column; gap: 13px;
        }

        .reg-field { position: relative; }
        .reg-field-1 { animation: floatUp 0.4s 0.05s ease both; }
        .reg-field-2 { animation: floatUp 0.4s 0.1s ease both; }
        .reg-field-3 { animation: floatUp 0.4s 0.15s ease both; }
        .reg-field-4 { animation: floatUp 0.4s 0.2s ease both; }

        .reg-label {
          display: block;
          font-size: 0.7rem; font-weight: 700;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 6px; padding-left: 2px;
          transition: color 0.2s;
        }
        .reg-field.focused .reg-label { color: #f472b6; }

        .reg-input-wrap { position: relative; display: flex; align-items: center; }
        .reg-icon {
          position: absolute; left: 14px;
          color: rgba(255,255,255,0.18); font-size: 0.9rem;
          pointer-events: none; transition: color 0.25s; z-index: 2;
        }
        .reg-field.focused .reg-icon { color: #f472b6; }

        .reg-input {
          width: 100%;
          padding: 13px 16px 13px 40px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.07);
          border-radius: 13px;
          color: white;
          font-size: 0.875rem; font-weight: 500;
          font-family: 'Plus Jakarta Sans', sans-serif;
          outline: none;
          transition: all 0.25s ease;
          caret-color: #f472b6;
        }
        .reg-input::placeholder { color: rgba(255,255,255,0.16); }
        .reg-input:focus {
          background: rgba(244,114,182,0.06);
          border-color: rgba(244,114,182,0.45);
          box-shadow: 0 0 0 4px rgba(244,114,182,0.07), inset 0 1px 0 rgba(255,255,255,0.04);
        }
        .reg-input.filled {
          border-color: rgba(192,132,252,0.28);
          background: rgba(192,132,252,0.04);
        }

        .reg-check {
          position: absolute; right: 12px;
          width: 20px; height: 20px; border-radius: 50%;
          background: linear-gradient(135deg, #f472b6, #c084fc);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.6rem; color: white; font-weight: 900;
          animation: checkPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          box-shadow: 0 2px 10px rgba(244,114,182,0.5);
          pointer-events: none;
        }

        .reg-select {
          width: 100%;
          padding: 13px 38px 13px 40px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(255,255,255,0.07);
          border-radius: 13px;
          color: white;
          font-size: 0.875rem; font-weight: 500;
          font-family: 'Plus Jakarta Sans', sans-serif;
          outline: none; appearance: none; cursor: pointer;
          transition: all 0.25s ease;
        }
        .reg-select option { background: #180828; }
        .reg-select.empty { color: rgba(255,255,255,0.16); }
        .reg-select:focus {
          background: rgba(244,114,182,0.06);
          border-color: rgba(244,114,182,0.45);
          box-shadow: 0 0 0 4px rgba(244,114,182,0.07);
        }
        .reg-select.filled { border-color: rgba(192,132,252,0.28); color: white; }
        .reg-chevron {
          position: absolute; right: 13px;
          color: rgba(255,255,255,0.22); pointer-events: none; font-size: 0.75rem;
        }

        .reg-eye {
          position: absolute; right: 13px;
          color: rgba(255,255,255,0.22); cursor: pointer;
          font-size: 0.88rem; transition: color 0.2s; z-index: 2;
        }
        .reg-eye:hover { color: #f472b6; }

        .strength-wrap { margin-top: 7px; }
        .strength-bars { display: flex; gap: 4px; }
        .strength-bar {
          flex: 1; height: 3px; border-radius: 99px;
          background: rgba(255,255,255,0.07);
          transition: background 0.35s ease;
        }
        .strength-row { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
        .strength-hint { font-size: 0.67rem; color: rgba(255,255,255,0.2); }
        .strength-lbl { font-size: 0.68rem; font-weight: 700; }

        .reg-divider {
          display: flex; align-items: center; gap: 10px; margin: 2px 0;
        }
        .reg-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
        .reg-divider-txt { font-size: 0.68rem; color: rgba(255,255,255,0.18); font-weight: 600; letter-spacing: 0.06em; white-space: nowrap; }

        .social-row { display: flex; gap: 10px; }
        .social-btn {
          flex: 1; padding: 10px 8px;
          border-radius: 12px;
          border: 1.5px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.55);
          font-size: 0.78rem; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          transition: all 0.2s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .social-btn:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.14);
          color: white; transform: translateY(-1px);
        }

        .reg-btn-wrap { margin-top: 4px; }
        .reg-btn {
          width: 100%; padding: 14px 20px;
          border-radius: 14px; border: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.88rem; font-weight: 800;
          color: white; cursor: pointer;
          background: linear-gradient(135deg, #f472b6 0%, #ec4899 45%, #c084fc 100%);
          background-size: 200% auto;
          position: relative; overflow: hidden;
          transition: all 0.3s cubic-bezier(0.34, 1.4, 0.64, 1);
          box-shadow: 0 8px 28px rgba(236,72,153,0.38), 0 2px 8px rgba(0,0,0,0.4);
          letter-spacing: 0.02em;
        }
        .reg-btn::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 45%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
          transform: translateX(-100%) skewX(-15deg);
        }
        .reg-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(236,72,153,0.5), 0 4px 12px rgba(0,0,0,0.4);
          background-position: right center;
        }
        .reg-btn:hover::before { animation: shimmerSlide 0.8s ease forwards; }
        .reg-btn:active { transform: translateY(0) scale(0.98); }

        .reg-close-btn {
          position: absolute; top: 14px; right: 14px;
          width: 32px; height: 32px; border-radius: 50%; border: none;
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.45);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 1rem;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 10;
        }
        .reg-close-btn:hover {
          background: rgba(236,72,153,0.2); color: #f472b6;
          transform: rotate(90deg) scale(1.1);
        }

        .reg-switch {
          text-align: center; font-size: 0.78rem;
          color: rgba(255,255,255,0.28); font-weight: 500; margin-top: 2px;
        }
        .reg-switch-link {
          color: #f472b6; cursor: pointer; font-weight: 700;
          transition: all 0.2s; border-bottom: 1px solid transparent;
        }
        .reg-switch-link:hover { color: #c084fc; border-bottom-color: #c084fc; }

        .reg-terms {
          font-size: 0.68rem; color: rgba(255,255,255,0.2);
          text-align: center; line-height: 1.5; margin-top: -2px;
        }
        .reg-terms span { color: rgba(244,114,182,0.7); cursor: pointer; }
        .reg-terms span:hover { color: #f472b6; }
      `}</style>

      <div className="reg-overlay" onClick={(e) => e.target === e.currentTarget && setAuthMode?.(null)}>
        <div className="reg-card">

          {/* Banner */}
          <div className="reg-banner">
            <div className="reg-banner-glow" />
            <div className="reg-banner-glow2" />
            <div className="reg-star reg-star-1" />
            <div className="reg-star reg-star-2" />
            <div className="reg-star reg-star-3" />
            <div className="reg-star reg-star-4" />

            <button className="reg-close-btn" onClick={() => setAuthMode?.(null)}>
              <MdOutlineClear />
            </button>

            <div className="reg-avatar-wrap">
              <div className="reg-avatar-ring-pulse" />
              <div className="reg-avatar-ring" />
              <div className="reg-avatar-inner">🌸</div>
            </div>

            <h1 className="reg-heading">
              Create <span className="reg-heading-accent">Account</span>
            </h1>
            <p className="reg-subhead">Join thousands discovering amazing laptops</p>

            <div className="reg-progress-wrap">
              <div className="reg-progress-track">
                <div className="reg-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="reg-progress-labels">
                <span>Profile completion</span>
                <span className="reg-progress-pct">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="reg-body">

            {/* Social */}
            <div className="social-row">
              <button className="social-btn">
                <svg width="15" height="15" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M5.27 9.77A7.1 7.1 0 0 1 12 4.9c1.69 0 3.21.6 4.4 1.58l3.29-3.29A11.9 11.9 0 0 0 12 1 12 12 0 0 0 .96 7.4l4.31 2.37z"/>
                  <path fill="#34A853" d="M16.04 18.01A7.07 7.07 0 0 1 12 19.1a7.1 7.1 0 0 1-6.72-4.82l-4.3 2.35A12 12 0 0 0 12 23c2.93 0 5.63-1.04 7.7-2.75l-3.66-2.24z"/>
                  <path fill="#4A90D9" d="M19.7 20.25A11.9 11.9 0 0 0 23 12c0-.72-.1-1.5-.25-2.2H12v4.63h6.18a5.27 5.27 0 0 1-2.27 3.42l3.79 2.4z"/>
                  <path fill="#FBBC05" d="M5.28 14.28A7.11 7.11 0 0 1 4.9 12c0-.8.14-1.57.38-2.29L.97 7.4A12 12 0 0 0 0 12c0 1.64.33 3.2.96 4.6l4.32-2.32z"/>
                </svg>
                Google
              </button>
              <button className="social-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            <div className="reg-divider">
              <div className="reg-divider-line" />
              <span className="reg-divider-txt">OR CONTINUE WITH EMAIL</span>
              <div className="reg-divider-line" />
            </div>

            {/* Full Name */}
            <div className={`reg-field reg-field-1 ${focused === "name" ? "focused" : ""}`}>
              <label className="reg-label">Full Name</label>
              <div className="reg-input-wrap">
                <FiUser className="reg-icon" />
                <input
                  type="text" placeholder="Jane Doe"
                  className={`reg-input ${form.name ? "filled" : ""}`}
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                />
                {form.name && <div className="reg-check">✓</div>}
              </div>
            </div>

            {/* Email */}
            <div className={`reg-field reg-field-2 ${focused === "email" ? "focused" : ""}`}>
              <label className="reg-label">Email Address</label>
              <div className="reg-input-wrap">
                <FiMail className="reg-icon" />
                <input
                  type="email" placeholder="jane@example.com"
                  className={`reg-input ${form.email ? "filled" : ""}`}
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                />
                {form.email && form.email.includes("@") && <div className="reg-check">✓</div>}
              </div>
            </div>

            {/* Gender */}
            <div className={`reg-field reg-field-3 ${focused === "gender" ? "focused" : ""}`}>
              <label className="reg-label">Gender</label>
              <div className="reg-input-wrap">
                <span className="reg-icon" style={{ fontSize: "0.82rem" }}>👤</span>
                <select
                  className={`reg-select ${form.gender ? "filled" : "empty"}`}
                  value={form.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  onFocus={() => setFocused("gender")}
                  onBlur={() => setFocused("")}
                >
                  <option value="" disabled>Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Prefer not to say</option>
                </select>
                <span className="reg-chevron">▾</span>
                {form.gender && <div className="reg-check" style={{ right: "32px" }}>✓</div>}
              </div>
            </div>

            {/* Password */}
            <div className={`reg-field reg-field-4 ${focused === "password" ? "focused" : ""}`}>
              <label className="reg-label">Password</label>
              <div className="reg-input-wrap">
                <FiLock className="reg-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className={`reg-input ${form.password ? "filled" : ""}`}
                  style={{ paddingRight: "42px" }}
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                />
                <span className="reg-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {pwStrength && (
                <div className="strength-wrap">
                  <div className="strength-bars">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="strength-bar" style={{
                        background: i === 0
                          ? pwStrength.color
                          : i === 1 && pwStrength.level !== "weak" ? pwStrength.color
                          : i === 2 && pwStrength.level === "strong" ? pwStrength.color
                          : "rgba(255,255,255,0.07)"
                      }} />
                    ))}
                  </div>
                  <div className="strength-row">
                    <span className="strength-hint">Use 8+ chars, numbers & symbols</span>
                    <span className="strength-lbl" style={{ color: pwStrength.color }}>{pwStrength.label}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="reg-btn-wrap">
              <button className="reg-btn" onClick={handleSubmit}>
                {submitted ? "Account Created! 🎉" : "Create My Account ✨"}
              </button>
            </div>

            <p className="reg-terms">
              By registering you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span>
            </p>

            <p className="reg-switch">
              Already a member?{" "}
              <span className="reg-switch-link" onClick={() => setAuthMode?.("login")}>
                Sign in to your account →
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
