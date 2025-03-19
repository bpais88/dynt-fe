import { Filters } from "@/app/(dynt)/(home)/(dashboard)/transactions/store/filters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RouterOutputs } from "@/utils/trpc";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

type Transaction = RouterOutputs["transaction"];

interface TransactionsTableProps {
  transactions: Transaction[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  allLoaded: boolean;
  search: string;
  formatDate: (date: string) => string;
  fetchNextPage: () => void;
  resetFilters: () => void;
  filters: Filters;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  allLoaded,
  search,
  formatDate,
  fetchNextPage,
  resetFilters,
  filters,
}) => {
  const observerTarget = useRef(null);

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

  return (
    <>
      {isLoading && (
        <Card className="rounded-xl shadow-sm">
          <div className="p-8 flex justify-center items-center min-h-[200px]">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              <p className="text-gray-500">Loading transactions...</p>
            </div>
          </div>
        </Card>
      )}

      {!isLoading && transactions.length === 0 && (
        <Card className="rounded-xl shadow-sm overflow-hidden">
          <div className="p-12 text-center">
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
          </div>
        </Card>
      )}

      {!isLoading && transactions.length > 0 && (
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
                {transactions.map((tx) => (
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
            ) : transactions.length > 0 ? (
              <p className="text-sm text-gray-500">All transactions loaded</p>
            ) : null}
          </div>
        </Card>
      )}
    </>
  );
};

export default TransactionsTable;
