import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlistStore";

export const WishlistDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, clear } = useWishlistStore();

  const totalItems = items.length;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle>Wishlist</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? "Save the items you love for later."
              : `${totalItems} product${
                  totalItems === 1 ? "" : "s"
                } waiting for their new home`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center space-y-4">
              <div>
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Tap the heart on any product to add it here.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.node.id}
                      className="flex gap-4 p-3 bg-card rounded-lg"
                    >
                      <div className="w-16 h-16 bg-secondary/20 rounded-md overflow-hidden flex-shrink-0">
                        {item.node.images.edges[0]?.node.url && (
                          <img
                            src={item.node.images.edges[0].node.url}
                            alt={item.node.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.node.handle}`}
                          className="font-medium truncate hover:text-primary"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.node.title}
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.node.description}
                        </p>
                        <p className="font-semibold text-primary mt-1">
                          {item.node.priceRange.minVariantPrice.currencyCode}{" "}
                          {parseFloat(
                            item.node.priceRange.minVariantPrice.amount
                          ).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex flex-col items-center gap-2 flex-shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeItem(item.node.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          asChild
                          onClick={() => setIsOpen(false)}
                        >
                          <Link to={`/product/${item.node.handle}`}>
                            View
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 space-y-3 pt-4 border-t bg-background">
                <Button
                  variant="ghost"
                  className="w-full text-sm text-muted-foreground hover:text-destructive"
                  onClick={clear}
                >
                  Clear wishlist
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

