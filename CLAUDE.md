# UI Core Monorepo — Claude Code Kuralları

## Proje Yapısı

```
ui-core/
├── packages/
│   ├── tokens/    → @ui-core/tokens  (paylaşılan tema tokenları)
│   └── ui/        → @ui-core/ui      (Radix UI + Tailwind component kütüphanesi)
├── admin/         → Next.js 15 (port 1500) — Yönetim paneli
├── web/           → Next.js 15 (port 1501) — Pazarlama sitesi
└── mobile/        → Expo + Gluestack UI
```

- **Monorepo tooling:** npm workspaces + Turborepo
- **Styling:** Tailwind CSS 4, CSS-first (@theme inline)
- **Tema:** 5 accent renk (green/blue/orange/pink/gray), light/dark mode
- **Font:** Lexend

## Paket Bağımlılıkları

- `admin` ve `web` → `@ui-core/ui` + `@ui-core/tokens`
- `mobile` → `@ui-core/tokens` (sadece renk/token paylaşımı)
- `@ui-core/ui` → `@ui-core/tokens`

## Component Ekleme Kuralı

Her yeni component eklendiğinde aşağıdaki adımlar ZORUNLUDUR:

### packages/ui için:
1. Component dosyasını `packages/ui/src/components/` altına ekle (ui/, shared/, layout/)
2. `packages/ui/src/index.ts` barrel export'a ekle

### Admin / Web preview için:
1. `src/app/preview/[component-adi]/page.tsx` dosyasını oluştur
2. `src/app/preview/page.tsx` ana listeye component'i ekle

### Mobile için:
1. Component dosyasını `mobile/components/` altına ekle
2. `mobile/app/preview/[component-adi]/index.tsx` dosyasını oluştur
3. `mobile/app/preview/index.tsx` ana listeye component'i ekle

### Her preview sayfası şunları göstermeli:
- Boyutlar: Small / Medium / Large (varsa)
- Stiller: Primary / Secondary / Outlined / Ghost (varsa)
- Durumlar: Default / Disabled / Loading
- Tema: Light / Dark (yan yana)
- Renkler: Yeşil / Mavi / Turuncu / Pembe / Gri (hepsi aynı anda)

### Preview sayfası başlığı:
- Component adı
- Toplam kaç varyant olduğu
- Her grup ayrı section içinde, section başlığı olsun

## Komutlar

```bash
npm run dev:admin    # Admin dev server (port 1500)
npm run dev:web      # Web dev server (port 1501)
npm run dev:mobile   # Expo dev server (port 1502)
npm run build        # Tüm projeleri build et
```

## Genel Kurallar
- TypeScript strict mod
- Tüm componentler fonksiyonel
- Props interface'leri tanımla
- Preview klasörleri production build'e dahil edilmez
- `workspace:*` protokolü ile paket referansları
- Renk/token değişiklikleri `packages/tokens` içinde yapılır — tüm platformlara yayılır
