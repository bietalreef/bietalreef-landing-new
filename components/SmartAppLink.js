'use client';

import Link from 'next/link';

export default function SmartAppLink({ children, className = '', onClick }) {
  return (
    <Link
      href="/how-it-works"
      onClick={onClick}
      className={className}
      title="تعرّف على منصة بيت الريف وكيف تعمل"
    >
      {children}
    </Link>
  );
}
