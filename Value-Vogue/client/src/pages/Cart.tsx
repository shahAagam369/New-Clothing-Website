import { Link } from "wouter";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { getCartItemsWithProducts } from "@/utils/cartUtils";
import { formatPrice } from "@/data/products";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total, itemCount } = useCart();
  const cartItems = getCartItemsWithProducts(cart);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag className="h-20 w-20 text-muted-foreground/50 mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-semibold mb-3">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Explore our
            collection and find something you love.
          </p>
          <Button size="lg" asChild data-testid="button-start-shopping">
            <Link href="/shop">
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-3xl font-semibold">Shopping Cart</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCart}
            className="text-muted-foreground hover:text-destructive"
            data-testid="button-clear-cart"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={`${item.productId}-${item.size}-${item.color.hex}`}
              className="flex gap-4 sm:gap-6 p-4 bg-card rounded-lg border"
              data-testid={`cart-item-${index}`}
            >
              <div className="h-28 w-24 sm:h-36 sm:w-28 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="font-medium hover:text-primary transition-colors line-clamp-2"
                      data-testid={`link-cart-product-${index}`}
                    >
                      {item.product.title}
                    </Link>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
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
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      removeFromCart(item.productId, item.size, item.color.hex)
                    }
                    aria-label="Remove item"
                    data-testid={`button-remove-${index}`}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between gap-4">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
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
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center font-medium" data-testid={`text-quantity-${index}`}>
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
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
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold" data-testid={`text-item-total-${index}`}>
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.product.price)} each
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-card rounded-lg border p-6">
          <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})
              </span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{total >= 1499 ? "Free" : formatPrice(99)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>Calculated at checkout</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span data-testid="text-cart-total">
                {formatPrice(total >= 1499 ? total : total + 99)}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button size="lg" className="w-full" asChild data-testid="button-proceed-checkout">
              <Link href="/checkout">
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full" asChild data-testid="button-continue-shopping">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>

          {total < 1499 && (
            <p className="mt-4 text-sm text-center text-muted-foreground">
              Add {formatPrice(1499 - total)} more for free shipping!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
