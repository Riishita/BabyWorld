import { Product } from "@/types/product";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const exists = get().items.some(
          (item) => item.node.id === product.node.id
        );
        if (exists) return;
        set({ items: [...get().items, product] });
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.node.id !== productId),
        });
      },
      toggleItem: (product) => {
        const exists = get().items.some(
          (item) => item.node.id === product.node.id
        );
        if (exists) {
          set({
            items: get().items.filter(
              (item) => item.node.id !== product.node.id
            ),
          });
        } else {
          set({ items: [...get().items, product] });
        }
      },
      isInWishlist: (productId) =>
        get().items.some((item) => item.node.id === productId),
      clear: () => set({ items: [] }),
    }),
    {
      name: "wishlist-products",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

