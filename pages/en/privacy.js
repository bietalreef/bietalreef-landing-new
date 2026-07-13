import EnglishPlatformLegalPage from '../../components/legal/EnglishPlatformLegalPage';

const sections = [
  {
    title: '1. Scope and responsible entity',
    paragraphs: [
      'This policy explains how Biet Al Reef collects, uses, discloses, retains and protects personal data when users access the website, platform, applications and related services. Biet Al Reef acts as controller where it determines the purposes and means of processing and may act as processor under a separate agreement in limited cases.',
    ],
  },
  {
    title: '2. Data we may collect',
    items: [
      'Identity and contact data, including name, telephone number, email address, language and city.',
      'Account and verification data, including login details, user type, licences, professional documents and verification status.',
      'Business-profile data, including legal and trading names, services, products, projects, service areas, indicative prices and working hours.',
      'Project and request data, including descriptions, locations, measurements, images, budgets, schedules, quotations, responses and communications.',
      'Payment and billing data for paid services; full card data may be processed directly by an approved payment provider and not stored by Biet Al Reef.',
      'Device and usage data, including IP address, browser, operating system, viewed pages, events, session times and identifiers.',
      'User-submitted content, including images, files, reviews, reports and conversations with support or Weyaak.',
      'Approximate or precise location data where the user chooses to enable location-based search.',
    ],
  },
  {
    title: '3. Sources of data',
    items: [
      'Information provided directly through registration, forms, communications and service requests.',
      'Information generated through use of the platform, application and Weyaak tools.',
      'Information supplied by an authorised customer, provider or partner within a project or request.',
      'Lawfully available public or commercial sources, including official websites, licences and business directories.',
      'Technical providers supporting hosting, analytics, payments, messaging, verification and security.',
    ],
  },
  {
    title: '4. Purposes of processing',
    items: [
      'Creating and managing accounts and verifying identities, businesses and documents.',
      'Publishing approved provider profiles, products, services and projects.',
      'Matching customer requests with relevant providers according to specialisation, location and available data.',
      'Managing quotation requests, internal tenders, communications and customer support.',
      'Operating Weyaak and AI-assisted tools and organising user requests.',
      'Processing subscriptions, payments, invoices and accounting obligations.',
      'Improving performance, user experience, security and fraud prevention.',
      'Sending operational notices and legal updates, and marketing communications where consent or another lawful basis applies.',
      'Complying with legal duties, regulatory requests and the defence of rights and claims.',
    ],
  },
  {
    title: '5. Lawful bases',
    items: [
      'Performance of a contract or steps requested before entering into a contract.',
      'User consent where required, including certain marketing communications or precise location access.',
      'Legitimate interests in operating, improving and securing the platform and preventing fraud, subject to user rights.',
      'Compliance with legal or regulatory obligations and requests from competent authorities.',
      'Protection of rights, vital interests or legal claims where appropriate.',
    ],
  },
  {
    title: '6. Public provider data',
    items: [
      'Approved professional and business information may be published publicly, including business name, description, services, products, service areas, contact channels and project images.',
      'Providers must ensure that public submissions do not contain confidential or personal information they are not authorised to publish.',
      'Public pages may be indexed by search engines, discovery services and AI assistants in accordance with the site’s technical instructions.',
      'Providers may request correction, updating or removal subject to review, legal duties and contractual requirements.',
    ],
  },
  {
    title: '7. Sharing and disclosure',
    items: [
      'With customers or providers as necessary to process a quotation request, tender or communication initiated by the user.',
      'With hosting, storage, payment, messaging, analytics, security and verification providers under appropriate contractual controls.',
      'With legal advisers, accountants, auditors and other professional service providers where necessary.',
      'With governmental, judicial or regulatory authorities where required by law or necessary to protect rights, security and users.',
      'In a restructuring, merger or sale, subject to appropriate safeguards and notice where legally required.',
      'Biet Al Reef does not sell personal data as standalone data lists for data-brokerage purposes.',
    ],
  },
  {
    title: '8. Artificial intelligence and model providers',
    items: [
      'Parts of a request or conversation may be sent to AI model or service providers to produce an answer, classification, summary or match, subject to available settings and agreements.',
      'Biet Al Reef seeks to minimise data and avoid sending unnecessary sensitive data where reasonably possible.',
      'Users should not submit trade secrets or highly sensitive health, financial or identity data to Weyaak unless a necessary and approved channel is available.',
      'AI outputs may be subject to human review for managed services, reports, support and quality assurance.',
      'Personal data will not be used to train a separate general-purpose Biet Al Reef model without a lawful basis and appropriate notice or consent where required.',
    ],
  },
  {
    title: '9. International transfers',
    items: [
      'Some technical providers may use data centres or support teams outside the United Arab Emirates.',
      'Where personal data is transferred internationally, Biet Al Reef applies safeguards required by applicable law, including contractual, security and risk-assessment measures.',
      'Users may request general information about categories of providers and processing locations through the privacy contact channel.',
    ],
  },
  {
    title: '10. Retention',
    items: [
      'Data is retained for as long as necessary for the stated purpose, contract performance, legal compliance and dispute resolution.',
      'Account, transaction, consent, invoice, report and security records may be retained longer where legally or operationally necessary.',
      'Data is deleted or anonymised when no longer required unless a lawful reason for retention remains.',
      'Backups may remain for a limited period within controlled restoration and deletion cycles.',
    ],
  },
  {
    title: '11. Information security and incident response',
    items: [
      'Biet Al Reef applies appropriate technical and organisational controls, including access controls, encryption in transit, backups, monitoring, updates and least-privilege practices.',
      'Internal access is limited to persons who need data for authorised duties.',
      'No electronic system is completely risk-free, and absolute security cannot be guaranteed despite reasonable safeguards.',
      'Data incidents are assessed, contained and documented, and authorities or affected individuals are notified where required by law.',
      'Suspected account compromise, phishing or unauthorised access should be reported immediately.',
    ],
  },
  {
    title: '12. Data-subject rights',
    items: [
      'Request information about processing and obtain a copy of personal data, subject to applicable limits.',
      'Request correction of inaccurate data and completion of incomplete data.',
      'Request deletion or restriction where the legal conditions are met.',
      'Object to certain processing or withdraw consent without affecting earlier lawful processing.',
      'Request portability where technically and legally applicable.',
      'Challenge solely automated decisions producing legal or similarly significant effects and request human intervention where applicable.',
      'Submit a complaint to the competent data-protection authority if a request cannot be resolved directly.',
    ],
  },
  {
    title: '13. Exercising privacy rights',
    items: [
      'Requests may be sent to legal@bietalreef.ae or through the official contact form, identifying the requested action.',
      'Identity or authority may need to be verified before a request is completed.',
      'Requests are handled within the applicable legal period; extensions or refusals may apply where permitted and will be explained where required.',
      'Some data cannot be deleted where retention is legally required or necessary for claims, security or fraud prevention.',
    ],
  },
  {
    title: '14. Children and minors',
    items: [
      'The platform is primarily intended for adults, project owners and businesses and does not intentionally target children.',
      'Where a minor uses a service requiring parental or legal-representative consent, that consent must be obtained under applicable law.',
      'If data relating to a child is collected without an appropriate lawful basis, reasonable steps will be taken to delete or restrict it.',
    ],
  },
  {
    title: '15. Communications',
    items: [
      'Operational messages concerning accounts, requests, security and policies may be sent where necessary and are not optional marketing.',
      'Users may unsubscribe from marketing through the link, settings or support channels.',
      'Necessary service or legal communications may continue after marketing preferences are changed.',
    ],
  },
  {
    title: '16. Cookies and similar technologies',
    items: [
      'Necessary cookies may be used for login, security, settings and core platform operation.',
      'Analytics, performance or marketing cookies may be used when activated in accordance with applicable consent requirements.',
      'Further details and control options are provided in the Cookie Policy.',
    ],
  },
  {
    title: '17. External links and services',
    items: [
      'The platform may contain links to or integrations with third-party services governed by separate privacy policies.',
      'Biet Al Reef does not control third-party privacy practices, and users should review them before submitting information.',
    ],
  },
  {
    title: '18. Legal framework and updates',
    items: [
      'This policy applies within the legal framework of the United Arab Emirates, including personal-data, electronic-transactions, cybercrime and digital-trade rules where applicable.',
      'The policy may be updated to reflect changes in services, technology or law, and the revision date will appear at the top of the page.',
      'Material changes will be notified where required by law or appropriate to the nature of the change.',
    ],
  },
];

export default function PrivacyEnglishPage() {
  return (
    <EnglishPlatformLegalPage
      title="Privacy and Data Protection Policy"
      badge="Transparency and control over personal data"
      description="Biet Al Reef privacy policy explaining the collection, use, protection and sharing of customer and service-provider data in the United Arab Emirates."
      path="/en/privacy"
      arabicPath="/privacy"
      intro="We respect the privacy of customers and service providers and process personal data on the basis of necessity, transparency and security. This policy explains what we process, why we use it, who may receive it and the rights available to you."
      sections={sections}
    />
  );
}
