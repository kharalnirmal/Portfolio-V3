# Portfolio SEO and AI Discoverability Plan

## Objective

Improve the discoverability of Nirmal Kharal's portfolio when people search for:

- Nirmal Kharal
- nirmalkharal
- Nirmal Kharal portfolio
- Full-stack developer in Lumbini, Nepal
- Full-stack developer in Nepal
- Related portfolio and developer queries

The work should also make the portfolio easier for search-backed AI assistants to discover, understand, and cite when relevant.

No SEO implementation can guarantee the first Google result, a specific ranking, or inclusion in an AI-generated answer. The purpose of this work is to give search engines and AI systems accurate technical signals, a consistent identity, crawlable resources, and clear relationships between the portfolio and Nirmal's public profiles.

## Agreed Constraints

- Do not change the visual design.
- Do not change animations or interactions.
- Do not change application behavior.
- Do not rewrite portfolio sections or project content.
- Do not introduce hidden keyword-stuffed content.
- Existing code may only be changed where required for metadata or structured SEO data.
- New SEO-specific files may be added.
- Preserve all unrelated and pre-existing worktree changes.
- Use `https://nirmalkharal.dev` as the canonical domain.
- Use "Full-stack developer" as the primary professional identity.
- Use "Lumbini, Nepal" as the public location.
- Include Google Search Console and Bing Webmaster Tools in the rollout.

## Current Audit Findings

### Existing Strengths

- The portfolio is server rendered and its main content appears in the initial HTML.
- The page visibly contains the full name "Nirmal Kharal."
- The About section contains useful descriptions of skills and professional focus.
- Projects, technologies, experience, and volunteering information are crawlable.
- GitHub, LinkedIn, Instagram, resume, and email links are present.
- A 1200 x 630 Open Graph image already exists.
- The site is served over HTTPS through Vercel.
- `www.nirmalkharal.dev` permanently redirects to the apex domain.

### Problems To Resolve

- The current document title is only `Hey !`, which provides almost no search context.
- Open Graph and Twitter titles are also generic.
- Metadata declares `https://www.nirmalkharal.dev`, but production redirects that hostname to `https://nirmalkharal.dev`.
- There is no canonical link declaration.
- `/robots.txt` currently returns 404.
- `/sitemap.xml` currently returns 404.
- There is no structured `Person`, `ProfilePage`, or `WebSite` data.
- There are no Google or Bing site-verification declarations.
- There is no AI-oriented `llms.txt` resource.
- The current social image does not clearly show the name or professional title.
- The rendered document does not currently contain an `h1`. This will not be changed under the current constraints because it would require modifying non-metadata page markup.

## Implementation Plan

### 1. Centralize SEO Identity Values

Create a small SEO-specific constants module if it prevents domain, title, description, and profile URLs from being duplicated across metadata, sitemap, robots, and structured data.

Planned canonical identity:

- Name: `Nirmal Kharal`
- Role: `Full-stack developer`
- Location: `Lumbini, Nepal`
- Canonical URL: `https://nirmalkharal.dev`
- GitHub: `https://github.com/kharalnirmal`
- LinkedIn: `https://www.linkedin.com/in/kharalnirmal/`
- Instagram: `https://www.instagram.com/nirmalkharal/`
- Resume: `https://nirmalkharal.dev/resume/NirmalKharal-Resume.pdf`

Keep the module minimal and only introduce it if it makes the implementation clearer than repeating values.

### 2. Improve Next.js Metadata

Update only the metadata declaration in `app/layout.tsx`.

Planned title:

```text
Nirmal Kharal | Full-Stack Developer in Lumbini, Nepal
```

Planned description direction:

```text
Portfolio of Nirmal Kharal, a full-stack developer in Lumbini, Nepal building thoughtful web products with Next.js, React, TypeScript, PostgreSQL, and modern backend systems.
```

Metadata additions and corrections:

