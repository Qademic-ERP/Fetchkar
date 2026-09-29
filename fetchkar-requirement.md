# ClientPing (Working Name) — Master Build Plan
### India-First Client Lifecycle Tool: Asset Collection + Testimonial Collection for Agencies, Freelancers & Consultants

---

## 0. Document Purpose

This is the single source of truth for building this product end-to-end — vision, users, every feature (MVP through Phase 3), full technical architecture, database schema, API design, UI/UX flow, India-specific pricing, a full marketing/go-to-market plan, security, and a week-by-week build roadmap. Written to be handed directly to an AI coding assistant section by section.

**Scope note:** This plan merges two originally separate ideas explored earlier — (1) a client asset/content intake tool, and (2) a testimonial/social-proof collection tool (originally "TrustWall") — into **one unified product** covering the full client relationship: collect what you need from a client at the start of a project, and collect their praise at the end of it. Both use the identical underlying mechanism (a unique magic link, no login required, `wa.me`-based sending), which is what makes merging them into one app practical rather than building two separate products.

---

## 0.1 Environment Setup Checklist (Do This Before Writing Any Code)

1. **GitHub account + new repo.**
2. **Supabase account** (supabase.com) — new project, note the Postgres connection string, Project URL, API keys, and enable a Storage bucket for client-uploaded files. Free tier: 500MB database, 1GB file storage.
3. **Render account** (render.com) — backend hosting. Free tier sleeps after 15 min idle; set up a free **UptimeRobot** or **cron-job.org** pinger hitting a health-check endpoint every 5-10 minutes to keep it warm. Budget ₹580/month (~$7) for the Starter plan once real paying customers depend on it.
4. **Cloudflare account** (cloudflare.com) — frontend hosting via Cloudflare Pages (free tier, permits commercial use, unlimited bandwidth). Also enable **Cloudflare Turnstile** (free CAPTCHA) for later abuse prevention.
5. **Resend or Brevo account** — transactional email (reminders, notifications). Free tier covers early volume.
6. **Domain name** — register via BigRock/Hostinger/GoDaddy for INR billing (~₹500-1,200/year).
7. **(Phase 2 only)** Razorpay Payment Links account — only needed once you build the optional deposit-collection feature.

---

## 1. Vision & Positioning

**One-line pitch:** "One link at the start of a project to collect everything you need from a client — one link at the end to collect their testimonial. No signup for the client, no chasing on WhatsApp for either."

**Positioning statement:** For Indian freelancers, web/design agencies, and consultants who waste hours chasing clients for content at the start of a project and then never bother collecting testimonials at the end of it, ClientPing manages the full client lifecycle with the same simple mechanism both times — a branded, no-login magic link, sent and nudged over WhatsApp, priced in rupees, built for solo operators.

**Why merge these into one product:** They share the identical technical core (unique link → no-login public page → auto-saving submission → agency review/approval → `wa.me` sending and reminders), and they target the *same buyer at two different moments of the same relationship* — the agency that used ClientPing to onboard a client is the natural one to also use it to collect that client's testimonial once the project wraps. One tool, one login, one subscription, covering the whole arc.

**Why this, not a copy of Content Snare or Senja/Testimonial.to:** Content Snare (intake) and Senja/Testimonial.to (testimonials) each solve one half of this well, but both are dollar-priced, email-first, English-only in practice, and neither one does both halves — an agency currently needs two separate subscriptions for two moments of the same client relationship. The gap: one INR-priced, WhatsApp-native tool for the entire client lifecycle.

---

## 2. Problem Statement

- An agency/freelancer signs a client, but can't start work until the client sends assets (logo, brand colors, website copy, photos, business details, login access).
- This collection happens over scattered WhatsApp messages, email threads, and shared Drive folders — clients forget, lose track of what's needed, and delay for weeks.
- Every day of delay is a day the agency can't finish the project or send the final invoice — a direct cash-flow problem, not just an annoyance.
- Existing tools (Content Snare, OnboardHive, Portico) solve this well but are priced in USD, built for teams, and default to email reminders — a mismatch for solo Indian freelancers whose clients live on WhatsApp.

---

## 3. Target Personas

### Persona 1 — "Aditi, the Freelance Web Designer"
- One-person operation, takes on 3-6 client projects a month, ₹15,000-1,00,000 per project.
- Currently uses WhatsApp + Google Drive links to collect client content — constantly has to re-ask for missing items.
- Price-sensitive; a $35/month tool (₹3,000+) feels expensive relative to her project sizes.

