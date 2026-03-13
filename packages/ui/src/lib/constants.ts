// Paylaşılan uygulama sabitleri
import {
  Image,
  LayoutGrid,
  CreditCard,
  BarChart3,
  Quote,
  HelpCircle,
  Mail,
  Code,
  GalleryHorizontal,
  Play,
  Type,
  PanelBottom,
  PanelTop,
  MousePointer,
  Users,
  Cookie,
  MessageCircle,
  ChevronRight,
  Megaphone,
  Heart,
  Layers,
  Activity,
  TrendingUp,
  FolderOpen,
  Newspaper,
  ArrowLeftRight,
  Video,
  Star,
  Inbox,
  Instagram,
  Globe,
  Compass,
  Eye,
  MapPin,
  BookOpen,
  Landmark,
  Shield,
  Grid3X3,
  FileText,
  Phone,
  Building,
  CircleHelp,
  HandHeart,
  Award,
  UserPlus,
  Wallet,
  Clock,
  Camera,
  type LucideIcon,
} from 'lucide-react';

export const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  suspended: 'bg-red-100 text-red-800',
  trial: 'bg-yellow-100 text-yellow-800',
  cancelled: 'bg-gray-100 text-gray-800',
  draft: 'bg-slate-100 text-slate-800',
  paused: 'bg-orange-100 text-orange-800',
  completed: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-purple-100 text-purple-800',
};

export const CAMPAIGN_TYPE_LABELS: Record<string, string> = {
  adetli: 'Adetli',
  hedefli: 'Hedefli',
  sabit: 'Sabit Tutarlı',
  serbest: 'Serbest Tutarlı',
  yenilenen_sabit: 'Yenilenen Sabit',
  yenilenen_serbest: 'Yenilenen Serbest',
  varyantli: 'Varyantlı',
};

export const ROLE_LABELS: Record<string, string> = {
  super_admin: 'Süper Yönetici',
  org_admin: 'Dernek Yöneticisi',
  org_editor: 'Editör',
  donor: 'Bağışçı',
};

export const ROLE_COLORS: Record<string, string> = {
  super_admin: 'bg-purple-100 text-purple-800',
  org_admin: 'bg-blue-100 text-blue-800',
  org_editor: 'bg-orange-100 text-orange-800',
  donor: 'bg-green-100 text-green-800',
};

export const DONATION_STATUS_LABELS: Record<string, string> = {
  pending: 'Bekliyor',
  completed: 'Tamamlandı',
  failed: 'Başarısız',
  refunded: 'İade Edildi',
};

export const DONATION_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  credit_card: 'Kredi Kartı',
  bank_transfer: 'Havale/EFT',
  other: 'Diğer',
};

export const ORGANIZATION_STATUS_LABELS: Record<string, string> = {
  active: 'Aktif',
  suspended: 'Askıya Alındı',
  trial: 'Deneme',
  cancelled: 'İptal',
};

export const SUBSCRIPTION_PLAN_LABELS: Record<string, string> = {
  free: 'Ücretsiz',
  basic: 'Temel',
  standard: 'Standart',
  premium: 'Premium',
  enterprise: 'Kurumsal',
};

export const TOKEN_TYPE_LABELS: Record<string, string> = {
  color: 'Renkler',
  font: 'Fontlar',
  spacing: 'Boşluklar',
  border_radius: 'Kenar Yuvarlaklığı',
  shadow: 'Gölgeler',
};

export const TOKEN_TYPES = ['color', 'font', 'spacing', 'border_radius', 'shadow'] as const;

export const PACKAGE_FEATURES = [
  { key: 'max_campaigns', label: 'Maksimum Kampanya' },
  { key: 'has_theme_change', label: 'Tema Değiştirme' },
  { key: 'has_dark_mode', label: 'Karanlık Mod' },
  { key: 'has_campaign_video', label: 'Kampanya Video' },
  { key: 'has_cashbox_module', label: 'Kasa Modülü' },
  { key: 'has_accounting_module', label: 'Muhasebe Modülü' },
] as const;

export const PAGE_TYPE_LABELS: Record<string, string> = {
  home: 'Ana Sayfa',
  about: 'Hakkımızda',
  activities: 'Faaliyet Alanları',
  activity_detail: 'Faaliyet Detay',
  projects: 'Projeler',
  project_detail: 'Proje Detay',
  donate: 'Bağış',
  news: 'Haberler',
  news_detail: 'Haber Detay',
  gallery: 'Galeri',
  contact: 'İletişim',
  faq: 'SSS',
  volunteer: 'Gönüllü',
  accounts: 'Hesap Numaraları',
  custom: 'Özel Sayfa',
  // Eski tipler (geriye uyumluluk)
  campaigns: 'Kampanyalar (eski)',
  campaign_detail: 'Kampanya Detay (eski)',
};

