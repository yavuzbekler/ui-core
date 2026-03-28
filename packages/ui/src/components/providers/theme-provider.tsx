// Theme provider: next-themes + Accent color + Background theme system
'use client';

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ACCENT_COLORS, ACCENT_COLOR_NAMES, DEFAULT_ACCENT, type AccentColorName } from '../../lib/accentColors';
import {
  BACKGROUND_THEMES,
  BACKGROUND_THEME_NAMES,
  DEFAULT_BACKGROUND_THEME,
  type BackgroundThemeName,
} from '../../lib/backgroundThemes';
import {
  STYLE_PRESETS,
  STYLE_PRESET_NAMES,
  DEFAULT_STYLE_PRESET,
  type StylePresetName,
} from '../../lib/stylePresets';

// ── Accent Color Context ──

type AccentContextValue = {
  accentColor: AccentColorName;
  setAccentColor: (c: AccentColorName) => void;
};

const AccentContext = createContext<AccentContextValue>({
  accentColor: DEFAULT_ACCENT,
  setAccentColor: () => {},
});

export function useAccentColor() {
  return useContext(AccentContext);
}

// ── Background Theme Context ──

type BackgroundThemeContextValue = {
  backgroundTheme: BackgroundThemeName;
  setBackgroundTheme: (t: BackgroundThemeName) => void;
};

const BackgroundThemeContext = createContext<BackgroundThemeContextValue>({
  backgroundTheme: DEFAULT_BACKGROUND_THEME,
  setBackgroundTheme: () => {},
});

export function useBackgroundTheme() {
  return useContext(BackgroundThemeContext);
}

// ── Style Preset Context ──

type StylePresetContextValue = {
  stylePreset: StylePresetName;
  setStylePreset: (s: StylePresetName) => void;
};

const StylePresetContext = createContext<StylePresetContextValue>({
  stylePreset: DEFAULT_STYLE_PRESET,
  setStylePreset: () => {},
});

export function useStylePreset() {
  return useContext(StylePresetContext);
}

// ── Menu Layout Context ──

export type MenuLayoutName = 'sidebar' | 'topbar';
const MENU_LAYOUT_NAMES: MenuLayoutName[] = ['sidebar', 'topbar'];
const DEFAULT_MENU_LAYOUT: MenuLayoutName = 'sidebar';

type MenuLayoutContextValue = {
  menuLayout: MenuLayoutName;
  setMenuLayout: (l: MenuLayoutName) => void;
};

const MenuLayoutContext = createContext<MenuLayoutContextValue>({
  menuLayout: DEFAULT_MENU_LAYOUT,
  setMenuLayout: () => {},
});

export function useMenuLayout() {
  return useContext(MenuLayoutContext);
}

// ── CSS variable keys that background theme controls ──

const BG_CSS_VARS: Array<{ cssVar: string; paletteKey: keyof typeof BACKGROUND_THEMES.gray.dark }> = [
  { cssVar: '--background', paletteKey: 'background' },
  { cssVar: '--card', paletteKey: 'card' },
  { cssVar: '--popover', paletteKey: 'card' },
  { cssVar: '--secondary', paletteKey: 'secondary' },
  { cssVar: '--muted', paletteKey: 'card' },
  { cssVar: '--muted-foreground', paletteKey: 'mutedForeground' },
  { cssVar: '--accent', paletteKey: 'secondary' },
  { cssVar: '--border', paletteKey: 'border' },
  { cssVar: '--input', paletteKey: 'border' },
  { cssVar: '--sidebar', paletteKey: 'background' },
  { cssVar: '--sidebar-border', paletteKey: 'border' },
  { cssVar: '--sidebar-accent', paletteKey: 'card' },
  { cssVar: '--sidebar-muted', paletteKey: 'mutedForeground' },
];

// ── Theme Applier ──