### Persona 2 — "Rahul, 2-3 Person Digital Marketing Agency"
- Runs paid ad campaigns and needs brand assets, ad copy approval, and login access from each client monthly, not just once.
- Wants to look professional to clients (branded portal) without an enterprise price tag.

### Persona 3 — "Meera, Independent Chartered Accountant / Consultant"
- Needs recurring documents from clients (invoices, statements, ID proofs) every month/quarter, not just once at onboarding.
- Non-technical; needs something clients (who are often less tech-savvy) find genuinely easy, not intimidating.

### Persona 4 — "Rohit, Fitness/Business Coach or D2C Instagram Seller" (testimonial-only use case)
- Doesn't need the asset-intake half of the product at all — never chases clients for logos or files.
- Sells a course, coaching program, or physical product, and has praise buried in WhatsApp/Instagram DMs from happy customers that never gets turned into marketing material.
- Uses only the testimonial-collection half of the app: requests testimonials after a sale or program completion, displays them on a public Wall of Love page linked from their Instagram bio, or embeds the widget on a Shopify/course sales page.
- This persona is why the product must work well as a **testimonial-only tool**, not just as an add-on bolted onto client intake — the request builder needs to support a request containing *only* a testimonial item, with no other checklist items at all.

---

## 4. Core User Flows

### Flow A — Agency Creates a Request
1. Agency logs in, clicks "New Request," picks a client (or adds a new one: name + phone number).
2. Agency either builds a checklist from scratch (add items: text answer, file upload, yes/no, dropdown) or picks a saved **template** (e.g., "Website Onboarding Pack").
3. System generates a unique link: `clientping.in/r/{unique_id}`.
4. Agency sends the link via WhatsApp (using a `wa.me` pre-filled message, same free trick as TrustWall) or copies it to send another way.

