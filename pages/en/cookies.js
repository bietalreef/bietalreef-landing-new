import EnglishPlatformLegalPage from '../../components/legal/EnglishPlatformLegalPage';

const sections = [
  {
    title: '1. What cookies are',
    paragraphs: [
      'Cookies and similar storage technologies are small files or identifiers saved in the browser to operate the website, remember settings, measure performance and improve security and usability.',
    ],
  },
  {
    title: '2. Scope',
    items: [
      'This policy applies to the Biet Al Reef website, request pages and related digital services.',
      'Similar technologies may include local storage, session identifiers, performance measurements and conversion signals.',
      'Third-party technologies are also subject to the relevant provider’s policies.',
    ],
  },
  {
    title: '3. Strictly necessary cookies',
    items: [
      'These support session management, form protection, fraud prevention, security, language selection and privacy choices.',
      'They may also support load distribution and restoring page state after updates.',
      'They are normally required to provide the requested service, although browser-level deletion may affect functionality.',
    ],
  },
  {
    title: '4. Preference cookies',
    items: [
      'These may remember language, region and selected interface options.',
      'They may store choices concerning language, interface state and consent settings.',
      'Disabling them may cause the same choices to be requested again.',
    ],
  },
  {
    title: '5. Performance and analytics',
    items: [
      'These may help identify popular pages, navigation paths, device performance and technical errors.',
      'Aggregated information may be used to improve speed, compatibility and usability.',
      'This category is enabled in accordance with applicable consent requirements.',
    ],
  },
  {
    title: '6. Marketing and campaign measurement',
    items: [
      'These may measure campaign effectiveness, limit repeated advertising or identify conversions from marketing channels.',
      'They are enabled only where a lawful basis and any required consent are available.',
      'They may be placed by advertising partners or social networks under their own policies.',
    ],
  },
  {
    title: '7. Third-party services',
    items: [
      'The platform may include mapping, messaging, payment, analytics, hosting or embedded-content services supplied by third parties.',
      'A third-party provider may place its own cookies or identifiers when its service is used.',
      'Users should review the relevant provider’s policy and controls.',
    ],
  },
  {
    title: '8. Duration and retention',
    items: [
      'Session cookies are normally deleted when the browser is closed or the session expires.',
      'Persistent cookies remain for a defined period or until manually deleted.',
      'Biet Al Reef seeks to limit retention to the period reasonably necessary for operational, analytical or legal purposes.',
    ],
  },
  {
    title: '9. Consent and user choices',
    items: [
      'Where a consent tool is displayed, users may accept or reject optional categories and change their choices later.',
      'Consent controls do not apply to technologies strictly necessary to provide a requested service.',
      'Consent may be withdrawn without affecting earlier lawful processing.',
      'A page reload may be required to apply a changed setting completely.',
    ],
  },
  {
    title: '10. Browser and device controls',
    items: [
      'Cookies may be deleted or blocked through browser or device settings.',
      'Users may restrict third-party cookies or use private-browsing features where supported.',
      'Blocking all cookies may disrupt language preferences, forms or other website functions.',
      'Control steps differ between browsers and should be reviewed in the browser help centre.',
    ],
  },
  {
    title: '11. Do Not Track and global signals',
    items: [
      'Some browsers send signals such as Do Not Track or Global Privacy Control.',
      'Biet Al Reef seeks to respect supported signals for optional categories while continuing to use necessary technologies.',
      'Not all external services interpret these signals in the same way.',
    ],
  },
  {
    title: '12. Website local storage',
    items: [
      'The website may use limited local storage for language, privacy choices and anonymous session identifiers after consent.',
      'This storage is not used to create a visitor account or to send form values or Weyaak conversations to behaviour analytics.',
      'Website data may be removed from browser settings, after which language and privacy choices may be requested again.',
    ],
  },
  {
    title: '13. Security and abuse prevention',
    items: [
      'Session identifiers and security signals may be used to detect unauthorised access, harmful automation or fraud.',
      'Security events may be logged and retained for the period necessary for investigation, protection and compliance.',
      'Users should report suspicious requests, unexpected prompts or misuse through official support channels.',
    ],
  },
  {
    title: '14. Policy changes',
    items: [
      'This policy may be updated when new tools, partners or categories are introduced or legal requirements change.',
      'The revision date appears at the top of the page and material changes may be notified where appropriate.',
      'Users should review this page periodically for current practices and controls.',
    ],
  },
];

export default function CookiesEnglishPage() {
  return (
    <EnglishPlatformLegalPage
      title="Cookie Policy"
      badge="Control over storage and tracking"
      description="Biet Al Reef cookie and local-storage policy, including cookie categories, consent and user-control options."
      path="/en/cookies"
      arabicPath="/cookies"
      intro="This policy explains how Biet Al Reef uses cookies and similar storage technologies to operate and secure the platform, remember settings, improve performance and provide controls over optional categories."
      sections={sections}
    />
  );
}
