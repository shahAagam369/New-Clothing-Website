# Value & Vogue - Premium Fashion E-commerce

A modern, premium e-commerce website for fashion retail built with React, Vite, Tailwind CSS, and Express.

## Features

### User Features
- **Home Page**: Hero section, featured products, category showcases, brand story
- **Shop Page**: Full product catalog with search, filters (category, size, color, price), sorting, and pagination
- **Product Detail**: Image gallery, size/color selection, quantity selector, add to cart
- **Shopping Cart**: Add/remove items, update quantities, localStorage persistence
- **Checkout**: Shipping form, payment method selection (COD, Card, UPI), order confirmation
- **Account**: Login/register with form validation, profile management, order history
- **Admin Panel**: Dashboard with stats, product management (demo mode)

### Cart System
- Add to cart with size/color variants
- Quick add from product cards
- Update quantities
- Remove items
- Auto total calculation
- LocalStorage persistence

### Technical Features
- Responsive design (mobile-first)
- Accessible (ARIA labels, focus states)
- SEO optimized (meta tags, Open Graph)
- TypeScript throughout
- Form validation with Zod

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Context (Cart), TanStack Query
- **Routing**: Wouter
- **Forms**: React Hook Form + Zod
- **Backend**: Express.js
- **Storage**: In-memory (upgradeable to PostgreSQL)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGallery.tsx
│   │   │   ├── CartDrawer.tsx
│   │   │   └── Filters.tsx
│   │   ├── context/         # React Context providers
│   │   │   └── CartContext.tsx
│   │   ├── data/            # Static data and utilities
│   │   │   └── products.ts
│   │   ├── pages/           # Route components
│   │   │   ├── Home.tsx
│   │   │   ├── Shop.tsx
│   │   │   ├── Product.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── Account.tsx
│   │   │   └── Admin.tsx
│   │   ├── utils/           # Utility functions
│   │   │   └── cartUtils.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── index.html
├── server/
│   ├── index.ts             # Express server entry
│   ├── routes.ts            # API endpoints
│   └── storage.ts           # Data storage layer
├── shared/
│   └── schema.ts            # Shared TypeScript types
└── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (supports filters) |
| GET | `/api/products/:id` | Get product by ID or slug |
| POST | `/api/inquiry` | Submit a product inquiry |
| POST | `/api/checkout` | Process checkout order |
| POST | `/api/admin/product` | Create new product (admin) |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:id` | Get order by ID |

### Query Parameters for `/api/products`
- `category`: Filter by category (men/women)
- `search`: Search in title, description, tags
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter

## Enabling Stripe Payments

1. Install Stripe:
```bash
npm install stripe
```

2. Add environment variables:
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

3. Uncomment the Stripe integration code in `server/routes.ts`

4. Update the checkout page to use Stripe Elements:
```tsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
```

5. Create payment intent and handle confirmation in checkout flow

## Updating Products

Products are defined in two locations:
- `client/src/data/products.ts` - Frontend product data
- `server/storage.ts` - Backend product data

To add/modify products, update both files with the same data structure:

```typescript
{
  id: "vogue-xxxx",
  slug: "product-url-slug",
  title: "Product Title",
  category: "men" | "women",
  price: 1999,
  currency: "INR",
  sizes: ["S", "M", "L", "XL"],
  colors: [{ name: "Color Name", hex: "#hexcode" }],
  images: ["https://images.unsplash.com/..."],
  description: "Product description...",
  sku: "VV-X-XXX",
  inventory: 100,
  tags: ["tag1", "tag2"]
}
```

## Accessibility Checklist

- [x] All interactive elements have focus states
- [x] Color contrast meets WCAG AA standards
- [x] Alt text for all images
- [x] Keyboard navigable throughout
- [x] ARIA labels for icon-only buttons
- [x] Form fields have associated labels
- [x] Error messages are announced
- [x] Skip links available (in header)

## Performance Tips

1. **Images**: Use WebP format and appropriate sizes
2. **Lazy Loading**: Images below the fold are lazy-loaded
3. **Code Splitting**: Routes are code-split automatically
4. **Caching**: Leverage browser caching for static assets
5. **Minification**: Production build minifies all assets

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Set root directory to `/`
4. Deploy automatically

### Other Platforms
The project is compatible with any Node.js hosting platform that supports:
- Node.js 18+
- npm builds
- Port binding on 5000 (or configure via PORT env)


## License

MIT License - Feel free to use for personal or commercial projects.

---

Built with care by Value & Vogue Team
