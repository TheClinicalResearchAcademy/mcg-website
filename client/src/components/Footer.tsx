import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/newsletter", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully Subscribed!",
        description: "You have been added to our newsletter. Thank you for staying connected with Monache Consulting Group.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    newsletterMutation.mutate(email);
  };

  return (
    <footer className="bg-foreground text-background py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="font-heading font-bold text-xl text-primary-foreground mb-6" data-testid="footer-logo">
              Monache Consulting Group (MCG)
            </div>
            <p className="text-background/80 mb-6 leading-relaxed" data-testid="footer-description">
              Empowering clinical research sites with comprehensive training, compliance services, and strategic partnerships.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-background/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors" data-testid="social-linkedin">
                <i className="fab fa-linkedin text-background"></i>
              </a>
              <a href="#" className="bg-background/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors" data-testid="social-twitter">
                <i className="fab fa-twitter text-background"></i>
              </a>
              <a href="#" className="bg-background/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors" data-testid="social-youtube">
                <i className="fab fa-youtube text-background"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6" data-testid="footer-services-title">Services</h4>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-auditing">Auditing</Link></li>
              <li><Link href="/services" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-monitoring">Monitoring</Link></li>
              <li><Link href="/services" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-business-development">Business Development</Link></li>
              <li><Link href="/services" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-site-enablement">Site Enablement</Link></li>
              <li><Link href="/services" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-training">Training</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6" data-testid="footer-links-title">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-home">Home</Link></li>
              <li><Link href="/about" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-about">About Us</Link></li>
              <li><Link href="/add-site" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-add-site">Add Your Site</Link></li>
              <li><Link href="/contact" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-contact">Contact</Link></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors" data-testid="footer-link-careers">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6" data-testid="footer-newsletter-title">Newsletter</h4>
            <p className="text-background/80 mb-4" data-testid="footer-newsletter-description">Stay updated with the latest in clinical research compliance and training.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-3" data-testid="newsletter-form">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/10 border-background/20 text-background placeholder-background/60 focus:ring-2 focus:ring-primary focus:border-transparent"
                data-testid="newsletter-email-input"
              />
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={newsletterMutation.isPending}
                data-testid="newsletter-submit-button"
              >
                {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-background/60 text-sm mb-4 md:mb-0" data-testid="footer-copyright">
              © 2024 Monache Consulting Group. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-background/60 hover:text-background transition-colors" data-testid="footer-link-privacy">Privacy Policy</a>
              <a href="#" className="text-background/60 hover:text-background transition-colors" data-testid="footer-link-terms">Terms of Service</a>
              <a href="#" className="text-background/60 hover:text-background transition-colors" data-testid="footer-link-compliance">Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
