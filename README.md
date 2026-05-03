# Bookmark Manager

A modern, mobile-first web app for managing your bookmarks. Add, edit, archive, and delete bookmarks with a smooth and visually pleasing UI.

## Features

- **Add Bookmarks** — Save bookmarks with a title, URL, description, tags, and a favicon image
- **Edit Bookmarks** — Update any bookmark's details including its image
- **Archive & Unarchive** — Move bookmarks to an archive to keep things tidy without permanently deleting them
- **Delete Bookmarks** — Permanently remove bookmarks you no longer need
- **Filter by Tags** — Select one or more tags from the sidebar to filter your bookmarks
- **Sort Bookmarks** — Sort by recently added, recently visited, or most visited
- **Search by Title** — Quickly find bookmarks by searching their title
- **Responsive Design** — Mobile-first layout with a collapsible sidebar on smaller screens and a persistent sidebar on desktop

## Tech Stack

- **[Next.js](https://nextjs.org/)** — React framework for server and client rendering
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** — Accessible, customizable UI components
- **[Radix UI](https://www.radix-ui.com/)** — Headless UI primitives
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
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Roadmap

- [ ] Backend integration
- [ ] Authentication
- [ ] Fuzzy search
- [ ] Pin bookmarks to top
- [ ] Tag management