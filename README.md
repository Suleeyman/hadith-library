# Hadiths Library

A multilingual, reading-first Hadith browser built with Next.js App Router. It presents editions, books, and individual hadiths, with fast search and Arabic diacritics support.

## Features

- Editions overview with book and hadith counts
- Book-level browsing per edition
- Hadith detail pages with grading metadata
- Full-text search with pagination
- Arabic diacritics toggle
- Multi-language UI and content with RTL support

## Tech Stack

- Next.js App Router
- React 19
- Tailwind CSS v4 + daisyUI
- TypeScript

## Getting Started

### Prerequisites

- Bun (recommended)
- Node.js 20+

### Install

```
bun install
```

### Run

```
bun run dev
```

Open `http://localhost:3000`.

## Scripts

- `bun run dev`: Start the dev server
- `bun run build`: Production build
- `bun run start`: Start the production server
- `bun run lint`: Lint
- `bun run tcheck`: Type check

## Project Structure

- `app/`: App Router routes, layouts, metadata, and route handlers
- `components/`: UI, layout, and section components
- `lib/`: API client, i18n, and utilities
- `public/`: Static assets

## Internationalization

Supported locales: `en`, `fr`, `ar`, `ru`, `id`, `tr`, `ur`, `bn`, `ta`.

RTL languages are handled automatically for `ar` and `ur`.

## API Notes

The app expects [hadislam.org](https://github.com/Suleeyman/hadislam.org) API.

Set `API_BASE_URL` to the API origin to enable server-side fetching.


## 📜 License

This project is licensed under the MIT License. See `LICENSE`.

## 💬 Feedback

Have suggestions, feedback, or need support? Open an issue or start a discussion — we’d love to hear from you.

## 🤝 Contributing

We welcome all kinds of contributions! Here's how you can help :

**✅ Improve the Application**

Push to a feature branch and thereafter create a **pull request** on `main` branch.

**♥️ Financial support**

If you want to support me financially you can [buy me a coffee](https://ko-fi.com/ysuleyman) it will certainly motivate me on continously improving the Web Application. May Allah rewards you !