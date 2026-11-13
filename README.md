# devmyc-portfolio

Personal portfolio of Mohamed Hussein, IT and Management graduate (USN) working across software, data and security. Will live at [devmyc.no](https://devmyc.no).

Built with Next.js (App Router), React, JavaScript and Tailwind CSS. No other runtime dependencies.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure

| Path | What it holds |
|---|---|
| `app/` | Pages. Each folder is a route: `/about`, `/projects`, `/projects/[slug]`, `/experience`, `/contact` |
| `app/globals.css` | Design system: colours, fonts and motion as Tailwind theme tokens |
| `components/` | Shared layout and UI pieces |
| `lib/content.js` | All site copy and project data in one place |
| `public/images/` | Portrait and project screenshots |

## Scripts

- `npm run dev`: development server
- `npm run build`: production build
- `npm run lint`: ESLint
