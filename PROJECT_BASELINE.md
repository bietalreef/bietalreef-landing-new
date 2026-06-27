# Biet Alreef Landing — Project Baseline

Last updated: 2026-06-27

## 1. Official Repository

The official public informational website repository is:

- `bietalreef/bietalreef-landing-new`

Do not treat any other repository as the production source for the public landing website.

## 2. Production Branch

The official production branch is:

- `master`

Rules:

- `master` is the only production source.
- `main` is not the production source.
- Do not merge `main` into `master` unless a dedicated migration review confirms a common history and a safe diff.
- New work must be done in short-lived feature branches created from `master`.
- Every feature branch must be merged through a Pull Request.
- Delete only temporary/test branches after confirming their changes are either merged or intentionally discarded.

## 3. Vercel Project

The official Vercel project is:

- Project name: `bietalreef-landing-new`
- Project ID: `prj_9irWamnbQ9g7v21Sgk1XZPza9f5B`
- Team: `weyaakai's projects`
- Team ID: `team_AuMkD81n8XSIhsaZNLzaZfGf`

Production deployment must be generated from the `master` branch.

Official domains:

- `https://bietalreef.ae`
- `https://www.bietalreef.ae`

## 4. Current Verification Finding

At the time this baseline was created, GitHub `master` was ahead of the currently inspected Vercel production deployment commit by 91 commits.

Inspected Vercel production deployment:

- Deployment ID: `dpl_HvgJStq3aBiDf1pkErqhftxdL7sU`
- Deployment URL: `bietalreef-landing-gt8h6f9y9-weyaakais-projects.vercel.app`
- State: `READY`
- Commit deployed by Vercel: `6a12914c81b45de2a36ba7f33ef91cd7908b1d67`
- Commit message: `Merge pull request #3 from bietalreef/rebuild-landing-homepage`

This means the repository baseline is not considered fully confirmed until Vercel deploys the latest `master` commit and the live domain is verified.

## 5. Figmawebapp Rule

`figmawebapp` is a design/component reference only.

Rules:

- Do not create a new page or component from scratch if an equivalent page/component exists in the approved source/reference.
- Reuse, port, or refactor existing components before creating new ones.
- All final implementation and deployment for the public informational website must happen inside `bietalreef/bietalreef-landing-new`.

## 6. Website Architecture Rules

The public website is the SEO/AEO layer. It should support:

- Home
- Providers
- Provider profiles
- Marketplace
- Products/services
- Tools
- Weyaak
- Platform
- UAE / emirates / cities / areas / local services
- Blog and informational pages

Preferred route chain:

- emirate → city/area → service/category → provider profile

Every landing page should be indexable and include internal linking where useful.

## 7. SEO / AEO Minimum Requirements

For every important public page, confirm:

- Title
- Meta description
- Canonical URL
- hreflang when applicable
- Open Graph / Twitter metadata where applicable
- Structured Data where applicable
- Breadcrumb
- FAQ when useful
- Internal links between emirate, area, service, provider, product, and tool pages

## 8. English Version Rule

The English version may exist inside the repository, but it should not be treated as production-approved until reviewed.

Rules:

- Keep English pages updated in parallel with Arabic where practical.
- Do not claim English production readiness without direct QA.

## 9. Review and Reporting Rules

No task is considered complete unless it is traceable through:

1. GitHub commit or Pull Request
2. Successful build/deployment evidence
3. Vercel deployment confirmation
4. Live website check when the change affects the public UI

Reports must not claim completion based only on code or screenshots.

## 10. Immediate Next Action

Trigger or wait for a new Vercel production deployment from the latest `master` commit, then verify:

- Vercel deployment commit equals latest `master`
- `https://bietalreef.ae` loads the expected homepage
- Hero, navbar, footer, providers, marketplace, tools, Weyaak, platform, services, UAE, and English routes are checked as applicable
