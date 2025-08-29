import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const valueProps = [
  { icon: "fas fa-award", title: "Quality", description: "Uncompromising standards in all our services", color: "primary" },
  { icon: "fas fa-shield-alt", title: "Compliance", description: "Full regulatory adherence and audit readiness", color: "secondary" },
  { icon: "fas fa-rocket", title: "Speed", description: "Rapid deployment and efficient processes", color: "accent" },
  { icon: "fas fa-database", title: "Data Integrity", description: "Secure, accurate, and verifiable data management", color: "primary" }
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
    title: "Manage",
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

export default function About() {
  return (
    <div data-testid="about-page">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background" data-testid="about-hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground mb-6" data-testid="about-title">
              About <span className="text-primary">Monache</span> Consulting Group
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="about-subtitle">
              Bridging the gap between research-naïve sites and pharmaceutical sponsors through comprehensive training, 
              quality assurance, and regulatory compliance services.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background" data-testid="mission-vision-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-8">
                <h2 className="font-heading font-semibold text-2xl text-primary mb-4" data-testid="mission-title">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed text-lg" data-testid="mission-text">
                  To bridge the gap between research-naïve sites and pharmaceutical sponsors through comprehensive training, 
                  quality assurance, and regulatory compliance services that ensure successful clinical trials.
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="font-heading font-semibold text-2xl text-secondary mb-4" data-testid="vision-title">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed text-lg" data-testid="vision-text">
                  To be the leading clinical research consulting firm that empowers healthcare institutions worldwide 
                  to conduct high-quality, compliant clinical research that advances medical science.
                </p>
              </div>
              
              <Button className="btn-primary" data-testid="download-one-pager-button">
                <i className="fas fa-download mr-2"></i>
                Download Our One-Pager
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {valueProps.map((prop, index) => (
                <Card key={index} data-testid={`value-prop-card-${prop.title.toLowerCase()}`}>
                  <CardContent className="p-6">
                    <div className={`bg-${prop.color}/10 w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                      <i className={`${prop.icon} text-${prop.color}`}></i>
                    </div>
                    <h4 className="font-heading font-semibold mb-2">{prop.title}</h4>
                    <p className="text-sm text-muted-foreground">{prop.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-muted/20" data-testid="how-we-work-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4" data-testid="how-we-work-title">How We Work</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="how-we-work-subtitle">
              Our proven 4-step methodology ensures successful clinical research outcomes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className="text-center" data-testid={`workflow-step-${step.step}`}>
                <div className="relative mb-8">
                  <div className={`bg-${step.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="font-heading font-bold text-2xl text-primary-foreground">{step.step}</span>
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border transform translate-x-2" style={{width: "calc(100% - 2rem)"}}></div>
                  )}
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Team (Placeholder) */}
      <section className="py-20 bg-background" data-testid="leadership-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4" data-testid="leadership-title">Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="leadership-subtitle">
              Experienced professionals dedicated to advancing clinical research excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <Card key={member} data-testid={`leadership-member-${member}`}>
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-6 flex items-center justify-center">
                    <i className="fas fa-user text-3xl text-muted-foreground"></i>
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2">Leadership Member {member}</h3>
                  <p className="text-primary font-medium mb-4">Position Title</p>
                  <p className="text-muted-foreground text-sm">
                    Experienced clinical research professional with extensive background in pharmaceutical consulting and regulatory compliance.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Compliance */}
      <section className="py-20 bg-muted/20" data-testid="certifications-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4" data-testid="certifications-title">Certifications & Compliance</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="certifications-subtitle">
              We maintain the highest standards of regulatory compliance and professional certification
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card data-testid="certification-gcp">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-shield-alt text-2xl text-primary"></i>
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">GCP Compliance</h3>
                <p className="text-muted-foreground">
                  Full adherence to Good Clinical Practice guidelines ensuring the highest quality of clinical research conduct.
                </p>
              </CardContent>
            </Card>
            
            <Card data-testid="certification-cfr">
              <CardContent className="p-8 text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-file-contract text-2xl text-secondary"></i>
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">21 CFR Part 11</h3>
                <p className="text-muted-foreground">
                  Compliant electronic records and electronic signatures management for pharmaceutical research.
                </p>
              </CardContent>
            </Card>
            
            <Card data-testid="certification-gdpr">
              <CardContent className="p-8 text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-lock text-2xl text-accent"></i>
                </div>
                <h3 className="font-heading font-bold text-xl mb-4">GDPR Ready</h3>
                <p className="text-muted-foreground">
                  Full compliance with data protection regulations ensuring participant privacy and data security.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
