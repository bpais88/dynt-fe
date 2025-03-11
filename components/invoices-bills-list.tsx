"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RouterOutputs } from "@/utils/trpc";
import Link from "next/link";

type InvoiceType = RouterOutputs["invoices"]["invoiceById"];
type BillType = RouterOutputs["bills"]["billById"];

interface InvoiceBillEntry {
  dueDate: Date;
  id: string;
  status: "paid" | "unpaid" | "pending";
  amount: number;
  type: "invoice" | "bill";
  vendorName?: string;
  customerName?: string;
}

export function InvoicesBillsList({
  bills,
  invoices,
}: {
  bills: BillType[] | [];
  invoices: InvoiceType[] | [];
}) {
  const invoicesAndBills: InvoiceBillEntry[] = [
    ...bills?.map((bill) => ({
      dueDate: bill.dueDate,
      id: bill.id,
      status: bill.status,
      amount: bill.total,
      type: "bill" as const,
      vendorName: bill?.vendor?.name,
    })),
    ...invoices?.map((invoice) => ({
      dueDate: invoice.dueDate,
      id: invoice.id,
      status: invoice.status,
      amount: invoice.total,
      type: "invoice" as const,
      customerName: invoice.customer.name,
    })),
  ];

  return (
    <Tabs defaultValue="all">
      {/* Tab selector for all, invoices, and bills */}
      <TabsList className="mb-4 mt-2">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
        <TabsTrigger value="bills">Bills</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <InvoicesBillsItems entries={invoicesAndBills} />
      </TabsContent>
      <TabsContent value="invoices">
        <InvoicesBillsItems
          entries={invoicesAndBills.filter((entry) => entry.type === "invoice")}
        />
      </TabsContent>
      <TabsContent value="bills">
        <InvoicesBillsItems
          entries={invoicesAndBills.filter((entry) => entry.type === "bill")}
        />
      </TabsContent>
    </Tabs>
  );
}

function InvoicesBillsItems({ entries }: { entries: InvoiceBillEntry[] }) {
  const getInitialsFromName = (name: string) => {
    const parts = name.trim().split(" ");
    return parts.length > 1
      ? (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase()
      : parts[0].charAt(0).toUpperCase();
  };

  // Sort invoices/bills by date (latest first)
  entries.sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime());

  return (
    <div className="space-y-8">
      {entries.map((entry) => (
        <Link
          href={`/invoices-bills/${entry.type}s/${entry.id}`}
          key={entry.id}
        >
          <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <Avatar className="h-9 w-9">
              <AvatarFallback
                className={
                  entry.type === "invoice" ? "bg-green-500" : "bg-red-500"
                }
              >
                {getInitialsFromName(
                  entry.vendorName || entry.customerName || ""
                )}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium">
                {entry.vendorName || entry.customerName}
              </p>
              <p className="text-xs text-muted-foreground">
                {entry.dueDate.toDateString()}
              </p>
            </div>
            <div
              className={`ml-auto font-medium ${
                entry.type === "invoice" ? "text-green-500" : "text-red-500"
              }`}
            >
              {entry.type === "bill" ? "-" : "+"}${entry.amount.toFixed(2)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