- Change `metadataBase` to the apex domain.
- Add a canonical URL through `alternates.canonical`.
- Add `applicationName`.
- Add `authors` with Nirmal's canonical website.
- Add `creator` and `publisher` as Nirmal Kharal.
- Add a concise and relevant keyword set without keyword stuffing.
- Add explicit index and follow directives.
- Add appropriate Googlebot preview directives.
- Add `openGraph.locale`.
- Use the canonical apex URL in Open Graph metadata.
- Use consistent title and description values for Open Graph and Twitter.
- Continue using a large image social card.
- Add Google and Bing verification values only after real values are available.

Metadata keywords are a secondary descriptive signal and are not expected to improve Google rankings directly. Titles, visible content, links, structured data, and external authority are more important.

### 3. Add `robots.txt`

Create `app/robots.ts` using the Next.js 16 metadata file convention.

Requirements:

- Allow crawling of the public site.
- Do not block CSS, JavaScript, images, the resume, or metadata resources.
- Reference `https://nirmalkharal.dev/sitemap.xml`.
- Declare the apex domain as the host where supported.
- Keep wildcard access enabled so standard search and search-backed AI crawlers can access the portfolio.

Explicit crawler rules should only be added when they change behavior. Duplicating the wildcard allow rule for every AI crawler is unnecessary if all crawlers are already allowed.

Expected route:

```text
https://nirmalkharal.dev/robots.txt
```

### 4. Add a Sitemap

Create `app/sitemap.ts` using the Next.js 16 metadata file convention.

Initial sitemap content:

- `https://nirmalkharal.dev`

Rules:

- Include only canonical, indexable URLs.
- Use fully qualified apex-domain URLs.
- Do not include hash fragments such as `#about` or `#work` because they are not separate pages.
- Do not use a changing build timestamp as `lastModified`.
- Only add `lastModified` when it can accurately represent a significant content update.
- Do not rely on `priority` or `changeFrequency`; Google ignores those fields.

Expected route:

```text
https://nirmalkharal.dev/sitemap.xml
```

### 5. Add Structured Data

Add server-rendered JSON-LD without changing any visible UI or client behavior.

Use a connected Schema.org graph containing:

#### `Person`

- Stable `@id`, such as `https://nirmalkharal.dev/#person`
- `name`: Nirmal Kharal
- `url`: canonical portfolio URL
- `image`: canonical profile-image URL
- `jobTitle`: Full-stack developer
- Accurate professional description
- `addressRegion`: Lumbini
- `addressCountry`: Nepal
- `sameAs`: GitHub, LinkedIn, and Instagram
- `knowsAbout`: Next.js, React, TypeScript, PostgreSQL, Prisma, full-stack development, frontend development, backend development, authentication, database design, and deployment

#### `WebSite`

- Stable `@id`, such as `https://nirmalkharal.dev/#website`
- Canonical URL
- Name: Nirmal Kharal
- English language declaration
- Publisher or creator connected to the `Person` entity

#### `ProfilePage`

- Stable `@id` for the canonical page
- Canonical URL
- `mainEntity` connected to the `Person` entity
- `isPartOf` connected to the `WebSite` entity

Structured data rules:

- Every statement must be supported by visible portfolio content or verified public information.
- Do not add ratings, awards, employer claims, follower counts, or credentials that are not verifiable.
- Escape serialized JSON-LD safely before rendering it in a script element.
- Keep the structured data available in the server-rendered HTML.

### 6. Add AI-Readable Site Information

Create `public/llms.txt` following the current llms.txt proposal.

It should contain:

- Site title and concise identity summary.
- Full-stack developer positioning.
- Lumbini, Nepal location.
- Primary skills and technologies already represented on the portfolio.
- Canonical portfolio URL.
- Resume URL.
- GitHub, LinkedIn, and Instagram links.
- A concise project list with links for RepoLens, Portfolio, GTA VI, and Kairo.
- A note that the portfolio is the primary first-party source for Nirmal's work and professional profile.

Requirements:

- Keep all claims factual.
- Keep the file concise and easy for an agent to parse.
- Do not describe `llms.txt` as a ranking mechanism.
- Do not block AI search crawlers in `robots.txt`.

Expected route:

