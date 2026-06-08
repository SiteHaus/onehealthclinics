# Google Reviews Component — Design Spec
Date: 2026-06-08

## Goal
Display live Google reviews on the homepage (3 cards) and about page (5 cards) using the Places API. Dark teal background, overall rating badge in header, "See all reviews on Google" CTA at the bottom.

## Visual Design
- **Background:** dark teal (`bg-hero-bg` — matches the existing hero section color)
- **Cards:** semi-transparent white (`rgba(255,255,255,0.08)`) with subtle white border, `rounded-xl`
- **Header:** eyebrow label left-aligned + overall rating badge (score, stars, review count) top-right
- **Stars:** Google yellow `#FBBC04`
- **Attribution / CTA:** "See all reviews on Google" link at bottom — serves as required Google ToS attribution and links to the Maps listing

## Components

### `components/google-reviews.tsx` (server component)
- Async server component — no `"use client"`
- Accepts `count?: number` prop (default: 5)
- Fetches from Places API on render, cached 24h via `next: { revalidate: 86400 }`
- Returns `null` if env vars are missing or fetch fails — section silently disappears rather than erroring
- Renders: section wrapper → header row → card grid → CTA footer

### `components/home-hero-buttons.tsx` (client component)
- `"use client"` wrapper for the two homepage CTA buttons (`Contact our Office`, `Patient Portal`)
- Extracted so `app/page.tsx` can be converted to a server component
- No logic beyond the existing `useRouter` + `window.open` calls

## Page Changes

### `app/page.tsx`
- Remove `"use client"` directive
- Remove `useRouter` import
- Import `HomeHeroButtons` in place of the inline buttons
- Import `GoogleReviews` with `count={3}`, placed after the "Why OneHealth?" section

### `app/about/page.tsx`
- Remove `"use client"` directive
- Remove dead `useRouter` import (declared but never called)
- Import `GoogleReviews` with default count (5), placed at the bottom of the page before any existing footer content

## Data Fetching

**Endpoint:** `GET https://places.googleapis.com/v1/places/{placeId}`
**Headers:**
- `X-Goog-Api-Key: {GOOGLE_PLACES_API_KEY}`
- `X-Goog-FieldMask: reviews,rating,userRatingCount`

**Response fields used:**
- `rating` — overall score (e.g. 4.9)
- `userRatingCount` — total review count (e.g. 248)
- `reviews[]` — up to 5 reviews, each with:
  - `authorAttribution.displayName`
  - `authorAttribution.photoUri`
  - `authorAttribution.uri`
  - `rating`
  - `text.text`
  - `relativePublishTimeDescription`

**Cache:** `next: { revalidate: 86400 }` (24 hours)

## Environment Variables
Both server-only — no `NEXT_PUBLIC_` prefix.

| Variable | Description |
|---|---|
| `GOOGLE_PLACES_API_KEY` | Google Cloud API key with Places API (New) enabled |
| `GOOGLE_PLACE_ID` | Place ID for OneHealth Clinics (find via Google Maps) |

## Google ToS Compliance
- Reviewer name, photo, star rating, and relative time displayed as-is — no modifications
- "See all reviews on Google" link provides required attribution — URL constructed as `https://www.google.com/maps/place/?q=place_id=${GOOGLE_PLACE_ID}`
- `referrerPolicy="no-referrer"` on reviewer photo `<img>` tags (required for Google profile photos)

## Error Handling
- Missing env vars → return `null` (no render)
- Non-OK API response → return `null`
- Empty reviews array → return `null`
- No loading states needed — server component renders complete or not at all

## Page-Level ISR

Add `export const revalidate = 86400` to the following pages. This pre-renders the full page on Vercel and serves cached HTML, improving TTFB and LCP. Content is stale-while-revalidated — pages rebuild in the background every 24 hours without user-facing downtime.

Pages to update:
- `app/page.tsx`
- `app/about/page.tsx`
- `app/pediatrics/page.tsx`
- `app/services/page.tsx`
- `app/contact/page.tsx`

Note: the `revalidate` value on the reviews `fetch()` and the page-level `revalidate` export are independent. Both should be 86400 so the page and its data cache expire on the same cadence.

## Out of Scope
- Review filtering by doctor or service (Places API only returns 5 reviews with no doctor/service metadata)
- Manual/curated testimonials
- Real-time updates (24h cache is sufficient)
