# Google Reviews + ISR Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add live Google reviews (dark teal section, rating badge, 3 cards on homepage / 5 on about page) and page-level ISR to 5 pages.

**Architecture:** One async server component (`components/google-reviews.tsx`) fetches from the Places API (New) with 24h fetch-level cache and renders the full section. The homepage is converted from a client component to a server component by extracting its two interactive buttons into `HomeHeroButtons` (already created). The about page is converted by removing dead `useRouter` code. ISR (`export const revalidate = 86400`) goes directly in server-component page files; for routes where the page is already a client component it goes in the route's layout file.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, Google Places API (New)

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Verify + commit | `components/home-hero-buttons.tsx` | Client wrapper for the two homepage CTA buttons |
| Create | `components/google-reviews.tsx` | Async server component — fetches Places API, renders section |
| Modify | `app/page.tsx` | Remove `"use client"`, use `HomeHeroButtons`, add `GoogleReviews`, add `revalidate` |
| Modify | `app/about/page.tsx` | Remove dead `"use client"` + `useRouter`, add `GoogleReviews`, add `revalidate` |
| Modify | `app/pediatrics/layout.tsx` | Add `revalidate` (page is client component) |
| Modify | `app/services/layout.tsx` | Add `revalidate` (page is client component) |
| Modify | `app/contact/layout.tsx` | Add `revalidate` (page is client component) |

---

## Task 1: Verify HomeHeroButtons and commit

**Files:**
- Verify: `components/home-hero-buttons.tsx`

- [ ] **Confirm the file exists with correct content**

Run:
```bash
cat components/home-hero-buttons.tsx
```

Expected output — the full file should match exactly:

```tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function HomeHeroButtons() {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-3 mt-7">
      <Button
        onClick={() => router.push("/contact")}
        className="w-fit px-8 py-5 text-base rounded-xl"
      >
        Contact our Office (New Patient)
      </Button>
      <Button
        className="w-fit px-8 py-5 text-base rounded-xl"
        onClick={() =>
          window.open(
            "https://mycw18.eclinicalweb.com/portal1225/jsp/100mp/login_otp.jsp",
            "_blank",
          )
        }
      >
        Patient Portal (Existing Patients)
      </Button>
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add components/home-hero-buttons.tsx
git commit -m "feat: extract HomeHeroButtons as client component"
```

---

## Task 2: Build GoogleReviews server component

**Files:**
- Create: `components/google-reviews.tsx`

- [ ] **Create the file**

```tsx
import { Star } from "lucide-react";

interface AuthorAttribution {
  displayName: string;
  photoUri: string;
  uri: string;
}

interface Review {
  rating: number;
  text: { text: string };
  authorAttribution: AuthorAttribution;
  relativePublishTimeDescription: string;
}

interface PlaceData {
  rating: number;
  userRatingCount: number;
  reviews: Review[];
}

async function fetchReviews(): Promise<PlaceData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "reviews,rating,userRatingCount",
        },
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i <= rating ? "#FBBC04" : "none"}
          stroke={i <= rating ? "#FBBC04" : "#6b7280"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

interface GoogleReviewsProps {
  count?: number;
}

export default async function GoogleReviews({ count = 5 }: GoogleReviewsProps) {
  const data = await fetchReviews();
  if (!data?.reviews?.length) return null;

  const placeId = process.env.GOOGLE_PLACE_ID;
  const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  const reviews = data.reviews.slice(0, count);

  return (
    <section className="bg-hero-bg py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-3">
              Patient Reviews
            </p>
            <h2 className="font-bold text-4xl md:text-5xl text-white">
              What Our Patients Say
            </h2>
          </div>
          <div className="hidden sm:block text-center bg-white/10 border border-white/15 rounded-xl px-5 py-4">
            <p className="text-4xl font-bold text-white leading-none">
              {data.rating.toFixed(1)}
            </p>
            <div className="flex justify-center mt-2">
              <StarRating rating={Math.round(data.rating)} />
            </div>
            <p className="text-xs text-white/50 mt-1.5">
              {data.userRatingCount.toLocaleString()} reviews
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/15 rounded-xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={review.authorAttribution.photoUri}
                  alt={review.authorAttribution.displayName}
                  className="w-10 h-10 rounded-full"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <p className="font-semibold text-sm text-white">
                    {review.authorAttribution.displayName}
                  </p>
                  <p className="text-xs text-white/50">
                    {review.relativePublishTimeDescription}
                  </p>
                </div>
              </div>
              <StarRating rating={review.rating} />
              <p className="text-sm text-white/75 leading-relaxed line-clamp-5">
                {review.text.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-white/70 hover:text-white transition-colors border border-white/20 rounded-full px-5 py-2.5 hover:border-white/40"
          >
            See all reviews on Google →
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors on the new file.

- [ ] **Commit**

```bash
git add components/google-reviews.tsx
git commit -m "feat: add GoogleReviews server component"
```

---

## Task 3: Convert homepage to server component

**Files:**
- Modify: `app/page.tsx`

- [ ] **Replace the full file content**

```tsx
import { Banner } from "@/components/shared/banner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bolt } from "lucide-react";
import { HomeHeroButtons } from "@/components/home-hero-buttons";
import GoogleReviews from "@/components/google-reviews";

