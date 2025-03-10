"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface Bill {
  dueDate: Date;
  id: string;
  status: "paid" | "unpaid" | "pending";
  total: number;
  vendor: {
    name: string;
  };
}

interface Invoice {
  dueDate: Date;
  id: string;
  status: "paid" | "unpaid" | "pending" | "draft" | "sent";
  total: number;
  customer: {
    name: string;
  };
}

interface Transaction {
  dueDate: Date;
  id: string;
  status: "paid" | "unpaid" | "pending";
  amount: number;
  type: "invoice" | "bill";
  vendorName?: string;
  customerName?: string;
}

export function InvoicesBills({
  bills,
  invoices,
}: {
  bills: Bill[];
  invoices: Invoice[];
}) {
  const allTransactions: Transaction[] = [
    ...bills.map((bill) => ({
      dueDate: bill.dueDate,
      id: bill.id,
      status: bill.status,
      amount: bill.total,
      type: "bill" as const,
      vendorName: bill.vendor.name,
    })),
    ...invoices.map((invoice) => ({
      dueDate: invoice.dueDate,
      id: invoice.id,
      status: invoice.status,
      amount: invoice.total,
      type: "invoice" as const,
      customerName: invoice.customer.name,
    })),
  ];

  return (
    <>
      {/* <CardTitle>Recent Transactions</CardTitle>
      <CardDescription>Your latest financial activities</CardDescription> */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4 mt-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="bills">Bills</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <TransactionList transactions={allTransactions} />
        </TabsContent>
        <TabsContent value="invoices">
          <TransactionList
            transactions={allTransactions.filter(
              (transaction) => transaction.type === "invoice"
            )}
          />
        </TabsContent>
        <TabsContent value="bills">
          <TransactionList
            transactions={allTransactions.filter(
              (transaction) => transaction.type === "bill"
            )}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}

function TransactionList({ transactions }: { transactions: Transaction[] }) {
  const initialsFromName = (name: string) => {
    const [first, last] = name.split(" ");
    return first.charAt(0) + last.charAt(0);
  };

  // sort invoices/bills by date
  transactions.sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime());

  return (
    <div className="space-y-8">
      {transactions.map((transaction) => (
        <Link
          href={`/invoices-bills/${transaction.type}s/${transaction.id}`}
          key={transaction.id}
        >
          <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <Avatar className="h-9 w-9">
              <AvatarFallback
                className={
                  transaction.type == "invoice" ? "bg-green-500" : "bg-red-500"
                }
              >
                {initialsFromName(
                  transaction.vendorName || transaction.customerName || ""
                )}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium">
                {transaction.vendorName || transaction.customerName}
              </p>
              <p className="text-xs text-muted-foreground">
                {transaction.dueDate.toDateString()}
              </p>
            </div>
            <div
              className={`ml-auto font-medium ${
                transaction.type === "invoice"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {transaction.type === "bill" ? "-" : "+"}$
              {transaction.amount.toFixed(2)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

// type Transaction = {
//   id: number;
//   description: string;
//   details: string;
//   amount: number;
//   type: "income" | "expense";
//   initials: string;
// };

// type Transaction = Bill | Invoice;

// const allTransactions: Transaction[] = [
//   {
//     id: 1,
//     description: "Client Payment",
//     details: "Acme Corp",
//     amount: 1999.0,
//     type: "income",
//     initials: "AC",
//   },
//   {
//     id: 2,
//     description: "Team Expense",
//     details: "Software Licenses",
//     amount: 345.0,
//     type: "expense",
//     initials: "TE",
//   },
//   {
//     id: 3,
//     description: "Utility Payment",
//     details: "Electricity Bill",
//     amount: 120.5,
//     type: "expense",
//     initials: "UP",
//   },
//   {
//     id: 4,
//     description: "Client Payment",
//     details: "XYZ Inc",
//     amount: 2500.0,
//     type: "income",
//     initials: "XI",
//   },
//   {
//     id: 5,
//     description: "Office Supplies",
//     details: "Stationery",
//     amount: 89.99,
//     type: "expense",
//     initials: "OS",
//   },
// ];

// const incomeTransactions = allTransactions.filter((t) => t.type === "income");
// const expenseTransactions = allTransactions.filter((t) => t.type === "expense");
