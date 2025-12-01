import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ShoppingCart, Heart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { useEffect, useMemo, useState } from "react";
import { getProductByHandle } from "@/data/products";
import { useWishlistStore } from "@/stores/wishlistStore";

const ProductDetail = () => {
  const { handle } = useParams();
  const addItem = useCartStore(state => state.addItem);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");

  const product = useMemo(() => getProductByHandle(handle), [handle]);
  const toggleWishlist = useWishlistStore(state => state.toggleItem);
  const isWishlisted = useWishlistStore(state =>
    product ? state.items.some(item => item.node.id === product.node.id) : false
  );

  useEffect(() => {
    if (!product) {
      setSelectedVariantId("");
      return;
    }
    const firstVariantId = product.node.variants.edges[0]?.node.id ?? "";
    setSelectedVariantId(firstVariantId);
  }, [product]);

  if (!product) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <p>Product not found</p>
          <Link to="/">
            <Button className="mt-4">Back to Home</Button>
          </Link>
        </div>
      </>
    );
  }

  const selectedVariant =
    product.node.variants.edges.find(
      (variant) => variant.node.id === selectedVariantId
    )?.node || product.node.variants.edges[0]?.node;

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const cartItem = {
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart!", {
      description: `${product.node.title} has been added to your cart`,
      position: "top-center"
    });
  };

  const price = parseFloat(
    selectedVariant?.price.amount || product.node.priceRange.minVariantPrice.amount
  );
  const currencyCode =
    selectedVariant?.price.currencyCode ||
    product.node.priceRange.minVariantPrice.currencyCode;

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-secondary/20">
              {product.node.images.edges[0]?.node.url ? (
                <img
                  src={product.node.images.edges[0].node.url}
                  alt={product.node.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">
                  👶
                </div>
              )}
            </div>

            {product.node.images.edges.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.node.images.edges.slice(1).map((image, idx: number) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-secondary/20">
                    <img
                      src={image.node.url}
                      alt={`${product.node.title} ${idx + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.node.title}</h1>
              <p className="text-3xl font-bold text-primary">
                {currencyCode} {price.toFixed(2)}
              </p>
            </div>

            {product.node.description && (
              <p className="text-muted-foreground">{product.node.description}</p>
            )}

            {product.node.options.length > 0 && (
              <div className="space-y-4">
                {product.node.options.map((option) => (
                  <div key={option.name}>
                    <label className="text-sm font-medium mb-2 block">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value: string) => {
                        const variant = product.node.variants.edges.find((v) =>
                          v.node.selectedOptions.some((o) => o.value === value)
                        )?.node;
                        
                        return (
                          <Badge
                            key={value}
                            variant={selectedVariantId === variant?.id ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => variant && setSelectedVariantId(variant.id)}
                          >
                            {value}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {selectedVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                aria-pressed={isWishlisted}
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                onClick={() => {
                  toggleWishlist(product);
                  toast.success(
                    isWishlisted
                      ? "Removed from wishlist"
                      : "Added to wishlist",
                    {
                      description: product.node.title,
                      position: "top-center"
                    }
                  );
                }}
              >
                <Heart
                  className="w-4 h-4"
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </Button>
            </div>

            <div className="pt-6 border-t space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Safe Materials</Badge>
                <Badge variant="secondary">Fast Shipping</Badge>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
