# UI Core

Monorepo with Admin, Web, and Mobile applications.

## Project Structure

```
ui-core/
├── admin/    → Next.js + PrimeReact + TypeScript (Admin Dashboard)
├── web/      → Next.js + PrimeReact + TypeScript (Public Website)
├── mobile/   → Expo + Gluestack UI + TypeScript (Mobile App)
└── package.json → Root scripts
```

## Quick Start

### Install all dependencies
```bash
npm run install:all
```

### Run individual projects
```bash
npm run dev:admin    # Admin → http://localhost:3000
npm run dev:web      # Web   → http://localhost:3001
npm run dev:mobile   # Mobile → Expo DevTools
```

## Theme System

All three projects share the same theming approach (dashboard-ui base).

### Accent Colors
5 preset accent colors available:

| Theme    | Primary   | FG on Accent |
|----------|-----------|--------------|
| Green    | `#4ADE80` | `#0D0D0D`   |
| Blue     | `#0A81FF` | `#FFFFFF`   |
| Orange   | `#F97316` | `#FFFFFF`   |
| Pink     | `#FF385D` | `#FFFFFF`   |
| Gray     | `#8D8D91` | `#FFFFFF`   |

### Surface Colors

| Token      | Light     | Dark      |
|------------|-----------|-----------|
| background | `#E8E8EC` | `#0D0D0D` |
| foreground | `#1A1A1C` | `#FBFBFB` |
| card       | `#FFFFFF` | `#1C1C1E` |
| border     | `#C7C7CC` | `#2C2C2E` |
| secondary  | `#F0F0F2` | `#232325` |
| muted-fg   | `#6E6E73` | `#A3A3A3` |
| destructive| `#FF453A` | `#FF453A` |

### Light/Dark Mode
- **admin & web**: `next-themes` with class-based switching
- **mobile**: Built-in dark mode via ThemeContext + AsyncStorage

### ThemeContext API
Each project exposes a `ThemeContext` with:
- `mode`: `'light' | 'dark'`
- `color`: `'green' | 'blue' | 'orange' | 'pink' | 'gray'`
- `toggleMode()`: Switch between light and dark
- `setColor(color)`: Set the active accent color

## Environment Variables

Copy `.env.example` to `.env.local` in each project:
```bash
cp admin/.env.example admin/.env.local
cp web/.env.example web/.env.local
cp mobile/.env.example mobile/.env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

## Tech Stack

| Project | Framework | UI Library | Dark Mode |
|---------|-----------|------------|-----------|
| admin   | Next.js 15 | PrimeReact + Tailwind CSS | next-themes |
| web     | Next.js 15 | PrimeReact + Tailwind CSS | next-themes |
| mobile  | Expo SDK 54 | Gluestack UI | ThemeContext + AsyncStorage |
