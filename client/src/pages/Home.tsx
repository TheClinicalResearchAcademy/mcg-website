import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const services = [
  {
    icon: "fas fa-search-plus",
    title: "Auditing",
    description: "GCP compliance audits, principal investigator oversight, and comprehensive vendor auditing services.",
    color: "primary"
  },
  {
    icon: "fas fa-clipboard-check",
    title: "Monitoring",
    description: "Risk-based monitoring (RBM), on-site monitoring, source data verification and review services.",
    color: "secondary"
  },
  {
    icon: "fas fa-handshake",
    title: "Business Development",
    description: "Connect quality research sites to sponsors for successful clinical trial partnerships.",
    color: "accent"
  },
  {
    icon: "fas fa-building",
    title: "Naïve Site Management",
    description: "SOP development, staff training, and feasibility assessment for research-naïve sites.",
    color: "primary"
  },
  {
    icon: "fas fa-graduation-cap",
    title: "Comprehensive Training",
    description: "Role-based training modules for PI, CRC, CRA, CTA, DM, and CTM with certification programs.",
    color: "secondary"
  }
];

const workflowSteps = [
  {
    step: 1,
    title: "Discover",
    description: "Comprehensive assessment of your site's capabilities, needs, and regulatory readiness.",
    color: "primary"
  },
  {
    step: 2,
    title: "Enable",
    description: "SOP development, staff training, and infrastructure setup for clinical research readiness.",
    color: "secondary"
  },
  {
    step: 3,
    title: "Monitor",
    description: "Ongoing oversight, quality assurance, and compliance monitoring throughout trials.",
    color: "accent"
  },
  {
    step: 4,
    title: "Optimize",
    description: "Continuous improvement, performance analysis, and capacity building for future studies.",
    color: "primary"
  }
];

const valueProps = [
  { icon: "fas fa-award", title: "Quality", description: "Uncompromising standards in all our services", color: "primary" },
  { icon: "fas fa-shield-alt", title: "Compliance", description: "Full regulatory adherence and audit readiness", color: "secondary" },
  { icon: "fas fa-rocket", title: "Speed", description: "Rapid deployment and efficient processes", color: "accent" },
  { icon: "fas fa-database", title: "Data Integrity", description: "Secure, accurate, and verifiable data management", color: "primary" }
];

