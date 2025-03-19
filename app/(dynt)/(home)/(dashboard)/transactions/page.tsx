"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { DateRangePicker } from "@/components/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOrganization } from "@/context/OrganizationContext";
import { saveFile } from "@/utils/helper";
import { api, RouterOutputs } from "@/utils/trpc";
import { format } from "date-fns";
import endOfYear from "date-fns/endOfYear";
import startOfYear from "date-fns/startOfYear";
import { useAtom } from "jotai";
import { json2csv } from "json-2-csv";
import { Download, Filter, RefreshCcw, Search, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { filterAtom } from "./store/filters";
import { selectionAtom } from "./store/Selection";

export type TransactionHistory =
  RouterOutputs["transaction"]["list"]["data"][number];

export default function Transactions() {
  const { organizationId } = useOrganization();

  const [selection, setSelection] = useAtom(selectionAtom);
  const [filters, setFilters] = useAtom(filterAtom);
  const [search, setSearch] = useState("");
  const [allLoaded, setAllLoaded] = useState(false);

  const observerTarget = useRef(null);

  // api fetch data: transactions, categories, accounts
  const {
    data = { pages: [] },
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = api.transaction.list.useInfiniteQuery(
    { organizationId, filters },
    {
      getNextPageParam: (p) => p.nextCursor,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        // Check if the last page has fewer items than expected or no next cursor
        const lastPage = data.pages[data.pages.length - 1];
        if (!lastPage.nextCursor || lastPage.data.length === 0) {
          setAllLoaded(true);
        } else {
          setAllLoaded(false);
        }
      },
    }
  );

  const { data: accounts = [] } = api.account.list.useQuery(organizationId);

  const showAccountingOverview = true;
  const { data: overview } = api.transaction.accountingOverview.useQuery(
    organizationId,
    { enabled: showAccountingOverview }
  );

  const selectAll = api.transaction.selectAll.useMutation();
  // end api fetch

  const transactions = useMemo(() => data.pages.flatMap((p) => p.data), [data]);

  // Handle search filtering
  const filteredTransactions = useMemo(
    () =>
      transactions.filter((t) => {
        if (!search) return true;

        const searchLower = search.toLowerCase();
        const merchantMatch =
          t.merchant?.name?.toLowerCase().includes(searchLower) || false;
        const descriptionMatch =
          t.description?.toLowerCase().includes(searchLower) || false;
        const amountMatch = t.amount.toString().includes(search);

        return merchantMatch || descriptionMatch || amountMatch;
      }),
    [transactions, search]
  );

  // Setup intersection observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Only trigger fetch if:
        // 1. Element is intersecting
        // 2. There's more data to fetch
        // 3. We're not already fetching
        // 4. No search term is active (don't fetch more when filtering)
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage &&
          !search &&
          !allLoaded
        ) {
          fetchNextPage();
        }
      },
      { threshold: 0.4 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [allLoaded, fetchNextPage, hasNextPage, isFetchingNextPage, search]);

  // Reset all loaded state when search or filters change
  useEffect(() => {
    setAllLoaded(false);
  }, [search, filters]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const resetFilters = () => {
    setFilters({
      period: {
        startDate: startOfYear(new Date()),
        endDate: endOfYear(new Date()),
      },
      status: undefined,
      accountId: undefined,
    });
    setSearch("");
    setAllLoaded(false);
  };

  const handleExportCSV = () => {
    const exportData = filteredTransactions.map((tx) => ({
      Date: formatDate(tx.date),
      Account: tx.account?.bankName || "Unknown",
      IBAN: tx.account?.IBAN || "",
      Merchant: tx.merchant?.name || "Unknown",
      Description: tx.description || "",
      Status: tx.status,
      Amount: tx.amount,
      Currency: tx.currency,
      Category: tx.category?.name || "Uncategorized",
    }));

    if (exportData.length === 0) {
      toast.warning("No transactions to export");
      return;
    }

    const csvData = json2csv(exportData);
    const blob = new Blob([csvData], { type: "text/csv" });
    saveFile(blob, `Transactions_${format(new Date(), "yyyy-MM-dd")}.csv`);
    toast.success("Transactions exported successfully!");
  };

  console.log(
    filters,
    filters.status,
    transactions,
    accounts,
    overview,
    selectAll
  );

  const handleDateRangeChange = (dateRange) => {
    setFilters((prev) => ({
      ...prev,
      period: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      },
    }));
  };

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold">Transactions</h2>

        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full md:w-64 rounded-lg"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 rounded-lg">
                <Filter className="h-4 w-4" />
                Filters{" "}
                {Object.values(filters).some((v) => v) && (
                  <Badge variant="outline" className="ml-1">
                    Active
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-72 p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={filters.status == undefined ? "" : filters.status}
                  onValueChange={(val) =>
                    setFilters({
                      ...filters,
                      status: val == "all" ? undefined : val,
                    })
                  }
                  // this is kinda a hack as we cant set the selectItem value to empty string ""
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="Booked">Booked</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Account</label>
                <Select
                  value={
                    filters.accountId == undefined ? "" : filters.accountId
                  }
                  onValueChange={(val) =>
                    setFilters({
                      ...filters,
                      accountId: val === "all" ? undefined : val,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All accounts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All accounts</SelectItem>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.bankName} - {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={filters.category}
                  onValueChange={(val) =>
                    setFilters({ ...filters, category: val })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All categories</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}

              {/* <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Select onValueChange={handleDateRangeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="last7days">Last 7 days</SelectItem>
                    <SelectItem value="last30days">Last 30 days</SelectItem>
                    <SelectItem value="thisMonth">This month</SelectItem>
                    <SelectItem value="lastMonth">Last month</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}

              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <DateRangePicker filters={filters} setFilters={setFilters} />
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Reset
                </Button>
                <Button
                  size="sm"
                  onClick={() => toast.success("Filters applied")}
                >
                  Apply Filters
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Refresh Button */}
          <Button
            variant="outline"
            className="gap-2 rounded-lg"
            onClick={() => {
              refetch();
              toast.success("Transactions refreshed");
            }}
          >
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>

          {/* Export Button */}
          <Button
            variant="outline"
            className="gap-2 rounded-lg"
            onClick={handleExportCSV}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {isLoading && (
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-8 flex justify-center items-center min-h-[200px]">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              <p className="text-gray-500">Loading transactions...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {!isLoading && filteredTransactions.length === 0 && (
        <Card className="rounded-xl shadow-sm overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">No transactions found</h3>
              <p className="text-gray-500 max-w-sm">
                {search || Object.values(filters).some((v) => v)
                  ? "Try adjusting your search or filters to find what you're looking for."
                  : "You don't have any transactions yet. They will appear here once processed."}
              </p>
              {(search || Object.values(filters).some((v) => v)) && (
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {!isLoading && filteredTransactions.length > 0 && (
        <Card className="rounded-xl shadow-sm overflow-hidden pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="">
                <TableRow className="bg-gray-50 dark:bg-gray-800">
                  <TableHead className="p-4 font-medium">Date</TableHead>
                  <TableHead className="p-4 font-medium">Account</TableHead>
                  <TableHead className="p-4 font-medium">To/From</TableHead>
                  <TableHead className="p-4 font-medium">Status</TableHead>
                  <TableHead className="p-4 font-medium text-right">
                    Amount
                  </TableHead>
                  <TableHead className="p-4 font-medium">Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx) => (
                  <TableRow
                    key={tx.id}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <TableCell className="p-4">
                      <div className="font-medium">{formatDate(tx.date)}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(tx.dateTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center gap-3">
                        {tx.account?.bankLogo && (
                          <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-100 overflow-hidden">
                            <Image
                              src={tx.account.bankLogo}
                              alt="Bank Logo"
                              width={24}
                              height={24}
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-medium">
                            {tx.account?.name || "Unknown Bank"}
                          </div>
                          <div className="text-xs text-gray-500 truncate max-w-[120px]">
                            {tx.account?.IBAN || tx.account?.BBAN}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="font-medium">
                        {tx.merchant?.name || "Unknown Merchant"}
                      </div>
                      {tx.description && (
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">
                          {tx.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="p-4">
                      <Badge
                        className={`px-2 py-1 ${
                          tx.status === "Booked"
                            ? "bg-green-100 text-green-800"
                            : tx.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`p-4 text-right font-medium ${
                        tx.amount > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: tx.currency || "USD",
                      }).format(tx.amount)}
                    </TableCell>
                    <TableCell className="p-4">
                      {tx.category ? (
                        <Badge
                          className="px-2 py-1"
                          style={{
                            backgroundColor: tx.category.color
                              ? `${tx.category.color}20`
                              : "rgb(229, 231, 235)",
                            color: tx.category.color || "rgb(107, 114, 128)",
                            borderColor:
                              tx.category.color || "rgb(229, 231, 235)",
                          }}
                        >
                          {tx.category.name}
                        </Badge>
                      ) : tx.categorySuggestion ? (
                        <Badge className="px-2 py-1 bg-gray-100 text-gray-800 border border-dashed border-gray-300">
                          {tx.categorySuggestion.category.name} (Suggested)
                        </Badge>
                      ) : (
                        <Badge className="px-2 py-1 bg-gray-100 text-gray-600">
                          Uncategorized
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Loading indicator for infinite scroll */}
          <div ref={observerTarget} className="p-4 flex justify-center">
            {isFetchingNextPage ? (
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
            ) : // Only show "Scroll to load more" when there are no active search/filters AND there's more data
            search ? null : hasNextPage && !allLoaded ? (
              <p className="text-sm text-gray-500">Scroll to load more</p>
            ) : filteredTransactions.length > 0 ? (
              <p className="text-sm text-gray-500">All transactions loaded</p>
            ) : null}
          </div>
        </Card>
      )}
    </div>
  );
}
