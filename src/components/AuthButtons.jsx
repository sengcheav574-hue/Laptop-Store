import { useState } from "react";
import { FiLogIn, FiLogOut } from "react-icons/fi";

// ======= LOGIN BUTTON =======
export function LoginButton({ onClick, className = "" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(250%) skewX(-15deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 4px 15px rgba(236, 72, 153, 0.45); }
          50% { box-shadow: 0 4px 28px rgba(236, 72, 153, 0.75); }
        }
        .login-btn {
          background: linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #db2777 100%);
          color: white;
          border: none;
          padding: 9px 22px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.04em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.25s ease;
          animation: pulse-glow 3s ease-in-out infinite;
          font-family: 'Nunito', 'Poppins', sans-serif;
        }
        .login-btn:hover {
          transform: translateY(-2px) scale(1.05);
          animation: none;
          box-shadow: 0 8px 30px rgba(236, 72, 153, 0.65);
        }
        .login-btn:active {
          transform: translateY(0px) scale(0.97);
          box-shadow: 0 2px 10px rgba(236, 72, 153, 0.4);
        }
        .login-btn .shimmer {
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.35),
            transparent
          );
          opacity: 0;
          transition: opacity 0.2s;
        }
        .login-btn:hover .shimmer {
          opacity: 1;
          animation: shimmer-sweep 0.7s ease forwards;
        }
        .login-btn .icon {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-size: 1rem;
        }
        .login-btn:hover .icon {
          transform: rotate(15deg) scale(1.2);
        }
      `}</style>
      <button className={`login-btn ${className}`} onClick={onClick}>
        <span className="shimmer" />
        <FiLogIn className="icon" />
        <span style={{ position: "relative", zIndex: 1 }}>Login</span>
      </button>
    </>
  );
}

// ======= LOGOUT BUTTON =======
export function LogoutButton({ onClick, className = "" }) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes slide-out {
          0% { transform: translateX(0); opacity: 1; }
          50% { transform: translateX(4px); opacity: 0.6; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .logout-btn {
          background: transparent;
          color: #f87171;
          border: 1.5px solid #fca5a5;
          padding: 8px 20px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.875rem;
          letter-spacing: 0.04em;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: 'Nunito', 'Poppins', sans-serif;
        }
        .logout-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 50px;
        }
        .logout-btn:hover {
          color: #ef4444;
          border-color: #f87171;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.2);
        }
        .logout-btn:hover::before {
          opacity: 1;
        }
        .logout-btn:active {
          transform: translateY(0px) scale(0.96);
        }
        .logout-btn span,
        .logout-btn svg {
          position: relative;
          z-index: 1;
        }
        .logout-btn .icon {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-size: 1rem;
        }
        .logout-btn:hover .icon {
          transform: translateX(4px);
          animation: slide-out 0.5s ease;
        }
      `}</style>
      <button
        className={`logout-btn ${className}`}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <FiLogOut className="icon" />
        <span>Logout</span>
      </button>
    </>
  );
}