### Flow B — Client Completes the Request
1. Client clicks the link — no login, no signup.
2. Sees a clean, branded page (agency's logo/colors) listing every item needed, with a progress bar ("3 of 7 completed").
3. Fills in text answers, uploads files, answers yes/no questions — **auto-saves after every item**, so closing the tab loses nothing.
4. Can leave a comment on any specific item if confused ("which logo file — PNG or SVG?").
5. Submits when done, or simply leaves and returns later via the same link to finish.

### Flow C — Automated (and Semi-Automated) Reminders
1. If a request sits incomplete for a set number of days (agency-configurable, e.g., 3 days), the system prepares a reminder.
2. **Email reminder:** sent fully automatically via Resend/Brevo — no human step needed.
3. **WhatsApp reminder:** since there is no free way to send a WhatsApp message with zero human involvement (see Section 11 for why), the system instead shows the agency a dashboard notification — "3 clients need a WhatsApp nudge today" — each with a **one-click pre-filled `wa.me` link** ready to send. The agency taps each one (a few seconds per client); this keeps it free and personal, at the small cost of not being fully hands-off.

### Flow D — Agency Reviews Submissions
1. Agency dashboard shows every client and their completion status.
2. Agency can approve or reject individual items (not just the whole submission) — e.g., "logo ✅, this photo is blurry, please reupload."
3. Rejected items automatically reopen for the client with the agency's note attached, and trigger a fresh reminder.
4. Once everything is approved, the request is marked "Complete" — the agency's cue that the project can now start.

### Flow E — Bulk Sending via CSV
1. Agency uploads a CSV of client names and phone numbers (e.g., every customer from the last month who completed a course).
2. System generates a request (from a chosen template) and a unique link for each row.
3. Agency sees a review screen listing every generated `wa.me` link with a "Send" button next to each name.
4. Agency taps through the list, sending each pre-filled WhatsApp message in turn — still free, still personal (comes from their own number), just faster than creating requests one at a time.

### Flow F — Testimonial-Only Request (Coach/D2C Persona)
1. A coach or D2C seller (who never needs the asset-intake half of the product) creates a request using only a "testimonial" item — no other checklist items at all.
2. Sends it the same way, via `wa.me`, to a customer who just finished a program or received an order.
3. Once approved, the testimonial is automatically eligible to be added to one of the coach's Wall of Love pages, tagged by which product/program it relates to.
4. The coach shares their public wall link directly in their Instagram bio, or copies the embed widget onto their Shopify/course sales page.

---

## 5. Full Feature List

### 5.1 MVP Features (Phase 1 — Build First, Target: 5-7 weeks)

**Agency-facing:**
- Sign up / login (email + password, or Google OAuth)
- Onboarding wizard: business name, logo upload, primary brand color, category (agency/freelancer/consultant/coach/D2C — determines which default templates are suggested)
- "New Request" builder: add items (text, file upload, yes/no, dropdown, **testimonial**), reorder items, and build a request with *only* testimonial items for the coach/D2C persona
- Save any request as a reusable **template** (e.g., "Website Onboarding Pack," "Project Completion — Testimonial Request")
- **Bulk request creation via CSV upload** — upload a list of client names + phone numbers, system generates a batch of ready-to-click `wa.me` links in one go (for sending the same request/testimonial ask to many clients at once)
- Client list with phone numbers, request history per client
- `wa.me` link generator for sending the initial request and for manual reminder nudges
- Dashboard: all active requests, completion %, "needs a nudge today" list
- Per-item approve/reject with a note field
- **Tagging** on approved testimonial items (by product, campaign, or custom tag), so a coach running multiple programs can filter/organize which testimonials belong to which offer
- **One public "Wall of Love" page per agency at MVP** (`clientping.in/wall/{slug}`) displaying approved testimonials — shareable directly as an Instagram bio link
- **One embeddable widget** (JS snippet, carousel style at MVP) showing approved testimonials, for pasting into the agency's own website
- Free tier limits (e.g., 2 active requests/month); paid tier removes limits and branding

**Client-facing (the submission page):**
- No login required — access via unique link only
- Clean, mobile-first page showing agency's branding and the full checklist
- Progress bar, auto-save after every field/upload
- **For testimonial items specifically:** client can respond via typed text, an in-browser voice recording, or an in-browser video recording (15-60 sec), using the browser's native `MediaRecorder` API — no app download; optional star rating (1-5), toggleable by the agency per request
- Comment box per item for questions
- Resume anytime via the same link
- Confirmation/thank-you screen on submission

**Platform:**
- Automated email reminders (Resend/Brevo) on a configurable schedule
- Semi-automated WhatsApp reminder dashboard (see Flow C and Section 11)
- Razorpay subscription billing (INR)
- Basic usage analytics (requests sent, completion rate, average time-to-complete, wall page views, widget impressions)

### 5.2 Phase 2 Features (Months 2-4 — differentiation & retention)

**Client intake side:**
- **Conditional/branching questions** — "Do you have a GST number?" → show/hide follow-up questions based on the answer (matches Content Snare's most-praised feature).
- **Contract e-signature + deposit collection** — client signs an agreement and pays a booking deposit on the same link. Payment stays gateway-free: show a UPI QR code image the agency uploads once, client pays directly, agency manually marks "paid" (same safe pattern used throughout this plan, avoiding any Razorpay-connect complexity for the agency).
- **Multi-team-member accounts** — for agencies bigger than one person.
- **Recurring/repeating requests** — for consultants (like Meera) who need the same document set from a client every month/quarter, auto-generating a fresh link on schedule.
- **White-label branding options** — remove all ClientPing mentions entirely on paid tiers.

**Testimonial side:**
- **AI Testimonial Composer** — customer records a rough, unpolished voice note ("umm it was really good, I lost weight, thanks") and AI cleans it into a polished written testimonial; the customer must review and approve the cleaned version before it's usable, so nothing is published without their consent.
- **Auto-transcription + auto-translation** — voice/video testimonials in Hindi, Tamil, Telugu, Marathi, Kannada, Bengali, Gujarati are auto-transcribed (via Whisper API or AssemblyAI) and optionally auto-translated to English for wider display, while the original language version is always preserved and viewable.
- **AI-generated shareable image cards** — turn any approved testimonial into a branded, Instagram-story-ready image automatically (customer photo/quote + star rating, styled to the agency's brand color) for the agency or coach to post directly on social media.
- **Google Reviews import** — pull in existing Google Business reviews automatically alongside self-collected testimonials, so a business's whole review history can live on one Wall of Love.
- **Instagram/Twitter mention import** — paste a public post URL to import a public mention or DM screenshot as a testimonial (mirrors how Senja/Testimonial.to handle this).
- **Case study / long-form export** — turn a detailed testimonial into a formatted, one-page PDF case study an agency can attach to sales pitches or LinkedIn posts.
- **Referral/incentive layer** — optional, agency-configurable auto-offer of a small discount code to customers who complete a testimonial request, to boost completion rates.
- **Multiple Walls of Love per agency** — separate walls per product/service/campaign (e.g., "Course A testimonials" vs. "1:1 Coaching testimonials"), not just the single MVP wall.
- **More widget types** — beyond the MVP carousel: a grid layout, a floating badge ("See our reviews"), a pop-up notification style ("Priya just left a 5-star review!"), a video grid, and a single-quote hero banner for a landing page.
- **Regional language support for the client-facing submission page itself** (not just testimonial transcription) — Hindi, Tamil, Telugu, Marathi toggle for the whole intake form, so clients uncomfortable in English aren't blocked from any item type, not only testimonials.

### 5.3 Phase 3 Features (Scale phase)

- **Official WhatsApp Business API integration (optional paid add-on)** — for agencies who want fully automatic WhatsApp reminders and requests with zero manual clicking, once they're big enough to justify the per-message cost. See Section 11 for why this isn't in MVP.
- **Zapier / Make.com integration** — auto-trigger a new intake request when a deal closes in a CRM, or auto-trigger a testimonial request when a payment is received (Razorpay webhook) or a course/project is marked complete.
- **Client satisfaction survey** — auto-sent after a request is completed, to help agencies show their own clients they care about experience.
- **Sentiment analysis dashboard** — auto-flag negative sentiment in submitted testimonials before they're ever shown to the client publicly or the agency for approval, plus surface common themes/keywords across all approved testimonials (e.g., "12 customers mentioned 'fast delivery'").
- **Agency/coach marketplace or directory** (optional, long-term) — an opt-in public directory of "verified" agencies/coaches using the platform, and cross-referrals between them.
- **Native mobile app (Android/iOS)** — explicitly **not** planned unless a clear, specific need emerges (e.g., push notifications for reminders); the whole product is deliberately pure webapp by design (see Section 6), and this stays true through Phase 3 unless real user demand changes that.

---

## 6. Technical Architecture

### 6.1 High-Level Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌───────────────────┐
│  React Frontend  │◄───────►│  Spring Boot API  │◄───────►│  Supabase Postgres │
│  (Agency Dashboard│  REST  │  (Business Logic)  │  JDBC   │  (Users, Requests, │
│  + Client Pages) │  /JSON  │                    │         │  Items, Templates) │
└─────────────────┘         └──────────────────┘         └───────────────────┘
                                      │
                                      ▼
                        ┌──────────────────────────┐
                        │  Supabase Storage          │
                        │  Client-uploaded files      │
                        │  (logos, docs, photos)      │
                        └──────────────────────────┘
                                      │
                                      ▼
                        ┌──────────────────────────┐
                        │  Third-party services:     │
                        │  - Razorpay (billing)       │
                        │  - Resend/Brevo (email)     │
                        │  - Cloudflare Turnstile     │
                        │    (bot protection)         │
                        └──────────────────────────┘
```

### 6.2 Recommended Stack (locked in, matches TrustWall)

| Layer | Choice | Why |
|---|---|---|
| Frontend | React + Vite, Tailwind CSS | Fast with AI tools, reused patterns from TrustWall |
| Backend | Spring Boot (REST API) | Matches existing skillset, handles file uploads and scheduled reminder jobs cleanly |
| Database | Supabase (Postgres) | Free tier, standard Postgres/JDBC, bundles storage in one project |
| File storage | Supabase Storage | 1GB free tier, private buckets with signed URLs for uploaded client files |
| Authentication | Spring Security + JWT, or Supabase Auth | Either works; Supabase Auth is the faster shortcut |
| Hosting (backend) | Render (free + uptime pinger, $7/mo Starter once live) | Same reasoning as TrustWall |
| Hosting (frontend) | Cloudflare Pages | Free forever, commercial use allowed |
| Payments | Razorpay (subscriptions + optional Payment Links for deposits) | UPI-native |
| Email | Resend or Brevo | Free tier for reminders |
| Scheduled reminder jobs | Spring's `@Scheduled` annotation, or a simple cron-triggered endpoint | No extra infrastructure needed — runs inside the existing Spring Boot app |

---

## 7. Database Schema (Core Tables)

```sql
-- Agencies/freelancers who sign up
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    business_name VARCHAR(255),
    logo_url TEXT,
    brand_color VARCHAR(10),
    plan VARCHAR(20) DEFAULT 'free', -- 'free', 'starter', 'pro'
    created_at TIMESTAMP DEFAULT now()
);

-- Clients belonging to an agency
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT now()
);

-- Reusable request templates
CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255), -- e.g. "Website Onboarding Pack"
    created_at TIMESTAMP DEFAULT now()
);

