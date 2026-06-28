import os

# Assuming englishPages.js content is available or can be parsed
# For simplicity, I'll hardcode the data based on the previous read of englishPages.js
ENGLISH_STATIC_PAGES = {
    'services': { 'title': 'Services', 'heading': 'Construction and maintenance service categories in the UAE', 'description': 'Browse building, maintenance, design, materials and provider-related categories across UAE cities and service areas.', 'cta': 'Browse categories' },
    'providers': { 'title': 'Providers', 'heading': 'Service providers, contractors and suppliers', 'description': 'A public information page for companies, workshops, suppliers and individual specialists who will later connect through Biet Al Reef.', 'cta': 'Explore UAE areas' },
    'marketplace': { 'title': 'Marketplace', 'heading': 'Building materials and product marketplace', 'description': 'A structured public page for materials, smart systems, decor, furniture and future product listings connected to Biet Al Reef.', 'cta': 'Explore categories' },
    'tools': { 'title': 'Smart Tools', 'heading': 'Smart tools for project planning', 'description': 'Information about tools that help users understand quantities, costs and service decisions before moving to the operational app.', 'cta': 'Browse services' },
    'weyaak': { 'title': 'Weyaak', 'heading': 'Weyaak — the smart assistant layer', 'description': 'Weyaak helps explain services, guide users to the right category and support future interactions inside the Biet Al Reef ecosystem.', 'cta': 'Explore services' },
    'platform': { 'title': 'Platform', 'heading': 'A structured platform for the construction journey', 'description': 'Biet Al Reef separates the public website for indexing from the operational app for marketplace, requests, maps and tools.', 'cta': 'Explore UAE areas' },
    'about': { 'title': 'About', 'heading': 'About Biet Al Reef', 'description': 'Biet Al Reef is a UAE-focused project for organizing construction, maintenance, design and materials services through clear public pages and future digital operations.', 'cta': 'Explore UAE areas' },
    'blog': { 'title': 'Blog', 'heading': 'Building, maintenance and design insights', 'description': 'A future content area for practical guides about UAE construction services, materials, maintenance, design and local service search.', 'cta': 'Browse services' },
    'legal': { 'title': 'Legal', 'heading': 'Legal information', 'description': 'General legal, privacy and terms information for the Biet Al Reef public website and its connected digital services.', 'cta': 'Back to home' },
    'privacy': { 'title': 'Privacy Policy', 'heading': 'Privacy policy', 'description': 'English privacy policy overview for the Biet Al Reef public website and connected services.', 'cta': 'Legal information' },
    'terms': { 'title': 'Terms and Conditions', 'heading': 'Terms and conditions', 'description': 'English terms and conditions overview for using the Biet Al Reef public website and connected digital services.', 'cta': 'Legal information' },
    'media': { 'title': 'Media Information', 'heading': 'Biet Al Reef media information', 'description': 'Media and brand information for the English version of Biet Al Reef.', 'cta': 'Explore the platform' }
}