function ThemeApplier({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useNextTheme();
  const [accentColor, setAccentState] = useState<AccentColorName>(DEFAULT_ACCENT);
  const [backgroundTheme, setBgThemeState] = useState<BackgroundThemeName>(DEFAULT_BACKGROUND_THEME);
  const [stylePreset, setStyleState] = useState<StylePresetName>(DEFAULT_STYLE_PRESET);
  const [menuLayout, setMenuLayoutState] = useState<MenuLayoutName>(DEFAULT_MENU_LAYOUT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedAccent = localStorage.getItem('stk-accent-color');
    if (savedAccent && ACCENT_COLOR_NAMES.includes(savedAccent as AccentColorName)) {
      setAccentState(savedAccent as AccentColorName);
    }
    const savedBg = localStorage.getItem('stk-background-theme');
    if (savedBg && BACKGROUND_THEME_NAMES.includes(savedBg as BackgroundThemeName)) {
      setBgThemeState(savedBg as BackgroundThemeName);
    }
    const savedStyle = localStorage.getItem('stk-style-preset');
    if (savedStyle && STYLE_PRESET_NAMES.includes(savedStyle as StylePresetName)) {
      setStyleState(savedStyle as StylePresetName);
    }
    const savedLayout = localStorage.getItem('stk-menu-layout');
    if (savedLayout && MENU_LAYOUT_NAMES.includes(savedLayout as MenuLayoutName)) {
      setMenuLayoutState(savedLayout as MenuLayoutName);
    }
    setMounted(true);
  }, []);

  const setAccentColor = useCallback((c: AccentColorName) => {
    setAccentState(c);
    localStorage.setItem('stk-accent-color', c);
  }, []);

  const setBackgroundTheme = useCallback((t: BackgroundThemeName) => {
    setBgThemeState(t);
    localStorage.setItem('stk-background-theme', t);
  }, []);

  const setStylePreset = useCallback((s: StylePresetName) => {
    setStyleState(s);
    localStorage.setItem('stk-style-preset', s);
  }, []);

  const setMenuLayout = useCallback((l: MenuLayoutName) => {
    setMenuLayoutState(l);
    localStorage.setItem('stk-menu-layout', l);
  }, []);

  // Apply accent color CSS variables
  useEffect(() => {
    if (!mounted) return;
    const isDark = resolvedTheme === 'dark';
    const pair = ACCENT_COLORS[accentColor];
    const primary = isDark ? pair.dark : pair.light;
    const primaryFg = isDark ? pair.fgOnAccentDark : pair.fgOnAccentLight;

    const root = document.documentElement;
    root.style.setProperty('--primary', primary);
    root.style.setProperty('--primary-foreground', primaryFg);
    root.style.setProperty('--ring', primary);
    root.style.setProperty('--sidebar-primary', primary);
    root.style.setProperty('--sidebar-primary-foreground', primaryFg);
    root.style.setProperty('--sidebar-ring', primary);
  }, [accentColor, resolvedTheme, mounted]);

  // Apply background theme CSS variables
  useEffect(() => {
    if (!mounted) return;
    const isDark = resolvedTheme === 'dark';
    const palette = isDark
      ? BACKGROUND_THEMES[backgroundTheme].dark
      : BACKGROUND_THEMES[backgroundTheme].light;

    const currentPreset = STYLE_PRESETS[stylePreset];
    const hasBorderOverride = !!(currentPreset.borderColorLight || currentPreset.borderColorDark);

    const root = document.documentElement;
    for (const { cssVar, paletteKey } of BG_CSS_VARS) {
      // Skip border vars if style preset overrides them
      if (hasBorderOverride && (cssVar === '--border' || cssVar === '--input' || cssVar === '--sidebar-border')) {
        continue;
      }
      root.style.setProperty(cssVar, palette[paletteKey]);
    }
  }, [backgroundTheme, resolvedTheme, stylePreset, mounted]);

  // Apply style preset CSS variables
  useEffect(() => {
    if (!mounted) return;
    const isDark = resolvedTheme === 'dark';
    const preset = STYLE_PRESETS[stylePreset];
    const root = document.documentElement;
    root.style.setProperty('--radius', preset.radius);
    root.style.setProperty('--border-w', preset.borderWidth);
    root.setAttribute('data-style', stylePreset);

    // Mode-aware shadow
    const shadow = isDark && preset.shadowDark ? preset.shadowDark
      : !isDark && preset.shadowLight ? preset.shadowLight
      : preset.shadow;
    root.style.setProperty('--shadow-card', shadow);

    // Mode-aware badge shadow
    const shadowBadge = isDark && preset.shadowBadgeDark ? preset.shadowBadgeDark
      : !isDark && preset.shadowBadgeLight ? preset.shadowBadgeLight
      : preset.shadowBadge;
    root.style.setProperty('--shadow-badge', shadowBadge);

    // Mode-aware border color override (neobrutalism etc.)
    if (preset.borderColorLight || preset.borderColorDark) {
      const borderColor = isDark ? preset.borderColorDark! : preset.borderColorLight!;
      root.style.setProperty('--border', borderColor);
      root.style.setProperty('--input', borderColor);
      root.style.setProperty('--sidebar-border', borderColor);
    }
  }, [stylePreset, resolvedTheme, mounted]);

  return (
    <AccentContext.Provider value={{ accentColor, setAccentColor }}>
      <BackgroundThemeContext.Provider value={{ backgroundTheme, setBackgroundTheme }}>
        <StylePresetContext.Provider value={{ stylePreset, setStylePreset }}>
          <MenuLayoutContext.Provider value={{ menuLayout, setMenuLayout }}>
            {children}
          </MenuLayoutContext.Provider>
        </StylePresetContext.Provider>
      </BackgroundThemeContext.Provider>
    </AccentContext.Provider>
  );
}

