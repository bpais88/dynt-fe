"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { saveFile } from "@/utils/helper";
import { api, RouterOutputs } from "@/utils/trpc";
import { format } from "date-fns";
import endOfYear from "date-fns/endOfYear";
import startOfYear from "date-fns/startOfYear";
import { useAtom } from "jotai";
import { json2csv } from "json-2-csv";
import { Download, Filter, RefreshCcw, Search, X } from "lucide-react";
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

  const formatDate = (dateString) => {
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

      {/* Transactions Table */}
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
  );
}
