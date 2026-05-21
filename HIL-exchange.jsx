import { useState } from "react";

const ITEMS = [
  {
    id: "ASSET-00847",
    hil: "HL-BM-OF-S2-L1-BIN03",
    owner: "DVO77",
    ownerName: "Daniel",
    generosity: 94,
    name: "Porcelain Insulator Wheels (Set of 7)",
    category: "Antique Hardware",
    qty: 7, qtyAvailable: 3,
    status: "available_trade",
    provenance: "Salvaged from 1940s industrial loom, Wisconsin",
    condition: "Good — minor chips on two",
    estimatedValue: 45,
    wants: ["Bakelite knobs", "vintage hardware", "vacuum tubes"],
    story: "Part of the old Hendricks loom collection. These were running looms in 1942.",
    image: "🔩",
    heirloom: false,
    tags: ["antique", "hardware", "ceramic"],
  },
  {
    id: "ASSET-01102",
    hil: "HL-GR-WK-N2-L2-BIN01",
    owner: "DVO77",
    ownerName: "Daniel",
    generosity: 94,
    name: "Bakelite Radio Knob Collection",
    category: "Vintage Electronics",
    qty: 23, qtyAvailable: 0,
    status: "brag",
    provenance: "1930s–1950s radio salvage, various sources",
    condition: "Excellent — full patina intact",
    estimatedValue: 180,
    wants: [],
    story: "Forty years of patient hunting at estate sales across three states. Some of these came off cathedral radios.",
    image: "📻",
    heirloom: true,
    tags: ["bakelite", "vintage", "radio", "electronics"],
  },
  {
    id: "ASSET-01334",
    hil: "HL-BM-ST-E2-DWR04",
    owner: "TED42",
    ownerName: "Ted",
    generosity: 78,
    name: "Milwaukee 3/8\" Ratchet Set",
    category: "Hand Tools",
    qty: 1, qtyAvailable: 1,
    status: "available_loan",
    provenance: null,
    condition: "Very Good",
    estimatedValue: 65,
    wants: [],
    story: null,
    image: "🔧",
    heirloom: false,
    tags: ["tools", "ratchet", "milwaukee"],
  },
  {
    id: "KIT-00023",
    hil: "HL-BM-OF-N1-L1-BIN02",
    owner: "DVO77",
    ownerName: "Daniel",
    generosity: 94,
    name: "Beginner Soap Making Kit",
    category: "Hobby Kit",
    qty: 1, qtyAvailable: 1,
    status: "kit_library",
    provenance: null,
    condition: "Complete — used twice",
    estimatedValue: 55,
    wants: ["Rock tumbler kit", "resin casting kit", "leatherworking starter"],
    story: "Got deep into cold process soap for about three weeks. Great kit, not my thing. Somebody's gonna love this.",
    image: "🧼",
    heirloom: false,
    tags: ["hobby", "soap", "crafts", "beginner"],
  },
  {
    id: "KIT-00031",
    hil: "HL-GR-WK-S3-L0-F0",
    owner: "RITA55",
    ownerName: "Rita",
    generosity: 88,
    name: "Rock Tumbler + Rough Stone Collection",
    category: "Hobby Kit",
    qty: 1, qtyAvailable: 1,
    status: "kit_library",
    provenance: null,
    condition: "Good — tumbler barrel has staining",
    estimatedValue: 80,
    wants: ["Soap making kit", "candle making", "anything crafty"],
    story: "My kids used this for two summers. Comes with about 4lbs of rough stones. Ready for a new adventure.",
    image: "🪨",
    heirloom: false,
    tags: ["hobby", "rocks", "tumbler", "kids"],
  },
  {
    id: "ASSET-02201",
    hil: "HL-BM-MM-W2-L3-BIN05",
    owner: "DVO77",
    ownerName: "Daniel",
    generosity: 94,
    name: "Vintage Snap-On Tool Chest (1970s)",
    category: "Shop Equipment",
    qty: 1, qtyAvailable: 0,
    status: "brag",
    provenance: "Purchased from retiring machinist, 1998",
    condition: "Original red paint, all drawers smooth",
    estimatedValue: 1200,
    wants: [],
    story: "This chest has been in every shop I've ever had. Not going anywhere — but if you make me a ridiculous offer, we can talk.",
    image: "🗄️",
    heirloom: true,
    tags: ["snap-on", "vintage", "tool chest", "shop"],
  },
  {
    id: "ASSET-03310",
    hil: "HL-GR-WK-E1-L2-BIN03",
    owner: "BILL77",
    ownerName: "Bill",
    generosity: 61,
    name: "Oscilloscope — Tektronix 465",
    category: "Test Equipment",
    qty: 1, qtyAvailable: 1,
    status: "available_sale",
    provenance: "University surplus, calibrated 2021",
    condition: "Excellent — all probes included",
    estimatedValue: 220,
    wants: [],
    story: null,
    image: "📡",
    heirloom: false,
    tags: ["electronics", "test equipment", "oscilloscope"],
  },
];

