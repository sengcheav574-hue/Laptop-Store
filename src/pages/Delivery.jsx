import { useState, useEffect } from "react";
import { MdLocalShipping, MdInventory, MdCheckCircle, MdOutlineQrCode } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";

const stepIcons = [
  <MdInventory />,
  <FiPackage />,
  <MdLocalShipping />,
  <HiLocationMarker />,
  <MdCheckCircle />,
];

const STEPS = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

// Fallback demo orders shown when no real orders exist yet
const DEMO_ORDERS = [
  {
    id: "LPT-2024-001",
    items: [{ title: "MSI Katana 17 B13VEK", price: 1200, qty: 1, image: "https://storage-asset.msi.com/global/picture/product/product_17453875563e17f33fdf5d6848a9796baf44abb506.png" }],
    total: 1200,
    status: 3,
    eta: "Mar 12, 2025",
    placedAt: "2025-03-08T10:00:00.000Z",
    steps: STEPS,
    isDemo: true,
  },
  {
    id: "LPT-2024-002",
    items: [{ title: "MacBook Air M2", price: 1300, qty: 1, image: "https://10bestbuddy.com/_next/image/?url=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F41oh6tjXAoL._SL500_.jpg&w=384&q=75" }],
    total: 1300,
    status: 2,
    eta: "Mar 14, 2025",
    placedAt: "2025-03-09T10:00:00.000Z",
    steps: STEPS,
    isDemo: true,
  },
];

