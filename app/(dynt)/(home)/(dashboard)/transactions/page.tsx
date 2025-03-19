"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DateRangePicker } from "@/components/date-range-picker";
import TransactionsTable from "@/components/transactions-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrganization } from "@/context/OrganizationContext";
import { Enums } from "@/types";
import { saveFile } from "@/utils/helper";
import { api, RouterOutputs } from "@/utils/trpc";
import { endOfDay, format } from "date-fns";
import startOfYear from "date-fns/startOfYear";
import { useAtom } from "jotai";
import { json2csv } from "json-2-csv";
import { Download, RefreshCcw, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { filterAtom } from "./store/filters";

export type TransactionHistory =
  RouterOutputs["transaction"]["list"]["data"][number];

export default function Transactions() {
  const { organizationId } = useOrganization();
  const [filters, setFilters] = useAtom(filterAtom);
  const [search, setSearch] = useState("");
  const [allLoaded, setAllLoaded] = useState(false);

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

  // Reset all loaded state when search or filters change
  useEffect(() => {
    setAllLoaded(false);
  }, [search, filters]);

  const resetFilters = () => {
    setFilters({
      period: {
        startDate: startOfYear(new Date()),
        endDate: endOfDay(new Date()),
      },
      status: undefined,
      accountId: undefined,
      type: undefined,
    });
    setSearch("");
    setAllLoaded(false);
  };

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="flex flex-col gap-4">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold">Transactions</h2>

          <div className="flex gap-2">
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
              <span className="hidden md:inline">Refresh</span>
            </Button>

            {/* Export Button */}
            <Button
              variant="outline"
              className="gap-2 rounded-lg"
              onClick={() => handleExportCSV(filteredTransactions)}
            >
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Export</span>
            </Button>
          </div>
        </div>

        {/* Filter Menu */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full rounded-lg"
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

          {/* Filter by Type: Debit/Credit */}
          <Select
            value={filters.type === undefined ? "all" : filters.type}
            onValueChange={(val) =>
              setFilters({
                ...filters,
                type: val === "all" ? undefined : val,
              })
            }
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="debit">Debit</SelectItem>
              <SelectItem value="credit">Credit</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter by Status */}
          <Select
            value={filters.status === undefined ? "all" : filters.status}
            onValueChange={(val) =>
              setFilters({
                ...filters,
                status: (val as Enums["SwanTransactionStatus"]) || undefined,
              })
            }
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Booked">Booked</SelectItem>
              <SelectItem value="Rejected">Rejected (swan only)</SelectItem>
              <SelectItem value="Canceled">Canceled (swan only)</SelectItem>
              <SelectItem value="Upcoming">Upcoming (swan only)</SelectItem>
              <SelectItem value="Released">Released (swan only)</SelectItem>
            </SelectContent>
          </Select>

          {/* Filter by Account */}
          <Select
            value={filters.accountId === undefined ? "all" : filters.accountId}
            onValueChange={(val) =>
              setFilters({
                ...filters,
                accountId: val === "all" ? undefined : val,
              })
            }
          >
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="All accounts" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              <SelectItem value="all">All accounts</SelectItem>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  {account.bankName} - {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filter by Date Range */}
          <DateRangePicker filters={filters} setFilters={setFilters} />

          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="self-end md:self-auto"
          >
            Reset Filters
          </Button>
        </div>

        {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3"></div> */}
      </div>

      {/* Transactions Table */}
      <div className="mt-6">
        <TransactionsTable
          transactions={filteredTransactions}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          allLoaded={allLoaded}
          search={search}
          formatDate={formatDate}
          fetchNextPage={fetchNextPage}
          resetFilters={resetFilters}
          filters={filters}
        />
      </div>
    </div>
  );
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const handleExportCSV = (filteredTransactions: TransactionHistory[]) => {
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
