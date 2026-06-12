import privacyPolicy from "./privacyPolicy.generated.json";

export const legalPages = {
  "vulnerability-disclosure": {
    eyebrow: "Security",
    title: "Vulnerability Disclosure Policy",
    intro: "Responsible security research and coordinated disclosure for YourCreditPal.",
    updatedAt: "May 2026",
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
          "YourCreditPal Company Limited operates a loan referral and lead generation platform that collects, processes, and transfers sensitive consumer financial data to Lending Partners. The security of these systems is fundamental to our obligations to consumers and regulators. This Vulnerability Disclosure Policy (VDP) establishes a clear, legally protected channel for security researchers to report vulnerabilities to us responsibly. It is aligned to CISA's Coordinated Vulnerability Disclosure guidance and ISO/IEC 29147.",
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
      "YourCreditPal provides users with options to request limitations on certain information-sharing practices in accordance with applicable privacy laws.",
    calloutTitle: "Your Privacy Choices Matter",
    calloutBody:
      "Depending on your location and applicable laws, you may have the right to request limitations regarding how certain personal information is shared with third parties.",
    updatedAt: "May, 2026",
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
          "YourCreditPal may share certain information with lending partners, marketing providers, and service providers in order to support platform functionality and loan matching services.",
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
          "marketing partners",
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
          "Additional information is available in our [Privacy Policy](/legal/privacy).",
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
          "clicking unsubscribe links",
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
      "YourCreditPal may work with lending partners, service providers, and marketing providers to support loan matching and related platform operations.",
    calloutTitle: "Please Read Carefully",
    calloutBody:
      "Submitting a request through YourCreditPal may result in communications from lending partners or authorized service providers related to your application or financial offers.",
    updatedAt: "May, 2026",
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
          "Information submitted through YourCreditPal may be shared with participating lending partners for the purpose of evaluating potential loan opportunities.",
          "Participating lenders independently determine:",
        ],
        bullets: [
          "loan eligibility",
          "approval decisions",
          "repayment terms",
          "interest rates",
          "funding timelines",
        ],
        paragraphsAfter: [
          "YourCreditPal does not control lender decisions or financial products offered by lenders.",
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
          "Information sharing practices are further described in our [Privacy Policy](/legal/privacy).",
        ],
      },
      {
        title: "6. Managing Communication Preferences",
        anchor: "communication-preferences",
        paragraphs: [
          "Users may manage or limit promotional communications by:",
        ],
        bullets: [
          "clicking unsubscribe links",
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
      "This Electronic Consent Agreement explains how YourCreditPal and participating lending partners may provide disclosures, notices, and communications electronically.",
    calloutTitle: "Please Read Carefully",
    calloutBody:
      "By using YourCreditPal and submitting a loan request, you consent to receive communications and disclosures electronically instead of through paper documents.",
    updatedAt: "May, 2026",
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
          "Users may withdraw electronic consent by contacting support.",
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
    updatedAt: "May, 2026",
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
          "YourCreditPal does not charge fees for submitting a loan request through our platform.",
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
          "Users are encouraged to review all terms carefully before electronically signing any agreement.",
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
    intro:
      "Welcome to yourcreditpal.com, operated by ENSTEAD, LLC. These Terms of Use govern your access to and use of the Site and all related services. Please read them carefully before using the Site.",
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
      "Accuracy of Information",
      "Intellectual Property",
      "Prohibited Conduct and Prohibited Uses",
      "No Text or Data Mining",
      "Third-Party Lending Partners and Affiliated Sites",
      "Disclaimer of Warranties",
      "Limitation of Liability",
      "Indemnification",
      "Dispute Resolution and Binding Arbitration",
      "Changes to These Terms",
      "Changes to the Site",
      "Transfer of Agreement",
      "Geographic Restriction",
      "Severability and Waiver",
      "Entire Agreement",
      "Copyright",
      "Contacting Us",
    ],
    sections: [
      {
        title: "1. Who We Are and How to Contact Us",
        paragraphs: [
          "yourcreditpal.com is operated by ENSTEAD, LLC, a digital marketing agency and loan referral platform incorporated in Delaware with its principal place of business in the United States.",
          "To contact us, please email: contact@yourcreditpal.com.",
          "For legal and compliance inquiries, please contact us at contact@yourcreditpal.com.",
        ],
      },
      {
        title: "2. Acceptance of Terms",
        paragraphs: [
          "By accessing or using the Site, submitting any form, or providing any information through the Site, you acknowledge that you have read, understood, and agree to be bound by these Terms, our Privacy Policy, our Cookie Policy, and our TCPA Consent Policy, all of which are incorporated herein by reference.",
          "YOU REPRESENT AND WARRANT THAT YOU ARE AT LEAST 18 YEARS OF AGE AND HAVE THE LEGAL CAPACITY TO ENTER INTO A BINDING AGREEMENT. If you do not meet these requirements, you must not use the Site.",
        ],
      },
      {
        title: "3. Nature of Our Services",
        paragraphs: [
          "yourcreditpal.com is a lead generation and loan referral platform. We are not a lender, broker, financial advisor, or credit provider.",
          "Our services consist of:",
        ],
        bullets: [
          "Collecting consumer information submitted through web forms on the Site",
          "Matching consumer information with one or more Lending Partners who may offer loan products",
          "Transmitting, selling, or sharing consumer lead data with Lending Partners and affiliated third parties for the purpose of facilitating loan inquiries",
          "Facilitating communication between consumers and Lending Partners via automated and non-automated means",
        ],
        extraBlocks: [
          {
            paragraphs: [
              "By submitting a form on this Site, you understand and agree that:",
            ],
            bullets: [
              "Your information will be shared with one or more Lending Partners and affiliated third parties",
              "Submission of a form does not guarantee you will receive a loan offer or any financial product",
              "The terms, rates, and conditions of any loan product are determined solely by the Lending Partner",
              "We are not responsible for the decisions, actions, or omissions of any Lending Partner",
            ],
          },
        ],
      },
      {
        title: "4. TCPA Consent",
        paragraphs: [
          "THIS SECTION IS IMPORTANT. PLEASE READ IT CAREFULLY.",
          "The Telephone Consumer Protection Act (TCPA), 47 U.S.C. 227, and its implementing regulations govern how businesses may contact consumers by phone and text message.",
          "By submitting any form on this Site, you provide the express written consent described below.",
        ],
        subsections: [
          {
            title: "4.1 Express Written Consent to Contact",
            paragraphs: [
              "By submitting your information through any web form on this Site, you expressly consent, in writing, to receive calls, text messages (SMS/MMS), pre-recorded messages, and artificial voice messages from:",
            ],
            bullets: [
              "ENSTEAD, LLC (yourcreditpal.com) and its affiliates",
              "Lending Partners and other financial service providers in our network",
              "Third-party marketing partners and their agents or representatives",
            ],
          },
          {
            paragraphs: [
              "Such contact may be made using:",
            ],
            bullets: [
              "Automated telephone dialing systems (autodialers)",
              "Pre-recorded or artificial voice message",
              "SMS and MMS text messaging including recurring messages",
              "Email communications."],
            paragraphsAfter: [
              "Contact may be made at the telephone number(s) and email address(es) you provide.",
              "THE PURPOSE OF SUCH CONTACT MAY INCLUDE: loan offers, financial product promotions, account servicing, follow-up on your inquiry, appointment scheduling, and other marketing related communications.",
            ],
          },
          {
            title: "4.2 Consent Is Not a Condition of Purchase",
            paragraphs: [
              "YOUR CONSENT TO RECEIVE AUTODIALED OR PRE-RECORDED CALLS AND TEXT MESSAGES IS NOT A CONDITION OF PURCHASING ANY PRODUCT OR SERVICE. You may choose to receive loan referral services without consenting to receiving marketing communications via autodialer or pre-recorded message; however, doing so may limit our ability to connect you with Lending Partners who rely on such communication methods.",
            ],
          },
          {
            title: "4.3 Right to Opt Out / Revocation of Consent",
            paragraphs: [
              "You may revoke your consent to receive automated marketing calls or text messages at any time by:",
            ],
            bullets: [
              "Replying STOP, QUIT, END, REVOKE, OPT OUT, CANCEL, or UNSUBSCRIBE to any SMS or MMS message you receive from us",
              "Contacting us by email at contact@yourcreditpal.com",
              "Calling our feedback line at (786) 706 4517",
              "Submitting a written opt-out request to our registered address",
            ],
            paragraphsAfter: [
              "Please Note: Revoking consent with yourcreditpal.com does not automatically revoke consent you may have provided directly to a Lending Partner or other third party. To stop communications from those parties, you must contact them directly.",
              "Once you opt out, we will process your request within a reasonable time, not to exceed 10 business days. You may continue to receive messages during that processing window. We may send you a single post-revocation clarification message within five minutes of your opt-out request to confirm whether you wish to stop all communications or only certain types; this message will not contain marketing or promotional content.",
            ],
          },
          {
            title: "4.4 Identity of Callers and Texters",
            paragraphs: [
              "In accordance with the TCPA and FCC regulations, any automated call or text initiated by or on behalf of YourCreditPal will identify the name of the entity on whose behalf the communication is being made. If you receive a call or text and are unsure of the sender's identity, you may contact us for clarification.",
            ],
          },
          {
            title: "4.5 Multiple Lending Partners",
            paragraphs: [
              "By submitting your information, you acknowledge that your data may be shared with and you may be contacted by multiple Lending Partners or third parties simultaneously or at different times. Each contact represents a separate communication from a distinct entity. We are not responsible for the content or frequency of communications initiated by third parties after your data has been transmitted.",
            ],
          },
          {
            title: "4.6 Call Recording",
            paragraphs: [
              "You acknowledge and agree that we may monitor and/or record telephone calls between you and ourselves for quality assurance, training, and compliance purposes. By continuing any telephone call with us after a recording disclosure is provided, you consent to the recording of that call.",
            ],
          },
        ],
      },
      {
        title: "5. SMS Text Messaging Terms and Conditions",
        paragraphs: [
          "By submitting your mobile phone number on this Site, you expressly consent and opt in to receive marketing and service SMS/MMS messages from us, our affiliates, Lending Partners, and their agents and representatives. Messages may be sent using an automatic telephone dialing system (ATDS) and may be recurring.",
          "5.1 Message Frequency",
          "Message frequency varies based on your activity and the services requested. You may receive multiple messages from various Lending Partners who receive your lead data. Standard message and data rates from your carrier may apply.",
          "5.2 Opt-Out Instructions",
          "To stop receiving SMS messages from us, reply STOP, QUIT, END, REVOKE, OPT OUT, CANCEL, or UNSUBSCRIBE to any message, or use any other reasonable method to communicate your request. For help, reply HELP or contact us at contact@yourcreditpal.com. After opting out, you will receive a single confirmation message; no further messages will be sent to you unless you re-enroll.",
          "5.3 Supported Carriers",
          "SMS services are available on major US wireless carriers. YourCreditPal is not liable for delayed or undelivered messages due to carrier limitations or network issues beyond our control.",
          "5.4 Data Collection via SMS",
          "Data collected through SMS interactions may include your mobile number, wireless provider, message date/time, and message content. This data is used to provide and improve our services as described in our Privacy Policy.",
        ],
      },
      {
        title: "6. Privacy Policy and Data Practices",
        paragraphs: [
          "Our [Privacy Policy](/legal/privacy) describes how we collect, use, share, and protect your personal information, including information submitted through lead generation forms. By using this Site, you consent to our data practices as described therein.",
          "If you are a California resident, you may exercise your right to opt out of the sale or sharing of your personal information by visiting our [Do Not Sell or Share My Personal Information](/legal/do-not-sell) page.",
          "Key points regarding data sharing:",
        ],
        bullets: [
          "Your personal information, including name, contact details, financial information, and loan inquiry details, will be shared with Lending Partners and affiliated third parties",
          "We may sell consumer lead data as part of our business model",
          "You have rights under applicable state privacy laws, including the CCPA/CPRA for California residents, to access, correct, or request deletion of your data",
          "We implement reasonable security measures to protect your information but cannot guarantee absolute security",
        ],
      },
      {
        title: "7. Cookie Policy",
        paragraphs: [
          "Our [Cookie Policy](/legal/privacy#cookies-and-tracking-technologies) sets out information about the cookies and tracking technologies used on this Site, including their purposes and how you may manage your preferences.",
        ],
      },
      {
        title: "8. User Eligibility and Account Responsibility",
        paragraphs: [
          "Use of this Site is limited to individuals who:"
          ],
          bullets: [ 
            "Are at least 18 years of age",
            "Reside in the United States",
            "Have the legal capacity to enter into binding contracts",
            "And are not prohibited by law from receiving loan referral services."
          ],
          paragraphsAfter: [
          "If you are provided with a user account, identification code, or password, you are responsible for maintaining the confidentiality of such credentials and for all activities that occur under your account. Notify us immediately if you suspect unauthorized access to your account.",
        ],
      },
      {
        title: "9. Accuracy of Information",
        paragraphs: [
          "You represent and warrant that all information you submit through this Site is accurate, current, complete, and truthful. You understand that providing false, misleading, or incomplete information may:"
        ],
        bullets: [
          "Result in suspension or termination of your access to the Site",
          "Constitute fraud or misrepresentation",
          "Expose you to legal liability."
        ],
        paragraphsAfter: [
          "You agree to promptly update your information if it changes, including your contact details.",
        ],
      },
      {
        title: "10. Intellectual Property",
        paragraphs: [
          "All content on this Site, including text, graphics, logos, images, data compilations, and software, is the property of YourCreditPal or its licensors and is protected by US and international copyright, trademark, and other intellectual property laws.",
          "You may:"
        ], 
          bullets: [
            "View and download content for personal, non-commercial use only",
            "print a single copy of any page for personal reference."
        ],
        extraBlocks: [{
          paragraphs:[
            "You may not:"
          ],
          bullets: [
          "Modify, reproduce, republish, or distribute any content without our express written consent",
          "Use our trademarks, logos, or brand identifiers without prior authorization",
          "Use any content for commercial purposes without a license from us",
        ],}]
      },
      {
        title: "11. Prohibited Conduct and Prohibited Uses",
        paragraphs: ["You agree not to use the Site to:"],
        bullets: [
          "Submit false, misleading, or fraudulent information",
          "Impersonate any person or entity",
          "Violate any federal, state, or local law, including consumer protection, anti-spam (CAN-SPAM Act), and telemarketing laws",
          "Harvest, scrape, or collect data from the Site using automated means (bots, spiders, crawlers, scripts, or similar tools)",
          "Reverse-engineer, decompile, or attempt to extract source code from any software used in the Site",
          "Attempt to gain unauthorized access to any system, server, or database",
          "Introduce malware, viruses, or harmful code",
          "Conduct denial-of-service attacks or interfere with the Site's operation",
          "Engage in any activity that violates the Telephone Consumer Protection Act or other applicable telemarketing regulations",
          "Use the Site for any unlawful, abusive, or fraudulent purpose",
        ],
        paragraphsAfter: [
          "Violations may result in immediate termination of your access and may subject you to civil and/or criminal liability.",
        ],
      },
      {
        title: "12. No Text or Data Mining",
        paragraphs: [
          "You are expressly prohibited from conducting, facilitating, authorizing, or permitting any text or data mining, web scraping, or automated data extraction in relation to this Site or any services provided via this Site, including for the purpose of developing, training, fine-tuning, or validating artificial intelligence systems or models.",
          "This prohibition includes the use of any robot, spider, bot, scraper, automated device, program, tool, algorithm, or code to access, obtain, copy, monitor, or republish any portion of this Site.",
        ],
      },
      {
        title: "13. Third-Party Lending Partners and Affiliated Sites",
        paragraphs: [
          "YourCreditPal is a loan referral platform. We do not provide loans, credit, or financial products directly.",
          "When your information is transmitted to a Lending Partner:",
        ],
        bullets: [
          "You may be directed to the Lending Partner's own website or contacted directly by the Lending Partner",
          "Any loan products, terms, rates, and conditions are solely those of the Lending Partner",
          "Your relationship with any Lending Partner is governed by that Lending Partner's own terms and policies",
          "YourCreditPal makes no guarantees, representations, or warranties regarding any Lending Partner's products, services, or conduct",
        ],
        paragraphsAfter: [
          "You agree to independently verify the credentials, licensing, and terms of any Lending Partner before entering into any financial agreement. YourCreditPal is not responsible for and disclaims any liability for the acts or omissions of any Lending Partner.",
          "Our Site may contain links to third-party websites for informational purposes. We do not endorse, control, or assume responsibility for the content or practices of any linked third-party website.",
        ],
      },
      {
        title: "14. Disclaimer of Warranties",
        paragraphs: [
          "THE SITE, SERVICES, AND ALL CONTENT ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR UNINTERRUPTED OR ERROR-FREE OPERATION.",
          "WE DO NOT WARRANT THAT:",
        ],
        bullets: [
          "The Site will meet your requirements",
          "The Site will be available at all times or free from errors, bugs, or interruptions",
          "Any Lending Partner will make you an offer of credit or financial product",
          "Any information on the Site is accurate, complete, or current",
        ],
      },
      {
        title: "15. Limitation of Liability",
        paragraphs: [
          "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE OR SERVICES, INCLUDING LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
          "Our total aggregate liability to you for any claim arising out of or related to these Terms or the Site shall not exceed One Hundred US dollars (USD $100).",
          "SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN WARRANTIES OR LIABILITIES. IN SUCH JURISDICTIONS, OUR LIABILITY IS LIMITED TO THE FULLEST EXTENT PERMITTED BY LAW."
        ],
      },
      {
        title: "16. Indemnification",
        paragraphs: [
          "You agree to indemnify, defend, and hold us harmless from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from:",
        ],
        bullets: [
          "Your use of the Site or submission of any information",
          "Your violation of these Terms",
          "Your violation of any applicable law, including the TCPA, CAN-SPAM Act, or any state consumer protection law",
          "Any inaccurate, false, or misleading information you provide",
          "Your infringement of any third-party intellectual property or other rights",
        ],
      },
      {
        title: "17. Dispute Resolution and Binding Arbitration",
        paragraphs: [
          "PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.",
          "Most concerns can be resolved by contacting us at contact@yourcreditpal.com. In the unlikely event we cannot resolve your concern informally, we each agree to resolve disputes as set out below.",
          "17.1 Agreement to Arbitrate",
          "Except as otherwise provided herein, all disputes, claims, and controversies arising out of or relating to these Terms, the Site, your use of the Site, our data and privacy practices, or the TCPA consent you provided shall be resolved through binding arbitration administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules, rather than in court. This arbitration agreement applies to the fullest extent permitted by law.",
          "17.2 Class Action Waiver",
          "YOU HEREBY AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS BETWEEN YOU AND US WILL BE CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. If this class action waiver is found unenforceable as to a particular claim or request for relief, the parties agree that such claim or request for relief shall be severed and proceeded with in a court of competent jurisdiction, while all remaining claims shall continue in arbitration on an individual basis.",
          "17.3 Small Claims Exception",
          "Either party may bring an individual action in small claims court as an alternative to arbitration, provided the claim qualifies under the applicable small claims court rules.",
          "17.4 Pre-Arbitration Dispute Notice",
          "Before commencing arbitration, the initiating party must send a written Notice of Dispute to the other party describing the nature of the claim and the relief sought. ENSTEAD's address for Dispute Notices is: ENSTEAD, LLC, Attn: Legal & Compliance Department, 390 Northeast 191st Street, Miami, FL 33179 US.", 
          "Alternatively, you may send the Notice to contact@yourcreditpal.com. The parties agree to attempt to resolve the dispute informally for 30 days following receipt of the Notice. If unresolved, either party may commence arbitration.",
          "17.5 Governing Law",
          "These Terms and any dispute arising hereunder shall be governed by the laws of the State of Delaware, without regard to its conflict of law principles, except that the Federal Arbitration Act governs the arbitration provision.",
        ],
      },
      {
        title: "18. Changes to These Terms",
        paragraphs: [
          "We reserve the right to amend these Terms at any time in our sole discretion. Updated Terms will be posted on this page with a revised “Last Updated” date. Your continued use of the Site after any amendment constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.",
        ],
      },
      {
        title: "19. Changes to the Site",
        paragraphs: [
          "We may update, modify, suspend, or discontinue the Site or any part of it at any time without notice. We will endeavor to provide reasonable notice of any material changes. We are not liable for any losses resulting from changes to or unavailability of the Site.",
        ],
      },
      {
        title: "20. Transfer of Agreement",
        paragraphs: [
          "We may transfer our rights and obligations under these Terms to another organization. We will notify you in writing if such a transfer occurs.",
        ],
      },
      {
        title: "21. Geographic Restriction",
        paragraphs: [
          "This Site is currently directed exclusively to individuals residing in the United States. We make no representation that the content or services available on this Site are appropriate or available in other locations. Accessing the Site from outside the United States is done at your own risk and in compliance with local laws.",
        ],
      },
      {
        title: "22. Severability and Waiver",
        paragraphs: [
          "If any provision of these Terms is found invalid or unenforceable, the remaining provisions shall remain in full force and effect. Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision unless acknowledged in writing by an authorized representative.",
        ],
      },
      {
        title: "23. Entire Agreement",
        paragraphs: [
          "These Terms, together with our Privacy Policy, Cookie Policy, and TCPA Consent Policy, constitute the entire agreement between you and us with respect to your use of the Site and supersede all prior agreements, understandings, and representations.",
        ],
      },
      {
        title: "24. Copyright",
        paragraphs: [
          "All content on this Site is: Copyright 2026 ENSTEAD, LLC. All Rights Reserved. Unauthorized reproduction or distribution is prohibited.",
        ],
      },
      {
        title: "25. Contacting Us",
        paragraphs: [
          "If you have any questions or concerns about these Terms, our privacy practices, TCPA consent, or wish to exercise any of your rights, please contact us:",
          "ENSTEAD, LLC",
          "Address: 390 Northeast 191st Street, Miami, FL 33179 US",
          "Email: info@enstead.co",
          "Phone: (561) 569 8679",
        ],
      },
    ],
    noteTitle: "Copyright",
    noteBody:
      "By using this Site, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use.",
  },
};
