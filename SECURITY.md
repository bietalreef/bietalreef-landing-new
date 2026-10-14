# Security Policy | سياسة الإبلاغ الأمني

This is the public website source repository for **Biet Al Reef** (`bietalreef.ae`). Please help us address security concerns privately and responsibly.

## Reporting a vulnerability | الإبلاغ عن ثغرة

**Do not open a public GitHub issue containing an exploitable vulnerability, secret, access token, customer record or reproduction steps.**

- Prefer GitHub's **private vulnerability reporting** feature under the repository's **Security** tab **if it is enabled**.
- Otherwise, contact the project team privately through the business address **weyaakai@bietalreef.ae**, with a subject such as `Security report — Biet Al Reef Platform`.
- Report the affected URL/component, expected and actual behavior, potential impact and minimally necessary reproduction evidence. Do not include credentials you do not own or real customer data.

**يرجى الإبلاغ عن الثغرات والمفاتيح المكشوفة بشكل خاص، وعدم نشر تفاصيل الاستغلال أو بيانات العملاء في Issues العامة.**

## Scope

- Website and Next.js server routes in this repository.
- Authentication, API access, public query boundaries, data disclosure, file handling, caching and security headers used by this platform.
- Cloudflare staging integration only after it exists and is in scope for verification.

The open marketplace, Flutter Android/Web app and Supabase backend are related products, but each has separate release boundaries; route reports to the relevant maintaining team when appropriate.

## Safe testing

- Do not test against real customers, access other people's accounts, extract personal data, perform denial-of-service tests, send mass requests or modify production content.
- Use synthetic data and approved test accounts only. Stop testing and report immediately if you encounter customer data.
- Do not disclose a reported issue publicly before maintainers have assessed and had a reasonable opportunity to respond.

## Maintainer review checklist

Each release should independently verify:

1. Least-privilege credentials, protected environment variables, identity trust and secrets handling.
2. Supabase RLS and publication/channel rules; no bypass via server or preview routes.
3. Authentication/authorization, input validation, unsafe uploads and abuse controls.
4. Dependency and secret scanning, CI permissions and reviewed third-party Actions.
5. TLS, cookies and headers, Cloudflare managed rules, API rate limits and false-positive monitoring.
6. Preview isolation, production deploy evidence and incident rollback.

**This policy documents a process; it does not assert that every listed measure is enabled or that the project has a security certification.**

---

For non-security bugs and product suggestions, use the regular GitHub issue tracker. Please keep sensitive material out of public posts.
