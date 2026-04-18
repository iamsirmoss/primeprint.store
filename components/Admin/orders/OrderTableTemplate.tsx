"use client";

import React, { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import type { SortingState } from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

import CardBox from "@/components/Admin/shared/CardBox";
import { Icon } from "@iconify/react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";

type TemplateOrder = {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  status: string;
  date: string;
  time: string;
  amount: number;
  amountFormatted: string;
  address: string;
  href: string;
  items: {
    id: string;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    totalFormatted: string;
    fulfillmentStatus: string;
    uploadedFiles: string[];
  }[];
};

type StatsCard = {
  title: string;
  status: string;
  icon: string;
  iconColor: string;
  cardColor: string;
};

interface OrderTableTemplateProps {
  data: TemplateOrder[];
  statsCards: StatsCard[];
}

const statusColorMap: Record<
  string,
  "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
> = {
  PENDING: "outline",
  PAID: "secondary",
  PROCESSING: "default",
  COMPLETED: "default",
  CANCELED: "destructive",
  REFUNDED: "destructive",
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

const columnHelper = createColumnHelper<TemplateOrder>();

export default function OrderTableTemplate({
  data,
  statsCards,
}: OrderTableTemplateProps) {
  const [orderData] = useState<TemplateOrder[]>(data);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [expanded, setExpanded] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({
    orderId: true,
    customerName: true,
    status: true,
    date: true,
    amount: true,
    address: true,
  });

  const [columnFilters, setColumnFilters] = useState({
    orderId: "",
    customerName: "",
    status: "",
    amount: "",
    address: "",
    date: "",
  });

  const handleFilterChange = useCallback(
    (key: keyof typeof columnFilters, value: string) => {
      setColumnFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const filteredOrderData = useMemo(() => {
    return orderData.filter((item) => {
      const idMatch = item.orderId
        .toLowerCase()
        .includes(columnFilters.orderId.toLowerCase());

      const customerMatch = item.customerName
        .toLowerCase()
        .includes(columnFilters.customerName.toLowerCase());

      const statusMatch =
        columnFilters.status === "" ||
        item.status.toLowerCase() === columnFilters.status.toLowerCase();

      const amountMatch =
        columnFilters.amount === "" ||
        item.amount.toString().includes(columnFilters.amount);

      const addressMatch = item.address
        .toLowerCase()
        .includes(columnFilters.address.toLowerCase());

      const dateMatch =
        columnFilters.date === "" ||
        item.date.toLowerCase().includes(columnFilters.date.toLowerCase());

      const searchMatch =
        globalFilter === "" ||
        item.orderId.toLowerCase().includes(globalFilter.toLowerCase()) ||
        item.customerName.toLowerCase().includes(globalFilter.toLowerCase()) ||
        item.customerEmail.toLowerCase().includes(globalFilter.toLowerCase());

      return (
        idMatch &&
        customerMatch &&
        statusMatch &&
        amountMatch &&
        addressMatch &&
        dateMatch &&
        searchMatch
      );
    });
  }, [orderData, columnFilters, globalFilter]);

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

      columnHelper.accessor("orderId", {
        header: "Order ID",
        cell: ({ row }) => (
          <p className="text-sm font-medium text-ld">{row.original.orderId}</p>
        ),
      }),

      columnHelper.accessor("customerName", {
        header: "Customer",
        cell: ({ row }) => (
          <div>
            <p className="text-sm font-medium text-ld">
              {row.original.customerName}
            </p>
            <p className="text-xs text-black/60 dark:text-white/60">
              {row.original.customerEmail || "No email"}
            </p>
          </div>
        ),
      }),

      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => (
          <Badge
            className="text-xs font-medium"
            variant={statusColorMap[row.original.status] ?? "outline"}
          >
            {row.original.status}
          </Badge>
        ),
      }),

      columnHelper.accessor("date", {
        header: "Date",
        cell: ({ row }) => (
          <div>
            <p className="text-sm text-ld font-normal">{row.original.date}</p>
            <p className="text-xs text-black/60 dark:text-white/60">
              {row.original.time}
            </p>
          </div>
        ),
      }),

      columnHelper.accessor("amount", {
        header: "Amount",
        cell: ({ row }) => (
          <p className="text-sm font-medium text-ld">
            {row.original.amountFormatted}
          </p>
        ),
      }),

      columnHelper.accessor("address", {
        header: "Address",
        cell: ({ row }) => (
          <p className="text-sm text-ld font-medium line-clamp-2">
            {row.original.address}
          </p>
        ),
      }),

      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.getCanExpand() && (
              <button
                onClick={row.getToggleExpandedHandler()}
                className="p-1 rounded-full hover:bg-lightprimary dark:hover:bg-darkprimary hover:cursor-pointer"
                aria-label={row.getIsExpanded() ? "Collapse row" : "Expand row"}
                type="button"
              >
                {row.getIsExpanded() ? (
                  <Icon
                    icon="solar:alt-arrow-up-linear"
                    width={20}
                    height={20}
                    className="text-ld"
                  />
                ) : (
                  <Icon
                    icon="solar:alt-arrow-down-linear"
                    width={20}
                    height={20}
                    className="text-ld"
                  />
                )}
              </button>
            )}

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
                    aria-hidden="true"
                    className="text-ld"
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={4}
                className="min-w-[150px]"
              >
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      }),
    ],
    []
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
    data: filteredOrderData,
    columns: visibleColumns,
    state: {
      sorting,
      expanded,
      rowSelection,
    },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowCanExpand: () => true,
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
        .map((col) => (col as any).accessorKey as keyof TemplateOrder),
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
    const rows = filteredOrderData.map((row) =>
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
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredOrderData, visibleExportKeys, exportHeaders]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
        Orders History
      </h3>

      <div className="grid lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-3">
        {statsCards.map((statusCard) => (
          <div key={statusCard.status}>
            <div
              className={`rounded-xl p-4 border ${
                miniCardBgMap[statusCard.cardColor] ?? "bg-muted"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-lg font-bold">{statusCard.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {statusCard.status}
                  </p>
                </div>

                <div className="h-10 w-10 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center">
                  <Icon
                    icon={statusCard.icon}
                    height={20}
                    className={
                      miniIconTextMap[statusCard.iconColor] ?? "text-primary"
                    }
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
            Orders Table
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
                aria-label="Search orders"
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
                <Icon
                  icon="solar:filter-line-duotone"
                  width={18}
                  height={18}
                />
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

              <DropdownMenuContent
                align="end"
                sideOffset={4}
                className="min-w-[150px]"
              >
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

                <DropdownMenuItem
                  disabled
                  className="flex items-center select-none"
                >
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
                placeholder="Order ID"
                value={columnFilters.orderId}
                onChange={(e) => handleFilterChange("orderId", e.target.value)}
                className="w-full form-control!"
              />
            </div>

            <div className="flex-1">
              <Input
                placeholder="Customer Name"
                value={columnFilters.customerName}
                onChange={(e) =>
                  handleFilterChange("customerName", e.target.value)
                }
                className="w-full form-control!"
              />
            </div>

            <div className="flex-1">
              <Select
                value={columnFilters.status || "ALL"}
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
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELED">Canceled</SelectItem>
                  <SelectItem value="REFUNDED">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <Input
                placeholder="Amount"
                value={columnFilters.amount}
                onChange={(e) => handleFilterChange("amount", e.target.value)}
                type="number"
                className="w-full form-control!"
              />
            </div>

            <div className="flex-1">
              <Input
                placeholder="Address"
                value={columnFilters.address}
                onChange={(e) => handleFilterChange("address", e.target.value)}
                className="w-full form-control!"
              />
            </div>

            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`justify-start text-left w-full border border-ld text-ld hover:bg-transparent hover:border-primary ${
                      !columnFilters.date
                        ? "text-muted-foreground hover:text-muted-foreground"
                        : "text-ld hover:text-ld"
                    }`}
                  >
                    {columnFilters.date
                      ? format(parseISO(columnFilters.date), "PPP")
                      : "Pick a date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      columnFilters.date
                        ? parseISO(columnFilters.date)
                        : undefined
                    }
                    onSelect={(date) => {
                      handleFilterChange(
                        "date",
                        date ? format(date, "yyyy-MM-dd") : ""
                      );
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
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
                        No orders found.
                      </td>
                    </tr>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <React.Fragment key={row.id}>
                        <tr className="border-b last:border-b-0 border-ld">
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className={`px-4 py-2 ${
                                cell.column.id === "customerName"
                                  ? "min-w-40"
                                  : ""
                              }`}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>

                        {row.getIsExpanded() ? (
                          <tr>
                            <td
                              colSpan={row.getVisibleCells().length}
                              className="bg-gray-100 dark:bg-dark px-4 py-4"
                            >
                              <h6 className="font-semibold mb-2">
                                Customer Order Details
                              </h6>

                              <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                  <thead className="bg-gray-200 dark:bg-white/10">
                                    <tr className="text-ld">
                                      <th className="text-left px-4 py-2">
                                        Name
                                      </th>
                                      <th className="text-left px-4 py-2">
                                        SKU
                                      </th>
                                      <th className="text-left px-4 py-2">
                                        Quantity
                                      </th>
                                      <th className="text-left px-4 py-2">
                                        Status
                                      </th>
                                      <th className="text-left px-4 py-2">
                                        Total
                                      </th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {row.original.items.length ? (
                                      row.original.items.map((item) => (
                                        <tr
                                          key={item.id}
                                          className="border-b border-ld text-ld"
                                        >
                                          <td className="px-4 py-2">
                                            {item.name}
                                          </td>
                                          <td className="px-4 py-2">
                                            {item.sku}
                                          </td>
                                          <td className="px-4 py-2">
                                            {item.quantity}
                                          </td>
                                          <td className="px-4 py-2">
                                            {item.fulfillmentStatus}
                                          </td>
                                          <td className="px-4 py-2">
                                            {item.totalFormatted}
                                          </td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td
                                          colSpan={5}
                                          className="px-4 py-2 text-center text-gray-500"
                                        >
                                          No items found.
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        ) : null}
                      </React.Fragment>
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
                  {[3, 10, 20, 30, 40, 50].map((pageSize) => (
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
                      ? "opacity-50 cursor-not-allowed!"
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
                      ? "opacity-50 cursor-not-allowed!"
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