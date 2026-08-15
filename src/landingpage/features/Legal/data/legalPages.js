import privacyPolicy from "./privacyPolicy.generated.json";
import { marketingPartners } from "./marketingPartners";

const namedPartnerBullets = marketingPartners.length
  ? marketingPartners.map((p) => (p.url ? `[${p.name}](${p.url})` : p.name))
  : ["Partner list to be announced."];

export const legalPages = {
  "vulnerability-disclosure": {
    eyebrow: "Security",
    title: "Vulnerability Disclosure Policy",
    intro: "Responsible security research and coordinated disclosure for YourCreditPal.",
    updatedAt: "June 2026",
    toc: [
      "Introduction and Purpose",
      "Scope",
      "Safe Harbor",
      "Researcher Conduct",
      "Severity Classification and Response SLAs",
      "How to Submit a Vulnerability Report",
      "Coordinated Disclosure Timeline",
      "What You Can Expect from YourCreditPal",
      "Policy Governance",
      "Vulnerability Reporting Form",
    ],
    sections: [
      {
        title: "1. Introduction and Purpose",
        paragraphs: [
          "YourCreditPal (operated by ENSTEAD Company Limited) operates a loan referral and lead generation platform that collects, processes, and transfers sensitive consumer financial data to Lending Partners. The security of these systems is fundamental to our obligations to consumers and regulators. This Vulnerability Disclosure Policy (VDP) establishes a clear, legally protected channel for security researchers to report vulnerabilities to us responsibly. It is aligned to CISA's Coordinated Vulnerability Disclosure guidance and ISO/IEC 29147.",
        ],
      },
      {
        title: "2. Scope",
        subsections: [
          {
            title: "2.1 In Scope",
            bullets: [
              "yourcreditpal.com (main website, all pages, subdomains, and interactive forms);",
              "Lead submission and consumer loan inquiry forms;",
              "Consumer account portal and authenticated areas;",
              "YourCreditPal API endpoints used for lead transmission and Lending Partner integrations;",
              "YourCreditPal email infrastructure;",
              "YourCreditPal mobile website and associated subdomains.",
            ],
          },
          {
            title: "2.2 Out of Scope",
            paragraphs: [
              "The following are not authorized under this Policy and do not benefit from the safe harbor in Section 3:",
            ],
            bullets: [
              "Third-party Lending Partner or service provider systems;",
              "Denial of service (DoS / DDoS) or any testing that impairs system availability;",
              "Social engineering, phishing, or physical security testing;",
              "Automated high-volume scanning that degrades system performance;",
              "Any system, domain, or IP address not listed above.",
            ],
          },
        ],
      },
      {
        title: "3. Safe Harbor",
        paragraphs: [
          "If you make a good-faith effort to comply with this Policy, YourCreditPal will: consider your research authorized under the CFAA and other applicable computer crime laws; not initiate or recommend civil or criminal legal action against you; and work with you cooperatively to understand and resolve the issue.",
          "The safe harbor is conditional on full compliance with this Policy. It does not apply to deliberate access to or retention of consumer data, attacks on out-of-scope systems, disclosure to third parties before remediation, or conduct that violates applicable law for reasons unrelated to the vulnerability discovery. YourCreditPal will advocate on your behalf to any authority where we believe you acted in compliance with this Policy. This Policy is governed by the laws of the State of Delaware.",
        ],
      },
      {
        title: "4. Researcher Conduct",
        subsections: [
          {
            title: "4.1 Required",
            bullets: [
              "Notify YourCreditPal immediately upon discovering a real or potential vulnerability;",
              "Stop testing immediately upon encountering consumer data; after confirming a vulnerability, limit further testing to what is necessary to document the vulnerability's scope and impact;",
              "Use exploits only to the minimum extent necessary to confirm the vulnerability exists;",
              "Use only synthetic, clearly fictitious test data (never real consumer personal or financial data);",
              "Notify YourCreditPal of any test accounts created so we can remove them;",
              "Give YourCreditPal the coordinated disclosure period (Section 7) before any public disclosure;",
              "Submit reports in English with sufficient detail to reproduce the issue.",
            ],
          },
          {
            title: "4.2 Prohibited",
            paragraphs: ["The following voids the safe harbor in Section 3:"],
            bullets: [
              "Accessing, downloading, copying, retaining, or transmitting consumer personal or financial data;",
              "DoS / DDoS attacks or testing that impairs availability of any YourCreditPal system;",
              "Social engineering, phishing, vishing, or physical security testing;",
              "Testing against third-party Lending Partner or service provider systems;",
              "Disclosing vulnerability details or consumer data to any third party before YourCreditPal authorizes disclosure;",
              "Demanding payment or threatening disclosure as a condition of reporting (extortion will be reported to law enforcement). For the avoidance of doubt, routine inquiries about whether recognition is available do not constitute demands;",
              "Introducing malware, backdoors, or any persistent access into YourCreditPal systems.",
            ],
          },
        ],
      },
      {
        title: "5. Severity Classification and Response SLAs",
        paragraphs: [
          "YourCreditPal uses a four-tier severity system aligned to CVSS v3.1. Severity determines our internal response SLA:",
        ],
        tables: [
          {
            headers: ["Severity", "SLA", "Example Vulnerabilities", "CVSS Range & Commitment"],
            rows: [
              [
                "CRITICAL",
                { lines: ["Ack: 24 h", "Triage: 48 h", "Fix: 14 days"] },
                "Unauthenticated RCE; SQL injection on consumer DB; auth bypass; mass data exfiltration; consent record tampering.",
                "CVSS 9.0-10.0. Immediate escalation to CISO.",
              ],
              [
                "HIGH",
                { lines: ["Ack: 24 h", "Triage: 72 h", "Fix: 30 days"] },
                "Authenticated RCE; IDOR exposing consumer records; stored XSS in lead forms; sensitive data in API responses.",
                "CVSS 7.0-8.9. Fortnightly status updates.",
              ],
              [
                "MEDIUM",
                { lines: ["Ack: 3 days", "Triage: 5 days", "Fix: 60 days"] },
                "Reflected XSS; misconfigured SPF/DKIM/DMARC; weak session management; sensitive data in error messages.",
                "CVSS 4.0-6.9. Monthly status updates.",
              ],
              [
                "LOW",
                { lines: ["Ack: 5 days", "Triage: 10 days", "Fix: 90 days"] },
                "Missing security headers; verbose server banners; clickjacking on low-sensitivity pages; best-practice deviations.",
                "CVSS 0.0-3.9. Best-efforts remediation.",
              ],
            ],
          },
        ],
      },
      {
        title: "6. How to Submit a Vulnerability Report",
        paragraphs: [
          "Send your report through our [secure submission form](https://docs.google.com/forms/d/e/1FAIpQLSfmtO8gBnpimqb0pa5PIBUlv8OfkDKp6pkiVDXEib5-IJL13A/viewform?usp=publish-editor) or by email to contact@yourcreditpal.com with the subject line: VULNERABILITY DISCOVERED and a brief description.",
          "Please include in your report:",
        ],
        bullets: [
          "A clear summary of the vulnerability and its potential impact;",
          "Date and time of discovery; affected URLs, endpoints, or IP addresses;",
          "Step-by-step reproduction instructions with proof-of-concept (no real consumer data);",
          "Your severity assessment (Critical / High / Medium / Low) and CVSS score if known;",
          "CVE ID if assigned; known mitigation or remediation if available;",
          "Screenshots, HTTP logs, or code snippets supporting the finding;",
          "Your name / handle, email, phone, and whether you intend to publish the finding.",
        ],
        paragraphsAfter: [
          "If you encounter real consumer personal or financial data during research: stop immediately, do not copy or retain it, describe only what you observed (not actual values), confirm deletion in your report, and notify us at once.",
        ],
      },
      {
        title: "7. Coordinated Disclosure Timeline",
        paragraphs: [
          "The standard coordinated disclosure period is 90 calendar days from our acknowledgement of your report. During this period, neither party will disclose the vulnerability publicly. We may request a reasonable extension for complex remediations and will communicate any extension with a clear explanation and revised timeline.",
          "Where we fail to remediate within the agreed timeline without satisfactory explanation, you may give 14 days' written notice of intent to publish. We request that any planned publication be shared with us at least 7 days in advance and that it does not include real consumer data or unexploited technical specifics that could enable further harm.",
        ],
      },
      {
        title: "8. What You Can Expect from YourCreditPal",
        bullets: [
          "Acknowledgement within the SLA for your reported severity (Section 5);",
          "A human response from our Security Team, not an automated reply;",
          "Our severity assessment and explanation of any difference from yours;",
          "Estimated remediation timeline after triage, with updates if it changes;",
          "Notification when the vulnerability has been fixed and verified;",
          "Public credit on our Security Acknowledgements page (optional; you may choose to remain anonymous);",
          "Good-faith interpretation of ambiguous conduct where you have acted transparently.",
        ],
        paragraphsAfter: [
          "We will not share your identity with third parties without consent (except where required by law), use your report against you in any proceeding where you have complied with this Policy, or ignore your report without explanation. Where multiple researchers independently report the same vulnerability, credit will be given to the first reporter whose submission contains sufficient detail to reproduce the issue.",
          "We do not currently operate a formal bug bounty programme. For validated Critical or High severity findings, we may, at our sole discretion, offer financial recognition on a case-by-case basis.",
        ],
      },
      {
        title: "9. Policy Governance",
        paragraphs: [
          "This Policy is owned by the YourCreditPal Security Team, and reviewed annually or following any significant security incident, change in applicable law, or material change to YourCreditPal's technology infrastructure.",
        ],
      },
      {
        title: "10. Vulnerability Reporting Form",
        paragraphs: [
          "When submitting a report via our [Vulnerability Disclosure Form](https://docs.google.com/forms/d/e/1FAIpQLSfmtO8gBnpimqb0pa5PIBUlv8OfkDKp6pkiVDXEib5-IJL13A/viewform?usp=publish-editor) or by email to contact@yourcreditpal.com, please include the following information:",
        ],
        bullets: [
          "**Summary of Vulnerability**: One or two sentence description of the issue.",
          "**Date and Time Discovered**: Date, time, and time zone.",
          "**How the Vulnerability Was Discovered**: Method, tools, and steps that led to discovery.",
          "**Affected Systems / URLs / Endpoints / IPs**: List all affected systems and URLs.",
          "**Reproduction Steps**: Step-by-step instructions; include HTTP requests/payloads where relevant.",
          "**Impact Assessment**: What data or actions are exposed? Who is affected and how severely?",
          "**Severity and CVSS Score**: Critical/High/Medium/Low; CVSS v3.1 score and vector if known.",
          "**CVE ID (if assigned)**: CVE identifier, or state if you intend to request one.",
          "**Supporting Evidence**: Attach screenshots, HTTP logs, or PoC code. Do not include real consumer data.",
          "**Known Mitigation or Remediation**: Describe any fix or workaround you are aware of.",
          "**Public Disclosure Intentions**: Do you intend to publish? If so, on what timeline and format?",
          "**Consumer Data Contact**: Did you encounter real consumer data? If yes, describe what you observed and confirm deletion.",
          "**Researcher Details**: Name/handle, organization, email, phone number.",
        ],
      },
    ],
  },
  "do-not-sell": {
    eyebrow: "Privacy Rights",
    title: "Do Not Sell or Share My Personal Information",
    intro:
      "YourCreditPal (operated by ENSTEAD Company Limited) provides users with options to request limitations on certain information-sharing practices in accordance with applicable privacy laws.",
    calloutTitle: "Your Privacy Choices Matter",
    calloutBody:
      "Depending on your location and applicable laws, you may have the right to request limitations regarding how certain personal information is shared with third parties.",
    updatedAt: "June 2026",
    toc: [
      "Overview",
      "Your Privacy Rights",
      "Information Sharing Practices",
      "Submitting an Opt-Out Request",
      "Verification Requirements",
      "Authorized Agents",
      "Marketing Communication Preferences",
      "Processing Requests",
      "Contact Information",
    ],
    sections: [
      {
        title: "1. Overview",
        paragraphs: [
          "YourCreditPal may share certain information with [lending partners](/legal/marketing-partners), marketing service providers, and other service providers in order to support platform functionality and loan matching services. We do not sell your information to independent marketing companies or data brokers.",
          "Depending on applicable laws, users may request limitations regarding specific categories of information sharing.",
        ],
      },
      {
        title: "2. Your Privacy Rights",
        paragraphs: [
          "Certain state privacy laws may provide users with rights related to:",
        ],
        bullets: [
          "access to personal information",
          "deletion requests",
          "correction requests",
          "opting out of certain information-sharing practices",
          "limiting targeted advertising activities",
        ],
        paragraphsAfter: [
          "Rights may vary depending on state regulations and eligibility requirements.",
        ],
      },
      {
        title: "3. Information Sharing Practices",
        paragraphs: [
          "Information submitted through YourCreditPal may be shared with:",
        ],
        bullets: [
          "lending partners",
          "financial service providers",
          "marketing service providers",
          "verification providers",
          "operational vendors",
        ],
        subParagraphs: ["Information sharing supports:"],
        subBullets: [
          "lender matching",
          "fraud prevention",
          "communication delivery",
          "platform optimization",
        ],
        paragraphsAfter: [
          "These parties act as lending partners or as service providers on our behalf. We do not sell your personal information to independent marketing companies or data brokers. Additional information is available in our [Privacy Policy](/legal/privacy).",
        ],
      },
      {
        title: "4. Submitting an Opt-Out Request",
        anchor: "opt-out-request",
        paragraphs: [
          "Users may request limitations regarding certain information-sharing activities by submitting a privacy request through the form below or by contacting support directly.",
          "Requests may require identity verification before completion. YourCreditPal may contact you regarding your request if additional information is needed.",
        ],
        linkPrefix: "Submit a Privacy Request via Google Form: ",
        linkText: "Opt-Out Form Link",
        linkHref:
          "https://docs.google.com/forms/d/e/1FAIpQLSelUHgUe3kpNQEip5u5ugU1qCQNljanTpYIaS5TkHbAEHq3gQ/viewform",
      },
      {
        title: "5. Verification Requirements",
        paragraphs: [
          "To protect user information, YourCreditPal may require verification before fulfilling privacy-related requests.",
          "Verification may include confirming:",
        ],
        bullets: [
          "name",
          "email address",
          "phone number",
          "prior application information",
        ],
        paragraphsAfter: [
          "Incomplete or unverifiable requests may not be processed.",
        ],
      },
      {
        title: "6. Authorized Agents",
        paragraphs: [
          "In certain situations, users may authorize another individual or representative to submit requests on their behalf where permitted by law.",
          "Additional verification documentation may be required.",
        ],
      },
      {
        title: "7. Marketing Communication Preferences",
        paragraphs: ["Users may also manage promotional communications by:"],
        bullets: [
          "clicking [unsubscribe](/unsubscribe) links",
          "replying STOP to SMS messages",
          "contacting support directly",
        ],
        paragraphsAfter: [
          "Operational communications related to applications or lender activity may still be required.",
        ],
      },
      {
        title: "8. Processing Requests",
        paragraphs: [
          "YourCreditPal works to process verified privacy requests within applicable legal timeframes.",
          "Response timelines may vary depending on:",
        ],
        bullets: [
          "request complexity",
          "identity verification",
          "applicable legal requirements",
        ],
      },
      {
        title: "9. Contact Us",
        anchor: "contact-information",
        paragraphs: ["If you have questions, please contact:"],
        linkText: "contact@yourcreditpal.com",
        linkHref: "mailto:contact@yourcreditpal.com",
      },
    ],
    noteTitle: "Committed to Privacy Transparency",
    noteBody:
      "YourCreditPal works to support responsible privacy practices and user data control in accordance with applicable regulations.",
  },
  "marketing-partners": {
    eyebrow: "Partner Network",
    title: "Marketing Partners & Service Providers",
    intro:
      "YourCreditPal (operated by ENSTEAD Company Limited) may work with lending partners, service providers, and marketing service providers to support loan matching and related platform operations.",
    calloutTitle: "Please Read Carefully",
    calloutBody:
      "Submitting a request through YourCreditPal may result in communications from lending partners or authorized service providers related to your application or financial offers.",
    updatedAt: "June 2026",
    toc: [
      "Overview",
      "Lending Partners",
      "Marketing Communications",
      "Service Providers",
      "Data Sharing Practices",
      "Communication Preferences",
      "Third-Party Policies",
      "Contact Information",
    ],
    sections: [
      {
        title: "1. Overview",
        paragraphs: ["YourCreditPal works with a network of independent:"],
        bullets: [
          "lenders",
          "financial service providers",
          "lead distribution partners",
          "marketing service providers",
          "verification and fraud prevention services",
        ],
        paragraphsAfter: [
          "These partnerships help support loan matching, application processing, communication delivery, and platform operations.",
        ],
      },
      {
        title: "2. Lending Partners",
        paragraphs: [
          "Information submitted through YourCreditPal may be shared with the following participating lending partners for the purpose of evaluating potential loan opportunities:",
        ],
        bullets: namedPartnerBullets,
        paragraphsAfter: [
          "Participating lenders independently determine loan eligibility, approval decisions, repayment terms, interest rates, and funding timelines. YourCreditPal does not control lender decisions or financial products offered by lenders.",
        ],
      },
      {
        title: "3. Marketing Communications",
        paragraphs: [
          "Users may receive communications from YourCreditPal or authorized partners regarding:",
        ],
        bullets: [
          "loan opportunities",
          "financial products",
          "promotional offers",
          "application updates",
          "related financial services",
        ],
        subParagraphs: ["Communications may be delivered through:"],
        subBullets: [
          "email",
          "SMS/text messages",
          "phone calls",
          "online advertising",
        ],
        paragraphsAfter: ["Message and data rates may apply."],
      },
      {
        title: "4. Service Providers",
        paragraphs: [
          "YourCreditPal may work with third-party providers that support:",
        ],
        bullets: [
          "identity verification",
          "fraud prevention",
          "analytics",
          "website functionality",
          "communication delivery",
          "customer support",
        ],
        paragraphsAfter: [
          "These providers may access limited information necessary to perform operational services.",
        ],
      },
      {
        title: "5. Data Sharing Practices",
        paragraphs: [
          "YourCreditPal may share submitted information only as necessary to:",
        ],
        bullets: [
          "support lender matching",
          "provide requested services",
          "improve platform operations",
          "comply with legal obligations",
          "reduce fraudulent activity",
        ],
        paragraphsAfter: [
          "We do not sell your personal information to independent marketing companies or data brokers. Information sharing practices are further described in our [Privacy Policy](/legal/privacy). You may limit certain sharing through our [Do Not Sell or Share My Personal Information](/legal/do-not-sell) page.",
        ],
      },
      {
        title: "6. Managing Communication Preferences",
        anchor: "communication-preferences",
        paragraphs: [
          "Users may manage or limit promotional communications by:",
        ],
        bullets: [
          "clicking [unsubscribe](/unsubscribe) links",
          "replying STOP to SMS messages",
          "contacting support directly",
        ],
        paragraphsAfter: [
          "Some operational or transactional communications may still be required for application processing.",
        ],
      },
      {
        title: "7. Third-Party Privacy Policies",
        anchor: "third-party-policies",
        paragraphs: [
          "Participating lenders and third-party partners may maintain separate privacy policies and communication practices.",
          "Users are encouraged to review third-party policies carefully before engaging with external services or accepting financial offers.",
        ],
      },
      {
        title: "8. Contact Us",
        anchor: "contact-information",
        paragraphs: ["If you have questions, please contact:"],
        linkText: "contact@yourcreditpal.com",
        linkHref: "mailto:contact@yourcreditpal.com",
      },
    ],
    noteTitle: "Committed to Transparency",
    noteBody:
      "YourCreditPal works to maintain responsible communication and information-sharing practices throughout the application process.",
  },
  "electronic-consent": {
    eyebrow: "Electronic Communications",
    title: "Electronic Consent Agreement",
    intro:
      "This Electronic Consent Agreement explains how YourCreditPal (operated by ENSTEAD Company Limited) and participating lending partners may provide disclosures, notices, and communications electronically.",
    calloutTitle: "Please Read Carefully",
    calloutBody:
      "By using YourCreditPal and submitting a loan request, you consent to receive communications and disclosures electronically instead of through paper documents.",
    updatedAt: "June 2026",
    toc: [
      "Overview",
      "Consent to Electronic Communications",
      "System Requirements",
      "Electronic Signatures",
      "Withdrawing Consent",
      "Paper Copies of Communications",
      "Updating Your Information",
      "Third-Party Communications",
      "Contact Information",
    ],
    sections: [
      {
        title: "1. Overview",
        paragraphs: [
          "YourCreditPal and participating lending partners may provide required disclosures, agreements, notices, and communications electronically.",
          "These electronic communications may include:",
        ],
        bullets: [
          "loan disclosures",
          "agreements",
          "notices",
          "application updates",
          "lender communications",
          "marketing communications where permitted",
        ],
      },
      {
        title: "2. Consent to Electronic Communications",
        paragraphs: [
          "By submitting information through YourCreditPal, you agree to receive electronic communications from:",
        ],
        bullets: [
          "YourCreditPal",
          "lending partners",
          "service providers",
          "authorized third parties involved in the application process",
        ],
        paragraphsAfter: [
          "Electronic communications may be delivered through:",
        ],
        subBullets: [
          "email",
          "website notifications",
          "SMS/text messages",
          "downloadable documents",
          "electronic signatures",
        ],
      },
      {
        title: "3. System Requirements",
        paragraphs: [
          "To access and retain electronic communications, users should have:",
        ],
        bullets: [
          "internet access",
          "a supported web browser",
          "a valid email address",
          "access to a device capable of viewing PDFs or electronic documents",
        ],
        paragraphsAfter: [
          "Users are responsible for maintaining updated contact information and system compatibility.",
        ],
      },
      {
        title: "4. Electronic Signatures",
        paragraphs: [
          "Electronic signatures and acknowledgments provided through YourCreditPal or participating lenders may carry the same legal effect as handwritten signatures where permitted by applicable laws.",
        ],
      },
      {
        title: "5. Withdrawing Consent",
        paragraphs: [
          "Users may withdraw electronic consent by [contacting support](/faq).",
          "Withdrawing consent may limit access to certain services, lender communications, or application processing capabilities.",
        ],
      },
      {
        title: "6. Paper Copies of Communications",
        anchor: "paper-copies",
        paragraphs: [
          "In certain situations, users may request paper copies of specific disclosures or communications directly from the applicable lender or service provider.",
          "Availability and fees for paper copies may vary depending on lender policies.",
        ],
      },
      {
        title: "7. Updating Your Information",
        anchor: "updating-information",
        paragraphs: ["Users are responsible for maintaining accurate:"],
        bullets: ["email addresses", "phone numbers", "mailing addresses"],
        paragraphsAfter: [
          "Failure to maintain updated contact information may affect communication delivery.",
        ],
      },
      {
        title: "8. Third-Party Communications",
        paragraphs: [
          "Participating lenders and financial partners may independently provide disclosures, agreements, and communications electronically.",
          "Users should carefully review all lender-provided documents before accepting any offer.",
        ],
      },
      {
        title: "9. Contact Us",
        anchor: "contact-information",
        paragraphs: ["If you have questions, please contact:"],
        linkText: "contact@yourcreditpal.com",
        linkHref: "mailto:contact@yourcreditpal.com",
      },
    ],
    noteTitle: "Before Continuing, Please Ensure You Have:",
    noteBullets: [
      "Access to a valid email address",
      "A supported internet browser",
      "Ability to receive electronic communications",
      "Access to view digital documents",
    ],
  },
  "financial-disclosures": {
    eyebrow: "Financial Information",
    title: "Financial Disclosures",
    intro:
      "Important information regarding loan terms, repayment responsibilities, lender policies, and borrowing considerations.",
    calloutTitle: "Please Borrow Responsibly",
    calloutBody:
      "Loan terms, rates, repayment schedules, and approval decisions are determined independently by lenders and may vary based on your financial profile and state regulations.",
    updatedAt: "June 2026",
    toc: [
      "Rates & Fees",
      "Loan Terms",
      "Repayment Responsibility",
      "Late Payments",
      "Non-Payment",
      "Loan Renewals",
      "Responsible Borrowing",
      "Lender Responsibility",
      "Contact Information",
    ],
    sections: [
      {
        title: "1. Rates & Fees",
        paragraphs: [
          "YourCreditPal (operated by ENSTEAD Company Limited) does not charge fees for submitting a loan request through our platform.",
          "Loan rates, APRs, repayment terms, and associated fees are determined independently by participating lenders and may vary depending on:",
        ],
        bullets: [
          "credit profile",
          "loan amount",
          "income",
          "state regulations",
          "lender policies",
        ],
        paragraphsAfter: [
          "Applicants should carefully review all lender-provided disclosures before accepting any loan offer.",
        ],
      },
      {
        title: "2. Disclosure of Loan Terms",
        anchor: "loan-terms",
        paragraphs: [
          "If matched with a lender, applicants may receive loan terms and disclosures directly from the lender before completing any agreement.",
          "Disclosed information may include:",
        ],
        bullets: [
          "repayment schedule",
          "interest rates",
          "APR",
          "loan duration",
          "applicable fees",
          "payment obligations",
        ],
        paragraphsAfter: [
          "Users are encouraged to review all terms carefully before electronically signing any agreement. See our [Electronic Consent Agreement](/legal/electronic-consent) for how electronic signatures and disclosures work.",
        ],
      },
      {
        title: "3. Repayment Responsibility",
        paragraphs: [
          "Borrowers are responsible for repaying loans according to the terms established by the lender.",
        ],
        paragraphsAfter: [
          "Failure to meet repayment obligations may result in:",
        ],
        bullets: [
          "additional fees",
          "collection activity",
          "negative credit reporting",
          "legal action depending on lender policies and applicable laws",
        ],
      },
      {
        title: "4. Implications of Late Payments",
        anchor: "late-payments",
        paragraphs: [
          "Late payments may result in additional charges, penalties, or collection efforts depending on lender policies.",
          "Each lender maintains its own late payment practices and disclosures.",
          "Applicants should carefully review lender agreements regarding:",
        ],
        bullets: [
          "payment due dates",
          "grace periods",
          "late fees",
          "collection procedures",
        ],
      },
      {
        title: "5. Implications of Non-Payment",
        anchor: "non-payment",
        paragraphs: [
          "Failure to repay a loan may negatively affect a borrower’s financial standing and credit profile.",
          "Some lenders may:",
        ],
        bullets: [
          "initiate collection efforts",
          "report delinquent accounts",
          "pursue legal remedies where permitted by law",
        ],
        paragraphsAfter: [
          "YourCreditPal is not responsible for lender collection activities or repayment enforcement.",
        ],
        cards: [
          {
            title: "APR & Fees",
            body: "Interest rates and fees vary by lender and financial profile.",
          },
          {
            title: "Repayment Terms",
            body: "Always review monthly payment obligations before accepting a loan.",
          },
          {
            title: "Late Payments",
            body: "Missing payments may negatively affect your credit profile.",
          },
        ],
      },
      {
        title: "6. Loan Renewals & Extensions",
        anchor: "loan-renewals",
        paragraphs: [
          "Some lenders may offer loan renewal, refinancing, or repayment extension options depending on state laws and lender policies.",
          "Extending repayment terms may increase the total amount repaid over time due to additional interest or fees.",
          "Applicants should review all renewal terms carefully before agreeing to modifications.",
        ],
      },
      {
        title: "7. Responsible Borrowing",
        paragraphs: [
          "Loans should be used responsibly and only for legitimate financial needs.",
          "Applicants are encouraged to:",
        ],
        bullets: [
          "borrow only what they can reasonably repay",
          "review repayment obligations carefully",
          "understand lender terms before accepting offers",
          "consider alternative financial solutions when appropriate",
        ],
      },
      {
        title: "8. Lender Responsibility Disclaimer",
        anchor: "lender-responsibility",
        paragraphs: ["YourCreditPal is not a lender and does not determine:"],
        bullets: [
          "loan approval",
          "repayment schedules",
          "APRs",
          "lender fees",
          "collection policies",
        ],
        paragraphsAfter: [
          "All loan-related decisions are made solely by participating lenders.",
        ],
      },
      {
        title: "9. Contact Us",
        anchor: "contact-information",
        paragraphs: ["If you have questions, please contact:"],
        linkText: "contact@yourcreditpal.com",
        linkHref: "mailto:contact@yourcreditpal.com",
      },
    ],
    noteTitle: "Understanding Loan Terms Matters",
    noteBody:
      "Reviewing lender disclosures carefully can help you make more informed financial decisions before accepting any offer.",
  },
  privacy: privacyPolicy,
  terms: {
    eyebrow: "Legal",
    title: "Terms of Use",
    intro: [
      "Welcome to yourcreditpal.com (the “Site”), operated by ENSTEAD Company Limited, doing business as YourCreditPal. YourCreditPal is a lead generation platform that facilitates loan referrals by connecting consumers with participating lenders and financial service providers (“Lending Partners”).",
      "These Terms of Use govern your access to and use of the Site and all related services. By using the Site, you confirm that you accept these Terms and agree to comply with them. If you do not agree, you must not use the Site.",
    ],
    updatedAt: "June 2026",
    toc: [
      "Who We Are and How to Contact Us",
      "Acceptance of Terms",
      "Nature of Our Services",
      "TCPA Consent",
      "SMS Text Messaging Terms and Conditions",
      "Privacy Policy and Data Practices",
      "Cookie Policy",
      "User Eligibility and Account Responsibility",
      "Accuracy of Information and Fraud Prevention",
      "Intellectual Property",
      "Prohibited Conduct and Prohibited Uses",
      "No Text or Data Mining; No AI Training Use",
      "Third-Party Lending Partners and Affiliated Sites",
      "Disclaimer of Warranties",
      "Limitation of Liability",
      "Indemnification",
      "Dispute Resolution and Binding Arbitration",
      "Miscellaneous Provisions",
      "Contacting Us",
    ],
    sections: [
      {
        title: "1. Who We Are and How to Contact Us",
        paragraphs: [
          "YourCreditPal.com is operated by ENSTEAD Company Limited, a digital marketing agency and loan referral platform incorporated in Delaware with its principal place of business in the United States.",
          "To contact us, please email contact@yourcreditpal.com or [visit our FAQ page](/faq) to find answers to your questions.",
          "For legal and compliance inquiries, please email contact@yourcreditpal.com or [reach out through our FAQ page](/faq).",
        ],
      },
      {
        title: "2. Acceptance of Terms",
        paragraphs: [
          "By accessing or using the Site, submitting any form, or providing any information through the Site, you acknowledge that you have read, understood, and agree to be bound by these Terms, our [Privacy Policy](/legal/privacy), all of which are incorporated herein by reference.",
          "YOU REPRESENT AND WARRANT THAT YOU ARE AT LEAST 18 YEARS OF AGE AND HAVE THE LEGAL CAPACITY TO ENTER INTO A BINDING AGREEMENT. If you do not meet these requirements, you must not use the Site.",
        ],
      },
      {
        title: "3. Nature of Our Services",
        paragraphs: [
          "YourCreditPal.com is a lead generation and loan referral platform. We are NOT a lender, broker, financial advisor, or credit provider.",
          "Our services consist of:",
        ],
        bullets: [
          "Collecting consumer information submitted through web forms on the Site;",
          "Matching consumer information with one or more [Lending Partners](/legal/marketing-partners) who may offer loan products;",
          "Transmitting or sharing your lead data with Lending Partners and affiliated financial service providers for the purpose of facilitating loan inquiries. We do not sell your information to marketing companies or data brokers;",
          "Facilitating communication between consumers and Lending Partners via automated and non-automated means.",
        ],
        extraBlocks: [
          {
            paragraphs: [
              "By submitting a form on this Site, you understand and agree that:",
            ],
            bullets: [
              "Your information will be shared with one or more Lending Partners and affiliated third parties;",
              "Submission of a form does not guarantee you will receive a loan offer or any financial product;",
              "The terms, rates, and conditions of any loan product are determined solely by the Lending Partner;",
              "We are not responsible for the decisions, actions, or omissions of any Lending Partner.",
            ],
          },
        ],
      },
      {
        title: "4. TCPA Consent",
        paragraphs: [
          "THIS SECTION IS IMPORTANT. PLEASE READ IT CAREFULLY.",
          "The Telephone Consumer Protection Act (TCPA), 47 U.S.C. §227, and its implementing regulations govern how businesses may contact consumers by phone and text message.",
          "By submitting any form on this Site, you provide the express written consent described below.",
        ],
        subsections: [
          {
            title: "4.1 Express Written Consent to Contact",
            paragraphs: [
              "By submitting your information through any web form on this Site, and explicitly checking the accompanying consent box, you expressly consent, in writing, to receive marketing and promotional telephone calls, text messages (SMS/MMS), pre-recorded messages, and artificial voice messages from:",
            ],
            bullets: [
              "YourCreditPal and its affiliates; and",
              "Our network of Lending Partners and financial service providers as listed and accessible via our [dedicated partner page](/legal/marketing-partners).",
            ],
          },
          {
            paragraphs: ["Such contact may be made using:"],
            bullets: [
              "Automated telephone dialing systems (ATDS) or automated text messaging delivery systems;",
              "Pre-recorded or artificial voice messages;",
              "SMS and MMS text messaging, including recurring marketing and service messages; and",
              "Email communications.",
            ],
            paragraphsAfter: [
              "Contact may be made at the telephone number(s) and email address(es) you provide, even if your telephone number is currently listed on any state or federal Do Not Call (DNC) registry. THE PURPOSE OF SUCH CONTACT MAY INCLUDE, but is not limited to: loan offers, financial product promotions, account servicing, follow-up on your inquiries, appointment scheduling, and other marketing-related communications.",
            ],
          },
          {
            title: "4.2 Consent Is Not a Condition of Purchase",
            paragraphs: [
              "YOUR CONSENT TO RECEIVE AUTODIALED OR PRE-RECORDED CALLS AND TEXT MESSAGES IS NOT A CONDITION, DIRECTLY OR INDIRECTLY, OF PURCHASING ANY PRODUCT OR SERVICE. You may choose to receive loan referral services without consenting to receiving automated marketing communications; however, doing so may limit our ability to connect you with Lending Partners who rely on such automated communication systems to service inquiries.",
            ],
          },
          {
            title: "4.3 Right to Opt Out / Revocation of Consent",
            paragraphs: [
              "You may revoke your consent to receive automated marketing calls or text messages at any time by:",
            ],
            bullets: [
              "Replying STOP (or any other standard opt-out keyword, such as QUIT, END, REVOKE, OPT OUT, CANCEL, or UNSUBSCRIBE) to any message you receive from us;",
              "Stating your request to opt out directly to any representative calling you, or emailing your request to us at contact@yourcreditpal.com;",
              "Calling our feedback line at [(786) 706 4517](tel:+17867064517); and",
              "Visiting our [unsubscribe page](/unsubscribe) to opt out of all contact at any time.",
            ],
            paragraphsAfter: [
              "Please Note: Revoking consent with yourcreditpal.com does not automatically revoke consent you may have provided directly to a Lending Partner. If your lead data has already been transmitted to a Lending Partner prior to your opt-out request, you must contact that specific Lending Partner directly to revoke your communication consent with them. Once you opt out with us, we will process your request within a reasonable window, not to exceed 10 business days. You may continue to receive scheduled communications during this brief processing window. No further promotional messages will be sent unless you explicitly re-consent.",
            ],
          },
          {
            title: "4.4 Identity of Callers and Texters",
            paragraphs: [
              "In accordance with the TCPA and FCC regulations, any automated call or text initiated by or on behalf of YourCreditPal will clearly identify YourCreditPal as the entity on whose behalf the communication is being made.",
            ],
          },
          {
            title: "4.5 Multiple Lending Partners",
            paragraphs: [
              "By submitting your information, you acknowledge that your data will be matched and shared with a Lending Partner from our network. Because our platform matches you dynamically, you may be contacted by the specific Lending Partner who accepts your referral request. Each contact represents a separate communication from a distinct entity. YourCreditPal is not responsible for the content, compliance, or frequency of communications initiated by independent Lending Partners after your data has been transmitted to them under this consent.",
            ],
          },
          {
            title: "4.6 Call Recording",
            paragraphs: [
              "You acknowledge and agree that we may monitor and/or record telephone calls between you and our representatives for quality assurance, training, and compliance purposes. By continuing any telephone call with us after a recording disclosure is provided, you expressly consent to the recording of that conversation.",
            ],
          },
        ],
      },
      {
        title: "5. SMS Text Messaging Terms and Conditions",
        subsections: [
          {
            title: "5.1 Message Frequency and Carrier Charges",
            paragraphs: [
              "Message frequency varies based on your user activity, account status, and the services requested. Standard message and data rates from your wireless carrier may apply to any SMS or MMS messages sent or received. YourCreditPal does not charge consumers a fee to receive text communications, but you are solely responsible for any fees levied by your wireless provider.",
            ],
          },
          {
            title: "5.2 Supported Carriers and Delivery Liability",
            paragraphs: [
              "SMS services are available through major US wireless carriers. YourCreditPal is not liable for delayed, misdirected, or undelivered messages resulting from carrier network issues, technical failures, or atmospheric conditions beyond our reasonable control.",
            ],
          },
          {
            title: "5.3 Data Collection via SMS",
            paragraphs: [
              "Data collected from you in connection with our SMS services may include your mobile phone number, wireless provider, message date/time, and content of messages you send. We use this data to provide and improve our text messaging services in strict compliance with our [Privacy Policy](/legal/privacy). This data will not be shared with unauthorized third parties for separate marketing purposes.",
            ],
          },
        ],
      },
      {
        title: "6. Privacy Policy and Data Practices",
        paragraphs: [
          "Our [Privacy Policy](/legal/privacy) describes how we collect, use, share, and protect your personal information, including information submitted through our lead generation forms. By using this Site, you acknowledge and agree to our data practices as described therein. Because our business model involves matching your inquiries with providers, you explicitly acknowledge that we share your lead data with Lending Partners and affiliated financial service providers to connect you with loan options. We do not sell your personal information to marketing companies or data brokers.",
        ],
        subsections: [
          {
            title: "6.1 State Privacy Rights (CCPA/CPRA and Multi-State Notice)",
            paragraphs: [
              "If you are a California resident, or a state with comprehensive privacy laws, you may possess specific statutory rights regarding your personal information, including the right to access, correct, delete, or limit the use of your data.",
            ],
            bullets: [
              "Right to opt out of Sale or Sharing: You have the absolute right to opt out of the sale or sharing of your personal information at any time. You may exercise this right by clicking our [Do Not Sell or Share My Personal Information](/legal/do-not-sell) page, accessible in our site footer, or by submitting a request via email.",
              "Notice at Collection: We collect identifiers, financial insights, and commercial inquiry data to facilitate matching you with [Lending Partners](/legal/marketing-partners). We do not knowingly collect, share, or sell the personal information of users under 18 years of age.",
            ],
          },
        ],
      },
      {
        title: "7. Cookie Policy",
        paragraphs: [
          "Our collection and usage of tracking data are detailed in our [Privacy Policy](/legal/privacy#cookies-and-tracking-technologies) Section. This outline details the cookies, web beacons, and pixels used on this Site, their operational purposes and how you may manage your preferences.",
        ],
      },
      {
        title: "8. User Eligibility and Account Responsibility",
        paragraphs: ["Use of this Site is limited to individuals who:"],
        bullets: [
          "Are at least 18 years of age;",
          "Reside in the United States;",
          "Possess the legal capacity to enter into binding contracts; and",
          "Are not otherwise prohibited by applicable federal, state, or local law from receiving loan referral or marketing services.",
        ],
        paragraphsAfter: [
          "If you are provided with a user account, identification code, or password on this site, you are responsible for maintaining the confidentiality of such credentials and for all activities that occur under your account. You agree to accept full responsibility for all activities that occur under your account or credentials and agree to notify us immediately if you suspect unauthorized access or a security breach to your account.",
        ],
      },
      {
        title: "9. Accuracy of Information and Fraud Prevention",
        paragraphs: [
          "You represent and warrant that all information you submit through this Site is accurate, current, complete, and entirely truthful. You understand that providing false, intentionally misleading, or incomplete information may:",
        ],
        bullets: [
          "Result in the immediate suspension or termination of your access to the Site;",
          "Constitute fraud or misrepresentation; and",
          "Expose you to significant civil or criminal liability.",
        ],
        paragraphsAfter: [
          "You agree to promptly update your information if it changes, including your contact details while utilizing our referral services.",
        ],
      },
      {
        title: "10. Intellectual Property",
        paragraphs: [
          "All content features and structural layouts on this Site, including but not limited to text, graphics, brand logos, custom interfaces, images, data compilations, page designs, and underlying source software, are the property of ENSTEAD Company Limited or its licensors and are fully protected by United States and international copyright, trademark, and intellectual property laws. Permitted Use: You are granted a limited, non-exclusive, revocable license to view, access, and print a single copy of content from this site for personal, non-commercial reference use only.",
        ],
        extraBlocks: [
          {
            paragraphs: ["Prohibited Actions: You may not under any circumstances:"],
            bullets: [
              "Modify, copy, scrape, reproduce, republish, frame, mirror or distribute any content or data from this site without our prior express written authorization;",
              "Use our registered or unregistered trademarks, logos, or brand identifiers without prior written authorization;",
              "Use any content for commercial purposes without license from us.",
            ],
          },
        ],
      },
      {
        title: "11. Prohibited Conduct and Prohibited Uses",
        paragraphs: ["You agree not to use the Site to:"],
        bullets: [
          "Submit false, intentionally misleading, or fraudulent information;",
          "Impersonate any person or entity;",
          "Violate any applicable federal, state, or local law, including but not limited to consumer protection laws, the CAN-SPAM Act, and telemarketing regulations;",
          "Harvest, scrape, or collect data, user points, or financial metrics from the Site using any automated means (including bots, spiders, crawlers, scripts, or similar tools);",
          "Reverse-engineer, decompile, disassemble, or attempt to extract source code from any software used in the Site;",
          "Attempt to gain unauthorized access to any system, server, database, or network connected to the Site;",
          "Introduce malware, ransomware, viruses, or other malicious or harmful code;",
          "Conduct denial-of-service (DoS) attacks or otherwise interfere with or disrupt the normal operation and security of the Site;",
          "Engage in any activity that violates the Telephone Consumer Protection Act (TCPA) or other applicable telemarketing regulations;",
          "Use the Site for any unlawful, deceptive, abusive, or fraudulent purpose.",
        ],
        paragraphsAfter: [
          "Violations of this section may result in the immediate termination of your access to the Site and may subject you to further civil and/or criminal liability.",
        ],
      },
      {
        title: "12. No Text or Data Mining; No AI Training Use",
        paragraphs: [
          "You are expressly prohibited from conducting, facilitating, authorizing, or permitting any text or data mining, web scraping, or automated extraction in relation to this Site or any services provided via this Site. This includes, without limitation, any extraction or utilization of content for the purpose of developing, training, fine-tuning, testing or validating artificial intelligence (AI) systems, machine learning models, large language models (LLMs), or neural networks.",
          "This prohibition applies to and includes the use of any robot, spider, bot, scraper, automated device, program, tool, algorithm, or code designed to access, obtain, copy, monitor, or republish any portion of this Site.",
        ],
      },
      {
        title: "13. Third-Party Lending Partners and Affiliated Sites",
        paragraphs: [
          "YourCreditPal is a lead generation and loan referral platform. We do not provide loans, credit, or financial products directly.",
          "When your information is transmitted to a [Lending Partner](/legal/marketing-partners) under these terms:",
        ],
        bullets: [
          "You may be redirected to the Lending Partner's independent website or contacted directly by the Lending Partner via the methods authorized in your consent;",
          "Any loan products, terms, underwriting standards, interest rates, and approval conditions are solely determined by that Lending Partner;",
          "Your relationship with any Lending Partner is governed exclusively by that Partner’s own terms of service and privacy policies; and",
          "YourCreditPal makes no guarantees, representations, or warranties regarding any Lending Partner’s regulatory licensing, products, services, terms, or conduct.",
        ],
        paragraphsAfter: [
          "You agree to independently verify the credentials, licensing, and terms of any Lending Partner before entering into any binding financial agreement. YourCreditPal is not responsible for, and explicitly disclaims any liability for, the acts, omissions, or lending decisions of any Lending Partner. Important information about loan rates, fees, and repayment obligations is summarized in our [Financial Disclosures](/legal/financial-disclosures).",
          "Our Site may contain links to third-party websites for informational convenience. We do not endorse, control, or assume responsibility for the content, security, or data practices of any linked third-party website.",
        ],
      },
      {
        title: "14. Disclaimer of Warranties",
        paragraphs: [
          "THE SITE, SERVICES, AND ALL CONTENT ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR UNINTERRUPTED, SECURE, OR ERROR-FREE OPERATION.",
          "WE DO NOT WARRANT THAT:",
        ],
        bullets: [
          "The Site or referral platform will meet your specific financial requirements;",
          "The Site will be available at all times or free from errors, bugs, malware, or service interruptions;",
          "Any [Lending Partner](/legal/marketing-partners) will make you an offer of credit or provide a financial product; or",
          "Any information, rates, or metrics displayed on the Site are absolutely accurate, complete, or current.",
        ],
      },
      {
        title: "15. Limitation of Liability",
        paragraphs: [
          "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, ENSTEAD COMPANY LIMITED (OPERATING AS YOURCREDITPAL), ITS AFFILIATES, AND THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SITE OR SERVICES, INCLUDING LOSS OF PROFITS, DATA, GOODWILL, REVENUE, OR OTHER INTANGIBLE LOSSES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
          "OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF OR RELATED TO THESE TERMS OR THE SITE SHALL NOT EXCEED $100.",
          "SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN WARRANTIES OR LIABILITIES. IN SUCH JURISDICTIONS, OUR LIABILITY IS LIMITED TO THE FULLEST EXTENT PERMITTED BY LAW.",
        ],
      },
      {
        title: "16. Indemnification",
        paragraphs: [
          "You agree to indemnify, defend, and hold YourCreditPal harmless from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys’ fees) arising from or relating to:",
        ],
        bullets: [
          "Your use of the Site or submission of any information through any online form;",
          "Your breach or violation of these Terms;",
          "Your violation of any applicable federal, state, or local law, including but not limited to the TCPA, the CAN-SPAM Act, or state consumer protection statutes;",
          "Any inaccurate, fraudulent, or intentionally misleading information you provide;",
          "Your infringement of any third-party intellectual property, privacy, or proprietary rights.",
        ],
      },
      {
        title: "17. Dispute Resolution and Binding Arbitration",
        paragraphs: [
          "PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT.",
          "Most user concerns can be resolved efficiently by contacting us at contact@yourcreditpal.com. In the unlikely event we cannot resolve a dispute informally, we each agree to resolve those claims as set out below.",
        ],
        subsections: [
          {
            title: "17.1 Agreement to Arbitrate",
            paragraphs: [
              "Except as otherwise provided herein, all disputes, claims, and controversies arising out of or relating to these Terms, the Site, your use of the Site, our data privacy practices, or the TCPA consent you provided shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules, rather than in a court of law. This arbitration agreement applies to the fullest extent permitted by law and shall survive the termination of these Terms.",
            ],
          },
          {
            title: "17.2 Class Action Waiver",
            paragraphs: [
              "**YOU AND YOURCREDITPAL AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION.** If this class action waiver is found unenforceable as to a particular claim or request for relief, that specific claim or request for relief shall be severed and proceeded with in a court of competent jurisdiction, while all remaining claims shall continue in binding arbitration on an individual basis.",
            ],
          },
          {
            title: "17.3 Small Claims Exception",
            paragraphs: [
              "As an alternative to arbitration, either party may bring an individual action in a local small claims court, provided the claim qualifies under the applicable small claims jurisdictional rules and limits and remains on an individual basis.",
            ],
          },
          {
            title: "17.4 Pre-Arbitration Dispute Notice",
            paragraphs: [
              "Before commencing arbitration, the initiating party must send a written Notice of Dispute to the other party describing the nature of the claim, the facts supporting it, and the specific relief sought. YourCreditPal’s address for Dispute Notices is: YourCreditPal, Attn: Manager, 390 Northeast 191st Street Miami, FL 33179 US, or via email at: contact@yourcreditpal.com",
              "The parties agree to attempt to resolve the dispute informally for a period of thirty (30) days following receipt of the Notice. If the dispute remains unresolved after 30 days, either party may formally commence arbitration.",
            ],
          },
          {
            title: "17.5 Governing Law",
            paragraphs: [
              "These Terms, your access to the Site, and any dispute arising hereunder shall be governed by, construed, and enforced in accordance with the laws of the State of Delaware, without regard to its conflict of law principles. The Federal Arbitration Act (FAA) shall govern the interpretation and enforcement of the arbitration provisions in this Section 17. For any claims determined by a court to be exempt from arbitration, the parties consent to the exclusive jurisdiction and venue of the state and federal courts located in Delaware.",
            ],
          },
        ],
      },
      {
        title: "18. Miscellaneous Provisions",
        subsections: [
          {
            title: "18.1 Changes to These Terms",
            paragraphs: [
              "We reserve the right to amend these Terms at any time in our sole discretion. Updated Terms will be posted on this page with a revised “Last Updated” date. Your continued use of the Site after any amendment constitutes your acceptance of the revised Terms.",
            ],
          },
          {
            title: "18.2 Changes to the Site",
            paragraphs: [
              "We may update, modify, suspend, or discontinue the Site or any operational feature at any time without notice. We are not liable to you or any third party for any losses resulting from changes to or the temporary unavailability of the Site.",
            ],
          },
          {
            title: "18.3 Assignment/Transfer of Agreement",
            paragraphs: [
              "We may transfer, assign, or delegate our rights and obligations under these Terms to another organization (such as in a corporate merger, acquisition, or asset sale) without your consent, provided such transfer does not materially affect your statutory rights. You may not assign your rights under these Terms without our prior written consent.",
            ],
          },
          {
            title: "18.4 Geographic Restrictions",
            paragraphs: [
              "This Site is directed exclusively to individuals residing in the United States. We make no representation that the content or referral services are appropriate or legal in other jurisdictions. Accessing the Site from outside the United States is done entirely at your own risk.",
            ],
          },
          {
            title: "18.5 Severability and Waiver",
            paragraphs: [
              "If any provision of these Terms is deemed invalid, unlawful, or unenforceable by a court, that provision shall be severed, and the remaining provisions shall continue in full force and effect. Our failure to enforce any right or provision shall not constitute a waiver of such right or future enforcement.",
            ],
          },
          {
            title: "18.6 Entire Agreement",
            paragraphs: [
              "These Terms, together with our [Privacy Policy](/legal/privacy), [Financial Disclosures](/legal/financial-disclosures), and [Electronic Consent Agreement](/legal/electronic-consent), constitute the entire agreement between you and YourCreditPal regarding your use of the Site and supersede all prior contemporaneous agreements or understandings.",
            ],
          },
        ],
      },
      {
        title: "19. Contacting Us",
        paragraphs: [
          "If you have any questions or concerns about these Terms, our privacy practices, or your TCPA preferences, please contact us:",
        ],
        bullets: ["By Email: contact@yourcreditpal.com"],
      },
    ],
  },
};
