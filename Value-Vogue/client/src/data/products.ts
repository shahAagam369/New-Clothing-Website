import type { Product } from "@shared/schema";

export const products: Product[] = [
  {
    id: "vogue-0001",
    slug: "mens-classic-linen-shirt",
    title: "Men's Classic Linen Shirt",
    category: "men",
    price: 1599,
    currency: "INR",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy", hex: "#0a2a6c" },
      { name: "White", hex: "#ffffff" },
    ],
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    ],
    description: "Lightweight linen shirt, perfect for summer. Breathable fabric with a relaxed fit that transitions seamlessly from casual to formal occasions.",
    sku: "VV-M-001",
    inventory: 120,
    tags: ["linen", "summer", "formal"],
  },
  {
    id: "vogue-0002",
    slug: "mens-premium-chinos",
    title: "Men's Premium Chinos",
    category: "men",
    price: 1899,
    currency: "INR",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Khaki", hex: "#c3b091" },
      { name: "Olive", hex: "#556b2f" },
    ],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    ],
    description: "Premium cotton chinos with a modern slim fit. Perfect for both office wear and weekend outings.",
    sku: "VV-M-002",
    inventory: 85,
    tags: ["cotton", "formal", "casual"],
  },
  {
    id: "vogue-0003",
    slug: "mens-wool-blazer",
    title: "Men's Wool Blend Blazer",
    category: "men",
    price: 4999,
    currency: "INR",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#36454f" },
      { name: "Navy", hex: "#0a2a6c" },
    ],
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800&q=80",
    ],
    description: "Elegant wool blend blazer with a contemporary cut. Features notch lapels and a two-button closure.",
    sku: "VV-M-003",
    inventory: 45,
    tags: ["wool", "formal", "blazer"],
  },
  {
    id: "vogue-0004",
    slug: "mens-cotton-polo",
    title: "Men's Cotton Polo",
    category: "men",
    price: 999,
    currency: "INR",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#ffffff" },
      { name: "Rose", hex: "#b5838d" },
    ],
    images: [
      "https://images.unsplash.com/photo-1625910513413-5fc03c064369?w=800&q=80",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&q=80",
    ],
    description: "Classic cotton polo with a comfortable fit. Features ribbed collar and cuffs with a subtle brand embroidery.",
    sku: "VV-M-004",
    inventory: 200,
    tags: ["cotton", "casual", "polo"],
  },
  {
    id: "vogue-0005",
    slug: "mens-denim-jacket",
    title: "Men's Classic Denim Jacket",
    category: "men",
    price: 2499,
    currency: "INR",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Indigo", hex: "#3f51b5" },
      { name: "Light Wash", hex: "#87ceeb" },
    ],
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    ],
    description: "Timeless denim jacket with a modern fit. Perfect layering piece for all seasons.",
    sku: "VV-M-005",
    inventory: 60,
    tags: ["denim", "casual", "jacket"],
  },
  {
    id: "vogue-0006",
    slug: "mens-formal-trousers",
    title: "Men's Formal Trousers",
    category: "men",
    price: 1799,
    currency: "INR",
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Grey", hex: "#808080" },
    ],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    ],
    description: "Tailored formal trousers with a flat front design. Premium fabric with excellent drape.",
    sku: "VV-M-006",
    inventory: 95,
    tags: ["formal", "office", "trousers"],
  },
  {
    id: "vogue-0007",
    slug: "womens-silk-blouse",
    title: "Women's Silk Blouse",
    category: "women",
    price: 2299,
    currency: "INR",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Blush", hex: "#de5d83" },
      { name: "Ivory", hex: "#fffff0" },
    ],
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80",
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80",
    ],
    description: "Luxurious silk blouse with a relaxed silhouette. Features delicate button details and elegant draping.",
    sku: "VV-W-001",
    inventory: 70,
    tags: ["silk", "formal", "blouse"],
  },
  {
    id: "vogue-0008",
    slug: "womens-midi-dress",
    title: "Women's Floral Midi Dress",
    category: "women",
    price: 2799,
    currency: "INR",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Rose Garden", hex: "#b5838d" },
      { name: "Navy Floral", hex: "#0a2a6c" },
    ],
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    ],
    description: "Elegant floral midi dress perfect for special occasions. Features a flattering A-line silhouette with a cinched waist.",
    sku: "VV-W-002",
    inventory: 55,
    tags: ["floral", "dress", "midi"],
  },
  {
    id: "vogue-0009",
    slug: "womens-tailored-blazer",
    title: "Women's Tailored Blazer",
    category: "women",
    price: 3999,
    currency: "INR",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Camel", hex: "#c19a6b" },
    ],
    images: [
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80",
      "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80",
    ],
    description: "Sophisticated tailored blazer with a feminine cut. Perfect for power dressing with peak lapels and structured shoulders.",
    sku: "VV-W-003",
    inventory: 40,
    tags: ["formal", "blazer", "office"],
  },
  {
    id: "vogue-0010",
    slug: "womens-high-waist-jeans",
    title: "Women's High Waist Jeans",
    category: "women",
    price: 1999,
    currency: "INR",
    sizes: ["26", "28", "30", "32", "34"],
    colors: [
      { name: "Dark Wash", hex: "#1a237e" },
      { name: "Light Blue", hex: "#64b5f6" },
    ],
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&q=80",
    ],
    description: "Flattering high-waist jeans with a straight leg. Premium stretch denim for comfort and style.",
    sku: "VV-W-004",
    inventory: 110,
    tags: ["denim", "jeans", "casual"],
  },
  {
    id: "vogue-0011",
    slug: "womens-cashmere-sweater",
    title: "Women's Cashmere Sweater",
    category: "women",
    price: 3499,
    currency: "INR",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cream", hex: "#fffdd0" },
      { name: "Dusty Rose", hex: "#b5838d" },
    ],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
    ],
    description: "Ultra-soft cashmere sweater with a relaxed fit. Perfect for layering or wearing on its own.",
    sku: "VV-W-005",
    inventory: 35,
    tags: ["cashmere", "winter", "sweater"],
  },
  {
    id: "vogue-0012",
    slug: "womens-pleated-skirt",
    title: "Women's Pleated Midi Skirt",
    category: "women",
    price: 1699,
    currency: "INR",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Champagne", hex: "#f7e7ce" },
      { name: "Black", hex: "#000000" },
    ],
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0ebb2?w=800&q=80",
      "https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=800&q=80",
    ],
    description: "Elegant pleated midi skirt with a flowing silhouette. Features an elastic waistband for comfort.",
    sku: "VV-W-006",
    inventory: 65,
    tags: ["skirt", "pleated", "elegant"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function formatPrice(price: number, currency: string = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
