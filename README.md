# PRAYUDDHA 2K26 — Symposium Website

**IDEAS IGNITE IMPACTS** — *Unleash. Innovate. Conquer.*

An inter-collegiate technical and non-technical symposium organized by the **Department of Information Technology** and **Department of Artificial Intelligence & Machine Learning**, University College of Engineering (BIT) Campus, Anna University, Tiruchirappalli.

**Date:** 09 October 2026, Friday · **Time:** 9:00 AM onwards · **Venue:** Dr. A.P.J. Abdul Kalam Auditorium, B-Block

---

## Tech Stack

- **React 18** + **TypeScript** — UI framework and type safety
- **Vite 5** — build tool and dev server
- **Tailwind CSS 3** — utility-first styling
- **Lucide React** — clean SVG icons
- **PWA** — installable, offline-capable

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview

# Type check
npm run typecheck
```

## Project Structure

```
src/
├── components/          # React UI components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Events.tsx
│   ├── EventModal.tsx
│   ├── Prizes.tsx
│   ├── Rules.tsx
│   ├── Schedule.tsx
│   ├── Team.tsx
│   ├── Gallery.tsx
│   ├── Contact.tsx
│   ├── Registration.tsx
│   ├── Footer.tsx
│   ├── ThemeToggle.tsx
│   └── OfflineIndicator.tsx
├── data/                # Centralized content (edit these!)
│   ├── siteConfig.ts    # Event date, venue, contacts, nav links
│   ├── events.ts        # Event list with details
│   ├── team.ts          # Core committee + organizing teams
│   ├── schedule.ts      # Day-of schedule + inauguration
│   ├── gallery.ts       # Gallery items
│   ├── rules.ts         # Rules accordion categories
│   └── prizes.ts        # Prize information
├── hooks/               # Reusable React hooks
│   ├── useTheme.ts
│   ├── useCountdown.ts
│   ├── useBodyScrollLock.ts
│   └── useRevealOnScroll.ts
├── App.tsx             # Main app — assembles all sections
├── main.tsx            # Entry point
└── index.css           # Design system (CSS variables, themes)

public/
├── manifest.webmanifest # PWA manifest
├── service-worker.js   # Offline caching
├── offline.html        # Offline fallback page
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

## How to Edit Content

### Change the Event Date

Edit `src/data/siteConfig.ts`:

```ts
eventDate: '09 October 2026',
countdownDate: '2026-10-09T09:00:00+05:30',
```

The countdown and all date references pull from this single config.

### Edit Events

Edit `src/data/events.ts`. Each event has:

```ts
{
  id, name, category, description, rules, teamSize,
  fee, duration, rounds, eligibility, prizes, image,
  registrationLink, status
}
```

To add a new event, copy an existing object and change the fields. To mark an event as "Coming Soon", set `status: 'Coming Soon'`.

### Add/Remove Team Members

Edit `src/data/team.ts`:
- `coreCommittee` — President, VP, Secretary, etc. with phone numbers
- `organizingTeams` — Each team has a `name`, `members` array, and `icon`

### Edit the Schedule

Edit `src/data/schedule.ts`. Each item has `time`, `programme`, and optional `isBreak` / `isEnd` flags.

### Edit Rules

Edit `src/data/rules.ts`. Each category has a `category` name, `icon`, and `rules` array.

### Add Gallery Images

Edit `src/data/gallery.ts`. Each item has `id`, `category`, `caption`, and `query`. Currently the gallery uses placeholder cards — replace with actual photos by adding image URLs to the data and updating the Gallery component.

### Change Theme

The theme toggle cycles: **Light → Dark → System**. The preference is saved to `localStorage` under the key `prayuddha-theme`.

To change theme colors, edit the CSS variables in `src/index.css` under `:root` (light) and `[data-theme='dark']` (dark).

### Change Registration URL

Edit `src/data/siteConfig.ts`:

```ts
registrationURL: 'https://your-form-url.com',
```

## Future Backend Integration

The registration form (`src/components/Registration.tsx`) is structured to connect to a backend:

- The `handleSubmit` function currently generates a demo registration ID
- Replace the demo logic with an API call (Supabase, Firebase, MongoDB, REST API)
- The form data shape (`FormData` interface) is ready for serialization
- No real payment is processed — the Transaction ID field is for manual payment verification

## PWA

The website is installable as a PWA:
- `public/manifest.webmanifest` — app metadata
- `public/service-worker.js` — offline caching
- `public/offline.html` — fallback page

The service worker caches static pages for offline access. Registration and dynamic data are never cached.

## Deployment

```bash
npm run build
```

The `dist/` folder contains the production build. Deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Notes

- All placeholder information is marked as **TBA** or **Coming Soon**
- No fake sponsors, statistics, or event details have been invented
- Phone numbers and names are used exactly as supplied
- The gallery uses placeholder cards until event photos are available
