'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

const PROTECTED_ROUTES = [
  '/about',
  '/why-biet-alreef',
  '/how-it-works',
  '/platform',
  '/pricing',
  '/partners',
  '/providers/register',
  '/suppliers',
  '/factories',
  '/contact',
  '/faq',
  '/support-policy',
  '/privacy',
  '/legal',
  '/cookies',
  '/weyaak',
];

function normalizePath(path) {
  const clean = (path || '/').split('?')[0].split('#')[0];
  if (clean === '/') return '/';
  return clean.endsWith('/') ? clean.slice(0, -1) : clean;
}

function isProtectedPath(pathname) {
  const normalized = normalizePath(pathname);
  const withoutLocale = normalized.replace(/^\/(ar|en)(?=\/|$)/, '') || '/';
  return PROTECTED_ROUTES.some((route) => withoutLocale === route || withoutLocale.startsWith(`${route}/`));
}

function buildWatermark() {
  const stamp = new Date().toLocaleDateString('ar-AE');
  return `بيت الريف • محتوى محمي • ${stamp}`;
}

export default function ProtectedContentGuard() {
  const router = useRouter();
  const protectedPage = useMemo(() => isProtectedPath(router.asPath), [router.asPath]);

  useEffect(() => {
    if (!protectedPage || typeof document === 'undefined') return undefined;

    const root = document.documentElement;
    const body = document.body;
    root.classList.add('biet-protected-page');
    body.classList.add('biet-protected-page');
    body.setAttribute('data-protection-watermark', buildWatermark());

    const prevent = (event) => {
      const target = event.target;
      const tag = target?.tagName?.toLowerCase?.();
      const editable = tag === 'input' || tag === 'textarea' || target?.isContentEditable;
      if (editable) return;
      event.preventDefault();
    };

    const preventKeyboard = (event) => {
      const key = String(event.key || '').toLowerCase();
      const blocked =
        (event.ctrlKey || event.metaKey) && ['c', 'x', 'p', 's', 'u'].includes(key);
      if (blocked) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const preventPrint = (event) => {
      event.preventDefault?.();
    };

    document.addEventListener('copy', prevent, true);
    document.addEventListener('cut', prevent, true);
    document.addEventListener('contextmenu', prevent, true);
    document.addEventListener('dragstart', prevent, true);
    document.addEventListener('selectstart', prevent, true);
    document.addEventListener('keydown', preventKeyboard, true);
    window.addEventListener('beforeprint', preventPrint);

    return () => {
      root.classList.remove('biet-protected-page');
      body.classList.remove('biet-protected-page');
      body.removeAttribute('data-protection-watermark');
      document.removeEventListener('copy', prevent, true);
      document.removeEventListener('cut', prevent, true);
      document.removeEventListener('contextmenu', prevent, true);
      document.removeEventListener('dragstart', prevent, true);
      document.removeEventListener('selectstart', prevent, true);
      document.removeEventListener('keydown', preventKeyboard, true);
      window.removeEventListener('beforeprint', preventPrint);
    };
  }, [protectedPage]);

  return null;
}

export { PROTECTED_ROUTES, isProtectedPath };
