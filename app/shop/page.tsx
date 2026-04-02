import { getProducts } from "@/lib/ecom/client";
import ShopClient from "./ShopClient";

export const metadata = {
  title: "Supplement Shop | OneHealth Clinics",
  description:
    "Provider-curated supplements selected and trusted by our clinical team — formulated for quality, potency, and real results.",
};

export default async function ShopPage() {
  const { items } = await getProducts({ limit: 100 });

  return <ShopClient products={items} />;
}