export const revalidate = 86400;

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex h-[70vh] min-h-[480px] bg-[url('/office.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative w-full bg-linear-to-r from-black/40 via-black/20 to-transparent">
          <div className="flex items-center h-full px-6">
            <div className="flex flex-col text-background w-full max-w-7xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                Care you <span className="text-subtext">can count on</span>
              </h1>

              <p className="mt-5 text-base md:text-lg text-white/85">
                From same-day sick visits to long-term wellness plans, OneHealth
                provides warm, personalized healthcare for every member of your
                family — right here in Southern Utah.
              </p>

              <HomeHeroButtons />
            </div>
          </div>
        </div>
      </section>

      {/* Section BELOW hero */}
      <section>
        <Banner
          className="text-sm lg:text-base bg-muted text-primary font-medium text-center py-3"
          content="Dixie Primary Care is now OneHealth Clinics — same trusted team, expanded care."
        />
      </section>

      <div className="bg-white">
        <section className="w-full py-24">
          <div className="flex flex-col max-w-6xl mx-auto gap-6 px-6">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">
              Est. 2006 · St. George, Utah
            </p>
            <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl">
              An Evolution of Care, Two Decades in the Making
            </h2>
            <div className="flex flex-col lg:flex-row gap-8 mt-2 text-muted-foreground text-lg">
              <p>
                Since 2006, our mission has been to provide a unique blend of
                internal medicine and personalized attention. For 20 years,
                we've had the privilege of being your medical home as Dixie
                Primary Care. As our community grew, so did our scope. We've
                evolved far beyond a traditional primary care office — managing
                complex chronic conditions, performing specialized procedures,
                and offering wellness care for every stage of life.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-gray-50 w-full py-24">
          <div className="flex flex-col max-w-6xl mx-auto gap-12 px-6">
            <div className="w-full text-center">
              <h2 className="text-sm font-semibold text-primary">
                OUR PHILOSOPHY
              </h2>
              <h1 className="font-bold mt-4 text-4xl md:text-5xl lg:text-6xl">
                Why OneHealth?
              </h1>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center lg:items-stretch gap-8">
              <Card className="flex-1 flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bolt className="text-primary" />
                  </div>
                  <CardTitle className="text-primary">
                    All-in-one care
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground leading-relaxed">
                    Primary care, specialized wellness, and functional medicine
                    — integrated in one place.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex-1 flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bolt className="text-primary" />
                  </div>
                  <CardTitle className="text-primary">
                    Your medical home
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground leading-relaxed">
                    Primary care, specialized wellness, and functional medicine
                    — integrated in one place.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex-1 flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bolt className="text-primary" />
                  </div>
                  <CardTitle className="text-primary">
                    Built for growth
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground leading-relaxed">
                    Evolved to meet the complexity of modern health needs across
                    every stage of life.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      <GoogleReviews count={3} />
    </>
  );
}
```

- [ ] **Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Verify the dev server renders the homepage correctly**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm:
- Hero buttons still work (Contact + Patient Portal)
- "Why OneHealth?" cards still render
- Reviews section renders (dark teal, cards visible) — or is absent if env vars not yet set (expected)

- [ ] **Commit**

```bash
git add app/page.tsx
git commit -m "feat: convert homepage to server component, add GoogleReviews"
```

---

## Task 4: Update About page

**Files:**
- Modify: `app/about/page.tsx`

- [ ] **Remove the `"use client"` directive and dead `useRouter` import**

Delete lines 1–3:
```tsx
"use client";
import { useRouter } from "next/navigation";
```

And delete the `const router = useRouter();` line (line 75 in original, now line 73 after removing the two above).

- [ ] **Add `revalidate` and `GoogleReviews` import at the top of the file**

After the remaining imports, add:

```tsx
import GoogleReviews from "@/components/google-reviews";