-- Individual items within a template (the checklist definition)
CREATE TABLE template_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES templates(id) ON DELETE CASCADE,
    item_type VARCHAR(20), -- 'text', 'file', 'yes_no', 'dropdown', 'testimonial'
    label VARCHAR(255),
    options JSONB, -- for dropdowns; conditional logic config (Phase 2)
    display_order INT
);

-- A live request sent to a specific client
CREATE TABLE requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    client_id UUID REFERENCES clients(id),
    template_id UUID REFERENCES templates(id), -- nullable if built from scratch
    unique_link_slug VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'in_progress', -- 'in_progress', 'submitted', 'completed'
    last_reminder_sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT now(),
    completed_at TIMESTAMP
);

-- Individual items within a live request (copied from template + client's answers)
CREATE TABLE request_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES requests(id) ON DELETE CASCADE,
    item_type VARCHAR(20), -- 'text', 'file', 'yes_no', 'dropdown', 'testimonial'
    label VARCHAR(255),
    text_answer TEXT,
    file_url TEXT, -- Supabase Storage URL (also used for testimonial video/audio files)
    star_rating INT, -- only used when item_type = 'testimonial'
    transcript TEXT, -- Phase 2: auto-transcribed text for voice/video testimonials
    translated_text TEXT, -- Phase 2: auto-translated English version, if original is a regional language
    language VARCHAR(10), -- detected/selected language code
    ai_polished_text TEXT, -- Phase 2: AI Testimonial Composer output, only used once customer approves it
    sentiment_score DECIMAL(3,2), -- Phase 3: auto-flagged sentiment, for agency review before publishing
    source VARCHAR(20) DEFAULT 'direct', -- 'direct', 'google_import', 'instagram_import', 'twitter_import' (Phase 2)
    source_url TEXT, -- original post/review URL, when imported rather than directly submitted
    tags TEXT[], -- custom tags for organizing testimonials by product/campaign
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'submitted', 'approved', 'rejected'
    rejection_note TEXT,
    display_order INT,
    updated_at TIMESTAMP DEFAULT now()
);

