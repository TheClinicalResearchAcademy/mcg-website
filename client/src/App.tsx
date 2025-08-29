import { Switch, Route, Link } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import AddSite from "@/pages/AddSite";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import TermsOfAgreement from "@/pages/TermsOfAgreement";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/add-site" component={AddSite} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/terms-of-agreement" component={TermsOfAgreement} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-transparent">
          <Banner 
            message="🎉 Now accepting new research sites! Join our network of 85+ inspection-ready clinical research sites." 
            type="announcement"
            ctaText="Apply Today"
            ctaAction={() => window.location.href = '/add-site'}
          />
          {/* Global Navigation */}
          <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-emerald-200 shadow-sm" data-testid="global-navigation">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-end items-center h-16">
                <div className="flex space-x-6">
                  <Link href="/" className="text-emerald-600 hover:text-emerald-800 transition-colors font-medium px-3 py-1 rounded-full hover:bg-emerald-100" data-testid="nav-link-home">
                    Home
                  </Link>
                  <Link href="/about" className="text-emerald-600 hover:text-emerald-800 transition-colors font-medium px-3 py-1 rounded-full hover:bg-emerald-100" data-testid="nav-link-about">
                    About Us
                  </Link>
                  <Link href="/services" className="text-emerald-600 hover:text-emerald-800 transition-colors font-medium px-3 py-1 rounded-full hover:bg-emerald-100" data-testid="nav-link-services">
                    Services
                  </Link>
                  <Link href="/add-site" className="text-emerald-600 hover:text-emerald-800 transition-colors font-medium px-3 py-1 rounded-full hover:bg-emerald-100" data-testid="nav-link-add-site">
                    Add Your Site
                  </Link>
                  <Link href="/contact" className="text-emerald-600 hover:text-emerald-800 transition-colors font-medium px-3 py-1 rounded-full hover:bg-emerald-100" data-testid="nav-link-contact">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
