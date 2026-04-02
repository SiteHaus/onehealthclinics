"use client";

import { useState } from "react";
import { ShoppingCart, X, Plus, Minus, ChevronDown } from "lucide-react";
import Image from "next/image";
import type { Product, PublicVariant } from "@/lib/ecom/types";

// ─── Types ────────────────────────────────────────────────────────────────────

type CartItem = {
  variantId: string;
  productId: string;
  productName: string;
  variantName: string;
  priceCents: number;
  imageUrl: string | null;
  quantity: number;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function primaryVariant(product: Product): PublicVariant | null {
  return product.variants?.[0] ?? null;
}

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name A–Z", value: "name-asc" },
];

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
  onUpdateQty: (variantId: string, qty: number) => void;
  onRemove: (variantId: string) => void;
}) {
  const subtotalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <div className="w-6 h-0.5 bg-primary rounded-full mb-1" />
            <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <ShoppingCart size={40} className="text-gray-200" />
              <p className="text-gray-400 text-sm">Your cart is empty.</p>
              <button onClick={onClose} className="text-primary text-sm font-semibold hover:underline">
                Continue Shopping →
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.variantId} className="flex gap-4 items-start border-b border-gray-50 pb-4">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{item.productName}</p>
                  <p className="text-xs text-gray-400 mb-2">{formatPrice(item.priceCents)} each</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQty(item.variantId, item.quantity - 1)}
                      className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-sm font-medium text-gray-800 w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQty(item.variantId, item.quantity + 1)}
                      className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary hover:text-primary transition-colors"
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm font-bold text-gray-800">{formatPrice(item.priceCents * item.quantity)}</p>
                  <button onClick={() => onRemove(item.variantId)} className="text-gray-300 hover:text-red-400 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-lg font-bold text-gray-900">{formatPrice(subtotalCents)}</span>
            </div>
            <p className="text-xs text-gray-400">Shipping and taxes calculated at checkout.</p>
            <button className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">
              Checkout
            </button>
            <button onClick={onClose} className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors">
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
  onAdd: (item: Omit<CartItem, "quantity">) => void;
}) {
  const [added, setAdded] = useState(false);
  const variant = primaryVariant(product);
  const outOfStock = variant?.availability === "out_of_stock";

  const handleAdd = () => {
    if (!variant || outOfStock) return;
    onAdd({
      variantId: variant.id,
      productId: product.id,
      productName: product.name,
      variantName: variant.name,
      priceCents: variant.priceCents,
      imageUrl: product.primaryImage?.cdnUrl ?? null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col group">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {product.primaryImage ? (
          <Image
            src={product.primaryImage.cdnUrl}
            alt={product.primaryImage.altText ?? product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-100" />
        )}
        {variant?.availability === "low_stock" && (
          <span className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            Low Stock
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-1 flex-1">
          <h3 className="text-base font-bold text-gray-900 leading-snug">{product.name}</h3>
          {product.description && (
            <p className="text-xs text-gray-500 leading-relaxed mt-1">{product.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          {variant ? (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">{formatPrice(variant.priceCents)}</span>
              {variant.compareAtCents && variant.compareAtCents > variant.priceCents && (
                <span className="text-xs text-gray-400 line-through">{formatPrice(variant.compareAtCents)}</span>
              )}
            </div>
          ) : (
            <span className="text-sm text-gray-400">—</span>
          )}

          <button
            onClick={handleAdd}
            disabled={!variant || outOfStock}
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 ${
              outOfStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : added
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white hover:opacity-90"
            }`}
          >
            {outOfStock ? "Out of Stock" : added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────

export default function ShopClient({ products }: { products: Product[] }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [sortOpen, setSortOpen] = useState(false);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.variantId === item.variantId);
      if (existing) {
        return prev.map((i) =>
          i.variantId === item.variantId ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQty = (variantId: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.variantId !== variantId));
    } else {
      setCart((prev) =>
        prev.map((i) => (i.variantId === variantId ? { ...i, quantity: qty } : i)),
      );
    }
  };

  const removeItem = (variantId: string) => {
    setCart((prev) => prev.filter((i) => i.variantId !== variantId));
  };

  const sorted = [...products].sort((a, b) => {
    const aPrice = primaryVariant(a)?.priceCents ?? 0;
    const bPrice = primaryVariant(b)?.priceCents ?? 0;
    if (sortBy === "price-asc") return aPrice - bPrice;
    if (sortBy === "price-desc") return bPrice - aPrice;
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
      <section className="bg-hero-bg py-20 px-6">
        <div className="max-w-5xl mx-auto flex items-start justify-between gap-6">
          <div>
            <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-3">
              Provider-Curated
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-background mb-6">
              Supplement Shop
            </h1>
            <p className="max-w-xl text-white/80 text-lg leading-relaxed">
              Supplements selected and trusted by our providers — formulated for quality, potency, and real results.
            </p>
          </div>
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

      {/* ── Sort Bar ── */}
      <section className="bg-white border-b border-gray-100 px-6 py-5 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
          <div className="relative z-40">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-800 transition-colors border border-gray-200 rounded-lg px-3 py-2"
            >
              {sortOptions.find((o) => o.value === sortBy)?.label}
              <ChevronDown size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden min-w-[170px]">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
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
      <section className="relative bg-gray-50 py-16 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: "url('/onehealthsubtlebackground.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          {sorted.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <p className="text-lg font-semibold">No products available</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addToCart} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Trust Banner ── */}
      <section className="bg-white py-14 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          {[
            { label: "Provider-Recommended", detail: "Every product is selected and trusted by our clinical team." },
            { label: "Pharmaceutical Grade", detail: "Formulated to the highest standards." },
            { label: "Questions? Call Us", detail: "(435) 688-0759 — Mon–Fri 8am to 5pm" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <div className="w-8 h-0.5 bg-primary rounded-full mb-1" />
              <p className="text-sm font-bold text-gray-800 uppercase tracking-widest">{item.label}</p>
              <p className="text-xs text-gray-500 leading-relaxed max-w-xs">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="bg-bac py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col gap-6">
            <div>
              <div className="w-10 h-1 bg-subtext rounded-full mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Not Sure What to Take?</h2>
              <p className="text-foreground/80 leading-relaxed">
                Our providers can help you find the right supplements based on your health history and goals. Reach out and we'll guide you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