const STATUS_CONFIG = {
  brag:            { label: "Brag Shelf",      color: "#f59e0b", bg: "#451a03" },
  available_trade: { label: "Trade Me",        color: "#34d399", bg: "#022c22" },
  available_loan:  { label: "Borrow Me",       color: "#60a5fa", bg: "#0c1a3a" },
  available_sale:  { label: "For Sale",        color: "#f87171", bg: "#2d0a0a" },
  kit_library:     { label: "Kit Library",     color: "#c084fc", bg: "#1a0533" },
  legacy_mode:     { label: "Legacy",          color: "#e5e7eb", bg: "#111827" },
};

const FILTERS = ["all", "brag", "available_trade", "available_loan", "available_sale", "kit_library"];

function GenerosityBadge({ score }) {
  const color = score >= 85 ? "#34d399" : score >= 65 ? "#f59e0b" : "#f87171";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <div style={{
        width: 8, height: 8, borderRadius: "50%",
        background: color, boxShadow: `0 0 6px ${color}`
      }} />
      <span style={{ color, fontSize: 11, fontFamily: "monospace", fontWeight: 700 }}>
        G:{score}
      </span>
    </div>
  );
}

function StatusPill({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.brag;
  return (
    <span style={{
      background: cfg.bg,
      color: cfg.color,
      border: `1px solid ${cfg.color}44`,
      borderRadius: 4,
      padding: "2px 8px",
      fontSize: 10,
      fontFamily: "monospace",
      fontWeight: 700,
      letterSpacing: 1,
      textTransform: "uppercase",
    }}>
      {cfg.label}
    </span>
  );
}

function ItemCard({ item, onClick }) {
  const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.brag;
  return (
    <div
      onClick={() => onClick(item)}
      style={{
        background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)",
        border: `1px solid ${cfg.color}33`,
        borderRadius: 12,
        padding: 20,
        cursor: "pointer",
        transition: "all 0.2s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.border = `1px solid ${cfg.color}99`;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 32px ${cfg.color}22`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = `1px solid ${cfg.color}33`;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {item.heirloom && (
        <div style={{
          position: "absolute", top: 10, right: 10,
          fontSize: 16, title: "Heirloom"
        }}>👑</div>
      )}
      <div style={{ fontSize: 36, marginBottom: 12 }}>{item.image}</div>
      <div style={{ marginBottom: 8 }}>
        <StatusPill status={item.status} />
      </div>
      <div style={{
        color: "#e2e8f0", fontSize: 15, fontWeight: 700,
        fontFamily: "'Georgia', serif", marginBottom: 4, lineHeight: 1.3
      }}>
        {item.name}
      </div>
      <div style={{ color: "#64748b", fontSize: 11, fontFamily: "monospace", marginBottom: 10 }}>
        {item.hil}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <GenerosityBadge score={item.generosity} />
        <span style={{ color: "#94a3b8", fontSize: 12 }}>
          ~${item.estimatedValue}
        </span>
      </div>
      <div style={{ marginTop: 8, color: "#475569", fontSize: 11 }}>
        by {item.ownerName}
        {item.qtyAvailable > 0 && (
          <span style={{ color: cfg.color, marginLeft: 8 }}>
            {item.qtyAvailable} avail.
          </span>
        )}
      </div>
      {item.story && (
        <div style={{
          marginTop: 10, color: "#64748b", fontSize: 11,
          fontStyle: "italic", lineHeight: 1.4,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden"
        }}>
          "{item.story}"
        </div>
      )}
    </div>
  );
}

