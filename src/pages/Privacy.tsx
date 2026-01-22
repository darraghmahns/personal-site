// src/pages/Privacy.tsx
import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            Effective Date: January 22, 2026
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Mahns Consulting ("we," "us," or "our") operates darraghmahns.com and provides 
                consulting services including PropTech automation tools. This Privacy Policy 
                describes how we collect, use, disclose, and safeguard your information when 
                you use our services, particularly our Dotloop API integration tools.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                We are committed to protecting your privacy and handling your data with 
                transparency and care. By using our services, you agree to the collection 
                and use of information in accordance with this policy.
              </p>
            </section>

            {/* Critical: Limited Use & Transience */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-blue-500 pb-2">
                1. Limited Use & Transient Data Processing
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-4">
                <p className="text-gray-800 dark:text-gray-200 font-medium">
                  Our services function as a <strong>pass-through automation tool</strong>.
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                When you use our document processing and Dotloop integration services:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>
                  We process uploaded documents solely to extract relevant data fields and 
                  synchronize them with your Dotloop account via the Dotloop API.
                </li>
                <li>
                  <strong>We do not permanently retain raw document contents</strong> or 
                  personally identifiable information (PII) after the transaction sync is completed.
                </li>
                <li>
                  Document data is held in temporary memory or ephemeral storage only during 
                  the active processing session and is immediately purged upon completion or timeout.
                </li>
                <li>
                  We maintain minimal transactional logs (timestamps, success/failure status) 
                  for operational purposes only, which do not contain the underlying document 
                  content or sensitive client PII.
                </li>
              </ul>
            </section>

            {/* Critical: No AI Training */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-red-500 pb-2">
                2. Prohibition on AI Model Training
              </h2>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
                <p className="text-gray-800 dark:text-gray-200 font-bold">
                  CRITICAL POLICY: NO AI TRAINING
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Mahns Consulting does not use Customer Data, Transaction Data, or 
                data retrieved from the Dotloop API to train, fine-tune, or improve foundation 
                Artificial Intelligence models.</strong>
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Specifically:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>
                  Your data is never fed into machine learning pipelines for model training purposes.
                </li>
                <li>
                  We do not use your documents, loop data, contact information, or transaction 
                  details to develop, enhance, or fine-tune AI systems (including but not limited 
                  to large language models, computer vision models, or predictive analytics engines).
                </li>
                <li>
                  Any AI-assisted features in our tools use pre-trained models with no 
                  customer-specific training or fine-tuning applied.
                </li>
                <li>
                  We comply with all data protection regulations and industry best practices 
                  prohibiting unauthorized data mining or algorithmic training on user data.
                </li>
              </ul>
            </section>

            {/* Data Sovereignty */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-green-500 pb-2">
                3. Data Sovereignty & User Ownership
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>You retain full ownership of your data at all times.</strong>
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-4">
                <li>
                  Our access to your Dotloop account is strictly limited to the specific OAuth 
                  scopes you explicitly grant (e.g., creating loops, reading profile information).
                </li>
                <li>
                  We operate under a principle of <strong>least privilege access</strong>—we 
                  only request and use the minimum permissions necessary to provide our services.
                </li>
                <li>
                  You may revoke our access to your Dotloop account at any time through your 
                  Dotloop account settings or by contacting us directly.
                </li>
                <li>
                  We act solely as a data processor on your behalf. You remain the data 
                  controller with complete rights to access, modify, export, or delete your data.
                </li>
                <li>
                  Your data sovereignty extends to all information processed through our systems, 
                  and we implement appropriate technical and organizational measures to ensure 
                  your rights are respected.
                </li>
              </ul>
            </section>

            {/* No Third-Party Sale */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-purple-500 pb-2">
                4. No Third-Party Sale of Data
              </h2>
              <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 mb-4">
                <p className="text-gray-800 dark:text-gray-200 font-bold">
                  STRICT PROHIBITION: We Do Not Sell Your Data
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Mahns Consulting <strong>does not sell, rent, trade, or otherwise monetize 
                your personal information, transaction data, or any data retrieved from your 
                Dotloop account</strong> to third parties, including but not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>Data brokers or aggregators</li>
                <li>Marketing agencies or advertisers</li>
                <li>Other real estate platforms or competitors</li>
                <li>Lead generation services</li>
                <li>Analytics companies (beyond essential, privacy-compliant service providers)</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Your information is used exclusively to provide, maintain, and improve our 
                services to you. We do not derive revenue from selling or sharing your data.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-gray-400 pb-2">
                5. Information We Collect
              </h2>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-4 mb-2">
                5.1 Information You Provide
              </h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <strong>Account Information:</strong> Name, email address, and contact details 
                  when you register or contact us.
                </li>
                <li>
                  <strong>OAuth Credentials:</strong> Dotloop account authorization tokens 
                  (securely stored and encrypted).
                </li>
                <li>
                  <strong>Documents:</strong> Files you upload for processing (handled transiently 
                  as described in Section 1).
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-2">
                5.2 Automatically Collected Information
              </h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
                <li>
                  <strong>Usage Data:</strong> IP address, browser type, device information, 
                  pages visited, and timestamps.
                </li>
                <li>
                  <strong>Cookies:</strong> We use essential cookies for authentication and 
                  session management. You can control cookie preferences through your browser.
                </li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-gray-400 pb-2">
                6. How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We use collected information only for the following legitimate purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>To provide and maintain our automation services</li>
                <li>To authenticate your access and process API requests</li>
                <li>To communicate with you about service updates or support issues</li>
                <li>To detect, prevent, and address technical issues or security threats</li>
                <li>To comply with legal obligations and enforce our terms of service</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 font-medium">
                We <strong>do not</strong> use your information for advertising, marketing 
                to third parties, or any purpose not directly related to service delivery.
              </p>
            </section>

            {/* Data Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-gray-400 pb-2">
                7. Data Sharing & Disclosure
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may share your information only in the following limited circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>
                  <strong>With Dotloop:</strong> Data is transmitted to Dotloop via their API 
                  as necessary to perform the services you request.
                </li>
                <li>
                  <strong>Service Providers:</strong> Trusted third-party vendors (e.g., hosting 
                  providers, security services) who assist in operating our services under 
                  strict confidentiality agreements.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law, court order, or 
                  to protect our rights, property, or safety.
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you explicitly authorize us to share 
                  information for a specific purpose.
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                In all cases, data sharing is governed by our strict no-sale policy (Section 4) 
                and limited-use principles (Section 1).
              </p>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-gray-400 pb-2">
                8. Data Security
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>Encryption of data in transit (TLS/SSL) and at rest</li>
                <li>Secure OAuth 2.0 token management with encrypted storage</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Ephemeral storage for transient document processing</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                While we strive to protect your data, no method of transmission over the 
                internet is 100% secure. You use our services at your own risk.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-gray-400 pb-2">
                9. Data Retention
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Consistent with our limited-use policy:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>
                  <strong>Transient Data:</strong> Uploaded documents and extracted data are 
                  retained only during active processing sessions and are immediately deleted 
                  upon completion.
                </li>
                <li>
                  <strong>Account Data:</strong> We retain your account information (email, 
                  name, OAuth tokens) for as long as your account is active or as needed to 
                  provide services.
                </li>
                <li>
                  <strong>Logs:</strong> Operational logs are retained for up to 90 days for 
                  security and troubleshooting purposes.
                </li>
                <li>
                  Upon account termination or at your request, we will delete your personal 
                  information within 30 days, except where retention is required by law.
                </li>
              </ul>
            </section>

            {/* User Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-gray-400 pb-2">
                10. Your Privacy Rights
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>
                  <strong>Access:</strong> Request a copy of the personal data we hold about you.
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate or incomplete data.
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal information 
                  (subject to legal retention requirements).
                </li>
                <li>
                  <strong>Revocation:</strong> Revoke OAuth access to your Dotloop account at any time.
                </li>
                <li>
                  <strong>Portability:</strong> Request export of your data in a machine-readable format.
                </li>
                <li>
                  <strong>Objection:</strong> Object to processing of your data for specific purposes.
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                To exercise these rights, <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact us</a>. We will respond within 30 days.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-gray-400 pb-2">
                11. Third-Party Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our services integrate with Dotloop via their official API. Your use of Dotloop 
                is governed by{' '}
                <a 
                  href="https://www.dotloop.com/privacy-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Dotloop's Privacy Policy
                </a>
                . We are not responsible for the privacy practices of third-party services.
              </p>
            </section>

            {/* International Users */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-gray-400 pb-2">
                12. International Data Transfers
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you are accessing our services from outside the United States, please note 
                that your information may be transferred to, stored, and processed in the U.S. 
                where our servers are located. By using our services, you consent to such transfers. 
                We comply with applicable cross-border data transfer regulations, including GDPR 
                and CCPA where applicable.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-gray-400 pb-2">
                13. Children's Privacy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not 
                knowingly collect personal information from children. If you believe we have 
                inadvertently collected such information, please <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact us immediately</a>.
              </p>
            </section>

            {/* CCPA Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-gray-400 pb-2">
                14. California Privacy Rights (CCPA)
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you are a California resident, you have additional rights under the California 
                Consumer Privacy Act (CCPA):
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>Right to know what personal information we collect, use, and disclose</li>
                <li>Right to request deletion of your personal information</li>
                <li>Right to opt-out of the sale of personal information (Note: We do not sell your data)</li>
                <li>Right to non-discrimination for exercising your privacy rights</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                To exercise your CCPA rights, <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact us</a>.
              </p>
            </section>

            {/* GDPR Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-gray-400 pb-2">
                15. European Privacy Rights (GDPR)
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you are located in the European Economic Area (EEA), you have rights under 
                the General Data Protection Regulation (GDPR), including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Our legal basis for processing your data includes: (a) your consent, (b) performance 
                of a contract with you, and (c) our legitimate interests in providing and improving 
                our services.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-gray-400 pb-2">
                16. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our 
                practices or legal requirements. We will notify you of any material changes by:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>Posting the updated policy on this page with a new "Effective Date"</li>
                <li>Sending an email notification to your registered email address</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                Your continued use of our services after such modifications constitutes acceptance 
                of the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 border-b-2 border-gray-400 pb-2">
                17. Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy Policy 
                or our data practices, please <a href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">contact us</a>.
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mt-4">
                <p className="text-gray-800 dark:text-gray-200">
                  <strong>Mahns Consulting</strong>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Website:{' '}
                  <a 
                    href="https://darraghmahns.com" 
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    darraghmahns.com
                  </a>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-1">
                  Response Time: Within 30 business days
                </p>
              </div>
            </section>

            {/* Dotloop-Specific Compliance Summary */}
            <section className="mb-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-blue-500 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  ✓ Dotloop API Compliance Summary
                </h2>
                <p className="text-gray-800 dark:text-gray-200 mb-3">
                  This Privacy Policy explicitly addresses Dotloop API governance requirements:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <span><strong>Limited Use & Transience:</strong> Pass-through processing with no permanent document retention (Section 1)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <span><strong>No AI Training:</strong> Explicit prohibition on using data for AI model training (Section 2)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <span><strong>Data Sovereignty:</strong> User ownership and limited OAuth scope access (Section 3)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 text-xl">✓</span>
                    <span><strong>No Third-Party Sale:</strong> Strict prohibition on selling or trading user data (Section 4)</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Footer Note */}
            <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-6 mt-8">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                This Privacy Policy was last updated on January 22, 2026.
                <br />
                © 2026 Mahns Consulting. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
