MATCHDOCKET — DOCKET SIGNAL WEBSITE

Responsive React website with 29 core pages and nine additional synthetic case detail routes (38 rendered routes). Native scroll narrative, distinct proposed-module figures, explicit review/override demo, accessibility and reduced-motion control. Selected Record Clasp logo, Newsreader + Manrope, and all brand assets are local.

Run:
  npm ci
  npm run dev

Repository handoff:
  - brand-kit/ contains the editable MatchDocket tokens, components, icons, figures, fonts and guide.
  - intro-animation/ contains the editable Remotion Canyon intro composition and local assets.
  - design-references/ contains the selected logo and intro visual directions.
  - public/brand/ contains the production logo, favicon, texture, font, icon and figure assets used by the site.

The homepage intro is embedded as a responsive native Remotion Player composition. It fills the viewport, includes pause/replay/skip controls, scrolls to the hero after completion, and can be replayed by scrolling back up. The final still remains available for reduced-motion preferences.

Production:
  npm run build
  npm run check
  python3 -m http.server 5174 --bind 127.0.0.1 --directory dist

Build emits readable HTML per route for discovery and direct navigation. The production static server resolves folder routes with a trailing slash; the client accepts both. Vercel configuration maps the clean addresses to their own page HTML. The generated canonical origin is the public Sites preview; change scripts/prerender.mjs to the verified custom origin before a public Vercel/domain launch.

Preview scope:
- Research-stage concept, not an operating finance product.
- All case records, organizations, people and decisions are fictional.
- Inquiry/contact forms validate and prepare an in-memory local draft. They do not transmit it or create a waitlist subscription.
- Demo exports only labeled synthetic JSON. No outbound send, tax determination, bank change, ERP posting or payment.
- Pricing is explicitly hypothetical. No customer logos, certifications, saved-money or accuracy claims.
- Analytics event plumbing is local and purpose limited. No third-party analytics receiver or personal/financial event properties.
- LinkedIn/Crunchbase icons are included; no invented company-profile URLs.

Before external lead collection / public launch:
Configure a verified recipient/backend, data controller details, retention/deletion route, operational consent and counsel-reviewed legal text; identify approved profile URLs. GitHub/Vercel/custom-domain accounts and domain details are not configured in this deliverable.

Third-party licenses:
Fonts: OFL files in public/brand/fonts.
Icons: Lucide and Simple Icons notices in public/brand/icons.
Application packages: pinned versions in package-lock.json.

QA: see qa-report.json. Screenshots: previews/.

Visual correction: Docket Signal reference supplied on 13 October 2026. Burgundy #802E34, charcoal #232C27, paper #FCFBF8; condensed Teko display, Manrope UI, Newsreader thesis; scanned-paper collage, horizontal source chain, distinct module mini-graphics, before/after audit record. Approved Record Clasp symbol retained in burgundy. Original paper asset generated with the built-in ImageGen tool; see signal-artwork-notes.txt for prompt and provenance.