// Blocking script to prevent FOUC: sets accent + background theme + style CSS variables before React hydrates
const THEME_INIT_SCRIPT = `(function(){try{var c=${JSON.stringify(ACCENT_COLORS)};var a=localStorage.getItem('stk-accent-color');if(a&&c[a]){var d=document.documentElement.classList.contains('dark');var p=d?c[a].dark:c[a].light;var f=d?c[a].fgOnAccentDark:c[a].fgOnAccentLight;var s=document.documentElement.style;s.setProperty('--primary',p);s.setProperty('--primary-foreground',f);s.setProperty('--ring',p);s.setProperty('--sidebar-primary',p);s.setProperty('--sidebar-primary-foreground',f);s.setProperty('--sidebar-ring',p)}var b=${JSON.stringify(BACKGROUND_THEMES)};var t=localStorage.getItem('stk-background-theme');if(t&&b[t]){var d2=document.documentElement.classList.contains('dark');var pl=d2?b[t].dark:b[t].light;var r=document.documentElement.style;r.setProperty('--background',pl.background);r.setProperty('--card',pl.card);r.setProperty('--popover',pl.card);r.setProperty('--secondary',pl.secondary);r.setProperty('--muted',pl.card);r.setProperty('--muted-foreground',pl.mutedForeground);r.setProperty('--accent',pl.secondary);r.setProperty('--border',pl.border);r.setProperty('--input',pl.border);r.setProperty('--sidebar',pl.background);r.setProperty('--sidebar-border',pl.border);r.setProperty('--sidebar-accent',pl.card);r.setProperty('--sidebar-muted',pl.mutedForeground)}var sp=${JSON.stringify(STYLE_PRESETS)};var sn=localStorage.getItem('stk-style-preset');if(sn&&sp[sn]){var st=sp[sn];var r2=document.documentElement.style;r2.setProperty('--radius',st.radius);r2.setProperty('--border-w',st.borderWidth);document.documentElement.setAttribute('data-style',sn);var dk=document.documentElement.classList.contains('dark');var sh=dk&&st.shadowDark?st.shadowDark:!dk&&st.shadowLight?st.shadowLight:st.shadow;r2.setProperty('--shadow-card',sh);var sb=dk&&st.shadowBadgeDark?st.shadowBadgeDark:!dk&&st.shadowBadgeLight?st.shadowBadgeLight:st.shadowBadge;r2.setProperty('--shadow-badge',sb);if(st.borderColorLight||st.borderColorDark){var bc=dk?st.borderColorDark:st.borderColorLight;r2.setProperty('--border',bc);r2.setProperty('--input',bc);r2.setProperty('--sidebar-border',bc)}}}catch(e){}})()`;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <ThemeApplier>{children}</ThemeApplier>
    </NextThemesProvider>
  );
}