export const revalidate = 86400;
```

- [ ] **Add `<GoogleReviews />` at the bottom of the returned JSX, just before the closing `</div>`**

The last few lines of the return should look like:

```tsx
          </div>
        </div>
      </section>
      <GoogleReviews />
    </div>
  );
}
```

- [ ] **Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Verify in browser**

Open `http://localhost:3000/about`. Confirm:
- Provider profiles all render correctly
- Reviews section appears at the bottom (or is cleanly absent without env vars)

- [ ] **Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: convert about page to server component, add GoogleReviews"
```

---

## Task 5: Add ISR to remaining page layouts

**Files:**
- Modify: `app/pediatrics/layout.tsx`
- Modify: `app/services/layout.tsx`
- Modify: `app/contact/layout.tsx`

These pages are client components so `revalidate` goes in their layouts.

- [ ] **Add `export const revalidate = 86400` to `app/pediatrics/layout.tsx`**

Add this line immediately after the closing `};` of the `physicianSchema` definition (before `export const metadata`):

```tsx
export const revalidate = 86400;
```

The top of the file should look like:
```tsx
import type { Metadata } from "next";

const physicianSchema = JSON.stringify({ ... });

export const revalidate = 86400;

export const metadata: Metadata = {
```

- [ ] **Add `export const revalidate = 86400` to `app/services/layout.tsx`**

Add immediately before `export const metadata`:

```tsx
export const revalidate = 86400;
```

- [ ] **Add `export const revalidate = 86400` to `app/contact/layout.tsx`**

Add immediately before `export const metadata`:

```tsx
export const revalidate = 86400;
```

- [ ] **Type-check all three**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Commit**

```bash
git add app/pediatrics/layout.tsx app/services/layout.tsx app/contact/layout.tsx
git commit -m "perf: add ISR revalidate to pediatrics, services, and contact layouts"
```

---

## Task 6: Wire up env vars and smoke test

**Files:**
- Create/modify: `.env.local` (never committed — already in `.gitignore`)

- [ ] **Get the Place ID for OneHealth Clinics**

1. Go to `https://maps.google.com`
2. Search "OneHealth Clinics St George Utah"
3. Click the listing → Share → Embed a map
4. In the embed URL, find `place_id=` — copy the value (format: `ChIJ...`)

Alternatively, use the Places API to look it up:
```bash
curl "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=OneHealth%20Clinics%20St%20George%20Utah&inputtype=textquery&fields=place_id&key=YOUR_KEY"
```

- [ ] **Add env vars to `.env.local`**

```bash
GOOGLE_PLACES_API_KEY=your_api_key_here
GOOGLE_PLACE_ID=ChIJ_your_place_id_here
```

- [ ] **Enable the Places API (New) in Google Cloud Console**

Go to [console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Enable APIs → search "Places API (New)" → Enable.

Note: "Places API (New)" is distinct from the legacy "Places API" — make sure you enable the correct one. The endpoint used is `places.googleapis.com/v1/places/...`.

- [ ] **Restart the dev server and verify the full flow**

```bash
npm run dev
```

Open `http://localhost:3000`. Confirm:
- Dark teal reviews section appears after "Why OneHealth?"
- Rating badge shows score and star count in top-right
- 3 review cards visible with reviewer photo, name, stars, text, relative time
- "See all reviews on Google →" link at the bottom opens Google Maps in new tab

Open `http://localhost:3000/about`. Confirm:
- Reviews section appears at the bottom with 5 cards
- Same visual treatment

- [ ] **Add env vars to Vercel**

```bash
vercel env add GOOGLE_PLACES_API_KEY
vercel env add GOOGLE_PLACE_ID
```

Select "Production", "Preview", and "Development" for both. Or set via the Vercel dashboard under Settings → Environment Variables.

- [ ] **Final commit (if any .env.example or notes added)**

```bash
git add .
git commit -m "feat: wire up Google Places env vars"
```

---

## Verification Checklist

Before calling this done, confirm:

- [ ] Homepage renders without `"use client"` — check with `grep -n "use client" app/page.tsx` (should return nothing)
- [ ] About page renders without `"use client"` — check with `grep -n "use client" app/about/page.tsx` (should return nothing)
- [ ] `npx tsc --noEmit` passes clean
- [ ] Reviews section visible on both homepage and about page with live data
- [ ] "See all reviews on Google" opens correct Maps listing
- [ ] Reviewer photos load (confirm `referrerPolicy="no-referrer"` is on the `<img>` tags)
- [ ] If env vars are removed from `.env.local`, the section disappears cleanly with no console errors
