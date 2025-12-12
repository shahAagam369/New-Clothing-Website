import type { CartItem, Product } from "@shared/schema";
import { products, getProductById } from "@/data/products";

const CART_STORAGE_KEY = "valueVogue_cart";

export function getCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveCartToStorage(cart: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function clearCartStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_STORAGE_KEY);
}

export function addToCart(
  cart: CartItem[],
  productId: string,
  size: string,
  color: { name: string; hex: string },
  quantity: number = 1
): CartItem[] {
  const existingIndex = cart.findIndex(
    (item) =>
      item.productId === productId &&
      item.size === size &&
      item.color.hex === color.hex
  );

  if (existingIndex >= 0) {
    const newCart = [...cart];
    newCart[existingIndex] = {
      ...newCart[existingIndex],
      quantity: newCart[existingIndex].quantity + quantity,
    };
    return newCart;
  }

  return [...cart, { productId, size, color, quantity }];
}

export function removeFromCart(
  cart: CartItem[],
  productId: string,
  size: string,
  colorHex: string
): CartItem[] {
  return cart.filter(
    (item) =>
      !(
        item.productId === productId &&
        item.size === size &&
        item.color.hex === colorHex
      )
  );
}

export function updateCartItemQuantity(
  cart: CartItem[],
  productId: string,
  size: string,
  colorHex: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(cart, productId, size, colorHex);
  }

  return cart.map((item) => {
    if (
      item.productId === productId &&
      item.size === size &&
      item.color.hex === colorHex
    ) {
      return { ...item, quantity };
    }
    return item;
  });
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => {
    const product = getProductById(item.productId);
    if (!product) return total;
    return total + product.price * item.quantity;
  }, 0);
}

export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export function getCartItemWithProduct(
  item: CartItem
): (CartItem & { product: Product }) | null {
  const product = getProductById(item.productId);
  if (!product) return null;
  return { ...item, product };
}

export function getCartItemsWithProducts(
  cart: CartItem[]
): (CartItem & { product: Product })[] {
  return cart
    .map(getCartItemWithProduct)
    .filter((item): item is CartItem & { product: Product } => item !== null);
}
