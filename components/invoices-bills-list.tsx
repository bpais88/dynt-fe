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
  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4 mt-2">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="bills">Bills</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <div className="space-y-8">
          {[...bills, ...invoices]
            .sort(
              (a, b) =>
                new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
            )
            .map((entry) => FinancialItem(entry))}
        </div>
      </TabsContent>

      <TabsContent value="invoices">
        <div className="space-y-8">
          {invoices
            .sort(
              (a, b) =>
                new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
            )
            .map((invoice) => FinancialItem(invoice))}
        </div>
      </TabsContent>

      <TabsContent value="bills">
        <div className="space-y-8">
          {bills
            .sort(
              (a, b) =>
                new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
            )
            .map((bill) => FinancialItem(bill))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

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
