import { Link } from "wouter";
import { ArrowRight, Truck, Shield, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders above ₹1,499",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure transactions",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description: "7-day return policy",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Handpicked fabrics",
  },
];

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const menProducts = products.filter((p) => p.category === "men").slice(0, 3);
  const womenProducts = products.filter((p) => p.category === "women").slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="relative h-[80vh] min-h-[500px] max-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
            alt="Fashion lifestyle"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6">
            Timeless Elegance,
            <br />
            <span className="text-[#e5b8c0]">Modern Style</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Discover our curated collection of premium fashion that combines classic
            sophistication with contemporary trends.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="min-w-[180px]" data-testid="button-hero-shop">
              <Link href="/shop">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="min-w-[180px] bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              data-testid="button-hero-collection"
            >
              <Link href="/shop?category=women">
                View Collection
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center"
                data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-2">
                Featured Collection
              </h2>
              <p className="text-muted-foreground">
                Handpicked pieces for the discerning fashionista
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex" data-testid="link-view-all-featured">
              <Link href="/shop">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild data-testid="link-view-all-featured-mobile">
              <Link href="/shop">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/shop?category=men"
              className="group relative aspect-[4/3] overflow-hidden rounded-lg"
              data-testid="link-category-men"
            >
              <img
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80"
                alt="Men's Collection"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white mb-2">
                  Men's Collection
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Sophisticated styles for the modern gentleman
                </p>
                <span className="inline-flex items-center text-white font-medium text-sm">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            <Link
              href="/shop?category=women"
              className="group relative aspect-[4/3] overflow-hidden rounded-lg"
              data-testid="link-category-women"
            >
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                alt="Women's Collection"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white mb-2">
                  Women's Collection
                </h3>
                <p className="text-white/80 text-sm mb-4">
                  Elegant designs for every occasion
                </p>
                <span className="inline-flex items-center text-white font-medium text-sm">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-2">
                For Him
              </h2>
              <p className="text-muted-foreground">
                Refined essentials for the modern man
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex" data-testid="link-view-all-men">
              <Link href="/shop?category=men">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {menProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-2">
                For Her
              </h2>
              <p className="text-muted-foreground">
                Elegant pieces for every occasion
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex" data-testid="link-view-all-women">
              <Link href="/shop?category=women">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {womenProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
              Our Story
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Value & Vogue was born from a simple belief: that everyone deserves
              access to high-quality, stylish fashion without breaking the bank. We
              carefully curate each piece in our collection, ensuring exceptional
              craftsmanship and timeless design. From sourcing the finest fabrics to
              partnering with skilled artisans, we're committed to bringing you fashion
              that looks good, feels great, and stands the test of time.
            </p>
            <Button variant="outline" asChild data-testid="button-learn-more">
              <Link href="/shop">
                Explore Our Collection
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
              Join Our Newsletter
            </h2>
            <p className="opacity-90 mb-6">
              Subscribe for exclusive offers, new arrivals, and style inspiration
              delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:border-primary-foreground/40"
                data-testid="input-newsletter-email"
              />
              <Button
                type="submit"
                variant="secondary"
                className="px-6"
                data-testid="button-newsletter-subscribe"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
