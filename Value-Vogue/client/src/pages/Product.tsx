import { useState } from "react";
import { useParams, Link } from "wouter";
import { Minus, Plus, ShoppingBag, Heart, Share2, Truck, RefreshCw, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { getProductBySlug, formatPrice, products } from "@/data/products";
import type { ProductColor } from "@shared/schema";

export default function Product() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-semibold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    let hasError = false;

    if (!selectedSize) {
      setSizeError(true);
      hasError = true;
    }

    if (!selectedColor) {
      setColorError(true);
      hasError = true;
    }

    if (hasError) return;

    addToCart(product.id, selectedSize!, selectedColor!, quantity);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-sm mb-8" aria-label="Breadcrumb">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link href="/shop" className="text-muted-foreground hover:text-foreground">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link
            href={`/shop?category=${product.category}`}
            className="text-muted-foreground hover:text-foreground capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <ProductGallery images={product.images} title={product.title} />

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
                {product.category}
              </p>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-2" data-testid="text-product-title">
                {product.title}
              </h1>
              <p className="text-2xl font-semibold text-foreground" data-testid="text-product-price">
                {formatPrice(product.price, product.currency)}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed" data-testid="text-product-description">
              {product.description}
            </p>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium">
                  Color{" "}
                  {selectedColor && (
                    <span className="font-normal text-muted-foreground">
                      - {selectedColor.name}
                    </span>
                  )}
                </label>
                {colorError && (
                  <span className="text-sm text-destructive">Please select a color</span>
                )}
              </div>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => {
                      setSelectedColor(color);
                      setColorError(false);
                    }}
                    className={`h-10 w-10 rounded-full border-2 transition-all ${
                      selectedColor?.hex === color.hex
                        ? "border-primary ring-2 ring-primary ring-offset-2"
                        : "border-border hover:border-foreground/30"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                    data-testid={`button-color-${color.name.toLowerCase()}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-medium">Size</label>
                {sizeError && (
                  <span className="text-sm text-destructive">Please select a size</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`min-w-[48px] h-11 px-4 border rounded-md font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-foreground/30"
                    }`}
                    aria-label={`Select size ${size}`}
                    data-testid={`button-size-${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-medium mb-3 block">Quantity</label>
              <div className="flex items-center border rounded-md w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  data-testid="button-decrease-qty"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium" data-testid="text-quantity">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  data-testid="button-increase-qty"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                data-testid="button-add-to-cart"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="sm:w-auto"
                aria-label="Add to wishlist"
                data-testid="button-wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="sm:w-auto"
                aria-label="Share product"
                data-testid="button-share"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="flex flex-col items-center text-center">
                <Truck className="h-5 w-5 text-muted-foreground mb-2" />
                <span className="text-xs text-muted-foreground">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RefreshCw className="h-5 w-5 text-muted-foreground mb-2" />
                <span className="text-xs text-muted-foreground">7-Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="h-5 w-5 text-muted-foreground mb-2" />
                <span className="text-xs text-muted-foreground">Secure Payment</span>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger>Product Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p><span className="font-medium text-foreground">SKU:</span> {product.sku}</p>
                    <p><span className="font-medium text-foreground">Category:</span> {product.category}</p>
                    <p><span className="font-medium text-foreground">Available Sizes:</span> {product.sizes.join(", ")}</p>
                    <p><span className="font-medium text-foreground">Tags:</span> {product.tags.join(", ")}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Free Shipping:</span> On all orders above ₹1,499
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Delivery Time:</span> 3-7 business days
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Returns:</span> Easy 7-day return policy. Items must be unworn with tags attached.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care">
                <AccordionTrigger>Care Instructions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Machine wash cold with like colors</p>
                    <p>Tumble dry low</p>
                    <p>Do not bleach</p>
                    <p>Iron on low heat if needed</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
