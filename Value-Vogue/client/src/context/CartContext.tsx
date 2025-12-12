import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { CartItem, ProductColor } from "@shared/schema";
import {
  getCartFromStorage,
  saveCartToStorage,
  clearCartStorage,
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  updateCartItemQuantity as updateQuantityUtil,
  getCartTotal,
  getCartItemCount,
} from "@/utils/cartUtils";

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (productId: string, size: string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, colorHex: string) => void;
  updateQuantity: (productId: string, size: string, colorHex: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedCart = getCartFromStorage();
    setCart(storedCart);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveCartToStorage(cart);
    }
  }, [cart, isInitialized]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (
    productId: string,
    size: string,
    color: ProductColor,
    quantity: number = 1
  ) => {
    setCart((prev) => addToCartUtil(prev, productId, size, color, quantity));
    openCart();
  };

  const removeFromCart = (productId: string, size: string, colorHex: string) => {
    setCart((prev) => removeFromCartUtil(prev, productId, size, colorHex));
  };

  const updateQuantity = (
    productId: string,
    size: string,
    colorHex: string,
    quantity: number
  ) => {
    setCart((prev) => updateQuantityUtil(prev, productId, size, colorHex, quantity));
  };

  const clearCart = () => {
    setCart([]);
    clearCartStorage();
  };

  const total = getCartTotal(cart);
  const itemCount = getCartItemCount(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
