"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const initialInvoices = [
  {
    id: 1,
    date: "2023-07-01",
    client: "Acme Corp",
    amount: 5000,
    status: "Paid",
  },
  {
    id: 2,
    date: "2023-07-15",
    client: "TechStart Inc",
    amount: 3500,
    status: "Pending",
  },
  {
    id: 3,
    date: "2023-06-30",
    client: "Global Solutions",
    amount: 7500,
    status: "Overdue",
  },
];

const initialBills = [
  {
    id: 1,
    date: "2023-07-05",
    vendor: "Office Supplies Co",
    amount: 500,
    status: "Paid",
  },
  {
    id: 2,
    date: "2023-07-20",
    vendor: "Web Hosting Services",
    amount: 100,
    status: "Pending",
  },
  {
    id: 3,
    date: "2023-06-25",
    vendor: "Marketing Agency",
    amount: 2000,
    status: "Overdue",
  },
];

export function InvoicesBillsView() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [bills, setBills] = useState(initialBills);
  const [newItem, setNewItem] = useState({
    date: "",
    client: "",
    vendor: "",
    amount: "",
    status: "",
  });
  const [activeTab, setActiveTab] = useState("invoices");

  const handleAddItem = () => {
    if (
      newItem.date &&
      (newItem.client || newItem.vendor) &&
      newItem.amount &&
      newItem.status
    ) {
      if (activeTab === "invoices") {
        setInvoices([
          ...invoices,
          {
            ...newItem,
            id: invoices.length + 1,
            amount: Number.parseFloat(newItem.amount),
          },
        ]);
      } else {
        setBills([
          ...bills,
          {
            ...newItem,
            id: bills.length + 1,
            amount: Number.parseFloat(newItem.amount),
          },
        ]);
      }
      setNewItem({ date: "", client: "", vendor: "", amount: "", status: "" });
    }
  };

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="invoices"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="bills">Bills</TabsTrigger>
        </TabsList>
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Manage your outgoing invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="mb-4">
                <TabsList>
                  <TabsTrigger value="all">All ({invoices.length})</TabsTrigger>
                  <TabsTrigger value="paid">
                    Paid ({invoices.filter((i) => i.status === "Paid").length})
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending (
                    {invoices.filter((i) => i.status === "Pending").length})
                  </TabsTrigger>
                  <TabsTrigger value="overdue">
                    Overdue (
                    {invoices.filter((i) => i.status === "Overdue").length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>{invoice.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bills">
          <Card>
            <CardHeader>
              <CardTitle>Bills</CardTitle>
              <CardDescription>Manage your incoming bills</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="mb-4">
                <TabsList>
                  <TabsTrigger value="all">All ({bills.length})</TabsTrigger>
                  <TabsTrigger value="paid">
                    Paid ({bills.filter((b) => b.status === "Paid").length})
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending (
                    {bills.filter((b) => b.status === "Pending").length})
                  </TabsTrigger>
                  <TabsTrigger value="overdue">
                    Overdue (
                    {bills.filter((b) => b.status === "Overdue").length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bills.map((bill) => (
                    <TableRow key={bill.id}>
                      <TableCell>{bill.date}</TableCell>
                      <TableCell>{bill.vendor}</TableCell>
                      <TableCell>${bill.amount.toFixed(2)}</TableCell>
                      <TableCell>{bill.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Sheet>
        <SheetTrigger asChild>
          <Button>
            Add New {activeTab === "invoices" ? "Invoice" : "Bill"}
          </Button>
        </SheetTrigger>
        <SheetContent position="right" size="sm">
          <SheetHeader>
            <SheetTitle>
              Add New {activeTab === "invoices" ? "Invoice" : "Bill"}
            </SheetTitle>
            <SheetDescription>
              Enter the details of the new{" "}
              {activeTab === "invoices" ? "invoice" : "bill"}
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newItem.date}
                onChange={(e) =>
                  setNewItem({ ...newItem, date: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="client-vendor" className="text-right">
                {activeTab === "invoices" ? "Client" : "Vendor"}
              </Label>
              <Input
                id="client-vendor"
                value={
                  activeTab === "invoices" ? newItem.client : newItem.vendor
                }
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    [activeTab === "invoices" ? "client" : "vendor"]:
                      e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={newItem.amount}
                onChange={(e) =>
                  setNewItem({ ...newItem, amount: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                onValueChange={(value) =>
                  setNewItem({ ...newItem, status: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <SheetFooter>
            <Button onClick={handleAddItem}>
              Add {activeTab === "invoices" ? "Invoice" : "Bill"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
