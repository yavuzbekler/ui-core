// TanStack Table + Shadcn UI DataTable bileşeni
'use client';

import { useState, useEffect, useMemo, useRef, Fragment, type ReactNode } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  type ColumnFiltersState,
  type ExpandedState,
  type Row,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Badge, type BadgeProps } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, ArrowUp, ArrowDown, Filter, X, Plus, CircleCheck, CircleX, Equal } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface DataTableFilterOption {
  value: string;
  label: string;
}

export interface SelectFilterValue {
  mode: 'include' | 'exclude';
  values: string[];
}

export interface NumberFilterValue {
  mode: 'eq' | 'lt' | 'gt';
  value: number;
}

export interface DataTableFilterTab {
  value: string;
  label: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  pageSizeOptions?: number[];
  onRowClick?: (row: TData) => void;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: TData[]) => void;
  emptyMessage?: string;
  defaultSorting?: SortingState;
  filterTabs?: DataTableFilterTab[];
  filterKey?: string;
  allLabel?: string;
  toolbarActions?: ReactNode;
  onAddNew?: () => void;
  addNewLabel?: string;
  renderSubRow?: (row: TData) => ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchable = true,
  searchPlaceholder = 'Ara...',
  pageSize = 10,
  pageSizeOptions = [10, 25, 50],
  onRowClick,
  selectable = false,
  onSelectionChange,
  emptyMessage = 'Kayıt bulunamadı.',
  defaultSorting = [],
  filterTabs,
  filterKey,
  allLabel = 'Hepsi',
  toolbarActions,
  onAddNew,
  addNewLabel = 'Yeni Ekle',
  renderSubRow,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  // Compute counts per filter value (memoized)
  const filterCounts = useMemo(() => {
    if (!filterTabs || !filterKey) return {};
    const counts: Record<string, number> = {};
    for (const item of data) {
      const val = (item as Record<string, unknown>)[filterKey] as string;
      if (val) counts[val] = (counts[val] || 0) + 1;
    }
    return counts;
  }, [data, filterTabs, filterKey]);

  // Filter data (memoized to prevent infinite re-render loop)
  const filteredData = useMemo(
    () => activeFilter && filterKey
      ? data.filter((item) => (item as Record<string, unknown>)[filterKey] === activeFilter)
      : data,
    [data, activeFilter, filterKey]
  );

  // Auto-hide columns with meta.hidden
  const initialColumnVisibility: VisibilityState = {};
  columns.forEach((col) => {
    const id = (col as any).accessorKey ?? (col as any).id;
    if (id && (col as any).meta?.hidden) {
      initialColumnVisibility[id] = false;
    }
  });

  // Selection checkbox column
  const selectionColumn: ColumnDef<TData, TValue> = {
    id: 'select',
    size: 40,
    enableSorting: false,
    header: ({ table: t }) => (
      <Checkbox
        checked={t.getIsAllPageRowsSelected() || (t.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => t.toggleAllPageRowsSelected(!!value)}
        aria-label="Tümünü seç"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
        aria-label="Satır seç"
      />
    ),
  };

  const allColumns = selectable ? [selectionColumn, ...columns] : columns;

  const table = useReactTable({
    data: filteredData,
    columns: allColumns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      columnFilters,
      expanded,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: renderSubRow ? getExpandedRowModel() : undefined,
    initialState: {
      pagination: {
        pageSize,
      },
      columnVisibility: initialColumnVisibility,
    },
  });

  const prevSelectionRef = useRef<string>('');
  useEffect(() => {
    if (selectable && onSelectionChange) {
      const key = JSON.stringify(rowSelection);
      if (key !== prevSelectionRef.current) {
        prevSelectionRef.current = key;
        const selectedRows = table.getFilteredSelectedRowModel().rows.map((row) => row.original);
        onSelectionChange(selectedRows);
      }
    }
  }, [rowSelection, selectable, onSelectionChange]);

  // Active column filters info for badges
  const activeColumnFilters = columnFilters.filter(
    (f) => {
      const v = f.value;
      if (!v) return false;
      // SelectFilterValue
      if (typeof v === 'object' && 'mode' in (v as any) && 'values' in (v as any)) {
        return ((v as SelectFilterValue).values.length > 0);
      }
      // NumberFilterValue
      if (typeof v === 'object' && 'mode' in (v as any) && 'value' in (v as any)) {
        return ((v as NumberFilterValue).value !== undefined);
      }
      // Legacy array format
      if (Array.isArray(v)) return v.length > 0;
      return false;
    }
  );

  return (
    <Card>
      <CardContent className="p-0">
        {filterTabs && filterTabs.length > 0 && (
          <div className="border-b px-4 py-2.5 overflow-x-auto">
            <div className="flex items-center gap-2.5">
              {/* "All" tab */}
              <button
                type="button"
                onClick={() => { setActiveFilter(null); setRowSelection({}); }}
                className="shrink-0 focus:outline-none"
              >
                <Badge
                  variant="default"
                  className={cn(
                    'cursor-pointer text-xs transition-all',
                    activeFilter === null
                      ? 'ring-2 ring-offset-1 ring-offset-background ring-primary'
                      : 'opacity-50 hover:opacity-80'
                  )}
                >
                  {allLabel}
                </Badge>
              </button>
              {filterTabs.map((tab) => {
                const count = filterCounts[tab.value] || 0;
                const isActive = activeFilter === tab.value;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => { setActiveFilter(isActive ? null : tab.value); setRowSelection({}); }}
                    className="relative shrink-0 focus:outline-none"
                  >
                    <Badge
                      variant={tab.variant ?? 'outline'}
                      className={cn(
                        'cursor-pointer text-xs transition-all',
                        tab.className,
                        isActive
                          ? 'ring-2 ring-offset-1 ring-offset-background ring-primary'
                          : 'opacity-50 hover:opacity-80'
                      )}
                    >
                      {tab.label}
                    </Badge>
                    {count > 0 && (
                      <span className="absolute -top-2 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-0.5 text-[9px] font-bold leading-none text-background">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {(searchable || toolbarActions || onAddNew) && (
          <div className="border-b p-4">
            <div className="flex items-center gap-3">
              {searchable && (
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="pl-9"
                  />
                </div>
              )}
              {/* Bulk actions / toolbar actions */}
              {toolbarActions}
              {/* Active column filter badges */}
              {activeColumnFilters.map((f) => {
                const col = columns.find((c) => (c as any).accessorKey === f.id || (c as any).id === f.id);
                const colName = typeof col?.header === 'string' ? col.header : f.id;
                const v = f.value as any;

                let badgeText = '';
                let ModeIcon: typeof CircleCheck | null = null;

                if (v && typeof v === 'object' && 'mode' in v && 'values' in v) {
                  // SelectFilterValue
                  const sfv = v as SelectFilterValue;
                  const filterOpts = (col as any)?.meta?.filterOptions as DataTableFilterOption[] | undefined;
                  const labels = sfv.values.map((val: string) => filterOpts?.find((o) => o.value === val)?.label ?? val);
                  ModeIcon = sfv.mode === 'include' ? CircleCheck : CircleX;
                  badgeText = labels.join(', ');
                } else if (v && typeof v === 'object' && 'mode' in v && 'value' in v) {
                  // NumberFilterValue
                  const nfv = v as NumberFilterValue;
                  const modeSymbol = nfv.mode === 'eq' ? '=' : nfv.mode === 'lt' ? '<' : '>';
                  badgeText = `${modeSymbol} ${nfv.value.toLocaleString('tr-TR')}`;
                } else if (Array.isArray(v)) {
                  const filterOpts = (col as any)?.meta?.filterOptions as DataTableFilterOption[] | undefined;
                  badgeText = v.map((val: string) => filterOpts?.find((o) => o.value === val)?.label ?? val).join(', ');
                }

                return (
                  <div key={f.id} className="flex items-center gap-1 rounded-md border bg-muted/50 px-2 py-1 text-xs">
                    {ModeIcon && <ModeIcon className="h-3 w-3 text-muted-foreground" />}
                    <span className="font-medium">{colName}:</span>
                    <span>{badgeText}</span>
                    <button
                      type="button"
                      onClick={() => setColumnFilters((prev) => prev.filter((cf) => cf.id !== f.id))}
                      className="ml-1 rounded-sm hover:bg-muted"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
              {/* Spacer */}
              <div className="flex-1" />
              {onAddNew && (
                <Button size="sm" onClick={onAddNew}>
                  <Plus className="mr-1.5 h-4 w-4" />
                  {addNewLabel}
                </Button>
              )}
            </div>
          </div>
        )}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50 hover:bg-muted/50">
                {headerGroup.headers.map((header) => {
                  const meta = (header.column.columnDef as any).meta;
                  const filterOptions = meta?.filterOptions as DataTableFilterOption[] | undefined;
                  const filterType = meta?.filterType as 'number' | undefined;
                  const hasSelectFilter = filterOptions && filterOptions.length > 0;
                  const hasNumberFilter = filterType === 'number';

                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.column.columnDef.size ? `${header.column.columnDef.size}px` : undefined }}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-1">
                          {header.column.getCanSort() ? (
                            <button
                              className="flex items-center gap-1 hover:text-foreground -ml-1 px-1 py-0.5 rounded transition-colors"
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: <ArrowUp className="h-3.5 w-3.5" />,
                                desc: <ArrowDown className="h-3.5 w-3.5" />,
                              }[header.column.getIsSorted() as string] ?? <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />}
                            </button>
                          ) : (
                            flexRender(header.column.columnDef.header, header.getContext())
                          )}
                          {hasSelectFilter && (
                            <SelectFilterPopover
                              options={filterOptions}
                              filterValue={header.column.getFilterValue() as SelectFilterValue | undefined}
                              onChange={(val) => header.column.setFilterValue(val)}
                            />
                          )}
                          {hasNumberFilter && (
                            <NumberFilterPopover
                              filterValue={header.column.getFilterValue() as NumberFilterValue | undefined}
                              onChange={(val) => header.column.setFilterValue(val)}
                            />
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <Fragment key={row.id}>
                  <TableRow
                    className={`${onRowClick ? 'cursor-pointer' : ''} ${index % 2 === 1 ? 'bg-muted/25' : ''}`}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {renderSubRow && row.getIsExpanded() && (
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableCell colSpan={allColumns.length} className="p-4">
                        {renderSubRow(row.original)}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={allColumns.length} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {filteredData.length > pageSizeOptions[0] && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {selectable && Object.keys(rowSelection).length > 0 && (
                <span className="font-medium text-foreground">
                  {Object.keys(rowSelection).length} seçili
                </span>
              )}
              {selectable && Object.keys(rowSelection).length > 0 && <span>|</span>}
              <span>Sayfa başına</span>
              <Select
                value={String(table.getState().pagination.pageSize)}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span>
                | {table.getFilteredRowModel().rows.length} kayıttan{' '}
                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}{' '}
                gösteriliyor
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="mx-2 text-sm text-muted-foreground">
                {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Select column filter popover (include / exclude mode)
function SelectFilterPopover({
  options,
  filterValue,
  onChange,
}: {
  options: DataTableFilterOption[];
  filterValue: SelectFilterValue | undefined;
  onChange: (val: SelectFilterValue | undefined) => void;
}) {
  const mode = filterValue?.mode ?? 'include';
  const selectedValues = filterValue?.values ?? [];
  const hasActiveFilter = selectedValues.length > 0;

  const setMode = (m: 'include' | 'exclude') => {
    if (selectedValues.length > 0) {
      onChange({ mode: m, values: selectedValues });
    } else {
      onChange(undefined);
    }
  };

  const toggle = (value: string) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    if (next.length === 0) {
      onChange(undefined);
    } else {
      onChange({ mode, values: next });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'rounded p-0.5 transition-colors hover:bg-muted',
            hasActiveFilter && 'text-primary'
          )}
        >
          <Filter className={cn('h-3.5 w-3.5', hasActiveFilter ? 'opacity-100' : 'opacity-40')} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0" align="start">
        {/* Mode selector */}
        <div className="flex gap-1 p-2 border-b">
          <button
            type="button"
            onClick={() => setMode('include')}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors',
              mode === 'include'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <CircleCheck className="h-3.5 w-3.5" />
            Sadece seçilenler
          </button>
          <button
            type="button"
            onClick={() => setMode('exclude')}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors',
              mode === 'exclude'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <CircleX className="h-3.5 w-3.5" />
            Seçilenler hariç
          </button>
        </div>
        {/* Options */}
        <div className="p-2 space-y-1">
          {options.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-muted"
            >
              <Checkbox
                checked={selectedValues.includes(opt.value)}
                onCheckedChange={() => toggle(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
        {hasActiveFilter && (
          <div className="border-t p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => onChange(undefined)}
            >
              Filtreyi Temizle
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

// Number column filter popover (eq / lt / gt mode)
function NumberFilterPopover({
  filterValue,
  onChange,
}: {
  filterValue: NumberFilterValue | undefined;
  onChange: (val: NumberFilterValue | undefined) => void;
}) {
  const mode = filterValue?.mode ?? 'eq';
  const value = filterValue?.value ?? '';
  const hasActiveFilter = filterValue !== undefined;

  const setMode = (m: 'eq' | 'lt' | 'gt') => {
    if (value !== '' && value !== undefined) {
      onChange({ mode: m, value: Number(value) });
    }
  };

  const setValue = (v: string) => {
    const num = v === '' ? undefined : Number(v);
    if (num === undefined || isNaN(num)) {
      onChange(undefined);
    } else {
      onChange({ mode, value: num });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'rounded p-0.5 transition-colors hover:bg-muted',
            hasActiveFilter && 'text-primary'
          )}
        >
          <Filter className={cn('h-3.5 w-3.5', hasActiveFilter ? 'opacity-100' : 'opacity-40')} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-0" align="start">
        {/* Mode selector */}
        <div className="flex gap-1 p-2 border-b">
          <button
            type="button"
            onClick={() => setMode('eq')}
            className={cn(
              'flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors',
              mode === 'eq'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
            title="Eşit"
          >
            <Equal className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setMode('lt')}
            className={cn(
              'flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors',
              mode === 'lt'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
            title="Küçük"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setMode('gt')}
            className={cn(
              'flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors',
              mode === 'gt'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
            title="Büyük"
          >
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
        {/* Value input */}
        <div className="p-2">
          <Input
            type="number"
            placeholder="Tutar girin..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-8 text-sm"
          />
        </div>
        {hasActiveFilter && (
          <div className="border-t p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => onChange(undefined)}
            >
              Filtreyi Temizle
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
