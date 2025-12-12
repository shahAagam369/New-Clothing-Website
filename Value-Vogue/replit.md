# Value & Vogue - Premium Fashion E-commerce

## Overview

Value & Vogue is a premium fashion e-commerce platform built with a modern React frontend and Express.js backend. The application provides a complete online shopping experience including product browsing, cart management, checkout, user accounts, and an admin dashboard. The design follows a minimalist, product-focused approach inspired by premium retail platforms like Everlane and Aesop.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled via Vite
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: 
  - React Context for cart state with localStorage persistence
  - TanStack Query for server state and API data fetching
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Forms**: React Hook Form with Zod schema validation
- **Typography**: Inter (body text) and Playfair Display (headlines) fonts

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **API Design**: RESTful endpoints under `/api/*` prefix
- **Storage**: In-memory storage with sample data (designed for PostgreSQL upgrade via Drizzle ORM)
- **Schema**: Drizzle ORM with PostgreSQL dialect, Zod integration for validation

### Project Structure
```
client/           # Frontend React application
  src/
    components/   # Reusable UI components
    pages/        # Route-level page components
    context/      # React Context providers (Cart)
    hooks/        # Custom React hooks
    utils/        # Utility functions
    data/         # Static product data
    lib/          # Configuration (queryClient, utils)
server/           # Express.js backend
  routes.ts       # API route definitions
  storage.ts      # Data storage layer
  static.ts       # Static file serving
shared/           # Shared code between client/server
  schema.ts       # Drizzle schemas and Zod validators
```

### Key Pages
- **Home**: Hero section, featured products, category showcases
- **Shop**: Product catalog with filters (category, size, color, price), search, sorting, pagination
- **Product**: Image gallery, variant selection, add to cart
- **Cart**: Cart management with quantity updates
- **Checkout**: Shipping form, payment method selection, order confirmation
- **Account**: Login/register with form validation, profile management
- **Admin**: Dashboard with stats, product management (demo mode)

### Cart System
- Persists to localStorage via CartContext
- Supports size/color variants per product
- Real-time total calculation
- Accessible via drawer overlay or dedicated cart page

### Build System
- Development: `tsx server/index.ts` with Vite middleware for HMR
- Production: Vite builds client to `dist/public`, esbuild bundles server to `dist/index.cjs`
- Path aliases: `@/` for client/src, `@shared/` for shared code

## External Dependencies

### Database
- **Drizzle ORM**: Schema definition and query building
- **PostgreSQL**: Target database (requires `DATABASE_URL` environment variable)
- Current implementation uses in-memory storage with sample data

### UI Components
- **shadcn/ui**: Full component library (accordion, dialog, form, toast, etc.)
- **Radix UI**: Underlying accessible primitives
- **Lucide React**: Icon library
- **react-icons**: Additional social icons (Facebook, Instagram, etc.)

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation (shared between client and server)
- **drizzle-zod**: Generates Zod schemas from Drizzle tables

### Data Fetching
- **TanStack Query**: Server state management with caching

### Development Tools
- **Vite**: Frontend bundler with React plugin
- **esbuild**: Server bundler for production
- **TypeScript**: Type checking across the codebase
- **Tailwind CSS**: Utility-first styling with PostCSS