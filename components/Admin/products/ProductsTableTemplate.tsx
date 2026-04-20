"use client";

import React, { useMemo, useState, useCallback, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import type { SortingState } from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

import CardBox from "@/components/Admin/shared/CardBox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Product = {
  id: string;
  title: string;
  slug: string;
  status: string;
  type: string;
  stockQty: number | null;
  image: string;
  priceFormatted: string;
  createdAt: string;
  href: string;
};

type StatsCard = {
  title: string;
  status: string;
  icon: string;
  iconColor: string;
  cardColor: string;
};

interface Props {
  data: Product[];
  statsCards: StatsCard[];
  onStatusChange?: (
    productId: string,
    status: string
  ) => Promise<void | { success: boolean }>;
}

const columnHelper = createColumnHelper<Product>();

const statusColorMap: Record<
  string,
  "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
> = {
  PUBLISHED: "secondary",
  DRAFT: "outline",
  ARCHIVED: "destructive",
};

const miniCardBgMap: Record<string, string> = {
  lightinfo: "bg-cyan-50 dark:bg-cyan-950/30",
  lightwarning: "bg-yellow-50 dark:bg-yellow-950/30",
  lightsuccess: "bg-green-50 dark:bg-green-950/30",
  lightprimary: "bg-blue-50 dark:bg-blue-950/30",
  lightsecondary: "bg-violet-50 dark:bg-violet-950/30",
  lighterror: "bg-red-50 dark:bg-red-950/30",
};

const miniIconTextMap: Record<string, string> = {
  info: "text-cyan-600",
  warning: "text-yellow-600",
  success: "text-green-600",
  primary: "text-blue-600",
  secondary: "text-violet-600",
  error: "text-red-600",
};

