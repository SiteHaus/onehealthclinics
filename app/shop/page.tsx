"use client";

import { useState } from "react";
import { ShoppingCart, X, Plus, Minus, ChevronDown } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
  description: string;
  href: string;
};

const products: Product[] = [
  {
    id: "b-essentials",
    name: "B Essentials",
    price: 24.0,
    image:
      "https://onehealthclinics.com/wp-content/uploads/2021/06/MG_8595-scaled-300x300.jpg",
    category: "Energy & Mood",
    description:
      "A comprehensive B-vitamin complex to support energy metabolism, mood, and nervous system health.",
    href: "https://onehealthclinics.com/product/b-essentials/",
  },
  {
    id: "bone-support",
    name: "Bone Support",
    price: 30.0,
    image:
      "https://onehealthclinics.com/wp-content/uploads/2021/06/MG_8566-scaled-300x300.jpg",
    category: "Bone & Joint",
    badge: "Best Seller",
    description:
      "A targeted formula to maintain bone density and joint strength with calcium, magnesium, and D3.",
    href: "https://onehealthclinics.com/product/bone-support/",
  },
  {
    id: "digestive-enzymes",
    name: "Digestive Enzymes",
    price: 22.0,
    image:
      "https://onehealthclinics.com/wp-content/uploads/2021/06/MG_8602-scaled-300x300.jpg",
    category: "Gut Health",
    description:
      "Supports optimal digestion and nutrient absorption with a full-spectrum enzyme blend.",
    href: "https://onehealthclinics.com/product/digestive-enzymes/",
  },
  {
    id: "easy-iron",
    name: "Easy Iron",
    price: 22.0,
    image:
      "https://onehealthclinics.com/wp-content/uploads/2021/06/MG_8587-scaled-300x300.jpg",
    category: "Blood Health",
    description:
      "Gentle, non-constipating iron supplement to support healthy red blood cell production and energy.",
    href: "https://onehealthclinics.com/product/easy-iron/",
  },
  {
    id: "essential-mag",
    name: "Essential Mag",
    price: 20.0,
    image:
      "https://onehealthclinics.com/wp-content/uploads/2021/06/MG_8683-scaled-300x300.jpg",
    category: "Sleep & Recovery",
    description:
      "Highly bioavailable magnesium to support muscle relaxation, sleep quality, and stress management.",
    href: "https://onehealthclinics.com/product/essential-mag/",
  },
  {
    id: "melatonin",
    name: "Melatonin",
    price: 16.0,
    image:
      "https://onehealthclinics.com/wp-content/uploads/2025/11/melatonin-2-300x300.jpg",
    category: "Sleep & Recovery",
    description:
      "A precise-dose melatonin supplement to help regulate your sleep-wake cycle naturally.",
    href: "https://onehealthclinics.com/product/melatonin/",
  },
  {
    id: "micro-dhea-25",
    name: "Micro DHEA-25",
    price: 25.0,
    image:
      "https://onehealthclinics.com/wp-content/uploads/2025/11/micro-25-300x300.jpg",
    category: "Hormone Support",
    description:
      "25mg micronized DHEA to support hormonal balance, energy, and adrenal function.",
    href: "https://onehealthclinics.com/product/micro-dhea-25/",
  },
  {
    id: "micro-dhea-50",
    name: "Micro DHEA-50",
    price: 30.0,
    image:
      "https://onehealthclinics.com/wp-content/uploads/2025/11/micro-50-300x300.jpg",
    category: "Hormone Support",
    description:
      "50mg micronized DHEA for those requiring higher-dose hormonal support under provider guidance.",
    href: "https://onehealthclinics.com/product/micro-dhea-50/",
  },
  {
    id: "vitamin-b12",
    name: "Vitamin B12 Liquid",
    price: 40.0,
    image:
      "https://onehealthclinics.com/wp-content/uploads/2021/06/MG_8633-scaled-300x300.jpg",
    category: "Energy & Mood",
    badge: "New",
    description:
      "Liquid methylcobalamin B12 for superior absorption, supporting energy, cognition, and nerve health.",
    href: "https://onehealthclinics.com/product/vitamin-b12-liquid/",
  },
  {
    id: "vitamin-d3",
    name: "Vitamin D3",
    price: 22.0,
    image:
      "https://onehealthclinics.com/wp-content/uploads/2021/06/MG_8700-scaled-300x300.jpg",
    category: "Immune Support",
    badge: "Best Seller",
    description:
      "High-potency Vitamin D3 to support immune function, mood, bone health, and hormone balance.",
    href: "https://onehealthclinics.com/product/vitamin-d3/",
  },
  {
    id: "vivere-essential",
    name: "Vivere Essential",
    price: 25.0,
    image:
      "https://onehealthclinics.com/wp-content/uploads/2021/06/MG_8667-scaled-300x300.jpg",
    category: "Immune Support",
    description:
      "A premium daily multivitamin blend formulated to fill nutritional gaps and promote overall vitality.",
    href: "https://onehealthclinics.com/product/vivere-essential/",
  },
];

