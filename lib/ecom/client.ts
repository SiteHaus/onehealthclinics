import type {
  Cart,
  CheckoutIntentRequest,
  CheckoutIntentResponse,
  Order,
  ProductList,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_ECOM_API_URL ?? "http://localhost:7020";

// ─── Core fetch wrapper ───────────────────────────────────────────────────────

async function ecomFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
    },
    credentials: "include",
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(body?.message ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export async function getProducts(params?: {
  limit?: number;
  offset?: number;
}): Promise<ProductList> {
  const query = new URLSearchParams();
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.offset) query.set("offset", String(params.offset));
  const qs = query.size ? `?${query}` : "";
  return ecomFetch<ProductList>(`/v1/catalog/products${qs}`, {
    next: { revalidate: 60 },
  });
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

export async function getCart(): Promise<Cart> {
  return ecomFetch<Cart>("/v1/cart");
}

export async function addToCart(variantId: string, quantity = 1): Promise<Cart> {
  return ecomFetch<Cart>("/v1/cart/items", {
    method: "POST",
    body: JSON.stringify({ variantId, quantity }),
  });
}

export async function updateCartItem(variantId: string, quantity: number): Promise<Cart> {
  return ecomFetch<Cart>(`/v1/cart/items/${variantId}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });
}

export async function removeCartItem(variantId: string): Promise<Cart> {
  return ecomFetch<Cart>(`/v1/cart/items/${variantId}`, {
    method: "DELETE",
  });
}

// ─── Checkout ─────────────────────────────────────────────────────────────────

export async function createCheckoutIntent(
  data: CheckoutIntentRequest,
): Promise<CheckoutIntentResponse> {
  return ecomFetch<CheckoutIntentResponse>("/v1/checkout/intent", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function getOrder(orderId: string, email?: string): Promise<Order> {
  const qs = email ? `?email=${encodeURIComponent(email)}` : "";
  return ecomFetch<Order>(`/v1/orders/${orderId}${qs}`);
}