```text
https://nirmalkharal.dev/llms.txt
```

`llms.txt` is an emerging convention. It can improve machine readability but does not guarantee that an AI provider will crawl, store, cite, or recommend the site.

### 7. Improve the Social Preview Image

The current Open Graph image visually represents the portfolio but does not prominently identify the owner.

Create an SEO-specific social preview that includes:

- Nirmal Kharal
- Full-Stack Developer
- Lumbini, Nepal
- A visual style consistent with the existing portfolio
- 1200 x 630 dimensions
- Strong contrast and readable text at thumbnail sizes

This asset will only affect link previews and metadata consumers. It will not alter the visible page.

Use the new image for both Open Graph and Twitter metadata unless separate platform-specific assets provide a clear benefit.

### 8. Add Search-Engine Verification

Verification cannot be completed with invented values.

After the Google Search Console and Bing Webmaster Tools properties are created, add their real verification tokens through Next.js metadata:

- Google Search Console verification value
- Bing Webmaster Tools verification value

Prefer a domain-level Google Search Console property verified through DNS because it covers both the apex and any subdomains. The deployed canonical URLs should still consistently use the apex domain.

## Validation Plan

### Local Code Validation

Run:

```bash
npm run lint
npm run build
```

Confirm that Next.js generates the metadata routes successfully and that no metadata type errors occur.

### Local Route Validation

Start the production server and verify:

- `/` returns 200.
- `/robots.txt` returns 200 with plain-text crawler rules.
- `/sitemap.xml` returns 200 with valid XML.
- `/llms.txt` returns 200 with readable Markdown/plain text.
- The social preview image returns 200.

### HTML Validation

Inspect the server-rendered homepage source and confirm:

- The title contains Nirmal Kharal and Full-Stack Developer.
- The meta description is present once.
- The canonical link points to `https://nirmalkharal.dev`.
- Open Graph URL and image URLs are absolute.
- Open Graph and Twitter values are consistent.
- Robots directives permit indexing and following.
- JSON-LD is present and parseable.
- No metadata still identifies `www.nirmalkharal.dev` as canonical.

### External Validation After Deployment

Use:

- Google Rich Results Test
- Schema.org Validator
- Google Search Console URL Inspection
- Google Search Console sitemap report
- Bing Webmaster URL Inspection
- Bing Webmaster sitemap report
- Open Graph preview/debugging tools
- Twitter/X card preview tools where available

Production checks:

```text
https://nirmalkharal.dev/
https://nirmalkharal.dev/robots.txt
https://nirmalkharal.dev/sitemap.xml
https://nirmalkharal.dev/llms.txt
```

Also confirm that:

- `https://www.nirmalkharal.dev` continues to permanently redirect to the apex domain.
- Search metadata consistently uses the apex domain.
- The canonical page is publicly accessible without authentication.
- Googlebot and Bingbot are not blocked by Vercel or application-level rules.

## Search Console Rollout

### Google Search Console

1. Add `nirmalkharal.dev` as a domain property.
2. Verify ownership using the DNS TXT record provided by Google.
3. Submit `https://nirmalkharal.dev/sitemap.xml`.
4. Inspect `https://nirmalkharal.dev/`.
5. Run a live URL test.
6. Request indexing after the deployment is verified.
7. Review the selected canonical URL once Google recrawls the page.
8. Monitor branded queries and indexing reports.

Target queries to monitor include:

- `nirmal kharal`
- `nirmalkharal`
- `nirmal kharal portfolio`
- `nirmal kharal developer`
- `full stack developer lumbini`
- `full stack developer nepal`

### Bing Webmaster Tools

1. Add and verify `nirmalkharal.dev`.
2. Import verification from Google Search Console if Bing offers it, or use Bing's verification method.
3. Submit `https://nirmalkharal.dev/sitemap.xml`.
4. Inspect and submit the homepage URL.
5. Monitor crawl errors and indexing status.

Bing indexing can also improve discoverability in Microsoft search experiences and search-backed AI products.

## Off-Site Entity Consistency

Technical SEO alone is not enough to establish a person as a strong search entity. Public profiles should consistently use:

- Name: Nirmal Kharal
- Primary title: Full-stack developer
- Location: Lumbini, Nepal
- Website: `https://nirmalkharal.dev`
- Similar profile image where appropriate
- Similar short professional description

Priority profile updates:

1. LinkedIn website and bio.
2. GitHub profile website and profile README.
3. Instagram bio if used professionally.
4. Resume website URL.
5. Profiles belonging to AIESEC or CSITAN where appropriate and factually supported.

Relevant, legitimate links from organization pages, project repositories, project documentation, event pages, and developer profiles are more valuable than mass directory submissions or purchased backlinks.

## Long-Term Ranking Work

The initial implementation provides a technical foundation. Stronger rankings for non-branded terms such as "best portfolio" or broad developer searches generally require additional first-party content and external authority.

Potential future work, only if content changes are later approved:

- Dedicated project case-study routes.
- Detailed explanations of the problem, implementation, architecture, and results for each project.
- A proper About/Profile route with a semantic `h1`.
- Technical writing based on original development work.
- Links from project repositories back to the relevant portfolio pages.
- Credible links from organizations, events, communities, and collaborators.

These are intentionally outside the current implementation scope because they would modify or expand visible site content.

## Success Metrics

### Technical Success

- All SEO routes return 200.
- Canonical signals consistently use the apex domain.
- The homepage is indexable.
- Google and Bing accept the sitemap.
- Structured data validates without critical errors.
- Social previews show the correct name and role.

### Search Success

- The homepage becomes indexed under the canonical apex URL.
- Impressions appear for `Nirmal Kharal` and `nirmalkharal`.
- Average position improves for branded name queries.
- The correct title and description begin appearing in search results.
- Search engines connect the portfolio to Nirmal's public profiles.

### AI Discoverability Success

- AI search crawlers can access the site.
- `llms.txt` is publicly available and accurate.
- Structured data clearly identifies the person, website, role, location, skills, and public profiles.
- Search-backed assistants can retrieve a concise, consistent description of Nirmal and his work.

AI citations and recommendations remain controlled by each provider and cannot be guaranteed.

## Monitoring Schedule

### Immediately After Deployment

- Validate all SEO endpoints.
- Validate structured data.
- Submit both webmaster-tool sitemaps.
- Request homepage indexing.

### After 7 Days

- Check whether Google and Bing crawled the sitemap.
- Review canonical selection and indexing status.
- Fix any structured-data or crawl warnings.

### After 30 Days

- Review branded query impressions and average position.
- Check whether the updated title and description are appearing.
- Compare indexed URL and canonical URL.
- Review backlinks and referring domains.

### Ongoing

- Re-submit or request indexing after significant portfolio updates.
- Keep public profile details consistent.
- Update structured data and `llms.txt` when skills, projects, location, or professional positioning materially change.
- Never publish false claims solely for ranking purposes.

## Implementation Order

1. Preserve and re-read current worktree changes.
2. Add SEO constants only if useful.
3. Correct metadata and canonical-domain signals.
4. Add `robots.ts`.
5. Add `sitemap.ts`.
6. Add and render JSON-LD.
7. Add `public/llms.txt`.
8. Add the improved social preview image.
9. Run lint and production build.
10. Inspect generated metadata and routes locally.
11. Deploy.
12. Validate production endpoints and structured data.
13. Complete Google and Bing verification and sitemap submission.
14. Monitor indexing and branded-query performance.

## Definition Of Done

This SEO phase is complete when:

- Application design and behavior remain unchanged.
- Metadata accurately identifies Nirmal Kharal as a full-stack developer in Lumbini, Nepal.
- All canonical references use `https://nirmalkharal.dev`.
- `robots.txt`, `sitemap.xml`, and `llms.txt` are publicly available.
- Valid structured data connects the portfolio, person, location, skills, and public profiles.
- The social preview clearly contains the name and role.
- Lint and production build pass.
- Google Search Console and Bing Webmaster Tools accept the site and sitemap.
- The homepage has been submitted for recrawling.