export const PAGE_TYPE_COLORS: Record<string, string> = {
  home: 'bg-blue-100 text-blue-800',
  about: 'bg-purple-100 text-purple-800',
  activities: 'bg-teal-100 text-teal-800',
  activity_detail: 'bg-teal-50 text-teal-700',
  projects: 'bg-indigo-100 text-indigo-800',
  project_detail: 'bg-indigo-50 text-indigo-700',
  donate: 'bg-pink-100 text-pink-800',
  news: 'bg-amber-100 text-amber-800',
  news_detail: 'bg-amber-50 text-amber-700',
  gallery: 'bg-cyan-100 text-cyan-800',
  contact: 'bg-orange-100 text-orange-800',
  faq: 'bg-yellow-100 text-yellow-800',
  volunteer: 'bg-lime-100 text-lime-800',
  accounts: 'bg-emerald-100 text-emerald-800',
  custom: 'bg-gray-100 text-gray-800',
  campaigns: 'bg-green-100 text-green-800',
  campaign_detail: 'bg-emerald-100 text-emerald-800',
};

export const BLOCK_TYPE_LABELS: Record<string, string> = {
  // ── Global Layout ──
  'header': 'Header',
  'footer': 'Footer',
  'cookie-banner': 'Çerez Bildirimi',
  'floating-donate': 'Floating Bağış Butonu',
  'whatsapp-support': 'WhatsApp Destek',
  'breadcrumb': 'Breadcrumb',
  'page-hero': 'Sayfa Hero',

  // ── Ana Sayfa ──
  'hero': 'Ana Sayfa Hero',
  'campaign-banner': 'Kampanya Banner',
  'quick-donate': 'Hızlı Bağış',
  'donate-categories': 'Bağış Kategorileri',
  'faaliyet-alanlari': 'Faaliyet Alanları',
  'istatistik': 'İstatistikler',
  'aktif-projeler': 'Aktif Projeler',
  'bagis-cta': 'Bağış CTA',
  'haberler': 'Haberler',
  'before-after-slider': 'Önce/Sonra Slider',
  'vertical-video-blog': 'Dikey Video Blog',
  'vertical-gallery': 'Dikey Galeri',
  'testimonials': 'Referanslar',
  'partners': 'Partnerler',
  'newsletter': 'Bülten Aboneliği',
  'instagram-feed': 'Instagram Feed',

  // ── Hakkımızda ──
  'about-hero': 'Hakkımızda Hero',
  'mission-vision': 'Misyon & Vizyon',
  'timeline': 'Tarihçe',
  'board': 'Yönetim Kurulu',
  'values': 'Değerlerimiz',
  'activity-map': 'Faaliyet Haritası',

  // ── Faaliyetler ──
  'activity-hero': 'Faaliyet Hero',
  'activity-category-cards': 'Faaliyet Kategori Kartları',
  'activity-detail-content': 'Faaliyet Detay İçerik',

  // ── Projeler ──
  'projects-hero': 'Projeler Hero',
  'project-card-grid': 'Proje Kart Grid',
  'project-detail-layout': 'Proje Detay Layout',
  'project-progress-bar': 'Proje İlerleme Barı',
  'related-projects': 'İlgili Projeler',

  // ── Bağış ──
  'bagis-hero': 'Bağış Hero',
  'bagis-kategori': 'Bağış Kategori',
  'bagis-form': 'Bağış Formu',
  'bagis-sepet': 'Bağış Sepeti',
  'guven-gosterge': 'Güven Göstergesi',

  // ── Haberler ──
  'haberler-hero': 'Haberler Hero',
  'haber-kartlar': 'Haber Kartları',
  'haber-detay': 'Haber Detay',
  'ilgili-haberler': 'İlgili Haberler',

  // ── Galeri ──
  'galeri-hero': 'Galeri Hero',
  'foto-grid': 'Fotoğraf Grid',
  'video-galeri': 'Video Galeri',

  // ── İletişim ──
  'contact-hero': 'İletişim Hero',
  'contact-info-cards': 'İletişim Bilgi Kartları',
  'contact-form': 'İletişim Formu',
  'map': 'Harita',
  'branches': 'Şubeler',

  // ── SSS ──
  'sss-hero': 'SSS Hero',
  'faq-accordion': 'SSS Accordion',

  // ── Gönüllü ──
  'gonullu-hero': 'Gönüllü Hero',
  'volunteer-benefits': 'Gönüllü Avantajları',
  'volunteer-form': 'Gönüllü Formu',

  // ── Hesap Numaraları ──
  'account-hero': 'Hesap Hero',
  'bank-account-cards': 'Banka Hesap Kartları',

  // ── Eski tipler (geriye uyumluluk) ──
  'campaign_list': 'Kampanya Listesi (eski)',
  'donation_form': 'Bağış Formu (eski)',
  'stats': 'İstatistikler (eski)',
  'testimonial': 'Referanslar (eski)',
  'cta': 'CTA (eski)',
  'custom_html': 'Özel HTML (eski)',
  'faq': 'SSS (eski)',
  'team': 'Ekip (eski)',
  'contact': 'İletişim (eski)',
  'gallery': 'Galeri (eski)',
  'video': 'Video (eski)',
  'text': 'Metin (eski)',
};

