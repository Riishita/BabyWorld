import blanketImg from "@/assets/product-blanket.jpg";
import blocksImg from "@/assets/product-blocks.jpg";
import bottleImg from "@/assets/product-bottle.jpg";
import diapersImg from "@/assets/product-diapers.jpg";
import giftsetImg from "@/assets/product-giftset.jpg";
import onesieImg from "@/assets/product-onesie.jpg";
import teddyImg from "@/assets/product-teddy.jpg";
import tshirtImg from "@/assets/product-tshirt.jpg";
import type { Product } from "@/types/product";

type LocalProductConfig = {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  currencyCode?: string;
  image: string;
};

const formatPrice = (price: number) => price.toFixed(2);

const createProduct = ({
  id,
  handle,
  title,
  description,
  price,
  currencyCode = "INR",
  image,
}: LocalProductConfig): Product => {
  const variantId = `gid://ProductVariant/${id}-default`;

  return {
    node: {
      id: `gid://Product/${id}`,
      title,
      description,
      handle,
      priceRange: {
        minVariantPrice: {
          amount: formatPrice(price),
          currencyCode,
        },
      },
      images: {
        edges: [
          {
            node: {
              url: image,
              altText: title,
            },
          },
        ],
      },
      variants: {
        edges: [
          {
            node: {
              id: variantId,
              title: "One Size",
              price: {
                amount: formatPrice(price),
                currencyCode,
              },
              availableForSale: true,
              selectedOptions: [
                {
                  name: "Size",
                  value: "One Size",
                },
              ],
            },
          },
        ],
      },
      options: [
        {
          name: "Size",
          values: ["One Size"],
        },
      ],
    },
  };
};

export const localProducts: Product[] = [
  createProduct({
    id: "blanket-soft-cloud",
    handle: "blanket-soft-cloud",
    title: "CloudSoft Organic Swaddle Blanket",
    description: "Ultra-soft, breathable organic cotton swaddle that keeps your newborn cozy through every nap.",
    price: 1299,
    image: blanketImg,
  }),
  createProduct({
    id: "play-blocks",
    handle: "play-blocks",
    title: "Rainbow Discovery Blocks (24 pcs)",
    description: "Vibrant, non-toxic wooden blocks that build creativity, fine motor skills, and endless fun.",
    price: 1799,
    image: blocksImg,
  }),
  createProduct({
    id: "sippy-bottle",
    handle: "sippy-bottle",
    title: "SipSafe Stainless Steel Bottle",
    description: "Leak-proof insulated sippy bottle that keeps drinks at the perfect temperature on the go.",
    price: 899,
    image: bottleImg,
  }),
  createProduct({
    id: "eco-diapers",
    handle: "eco-diapers",
    title: "EcoDry Bamboo Diapers (48 pack)",
    description: "Hypoallergenic, ultra-absorbent diapers made with bamboo fibers for day-to-night comfort.",
    price: 1549,
    image: diapersImg,
  }),
  createProduct({
    id: "welcome-giftset",
    handle: "welcome-giftset",
    title: "Welcome Home Gift Set",
    description: "Thoughtful newborn essentials gift set packed with a blanket, rattle, mittens, and keepsake box.",
    price: 2899,
    image: giftsetImg,
  }),
  createProduct({
    id: "organic-onesie",
    handle: "organic-onesie",
    title: "SnuggleFit Organic Onesie",
    description: "Stretchy organic cotton onesie with envelope neckline for quick changes and lasting comfort.",
    price: 749,
    image: onesieImg,
  }),
  createProduct({
    id: "cuddle-teddy",
    handle: "cuddle-teddy",
    title: "CuddleBuddy Plush Bear",
    description: "Hand-stitched plush teddy with velvety fur and hypoallergenic stuffing for comforting hugs.",
    price: 1199,
    image: teddyImg,
  }),
  createProduct({
    id: "playtime-tees",
    handle: "playtime-tees",
    title: "Playtime Graphic Tee",
    description: "Breathable cotton T-shirt with water-based inks and playful illustrations kids adore.",
    price: 599,
    image: tshirtImg,
  }),
  createProduct({
    id: "bath-time-kit",
    handle: "bath-time-kit",
    title: "Splash & Smile Bath Kit",
    description: "Complete bath time bundle with a hooded towel, gentle wash, and floating toys.",
    price: 2149,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  }),
  createProduct({
    id: "stroller-organizer",
    handle: "stroller-organizer",
    title: "StowAway Stroller Organizer",
    description: "Water-resistant organizer with insulated pockets that snaps onto any stroller in seconds.",
    price: 1699,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  }),
  createProduct({
    id: "nursery-lights",
    handle: "nursery-lights",
    title: "GlowSoft Nursery Lights",
    description: "USB-powered dimmable string lights that add warmth and calm to every nursery corner.",
    price: 1349,
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
  }),
  createProduct({
    id: "playmat-adventure",
    handle: "playmat-adventure",
    title: "AdventureSoft Play Mat",
    description: "Extra-thick reversible play mat with scenic illustrations that spark storytelling.",
    price: 2399,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  }),
];

const productsByHandle = new Map(localProducts.map((product) => [product.node.handle, product]));

export const getProductByHandle = (handle?: string) => {
  if (!handle) return undefined;
  return productsByHandle.get(handle);
};

