# Biet Al Reef — English Website Version Blueprint

This is a working blueprint for the English SEO version of the public website.

## Objective

Create a professional English version of the Biet Al Reef public website under `/en` without replacing the Arabic version.

Arabic remains the primary version. English pages should support crawlable SEO, internal linking, and future marketplace/provider discovery.

## Core English Routes

- `/en`
- `/en/services`
- `/en/uae`
- `/en/providers`
- `/en/marketplace`
- `/en/tools`
- `/en/weyaak`
- `/en/platform`
- `/en/about`
- `/en/blog`
- `/en/legal`

## Dynamic SEO Routes

- `/en/categories/[slug]`
- `/en/uae/[emirate]`
- `/en/uae/[emirate]/[area]`
- `/en/uae/[emirate]/[area]/[service]`

## SEO Rules

Every English page should include:

- English title
- English meta description
- Canonical URL
- Arabic alternate hreflang
- English alternate hreflang
- Clear H1
- Useful body content
- Internal links to related pages

Avoid unsupported claims such as:

- The best platform in the UAE
- Thousands of providers
- Thousands of projects
- 4.8 rating

Use safe wording such as:

- A UAE-focused construction and maintenance services guide.
- A public website for discovery, indexing, and service navigation.
- A structured directory for cities, areas, categories, providers, and future marketplace operations.

## English Page Content Direction

### `/en`

H1: Find construction, maintenance and design services across the UAE.

Purpose: Main English landing page for users and search engines.

### `/en/services`

H1: Construction and maintenance service categories in the UAE.

Purpose: Link to English category pages.

### `/en/uae`

H1: Construction and maintenance service areas across the UAE.

Purpose: Link to emirates, areas, and local service pages.

### `/en/categories/[slug]`

Title pattern: `[Category Name] in the UAE | Biet Al Reef`.

### `/en/uae/[emirate]`

Title pattern: `[Emirate Name] Construction and Maintenance Services | Biet Al Reef`.

### `/en/uae/[emirate]/[area]`

Title pattern: `[Area Name] Service Categories | Biet Al Reef`.

### `/en/uae/[emirate]/[area]/[service]`

Title pattern: `[Service Name] in [Area Name], [Emirate Name] | Biet Al Reef`.

## Sitemap Requirement

English URLs should be added to a sitemap. The preferred approach is either:

- add English URLs into `/sitemap.xml`, or
- create a separate `/en-sitemap.xml` and reference it from `robots.txt`.

## Robots Requirement

`robots.txt` should allow:

- `/en`
- `/en/`

## Status

Initial English files were created under the website repository. This document tracks the intended English SEO structure before expanding content further.
