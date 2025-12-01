import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/types/product";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const toggleWishlist = useWishlistStore(state => state.toggleItem);
  const isWishlisted = useWishlistStore(state =>
    state.items.some(item => item.node.id === product.node.id)
  );
  const { node } = product;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const firstVariant = node.variants.edges[0]?.node;
    if (!firstVariant) return;

    const cartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart!", {
      description: `${node.title} has been added to your cart`,
      position: "top-center"
    });
  };

  const imageUrl = node.images.edges[0]?.node.url;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const currencyCode = node.priceRange.minVariantPrice.currencyCode;

  return (
    <Link to={`/product/${node.handle}`}>
      <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-secondary/20">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={node.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              👶
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
            aria-pressed={isWishlisted}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
              toast.success(
                isWishlisted
                  ? "Removed from wishlist"
                  : "Added to wishlist",
                {
                  description: node.title,
                  position: "top-center"
                }
              );
            }}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isWishlisted ? "text-primary" : "text-foreground"
              )}
              fill={isWishlisted ? "currentColor" : "none"}
            />
          </Button>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
            {node.title}
          </h3>
          
          {node.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {node.description}
            </p>
          )}
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {currencyCode} {price.toFixed(2)}
                </p>
              </div>
            </div>

            <Button 
              onClick={handleAddToCart}
              className="w-full group-hover:shadow-md transition-shadow"
              size="lg"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};