export const BLOCK_TYPE_ICONS: Record<string, LucideIcon> = {
  'header': PanelTop,
  'footer': PanelBottom,
  'cookie-banner': Cookie,
  'floating-donate': Heart,
  'whatsapp-support': MessageCircle,
  'breadcrumb': ChevronRight,
  'page-hero': Image,
  'hero': Image,
  'campaign-banner': Megaphone,
  'quick-donate': CreditCard,
  'donate-categories': Layers,
  'faaliyet-alanlari': Activity,
  'istatistik': BarChart3,
  'aktif-projeler': FolderOpen,
  'bagis-cta': MousePointer,
  'haberler': Newspaper,
  'before-after-slider': ArrowLeftRight,
  'vertical-video-blog': Video,
  'vertical-gallery': GalleryHorizontal,
  'testimonials': Quote,
  'partners': Star,
  'newsletter': Inbox,
  'instagram-feed': Instagram,
  'about-hero': Globe,
  'mission-vision': Compass,
  'timeline': Clock,
  'board': Users,
  'values': Eye,
  'activity-map': MapPin,
  'activity-hero': Activity,
  'activity-category-cards': Grid3X3,
  'activity-detail-content': FileText,
  'projects-hero': FolderOpen,
  'project-card-grid': LayoutGrid,
  'project-detail-layout': BookOpen,
  'project-progress-bar': TrendingUp,
  'related-projects': Layers,
  'bagis-hero': Heart,
  'bagis-kategori': Layers,
  'bagis-form': CreditCard,
  'bagis-sepet': Wallet,
  'guven-gosterge': Shield,
  'haberler-hero': Newspaper,
  'haber-kartlar': LayoutGrid,
  'haber-detay': FileText,
  'ilgili-haberler': Newspaper,
  'galeri-hero': Camera,
  'foto-grid': Grid3X3,
  'video-galeri': Play,
  'contact-hero': Phone,
  'contact-info-cards': Mail,
  'contact-form': Mail,
  'map': MapPin,
  'branches': Building,
  'sss-hero': HelpCircle,
  'faq-accordion': CircleHelp,
  'gonullu-hero': HandHeart,
  'volunteer-benefits': Award,
  'volunteer-form': UserPlus,
  'account-hero': Landmark,
  'bank-account-cards': Wallet,
  // Eski tipler (geriye uyumluluk)
  'campaign_list': LayoutGrid,
  'donation_form': CreditCard,
  'stats': BarChart3,
  'testimonial': Quote,
  'cta': MousePointer,
  'custom_html': Code,
  'faq': HelpCircle,
  'team': Users,
  'contact': Mail,
  'gallery': GalleryHorizontal,
  'video': Play,
  'text': Type,
};

export const ACTION_LABELS: Record<string, string> = {
  'organization.created': 'Dernek Oluşturuldu',
  'organization.updated': 'Dernek Güncellendi',
  'organization.deleted': 'Dernek Silindi',
  'campaign.created': 'Kampanya Oluşturuldu',
  'campaign.updated': 'Kampanya Güncellendi',
  'campaign.deleted': 'Kampanya Silindi',
  'donation.completed': 'Bağış Tamamlandı',
  'donation.failed': 'Bağış Başarısız',
  'donation.refunded': 'Bağış İade Edildi',
  'profile.updated': 'Profil Güncellendi',
  'package.created': 'Paket Oluşturuldu',
  'package.updated': 'Paket Güncellendi',
  'theme.created': 'Tema Oluşturuldu',
  'theme.updated': 'Tema Güncellendi',
};

export const ENTITY_TYPE_LABELS: Record<string, string> = {
  organization: 'Dernek',
  campaign: 'Kampanya',
  donation: 'Bağış',
  profile: 'Kullanıcı',
  package: 'Paket',
  theme: 'Tema',
  block: 'Blok',
  page_template: 'Sayfa Şablonu',
};

