import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Shield, Gift, Sparkles } from "lucide-react";
import { useSearchStore } from "@/stores/searchStore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const searchTerm = useSearchStore(state => state.term);
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const target = document.querySelector(location.hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-secondary via-accent to-muted py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-3 h-3 mr-1" />
                New Arrivals Every Week
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Everything Your Little One Needs
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Premium quality products for babies and kids. Safe, comfortable, and loved by parents worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="shadow-lg">
                  Shop Now
                </Button>
                <Button size="lg" variant="outline">
                  View Collections
                </Button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>
            🧸
          </div>
          <div className="absolute bottom-20 right-40 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>
            🎈
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">On orders over ₹999</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Safe & Tested</h3>
                  <p className="text-sm text-muted-foreground">Quality guaranteed</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Easy Returns</h3>
                  <p className="text-sm text-muted-foreground">30-day policy</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Best Prices</h3>
                  <p className="text-sm text-muted-foreground">Value for money</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {searchTerm
                  ? `Results for "${searchTerm}"`
                  : "Featured Products"}
              </h2>
              <p className="text-muted-foreground">
                {searchTerm
                  ? "Refine your search to discover more baby and kids essentials."
                  : "Discover our curated collection of baby and kids essentials"}
              </p>
            </div>
            <ProductGrid />
          </div>
        </section>
        <section id="support" className="py-12 border-t border-border bg-secondary/5">
          <div className="container mx-auto px-4">
            <div className="md:flex md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">We're here to help</h2>
                <p className="text-muted-foreground">
                  Shipping, returns, and support tailored for busy parents.
                </p>
              </div>
              <Button size="lg" className="mt-6 md:mt-0" asChild>
                <a href="mailto:care@babyessentialshub.com">Email Support</a>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-border bg-background">
                <h3 className="font-semibold mb-2">Shipping Info</h3>
                <p className="text-sm text-muted-foreground">
                  Free shipping on orders over ₹999. Express options available at checkout for metros.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-background">
                <h3 className="font-semibold mb-2">Returns & Exchanges</h3>
                <p className="text-sm text-muted-foreground">
                  30-day easy returns. Start a request anytime by emailing our concierge team.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-border bg-background">
                <h3 className="font-semibold mb-2">Parent Hotline</h3>
                <p className="text-sm text-muted-foreground">
                  Call +91-99887-11223 Mon-Sat, 9am-7pm IST for sizing, gifting, or order help.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="company" className="py-12 border-t border-border">
          <div className="container mx-auto px-4 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold mb-4">About Baby Essentials Hub</h2>
              <p className="text-muted-foreground">
                We curate thoughtful essentials from trusted makers across India, testing every product for safety, comfort, and durability.
                From newborn cuddles to toddler adventures, we obsess over the details so you can focus on the memories.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-1">Privacy Promise</h3>
                <p className="text-sm text-muted-foreground">
                  Your data stays private and is only used to personalize your experience.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card">
                <h3 className="font-semibold mb-1">Terms & Policies</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent policies for payments, shipping, and returns keep surprises at bay.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-card border-t border-border py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="text-2xl">👶</span>
                BabyWorld
              </h3>
              <p className="text-sm text-muted-foreground">
                Your trusted partner in parenting, offering premium products for your little ones.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Baby Products", "Kids Items", "Toys & Games", "New Arrivals"].map((item) => (
                  <li key={item}>
                    <a href="#products" className="hover:text-primary transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Contact Us", "Shipping Info", "Returns", "FAQ"].map((item) => (
                  <li key={item}>
                    <a href="#support" className="hover:text-primary transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#company" className="hover:text-primary transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#company" className="hover:text-primary transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#company" className="hover:text-primary transition-colors">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 BabyWorld. All rights reserved (Rishita Kumari).
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
