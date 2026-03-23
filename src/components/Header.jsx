import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMenu, IoClose } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiUser, FiMail, FiLock, FiChevronDown } from "react-icons/fi";
import { BsBellFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginButton } from "./AuthButtons";
import logo from "../assets/images/Flat design computer logo template _ Free Vector.png";
import { IoHome } from "react-icons/io5";
import { PiFolderOpenFill } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineWhatshot } from "react-icons/md";

const navLinks = [
  { to: "/",         label: "Home",     icon: <IoHome /> },
  { to: "/category", label: "Category", icon: <PiFolderOpenFill /> },
  { to: "/delivery", label: "Delivery", icon: <TbTruckDelivery /> },
  { to: "/deals",    label: "Deals",    icon: <MdOutlineWhatshot /> },
];

/* ─────────────────────────── RESPONSIVE STYLES ─────────────────────────── */
const RESPONSIVE_STYLES = `
  .hdr-root {
    position: sticky; top: 0; z-index: 50;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5%;
    height: 64px;
    background: rgba(253,230,240,0.95);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(236,72,153,0.12);
    box-shadow: 0 2px 24px rgba(236,72,153,0.08);
    box-sizing: border-box;
  }
  .hdr-logo {
    flex-shrink: 0;
    height: 40px; width: 40px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  .hdr-logo:hover { transform: scale(1.06); }
  .hdr-nav {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    justify-content: center;
  }
  .hdr-nav-link {
    position: relative;
    font-weight: 700;
    color: #374151;
    text-decoration: none;
    padding: 6px 10px;
    border-radius: 10px;
    font-size: 0.9rem;
    white-space: nowrap;
    transition: color 0.2s, background 0.2s;
  }
  .hdr-nav-link::after {
    content: '';
    position: absolute; bottom: 2px; left: 10px; right: 10px;
    height: 2px;
    background: linear-gradient(90deg, #f472b6, #ec4899);
    border-radius: 4px;
    transform: scaleX(0);
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .hdr-nav-link:hover,
  .hdr-nav-link.active { color: #ec4899; }
  .hdr-nav-link:hover::after,
  .hdr-nav-link.active::after { transform: scaleX(1); }
  .hdr-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .hdr-cart {
    position: relative;
    display: flex; align-items: center;
    color: #6b7280;
    text-decoration: none;
    transition: color 0.2s;
    font-size: 1.5rem;
  }
  .hdr-cart:hover { color: #ec4899; }
  .hdr-cart-badge {
    position: absolute; top: -7px; right: -7px;
    background: #ef4444; color: white;
    font-size: 0.55rem; font-weight: 900;
    min-width: 17px; height: 17px; padding: 0 3px;
    border-radius: 99px;
    display: flex; align-items: center; justify-content: center;
    border: 2px solid white;
    box-shadow: 0 2px 6px rgba(239,68,68,0.4);
  }
  .hdr-account {
    display: flex; align-items: center; gap: 5px;
    color: #6b7280;
    font-size: 0.85rem; font-weight: 600;
    transition: color 0.2s;
    white-space: nowrap;
    cursor: pointer;
    background: none; border: none; padding: 0;
    font-family: inherit;
    text-decoration: none;
  }
  .hdr-account:hover { color: #ec4899; }
  .hdr-mobile-controls {
    display: none;
    align-items: center;
    gap: 10px;
  }
  .hdr-menu-btn {
    width: 38px; height: 38px;
    border-radius: 50%;
    border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: all 0.25s ease;
    flex-shrink: 0;
  }
  .hdr-drawer-overlay {
    position: fixed; inset: 0; z-index: 40;
    background: rgba(0,0,0,0.25);
    backdrop-filter: blur(3px);
  }
  .hdr-drawer {
    position: fixed; top: 64px; left: 12px; right: 12px; z-index: 45;
    background: white;
    border-radius: 20px;
    box-shadow: 0 16px 48px rgba(236,72,153,0.18);
    border: 1px solid rgba(236,72,153,0.12);
    overflow: hidden;
  }
  @keyframes drawerIn {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hdr-drawer { animation: drawerIn 0.25s cubic-bezier(0.22,1,0.36,1); }
  .hdr-drawer-nav { padding: 10px; display: flex; flex-direction: column; gap: 2px; }
  .hdr-drawer-divider {
    height: 1px; margin: 0 14px;
    background: linear-gradient(90deg,transparent,rgba(236,72,153,0.2),transparent);
  }
  .hdr-drawer-actions { padding: 10px; display: flex; flex-direction: column; gap: 4px; }
  .mob-link {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 16px; border-radius: 14px;
    font-weight: 700; font-size: 0.92rem; color: #374151;
    text-decoration: none; transition: all 0.2s ease;
    cursor: pointer;
  }
  .mob-link:hover, .mob-link.active {
    background: linear-gradient(135deg, #fff0f6, #fce7f3);
    color: #ec4899;
  }
  .mob-link-dot {
    margin-left: auto; width: 7px; height: 7px;
    background: #ec4899; border-radius: 50%;
  }
  @keyframes menuIconIn {
    from { transform: rotate(-90deg) scale(0.7); opacity: 0; }
    to   { transform: rotate(0deg) scale(1); opacity: 1; }
  }
  .menu-icon-anim { animation: menuIconIn 0.22s ease; }

  @media (min-width: 1280px) {
    .hdr-root { padding: 0 7%; height: 68px; }
    .hdr-logo { height: 44px; width: 44px; }
    .hdr-nav { gap: 4px; }
    .hdr-nav-link { font-size: 0.95rem; padding: 6px 14px; }
    .hdr-actions { gap: 14px; }
    .hdr-account { font-size: 0.9rem; }
  }
  @media (min-width: 1024px) and (max-width: 1279px) {
    .hdr-root { padding: 0 4%; }
    .hdr-nav { gap: 2px; }
    .hdr-nav-link { font-size: 0.88rem; padding: 6px 10px; }
    .hdr-actions { gap: 8px; }
    .hdr-account span { display: inline; }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .hdr-root { padding: 0 3%; }
    .hdr-nav { gap: 0px; }
    .hdr-nav-link { font-size: 0.82rem; padding: 6px 8px; }
    .hdr-actions { gap: 6px; }
    .hdr-account-label { display: none; }
  }
  @media (max-width: 767px) {
    .hdr-nav { display: none; }
    .hdr-actions { display: none; }
    .hdr-mobile-controls { display: flex; }
    .hdr-root { padding: 0 4%; height: 60px; }
    .hdr-logo { height: 36px; width: 36px; }
    .hdr-drawer { top: 60px; }
  }
  @media (max-width: 399px) {
    .hdr-root { padding: 0 3%; }
    .hdr-mobile-controls { gap: 6px; }
  }
`;