-- Comments/questions on a specific item
CREATE TABLE item_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_item_id UUID REFERENCES request_items(id) ON DELETE CASCADE,
    author VARCHAR(20), -- 'agency' or 'client'
    message TEXT,
    created_at TIMESTAMP DEFAULT now()
);

-- Public "Wall of Love" pages (one or more per agency), populated from approved testimonial items
CREATE TABLE walls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    slug VARCHAR(100) UNIQUE NOT NULL, -- clientping.in/wall/{slug}
    name VARCHAR(255), -- e.g. "Course A Testimonials" (Phase 2: multiple walls per agency)
    theme_config JSONB,
    created_at TIMESTAMP DEFAULT now()
);

-- Which approved testimonial items appear on which wall
CREATE TABLE wall_items (
    wall_id UUID REFERENCES walls(id) ON DELETE CASCADE,
    request_item_id UUID REFERENCES request_items(id) ON DELETE CASCADE,
    display_order INT,
    PRIMARY KEY (wall_id, request_item_id)
);

-- Embeddable widget configurations
CREATE TABLE widgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wall_id UUID REFERENCES walls(id) ON DELETE CASCADE,
    widget_type VARCHAR(30), -- 'carousel', 'grid', 'floating_badge', 'popup', 'video_grid', 'hero_quote' (Phase 2 adds all but carousel)
    config JSONB,
    embed_key VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT now()
);

-- Referral incentive codes offered for completing a testimonial (Phase 2)
CREATE TABLE referral_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_item_id UUID REFERENCES request_items(id) ON DELETE CASCADE,
    code VARCHAR(50),
    discount_description VARCHAR(255),
    created_at TIMESTAMP DEFAULT now()
);

