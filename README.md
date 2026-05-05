# Bookmark Manager

A modern, mobile-first web app for managing your bookmarks. Add, edit, archive, and filter bookmarks with a clean and responsive UI.

## Features

- **Add Bookmarks** — Save bookmarks with a title, URL, description, tags, and an auto-fetched favicon
- **Edit Bookmarks** — Update any bookmark's details
- **Archive & Unarchive** — Move bookmarks to an archive without permanently deleting them
- **Delete Bookmarks** — Permanently remove bookmarks you no longer need
- **Filter by Tags** — Select one or more tags from the sidebar to filter your bookmarks
- **Sort Bookmarks** — Sort by recently added, recently visited, or most visited
- **Fuzzy Search** — Quickly find bookmarks by searching title, description, URL, or tags
- **View Tracking** — Tracks visit count and last visited date per bookmark
- **Responsive Design** — Mobile-first layout with a collapsible sidebar on smaller screens and a persistent sidebar on desktop
- **PWA Support** — Installable as a standalone app on desktop and mobile

## Tech Stack

- **[Next.js](https://nextjs.org/)** — React framework for server and client rendering
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** — Accessible, customizable UI components
- **[Radix UI](https://www.radix-ui.com/)** — Headless UI primitives
- **[Prisma](https://www.prisma.io/)** — Type-safe ORM for database access
- **[NextAuth.js](https://next-auth.js.org/)** — Authentication
- **[Fuse.js](https://fusejs.io/)** — Fuzzy search
- **[Sonner](https://sonner.emilkowal.ski/)** — Toast notifications
- **[Phosphor Icons](https://phosphoricons.com/)** — Icon library

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

```bash
git clone https://github.com/your-username/bookmark-manager.git
cd bookmark-manager
pnpm install
```

### Environment Variables

Create a `.env` file in the root of the project:

```env
DATABASE_URL=""
NEXTAUTH_SECRET=""
NEXTAUTH_URL=""
```

### Database Setup

```bash
pnpx prisma migrate dev
```

### Run the App

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Roadmap

- [ ] Pin bookmarks to top
- [ ] Tag management (rename, delete)
- [ ] Bulk actions
- [ ] Browser extension for one-click saving