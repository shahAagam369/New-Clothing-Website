import { Link } from "wouter";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/context/CartContext";
import { getCartItemsWithProducts } from "@/utils/cartUtils";
import { formatPrice } from "@/data/products";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    total,
    itemCount,
  } = useCart();

  const cartItems = getCartItemsWithProducts(cart);

  return (
    <Sheet open={isCartOpen} onOpenChange={closeCart}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg p-0">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button onClick={closeCart} asChild>
              <Link href="/shop" data-testid="link-continue-shopping">
                Continue Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="py-4 space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.productId}-${item.size}-${item.color.hex}`}
                    className="flex gap-4"
                    data-testid={`cart-item-${index}`}
                  >
                    <div className="h-24 w-20 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-medium text-sm hover:text-primary transition-colors line-clamp-2"
                          data-testid={`link-cart-item-${index}`}
                        >
                          {item.product.title}
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 flex-shrink-0"
                          onClick={() =>
                            removeFromCart(item.productId, item.size, item.color.hex)
                          }
                          aria-label="Remove item"
                          data-testid={`button-remove-item-${index}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Size: {item.size}</span>
                        <span className="text-border">|</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="h-3 w-3 rounded-full border border-border"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          {item.color.name}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.size,
                                item.color.hex,
                                item.quantity - 1
                              )
                            }
                            aria-label="Decrease quantity"
                            data-testid={`button-decrease-${index}`}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm" data-testid={`text-quantity-${index}`}>
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.size,
                                item.color.hex,
                                item.quantity + 1
                              )
                            }
                            aria-label="Increase quantity"
                            data-testid={`button-increase-${index}`}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-semibold text-sm" data-testid={`text-item-total-${index}`}>
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t px-6 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-lg" data-testid="text-cart-subtotal">
                  {formatPrice(total)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
              <div className="grid gap-2">
                <Button asChild onClick={closeCart} data-testid="button-checkout">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button variant="outline" asChild onClick={closeCart} data-testid="button-view-cart">
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