ENGLISH_SEO_SERVICE_PAGES = {
    'contractors-in-uae': { 'title': 'Contractors in the UAE', 'heading': 'Contractors and general contracting services in the UAE', 'description': 'A public English page for general contracting, villa construction, extensions and construction companies across UAE service areas.', 'categorySlug': 'general-contracting' },
    'interior-design-uae': { 'title': 'Interior Design in the UAE', 'heading': 'Interior design and decoration services in the UAE', 'description': 'Explore interior design, decoration, majlis design, furniture coordination and related service pages across UAE cities and areas.', 'categorySlug': 'interior-design' },
    'marble-suppliers-uae': { 'title': 'Marble and Ceramic Suppliers in the UAE', 'heading': 'Marble, ceramic and finishing material suppliers in the UAE', 'description': 'A structured English page for marble, ceramic, porcelain and finishing material services across UAE locations.', 'categorySlug': 'marble-ceramic' },
    'electrical-contractors-uae': { 'title': 'Electrical Contractors in the UAE', 'heading': 'Electrical contractors and maintenance services in the UAE', 'description': 'Find English pages for electrical works, lighting, panels, wiring and maintenance services across UAE cities and areas.', 'categorySlug': 'electrical' },
    'villa-renovation-uae': { 'title': 'Villa Renovation in the UAE', 'heading': 'Villa renovation and finishing services in the UAE', 'description': 'A public English page for villa renovation, finishing works, upgrades and project planning across UAE service areas.', 'categorySlug': 'finishing-works' },
    'building-materials-uae': { 'title': 'Building Materials in the UAE', 'heading': 'Building materials and construction supplies in the UAE', 'description': 'Browse building materials, finishing materials and supply-related service pages across UAE cities and local areas.', 'categorySlug': 'building-materials' },
    'maintenance-services-uae': { 'title': 'Maintenance Services in the UAE', 'heading': 'Building and property maintenance services in the UAE', 'description': 'A structured English page for maintenance services, repair works, AC, plumbing, electrical and facility-related categories.', 'categorySlug': 'ac-technicians' },
    'craftsmen-uae': { 'title': 'Craftsmen and Skilled Workers in the UAE', 'heading': 'Craftsmen, technicians and skilled workers in the UAE', 'description': 'Explore service categories for carpenters, electricians, plumbers, AC technicians and other skilled workers across the UAE.', 'categorySlug': 'carpentry' },
    'cleaning-services-uae': { 'title': 'Cleaning Services in the UAE', 'heading': 'Cleaning services for homes and buildings in the UAE', 'description': 'Browse cleaning service pages for homes, buildings, post-construction cleaning and maintenance support across UAE locations.', 'categorySlug': 'cleaning-services' },
    'equipment-rental-uae': { 'title': 'Equipment Rental in the UAE', 'heading': 'Construction equipment rental in the UAE', 'description': 'A public English page for equipment rental, site machinery and project support services across the UAE.', 'categorySlug': 'equipment-rental' },
    'furniture-decor-uae': { 'title': 'Furniture and Decor in the UAE', 'heading': 'Furniture, decor and furnishing services in the UAE', 'description': 'Explore furniture, decor, curtains, majlis furnishing and related service pages across UAE cities and areas.', 'categorySlug': 'furniture-decor' }
}

SITE_DOMAIN = 'https://bietalreef.ae'

def generate_page_content(page_data, slug, is_seo_service=False):
    title = page_data['title']
    heading = page_data['heading']
    description = page_data['description']
    cta = page_data['cta']
    canonical = f"{SITE_DOMAIN}/en/{slug}"
    ar_path = f"/{slug}"

    # Simplified content for placeholder pages
    content = f"""
import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';

export default function EnglishPage() {{
  return (
    <>
      <Head>
        <title>{}</title>
        <meta name=\"description\" content=\"{description}\" />
        <link rel=\"canonical\" href=\"{canonical}\" />
        <link rel=\"alternate\" hrefLang=\"ar\" href=\"{SITE_DOMAIN}{ar_path}\" />
        <link rel=\"alternate\" hrefLang=\"en\" href=\"{canonical}\" />
      </Head>
      <EnglishLayout>
        <main className=\"max-w-7xl mx-auto px-4 py-14 md:py-20\">
          <h1 className=\"text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5\">{heading}</h1>
          <p className=\"text-gray-600 leading-8 max-w-3xl mb-10\">{description}</p>
          <Link href=\"/en\" className=\"inline-flex rounded-full bg-[#0F3F1A] text-white px-6 py-3 font-black\">{cta}</Link>
        </main>
      </EnglishLayout>
    </>
  );
}}

export async function getStaticProps() {{
  return {{ props: {{ page: {{title: '{title}', heading: '{heading}', description: '{description}', cta: '{cta}'}} }}, revalidate: 3600 }};
}}

export async function getStaticPaths() {{
  return {{ paths: [], fallback: 'blocking' }};
}}
""".format(title=title, description=description, canonical=canonical, SITE_DOMAIN=SITE_DOMAIN, ar_path=ar_path, heading=heading, cta=cta)
    return content

def main():
    output_dir = '/home/ubuntu/bietalreef-landing-new/pages/en'
    os.makedirs(output_dir, exist_ok=True)

    for slug, data in ENGLISH_STATIC_PAGES.items():
        if slug not in ['index', 'sitemap']:
            file_path = os.path.join(output_dir, f'{slug}.js')
            content = generate_page_content(data, slug)
            with open(file_path, 'w') as f:
                f.write(content)
            print(f"Generated {file_path}")

    for slug, data in ENGLISH_SEO_SERVICE_PAGES.items():
        file_path = os.path.join(output_dir, f'{slug}.js')
        content = generate_page_content(data, slug, is_seo_service=True)
        with open(file_path, 'w') as f:
            f.write(content)
        print(f"Generated {file_path}")

if __name__ == '__main__':
    main()