export default function Home() {
  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground leading-tight mb-6" data-testid="hero-title">
                Clinical Research.<br />
                <span className="text-primary">Audit-Ready.</span><br />
                <span className="text-secondary">Sponsor-Trusted.</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="hero-subtitle">
                Auditing • Monitoring • Business Development • Naïve Site Enablement • Comprehensive Training
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/contact">
                  <Button className="btn-primary" data-testid="hero-cta-consultation">
                    <i className="fas fa-calendar-check mr-2"></i>
                    Get a Consultation
                  </Button>
                </Link>
                <Link href="/add-site">
                  <Button variant="outline" className="btn-outline" data-testid="hero-cta-add-site">
                    <i className="fas fa-plus-circle mr-2"></i>
                    Add Your Site
                  </Button>
                </Link>
              </div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4" data-testid="trust-badges">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card className="cursor-help" data-testid="trust-badge-gcp">
                      <CardContent className="p-4 text-center">
                        <i className="fas fa-shield-alt text-2xl text-primary mb-2"></i>
                        <div className="font-medium text-sm">GCP</div>
                        <div className="font-heading font-semibold text-xs text-muted-foreground">Compliant</div>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Good Clinical Practice Certified</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card className="cursor-help" data-testid="trust-badge-cfr">
                      <CardContent className="p-4 text-center">
                        <i className="fas fa-file-contract text-2xl text-secondary mb-2"></i>
                        <div className="font-medium text-sm">21 CFR</div>
                        <div className="font-heading font-semibold text-xs text-muted-foreground">Part 11</div>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Electronic Records Compliant</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card className="cursor-help" data-testid="trust-badge-gdpr">
                      <CardContent className="p-4 text-center">
                        <i className="fas fa-lock text-2xl text-accent mb-2"></i>
                        <div className="font-medium text-sm">GDPR</div>
                        <div className="font-heading font-semibold text-xs text-muted-foreground">Ready</div>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Data Protection Compliant</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Dynamic team of clinical research professionals collaborating in modern medical facility" 
                className="rounded-xl shadow-2xl w-full h-auto"
                data-testid="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/30 relative" data-testid="services-preview-section">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4" data-testid="services-preview-title">What We Do</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-preview-subtitle">
              Comprehensive clinical research services designed to ensure compliance, quality, and success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-primary/20 border-l-4 hover:border-l-8 hover:bg-gradient-to-br hover:from-background hover:to-muted/20" style={{borderLeftColor: service.color === 'primary' ? 'hsl(171 94% 23%)' : service.color === 'secondary' ? 'hsl(218 81% 40%)' : 'hsl(158 64% 40%)'}} data-testid={`service-card-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg`} style={{backgroundColor: service.color === 'primary' ? 'hsl(171 94% 23% / 0.15)' : service.color === 'secondary' ? 'hsl(218 81% 40% / 0.15)' : 'hsl(158 64% 40% / 0.15)'}}>
                    <i className={`${service.icon} text-2xl`} style={{color: service.color === 'primary' ? 'hsl(171 94% 23%)' : service.color === 'secondary' ? 'hsl(218 81% 40%)' : 'hsl(158 64% 40%)'}}></i>
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <Link href="/services">
                    <Button variant="outline" size="sm" data-testid={`service-learn-more-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      Learn More <i className="fas fa-arrow-right ml-2"></i>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results Metrics Strip */}
      <section className="py-16 gradient-bg" data-testid="metrics-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div data-testid="metric-trainees">
              <div className="font-heading font-bold text-3xl lg:text-4xl text-primary-foreground mb-2">300+</div>
              <div className="text-primary-foreground/80">CRAs Mentored</div>
            </div>
            <div data-testid="metric-sops">
              <div className="font-heading font-bold text-3xl lg:text-4xl text-primary-foreground mb-2">150+</div>
              <div className="text-primary-foreground/80">Sponsor-Ready SOPs</div>
            </div>
            <div data-testid="metric-sites">
              <div className="font-heading font-bold text-3xl lg:text-4xl text-primary-foreground mb-2">85+</div>
              <div className="text-primary-foreground/80">Inspection-Ready Sites</div>
            </div>
            <div data-testid="metric-compliance">
              <div className="font-heading font-bold text-3xl lg:text-4xl text-primary-foreground mb-2">100%</div>
              <div className="text-primary-foreground/80">Compliance Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/5 via-background to-primary/5 relative" data-testid="workflow-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(171_94%_23%_/_0.05),transparent_50%),radial-gradient(circle_at_70%_80%,hsl(218_81%_40%_/_0.05),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4" data-testid="workflow-title">How We Work</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="workflow-subtitle">
              Our proven 4-step methodology ensures successful clinical research outcomes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className="text-center" data-testid={`workflow-step-${step.step}`}>
                <div className="relative mb-8">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`} 
                       style={{
                         background: step.color === 'primary' ? 'linear-gradient(135deg, hsl(171 94% 23%), hsl(171 94% 30%))' : 
                                    step.color === 'secondary' ? 'linear-gradient(135deg, hsl(218 81% 40%), hsl(218 81% 50%))' : 
                                    'linear-gradient(135deg, hsl(158 64% 40%), hsl(158 64% 50%))'
                       }}>
                    <span className="font-heading font-bold text-2xl text-primary-foreground">{step.step}</span>
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/60 to-secondary/60 transform translate-x-2" style={{width: "calc(100% - 2rem)"}}></div>
                  )}
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-gradient-to-br from-accent/5 via-muted/20 to-primary/5 relative" data-testid="value-props-section">
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-accent via-primary to-secondary"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4" data-testid="value-props-title">Why Choose MCG</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="value-props-subtitle">
              Our core values drive everything we do in clinical research consulting
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((prop, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-t-4" style={{borderTopColor: prop.color === 'primary' ? 'hsl(171 94% 23%)' : prop.color === 'secondary' ? 'hsl(218 81% 40%)' : 'hsl(158 64% 40%)'}} data-testid={`value-prop-${prop.title.toLowerCase()}`}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-md`} style={{backgroundColor: prop.color === 'primary' ? 'hsl(171 94% 23% / 0.15)' : prop.color === 'secondary' ? 'hsl(218 81% 40% / 0.15)' : 'hsl(158 64% 40% / 0.15)'}}>
                    <i className={`${prop.icon}`} style={{color: prop.color === 'primary' ? 'hsl(171 94% 23%)' : prop.color === 'secondary' ? 'hsl(218 81% 40%)' : 'hsl(158 64% 40%)'}}></i>
                  </div>
                  <h4 className="font-heading font-semibold mb-2">{prop.title}</h4>
                  <p className="text-sm text-muted-foreground">{prop.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