export default function DeliveryPage() {
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);
  const [trackInput, setTrackInput] = useState("");
  const [trackError, setTrackError] = useState(false);

  // Load orders from sessionStorage on mount
  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("orders") || "[]");
    const allOrders = stored.length > 0 ? stored : DEMO_ORDERS;
    setOrders(allOrders);

    // Auto-select the latest order if coming from payment
    const latestId = sessionStorage.getItem("latestOrderId");
    if (latestId && stored.length > 0) {
      const latest = stored.find(o => o.id === latestId);
      setActiveOrder(latest || stored[0]);
    } else {
      setActiveOrder(allOrders[0]);
    }
  }, []);

  const handleTrack = () => {
    const found = orders.find(o => o.id.toLowerCase() === trackInput.trim().toLowerCase());
    if (found) {
      setActiveOrder(found);
      setTrackError(false);
    } else {
      setTrackError(true);
    }
  };

  if (!activeOrder) return null;

  // Get first item image for display
  const firstItem = activeOrder.items?.[0];
  const displayImage = firstItem?.image;
  const displayTitle = activeOrder.items?.length === 1
    ? firstItem?.title
    : `${firstItem?.title} +${activeOrder.items.length - 1} more`;

  return (
    <>
      <style>{`
        .delivery-page {
          min-height: 100vh;
          background: linear-gradient(160deg, #fff0f6 0%, #fdf2f8 50%, #fff5f9 100%);
          padding: 40px 5%;
        }

        .track-bar {
          background: white;
          border-radius: 20px;
          border: 1px solid rgba(236,72,153,0.12);
          padding: 24px 28px;
          box-shadow: 0 4px 20px rgba(236,72,153,0.08);
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 32px;
          animation: fadeUp 0.4s ease;
        }
        .track-input {
          flex: 1;
          min-width: 200px;
          border: 1.5px solid rgba(236,72,153,0.25);
          border-radius: 50px;
          padding: 12px 22px;
          font-size: 0.9rem;
          outline: none;
          background: #fff0f6;
          color: #374151;
          transition: border-color 0.25s;
        }
        .track-input:focus { border-color: #ec4899; background: white; }
        .track-input::placeholder { color: #d1d5db; }

        .track-btn {
          background: linear-gradient(135deg, #f472b6, #ec4899);
          color: white; border: none; border-radius: 50px;
          padding: 12px 28px; font-weight: 800; cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(236,72,153,0.35);
          white-space: nowrap;
        }
        .track-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(236,72,153,0.5); }

        .order-card {
          background: white; border-radius: 18px;
          border: 2px solid transparent; padding: 16px;
          display: flex; align-items: center; gap: 14px;
          cursor: pointer; transition: all 0.25s ease;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04); margin-bottom: 12px;
        }
        .order-card:hover { border-color: rgba(236,72,153,0.3); transform: translateX(4px); }
        .order-card.active { border-color: #ec4899; box-shadow: 0 4px 20px rgba(236,72,153,0.2); background: #fff0f6; }

        .new-badge {
          display: inline-block; background: linear-gradient(135deg,#f472b6,#c084fc);
          color: white; font-size: 0.6rem; font-weight: 800;
          padding: 2px 7px; border-radius: 99px; margin-left: 6px;
          text-transform: uppercase; letter-spacing: 0.05em;
          vertical-align: middle;
        }

        .timeline {
          background: white; border-radius: 24px;
          border: 1px solid rgba(236,72,153,0.1);
          padding: 32px;
          box-shadow: 0 4px 24px rgba(236,72,153,0.08);
          animation: fadeUp 0.5s ease;
        }

        .step-row {
          display: flex; align-items: flex-start;
          gap: 16px; position: relative;
        }
        .step-row:not(:last-child)::after {
          content: ''; position: absolute;
          left: 22px; top: 48px; width: 2px;
          height: calc(100% - 12px); border-radius: 2px;
        }
        .step-row.done::after  { background: linear-gradient(to bottom, #ec4899, #f9a8d4); }
        .step-row.todo::after  { background: #e5e7eb; }

        .step-icon {
          width: 44px; height: 44px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; flex-shrink: 0; position: relative; z-index: 1;
          transition: all 0.3s ease;
        }
        .step-icon.done    { background: linear-gradient(135deg, #f472b6, #ec4899); color: white; box-shadow: 0 4px 14px rgba(236,72,153,0.4); }
        .step-icon.current { background: linear-gradient(135deg, #f472b6, #ec4899); color: white; box-shadow: 0 0 0 6px rgba(236,72,153,0.18); animation: pulse 2s infinite; }
        .step-icon.todo    { background: #f3f4f6; color: #9ca3af; }

        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 6px rgba(236,72,153,0.18); }
          50%      { box-shadow: 0 0 0 10px rgba(236,72,153,0.08); }
        }

        .step-content { padding-bottom: 28px; flex: 1; }
        .step-label.done    { color: #1f2937; font-weight: 800; }
        .step-label.current { color: #ec4899; font-weight: 900; }
        .step-label.todo    { color: #9ca3af; font-weight: 600; }

        /* Order items list inside timeline */
        .order-items-strip {
          display: flex; gap: 8px; flex-wrap: wrap;
          background: #fdf5ff; border-radius: 14px;
          padding: 12px 14px; margin-bottom: 24px;
          border: 1px solid rgba(236,72,153,0.08);
        }
        .order-item-chip {
          display: flex; align-items: center; gap: 8px;
          background: white; border-radius: 10px; padding: 6px 10px;
          border: 1px solid rgba(236,72,153,0.1);
          font-size: 0.75rem; font-weight: 600; color: #374151;
        }
        .order-item-chip img { width: 28px; height: 28px; object-fit: contain; }

        .map-card {
          background: linear-gradient(135deg, #fff0f6, #fce7f3);
          border-radius: 20px; border: 1px solid rgba(236,72,153,0.15);
          height: 180px; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 8px;
          color: #ec4899; font-weight: 700; margin-top: 20px;
        }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }

        @media(max-width:768px) {
          .delivery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="delivery-page">
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>

          {/* Page title */}
          <div style={{ marginBottom:"28px" }}>
            <h1 style={{ fontSize:"2rem", fontWeight:900, color:"#1f2937" }}>Track Your Order</h1>
            <p style={{ color:"#9ca3af", fontWeight:600, marginTop:"4px" }}>Real-time delivery updates for your purchases</p>
          </div>

          {/* Track bar */}
          <div className="track-bar">
            <MdOutlineQrCode style={{ fontSize:"1.5rem", color:"#ec4899", flexShrink:0 }} />
            <input
              className="track-input"
              placeholder="Enter order ID (e.g. LPT-123456)"
              value={trackInput}
              onChange={e => setTrackInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleTrack()}
            />
            <button className="track-btn" onClick={handleTrack}>Track Order</button>
            {trackError && trackInput && (
              <p style={{ color:"#ef4444", fontSize:"0.8rem", fontWeight:700, width:"100%" }}>
                ⚠️ Order not found. Try one of your order IDs below.
              </p>
            )}
          </div>

          <div className="delivery-grid" style={{ display:"grid", gridTemplateColumns:"300px 1fr", gap:"24px", alignItems:"start" }}>

            {/* Order list */}
            <div>
              <p style={{ fontSize:"0.75rem", fontWeight:800, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"12px" }}>
                Your Orders ({orders.length})
              </p>
              {orders.map(order => {
                const img = order.items?.[0]?.image;
                const isNew = !order.isDemo;
                return (
                  <div
                    key={order.id}
                    className={`order-card ${activeOrder.id === order.id ? "active" : ""}`}
                    onClick={() => setActiveOrder(order)}
                  >
                    <div style={{ width:52, height:52, background:"linear-gradient(135deg,#fff0f6,#fce7f3)", borderRadius:"12px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, overflow:"hidden" }}>
                      {img ? (
                        <img src={img} alt="" style={{ width:42, height:42, objectFit:"contain" }} />
                      ) : (
                        <span style={{ fontSize:"1.4rem" }}>📦</span>
                      )}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontWeight:800, fontSize:"0.85rem", color:"#1f2937", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {order.items?.length === 1
                          ? order.items[0].title.split(" ").slice(0,3).join(" ")
                          : `${order.items[0].title.split(" ")[0]} +${order.items.length - 1} more`}
                        {isNew && <span className="new-badge">New</span>}
                      </p>
                      <p style={{ fontSize:"0.72rem", color:"#9ca3af", fontWeight:600 }}>#{order.id}</p>
                      <p style={{ fontSize:"0.72rem", color:"#ec4899", fontWeight:700, marginTop:"2px" }}>ETA: {order.eta}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Timeline panel */}
            <div className="timeline">
              {/* Header */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"20px", flexWrap:"wrap", gap:"12px" }}>
                <div>
                  <p style={{ fontSize:"0.72rem", fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.08em" }}>Tracking</p>
                  <h2 style={{ fontWeight:900, fontSize:"1.2rem", color:"#1f2937" }}>
                    {activeOrder.items?.length === 1
                      ? activeOrder.items[0].title.split(" ").slice(0,4).join(" ")
                      : `Order #${activeOrder.id}`}
                  </h2>
                  <p style={{ fontSize:"0.8rem", color:"#9ca3af", fontWeight:600 }}>#{activeOrder.id}</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ fontSize:"0.72rem", fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:"0.06em" }}>Estimated Arrival</p>
                  <p style={{ fontWeight:900, color:"#ec4899", fontSize:"1.1rem" }}>{activeOrder.eta}</p>
                  <p style={{ fontSize:"0.78rem", fontWeight:700, color:"#6b7280", marginTop:"2px" }}>Total: <span style={{color:"#ec4899"}}>${activeOrder.total?.toLocaleString()}</span></p>
                </div>
              </div>

              {/* Items in this order */}
              {activeOrder.items && activeOrder.items.length > 0 && (
                <div className="order-items-strip">
                  {activeOrder.items.map((item, i) => (
                    <div className="order-item-chip" key={i}>
                      <img src={item.image} alt={item.title} />
                      <span>{item.title.split(" ").slice(0,3).join(" ")} ×{item.qty || 1}</span>
                      <span style={{color:"#ec4899", fontWeight:700}}>${(item.price * (item.qty||1)).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Steps */}
              <div>
                {(activeOrder.steps || STEPS).map((step, i) => {
                  const state = i < activeOrder.status ? "done" : i === activeOrder.status ? "current" : "todo";
                  return (
                    <div key={i} className={`step-row ${state}`}>
                      <div className={`step-icon ${state}`}>{stepIcons[i]}</div>
                      <div className="step-content">
                        <p className={`step-label ${state}`} style={{ fontSize:"0.95rem" }}>{step}</p>
                        {state === "current" && (
                          <p style={{ fontSize:"0.78rem", color:"#ec4899", fontWeight:600, marginTop:"2px" }}>In progress...</p>
                        )}
                        {state === "done" && (
                          <p style={{ fontSize:"0.75rem", color:"#9ca3af", fontWeight:600, marginTop:"2px" }}>Completed ✓</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <div className="map-card">
                <HiLocationMarker style={{ fontSize:"2rem" }} />
                <p style={{ fontSize:"0.9rem" }}>Live tracking map</p>
                <p style={{ fontSize:"0.75rem", color:"#f9a8d4" }}>Connect map API to enable</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
