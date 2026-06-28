#!/bin/bash

PAGES=("legal" "marketplace" "platform" "providers" "services" "tools" "weyaak")

for page in "${PAGES[@]}"; do
  cat << INNER_EOF > "/home/ubuntu/bietalreef-landing-new/pages/en/${page}.js"
import Head from 'next/head';
import Link from 'next/link';
import EnglishLayout from '../../components/EnglishLayout';

export default function EnglishPage() {
  return (
    <>
      <Head>
        <title>Biet Al Reef</title>
        <meta name="description" content="Biet Al Reef English Page" />
      </Head>
      <EnglishLayout>
        <main className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <h1 className="text-3xl md:text-5xl font-black text-[#0F3F1A] mb-5">Coming Soon</h1>
          <p className="text-gray-600 leading-8 max-w-3xl mb-10">This page is currently under construction.</p>
          <Link href="/en" className="inline-flex rounded-full bg-[#0F3F1A] text-white px-6 py-3 font-black">Back to Home</Link>
        </main>
      </EnglishLayout>
    </>
  );
}
INNER_EOF
  echo "Created pages/en/${page}.js"
done
