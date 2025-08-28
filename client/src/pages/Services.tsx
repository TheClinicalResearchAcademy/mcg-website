import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

const services = [
  {
    icon: "fas fa-search-plus",
    title: "Auditing Services",
    description: "Comprehensive auditing services including GCP compliance audits, principal investigator oversight, and vendor auditing to ensure regulatory compliance and quality standards.",
    features: [
      "GCP Compliance Audits",
      "Principal Investigator Oversight",
      "Vendor Audit Services",
      "Regulatory Compliance Assessment"
    ],
    outcome: "Audit-ready sites with comprehensive compliance documentation and reduced regulatory risk.",
    color: "primary"
  },
  {
    icon: "fas fa-clipboard-check",
    title: "Monitoring Services",
    description: "Risk-based monitoring (RBM) and traditional on-site monitoring services including source data verification and review to ensure data quality and protocol compliance.",
    features: [
      "Risk-Based Monitoring (RBM)",
      "On-Site Monitoring",
      "Source Data Verification (SDV)",
      "Source Data Review (SDR)"
    ],
    outcome: "High-quality data collection with improved protocol compliance and reduced monitoring costs.",
    color: "secondary"
  },
  {
    icon: "fas fa-handshake",
    title: "Business Development",
    description: "Strategic partnership services that connect high-quality research sites with pharmaceutical sponsors for successful clinical trial collaborations and mutual growth.",
    features: [
      "Site-Sponsor Matchmaking",
      "Partnership Strategy Development",
      "Contract Negotiation Support",
      "Network Expansion Services"
    ],
    outcome: "Successful partnerships leading to increased trial opportunities and revenue growth.",
    color: "accent"
  },
  {
    icon: "fas fa-building",
    title: "Naïve Site Management",
    description: "Comprehensive support for research-naïve sites including SOP development, staff training, feasibility assessment, and infrastructure setup.",
    features: [
      "SOP Development & Implementation",
      "Staff Training Programs",
      "Feasibility Assessments",
      "Infrastructure Setup Support"
    ],
    outcome: "Research-ready sites with established processes and trained personnel capable of conducting clinical trials.",
    color: "primary"
  },
  {
    icon: "fas fa-graduation-cap",
    title: "Comprehensive Training",
    description: "Role-based training programs for all clinical research personnel including PI, CRC, CRA, CTA, DM, and CTM with certification programs and ongoing education support.",
    features: [
      "PI/CRC Training Modules",
      "CRA/CTA Certification Programs",
      "Data Management Training",
      "CTM Leadership Development"
    ],
    outcome: "Certified, competent research staff capable of conducting high-quality clinical trials.",
    color: "secondary"
  }
];

export default function Services() {
  return (
    <div data-testid="services-page">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background" data-testid="services-hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground mb-6" data-testid="services-title">
              Services We <span className="text-primary">Offer</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="services-subtitle">
              Comprehensive clinical research services tailored to your specific needs and designed to ensure compliance, quality, and success.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background" data-testid="services-grid-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8" data-testid={`service-detail-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardContent className="p-0">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`bg-${service.color}/10 w-16 h-16 rounded-xl flex items-center justify-center`}>
                      <i className={`${service.icon} text-2xl text-${service.color}`}></i>
                    </div>
                    <Link href="/contact">
                      <Button className="btn-secondary text-sm" data-testid={`request-proposal-${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        Request Proposal
                      </Button>
                    </Link>
                  </div>
                  
                  <h3 className="font-heading font-bold text-2xl mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-muted-foreground">
                        <i className="fas fa-check text-accent mr-3"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-heading font-semibold mb-2">Expected Outcomes</h4>
                    <p className="text-sm text-muted-foreground">
                      {service.outcome}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Details */}
      <section className="py-20 bg-muted/20" data-testid="training-details-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4" data-testid="training-details-title">Training Programs</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="training-details-subtitle">
              Role-based training modules designed for clinical research excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { role: "Principal Investigator (PI)", modules: ["GCP Fundamentals", "Protocol Design", "Regulatory Requirements", "Site Management"] },
              { role: "Clinical Research Coordinator (CRC)", modules: ["Patient Recruitment", "Data Collection", "Adverse Event Reporting", "Source Documentation"] },
              { role: "Clinical Research Associate (CRA)", modules: ["Monitoring Techniques", "SDV Procedures", "Query Management", "Risk Assessment"] },
              { role: "Clinical Trial Assistant (CTA)", modules: ["Administrative Support", "Document Management", "Scheduling", "Communication"] },
              { role: "Data Manager (DM)", modules: ["Database Design", "Data Validation", "Statistical Analysis", "Quality Control"] },
              { role: "Clinical Trial Manager (CTM)", modules: ["Project Management", "Team Leadership", "Budget Management", "Timeline Planning"] }
            ].map((program, index) => (
              <Card key={index} data-testid={`training-program-${program.role.toLowerCase().replace(/\s+/g, '-')}`}>
                <CardContent className="p-6">
                  <h4 className="font-heading font-semibold text-lg mb-4">{program.role}</h4>
                  <ul className="space-y-2">
                    {program.modules.map((module, moduleIndex) => (
                      <li key={moduleIndex} className="text-sm text-muted-foreground flex items-center">
                        <i className="fas fa-graduation-cap text-primary mr-2 text-xs"></i>
                        {module}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/contact">
              <Button className="btn-primary" data-testid="contact-for-training-button">
                Contact Us for Training Details
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background" data-testid="services-cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-6" data-testid="services-cta-title">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8" data-testid="services-cta-subtitle">
            Let's discuss how our services can help your site achieve clinical research excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="btn-primary" data-testid="services-cta-consultation">
                <i className="fas fa-calendar-check mr-2"></i>
                Schedule a Consultation
              </Button>
            </Link>
            <Link href="/add-site">
              <Button variant="outline" className="btn-outline" data-testid="services-cta-add-site">
                <i className="fas fa-plus-circle mr-2"></i>
                Add Your Site
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