export const ACTION_COLORS: Record<string, string> = {
  created: 'bg-green-100 text-green-800',
  updated: 'bg-blue-100 text-blue-800',
  deleted: 'bg-red-100 text-red-800',
  completed: 'bg-purple-100 text-purple-800',
};

export const BLOCK_DEFAULT_CONFIGS: Record<string, object> = {
  // ── Global Layout ──
  'header': { show_logo: true, show_nav: true, sticky: true },
  'footer': { show_social: true, show_newsletter: false },
  'cookie-banner': { text: 'Bu site çerez kullanmaktadır.', accept_text: 'Kabul Et' },
  'floating-donate': { text: 'Bağış Yap', link: '/bagis' },
  'whatsapp-support': { phone: '', message: 'Merhaba, yardım almak istiyorum.' },
  'breadcrumb': {},
  'page-hero': { title: '', subtitle: '' },

  // ── Ana Sayfa ──
  'hero': { title: '', subtitle: '', bgImage: '', cta_text: 'Bağış Yap', cta_link: '/kampanyalar' },
  'campaign-banner': { campaign_id: null },
  'quick-donate': { preset_amounts: [25, 50, 100, 250], allow_custom: true },
  'donate-categories': { columns: 4 },
  'faaliyet-alanlari': { columns: 3 },
  'istatistik': { items: [] },
  'aktif-projeler': { limit: 6, columns: 3 },
  'bagis-cta': { title: '', subtitle: '', button_text: 'Bağış Yap' },
  'haberler': { limit: 4, columns: 2 },
  'before-after-slider': {},
  'vertical-video-blog': { limit: 4 },
  'vertical-gallery': { limit: 6 },
  'testimonials': { items: [], autoplay: true, interval: 5000 },
  'partners': { items: [] },
  'newsletter': { title: 'Bültenimize Abone Olun' },
  'instagram-feed': { username: '', limit: 6 },

  // ── Hakkımızda ──
  'about-hero': { title: 'Hakkımızda' },
  'mission-vision': { mission: '', vision: '' },
  'timeline': { items: [] },
  'board': { members: [] },
  'values': { items: [] },
  'activity-map': {},

  // ── Faaliyetler ──
  'activity-hero': { title: 'Faaliyet Alanları' },
  'activity-category-cards': { columns: 3 },
  'activity-detail-content': {},

  // ── Projeler ──
  'projects-hero': { title: 'Projelerimiz' },
  'project-card-grid': { columns: 3 },
  'project-detail-layout': {},
  'project-progress-bar': {},
  'related-projects': { limit: 3 },

  // ── Bağış ──
  'bagis-hero': { title: 'Bağış Yap' },
  'bagis-kategori': {},
  'bagis-form': { preset_amounts: [25, 50, 100, 250] },
  'bagis-sepet': {},
  'guven-gosterge': {},

  // ── Haberler ──
  'haberler-hero': { title: 'Haberler' },
  'haber-kartlar': { columns: 3 },
  'haber-detay': {},
  'ilgili-haberler': { limit: 3 },

  // ── Galeri ──
  'galeri-hero': { title: 'Galeri' },
  'foto-grid': { columns: 3, lightbox: true },
  'video-galeri': { columns: 2 },

  // ── İletişim ──
  'contact-hero': { title: 'İletişim' },
  'contact-info-cards': {},
  'contact-form': { show_map: false },
  'map': {},
  'branches': {},

  // ── SSS ──
  'sss-hero': { title: 'Sıkça Sorulan Sorular' },
  'faq-accordion': { items: [] },

  // ── Gönüllü ──
  'gonullu-hero': { title: 'Gönüllü Ol' },
  'volunteer-benefits': { items: [] },
  'volunteer-form': {},

  // ── Hesap Numaraları ──
  'account-hero': { title: 'Hesap Numaraları' },
  'bank-account-cards': {},

  // ── Eski tipler (geriye uyumluluk) ──
  'campaign_list': { columns: 3, limit: 6, show_progress: true, show_category_filter: false },
  'donation_form': { preset_amounts: [25, 50, 100, 250], allow_custom: true, show_recurring: false },
  'stats': { items: [{ label: 'Toplam Bağış', value: '0', icon: 'heart' }] },
  'testimonial': { items: [], autoplay: true, interval: 5000 },
  'faq': { items: [{ question: '', answer: '' }] },
  'team': { columns: 4, show_social: true },
  'contact': { show_map: true, show_form: true },
  'custom_html': { html: '' },
  'gallery': { columns: 3, lightbox: true },
  'video': { url: '', autoplay: false, poster: '' },
  'text': { content: '', alignment: 'left' },
  'cta': { title: '', subtitle: '', button_text: '', button_link: '', bg_color: '' },
};
