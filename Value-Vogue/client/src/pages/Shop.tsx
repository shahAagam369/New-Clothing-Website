import { useState, useMemo, useEffect } from "react";
import { useSearch, useLocation } from "wouter";
import { Search, Grid3X3, LayoutGrid, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Filters } from "@/components/Filters";
import { products as allProducts } from "@/data/products";

const PRODUCTS_PER_PAGE = 8;

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export default function Shop() {
  const searchParams = useSearch();
  const [, setLocation] = useLocation();
  
  const initialCategory = new URLSearchParams(searchParams).get("category");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [gridView, setGridView] = useState<"grid" | "compact">("grid");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const category = params.get("category");
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.includes(s))
      );
    }

    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedSizes, selectedColors, priceRange, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category) {
      setLocation(`/shop?category=${category}`);
    } else {
      setLocation("/shop");
    }
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 100000]);
    setCurrentPage(1);
    setLocation("/shop");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== null ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 100000;

  return (
    <div className="min-h-screen py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold mb-2">
            {selectedCategory
              ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}'s Collection`
              : "Shop All"}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <Filters
            selectedCategory={selectedCategory}
            selectedSizes={selectedSizes}
            selectedColors={selectedColors}
            priceRange={priceRange}
            onCategoryChange={handleCategoryChange}
            onSizesChange={(sizes) => {
              setSelectedSizes(sizes);
              setCurrentPage(1);
            }}
            onColorsChange={(colors) => {
              setSelectedColors(colors);
              setCurrentPage(1);
            }}
            onPriceRangeChange={(range) => {
              setPriceRange(range);
              setCurrentPage(1);
            }}
            onClearAll={handleClearAll}
          />

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>

              <div className="flex items-center gap-3">
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as SortOption)}
                >
                  <SelectTrigger className="w-[180px]" data-testid="select-sort">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex items-center border rounded-md">
                  <Button
                    variant={gridView === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setGridView("grid")}
                    aria-label="Grid view"
                    data-testid="button-grid-view"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={gridView === "compact" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setGridView("compact")}
                    aria-label="Compact view"
                    data-testid="button-compact-view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchQuery}
                    <button
                      onClick={() => setSearchQuery("")}
                      aria-label="Remove search filter"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCategory}
                    <button
                      onClick={() => handleCategoryChange(null)}
                      aria-label="Remove category filter"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedSizes.map((size) => (
                  <Badge key={size} variant="secondary" className="gap-1">
                    Size: {size}
                    <button
                      onClick={() =>
                        setSelectedSizes(selectedSizes.filter((s) => s !== size))
                      }
                      aria-label={`Remove size ${size} filter`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedColors.map((color) => (
                  <Badge key={color} variant="secondary" className="gap-1">
                    {color}
                    <button
                      onClick={() =>
                        setSelectedColors(selectedColors.filter((c) => c !== color))
                      }
                      aria-label={`Remove color ${color} filter`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {(priceRange[0] !== 0 || priceRange[1] !== 100000) && (
                  <Badge variant="secondary" className="gap-1">
                    Price range
                    <button
                      onClick={() => setPriceRange([0, 100000])}
                      aria-label="Remove price filter"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-primary hover:text-primary/80"
                  data-testid="button-clear-all-tags"
                >
                  Clear all
                </Button>
              </div>
            )}

            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  No products found matching your criteria.
                </p>
                <Button variant="outline" onClick={handleClearAll} data-testid="button-reset-filters">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <>
                <div
                  className={`grid gap-4 md:gap-6 ${
                    gridView === "grid"
                      ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                      : "grid-cols-2 md:grid-cols-4 lg:grid-cols-4"
                  }`}
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      data-testid="button-prev-page"
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-9"
                          data-testid={`button-page-${page}`}
                        >
                          {page}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      data-testid="button-next-page"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
