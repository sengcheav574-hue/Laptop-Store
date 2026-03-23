import { useState, useEffect, useRef } from "react";
import { MdOutlineClear } from "react-icons/md";
import { BsBellFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { FiX } from "react-icons/fi";

/* ─── Simulated incoming notifications ───────────────────────── */
const INCOMING_POOL = [
  { type: "deal",     icon: "⚡", color: "#ec4899", bg: "#fdf2f8", title: "Limited Deal!", body: "ASUS ROG Strix G16 — 20% off for the next 2 hours only." },
  { type: "delivery", icon: "🚚", color: "#3b82f6", bg: "#eff6ff", title: "Out for Delivery", body: "Your Lenovo Legion 5 is out for delivery today!" },
  { type: "order",    icon: "📦", color: "#22c55e", bg: "#f0fdf4", title: "Order Placed ✅", body: "Order LPT-2025-007 confirmed. Total: $1,350." },
  { type: "deal",     icon: "🎉", color: "#a855f7", bg: "#faf5ff", title: "Weekend Sale Live!", body: "Up to 40% off selected gaming laptops this weekend." },
  { type: "info",     icon: "🔒", color: "#f59e0b", bg: "#fffbeb", title: "Security Alert", body: "New login detected from Phnom Penh, Cambodia." },
];

const FILTERS = ["All", "Unread", "Delivery", "Deals", "Orders"];

const filters_map = {
  "All":      ()  => true,
  "Unread":   n   => !n.read,
  "Delivery": n   => n.type === "delivery",
  "Deals":    n   => n.type === "deal",
  "Orders":   n   => n.type === "order",
};

/* ─── Toast component ────────────────────────────────────────── */
function Toast({ notif, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="toast-card">
      <div className="toast-icon-wrap" style={{ background: notif.bg, color: notif.color }}>
        <span>{notif.icon}</span>
      </div>
      <div className="toast-body">
        <p className="toast-title">{notif.title}</p>
        <p className="toast-sub">{notif.body}</p>
      </div>
      <button className="toast-close" onClick={onClose}><FiX size={13} /></button>
      <div className="toast-progress" />
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
/**
 * Props:
 *   notifs    {array}    — notifications array from App-level state
 *   setNotifs {function} — setter from App-level state
 *
 * This keeps the bell badge in Header perfectly in sync:
 * any read/dismiss here immediately updates the unreadCount
 * that Header receives as `unreadNotifCount`.
 */
export default function NotificationsPage({ notifs, setNotifs }) {
  const [filter, setFilter]     = useState("All");
  const [toasts, setToasts]     = useState([]);
  const [bellAnim, setBellAnim] = useState(false);
  const incomingIdx = useRef(0);
  const nextId = useRef(100);

  /* Simulate incoming notifications every 8s */
  useEffect(() => {
    const interval = setInterval(() => {
      const pool = INCOMING_POOL[incomingIdx.current % INCOMING_POOL.length];
      incomingIdx.current++;
      const newNotif = { ...pool, id: nextId.current++, read: false, time: "Just now" };

      // Add to shared notification list → also increments badge in Header
      setNotifs(prev => [newNotif, ...prev]);

      // Trigger bell animation
      setBellAnim(true);
      setTimeout(() => setBellAnim(false), 1000);

      // Show toast
      const toastId = Date.now();
      setToasts(prev => [...prev, { ...newNotif, toastId }]);
    }, 8000);

    return () => clearInterval(interval);
  }, [setNotifs]);

  const unreadCount = notifs.filter(n => !n.read).length;
  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const dismiss     = (id) => setNotifs(n => n.filter(x => x.id !== id));
  const markRead    = (id) => setNotifs(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  const dismissToast = (toastId) => setToasts(prev => prev.filter(t => t.toastId !== toastId));

  const filtered = notifs.filter(filters_map[filter] || (() => true));

  return (
    <>
      <style>{PAGE_STYLES}</style>

      {/* ── Toast stack ── */}
      <div className="toast-stack">
        {toasts.map(t => (
          <Toast key={t.toastId} notif={t} onClose={() => dismissToast(t.toastId)} />
        ))}
      </div>

      <div className="notifs-page">
        <div className="notifs-inner">

          {/* ── Header ── */}
          <div className="notifs-header" style={{ animationDelay: "0s" }}>
            <div className="notifs-header-left">
              <div className={`bell-wrap ${bellAnim ? "bell-ring" : ""}`}>
                <BsBellFill className="bell-icon" />
                {unreadCount > 0 && (
                  <span className="bell-badge">{unreadCount > 9 ? "9+" : unreadCount}</span>
                )}
              </div>
              <div>
                <h1 className="notifs-title">Notifications</h1>
                <p className="notifs-subtitle">
                  {unreadCount > 0
                    ? <><span className="unread-dot-inline" />{unreadCount} unread</>
                    : "You're all caught up ✓"}
                </p>
              </div>
            </div>

            {unreadCount > 0 && (
              <button className="mark-all-btn" onClick={markAllRead}>
                <HiSparkles /> Mark all read
              </button>
            )}
          </div>

          {/* ── Filter bar ── */}
          <div className="filter-row" style={{ animationDelay: "0.08s" }}>
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-pill ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
                {f === "Unread" && unreadCount > 0 && (
                  <span className={`filter-count ${filter === "Unread" ? "light" : ""}`}>
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── Notification list ── */}
          {filtered.length === 0 ? (
            <div className="notifs-empty">
              <div className="empty-icon">🔔</div>
              <h3 className="empty-title">All caught up!</h3>
              <p className="empty-sub">No notifications in this category.</p>
            </div>
          ) : (
            <div className="notifs-list">
              {filtered.map((n, i) => (
                <div
                  key={n.id}
                  className={`notif-card ${!n.read ? "unread" : ""}`}
                  style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                  onClick={() => markRead(n.id)}
                >
                  {!n.read && <div className="unread-bar" />}
                  <div className="notif-icon-wrap" style={{ background: n.bg, color: n.color }}>
                    <span className="notif-emoji">{n.icon}</span>
                  </div>
                  <div className="notif-content">
                    <div className="notif-title-row">
                      <span className={`notif-title-text ${!n.read ? "bold" : ""}`}>{n.title}</span>
                      {!n.read && <span className="unread-dot" />}
                    </div>
                    <p className="notif-body">{n.body}</p>
                    <p className="notif-time">{n.time}</p>
                  </div>
                  <button
                    className="notif-dismiss"
                    onClick={e => { e.stopPropagation(); dismiss(n.id); }}
                    title="Dismiss"
                  >
                    <MdOutlineClear size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ─── Styles ─────────────────────────────────────────────────── */
const PAGE_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

  .toast-stack {
    position: fixed; top: 80px; right: 20px; z-index: 9999;
    display: flex; flex-direction: column; gap: 10px; pointer-events: none;
  }

  @keyframes toastIn {
    from { opacity: 0; transform: translateX(110%) scale(0.92); }
    to   { opacity: 1; transform: translateX(0)   scale(1); }
  }
  @keyframes toastProgress {
    from { width: 100%; } to { width: 0%; }
  }

  .toast-card {
    pointer-events: all; width: 320px; background: white;
    border-radius: 18px; border: 1.5px solid rgba(236,72,153,0.12);
    padding: 14px; display: flex; align-items: flex-start; gap: 11px;
    box-shadow: 0 12px 40px rgba(236,72,153,0.18), 0 4px 12px rgba(0,0,0,0.06);
    animation: toastIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards;
    position: relative; overflow: hidden;
  }
  .toast-icon-wrap {
    width: 38px; height: 38px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; flex-shrink: 0;
  }
  .toast-body { flex: 1; min-width: 0; }
  .toast-title {
    font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.83rem;
    color: #1f2937; margin: 0 0 2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .toast-sub {
    font-family: 'Nunito', sans-serif; font-size: 0.72rem; color: #6b7280; font-weight: 600;
    line-height: 1.4;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  .toast-close {
    background: #f3f4f6; border: none; border-radius: 50%;
    width: 22px; height: 22px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; color: #6b7280; flex-shrink: 0; transition: all 0.2s;
  }
  .toast-close:hover { background: #fee2e2; color: #ef4444; }
  .toast-progress {
    position: absolute; bottom: 0; left: 0; height: 3px;
    background: linear-gradient(90deg, #f472b6, #ec4899);
    border-radius: 0 0 18px 18px;
    animation: toastProgress 4.5s linear forwards;
  }

  @keyframes bellRing {
    0%,100% { transform: rotate(0deg); }
    10%,30%,50%,70% { transform: rotate(-18deg); }
    20%,40%,60% { transform: rotate(18deg); }
    80% { transform: rotate(-8deg); }
  }
  @keyframes badgePop {
    0%   { transform: scale(0); }
    70%  { transform: scale(1.3); }
    100% { transform: scale(1); }
  }

  .bell-wrap {
    position: relative; width: 52px; height: 52px;
    background: linear-gradient(135deg,#f472b6,#ec4899);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 6px 20px rgba(236,72,153,0.45); flex-shrink: 0;
  }
  .bell-ring { animation: bellRing 0.8s ease; }
  .bell-icon { color: white; font-size: 1.3rem; }
  .bell-badge {
    position: absolute; top: -6px; right: -6px;
    background: #ef4444; color: white;
    font-family: 'Nunito', sans-serif; font-size: 0.6rem; font-weight: 900;
    min-width: 18px; height: 18px; padding: 0 4px;
    border-radius: 99px; display: flex; align-items: center; justify-content: center;
    border: 2px solid white; box-shadow: 0 2px 8px rgba(239,68,68,0.4);
    animation: badgePop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards;
  }

  .notifs-page {
    min-height: 100vh;
    background: linear-gradient(160deg, #fff0f6 0%, #fdf2f8 50%, #fff5f9 100%);
    font-family: 'Nunito', sans-serif; padding: 40px 5% 80px;
  }
  .notifs-inner { max-width: 720px; margin: 0 auto; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .notifs-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 24px; flex-wrap: wrap; gap: 14px;
    animation: fadeUp 0.4s ease both;
  }
  .notifs-header-left { display: flex; align-items: center; gap: 14px; }
  .notifs-title { font-size: 1.75rem; font-weight: 900; color: #1f2937; margin: 0; letter-spacing: -0.02em; }
  .notifs-subtitle { font-size: 0.78rem; font-weight: 700; color: #6b7280; margin: 2px 0 0; display: flex; align-items: center; gap: 5px; }

  .unread-dot-inline {
    display: inline-block; width: 7px; height: 7px;
    background: #ec4899; border-radius: 50%; animation: pulse 1.5s infinite;
  }
  @keyframes pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(236,72,153,0.4); }
    50%      { box-shadow: 0 0 0 5px rgba(236,72,153,0); }
  }

  .mark-all-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 9px 20px; border-radius: 50px;
    border: 1.5px solid rgba(236,72,153,0.25);
    background: white; color: #ec4899;
    font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.8rem;
    cursor: pointer; transition: all 0.25s ease;
    box-shadow: 0 2px 10px rgba(236,72,153,0.08);
  }
  .mark-all-btn:hover {
    background: #fff0f6; border-color: #ec4899;
    box-shadow: 0 4px 16px rgba(236,72,153,0.18); transform: translateY(-1px);
  }

  .filter-row {
    display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;
    margin-bottom: 22px; scrollbar-width: none; animation: fadeUp 0.4s ease both;
  }
  .filter-row::-webkit-scrollbar { display: none; }
  .filter-pill {
    display: flex; align-items: center; gap: 5px;
    padding: 8px 18px; border-radius: 50px;
    border: 1.5px solid rgba(236,72,153,0.18);
    background: white; color: #6b7280;
    font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 0.8rem;
    cursor: pointer; transition: all 0.25s ease;
    white-space: nowrap; flex-shrink: 0;
  }
  .filter-pill:hover { border-color: #ec4899; color: #ec4899; }
  .filter-pill.active {
    background: linear-gradient(135deg, #f472b6, #ec4899);
    border-color: transparent; color: white;
    box-shadow: 0 4px 14px rgba(236,72,153,0.4);
  }
  .filter-count {
    background: rgba(236,72,153,0.12); color: #ec4899;
    border-radius: 99px; padding: 1px 6px; font-size: 0.65rem; font-weight: 900;
  }
  .filter-count.light { background: rgba(255,255,255,0.25); color: white; }

  .notifs-list { display: flex; flex-direction: column; gap: 10px; }
  .notif-card {
    background: white; border-radius: 18px;
    border: 1.5px solid rgba(236,72,153,0.07);
    padding: 16px 16px 16px 18px;
    display: flex; align-items: flex-start; gap: 13px;
    cursor: pointer; transition: all 0.28s ease;
    box-shadow: 0 2px 10px rgba(0,0,0,0.04);
    animation: fadeUp 0.4s ease both; position: relative; overflow: hidden;
  }
  .notif-card.unread {
    background: linear-gradient(135deg, #fff8fb, white);
    border-color: rgba(236,72,153,0.15);
  }
  .notif-card:hover {
    border-color: rgba(236,72,153,0.3);
    box-shadow: 0 8px 28px rgba(236,72,153,0.13);
    transform: translateX(5px);
  }

  .unread-bar {
    position: absolute; left: 0; top: 12px; bottom: 12px; width: 3.5px;
    background: linear-gradient(to bottom, #f472b6, #ec4899);
    border-radius: 0 3px 3px 0;
  }

  .notif-icon-wrap {
    width: 46px; height: 46px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .notif-emoji { font-size: 1.25rem; }
  .notif-content { flex: 1; min-width: 0; }
  .notif-title-row { display: flex; align-items: center; gap: 7px; margin-bottom: 3px; }
  .notif-title-text { font-size: 0.88rem; color: #1f2937; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .notif-title-text.bold { font-weight: 900; }
  .unread-dot {
    width: 7px; height: 7px; background: #ec4899; border-radius: 50%;
    flex-shrink: 0; box-shadow: 0 0 0 2px rgba(236,72,153,0.2); animation: pulse 1.8s infinite;
  }
  .notif-body { font-size: 0.78rem; color: #6b7280; font-weight: 600; line-height: 1.55; margin: 0 0 5px; }
  .notif-time { font-size: 0.7rem; color: #9ca3af; font-weight: 700; margin: 0; }

  .notif-dismiss {
    width: 28px; height: 28px; border-radius: 50%;
    border: 1.5px solid #e5e7eb; background: white;
    color: #9ca3af; display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0; margin-left: auto; transition: all 0.2s ease;
  }
  .notif-dismiss:hover { background: #fee2e2; border-color: #f87171; color: #ef4444; }

  .notifs-empty { text-align: center; padding: 80px 20px; animation: fadeUp 0.4s ease; }
  .empty-icon { font-size: 4rem; margin-bottom: 12px; }
  .empty-title { font-weight: 900; color: #1f2937; font-size: 1.2rem; margin: 0 0 6px; }
  .empty-sub { color: #9ca3af; font-weight: 600; font-size: 0.85rem; }

  @media (max-width: 480px) {
    .toast-card { width: calc(100vw - 32px); }
    .toast-stack { right: 16px; left: 16px; }
    .notifs-page { padding: 24px 4% 60px; }
    .notifs-title { font-size: 1.4rem; }
  }
`;
