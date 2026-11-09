# SuperDiscount.99 — Deal Showcase Web Application

A mobile-first web storefront engineered for Instagram creator & curator **@SuperDiscount.99**. Built with a strict **3-across square grid ("unlimited down")** layout matching Instagram's native feed aesthetic, optimized for flash discounts, 99¢ doorbusters, and coupon code clipping.

---

## Features

- **Instagram-Native 3-Across Grid:** Strict 1:1 square tiles (`aspect-square`) running 3 columns across on all devices, extending seamlessly downwards.
- **99¢ Deal Highlighting:** Prominent emerald green neon badges and instant savings calculations for bargains under $1.
- **Interactive Quick-View Modal:** Deep deal view with live expiration countdown timer, price strikethroughs, and high-res imagery.
- **1-Click Coupon Clipper:** Copies promo codes directly with celebratory particle animations (`canvas-confetti`).
- **Dynamic Filtering & Real-time Search:** Filter by Category (`Under $1`, `Tech`, `Home & Kitchen`, `Lifestyle & Everyday`) or search across merchants and products.
- **Zero-Backend Static Architecture:** Decoupled `src/data/deals.json` catalog ready to host on Cloudflare Pages, Netlify, or Vercel for free.

---

## Project Structure

```
superdiscount-99/
├── index.html              # App entry point with SVG brand favicon
├── package.json            # Vite, React, Lucide-React, Tailwind CSS
├── tailwind.config.js      # Custom Instagram & discount color schemes
├── src/
│   ├── main.jsx            # React root mount
│   ├── App.jsx             # Main application orchestrator & state
│   ├── index.css           # Tailwind base & custom scrollbar
│   ├── data/
│   │   └── deals.json      # Structured deal catalog
│   └── components/
│       ├── Header.jsx      # IG profile hero with verified badge & live flash ticker
│       ├── Filters.jsx     # Search bar, category chips, and sort dropdown
│       ├── DealCard.jsx    # 1:1 aspect square deal tile with badge overlays
│       ├── DealGrid.jsx    # 3-column square grid container with load more logic
│       ├── DealModal.jsx   # Deal redemption modal with 1-click code copier & timer
│       └── Footer.jsx      # Affiliate disclosure & brand credits
```

---

## How to Add or Modify Deals

Open `src/data/deals.json` and append or edit deal objects:

```json
{
  "id": "deal-99",
  "title": "Product Title",
  "originalPrice": 29.99,
  "salePrice": 0.99,
  "discountPercent": 97,
  "category": "Under $1",
  "tag": "99¢ Steal",
  "merchant": "Amazon",
  "rating": 4.9,
  "reviewsCount": 1250,
  "couponCode": "DROP99",
  "affiliateUrl": "https://amazon.com/dp/...",
  "imageUrl": "https://images.unsplash.com/...",
  "description": "Full product description...",
  "expiresInHours": 6,
  "verified": true,
  "featured": true
}
```

---

## Local Development & Build

```bash
# Start local dev server (port 3000)
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