function Modal({ item, onClose }) {
  const [action, setAction] = useState(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.brag;

  const handleSend = () => {
    setSent(true);
    setTimeout(() => { setSent(false); setAction(null); setMessage(""); }, 2500);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#000000cc",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: 20,
    }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "linear-gradient(145deg, #0f172a, #1e293b)",
          border: `1px solid ${cfg.color}66`,
          borderRadius: 16, padding: 32, maxWidth: 560, width: "100%",
          boxShadow: `0 0 60px ${cfg.color}22`,
          maxHeight: "90vh", overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ fontSize: 48 }}>{item.image}</div>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "#64748b",
            fontSize: 24, cursor: "pointer", padding: 0
          }}>×</button>
        </div>

        <StatusPill status={item.status} />
        {item.heirloom && <span style={{ marginLeft: 8, fontSize: 12, color: "#f59e0b" }}>👑 Heirloom</span>}

        <h2 style={{
          color: "#f1f5f9", fontFamily: "'Georgia', serif",
          fontSize: 22, marginTop: 12, marginBottom: 4
        }}>{item.name}</h2>

        <div style={{ fontFamily: "monospace", fontSize: 11, color: cfg.color, marginBottom: 16 }}>
          {item.hil}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          {[
            ["Owner", item.ownerName],
            ["Condition", item.condition],
            ["Est. Value", `~$${item.estimatedValue}`],
            ["Category", item.category],
          ].map(([k, v]) => (
            <div key={k} style={{ background: "#ffffff08", borderRadius: 8, padding: "8px 12px" }}>
              <div style={{ color: "#64748b", fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>{k}</div>
              <div style={{ color: "#e2e8f0", fontSize: 13, marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>

        {item.provenance && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: "#64748b", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Provenance</div>
            <div style={{ color: "#94a3b8", fontSize: 13 }}>{item.provenance}</div>
          </div>
        )}

        {item.story && (
          <div style={{
            background: "#ffffff06", borderLeft: `3px solid ${cfg.color}66`,
            padding: "12px 16px", borderRadius: "0 8px 8px 0", marginBottom: 16
          }}>
            <div style={{ color: "#94a3b8", fontSize: 13, fontStyle: "italic", lineHeight: 1.6 }}>
              "{item.story}"
            </div>
          </div>
        )}

        {item.wants?.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: "#64748b", fontSize: 10, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Would Trade For</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {item.wants.map(w => (
                <span key={w} style={{
                  background: "#34d39922", color: "#34d399",
                  border: "1px solid #34d39944", borderRadius: 20,
                  padding: "3px 10px", fontSize: 11
                }}>{w}</span>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <GenerosityBadge score={item.generosity} />
          <span style={{ color: "#475569", fontSize: 11 }}>generosity score</span>
        </div>

        {!sent && !action && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {item.status === "brag" && (
              <button onClick={() => setAction("offer")} style={btnStyle("#f59e0b")}>
                💰 Make an Offer
              </button>
            )}
            {item.status === "available_trade" && (
              <button onClick={() => setAction("trade")} style={btnStyle("#34d399")}>
                🔄 Propose Trade
              </button>
            )}
            {item.status === "available_loan" && (
              <button onClick={() => setAction("borrow")} style={btnStyle("#60a5fa")}>
                🤝 Request to Borrow
              </button>
            )}
            {item.status === "available_sale" && (
              <button onClick={() => setAction("buy")} style={btnStyle("#f87171")}>
                🛒 Make Offer
              </button>
            )}
            {item.status === "kit_library" && (
              <>
                <button onClick={() => setAction("borrow")} style={btnStyle("#c084fc")}>
                  📦 Borrow Kit
                </button>
                <button onClick={() => setAction("trade")} style={btnStyle("#34d399")}>
                  🔄 Swap Kit
                </button>
              </>
            )}
          </div>
        )}

        {action && !sent && (
          <div style={{ marginTop: 16 }}>
            <div style={{ color: "#94a3b8", fontSize: 12, marginBottom: 8, textTransform: "capitalize" }}>
              {action} message to {item.ownerName}:
            </div>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder={
                action === "trade" ? "What are you offering in trade? Include your HIL code..." :
                action === "borrow" ? "What's your project? When would you return it?" :
                action === "offer" ? "What's your offer? (pickup only)" :
                "Your message..."
              }
              style={{
                width: "100%", background: "#ffffff08", border: "1px solid #334155",
                borderRadius: 8, padding: 12, color: "#e2e8f0", fontSize: 13,
                fontFamily: "inherit", resize: "vertical", minHeight: 80,
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button onClick={handleSend} style={btnStyle(cfg.color)}>Send</button>
              <button onClick={() => setAction(null)} style={{
                ...btnStyle("#475569"), background: "transparent"
              }}>Cancel</button>
            </div>
          </div>
        )}

        {sent && (
          <div style={{
            background: "#022c22", border: "1px solid #34d39944",
            borderRadius: 8, padding: 16, color: "#34d399",
            fontSize: 14, textAlign: "center"
          }}>
            ✓ Message sent to {item.ownerName}. Your AI will follow up.
          </div>
        )}
      </div>
    </div>
  );
}

function btnStyle(color) {
  return {
    background: `${color}22`,
    color: color,
    border: `1px solid ${color}66`,
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  };
}

function LegacyBanner({ onActivate }) {
  const [confirming, setConfirming] = useState(false);
  return (
    <div style={{
      background: "linear-gradient(90deg, #1a0a0a, #2d1515)",
      border: "1px solid #7f1d1d",
      borderRadius: 10, padding: "14px 20px",
      display: "flex", alignItems: "center",
      justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      marginBottom: 24,
    }}>
      <div>
        <div style={{ color: "#fca5a5", fontSize: 13, fontWeight: 700 }}>⚰️ Legacy Mode</div>
        <div style={{ color: "#7f1d1d", fontSize: 11, marginTop: 2 }}>
          Activating will flip all Brag + Private items to Available for Sale and open the estate auction.
        </div>
      </div>
      {!confirming ? (
        <button onClick={() => setConfirming(true)} style={btnStyle("#f87171")}>
          Activate Legacy Mode
        </button>
      ) : (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ color: "#fca5a5", fontSize: 12 }}>Are you sure?</span>
          <button onClick={onActivate} style={btnStyle("#f87171")}>Yes, Activate</button>
          <button onClick={() => setConfirming(false)} style={btnStyle("#475569")}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default function HILExchange() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [legacyActive, setLegacyActive] = useState(false);
  const [items, setItems] = useState(ITEMS);
  const [search, setSearch] = useState("");

  const activateLegacy = () => {
    setLegacyActive(true);
    setItems(prev => prev.map(item =>
      ["brag", "private"].includes(item.status)
        ? { ...item, status: "legacy_mode" }
        : item
    ));
  };

  const filtered = items.filter(item => {
    const matchFilter = filter === "all" || item.status === filter;
    const matchSearch = !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.tags.some(t => t.includes(search.toLowerCase())) ||
      item.ownerName.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080b14",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#e2e8f0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #0f172a 0%, #080b14 100%)",
        borderBottom: "1px solid #1e293b",
        padding: "24px 32px 20px",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
            <span style={{
              fontFamily: "monospace", fontSize: 11, color: "#334155",
              letterSpacing: 2, textTransform: "uppercase"
            }}>HIL SYSTEM v5.1</span>
          </div>
          <h1 style={{
            fontSize: 32, fontFamily: "'Georgia', serif",
            color: "#f1f5f9", margin: 0, fontWeight: 400,
            letterSpacing: -0.5
          }}>
            The Exchange
          </h1>
          <p style={{ color: "#475569", fontSize: 13, margin: "4px 0 0" }}>
            Trade · Borrow · Brag · Auction · Kit Library
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 32px" }}>

        <LegacyBanner onActivate={activateLegacy} />

        {legacyActive && (
          <div style={{
            background: "#022c22", border: "1px solid #34d39944",
            borderRadius: 10, padding: "12px 20px", marginBottom: 20,
            color: "#34d399", fontSize: 13
          }}>
            ✓ Legacy Mode active — all brag items are now available. Estate auction can be launched.
          </div>
        )}

        {/* Search + Filter */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search items, tags, owners..."
            style={{
              background: "#0f172a", border: "1px solid #1e293b",
              borderRadius: 8, padding: "8px 14px", color: "#e2e8f0",
              fontSize: 13, flex: "1 1 200px", minWidth: 0,
            }}
          />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {FILTERS.map(f => {
              const cfg = STATUS_CONFIG[f];
              const active = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    background: active ? (cfg?.bg || "#1e293b") : "transparent",
                    color: active ? (cfg?.color || "#94a3b8") : "#475569",
                    border: `1px solid ${active ? (cfg?.color || "#94a3b8") + "66" : "#1e293b"}`,
                    borderRadius: 6, padding: "6px 12px",
                    fontSize: 11, fontWeight: 700, cursor: "pointer",
                    fontFamily: "monospace", letterSpacing: 0.5,
                    textTransform: "uppercase",
                  }}
                >
                  {f === "all" ? "ALL" : cfg?.label || f}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{
          display: "flex", gap: 20, marginBottom: 24,
          padding: "12px 16px", background: "#0f172a",
          borderRadius: 8, border: "1px solid #1e293b",
          flexWrap: "wrap",
        }}>
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
            const count = items.filter(i => i.status === key).length;
            if (!count) return null;
            return (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.color }} />
                <span style={{ color: "#475569", fontSize: 11 }}>{cfg.label}:</span>
                <span style={{ color: cfg.color, fontSize: 11, fontWeight: 700 }}>{count}</span>
              </div>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}>
          {filtered.map(item => (
            <ItemCard key={item.id} item={item} onClick={setSelected} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", color: "#334155", padding: 60, fontSize: 14 }}>
            No items match that filter.
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: 48, paddingTop: 24,
          borderTop: "1px solid #1e293b",
          color: "#1e293b", fontSize: 11,
          fontFamily: "monospace", textAlign: "center"
        }}>
          HIL Exchange · Open Source · Nothing is Lost. Everything is Logic.
        </div>
      </div>

      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
