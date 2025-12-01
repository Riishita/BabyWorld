import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Menu } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { useState, ChangeEvent } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { WishlistDrawer } from "./WishlistDrawer";
import { useSearchStore } from "@/stores/searchStore";

const navLinks = [
  { label: "Home", hash: "#hero" },
  { label: "Why Parents Love Us", hash: "#features" },
  { label: "Products", hash: "#products" },
  { label: "Support", hash: "#support" },
  { label: "About", hash: "#company" }
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchTerm = useSearchStore(state => state.term);
  const setSearchTerm = useSearchStore(state => state.setTerm);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-4">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <nav className="flex flex-col gap-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.hash}
                    to={{ pathname: "/", hash: link.hash }}
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
                <span className="text-2xl">👶</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                BabyWorld
              </h1>
            </div>
          </Link>

          {/* Search - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
                className="pl-10 rounded-full border-border focus-visible:ring-primary"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex">
              <WishlistDrawer />
            </div>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <CartDrawer />
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for products..."
              className="pl-10 rounded-full border-border focus-visible:ring-primary"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex justify-end mt-3">
            <WishlistDrawer />
          </div>
        </div>

        {/* Categories - Desktop */}
        <nav className="hidden md:flex items-center gap-6 pb-3 overflow-x-auto">
          {navLinks.map((link) => (
            <Link
              key={link.hash}
              to={{ pathname: "/", hash: link.hash }}
              className="text-sm text-muted-foreground hover:text-primary transition-colors whitespace-nowrap font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