const categories = [
  "All",
  "Energy & Mood",
  "Bone & Joint",
  "Gut Health",
  "Blood Health",
  "Sleep & Recovery",
  "Hormone Support",
  "Immune Support",
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name A–Z", value: "name-asc" },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type CartItem = Product & { quantity: number };

// ─── Cart Drawer ──────────────────────────────────────────────────────────────

function CartDrawer({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemove,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <div className="w-6 h-0.5 bg-primary rounded-full mb-1" />
            <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <ShoppingCart size={40} className="text-gray-200" />
              <p className="text-gray-400 text-sm">Your cart is empty.</p>
              <button
                onClick={onClose}
                className="text-primary text-sm font-semibold hover:underline"
              >
                Continue Shopping →
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-start border-b border-gray-50 pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400 mb-2">
                    ${item.price.toFixed(2)} each
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-sm font-medium text-gray-800 w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm font-bold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-lg font-bold text-gray-900">
                ${total.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Shipping and taxes calculated at checkout.
            </p>
            <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">
              Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product) => void;
}) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-1 flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {product.category}
          </p>
          <h3 className="text-base font-bold text-gray-900 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed mt-1">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${
              added
                ? "bg-green-500 text-white"
                : "bg-primary text-white hover:opacity-90"
            }`}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
      );
    }
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const filtered = products
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="w-full text-white">
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />

      {/* ── Hero ── */}
      <section className="bg-muted py-20 px-6">
        <div className="max-w-5xl mx-auto flex items-start justify-between gap-6">
          <div>
            <p className="text-subtext font-semibold uppercase tracking-widest text-sm mb-3">
              Provider-Curated
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-background mb-6">
              Supplement Shop
            </h1>
            <p className="max-w-xl text-white/80 text-lg leading-relaxed">
              Supplements selected and trusted by our providers — formulated for
              quality, potency, and real results.
            </p>
          </div>

          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex-shrink-0 flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-background font-semibold px-5 py-3 rounded-xl transition-colors mt-1"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline text-sm">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </section>

      {/* ── Filters + Sort Bar ── */}
      <section className="bg-white border-b border-gray-100 px-6 py-5 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary"
                    : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-800 transition-colors border border-gray-200 rounded-lg px-3 py-2"
            >
              {sortOptions.find((o) => o.value === sortBy)?.label}
              <ChevronDown
                size={14}
                className={`transition-transform ${sortOpen ? "rotate-180" : ""}`}
              />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden min-w-[170px]">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                      sortBy === opt.value
                        ? "text-primary bg-primary/5"
                        : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Result count */}
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg font-semibold mb-2">No products found</p>
              <button
                onClick={() => setActiveCategory("All")}
                className="text-primary text-sm font-semibold hover:underline"
              >
                Clear filter
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Trust Banner ── */}
      <section className="bg-white py-14 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          {[
            {
              label: "Provider-Recommended",
              detail:
                "Every product is selected and trusted by our clinical team.",
            },
            {
              label: "Pharmaceutical Grade",
              detail: "Formulated to the highest standards.",
            },
            {
              label: "Questions? Call Us",
              detail: "(435) 688-0759 — Mon–Fri 8am to 5pm",
            },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <div className="w-8 h-0.5 bg-primary rounded-full mb-1" />
              <p className="text-sm font-bold text-gray-800 uppercase tracking-widest">
                {item.label}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="bg-muted py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-6">
            <div>
              <div className="w-10 h-1 bg-subtext rounded-full mb-4" />
              <h2 className="text-2xl font-bold text-background mb-2">
                Not Sure What to Take?
              </h2>
              <p className="text-white/80 leading-relaxed">
                Our providers can help you find the right supplements based on
                your health history and goals. Reach out and we'll guide you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
