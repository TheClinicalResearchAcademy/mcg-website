import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoImage from "@assets/Monache-3_1756420059629.png";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/add-site", label: "Add Your Site" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-primary/20 shadow-lg" data-testid="main-navigation">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-heading font-bold text-xl flex items-center space-x-2 hover:scale-105 transition-transform" data-testid="logo-link">
            <img 
              src={logoImage} 
              alt="Monache Consulting Group Logo" 
              className="h-10 w-auto"
            />
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => {
              const colors = ['text-primary', 'text-secondary', 'text-accent', 'text-primary', 'text-secondary'];
              const hoverColors = ['hover:text-primary', 'hover:text-secondary', 'hover:text-accent', 'hover:text-primary', 'hover:text-secondary'];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-foreground ${hoverColors[index]} transition-all duration-200 hover:scale-105 font-medium px-3 py-1 rounded-full hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 ${
                    isActive(item.href) ? `${colors[index]} font-semibold bg-gradient-to-br from-primary/10 to-secondary/10` : ""
                  }`}
                  data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden" data-testid="mobile-menu-trigger">
                <i className="fas fa-bars text-xl" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-foreground hover:text-primary transition-colors font-medium ${
                      isActive(item.href) ? "text-primary" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                    data-testid={`mobile-nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
