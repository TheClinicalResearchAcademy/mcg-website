export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-testid="terms-of-service-page">
      <div className="prose prose-lg max-w-none">
        <h1 className="font-heading font-bold text-4xl text-foreground mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Acceptance of Terms</h2>
          <p className="text-foreground leading-relaxed mb-4">
            By accessing and using the Monache Consulting Group ("MCG") website and services, you accept and agree 
            to be bound by the terms and provision of this agreement. If you do not agree to these terms, you should 
            not use our website or services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Description of Services</h2>
          <p className="text-foreground leading-relaxed mb-4">
            MCG provides clinical research consulting services including:
          </p>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Clinical trial auditing and GCP compliance services</li>
            <li>Risk-based monitoring and on-site monitoring</li>
            <li>Business development and sponsor-site matching</li>
            <li>Research-naïve site management and training</li>
            <li>Comprehensive clinical research training programs</li>
            <li>Regulatory compliance consulting</li>
            <li>Quality assurance and data integrity services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">User Obligations</h2>
          
          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Account Responsibility</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Provide accurate and complete information when registering</li>
            <li>Maintain the security of your account credentials</li>
            <li>Notify us immediately of any unauthorized access</li>
            <li>Update your information as necessary to keep it current</li>
          </ul>

          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Prohibited Uses</h3>
          <p className="text-foreground leading-relaxed mb-4">You agree not to:</p>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Use our services for any unlawful purpose or in violation of regulations</li>
            <li>Interfere with or disrupt our services or servers</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Submit false or misleading information</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Transmit malicious code or viruses</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Professional Services Terms</h2>
          
          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Service Delivery</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Services will be performed in accordance with industry standards and applicable regulations</li>
            <li>Specific terms for each engagement will be outlined in separate service agreements</li>
            <li>MCG reserves the right to subcontract services to qualified third parties</li>
            <li>Timeline and deliverables will be agreed upon in writing for each project</li>
          </ul>

          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Client Responsibilities</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Provide necessary access, information, and cooperation</li>
            <li>Ensure compliance with all applicable laws and regulations</li>
            <li>Maintain appropriate insurance coverage</li>
            <li>Promptly notify MCG of any issues or concerns</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Intellectual Property</h2>
          <p className="text-foreground leading-relaxed mb-4">
            All content, materials, and intellectual property on our website and in our services remain the 
            property of MCG or our licensors. This includes but is not limited to:
          </p>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Training materials and methodologies</li>
            <li>Proprietary assessment tools</li>
            <li>Website content and design</li>
            <li>Trademarks and service marks</li>
            <li>Software and applications</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Confidentiality</h2>
          <p className="text-foreground leading-relaxed mb-4">
            MCG maintains strict confidentiality regarding all client information and will:
          </p>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Protect confidential information in accordance with industry standards</li>
            <li>Use information only for authorized purposes</li>
            <li>Require confidentiality agreements from all staff and contractors</li>
            <li>Comply with all applicable privacy and data protection laws</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Limitation of Liability</h2>
          <p className="text-foreground leading-relaxed mb-4">
            To the fullest extent permitted by law, MCG shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages, including but not limited to loss of profits, 
            data, or business opportunities, even if advised of the possibility of such damages.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            MCG's total liability for any claims arising from our services shall not exceed the amount 
            paid by the client for the specific services giving rise to the claim.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Indemnification</h2>
          <p className="text-foreground leading-relaxed mb-4">
            You agree to indemnify and hold harmless MCG, its employees, and agents from any claims, 
            damages, or expenses arising from your use of our services or violation of these terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Termination</h2>
          <p className="text-foreground leading-relaxed mb-4">
            Either party may terminate services with appropriate notice as specified in individual service 
            agreements. MCG reserves the right to terminate access to our website and services for violation 
            of these terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Governing Law</h2>
          <p className="text-foreground leading-relaxed mb-4">
            These terms shall be governed by and construed in accordance with the laws of [Your State/Country], 
            without regard to conflict of law principles. Any disputes shall be resolved in the courts of 
            [Your Jurisdiction].
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Changes to Terms</h2>
          <p className="text-foreground leading-relaxed mb-4">
            MCG reserves the right to modify these terms at any time. Updated terms will be posted on our 
            website with a new effective date. Continued use of our services constitutes acceptance of modified terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Contact Information</h2>
          <p className="text-foreground leading-relaxed mb-4">
            For questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-muted/30 p-6 rounded-lg">
            <p className="text-foreground mb-2"><strong>Monache Consulting Group</strong></p>
            <p className="text-foreground mb-2">Email: Sites@monacheconsultinggroup.com</p>
            <p className="text-foreground mb-2">Address: [Your Business Address]</p>
            <p className="text-foreground">Phone: [Your Phone Number]</p>
          </div>
        </section>
      </div>
    </div>
  );
}