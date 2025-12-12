# Value & Vogue Design Guidelines

## Design Approach
**Reference-Based:** Drawing inspiration from premium e-commerce platforms like Shopify, Everlane, and Aesop—emphasizing minimalism, generous white space, and product-focused layouts.

## Core Design Elements

### Typography
- **Primary Font:** Inter (400, 500, 600 weights) - All body text, buttons, navigation, product details
- **Display Font:** Playfair Display (400, 600, 700 weights) - Page headlines, hero text, section titles
- **Hierarchy:** 
  - Hero headlines: text-5xl to text-7xl (Playfair Display)
  - Section headings: text-3xl to text-4xl (Playfair Display)
  - Product titles: text-xl to text-2xl (Inter semibold)
  - Body text: text-base to text-lg (Inter)
  - Small text/labels: text-sm (Inter)

### Layout System
**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-4 to p-6 (mobile), p-8 to p-12 (desktop)
- Section spacing: py-16 to py-24 (desktop), py-12 (mobile)
- Grid gaps: gap-4 to gap-8
- Container max-width: max-w-7xl with px-4 to px-6

### Color Palette
- **Accent:** Muted rose #b5838d (buttons, links, highlights, badges)
- **Neutrals:** Use Tailwind's gray scale (gray-50 to gray-900)
- **Backgrounds:** White (default), gray-50 (alternate sections)
- **Text:** gray-900 (primary), gray-600 (secondary), gray-400 (tertiary)
- **Borders:** gray-200 (default), gray-300 (emphasis)

### Component Library

**Navigation:**
- Clean horizontal header with logo left, nav center, cart/account icons right
- Sticky header with subtle shadow on scroll
- Mobile: Hamburger menu with slide-out drawer

**Product Cards:**
- Vertical layout: Image → Title → Price → Quick Add button
- Image aspect ratio: 3:4 or 4:5
- Subtle border (border-gray-200) or shadow-sm
- Hover: Gentle scale transform (scale-105) on image

**Product Gallery:**
- Main image display with thumbnail strip below or side
- Zoom on click/hover for desktop
- Swipeable on mobile

**Cart:**
- Slide-out drawer from right
- Line items with thumbnail, title, size/color, quantity controls, price
- Sticky footer with subtotal and checkout button

**Forms:**
- Clean input fields with border-gray-300, focus:border-rose-400
- Labels above inputs (text-sm text-gray-700)
- Rounded corners (rounded-md)
- Error states with red-500 text and border

**Buttons:**
- Primary: bg-rose-400 (accent color) with white text, hover:bg-rose-500
- Secondary: border-gray-900 with gray-900 text, hover:bg-gray-900 hover:text-white
- On images: Add backdrop-blur-sm bg-white/80 for clarity

**Filters/Search:**
- Sidebar on desktop (w-64), collapsible on mobile
- Checkbox/radio groups with clean spacing
- Clear search input with icon

### Page-Specific Designs

**Home Page:**
- Hero: Full-width image (aspect-video or h-screen max-h-[600px]) with centered text overlay and blurred-background CTA buttons
- Featured Collections: 2-column grid (desktop), 1-column (mobile)
- Product Highlights: 3-4 column grid showcasing bestsellers
- Brand Story: Single column, centered, max-w-2xl

**Shop Page:**
- Left sidebar filters (desktop), top filter button (mobile)
- Product grid: 4 columns (lg), 3 columns (md), 2 columns (sm), 1 column (mobile)
- Pagination at bottom with numbered pages

**Product Detail:**
- 2-column layout: Gallery left (60%), details right (40%)
- Size/color selectors as radio buttons or swatches
- Add to cart button prominent
- Accordion for description, specifications, shipping

**Cart/Checkout:**
- Single column, max-w-4xl centered
- Clear line item presentation
- Progress indicator for checkout steps

### Visual Treatment
- Subtle shadows: shadow-sm for cards, shadow-md for elevated elements
- Rounded corners: rounded-md for buttons/inputs, rounded-lg for cards
- Generous white space: never cramped, always breathing room
- Product images: High-quality, consistent styling, white or minimal backgrounds

### Images
**Hero Section:** Full-width lifestyle image showing clothing in context (model wearing products, lifestyle setting), minimum 1400x600px
**Product Images:** Clean product shots on white/minimal backgrounds, 1:1 or 3:4 ratio, consistent lighting
**Collection Banners:** Horizontal banners for category sections, 16:9 ratio
**About/Brand:** Authentic photography showing craftsmanship, materials, or brand story

### Accessibility
- All interactive elements have focus states (ring-2 ring-rose-400)
- Color contrast meets WCAG AA standards
- Alt text for all images
- Keyboard navigable throughout
- ARIA labels for icon-only buttons

### Animations
**Minimal & Purposeful:**
- Smooth transitions: transition-all duration-200 ease-in-out
- Hover effects: Subtle scale or opacity changes only
- Page transitions: None (keep fast and clean)
- Loading states: Simple spinner or skeleton screens