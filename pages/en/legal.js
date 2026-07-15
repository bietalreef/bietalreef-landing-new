import EnglishPlatformLegalPage from '../../components/legal/EnglishPlatformLegalPage';

const sections = [
  {
    title: '1. Definitions and scope',
    paragraphs: [
      'These terms govern the use of the Biet Al Reef website, platform and related digital services, including the UAE Directory, provider pages, services and products, quotation requests, managed internal tenders and Weyaak tools.',
    ],
    items: [
      'Platform means the Biet Al Reef website, pages and related digital services.',
      'User means any visitor, customer, project owner, service provider, supplier, factory, workshop, craftsperson or technician using the platform.',
      'Service Provider means any company, establishment, office, factory, workshop, supplier, craftsperson or technician presenting business details, services or products.',
      'Content includes names, descriptions, images, logos, documents, services, products, offers, indicative prices, project images and other submitted or published information.',
      'Managed Internal Tender means a request reviewed and distributed by Biet Al Reef to selected parties when the customer requires additional options or quotations.',
    ],
  },
  {
    title: '2. Nature of Biet Al Reef’s role',
    items: [
      'Biet Al Reef is a digital platform for discovery, organisation, matching, communication and request management. It is not a contractor, supplier, manufacturer, engineering consultancy or accreditation authority unless a separate written agreement expressly states otherwise.',
      'Biet Al Reef does not become a party to a direct contract between a customer and a service provider merely by displaying information, forwarding a request or facilitating contact.',
      'A verification badge or published profile is not an absolute guarantee of quality, solvency or performance; it indicates only the review level described on the platform at the time of publication.',
      'Biet Al Reef may provide managed services, document preparation, mediation or internal-tender support under separate terms disclosed before the service is ordered.',
    ],
  },
  {
    title: '3. Eligibility and business-profile requests',
    items: [
      'Submitted information must be accurate, current, complete and not misleading.',
      'Commercial entities must hold all licences, permits and approvals required for the activities they offer under UAE law.',
      'An individual or technician must not claim to be a licensed commercial entity without a valid licence or authorisation.',
      'Biet Al Reef may reject, suspend or hide a profile or document that is incomplete, expired, misleading or not reasonably verifiable.',
      'The requester is responsible for the accuracy of submitted data and documents and for having authority to provide them for publication.',
    ],
  },
  {
    title: '4. Registration, verification and public publication',
    items: [
      'Submitting a business-profile request does not automatically approve a provider for public publication.',
      'Profiles, licences, services, products, offers, portfolios and service areas may be reviewed before publication.',
      'Approved content may appear on public Biet Al Reef pages, search results, directory cards, city and service pages and AI-assisted recommendations.',
      'Biet Al Reef may improve formatting, correct language and organise classifications without changing material commercial claims.',
      'Content may be rejected or hidden if it does not satisfy quality, safety, accuracy or legal requirements.',
    ],
  },
  {
    title: '5. Customer and project-owner obligations',
    items: [
      'Provide an accurate description of the request, location, measurements, images, indicative budget, timing and other information reasonably required to understand the scope.',
      'Review licences, specifications, the quotation, warranty, payment terms and delivery period before contracting with a provider.',
      'Do not use the platform for unlawful, misleading, abusive or rights-infringing requests.',
      'Remain responsible for the final provider or quotation selection unless a separate managed-service agreement states otherwise.',
      'Do not upload confidential, personal or proprietary material without authority to use or disclose it.',
    ],
  },
  {
    title: '6. Service-provider obligations',
    items: [
      'The provider remains solely responsible for the accuracy of licences, contact details, descriptions, quotations, indicative prices, images and service claims.',
      'The provider remains responsible for site visits, contracts, warranties, payments, delivery, execution and after-sales service.',
      'Business data and documents must be updated when they change or expire, and material limitations affecting performance must be disclosed.',
      'Providers must not upload content that infringes intellectual property, privacy, confidentiality or other rights, or contains misleading claims.',
      'Providers must comply with applicable safety standards, professional requirements, taxes, licences and permits.',
    ],
  },
  {
    title: '7. Quotation requests and managed internal tenders',
    items: [
      'A quotation request is not a binding contract unless a quotation is accepted and a clear agreement is concluded between the parties.',
      'Biet Al Reef may review the request and ask for further measurements, documents or specifications before creating an internal tender.',
      'Invited parties may be selected based on specialisation, location, available information and apparent ability to deliver or supply.',
      'Biet Al Reef does not guarantee a fixed number of quotations, the lowest price or acceptance by any provider.',
      'Comparisons may consider price, specifications, quality, timing, location, warranty and capacity; the final decision remains with the customer.',
    ],
  },
  {
    title: '8. Contracts, payments and warranties',
    items: [
      'Any direct contract, payment, warranty or commitment between a customer and provider remains the responsibility of those parties unless a separate Biet Al Reef service expressly states otherwise in writing.',
      'The parties should document scope, specifications, quantities, payment stages, timing, warranties, variations and cancellation before execution.',
      'Biet Al Reef is not responsible for funds paid outside officially approved and identified payment channels.',
      'Listing a provider, product or offer does not constitute a guarantee by Biet Al Reef of third-party performance.',
    ],
  },
  {
    title: '9. Fees, subscriptions and optional services',
    items: [
      'Paid plans, promotions, subscriptions and features are subject to the price and billing terms displayed when purchased or activated.',
      'Unless stated otherwise, fees are in UAE dirhams and may be subject to VAT or other applicable taxes.',
      'Biet Al Reef may update plans or prices with appropriate notice where required.',
      'Branding, photography, content, document design and digital-setup services are optional unless expressly included in a plan.',
      'Cancellation and refund rights are governed by the terms disclosed for each service and any mandatory consumer rights.',
    ],
  },
  {
    title: '10. Weyaak and artificial intelligence',
    items: [
      'Weyaak and AI outputs are assistive information and are not certified engineering, legal, financial or professional advice.',
      'Plans, estimates, quantities, prices, quotations and generated documents must be reviewed by a qualified professional before reliance or execution.',
      'Outputs depend on the quality and completeness of user input and are not guaranteed to be error-free or suitable for every case.',
      'Request data may be processed as reasonably necessary to provide assistance and improve operations in accordance with the Privacy Policy.',
      'Weyaak must not be used to create unlawful, fraudulent, harmful or rights-infringing content.',
    ],
  },
  {
    title: '11. Intellectual property and content licence',
    items: [
      'Users retain ownership of their own brands, logos and proprietary content.',
      'Users grant Biet Al Reef a non-exclusive licence to review, organise, publish and promote submitted content as reasonably necessary to provide the platform services.',
      'Users confirm that they hold all rights and permissions required for content they upload.',
      'The Biet Al Reef identity, platform design, software structure, original text, classifications, databases, compilations and marketing materials remain legally protected.',
      'Content may not be copied, republished, sold or used to build a derived database or competing directory without written permission.',
    ],
  },
  {
    title: '12. Crawling, indexing and automated data use',
    items: [
      'Biet Al Reef permits recognised search engines, discovery services and AI assistants to access public pages in accordance with robots.txt, technical instructions and published policies.',
      'Permission to index public pages does not grant a right to copy the database, bulk-extract provider files, resell data or create a competing service.',
      'Scraping, data mining, intensive automated collection, rate-limit evasion and circumvention of technical controls are prohibited without written approval.',
      'Non-public content, personal data and account data must not be used for model training or commercial purposes without a lawful basis and express authorisation.',
      'Biet Al Reef may apply technical restrictions and pursue available remedies against harmful or unauthorised automation.',
    ],
  },
  {
    title: '13. Prohibited use and cybersecurity',
    items: [
      'Unauthorised penetration testing, vulnerability scanning, privilege escalation or security-control bypass is prohibited.',
      'Malware, denial-of-service activity, resource exhaustion, credential attacks and session abuse are prohibited.',
      'Impersonation, fake accounts and manipulation of ratings, offers, requests or data are prohibited.',
      'The platform must not be used for spam, unauthorised contact harvesting or targeting users outside a legitimate platform purpose.',
      'Biet Al Reef may preserve technical evidence, cooperate with competent authorities and pursue civil or criminal remedies where misuse occurs.',
    ],
  },
  {
    title: '14. Reviews, reports and unlawful content',
    items: [
      'Reviews must reflect a genuine experience and must not contain abuse, blackmail, confidential information or false allegations.',
      'Biet Al Reef may suspend, hide or remove reviews or content while investigating a report or policy breach.',
      'Users may report suspicious profiles, content or conduct through official support channels.',
      'Biet Al Reef is not required to publish every review or response and may request supporting evidence.',
    ],
  },
  {
    title: '15. Suspension and termination',
    items: [
      'Biet Al Reef may suspend, restrict, hide or remove an account, profile or content that breaches these terms or creates risk to users or the platform.',
      'Users may request account closure subject to outstanding obligations and lawful retention requirements.',
      'Records may be retained where necessary for compliance, disputes, security, accounting or fraud prevention.',
      'Access may be temporarily restricted for maintenance, security or system updates without compensation unless applicable law requires otherwise.',
    ],
  },
  {
    title: '16. Third-party services and links',
    items: [
      'The platform may integrate payment, mapping, messaging, analytics, hosting, storage or AI services supplied by third parties.',
      'Third-party services are governed by their own terms and policies, and Biet Al Reef does not control changes, availability or failures outside its reasonable control.',
      'Users should review the terms of any external service before using it or submitting information.',
    ],
  },
  {
    title: '17. Disclaimers and limitation of liability',
    items: [
      'The platform is provided on an available basis and, to the extent permitted by law, without an absolute guarantee of uninterrupted or error-free operation.',
      'Biet Al Reef does not guarantee customers, sales, a particular ranking, search visibility, quotation acceptance or project success.',
      'To the extent permitted by law, Biet Al Reef is not liable for indirect or consequential loss, lost profits or lost data arising from direct user-to-user transactions or unreasonable reliance on content or automated outputs.',
      'Nothing in these terms excludes liability that cannot legally be excluded or limited, including fraud, intentional misconduct or other mandatory liability.',
      'Where Biet Al Reef is found liable for a paid service, its aggregate liability will, to the maximum extent permitted by law, be limited to fees paid to Biet Al Reef for the relevant service during the preceding twelve months, unless the law requires otherwise.',
    ],
  },
  {
    title: '18. Indemnity',
    items: [
      'To the extent permitted by law, users must indemnify Biet Al Reef, its management, employees and partners against claims and losses arising from the user’s breach of these terms, the law or third-party rights.',
      'This includes unlawful content, misleading information, intellectual-property infringement and transactions outside the platform’s responsibility.',
      'The indemnity does not apply to the extent a claim results directly from proven conduct by Biet Al Reef that cannot legally be excluded.',
    ],
  },
  {
    title: '19. Force majeure and service continuity',
    items: [
      'Biet Al Reef is not responsible for delay or interruption caused by events outside reasonable control, including disasters, widespread outages, major attacks, government actions or infrastructure-provider failures.',
      'Reasonable steps will be taken to restore service and reduce impact, but no fixed restoration time is guaranteed unless a separate service-level agreement applies.',
    ],
  },
  {
    title: '20. Governing law and disputes',
    items: [
      'These terms are governed by the laws applicable in the United Arab Emirates, including mandatory consumer, data-protection, electronic-transactions, cybercrime and digital-trade rules where applicable.',
      'The parties should first attempt to resolve disputes amicably through official contact channels within a reasonable period.',
      'If no amicable resolution is reached, disputes will be submitted to the competent courts in the United Arab Emirates unless a written agreement or mandatory jurisdiction provides otherwise.',
      'The Arabic version prevails in the event of inconsistency unless applicable law requires otherwise.',
    ],
  },
  {
    title: '21. Changes and severability',
    items: [
      'Biet Al Reef may update these terms to reflect operational, legal, security or technical changes.',
      'The revision date will be displayed and material changes may be notified through the platform or by email.',
      'Continued use after updated terms become effective constitutes acceptance to the extent permitted by law.',
      'If any provision is invalid, the remaining terms remain effective and the provision will be interpreted as closely as legally possible to its intended purpose.',
    ],
  },
];

export default function LegalEnglishPage() {
  return (
    <EnglishPlatformLegalPage
      title="Terms of Use and Conditions"
      badge="Legal framework for platform use"
      description="Terms governing the use of Biet Al Reef by customers, service providers, suppliers, factories and workshops in the United Arab Emirates."
      path="/en/legal"
      arabicPath="/legal"
      intro="These terms explain the rights and obligations of customers, service providers, suppliers, factories and workshops when using Biet Al Reef and its related digital services. By using the platform, you confirm that you have read, understood and accepted them."
      sections={sections}
    />
  );
}
