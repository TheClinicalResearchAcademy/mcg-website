export default function TermsOfAgreement() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-testid="terms-of-agreement-page">
      <div className="prose prose-lg max-w-none">
        <h1 className="font-heading font-bold text-4xl text-foreground mb-8">Terms of Agreement</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Clinical Research Consulting Agreement</h2>
          <p className="text-foreground leading-relaxed mb-4">
            This Terms of Agreement governs the professional consulting relationship between Monache Consulting Group 
            ("MCG," "Consultant") and clinical research sites, pharmaceutical sponsors, and other clients ("Client") 
            for clinical research services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Scope of Services</h2>
          
          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Auditing Services</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Good Clinical Practice (GCP) compliance audits</li>
            <li>Principal Investigator oversight assessments</li>
            <li>Vendor auditing and qualification services</li>
            <li>Regulatory compliance evaluations</li>
            <li>Quality management system reviews</li>
          </ul>

          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Monitoring Services</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Risk-based monitoring (RBM) program implementation</li>
            <li>On-site monitoring visits</li>
            <li>Source data verification and review</li>
            <li>Protocol deviation assessments</li>
            <li>Site performance monitoring</li>
          </ul>

          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Site Management Services</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Standard Operating Procedure (SOP) development</li>
            <li>Staff training and certification programs</li>
            <li>Infrastructure setup and optimization</li>
            <li>Feasibility assessments</li>
            <li>Site readiness evaluations</li>
          </ul>

          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Training and Development</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Role-based training for clinical research staff</li>
            <li>GCP certification programs</li>
            <li>Continuing education and updates</li>
            <li>Customized training modules</li>
            <li>Competency assessments</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Service Standards and Quality</h2>
          
          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Professional Standards</h3>
          <p className="text-foreground leading-relaxed mb-4">MCG commits to:</p>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Provide services in accordance with current Good Clinical Practice guidelines</li>
            <li>Maintain compliance with all applicable regulatory requirements</li>
            <li>Employ qualified professionals with appropriate credentials</li>
            <li>Follow industry best practices and standards</li>
            <li>Deliver services with professional competence and integrity</li>
          </ul>

          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Quality Assurance</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Regular quality reviews and assessments</li>
            <li>Continuous improvement of service delivery</li>
            <li>Client feedback integration</li>
            <li>Performance metrics tracking</li>
            <li>Corrective and preventive action protocols</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Client Obligations and Responsibilities</h2>
          
          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Information and Access</h3>
          <p className="text-foreground leading-relaxed mb-4">Client agrees to:</p>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Provide accurate and complete information necessary for service delivery</li>
            <li>Grant appropriate access to facilities, personnel, and documentation</li>
            <li>Ensure availability of key personnel for consultations and training</li>
            <li>Cooperate fully with MCG's service delivery processes</li>
            <li>Promptly communicate any changes affecting the engagement</li>
          </ul>

          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Regulatory Compliance</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Maintain all required licenses and certifications</li>
            <li>Ensure compliance with local and international regulations</li>
            <li>Implement recommendations in a timely manner</li>
            <li>Report any regulatory issues or concerns</li>
            <li>Maintain appropriate insurance coverage</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Payment Terms and Conditions</h2>
          
          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Fee Structure</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Professional fees will be specified in individual project proposals</li>
            <li>Travel and accommodation expenses will be billed separately</li>
            <li>Rush or expedited services may incur additional charges</li>
            <li>Fee adjustments may apply for scope changes</li>
          </ul>

          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Payment Schedule</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Initial payment may be required before service commencement</li>
            <li>Invoices are typically due within 30 days of receipt</li>
            <li>Late payment fees may apply for overdue accounts</li>
            <li>Services may be suspended for non-payment</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Confidentiality and Data Protection</h2>
          
          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Confidential Information</h3>
          <p className="text-foreground leading-relaxed mb-4">
            MCG acknowledges that in the course of providing services, we may have access to confidential information including:
          </p>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Clinical trial protocols and study data</li>
            <li>Proprietary business information</li>
            <li>Patient health information (where applicable)</li>
            <li>Regulatory submissions and correspondence</li>
            <li>Internal procedures and policies</li>
          </ul>

          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Data Protection Measures</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Secure handling and storage of all confidential information</li>
            <li>Access controls and need-to-know basis protocols</li>
            <li>Compliance with GDPR, HIPAA, and other applicable privacy laws</li>
            <li>Secure destruction of information upon agreement termination</li>
            <li>Regular security training for all personnel</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Performance Standards and Deliverables</h2>
          
          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Timeline Management</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Realistic timelines will be established for all deliverables</li>
            <li>Regular progress updates will be provided</li>
            <li>Any delays will be communicated promptly with mitigation plans</li>
            <li>Client-caused delays may result in timeline adjustments</li>
          </ul>

          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Deliverable Standards</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>All deliverables will meet agreed-upon specifications</li>
            <li>Documentation will be provided in requested formats</li>
            <li>Quality reviews will be conducted before delivery</li>
            <li>Revisions will be made to address reasonable client feedback</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Limitation of Liability and Indemnification</h2>
          <p className="text-foreground leading-relaxed mb-4">
            MCG's liability is limited to the direct damages actually incurred by the Client and shall not exceed 
            the total fees paid for the specific services that gave rise to the claim. MCG shall not be liable 
            for any indirect, consequential, or punitive damages.
          </p>
          <p className="text-foreground leading-relaxed mb-4">
            Client agrees to indemnify MCG against claims arising from Client's failure to comply with 
            applicable laws and regulations or from Client's negligent or willful misconduct.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Termination and Notice</h2>
          
          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Termination Rights</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Either party may terminate with 30 days written notice</li>
            <li>Immediate termination for material breach or non-payment</li>
            <li>Completion of ongoing deliverables upon termination</li>
            <li>Return or destruction of confidential information</li>
          </ul>

          <h3 className="font-heading font-medium text-xl text-foreground mb-3">Post-Termination</h3>
          <ul className="list-disc pl-6 text-foreground mb-4 space-y-2">
            <li>Payment for services rendered through termination date</li>
            <li>Continued confidentiality obligations</li>
            <li>Return of Client property and materials</li>
            <li>Transition assistance as reasonably requested</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Governing Law and Dispute Resolution</h2>
          <p className="text-foreground leading-relaxed mb-4">
            This agreement shall be governed by the laws of [Your State/Country]. Any disputes will first be 
            addressed through good faith negotiations. If unresolved, disputes may be submitted to binding 
            arbitration or resolved in the courts of [Your Jurisdiction].
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-2xl text-foreground mb-4">Contact Information</h2>
          <p className="text-foreground leading-relaxed mb-4">
            For questions about this Terms of Agreement or to discuss specific project requirements, please contact:
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