/* ─────────────────────────── AUTH STYLES ─────────────────────────── */
const AUTH_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=DM+Sans:wght@400;500;600;700;800&display=swap');

  .auth-overlay {
    position: fixed; inset: 0; z-index: 9999;
    display: flex; align-items: center; justify-content: center; padding: 16px;
    background: rgba(236,72,153,0.18);
    backdrop-filter: blur(16px);
    font-family: 'DM Sans', sans-serif;
  }
  @keyframes authIn {
    from { opacity:0; transform: scale(0.86) translateY(28px); }
    to   { opacity:1; transform: scale(1) translateY(0); }
  }
  .auth-card {
    animation: authIn 0.42s cubic-bezier(0.34,1.4,0.64,1) forwards;
    width: 100%; max-width: 420px;
    max-height: 92vh; overflow-y: auto; scrollbar-width: none;
    background: #ffffff; border-radius: 30px;
    border: 1.5px solid rgba(236,72,153,0.13);
    box-shadow: 0 4px 40px rgba(236,72,153,0.14), 0 24px 64px rgba(0,0,0,0.10);
    position: relative;
  }
  .auth-card::-webkit-scrollbar { display:none; }
  .auth-banner {
    padding: 30px 30px 22px;
    background: linear-gradient(150deg, #fff0f8 0%, #fce7f3 55%, #fdf4ff 100%);
    border-radius: 30px 30px 0 0;
    position: relative; overflow: hidden;
    border-bottom: 1px solid rgba(236,72,153,0.1);
  }
  .auth-banner-orb1 { position:absolute; top:-50px; right:-50px; width:180px; height:180px; border-radius:50%; background:radial-gradient(circle,rgba(244,114,182,0.22),transparent 70%); pointer-events:none; }
  .auth-banner-orb2 { position:absolute; bottom:-40px; left:-30px; width:140px; height:140px; border-radius:50%; background:radial-gradient(circle,rgba(192,132,252,0.18),transparent 70%); pointer-events:none; }
  @keyframes twinkle { 0%,100%{opacity:0;transform:scale(0)} 50%{opacity:1;transform:scale(1)} }
  @keyframes floatBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
  @keyframes gradRot { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  .auth-star { position:absolute; clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%); background:#f472b6; }
  .auth-star-a { width:5px;height:5px; top:16px; left:26px; opacity:.4; animation:twinkle 2.4s 0s infinite; }
  .auth-star-b { width:7px;height:7px; top:42px; right:52px; opacity:.3; animation:twinkle 2.4s .7s infinite; }
  .auth-star-c { width:4px;height:4px; bottom:14px; left:52%; opacity:.25; animation:twinkle 2.4s 1.4s infinite; }
  .auth-avatar-outer { position:relative; width:64px; height:64px; margin:0 auto 12px; animation:floatBob 4s ease-in-out infinite; z-index:1; }
  .auth-avatar-ring { position:absolute; inset:-3px; border-radius:50%; background:linear-gradient(135deg,#f472b6,#c084fc,#818cf8); background-size:300%; animation:gradRot 3s ease infinite; }
  @keyframes pulseRing { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(1.65);opacity:0} }
  .auth-avatar-pulse { position:absolute; inset:-3px; border-radius:50%; background:linear-gradient(135deg,#f472b6,#c084fc); animation:pulseRing 2.2s ease-out infinite; }
  .auth-avatar-face { position:absolute; inset:3px; border-radius:50%; background:linear-gradient(135deg,#fce7f3,#fff0fb); display:flex; align-items:center; justify-content:center; font-size:1.65rem; }
  .auth-title { font-family:'Cormorant Garamond',serif; font-size:1.75rem; font-weight:700; color:#1f1235; text-align:center; margin:0 0 3px; letter-spacing:-0.01em; position:relative; z-index:1; }
  .auth-title-accent { background:linear-gradient(90deg,#ec4899,#a855f7); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .auth-subtitle { text-align:center; color:#9ca3af; font-size:.76rem; font-weight:500; position:relative; z-index:1; }
  .auth-prog-track { height:3px; background:rgba(236,72,153,0.12); border-radius:99px; overflow:hidden; margin-top:18px; position:relative; z-index:1; }
  .auth-prog-fill { height:100%; background:linear-gradient(90deg,#f472b6,#a855f7); border-radius:99px; transition:width .55s cubic-bezier(.34,1.56,.64,1); box-shadow:0 0 8px rgba(244,114,182,.5); }
  .auth-prog-labels { display:flex; justify-content:space-between; margin-top:5px; font-size:.67rem; font-weight:600; color:#c4b5d0; position:relative; z-index:1; }
  .auth-prog-pct { color:#ec4899; }
  .auth-body { padding:24px 28px 28px; display:flex; flex-direction:column; gap:13px; background:#ffffff; border-radius:0 0 30px 30px; }
  @keyframes fadeSlide { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  .auth-field { position:relative; }
  .auth-field-1 { animation:fadeSlide .38s .04s ease both; }
  .auth-field-2 { animation:fadeSlide .38s .09s ease both; }
  .auth-field-3 { animation:fadeSlide .38s .14s ease both; }
  .auth-field-4 { animation:fadeSlide .38s .19s ease both; }
  .auth-label { display:block; font-size:.68rem; font-weight:700; color:#b0a0c0; letter-spacing:.1em; text-transform:uppercase; margin-bottom:6px; padding-left:2px; transition:color .2s; }
  .auth-field.focused .auth-label { color:#ec4899; }
  .auth-input-wrap { position:relative; display:flex; align-items:center; }
  .auth-icon { position:absolute; left:13px; font-size:.9rem; color:#d1b8d8; pointer-events:none; transition:color .22s; z-index:2; }
  .auth-field.focused .auth-icon { color:#ec4899; }
  .auth-input { width:100%; padding:13px 14px 13px 38px; background:#fdf8ff; border:1.5px solid #f0e6f6; border-radius:13px; color:#1f1235; font-size:.875rem; font-weight:500; font-family:'DM Sans',sans-serif; outline:none; transition:all .23s ease; caret-color:#ec4899; }
  .auth-input::placeholder { color:#d4c4df; }
  .auth-input:focus { background:#fff5fb; border-color:rgba(236,72,153,0.45); box-shadow:0 0 0 4px rgba(244,114,182,.09); }
  .auth-input.filled { border-color:rgba(168,85,247,0.3); background:#fdf5ff; }
  .auth-select { width:100%; padding:13px 36px 13px 38px; background:#fdf8ff; border:1.5px solid #f0e6f6; border-radius:13px; color:#1f1235; font-size:.875rem; font-weight:500; font-family:'DM Sans',sans-serif; outline:none; appearance:none; cursor:pointer; transition:all .23s ease; }
  .auth-select option { background:#fff; color:#1f1235; }
  .auth-select.empty { color:#d4c4df; }
  .auth-select:focus { background:#fff5fb; border-color:rgba(236,72,153,0.45); box-shadow:0 0 0 4px rgba(244,114,182,.09); }
  .auth-select.filled { border-color:rgba(168,85,247,0.3); }
  .auth-chevron { position:absolute; right:12px; color:#c4afd4; pointer-events:none; font-size:.8rem; }
  @keyframes checkPop { 0%{transform:scale(0) rotate(-20deg);opacity:0} 70%{transform:scale(1.2) rotate(4deg);opacity:1} 100%{transform:scale(1) rotate(0);opacity:1} }
  .auth-check { position:absolute; right:11px; width:19px; height:19px; border-radius:50%; background:linear-gradient(135deg,#f472b6,#a855f7); display:flex; align-items:center; justify-content:center; font-size:.58rem; color:white; font-weight:900; animation:checkPop .32s cubic-bezier(.34,1.56,.64,1) forwards; box-shadow:0 2px 9px rgba(244,114,182,.45); pointer-events:none; }
  .auth-eye { position:absolute; right:12px; color:#c4afd4; cursor:pointer; font-size:.88rem; transition:color .2s; z-index:2; }
  .auth-eye:hover { color:#ec4899; }
  .str-bars { display:flex; gap:4px; margin-top:7px; }
  .str-bar { flex:1; height:3px; border-radius:99px; background:#f0e6f6; transition:background .3s; }
  .str-row { display:flex; justify-content:space-between; margin-top:4px; font-size:.67rem; }
  .str-hint { color:#c4afd4; }
  .str-lbl { font-weight:700; }
  .auth-divider { display:flex; align-items:center; gap:10px; margin:2px 0; }
  .auth-div-line { flex:1; height:1px; background:#f0e4f7; }
  .auth-div-txt { font-size:.67rem; color:#c4afd4; font-weight:600; letter-spacing:.06em; white-space:nowrap; }
  .auth-socials { display:flex; gap:10px; }
  .auth-social-btn { flex:1; padding:10px 8px; border-radius:12px; border:1.5px solid #f0e6f6; background:#fdf8ff; color:#7c6d8a; font-size:.78rem; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:7px; transition:all .2s; font-family:'DM Sans',sans-serif; }
  .auth-social-btn:hover { background:#fff0fb; border-color:rgba(236,72,153,0.25); color:#ec4899; transform:translateY(-1px); box-shadow:0 4px 14px rgba(236,72,153,0.1); }
  @keyframes shimSlide { 0%{transform:translateX(-100%) skewX(-15deg)} 100%{transform:translateX(300%) skewX(-15deg)} }
  .auth-btn { width:100%; padding:14px 20px; border-radius:14px; border:none; font-family:'DM Sans',sans-serif; font-size:.9rem; font-weight:800; color:white; cursor:pointer; background:linear-gradient(135deg,#f472b6 0%,#ec4899 45%,#a855f7 100%); background-size:200% auto; position:relative; overflow:hidden; transition:all .3s cubic-bezier(.34,1.4,.64,1); box-shadow:0 8px 24px rgba(236,72,153,.35),0 2px 8px rgba(168,85,247,.2); letter-spacing:.02em; margin-top:4px; }
  .auth-btn::before { content:''; position:absolute; top:0; left:0; width:45%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent); transform:translateX(-100%) skewX(-15deg); }
  .auth-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(236,72,153,.45),0 4px 12px rgba(168,85,247,.25); }
  .auth-btn:hover::before { animation:shimSlide .8s ease forwards; }
  .auth-btn:active { transform:translateY(0) scale(.98); }
  .auth-forgot { text-align:right; font-size:.75rem; font-weight:600; color:#c4afd4; cursor:pointer; margin-top:-4px; transition:color .2s; }
  .auth-forgot:hover { color:#ec4899; }
  .auth-switch { text-align:center; font-size:.78rem; color:#9ca3af; font-weight:500; }
  .auth-switch-link { color:#ec4899; cursor:pointer; font-weight:700; border-bottom:1px solid transparent; transition:all .2s; }
  .auth-switch-link:hover { color:#a855f7; border-bottom-color:#a855f7; }
  .auth-terms { font-size:.67rem; color:#c4afd4; text-align:center; line-height:1.5; margin-top:-3px; }
  .auth-terms span { color:#ec4899; cursor:pointer; }
  .auth-terms span:hover { color:#a855f7; }
  .auth-close { position:absolute; top:13px; right:13px; width:31px; height:31px; border-radius:50%; border:none; background:rgba(236,72,153,0.1); color:#ec4899; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:1rem; transition:all .24s cubic-bezier(.34,1.56,.64,1); z-index:10; }
  .auth-close:hover { background:#ec4899; color:white; transform:rotate(90deg) scale(1.1); }
  .auth-remember { display:flex; align-items:center; gap:9px; cursor:pointer; }
  .auth-checkbox { width:16px; height:16px; border-radius:5px; border:1.5px solid #e8d5f0; background:#fdf8ff; display:flex; align-items:center; justify-content:center; transition:all .2s; flex-shrink:0; cursor:pointer; }
  .auth-checkbox.checked { background:linear-gradient(135deg,#f472b6,#a855f7); border-color:transparent; box-shadow:0 2px 8px rgba(244,114,182,.4); }
  .auth-remember-txt { font-size:.76rem; font-weight:500; color:#9ca3af; }
  @keyframes authSpin { to { transform: rotate(360deg); } }
`;

/* ── Notification Bell Badge Styles ── */
const BELL_BADGE_STYLES = `
  @keyframes bellRing {
    0%,100% { transform: rotate(0deg); }
    10%,30%,50%,70% { transform: rotate(-18deg); }
    20%,40%,60% { transform: rotate(18deg); }
    80% { transform: rotate(-8deg); }
  }
  @keyframes badgePop {
    0%   { transform: scale(0); opacity: 0; }
    60%  { transform: scale(1.4); opacity: 1; }
    100% { transform: scale(1);   opacity: 1; }
  }
  @keyframes badgePulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); }
    50%      { box-shadow: 0 0 0 4px rgba(239,68,68,0); }
  }
  .notif-bell-wrap {
    position: relative;
    display: flex; align-items: center; justify-content: center;
    width: 36px; height: 36px; border-radius: 11px;
    background: rgba(236,72,153,0.08);
    transition: all 0.25s ease; cursor: pointer; flex-shrink: 0;
  }
  .notif-bell-wrap:hover { background: rgba(236,72,153,0.16); transform: translateY(-1px); }
  .notif-bell-icon { font-size: 1.1rem; color: #6b7280; transition: color 0.2s; }
  .notif-bell-wrap:hover .notif-bell-icon { color: #ec4899; }
  .notif-bell-wrap.ringing { animation: bellRing 0.8s ease; }
  .notif-bell-wrap.ringing .notif-bell-icon { color: #ec4899; }
  .notif-badge {
    position: absolute; top: -5px; right: -5px;
    min-width: 17px; height: 17px; padding: 0 3px;
    background: #ef4444; color: white;
    font-size: 0.55rem; font-weight: 900;
    font-family: 'DM Sans', sans-serif;
    border-radius: 99px;
    display: flex; align-items: center; justify-content: center;
    border: 2px solid white;
    box-shadow: 0 2px 8px rgba(239,68,68,0.45);
    animation: badgePop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards,
               badgePulse 2s ease-in-out 0.35s infinite;
    pointer-events: none;
  }
`;

/* ─── Notification Bell Component ── */
function NotificationBell({ unreadCount = 0, isRinging = false, onClick }) {
  return (
    <>
      <style>{BELL_BADGE_STYLES}</style>
      <div
        className={`notif-bell-wrap ${isRinging ? "ringing" : ""}`}
        onClick={onClick}
        title={unreadCount > 0 ? `${unreadCount} unread notifications` : "Notifications"}
      >
        <BsBellFill className="notif-bell-icon" />
        {unreadCount > 0 && (
          <span key={unreadCount} className="notif-badge">
            {unreadCount > 99 ? "99+" : unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────── LOGIN MODAL ─────────────────────────── */
// ✅ onLoginSuccess is passed from Header so it can close modal + navigate
function LoginModal({ onClose, onSwitchToRegister, onLoginSuccess }) {
  const [showPw, setShowPw]   = useState(false);
  const [focused, setFocused] = useState("");
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]       = useState({ email: "", password: "" });

  const handleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("token", "user-token"); // ✅ save token
      setLoading(false);
      onLoginSuccess(); // ✅ close modal + navigate to /account (handled in Header)
    }, 1000);
  };

  return (
    <>
      <style>{AUTH_STYLES}</style>
      <div className="auth-overlay" onClick={onClose}>
        <div className="auth-card" onClick={e => e.stopPropagation()}>
          <div className="auth-banner">
            <div className="auth-banner-orb1"/><div className="auth-banner-orb2"/>
            <div className="auth-star auth-star-a"/><div className="auth-star auth-star-b"/><div className="auth-star auth-star-c"/>
            <button className="auth-close" onClick={onClose}>✕</button>
            <div className="auth-avatar-outer">
              <div className="auth-avatar-pulse"/><div className="auth-avatar-ring"/>
              <div className="auth-avatar-face">👋</div>
            </div>
            <h2 className="auth-title">Welcome <span className="auth-title-accent">Back</span></h2>
            <p className="auth-subtitle">Sign in to continue your journey</p>
          </div>
          <div className="auth-body">
            <div className="auth-socials">
              <button className="auth-social-btn"><FcGoogle size={15}/> Google</button>
              <button className="auth-social-btn"><FaFacebook size={15} style={{color:"#4a9eff"}}/> Facebook</button>
            </div>
            <div className="auth-divider">
              <div className="auth-div-line"/><span className="auth-div-txt">OR SIGN IN WITH EMAIL</span><div className="auth-div-line"/>
            </div>
            <div className={`auth-field auth-field-1 ${focused==="email"?"focused":""}`}>
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrap">
                <FiMail className="auth-icon"/>
                <input type="email" placeholder="you@example.com"
                  className={`auth-input ${form.email?"filled":""}`}
                  value={form.email}
                  onChange={e=>setForm(p=>({...p,email:e.target.value}))}
                  onFocus={()=>setFocused("email")} onBlur={()=>setFocused("")}
                />
                {form.email && form.email.includes("@") && <div className="auth-check">✓</div>}
              </div>
            </div>
            <div className={`auth-field auth-field-2 ${focused==="password"?"focused":""}`}>
              <label className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <FiLock className="auth-icon"/>
                <input type={showPw?"text":"password"} placeholder="Enter your password"
                  className={`auth-input ${form.password?"filled":""}`}
                  style={{paddingRight:"40px"}}
                  value={form.password}
                  onChange={e=>setForm(p=>({...p,password:e.target.value}))}
                  onFocus={()=>setFocused("password")} onBlur={()=>setFocused("")}
                />
                <span className="auth-eye" onClick={()=>setShowPw(s=>!s)}>{showPw?<FaEyeSlash/>:<FaEye/>}</span>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"-3px"}}>
              <label className="auth-remember" onClick={()=>setChecked(c=>!c)}>
                <div className={`auth-checkbox ${checked?"checked":""}`}>
                  {checked && <span style={{color:"white",fontSize:".6rem",fontWeight:900}}>✓</span>}
                </div>
                <span className="auth-remember-txt">Remember me</span>
              </label>
              <span className="auth-forgot">Forgot password?</span>
            </div>
            <button className="auth-btn" onClick={handleSignIn} disabled={loading} style={{opacity:loading?0.85:1}}>
              {loading ? (
                <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
                  <span style={{width:"16px",height:"16px",border:"2.5px solid rgba(255,255,255,0.4)",borderTopColor:"white",borderRadius:"50%",display:"inline-block",animation:"authSpin 0.7s linear infinite"}}/>
                  Signing in...
                </span>
              ) : "Sign In →"}
            </button>
            <p className="auth-switch">
              No account yet?{" "}
              <span className="auth-switch-link" onClick={onSwitchToRegister}>Create one →</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ────────────────────────── REGISTER MODAL ────────────────────────── */
// ✅ onLoginSuccess is passed here too so Register can also redirect after success
function RegisterModal({ onClose, onSwitchToLogin, onLoginSuccess }) {
  const [showPw, setShowPw]   = useState(false);
  const [focused, setFocused] = useState("");
  const [form, setForm]       = useState({ name:"", email:"", gender:"", password:"" });

  const filled = [form.name,form.email,form.gender,form.password].filter(Boolean).length;
  const progress = (filled/4)*100;

  const pwStrength = (() => {
    const p = form.password;
    if (!p) return null;
    const s = [p.length>=6,p.length>=10,/[A-Z]/.test(p),/[0-9]/.test(p),/[^a-zA-Z0-9]/.test(p)].filter(Boolean).length;
    if (s<=2) return { n:1, color:"#ef4444", label:"Weak" };
    if (s<=3) return { n:2, color:"#f59e0b", label:"Good" };
    return          { n:3, color:"#10b981", label:"Strong 🔥" };
  })();

  // ✅ On register success: save token, close modal, go to /account
  const handleRegister = () => {
    localStorage.setItem("token", "user-token");
    onLoginSuccess();
  };

  return (
    <>
      <style>{AUTH_STYLES}</style>
      <div className="auth-overlay" onClick={onClose}>
        <div className="auth-card" onClick={e => e.stopPropagation()}>
          <div className="auth-banner">
            <div className="auth-banner-orb1"/><div className="auth-banner-orb2"/>
            <div className="auth-star auth-star-a"/><div className="auth-star auth-star-b"/><div className="auth-star auth-star-c"/>
            <button className="auth-close" onClick={onClose}>✕</button>
            <div className="auth-avatar-outer">
              <div className="auth-avatar-pulse"/><div className="auth-avatar-ring"/>
              <div className="auth-avatar-face">🌸</div>
            </div>
            <h2 className="auth-title">Create <span className="auth-title-accent">Account</span></h2>
            <p className="auth-subtitle">Join thousands discovering amazing laptops</p>
            <div className="auth-prog-track">
              <div className="auth-prog-fill" style={{width:`${progress}%`}}/>
            </div>
            <div className="auth-prog-labels">
              <span>Profile completion</span>
              <span className="auth-prog-pct">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="auth-body">
            <div className="auth-socials">
              <button className="auth-social-btn"><FcGoogle size={15}/> Google</button>
              <button className="auth-social-btn"><FaFacebook size={15} style={{color:"#4a9eff"}}/> Facebook</button>
            </div>
            <div className="auth-divider">
              <div className="auth-div-line"/><span className="auth-div-txt">OR REGISTER WITH EMAIL</span><div className="auth-div-line"/>
            </div>
            <div className={`auth-field auth-field-1 ${focused==="name"?"focused":""}`}>
              <label className="auth-label">Full Name</label>
              <div className="auth-input-wrap">
                <FiUser className="auth-icon"/>
                <input type="text" placeholder="Jane Doe"
                  className={`auth-input ${form.name?"filled":""}`}
                  value={form.name}
                  onChange={e=>setForm(p=>({...p,name:e.target.value}))}
                  onFocus={()=>setFocused("name")} onBlur={()=>setFocused("")}
                />
                {form.name && <div className="auth-check">✓</div>}
              </div>
            </div>
            <div className={`auth-field auth-field-2 ${focused==="email"?"focused":""}`}>
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrap">
                <FiMail className="auth-icon"/>
                <input type="email" placeholder="jane@example.com"
                  className={`auth-input ${form.email?"filled":""}`}
                  value={form.email}
                  onChange={e=>setForm(p=>({...p,email:e.target.value}))}
                  onFocus={()=>setFocused("email")} onBlur={()=>setFocused("")}
                />
                {form.email && form.email.includes("@") && <div className="auth-check">✓</div>}
              </div>
            </div>
            <div className={`auth-field auth-field-3 ${focused==="gender"?"focused":""}`}>
              <label className="auth-label">Gender</label>
              <div className="auth-input-wrap">
                <span className="auth-icon" style={{fontSize:".82rem"}}>👤</span>
                <select className={`auth-select ${form.gender?"filled":"empty"}`}
                  value={form.gender}
                  onChange={e=>setForm(p=>({...p,gender:e.target.value}))}
                  onFocus={()=>setFocused("gender")} onBlur={()=>setFocused("")}
                >
                  <option value="" disabled>Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other / Prefer not to say</option>
                </select>
                <FiChevronDown className="auth-chevron"/>
                {form.gender && <div className="auth-check" style={{right:"30px"}}>✓</div>}
              </div>
            </div>
            <div className={`auth-field auth-field-4 ${focused==="password"?"focused":""}`}>
              <label className="auth-label">Password</label>
              <div className="auth-input-wrap">
                <FiLock className="auth-icon"/>
                <input type={showPw?"text":"password"} placeholder="Create a strong password"
                  className={`auth-input ${form.password?"filled":""}`}
                  style={{paddingRight:"40px"}}
                  value={form.password}
                  onChange={e=>setForm(p=>({...p,password:e.target.value}))}
                  onFocus={()=>setFocused("password")} onBlur={()=>setFocused("")}
                />
                <span className="auth-eye" onClick={()=>setShowPw(s=>!s)}>{showPw?<FaEyeSlash/>:<FaEye/>}</span>
              </div>
              {pwStrength && (
                <>
                  <div className="str-bars">
                    {[1,2,3].map(i=>(
                      <div key={i} className="str-bar" style={{background:i<=pwStrength.n?pwStrength.color:"rgba(0,0,0,.06)"}}/>
                    ))}
                  </div>
                  <div className="str-row">
                    <span className="str-hint">8+ chars, numbers & symbols</span>
                    <span className="str-lbl" style={{color:pwStrength.color}}>{pwStrength.label}</span>
                  </div>
                </>
              )}
            </div>
            {/* ✅ CHANGED: calls handleRegister instead of onSwitchToLogin */}
            <button className="auth-btn" onClick={handleRegister}>Create My Account ✨</button>
            <p className="auth-terms">
              By registering you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span>
            </p>
            <p className="auth-switch">
              Already a member?{" "}
              <span className="auth-switch-link" onClick={onSwitchToLogin}>Sign in →</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────── HEADER ─────────────────────────── */
function Header({ cartCount = [], unreadNotifCount = 0 }) {
  const [authMode, setAuthMode] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bellRing, setBellRing] = useState(false);
  const prevCount = useRef(unreadNotifCount);
  const location  = useLocation();
  const navigate  = useNavigate();

  // ✅ check login state
  const isLoggedIn = !!localStorage.getItem("token");

  // Ring bell when new notification arrives
  useEffect(() => {
    if (unreadNotifCount > prevCount.current) {
      setBellRing(true);
      const t = setTimeout(() => setBellRing(false), 900);
      return () => clearTimeout(t);
    }
    prevCount.current = unreadNotifCount;
  }, [unreadNotifCount]);

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const closeAll = () => {
    setMenuOpen(false);
    setAuthMode(null); // ✅ this closes the modal
  };

  // ✅ Called when login or register succeeds:
  // 1. closes modal (setAuthMode null)
  // 2. navigates to /account
  const handleLoginSuccess = () => {
    setAuthMode(null);   // close modal first
    setMenuOpen(false);  // close mobile drawer if open
    navigate("/account"); // then navigate
  };

  // ✅ Account click: go to account if logged in, else show login modal
  const handleAccountClick = () => {
    if (isLoggedIn) {
      navigate("/account");
    } else {
      setAuthMode("login");
    }
  };

  return (
    <>
      <style>{RESPONSIVE_STYLES}</style>

      <header className="hdr-root">

        {/* ── Logo ── */}
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img src={logo} className="h-25 " alt="Laptop Store Logo" />
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hdr-nav">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`hdr-nav-link ${location.pathname === l.to ? "active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop Actions ── */}
        <div className="hdr-actions">
          <Link to="/cart" className="hdr-cart">
            <MdOutlineShoppingCart style={{fontSize:"1.4rem"}} />
            {cartCount.length > 0 && (
              <span className="hdr-cart-badge">{cartCount.length}</span>
            )}
          </Link>

          <NotificationBell
            unreadCount={unreadNotifCount}
            isRinging={bellRing}
            onClick={() => navigate("/notifications")}
          />

          {/* ✅ Account: div instead of Link, guarded by handleAccountClick */}
          <div className="hdr-account" onClick={handleAccountClick}>
            <CgProfile style={{fontSize:"1.3rem"}} />
            <span className="hdr-account-label">Account</span>
          </div>

          <LoginButton onClick={() => setAuthMode("login")} />
        </div>

        {/* ── Mobile Controls ── */}
        <div className="hdr-mobile-controls">
          <Link to="/cart" className="hdr-cart">
            <MdOutlineShoppingCart style={{fontSize:"1.35rem"}} />
            {cartCount.length > 0 && (
              <span className="hdr-cart-badge">{cartCount.length}</span>
            )}
          </Link>

          <NotificationBell
            unreadCount={unreadNotifCount}
            isRinging={bellRing}
            onClick={() => { setMenuOpen(false); navigate("/notifications"); }}
          />

          <button
            className="hdr-menu-btn"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: menuOpen
                ? "linear-gradient(135deg,#f472b6,#ec4899)"
                : "rgba(236,72,153,0.1)"
            }}
          >
            <span
              key={menuOpen ? "close" : "open"}
              className="menu-icon-anim"
              style={{ color: menuOpen ? "white" : "#ec4899", fontSize: "1.3rem", display: "flex" }}
            >
              {menuOpen ? <IoClose /> : <IoMenu />}
            </span>
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {menuOpen && (
        <>
          <div className="hdr-drawer-overlay" onClick={() => setMenuOpen(false)} />
          <div className="hdr-drawer">
            <div className="hdr-drawer-nav">
              {navLinks.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`mob-link ${location.pathname === l.to ? "active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span style={{fontSize:"1.15rem"}}>{l.icon}</span>
                  {l.label}
                  {location.pathname === l.to && <span className="mob-link-dot" />}
                </Link>
              ))}
            </div>

            <div className="hdr-drawer-divider" />

            <div className="hdr-drawer-actions">
              <div
                className="mob-link"
                onClick={() => { setMenuOpen(false); navigate("/notifications"); }}
                style={{ justifyContent: "space-between" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <BsBellFill style={{ fontSize: "1.1rem" }} />
                  Notifications
                </div>
                {unreadNotifCount > 0 && (
                  <span style={{
                    background: "#ef4444", color: "white",
                    fontSize: ".6rem", fontWeight: 900,
                    minWidth: 18, height: 18, padding: "0 4px",
                    borderRadius: 99, display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(239,68,68,0.4)"
                  }}>
                    {unreadNotifCount > 9 ? "9+" : unreadNotifCount}
                  </span>
                )}
              </div>

              {/* ✅ Mobile Account: guarded by handleAccountClick */}
              <div
                className="mob-link"
                onClick={() => { setMenuOpen(false); handleAccountClick(); }}
              >
                <CgProfile style={{ fontSize: "1.15rem" }} />
                My Account
              </div>

              <div style={{ padding: "4px 6px 6px" }}>
                <LoginButton
                  onClick={() => { setMenuOpen(false); setAuthMode("login"); }}
                  style={{ width: "100%", justifyContent: "center" }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Auth Modals ── */}
      {authMode === "login" && (
        <LoginModal
          onClose={closeAll}
          onSwitchToRegister={() => setAuthMode("register")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {authMode === "register" && (
        <RegisterModal
          onClose={closeAll}
          onSwitchToLogin={() => setAuthMode("login")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}

export default Header;
export { NotificationBell };
