import { NextResponse } from 'next/server';

const ARKLEEN_PRODUCT_ROUTE = /^\/(?:en\/)?products\/arkleen\/([a-z0-9]+(?:-[a-z0-9]+)*)\/?$/i;

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const match = pathname.match(ARKLEEN_PRODUCT_ROUTE);

  if (!match) return NextResponse.next();

  const productSlug = match[1].toLowerCase();
  return NextResponse.redirect(
    new URL(`https://app.bietalreef.ae/product/${productSlug}`),
    301
  );
}

export const config = {
  matcher: ['/products/arkleen/:path*', '/en/products/arkleen/:path*'],
};
