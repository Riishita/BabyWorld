import { useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { localProducts } from "@/data/products";
import { useSearchStore } from "@/stores/searchStore";

export const ProductGrid = () => {
  const searchTerm = useSearchStore((state) => state.term.trim().toLowerCase());

  const products = useMemo(() => {
    if (!searchTerm) return localProducts;
    return localProducts.filter((product) => {
      const normalizedTitle = product.node.title.toLowerCase();
      const normalizedDescription =
        product.node.description?.toLowerCase() ?? "";
      return (
        normalizedTitle.includes(searchTerm) ||
        normalizedDescription.includes(searchTerm)
      );
    });
  }, [searchTerm]);

  if (products.length === 0) {
    return (
      <div className="text-center py-12 rounded-2xl border border-dashed border-border">
        <p className="text-xl font-semibold mb-2">No matches found</p>
        <p className="text-muted-foreground">
          Try searching for another product name, category, or keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
};
