import { Star } from "lucide-react";

interface AuthorAttribution {
  displayName?: string;
  photoUri?: string;
  uri?: string;
}

interface Review {
  rating: number;
  text?: { text: string };
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
  const reviews = data.reviews.filter((r) => r.text?.text).slice(0, count);

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
                {review.authorAttribution.photoUri && (
                  <img
                    src={review.authorAttribution.photoUri}
                    alt={review.authorAttribution.displayName ?? "Google Reviewer"}
                    className="w-10 h-10 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div>
                  <p className="font-semibold text-sm text-white">
                    {review.authorAttribution.displayName ?? "Google Reviewer"}
                  </p>
                  <p className="text-xs text-white/50">
                    {review.relativePublishTimeDescription}
                  </p>
                </div>
              </div>
              <StarRating rating={review.rating} />
              <p className="text-sm text-white/75 leading-relaxed line-clamp-5">
                {review.text?.text}
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
