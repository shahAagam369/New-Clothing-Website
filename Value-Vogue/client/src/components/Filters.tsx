import { useState } from "react";
import { ChevronDown, X, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

interface FiltersProps {
  selectedCategory: string | null;
  selectedSizes: string[];
  selectedColors: string[];
  priceRange: [number, number];
  onCategoryChange: (category: string | null) => void;
  onSizesChange: (sizes: string[]) => void;
  onColorsChange: (colors: string[]) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onClearAll: () => void;
}

const categories = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL", "26", "28", "30", "32", "34", "36", "38"];

const colors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#ffffff" },
  { name: "Navy", hex: "#0a2a6c" },
  { name: "Rose", hex: "#b5838d" },
  { name: "Grey", hex: "#808080" },
  { name: "Cream", hex: "#fffdd0" },
];

const priceRanges = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 - ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 - ₹3,500", min: 2000, max: 3500 },
  { label: "₹3,500 - ₹5,000", min: 3500, max: 5000 },
  { label: "Over ₹5,000", min: 5000, max: 100000 },
];

export function Filters({
  selectedCategory,
  selectedSizes,
  selectedColors,
  priceRange,
  onCategoryChange,
  onSizesChange,
  onColorsChange,
  onPriceRangeChange,
  onClearAll,
}: FiltersProps) {
  const hasActiveFilters =
    selectedCategory !== null ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    (priceRange[0] !== 0 || priceRange[1] !== 100000);

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (priceRange[0] !== 0 || priceRange[1] !== 100000 ? 1 : 0);

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      onSizesChange(selectedSizes.filter((s) => s !== size));
    } else {
      onSizesChange([...selectedSizes, size]);
    }
  };

  const toggleColor = (colorName: string) => {
    if (selectedColors.includes(colorName)) {
      onColorsChange(selectedColors.filter((c) => c !== colorName));
    } else {
      onColorsChange([...selectedColors, colorName]);
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""} applied
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-auto p-0 text-primary hover:text-primary/80"
            data-testid="button-clear-filters"
          >
            Clear all
          </Button>
        </div>
      )}

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <span className="font-medium">Category</span>
          <ChevronDown className="h-4 w-4 transition-transform" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          <div
            className={`flex items-center cursor-pointer py-1 ${
              selectedCategory === null ? "text-foreground font-medium" : "text-muted-foreground"
            }`}
            onClick={() => onCategoryChange(null)}
            data-testid="filter-category-all"
          >
            All Categories
          </div>
          {categories.map((category) => (
            <div
              key={category.value}
              className={`flex items-center cursor-pointer py-1 ${
                selectedCategory === category.value
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
              onClick={() => onCategoryChange(category.value)}
              data-testid={`filter-category-${category.value}`}
            >
              {category.label}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <span className="font-medium">Size</span>
          <ChevronDown className="h-4 w-4 transition-transform" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-1.5 text-sm border rounded-md transition-colors ${
                  selectedSizes.includes(size)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-foreground/30"
                }`}
                data-testid={`filter-size-${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <span className="font-medium">Color</span>
          <ChevronDown className="h-4 w-4 transition-transform" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className={`flex items-center gap-2 px-3 py-1.5 border rounded-md transition-colors ${
                  selectedColors.includes(color.name)
                    ? "border-primary"
                    : "border-border hover:border-foreground/30"
                }`}
                title={color.name}
                data-testid={`filter-color-${color.name.toLowerCase()}`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-sm">{color.name}</span>
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <span className="font-medium">Price</span>
          <ChevronDown className="h-4 w-4 transition-transform" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          {priceRanges.map((range) => (
            <div
              key={range.label}
              className={`flex items-center cursor-pointer py-1 ${
                priceRange[0] === range.min && priceRange[1] === range.max
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
              onClick={() => onPriceRangeChange([range.min, range.max])}
              data-testid={`filter-price-${range.min}-${range.max}`}
            >
              {range.label}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24">
          <h2 className="font-semibold text-lg mb-4">Filters</h2>
          <FilterContent />
        </div>
      </div>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2" data-testid="button-mobile-filters">
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
