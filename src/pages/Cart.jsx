import { useNavigate } from "react-router-dom";
import { MdOutlineShoppingCart, MdDelete } from "react-icons/md";
import { FiPlus, FiMinus, FiArrowLeft, FiTag, FiTruck, FiShield } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

export default function Cart({ cartItems = [], handleAddToCart, handleRemoveFromCart, handleRemoveAllFromCart }) {
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  const totalQty = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  const shipping = total >= 500 ? 0 : 10;
  const grandTotal = total + shipping;

  /* ── Empty State ── */
  if (cartItems.length === 0) {
    return (
      <>
        <style>{CART_STYLES}</style>
        <div className="cart-empty-screen">
          <div className="cart-empty-orb cart-empty-orb1" />
          <div className="cart-empty-orb cart-empty-orb2" />
          <div className="cart-empty-inner">
            <div className="cart-empty-icon">🛒</div>
            <h2 className="cart-empty-title">Your cart is empty</h2>
            <p className="cart-empty-sub">Discover amazing laptops and add them to your cart!</p>
            <button className="cart-shop-btn" onClick={() => navigate("/")}>
              <FiArrowLeft /> Start Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{CART_STYLES}</style>
      <div className="cart-root">

        {/* ── Decorative Background ── */}
        <div className="cart-bg-orb cart-bg-orb1" />
        <div className="cart-bg-orb cart-bg-orb2" />

        {/* ── Hero Banner ── */}
        <div className="cart-banner">
          <div className="cart-banner-inner">
            <button className="cart-back-btn" onClick={() => navigate("/")}>
              <FiArrowLeft /> Continue Shopping
            </button>
            <div className="cart-banner-right">
              <h1 className="cart-title">Shopping Cart</h1>
              <div className="cart-badge">
                <HiSparkles />
                <span>{totalQty} item{totalQty !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="cart-body">

          {/* ── Items Column ── */}
          <div className="cart-items-col">
            {cartItems.map((item, idx) => (
              <div className="cart-item" key={item.id} style={{ animationDelay: `${idx * 0.06}s` }}>

                {/* Image */}
                <div className="cart-item-img-wrap">
                  <img src={item.image} alt={item.title} className="cart-item-img" />
                </div>

                {/* Info */}
                <div className="cart-item-info">
                  <div className="cart-item-brand">{item.title.split(" ")[0]}</div>
                  <h3 className="cart-item-name">{item.title}</h3>
                  <p className="cart-item-desc">{item.description}</p>
                  <div className="cart-item-price-row">
                    <span className="cart-item-price">${item.price.toLocaleString()}</span>
                    <span className="cart-item-each">each</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="cart-item-controls">
                  {/* Qty */}
                  <div className="cart-qty-wrap">
                    <button className="cart-qty-btn cart-qty-minus" onClick={() => handleRemoveFromCart(item)}>
                      <FiMinus size={11} />
                    </button>
                    <span className="cart-qty-num">{item.qty || 1}</span>
                    <button className="cart-qty-btn cart-qty-plus" onClick={() => handleAddToCart(item)}>
                      <FiPlus size={11} />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="cart-item-subtotal">
                    <span className="cart-item-sub-amt">${(item.price * (item.qty || 1)).toLocaleString()}</span>
                    <span className="cart-item-sub-lbl">subtotal</span>
                  </div>

                  {/* Delete */}
                  <button className="cart-delete-btn" onClick={() => handleRemoveAllFromCart(item)}>
                    <MdDelete size={17} />
                  </button>
                </div>
              </div>
            ))}

            {/* Perks strip */}
            <div className="cart-perks">
              <div className="cart-perk"><FiTruck className="cart-perk-icon" /><span>Free shipping over $500</span></div>
              <div className="cart-perk"><FiShield className="cart-perk-icon" /><span>Secure checkout</span></div>
              <div className="cart-perk"><FiTag className="cart-perk-icon" /><span>Best price guarantee</span></div>
            </div>
          </div>

          {/* ── Summary Column ── */}
          <div className="cart-summary-col">
            <div className="cart-summary-card">

              {/* Header */}
              <div className="cart-summary-header">
                <h2 className="cart-summary-title">Order Summary</h2>
                <span className="cart-summary-count">{totalQty} items</span>
              </div>

              {/* Item list */}
              <div className="cart-summary-items">
                {cartItems.map(item => (
                  <div className="cart-summary-row" key={item.id}>
                    <span className="cart-summary-row-name">{item.title.split(" ").slice(0, 3).join(" ")} ×{item.qty || 1}</span>
                    <span className="cart-summary-row-amt">${(item.price * (item.qty || 1)).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="cart-summary-totals">
                <div className="cart-totals-row">
                  <span>Subtotal</span>
                  <span className="cart-totals-val">${total.toLocaleString()}</span>
                </div>
                <div className="cart-totals-row">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "cart-free-ship" : "cart-totals-val"}>
                    {shipping === 0 ? "FREE ✓" : `$${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <div className="cart-free-hint">
                    Add ${(500 - total).toLocaleString()} more for free shipping!
                  </div>
                )}
              </div>

              {/* Grand total */}
              <div className="cart-grand-total">
                <span className="cart-grand-lbl">Total</span>
                <span className="cart-grand-amt">${grandTotal.toLocaleString()}</span>
              </div>

              {/* CTA Buttons */}
              <button
                className="cart-checkout-btn"
                onClick={() => navigate("/payment", {
                  state: {
                    cartItems,
                    total,
                    shipping,
                    grandTotal,
                    totalQty,
                  }
                })}
              >
                <MdOutlineShoppingCart size={18} />
                Checkout Now
                <span className="cart-checkout-arrow">→</span>
              </button>

              <button className="cart-deals-btn" onClick={() => navigate("/deals")}>
                View Today's Deals 🔥
              </button>

              {/* Trust row */}
              <div className="cart-trust">
                <span>🔒 SSL Secured</span>
                <span>↩ 30-day returns</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

/* ─────────────────────────── STYLES ─────────────────────────── */
const CART_STYLES = `
  .cart-root {
    min-height: 100vh;
    background: linear-gradient(145deg, #fff5fb 0%, #ffffff 40%, #fdf4ff 100%);
    position: relative;
    overflow-x: hidden;
  }

  /* ── Background orbs ── */
  .cart-bg-orb {
    position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
  }
  .cart-bg-orb1 {
    width: 500px; height: 500px;
    top: -200px; right: -150px;
    background: radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 70%);
  }
  .cart-bg-orb2 {
    width: 400px; height: 400px;
    bottom: 0; left: -100px;
    background: radial-gradient(circle, rgba(192,132,252,0.07) 0%, transparent 70%);
  }

  /* ── Banner ── */
  .cart-banner {
    background: linear-gradient(110deg, #fce7f3 0%, #fdf2ff 50%, #fce7f3 100%);
    border-bottom: 1px solid rgba(236,72,153,0.1);
    padding: 24px 5%;
    position: relative; z-index: 1;
  }
  .cart-banner-inner {
    max-width: 1200px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
  }
  .cart-back-btn {
    display: flex; align-items: center; gap: 7px;
    font-size: .83rem; font-weight: 700; color: #9d6b8a;
    background: white; border: 1.5px solid rgba(236,72,153,0.15);
    border-radius: 99px; padding: 8px 18px;
    cursor: pointer; transition: all .2s;
    
  }
  .cart-back-btn:hover { background: #fce7f3; color: #ec4899; border-color: #ec4899; transform: translateX(-2px); }

  .cart-banner-right { display: flex; align-items: center; gap: 14px; }
  .cart-title {
    
    font-size: clamp(1.5rem, 4vw, 2.2rem); font-weight: 800;
    color: #1a0a2e; letter-spacing: -0.02em; margin: 0;
  }
  .cart-badge {
    display: flex; align-items: center; gap: 5px;
    background: linear-gradient(135deg, #f472b6, #c084fc);
    color: white; font-size: .75rem; font-weight: 700;
    padding: 5px 12px; border-radius: 99px;
    box-shadow: 0 4px 12px rgba(244,114,182,.35);
  }

  /* ── Body ── */
  .cart-body {
    max-width: 1200px; margin: 0 auto;
    padding: 32px 5% 60px;
    display: flex; gap: 28px; align-items: flex-start;
    position: relative; z-index: 1;
  }
  .cart-items-col { flex: 1; display: flex; flex-direction: column; gap: 14px; min-width: 0; }
  .cart-summary-col { width: 340px; flex-shrink: 0; }

  /* ── Cart Item ── */
  @keyframes cartItemIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cart-item {
    background: white;
    border: 1.5px solid rgba(236,72,153,0.08);
    border-radius: 20px;
    padding: 18px 20px;
    display: flex; align-items: center; gap: 18px;
    box-shadow: 0 2px 16px rgba(236,72,153,0.05);
    transition: all .25s ease;
    animation: cartItemIn .4s ease both;
    position: relative; overflow: hidden;
  }
  .cart-item::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
    background: linear-gradient(180deg, #f472b6, #c084fc);
    border-radius: 3px 0 0 3px;
    opacity: 0; transition: opacity .2s;
  }
  .cart-item:hover { box-shadow: 0 8px 32px rgba(236,72,153,0.12); transform: translateY(-2px); border-color: rgba(236,72,153,0.18); }
  .cart-item:hover::before { opacity: 1; }

  .cart-item-img-wrap {
    width: 88px; height: 88px; flex-shrink: 0;
    background: linear-gradient(135deg, #fff5fb, #fdf0ff);
    border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; border: 1px solid rgba(236,72,153,0.08);
  }
  .cart-item-img { width: 100%; height: 100%; object-fit: contain; transition: transform .3s; }
  .cart-item:hover .cart-item-img { transform: scale(1.06); }

  .cart-item-info { flex: 1; min-width: 0; }
  .cart-item-brand {
    font-size: .67rem; font-weight: 800; text-transform: uppercase; letter-spacing: .1em;
    color: #ec4899; background: #fce7f3; padding: 2px 8px; border-radius: 99px;
    display: inline-block; margin-bottom: 5px;
  }
  .cart-item-name {
    
    font-size: .9rem; font-weight: 700; color: #1a0a2e;
    line-height: 1.3; margin: 0 0 3px;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  .cart-item-desc {
    font-size: .72rem; color: #b0a0c0; line-height: 1.4;
    display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
    margin-bottom: 4px;
  }
  .cart-item-price-row { display: flex; align-items: baseline; gap: 4px; }
  .cart-item-price { font-size: 1.05rem; font-weight: 800; color: #ec4899; }
  .cart-item-each { font-size: .68rem; color: #c4b0d0; font-weight: 500; }

  /* Controls */
  .cart-item-controls {
    display: flex; flex-direction: column; align-items: flex-end; gap: 10px; flex-shrink: 0;
  }
  .cart-qty-wrap {
    display: flex; align-items: center; gap: 8px;
    background: #fdf5ff; border: 1.5px solid rgba(236,72,153,0.12);
    border-radius: 99px; padding: 4px 6px;
  }
  .cart-qty-btn {
    width: 24px; height: 24px; border-radius: 50%; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all .2s cubic-bezier(.34,1.56,.64,1);
  }
  .cart-qty-minus { background: white; color: #ec4899; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
  .cart-qty-minus:hover { background: #fce7f3; transform: scale(1.1); }
  .cart-qty-plus { background: linear-gradient(135deg, #f472b6, #ec4899); color: white; box-shadow: 0 2px 8px rgba(236,72,153,.3); }
  .cart-qty-plus:hover { transform: scale(1.1); box-shadow: 0 4px 12px rgba(236,72,153,.4); }
  .cart-qty-num { font-weight: 800; font-size: .9rem; color: #1a0a2e; min-width: 20px; text-align: center; }

  .cart-item-subtotal { text-align: right; }
  .cart-item-sub-amt { display: block; font-weight: 800; font-size: 1rem; color: #1a0a2e; }
  .cart-item-sub-lbl { font-size: .67rem; color: #c4b0d0; font-weight: 500; }

  .cart-delete-btn {
    background: none; border: none; cursor: pointer;
    color: #ddd0e8; transition: all .2s;
    width: 28px; height: 28px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }
  .cart-delete-btn:hover { color: #ef4444; background: #fef2f2; }

  /* ── Perks Strip ── */
  .cart-perks {
    display: flex; gap: 12px; flex-wrap: wrap;
    background: linear-gradient(135deg, #fdf5ff, #fff5fb);
    border: 1.5px solid rgba(236,72,153,0.08);
    border-radius: 16px; padding: 14px 18px;
  }
  .cart-perk { display: flex; align-items: center; gap: 6px; font-size: .75rem; font-weight: 600; color: #9d6b8a; }
  .cart-perk-icon { color: #f472b6; font-size: .9rem; }

  /* ── Summary Card ── */
  .cart-summary-card {
    background: white;
    border: 1.5px solid rgba(236,72,153,0.1);
    border-radius: 24px;
    padding: 24px;
    box-shadow: 0 4px 32px rgba(236,72,153,0.08);
    position: sticky; top: 24px;
  }
  .cart-summary-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 18px; padding-bottom: 16px;
    border-bottom: 1px solid #fce7f3;
  }
  .cart-summary-title {
    
    font-size: 1.15rem; font-weight: 800; color: #1a0a2e; margin: 0;
  }
  .cart-summary-count {
    font-size: .72rem; font-weight: 700; color: #ec4899;
    background: #fce7f3; padding: 3px 10px; border-radius: 99px;
  }

  .cart-summary-items { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .cart-summary-row { display: flex; justify-content: space-between; gap: 10px; }
  .cart-summary-row-name {
    font-size: .78rem; color: #9d6b8a; font-weight: 500;
    flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .cart-summary-row-amt { font-size: .78rem; font-weight: 700; color: #1a0a2e; flex-shrink: 0; }

  .cart-summary-totals {
    border-top: 1px dashed rgba(236,72,153,0.15);
    padding-top: 14px; margin-bottom: 14px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .cart-totals-row {
    display: flex; justify-content: space-between;
    font-size: .83rem; color: #9d6b8a; font-weight: 500;
  }
  .cart-totals-val { font-weight: 700; color: #1a0a2e; }
  .cart-free-ship { font-weight: 800; color: #10b981; }
  .cart-free-hint {
    font-size: .72rem; color: #f472b6; font-weight: 600;
    background: #fff0f8; padding: 6px 10px; border-radius: 8px;
    border: 1px solid rgba(244,114,182,.2);
  }

  .cart-grand-total {
    display: flex; justify-content: space-between; align-items: center;
    border-top: 2px solid #fce7f3; padding-top: 14px; margin-bottom: 20px;
  }
  .cart-grand-lbl {  font-size: 1rem; font-weight: 800; color: #1a0a2e; }
  .cart-grand-amt {
     font-size: 1.4rem; font-weight: 800;
    background: linear-gradient(135deg, #ec4899, #c084fc);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }

  /* Checkout button */
  @keyframes shimCart {
    0%  { transform: translateX(-100%) skewX(-15deg); }
    100%{ transform: translateX(300%)  skewX(-15deg); }
  }
  .cart-checkout-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 15px;
    border-radius: 16px; border: none; cursor: pointer;
    background: linear-gradient(135deg, #f472b6 0%, #ec4899 50%, #c084fc 100%);
    color: white;  font-size: .9rem; font-weight: 800;
    text-decoration: none;
    box-shadow: 0 8px 24px rgba(236,72,153,.35);
    transition: all .28s cubic-bezier(.34,1.4,.64,1);
    position: relative; overflow: hidden;
    letter-spacing: .02em;
  }
  .cart-checkout-btn::before {
    content: '';
    position: absolute; top: 0; left: 0; width: 40%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.25), transparent);
    transform: translateX(-100%) skewX(-15deg);
  }
  .cart-checkout-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(236,72,153,.45); }
  .cart-checkout-btn:hover::before { animation: shimCart .7s ease forwards; }
  .cart-checkout-arrow { margin-left: auto; font-size: 1rem; }

  .cart-deals-btn {
    width: 100%; margin-top: 10px; padding: 12px;
    border-radius: 14px; border: 1.5px solid rgba(236,72,153,0.15);
    background: #fdf5ff; color: #9d6b8a;
     font-size: .83rem; font-weight: 700;
    cursor: pointer; transition: all .2s;
  }
  .cart-deals-btn:hover { background: #fce7f3; color: #ec4899; border-color: rgba(236,72,153,.3); }

  .cart-trust {
    display: flex; justify-content: center; gap: 16px;
    margin-top: 14px; font-size: .68rem; font-weight: 600; color: #c4b0d0;
  }

  /* ── Empty state ── */
  .cart-empty-screen {
    min-height: 100vh;
    background: linear-gradient(145deg, #fff5fb 0%, #ffffff 40%, #fdf4ff 100%);
    display: flex; align-items: center; justify-content: center;
     position: relative;
  }
  .cart-empty-orb {
    position: absolute; border-radius: 50%; pointer-events: none;
  }
  .cart-empty-orb1 {
    width: 400px; height: 400px; top: -100px; right: -100px;
    background: radial-gradient(circle, rgba(244,114,182,.1), transparent 70%);
  }
  .cart-empty-orb2 {
    width: 300px; height: 300px; bottom: 0; left: -80px;
    background: radial-gradient(circle, rgba(192,132,252,.09), transparent 70%);
  }
  @keyframes emptyIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  .cart-empty-inner {
    text-align: center; animation: emptyIn .5s ease both; position: relative; z-index: 1;
  }
  .cart-empty-icon {
    font-size: 5rem; margin-bottom: 16px; display: block;
    animation: emptyIn .5s .1s ease both;
  }
  .cart-empty-title {
     font-size: 1.8rem; font-weight: 800;
    color: #1a0a2e; margin: 0 0 8px;
  }
  .cart-empty-sub { color: #b0a0c0; font-size: .9rem; margin: 0 0 28px; }
  .cart-shop-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #f472b6, #ec4899);
    color: white;  font-size: .9rem; font-weight: 800;
    padding: 14px 32px; border-radius: 99px; border: none; cursor: pointer;
    box-shadow: 0 8px 24px rgba(236,72,153,.35);
    transition: all .25s;
  }
  .cart-shop-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(236,72,153,.45); }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .cart-body { flex-direction: column; padding: 20px 4% 48px; }
    .cart-summary-col { width: 100%; }
    .cart-summary-card { position: static; }
  }
  @media (max-width: 600px) {
    .cart-item { flex-wrap: wrap; gap: 12px; padding: 14px 14px; }
    .cart-item-img-wrap { width: 72px; height: 72px; }
    .cart-item-controls { flex-direction: row; width: 100%; justify-content: space-between; align-items: center; }
    .cart-banner { padding: 16px 4%; }
    .cart-banner-inner { flex-direction: column; align-items: flex-start; }
    .cart-perks { gap: 8px; }
    .cart-perk span { display: none; }
  }
`;
