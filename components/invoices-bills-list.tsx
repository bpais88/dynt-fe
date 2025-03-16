"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RouterOutputs } from "@/utils/trpc";
import Link from "next/link";
import { usePathname } from "next/navigation";

type InvoiceType = RouterOutputs["invoices"]["invoiceById"];
type BillType = RouterOutputs["bills"]["billById"];

export function InvoicesBillsList({
  bills,
  invoices,
}: {
  bills: BillType[] | [];
  invoices: InvoiceType[] | [];
}) {
  const pathname = usePathname();
  const isInvoicesBillsPage = pathname === "/invoices-bills";

  const combinedEntries = [...bills, ...invoices]
    .sort(
      (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    )
    .slice(0, isInvoicesBillsPage ? undefined : 5); // Limit to 5 if not on invoices-bills page

  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4 mt-2">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="bills">Bills</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        {combinedEntries.length > 0 ? (
          <div className="space-y-8">
            {combinedEntries.map((entry) => FinancialItem(entry))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <FinancialSheetLogo />
            <h3 className="text-lg font-medium text-gray-900">
              No items to display
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              You don&apos;t have any bills or invoices yet.
            </p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="invoices">
        {invoices?.length > 0 ? (
          <div className="space-y-8">
            {invoices
              .sort(
                (a, b) =>
                  new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
              )
              .map((invoice) => FinancialItem(invoice))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <FinancialSheetLogo />
            <h3 className="text-lg font-medium text-gray-900">
              No items to display
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              You don&apos;t have any invoices yet.
            </p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="bills">
        {bills?.length > 0 ? (
          <div className="space-y-8">
            {bills
              .sort(
                (a, b) =>
                  new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
              )
              .map((bill) => FinancialItem(bill))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <FinancialSheetLogo />
            <h3 className="text-lg font-medium text-gray-900">
              No items to display
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              You don&apos;t have any bills yet.
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

const FinancialSheetLogo = () => {
  return (
    <div className="rounded-full bg-gray-100 p-3 mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-500"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    </div>
  );
};

function FinancialItem(entry: InvoiceType | BillType) {
  const isBill = "vendor" in entry;
  const type = isBill ? "bill" : "invoice";
  const name = isBill ? entry.vendor?.name : entry.customer.name;
  const amount = entry.total;
  const dueDate = new Date(entry.dueDate);
  const createdAt = new Date(entry.createdAt);

  // Get today's date at midnight for comparing due dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isOverdue =
    (entry.status === "sent" || entry.status === "received") && dueDate < today;

  const pathname = usePathname();
  const isInvoicesBillsPage = pathname === "/invoices-bills";

  return (
    <Link href={`/invoices-bills/${type}s/${entry.id}`} key={entry.id}>
      <div
        className={`flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
          entry.status === "cancelled" ? "opacity-60" : ""
        }`}
      >
        <Avatar className="h-9 w-9">
          <AvatarFallback
            className={
              isBill ? "bg-red-100 text-red-700" : "bg-green-100 text-green-00"
            }
          >
            {getInitialsFromName(name || "")}
          </AvatarFallback>
        </Avatar>

        <div className="ml-4 flex-grow">
          <div className="flex items-center">
            <p className="text-sm font-medium">{name}</p>

            <div className="ml-2">
              <StatusBadge
                status={
                  isOverdue &&
                  entry.status !== "paid" &&
                  entry.status !== "cancelled"
                    ? "overdue"
                    : entry.status
                }
              />
            </div>
          </div>

          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {dueDate instanceof Date && !isNaN(dueDate.getTime()) && (
              <>
                <span
                  className={
                    isOverdue &&
                    entry.status !== "paid" &&
                    entry.status !== "cancelled"
                      ? "text-red-600"
                      : ""
                  }
                >
                  Due: {formatDate(dueDate)}
                </span>
              </>
            )}

            {createdAt instanceof Date && !isNaN(createdAt.getTime()) && (
              <>
                <span className="mx-2 text-gray-300">•</span>

                <span>Created: {formatDate(createdAt)}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div
            className={`font-medium ${
              isBill ? "text-red-600" : "text-green-600"
            }`}
          >
            {isBill ? "-" : "+"}${amount.toFixed(2)}
          </div>

          {isInvoicesBillsPage && (
            <div className="text-xs text-gray-500 mt-1">
              {type.charAt(0).toUpperCase() + type.slice(1)} #
              {entry.id.slice(-6)}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

function StatusBadge({
  status,
}: {
  status:
    | "received"
    | "draft"
    | "sent"
    | "paid"
    | "cancelled"
    | "overdue"
    | "scheduled";
}) {
  const statusStyles = {
    paid: "bg-green-50 text-green-700 border border-green-200",
    received: "bg-blue-50 text-blue-700 border border-blue-200",
    draft: "bg-gray-50 text-gray-700 border border-gray-200",
    sent: "bg-indigo-50 text-indigo-700 border border-indigo-200",
    cancelled: "bg-gray-50 text-gray-700 border border-gray-200 line-through",
    overdue: "bg-red-50 text-red-700 border border-red-200",
    scheduled: "bg-amber-50 text-amber-700 border border-amber-200",
  };

  return (
    <span
      className={`px-1.5 py-0.5 rounded text-xs font-medium ${statusStyles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function getInitialsFromName(name: string) {
  const parts = name?.trim().split(" ") || ["?"];
  return parts.length > 1
    ? (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase()
    : parts[0].charAt(0).toUpperCase();
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