-- Subscriptions/billing
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    razorpay_subscription_id VARCHAR(100),
    plan VARCHAR(20),
    status VARCHAR(20),
    current_period_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT now()
);
```

---

## 8. API Endpoint Design (REST)

### Auth
- `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/google`

### Agency dashboard
- `GET /api/clients` / `POST /api/clients`
- `POST /api/clients/bulk-csv` — upload a CSV of names + phone numbers, returns a batch of ready-to-click `wa.me` links for bulk sending
- `GET /api/templates` / `POST /api/templates` / `PATCH /api/templates/{id}`
- `POST /api/requests` — create a new request (from a template or from scratch, including testimonial-only requests), returns `unique_link_slug` + a ready `wa.me` link
- `GET /api/requests?status={in_progress|submitted|completed}`
- `PATCH /api/request-items/{id}` — approve/reject an individual item, with an optional rejection note; approving a testimonial item also triggers AI polishing/transcription jobs (Phase 2) if applicable
- `PATCH /api/request-items/{id}/tags` — add/remove tags on a testimonial item
- `GET /api/dashboard/needs-nudge-today` — list of clients whose requests are stale and ready for a manual WhatsApp reminder click
- `GET /api/analytics/summary`
- `GET /api/walls` / `POST /api/walls` / `PATCH /api/walls/{id}` — manage one or more Walls of Love
- `POST /api/walls/{id}/items` — add/remove which approved testimonials appear on a given wall, and reorder them
- `GET /api/widgets` / `POST /api/widgets` / `PATCH /api/widgets/{id}` — manage embeddable widgets (Phase 2 supports multiple `widget_type` values)
- `POST /api/imports/google-reviews` (Phase 2) — pull in Google Business reviews for a connected business
- `POST /api/imports/social-mention` (Phase 2) — import a public Instagram/Twitter post URL as a testimonial
- `POST /api/request-items/{id}/generate-image-card` (Phase 2) — generate a branded, shareable image from an approved testimonial
- `GET /api/request-items/{id}/export-case-study` (Phase 2) — generate a PDF case study from a testimonial
- `POST /api/referral-codes` (Phase 2) — configure the incentive shown to customers who complete a testimonial

### Public (no auth)
- `GET /api/public/request/{slug}` — fetch the request's items and agency branding to render the client page
- `PATCH /api/public/request/{slug}/item/{itemId}` — client submits/updates a single item's answer (auto-save)
- `POST /api/public/request/{slug}/item/{itemId}/comment` — client leaves a question
- `POST /api/public/request/{slug}/submit` — client marks the whole request as submitted

### Billing
- `POST /api/billing/create-subscription`
- `POST /api/billing/webhook`

### Internal (scheduled)
- A `@Scheduled` job runs daily, checks for requests with no update in N days, sends automated emails, and populates the "needs nudge today" list for WhatsApp.

---

## 9. UI/UX Screen List

**Agency Dashboard (authenticated):**
1. Login / Signup
2. Onboarding (business name, logo, brand color, category)
3. Main dashboard — active requests, completion %, "needs a nudge today" panel
4. Template manager (create/edit reusable checklists, including testimonial-only templates)
5. "New Request" builder (pick client + template, or build from scratch)
6. Bulk request modal — CSV upload, review generated `wa.me` links before sending
7. Request detail/review view (approve/reject items, leave notes, tag testimonials)
8. Client list
9. Walls of Love manager (create/edit multiple walls, assign testimonials to each, theme customization)
10. Widget manager (choose type: carousel/grid/floating badge/popup/video grid/hero quote, customize, get embed code)
11. Imports screen (Phase 2 — connect Google Business, paste a social post URL)
12. Shareable image card generator (Phase 2 — pick a testimonial, generate and download a branded social image)
13. Analytics page
14. Billing/subscription settings
15. Account/profile settings

**Public-facing (no login):**
16. Client submission page (`/r/{slug}`) — the full checklist with progress bar
17. Item-level comment thread
18. "All done, thank you!" confirmation screen (optionally showing a referral discount code, Phase 2)
19. Public Wall of Love page (`/wall/{slug}`)

---

## 10. Pricing Strategy (India-first, INR)

| Plan | Price | Features |
|---|---|---|
| **Free** | ₹0 | 2 active requests/month (intake or testimonial), 1 Wall of Love, email reminders only, ClientPing branding shown |
| **Starter** | ₹399/month (or ₹3,999/year) | Up to 10 active requests, WhatsApp reminder links, templates, 3 walls, all widget styles, branding removed |
| **Pro** | ₹999/month (or ₹9,999/year) | Unlimited requests, e-signature + deposit collection, multiple team members, conditional questions, AI-assisted testimonial polishing (Phase 2) |

Billing via Razorpay subscriptions, annual plans discounted ~15-20% to improve cash flow and reduce churn.

---

## 11. WhatsApp Reminders — Technical Detail and an Important Honesty Note

**Why full automation isn't free or simple:** Sending a WhatsApp message with zero human involvement requires the official WhatsApp Business API, which needs Meta business verification, has per-message costs, and takes real setup time. This is the same constraint we ran into designing TrustWall.

**The MVP-safe approach (used here):** The system tracks which requests are stale and need a nudge, and prepares a ready-to-send `wa.me` link with a pre-filled, personalized message for each one:

```
https://wa.me/91<client_phone>?text=<url_encoded_reminder_message>
```

The agency dashboard shows a simple daily list: "3 clients need a nudge today" with a one-tap "Send via WhatsApp" button per client — clicking it opens the agency's own WhatsApp with the message ready, they hit send. This costs nothing, needs no approval process, and — because it comes from the agency's own number — feels personal rather than automated/spammy to the client.

**The Phase 3 upgrade path:** Once an agency has enough active requests that manually clicking reminders becomes a real burden, the official WhatsApp Business API can be offered as an optional paid add-on for true one-click-free automation — but this should not be promised or built until there's real demand for it, since it adds real ongoing cost.

---

## 12. Localization Plan

- UI language: English at MVP.
- Client-facing submission page: Phase 2 adds Hindi, Tamil, Telugu, Marathi toggle, since the client filling out the form may be less comfortable in English than the agency using the dashboard.

---

## 13. Go-To-Market / Marketing Plan

### Pre-launch (during build, weeks 1-5)
- **Build in public**: post progress on X/LinkedIn/Instagram — "building a tool so Indian freelancers stop chasing clients on WhatsApp for logos" — this costs nothing and builds an audience before launch, the same way Senja (the testimonial tool referenced earlier) grew from zero.
- **Identify 15-20 target users directly**: search Instagram/LinkedIn for Indian freelance web designers, small digital marketing agencies, and independent CAs/consultants. DM them: "I'm building a free tool to stop the WhatsApp chasing for client content — want early access?"

### Launch (weeks 6-9)
- Onboard the first 15-20 users completely free in exchange for feedback.
- Post in Indian freelancer/agency communities: relevant Facebook groups ("Freelancers of India," city-specific designer/agency groups), LinkedIn posts targeting agency owners, and Reddit (r/india, r/freelance, r/webdev — framed as a genuine problem-solution post, not a spam pitch).
- Reach out directly to chartered accountants and consultants via LinkedIn — this audience is highly online and responds well to direct, specific messaging about a concrete time-saving tool.

### Growth (months 3-6)
- **Referral incentive**: existing users get a free month for every paying referral.
- **Content marketing**: blog/LinkedIn posts like "Why your web agency loses money waiting for client content" and "The real cost of chasing clients on WhatsApp" — targeted at the exact pain point, driving organic search traffic over time.
- **Direct comparison content**: "Content Snare alternative for Indian freelancers" as an SEO-targeted page, since people actively search for cheaper/localized alternatives to established tools (this is a proven pattern — OnboardHive and Portico both position this way against Content Snare).
- **Partnership angle**: reach out to Indian freelance/agency-focused newsletters, YouTube channels (there's a strong "freelancing in India" content creator space), and offer them an affiliate commission for referring paying users.

### Why free-first works here specifically
Agencies and freelancers are naturally skeptical of new tools until they see it solve their actual daily headache. Free access removes that friction, gets you real usage data and testimonials (which can, fittingly, be collected using the same testimonial-tool concept from TrustWall), and converts naturally to paid once they're dependent on the time savings.

---

## 14. Security & Privacy Considerations

- Client-uploaded files (which may include sensitive business documents, ID proofs for CAs, etc.) are stored in **private Supabase Storage buckets**, served only via signed, expiring URLs — never public-by-default.
- No login required for clients, so minimize what's collected about them: name, phone number (for the agency's own records), and whatever the agency's checklist explicitly asks for — nothing more.
- Agencies must be able to permanently delete a completed request and its files once a project ends, for both storage-cost and privacy reasons.
- All file uploads validated server-side for size and file type before accepting them into storage — never trust frontend validation alone.

---

## 14.1 Abuse Prevention & Rate Limiting

- **Bot spam on the public submission page**: add Cloudflare Turnstile (free) on the client-facing page, since it's unauthenticated by design.
- **Guessing/scanning for valid request links**: `unique_link_slug` values must be long, random, and non-sequential (e.g., a UUID or a cryptographically random string), so they cannot be guessed or enumerated.
- **File upload abuse**: enforce server-side file size limits (e.g., max 20MB per file) and allowed file types before accepting uploads.
- **Multiple free accounts to dodge the 2-requests/month free limit**: require email verification before an account can send its first request; flag signup clusters from the same IP for review.

---

## 15. Success Metrics (KPIs)

| Metric | Why it matters |
|---|---|
| Signups (agencies) | Top-of-funnel growth |
| Requests sent per active user | Are they actually using the core feature repeatedly? |
| Client completion rate (% of requests fully completed) | Health of the core product — is it actually solving the chasing problem? |
| Average time-to-complete per request | Directly maps to the value proposition (faster = better) |
| Free-to-paid conversion rate | Business viability |
| MRR | The long-term number that matters |
| Churn rate | Retention health |

---

## 16. Build Roadmap (Week-by-Week)

**Week 1 — Foundation**
- Repo setup, Spring Boot + React skeletons
- Supabase project (Postgres + Storage), auth
- Hosting pipelines (Render + pinger, Cloudflare Pages)

**Week 2 — Request Builder & Templates**
- Template and request-item database tables and APIs, including the `testimonial` item type
- Agency-side "New Request" builder UI

**Week 3 — Client Submission Flow (text/file/dropdown items)**
- Public submission page with auto-save per item
- File upload to Supabase Storage
- Progress bar, comment threads

**Week 4 — Testimonial Item Type**
- In-browser voice and video recording (`MediaRecorder` API) for testimonial-type items
- Star rating input
- Media upload to Supabase Storage alongside regular files

**Week 5 — Review, Walls & Widgets**
- Agency review/approve/reject UI, rejection notes reopening items
- `wa.me` link generation for initial sends and manual reminders
- "Wall of Love" builder (basic theme customization) and first embeddable widget (carousel)

**Week 6 — Reminders & Billing**
- Scheduled job for stale-request detection and automated email reminders
- "Needs a nudge today" dashboard panel
- Razorpay subscription integration, free tier limits

**Week 7 — Abuse Prevention & Polish**
- Cloudflare Turnstile on public pages, file upload validation, email verification on signup
- Mobile responsiveness pass, bug fixes

**Week 8 — Beta Launch**
- Onboard first 15-20 real users for free
- Collect feedback, fix critical issues, start build-in-public posts

**Weeks 9-10 — Iterate & Start Charging**
- Implement beta feedback
- Turn on paid plans with an early-bird discount for beta users
- Begin outreach to the next 50 target users via the channels in Section 13

**Month 3 onward — Phase 2 features**, prioritized by what beta users actually request — don't build conditional questions, e-signature, or auto-transcription until real users ask for them.

---

## 17. Competitive Positioning Summary

| | Content Snare | OnboardHive | Portico | **ClientPing (this app)** |
|---|---|---|---|---|
| Pricing | $35-215/mo (USD) | Not published | Not published | ₹399-999/mo (INR) |
| Reminder channel | Email | Email | Email | **WhatsApp-first** |
| Team size assumption | 2+ users minimum on cheapest plan | Not solo-focused | Not solo-focused | **Solo-freelancer from ₹0** |
| Market | Global | Global | Global | **India-specific** |

This is the honest positioning: not a blue-ocean, uncontested idea, but a real, proven market with a genuine, differentiated angle for the Indian solo freelancer/small agency segment that none of the three existing players are targeting directly.

---

## 18. Open Decisions to Make Before Building

1. Final product name and domain availability (e.g., clientping.in, snaresetu.in, etc.)
2. Firebase/Supabase Auth vs. custom Spring Security + JWT for MVP auth
3. Exact free-tier limits (2 requests/month is a starting suggestion — validate with beta users)
4. Whether to launch with English-only client pages first, or include one regional language (Hindi) from day one given the target audience

---

*End of master plan. Update this document as decisions are finalized and features ship — treat it as a living spec.*


## 19. Technical Decisions Made During Build
- **Email Sending & White-labeling (Resend)**: Free tier users will use a dynamic "Reply-To" workaround (emails originate from equests@clientping.in but replies go to the agency). True custom sender domains (full DNS white-labeling) will be gated as a premium feature for paid tiers to encourage upgrades and stay within Resend's free tier limits.
