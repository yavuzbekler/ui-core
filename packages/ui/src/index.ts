// @dashboard-ui/core — Barrel Export

// Types
export type { StkUIConfig, SidebarMenuItem, SidebarMenuChild, UserNavItem, UserProfile } from './types';

// Providers
export { StkUIProvider, useStkUI } from './providers/stk-ui-provider';
export { ThemeProvider, useAccentColor, useBackgroundTheme, useStylePreset } from './components/providers/theme-provider';
export { ToastProvider } from './components/providers/toast-provider';

// Layout
export { DashboardShell } from './components/layout/dashboard-shell';
export { Sidebar, MobileSidebar } from './components/layout/sidebar';
export { Header } from './components/layout/header';
export { Breadcrumb } from './components/layout/breadcrumb';
export { UserNav } from './components/layout/user-nav';

// Shared components
export { DataTable } from './components/shared/data-table';
export { SlideOverSheet } from './components/shared/slide-over-sheet';
export { DetailPanel } from './components/shared/detail-panel';
export { FullScreenPanel } from './components/shared/full-screen-panel';
export { ConfirmDialog } from './components/shared/confirm-dialog';
export { PageHeader } from './components/shared/page-header';
export { EmptyState } from './components/shared/empty-state';
export { StatsCard } from './components/shared/stats-card';
export { StatusBadge } from './components/shared/status-badge';
export { ThemeToggle } from './components/shared/theme-toggle';
export { AccentColorPicker } from './components/shared/accent-color-picker';
export { BackgroundThemePicker } from './components/shared/background-theme-picker';
export { StylePicker } from './components/shared/style-picker';
export { LoadingSpinner } from './components/shared/loading-spinner';
export { Logo } from './components/shared/logo';
export { Combobox } from './components/shared/combobox';
export type { ComboboxOption } from './components/shared/combobox';
export { MultiSelect } from './components/shared/multi-select';
export type { MultiSelectOption } from './components/shared/multi-select';
export { DatePicker } from './components/shared/date-picker';

// UI primitives
export { Button, buttonVariants } from './components/ui/button';
export { Input } from './components/ui/input';
export { Textarea } from './components/ui/textarea';
export { Label } from './components/ui/label';
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './components/ui/card';
export { Badge, badgeVariants } from './components/ui/badge';
export { Chip, chipVariants } from './components/ui/chip';
export { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar';
export { Checkbox } from './components/ui/checkbox';
export { Switch } from './components/ui/switch';
export { Separator } from './components/ui/separator';
export { Skeleton } from './components/ui/skeleton';
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './components/ui/tooltip';
export { Popover, PopoverTrigger, PopoverContent } from './components/ui/popover';
export { Calendar } from './components/ui/calendar';
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectItem } from './components/ui/select';
export { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from './components/ui/command';
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
export { Progress } from './components/ui/progress';
export { Slider } from './components/ui/slider';
export { Alert, AlertTitle, AlertDescription } from './components/ui/alert';
export { Toggle, toggleVariants } from './components/ui/toggle';
export { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
export { Dialog, DialogPortal, DialogOverlay, DialogClose, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from './components/ui/dialog';
export { AlertDialog, AlertDialogPortal, AlertDialogOverlay, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from './components/ui/alert-dialog';
export { Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetClose, SheetContent } from './components/ui/sheet';
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from './components/ui/table';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuRadioGroup } from './components/ui/dropdown-menu';

// Lib
export { cn, formatCurrency, formatDate, formatDateTime, formatRelativeDate, generateSlug, truncate, getInitials } from './lib/utils';
export { ACCENT_COLORS, ACCENT_COLOR_NAMES, DEFAULT_ACCENT } from './lib/accentColors';
export type { AccentColorName, AccentColorPair } from './lib/accentColors';
export { BACKGROUND_THEMES, BACKGROUND_THEME_NAMES, DEFAULT_BACKGROUND_THEME } from './lib/backgroundThemes';
export type { BackgroundThemeName, BackgroundThemePalette, BackgroundTheme } from './lib/backgroundThemes';
export { STYLE_PRESETS, STYLE_PRESET_NAMES, DEFAULT_STYLE_PRESET } from './lib/stylePresets';
export type { StylePresetName, StylePreset } from './lib/stylePresets';

// Constants
export {
  STATUS_COLORS,
  CAMPAIGN_TYPE_LABELS,
  ROLE_LABELS,
  ROLE_COLORS,
  DONATION_STATUS_LABELS,
  DONATION_STATUS_COLORS,
  PAYMENT_METHOD_LABELS,
  ORGANIZATION_STATUS_LABELS,
  SUBSCRIPTION_PLAN_LABELS,
  TOKEN_TYPE_LABELS,
  TOKEN_TYPES,
  PACKAGE_FEATURES,
  PAGE_TYPE_LABELS,
  PAGE_TYPE_COLORS,
  BLOCK_TYPE_LABELS,
  BLOCK_TYPE_ICONS,
  ACTION_LABELS,
  ENTITY_TYPE_LABELS,
  ACTION_COLORS,
  BLOCK_DEFAULT_CONFIGS,
} from './lib/constants';

// Neobrutalism components
export {
  NeoButton, neoButtonVariants,
  NeoAlert, neoAlertVariants,
  NeoBadge, NeoBadgeStatus, NeoBadgeDismiss, neoBadgeVariants,
  NeoCard, NeoCardWindowHeader, NeoCardContent, neoCardVariants,
  NeoAccordion, NeoAccordionItem, neoAccordionVariants,
  NeoCheckbox, NeoCheckboxGroup,
  NeoInput, NeoSearchInput,
  NeoProgress, neoProgressBarVariants,
  NeoSelect,
  NeoTabs, neoTabsVariants,
  NeoTextarea, neoTextareaVariants,
} from './components/neobrutalism';
export type {
  NeoButtonProps,
  NeoAlertProps,
  NeoBadgeProps, NeoBadgeStatusProps, NeoBadgeDismissProps,
  NeoCardProps,
  NeoAccordionProps, NeoAccordionItemProps,
  NeoCheckboxProps, NeoCheckboxGroupProps,
  NeoInputProps, NeoSearchInputProps,
  NeoProgressProps,
  NeoSelectProps, NeoSelectOption, NeoSelectOptionGroup,
  NeoTabsProps, NeoTabItem,
  NeoTextareaProps,
} from './components/neobrutalism';

// Hooks
export { useDebounce } from './hooks/use-debounce';
export { usePagination } from './hooks/use-pagination';