export default function ProductsTableTemplate({
  data,
  statsCards,
  onStatusChange,
}: Props) {
  const [productData, setProductData] = useState(data);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [editingStatusRowId, setEditingStatusRowId] = useState<string | null>(null);
  const [pendingStatus, setPendingStatus] = useState("");
  const [statusError, setStatusError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    title: true,
    type: true,
    priceFormatted: true,
    stockQty: true,
    status: true,
  });

  const [filters, setFilters] = useState({
    title: "",
    type: "",
    status: "",
    stockQty: "",
  });

  const handleFilterChange = useCallback(
    (key: keyof typeof filters, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const filteredProducts = useMemo(() => {
    return productData.filter((item) => {
      const titleMatch =
        filters.title === "" ||
        item.title.toLowerCase().includes(filters.title.toLowerCase()) ||
        item.slug.toLowerCase().includes(filters.title.toLowerCase());

      const typeMatch =
        filters.type === "" ||
        item.type.toLowerCase() === filters.type.toLowerCase();

      const statusMatch =
        filters.status === "" ||
        item.status.toLowerCase() === filters.status.toLowerCase();

      const stockMatch =
        filters.stockQty === "" ||
        String(item.stockQty ?? "").includes(filters.stockQty);

      const searchMatch =
        globalFilter === "" ||
        item.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
        item.slug.toLowerCase().includes(globalFilter.toLowerCase()) ||
        item.type.toLowerCase().includes(globalFilter.toLowerCase());

      return (
        titleMatch &&
        typeMatch &&
        statusMatch &&
        stockMatch &&
        searchMatch
      );
    });
  }, [productData, filters, globalFilter]);

  const allColumns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            aria-label="Select all rows"
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(checked) =>
              table.toggleAllPageRowsSelected(checked === true)
            }
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            onCheckedChange={(checked) => row.toggleSelected(checked === true)}
          />
        ),
      }),

      columnHelper.accessor("title", {
        header: "Product",
        cell: ({ row }) => (
          <div className="flex items-center gap-3 min-w-[260px]">
            <div className="relative h-12 w-12 overflow-hidden rounded-lg border bg-muted shrink-0">
              <Image
                src={row.original.image || "/images/products/s1.jpg"}
                alt={row.original.title}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>

            <div className="min-w-0">
              <p className="font-medium line-clamp-1">{row.original.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {row.original.slug}
              </p>
            </div>
          </div>
        ),
      }),

      columnHelper.accessor("type", {
        header: "Type",
        cell: ({ row }) => <span>{row.original.type}</span>,
      }),

      columnHelper.accessor("priceFormatted", {
        header: "Price",
        cell: ({ row }) => <span>{row.original.priceFormatted}</span>,
      }),

      columnHelper.accessor("stockQty", {
        header: "Stock",
        cell: ({ row }) => <span>{row.original.stockQty ?? "∞"}</span>,
      }),

      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => {
          const isEditing = editingStatusRowId === row.original.id;

          if (isEditing) {
            return (
              <div className="flex items-center gap-2 min-w-[210px]">
                <Select
                  value={pendingStatus || row.original.status}
                  onValueChange={setPendingStatus}
                  disabled={isPending}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>

                <button
                  type="button"
                  className="p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-900 disabled:opacity-50"
                  disabled={isPending}
                  onClick={() => {
                    const nextStatus = pendingStatus || row.original.status;

                    startTransition(async () => {
                      try {
                        setStatusError(null);

                        setProductData((prev) =>
                          prev.map((item) =>
                            item.id === row.original.id
                              ? { ...item, status: nextStatus }
                              : item
                          )
                        );

                        if (onStatusChange) {
                          await onStatusChange(row.original.id, nextStatus);
                        }

                        setEditingStatusRowId(null);
                        setPendingStatus("");
                      } catch {
                        setStatusError("Unable to update product status.");
                      }
                    });
                  }}
                >
                  <Icon icon="solar:check-read-linear" width={18} height={18} />
                </button>

                <button
                  type="button"
                  className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 disabled:opacity-50"
                  disabled={isPending}
                  onClick={() => {
                    setEditingStatusRowId(null);
                    setPendingStatus("");
                    setStatusError(null);
                  }}
                >
                  <Icon icon="solar:close-circle-linear" width={18} height={18} />
                </button>
              </div>
            );
          }

          return (
            <Badge variant={statusColorMap[row.original.status] ?? "outline"}>
              {row.original.status}
            </Badge>
          );
        },
      }),

      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="btn-circle-hover cursor-pointer p-0 h-7 w-7"
                  aria-label="menu"
                  type="button"
                >
                  <Icon
                    icon="solar:menu-dots-bold"
                    width={18}
                    height={18}
                    className="text-ld"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" sideOffset={4} className="min-w-[150px]">
                <DropdownMenuItem asChild>
                  <Link href={row.original.href} className="flex items-center">
                    <Icon
                      icon="solar:eye-linear"
                      width={20}
                      height={20}
                      className="me-2"
                    />
                    View details
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onSelect={() => {
                    setEditingStatusRowId(row.original.id);
                    setPendingStatus(row.original.status);
                    setStatusError(null);
                  }}
                  className="flex items-center"
                >
                  <Icon
                    icon="solar:pen-2-linear"
                    width={20}
                    height={20}
                    className="me-2"
                  />
                  Change status
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      }),
    ],
    [editingStatusRowId, pendingStatus, isPending, onStatusChange]
  );

  const visibleColumns = useMemo(
    () =>
      allColumns.filter((col) => {
        if (col.id === "select") return true;
        if ("accessorKey" in col && typeof col.accessorKey === "string") {
          return columnVisibility[col.accessorKey];
        }
        if (col.id === "actions") return true;
        return true;
      }),
    [allColumns, columnVisibility]
  );

  const table = useReactTable({
    data: filteredProducts,
    columns: visibleColumns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const visibleExportKeys = useMemo(
    () =>
      visibleColumns
        .filter(
          (col) =>
            (col as any).accessorKey &&
            col.id !== "select" &&
            col.id !== "actions"
        )
        .map((col) => (col as any).accessorKey as keyof Product),
    [visibleColumns]
  );

  const exportHeaders = useMemo(
    () =>
      visibleColumns
        .filter(
          (col) =>
            (col as any).accessorKey &&
            col.id !== "select" &&
            col.id !== "actions"
        )
        .map((col) =>
          typeof (col as any).header === "string"
            ? (col as any).header
            : (col as any).accessorKey
        ),
    [visibleColumns]
  );

  const handleExportCSV = useCallback(() => {
    const rows = filteredProducts.map((row) =>
      visibleExportKeys.map((key) => row[key] ?? "")
    );

    const csvContent = [
      exportHeaders.join(","),
      ...rows.map((r) =>
        r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredProducts, visibleExportKeys, exportHeaders]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
        Products History
      </h3>

      <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-3">
        {statsCards.map((card) => (
          <div key={card.status}>
            <div
              className={`rounded-xl p-4 border ${
                miniCardBgMap[card.cardColor] ?? "bg-muted"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-lg font-bold">{card.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {card.status}
                  </p>
                </div>

                <div className="h-10 w-10 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center">
                  <Icon
                    icon={card.icon}
                    height={20}
                    className={miniIconTextMap[card.iconColor] ?? "text-primary"}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CardBox className="mt-5 p-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between my-1">
          <h3 className="text-lg font-semibold text-dark dark:text-white mb-4 md:mb-0">
            Products Table
          </h3>

          <div className="flex flex-wrap items-center gap-1 md:gap-2">
            {!showSearch ? (
              <button
                onClick={() => setShowSearch(true)}
                aria-label="Show search"
                className="p-2 rounded-full hover:bg-lightprimary dark:hover:bg-darkprimary border border-transparent focus:outline-none transition hover:cursor-pointer"
                type="button"
              >
                <Icon
                  icon="solar:minimalistic-magnifer-line-duotone"
                  width={18}
                  height={18}
                />
              </button>
            ) : (
              <Input
                placeholder="Search..."
                className="form-control! w-40 md:w-56"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                onBlur={() => {
                  if (!globalFilter) setShowSearch(false);
                }}
                aria-label="Search products"
              />
            )}

            <button
              onClick={() => setShowFilters((prev) => !prev)}
              aria-label="Toggle filters"
              className="p-2 rounded-full border border-transparent focus:outline-none transition hover:cursor-pointer hover:bg-lightprimary dark:hover:bg-darkprimary"
              type="button"
            >
              {showFilters ? (
                <Icon
                  icon="solar:close-circle-outline"
                  width={18}
                  height={18}
                />
              ) : (
                <Icon icon="solar:filter-line-duotone" width={18} height={18} />
              )}
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="btn-circle-hover cursor-pointer p-0 h-9 w-9 hover:text-link dark:hover:text-darklink"
                  aria-label="Settings"
                  type="button"
                >
                  <Icon
                    icon="solar:settings-line-duotone"
                    width={18}
                    height={18}
                    aria-hidden="true"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" sideOffset={4} className="min-w-[150px]">
                {Object.keys(columnVisibility).map((col) => (
                  <DropdownMenuItem
                    key={col}
                    className="flex items-center cursor-pointer select-none"
                    onSelect={(event) => {
                      event.preventDefault();
                      setColumnVisibility((prev) => ({
                        ...prev,
                        [col]: !prev[col],
                      }));
                    }}
                  >
                    <Checkbox
                      checked={columnVisibility[col]}
                      onCheckedChange={() => {
                        setColumnVisibility((prev) => ({
                          ...prev,
                          [col]: !prev[col],
                        }));
                      }}
                      className="mr-2"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <span className="capitalize">{col}</span>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuItem disabled className="flex items-center select-none">
                  <Checkbox checked disabled className="mr-2" />
                  <span className="capitalize text-gray-400">actions</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1 p-2 rounded-full hover:bg-lightprimary dark:hover:bg-darkprimary border border-transparent focus:border-primary focus:outline-none transition hover:cursor-pointer"
              aria-label="Download CSV"
              type="button"
            >
              <Icon
                icon="solar:download-minimalistic-line-duotone"
                width={18}
                height={18}
              />
            </button>
          </div>
        </div>

        {showFilters ? (
          <div className="mb-4 p-4 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3">
            <div className="flex-1">
              <Input
                placeholder="Product or slug"
                value={filters.title}
                onChange={(e) => handleFilterChange("title", e.target.value)}
                className="w-full !form-control"
              />
            </div>

            <div className="flex-1">
              <Input
                placeholder="Type"
                value={filters.type}
                onChange={(e) => handleFilterChange("type", e.target.value)}
                className="w-full !form-control"
              />
            </div>

            <div className="flex-1">
              <Select
                value={filters.status || "ALL"}
                onValueChange={(value) =>
                  handleFilterChange("status", value === "ALL" ? "" : value)
                }
              >
                <SelectTrigger
                  className="w-full select-md-transparent"
                  aria-label="Filter by status"
                >
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Input
                placeholder="Stock"
                value={filters.stockQty}
                onChange={(e) => handleFilterChange("stockQty", e.target.value)}
                type="number"
                className="w-full !form-control"
              />
            </div>
          </div>
        ) : null}

        {statusError ? (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {statusError}
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <div className="border rounded-md border-ld overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-2 border-b border-ld text-left"
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              className={
                                header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : ""
                              }
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              <div className="flex items-center gap-1 text-ld">
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                {header.column.getCanSort() && (
                                  <Icon icon="solar:transfer-vertical-line-duotone" />
                                )}
                              </div>
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table.getRowModel().rows.length === 0 ? (
                    <tr>
                      <td
                        colSpan={visibleColumns.length}
                        className="text-center py-4"
                      >
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="border-b last:border-b-0 border-ld">
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className={`px-4 py-2 ${
                              cell.column.id === "title" ? "min-w-[260px]" : ""
                            }`}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {table.getPageCount() > 0 ? (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-3">
            <div className="flex items-center gap-2">
              <p className="text-sm text-ld">Show</p>

              <Select
                value={String(table.getState().pagination.pageSize)}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger
                  className="w-fit"
                  aria-label="Select number of rows per page"
                >
                  <SelectValue placeholder="Rows per page" />
                </SelectTrigger>

                <SelectContent>
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={String(pageSize)}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <p className="text-sm text-ld">per page</p>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm font-normal text-ld">
                  {table.getRowModel().rows.length > 0
                    ? `${
                        table.getState().pagination.pageIndex *
                          table.getState().pagination.pageSize +
                        1
                      }-${Math.min(
                        (table.getState().pagination.pageIndex + 1) *
                          table.getState().pagination.pageSize,
                        table.getFilteredRowModel().rows.length
                      )} of ${table.getFilteredRowModel().rows.length}`
                    : `0 of 0`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Icon
                  icon="solar:arrow-left-line-duotone"
                  className={`text-dark dark:text-white hover:text-primary cursor-pointer ${
                    table.getState().pagination.pageIndex === 0
                      ? "opacity-50 !cursor-not-allowed"
                      : ""
                  }`}
                  width={20}
                  height={20}
                  onClick={() => table.previousPage()}
                />

                <span className="w-8 h-8 bg-lightprimary text-primary flex items-center justify-center rounded-md dark:bg-darkprimary dark:text-white text-sm font-normal">
                  {table.getState().pagination.pageIndex + 1}
                </span>

                <Icon
                  icon="solar:arrow-right-line-duotone"
                  className={`text-dark dark:text-white hover:text-primary cursor-pointer ${
                    table.getState().pagination.pageIndex + 1 ===
                    table.getPageCount()
                      ? "opacity-50 !cursor-not-allowed"
                      : ""
                  }`}
                  width={20}
                  height={20}
                  onClick={() =>
                    table.getState().pagination.pageIndex + 1 <
                      table.getPageCount() && table.nextPage()
                  }
                />
              </div>
            </div>
          </div>
        ) : null}
      </CardBox>
    </div>
  );
}