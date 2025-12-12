import { Link } from "wouter";
import { Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

export function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, product.sizes[0], product.colors[0], 1);
  };

  return (
    <Card className="group border-0 shadow-none bg-transparent" data-testid={`card-product-${product.id}`}>
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {showQuickAdd && (
            <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <Button
                onClick={handleQuickAdd}
                variant="secondary"
                className="w-full bg-background/90 backdrop-blur-sm"
                data-testid={`button-quick-add-${product.id}`}
              >
                <Plus className="h-4 w-4 mr-2" />
                Quick Add
              </Button>
            </div>
          )}
        </div>
      </Link>
      <CardContent className="px-0 pt-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-1" data-testid={`text-product-title-${product.id}`}>
            {product.title}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground capitalize">
          {product.category}
        </p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="font-semibold text-foreground" data-testid={`text-product-price-${product.id}`}>
            {formatPrice(product.price, product.currency)}
          </span>
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((color) => (
              <span
                key={color.hex}
                className="h-3 w-3 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] rounded-lg bg-muted" />
      <div className="pt-4 space-y-2">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/4" />
        <div className="h-5 bg-muted rounded w-1/3" />
      </div>
    </div>
  );
}
