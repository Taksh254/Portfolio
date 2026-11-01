# TAKSH.OS — Portfolio of Taksh Sehrawat

My personal portfolio, built as a desk-and-notebook "operating system": projects, hackathons, skills, GitHub activity, about and contact, with pop-up windows for the details.

**Live:** https://portfolio-two-peach-30.vercel.app

I'm a B.Tech CSE (AI/ML) student at IILM University, Gurugram (2024–2028) and a backend intern at GrowNova (since Aug 2026).

## What's featured

| Project | What it is | Links |
| --- | --- | --- |
| **BloomDesk** | Offline-first Android app + website for play schools (attendance, fees, homework, a community for schools) | [Live](https://bloom-desk-fl6l.vercel.app) |
| **GrowNova OS** (internship) | NestJS / Prisma / PostgreSQL backend for a business OS for Indian MSMEs | [Code](https://github.com/kaniskoChakraborty/Grownova-0.1/tree/Taksh) |
| **Viral Shorts Clipper** | YouTube link → captioned 9:16 Shorts, picked by a local LLM, posted or scheduled | [Code](https://github.com/Taksh254/Clipper-) |
| **Finova** | Deterministic payout reconciliation with a controller workbench | [Live](https://finova-vert-alpha.vercel.app) · [Code](https://github.com/Taksh254/Finova-) |
| **Oryn** | Your filesystem as an explorable 3D universe | [Live](https://oryn-puce.vercel.app) · [Code](https://github.com/Taksh254/visual-file-manager) |
| **Tiny Mind Play School** | School website with Supabase admin and parent dashboards | [Live](https://school-web-ebon.vercel.app/) · [Code](https://github.com/Taksh254/School-web) |
| **Study Buddy** | Local AI study library with a tutor that cites your notes | [Code](https://github.com/Taksh254/Study_Buddy) |
| **EDITH AI** | Local voice assistant on Ollama with a HUD | [Code](https://github.com/Taksh254/Edith-ai) |
| **BeejMantra** | Hackathon team build: AI assistant for farmers in 5 languages | [Code](https://github.com/Taksh254/BeejMantra) |

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion. Deployed on Vercel from `main`.

## Editing the content

Almost everything you see comes from plain data files, so updating the site rarely means touching components:

- `src/data/profile.ts` — bio, "currently", experience timeline, toolchain, links
- `src/data/projects.ts` — project cards and the Work window (the first 6 appear in the home-page fan)
- `src/data/hackathons.ts` — hackathon cards
- `src/data/experiments.ts`, `src/data/notes.ts` — Lab and Notes windows
- `src/data/githubContributions.json` — contribution heatmap snapshot
- `src/components/CurrentlyCard.tsx` — the "Currently" card in the hero
- Project screenshots live in `public/projects/` (1440×900 PNG)

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build check
```
