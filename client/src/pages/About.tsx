import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const valueProps = [
  { icon: "fas fa-award", title: "Quality", description: "Uncompromising standards in all our services", color: "primary" },
  { icon: "fas fa-shield-alt", title: "Compliance", description: "Full regulatory adherence and audit readiness", color: "secondary" },
  { icon: "fas fa-rocket", title: "Speed", description: "Rapid deployment and efficient processes", color: "accent" },
  { icon: "fas fa-database", title: "Data Integrity", description: "Secure, accurate, and verifiable data management", color: "primary" }
];

const therapeuticAreas = [
  { name: "Oncology", icon: "fas fa-ribbon", color: "primary" },
  { name: "Cardiology & Electrophysiology", icon: "fas fa-heartbeat", color: "secondary" },
  { name: "Neurology", icon: "fas fa-brain", color: "accent" },
  { name: "Endocrinology", icon: "fas fa-dna", color: "primary" },
  { name: "Infectious Disease", icon: "fas fa-virus", color: "secondary" },
  { name: "Immunology", icon: "fas fa-shield-virus", color: "accent" },
  { name: "Pulmonology", icon: "fas fa-lungs", color: "primary" },
  { name: "Gastroenterology", icon: "fas fa-notes-medical", color: "secondary" },
  { name: "Dermatology", icon: "fas fa-hand-holding-medical", color: "accent" },
  { name: "Rare & Pediatric Diseases", icon: "fas fa-microscope", color: "primary" },
  { name: "Gene Therapy", icon: "fas fa-vials", color: "secondary" },
  { name: "Mental Health", icon: "fas fa-head-side-virus", color: "accent" },
  { name: "Virology", icon: "fas fa-bacteria", color: "primary" },
  { name: "Organ Transplant", icon: "fas fa-procedures", color: "secondary" },
  { name: "Medical Devices", icon: "fas fa-microchip", color: "accent" }
];

const experienceStats = [
  { number: "11+", label: "Years of Experience", icon: "fas fa-calendar-check", color: "primary" },
  { number: "12", label: "Therapeutic Areas Covered", icon: "fas fa-stethoscope", color: "secondary" },
  { number: "Phase I-IV", label: "Trial Phase Expertise", icon: "fas fa-flask", color: "accent" },
  { number: "ICH-GCP", label: "Fully Compliant Standards", icon: "fas fa-shield-alt", color: "primary" }
];

const teamMembers = [
  {
    name: "Uchechukwu Omesiete",
    title: "Senior Clinical Research Associate",
    location: "Grapevine, TX",
    experience: "11+ Years",
    specialties: "Endocrinology, Dermatology, Cardiology, Gastroenterology, Infectious Disease, Pulmonology, Oncology, Immunology, Neurology, Rare Disease, Cardiovascular Devices, Organ Transplant",
    education: "MS Biomedical Engineering (Drexel University), BA Psychology (Temple University)",
    certifications: "GCP Certified",
    color: "primary"
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

      {/* Experience & Qualifications */}
      <section className="py-20 bg-background" data-testid="experience-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4" data-testid="experience-title">
              Our Experience & Qualifications
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="experience-subtitle">
              Decades of combined expertise supporting pharmaceutical sponsors and clinical research sites worldwide
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {experienceStats.map((stat, index) => (
              <Card key={index} data-testid={`experience-stat-${index}`}>
                <CardContent className="p-6 text-center">
                  <div className={`bg-${stat.color}/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${stat.icon} text-2xl text-${stat.color}`}></i>
                  </div>
                  <div className={`font-heading font-bold text-3xl text-${stat.color} mb-2`}>{stat.number}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Therapeutic Areas */}
      <section className="py-20 bg-muted/20" data-testid="therapeutic-areas-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4" data-testid="therapeutic-areas-title">
              Therapeutic Areas of Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="therapeutic-areas-subtitle">
              Our team has hands-on clinical research experience across a broad range of therapeutic areas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {therapeuticAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow" data-testid={`therapeutic-area-${index}`}>
                <CardContent className="p-6 flex items-center">
                  <div className={`bg-${area.color}/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                    <i className={`${area.icon} text-${area.color}`}></i>
                  </div>
                  <h3 className="font-heading font-semibold">{area.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground italic">
              Don't see your therapeutic area? <a href="/contact" className="text-primary font-semibold hover:underline">Contact us</a> — our network and expertise continue to grow.
            </p>
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
          
          <div className="grid md:grid-cols-1 max-w-3xl mx-auto gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} data-testid={`team-member-${index}`} className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start mb-6">
                    <div className={`bg-${member.color}/10 w-20 h-20 rounded-full flex items-center justify-center mr-6 flex-shrink-0`}>
                      <i className={`fas fa-user-md text-3xl text-${member.color}`}></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-xl mb-1">{member.name}</h3>
                      <p className={`text-${member.color} font-semibold mb-2`}>{member.title}</p>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        {member.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <i className="fas fa-briefcase mr-2"></i>
                        {member.experience} Experience
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">
                        <i className="fas fa-stethoscope mr-2 text-muted-foreground"></i>
                        Therapeutic Areas
                      </h4>
                      <p className="text-muted-foreground pl-6">{member.specialties}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">
                        <i className="fas fa-graduation-cap mr-2 text-muted-foreground"></i>
                        Education
                      </h4>
                      <p className="text-muted-foreground pl-6">{member.education}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-heading font-semibold text-foreground mb-1">
                        <i className="fas fa-certificate mr-2 text-muted-foreground"></i>
                        Certifications
                      </h4>
                      <p className="text-muted-foreground pl-6">{member.certifications}</p>
                    </div>
                  </div>
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
