"use client";

import { MainNavSidebar } from "@/components/main-nav-sidebar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/utils/trpc";
import { format } from "date-fns";
import {
  ArrowLeft,
  Download,
  MoreHorizontal,
  Printer,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = () => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Badge className={`${getStatusColor()} font-medium`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default function BillDetailsPage() {
  const params = useParams<{ billId: string }>();
  const billId = params.billId;
  const router = useRouter();

  const { data: billDetails, isLoading } = api.bills.billById.useQuery(billId, {
    enabled: !!billId,
  });

  console.log(billDetails, "billDetails");

  if (isLoading) {
    return (
      <div className="flex py-8 pt-36">
        <div className="animate-spin rounded-full h-8 w-8  m-auto border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!billDetails) {
    return <div className="p-8 flex justify-center">Bill not found</div>;
  }

  const isInvoice = false;
  const entityName = "Bill";
  const counterpartyLabel = "Vendor";
  const counterpartyName = isInvoice
    ? billDetails.customer.name
    : billDetails.vendor?.name;
  const amountClass = isInvoice ? "text-green-600" : "text-red-600";
  // const amountPrefix = isInvoice ? "+" : "-";

  const transaction = billDetails;

  return (
    <>
      <div className="container mx-auto p-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => router.push("/invoices-bills")}
                className="cursor-pointer"
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => router.push("/invoices-bills")}
                className="cursor-pointer"
              >
                Invoices & Bills
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                {transaction.id || transaction.customId}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header with back button */}
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/invoices-bills"
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            View all Bills
          </Link>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            {isInvoice && (
              <Button variant="outline" size="sm">
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            )}
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">
                  {entityName} #
                  {transaction.invoice_number || transaction.customId}
                </CardTitle>
                <CardDescription>
                  Created on{" "}
                  {format(new Date(transaction.createdAt), "MMM d, yyyy")}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end">
                <div className="mb-2">
                  <StatusBadge status={transaction.status} />
                </div>
                <div className={`text-2xl font-bold ${amountClass}`}>
                  {transaction.currency}{" "}
                  {transaction.total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  {counterpartyLabel}
                </h3>
                <p className="font-medium">{counterpartyName}</p>
                <p className="text-sm text-gray-600">
                  {/* {transaction.organization.name} */}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Payment Details
                </h3>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="text-gray-600">Due Date:</span>{" "}
                    <span className="font-medium">
                      {format(new Date(transaction.dueDate), "MMM d, yyyy")}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Terms:</span>{" "}
                    <span className="font-medium">
                      Net {transaction.terms} days
                    </span>
                  </p>
                  {transaction.sentAt && (
                    <p className="text-sm">
                      <span className="text-gray-600">Sent on:</span>{" "}
                      <span className="font-medium">
                        {format(new Date(transaction.sentAt), "MMM d, yyyy")}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Transaction Summary Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Subtotal</TableCell>
                  <TableCell className="text-right">
                    {transaction.currency}{" "}
                    {transaction.totalAmount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>VAT</TableCell>
                  <TableCell className="text-right">
                    {transaction.currency}{" "}
                    {transaction.totalVat.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
                <TableRow className="font-bold">
                  <TableCell>Total</TableCell>
                  <TableCell className="text-right">
                    {transaction.currency}{" "}
                    {transaction.total.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <div>
              <p className="text-sm text-gray-500">
                Last updated:{" "}
                {format(new Date(transaction.updatedAt), "MMM d, yyyy")}
              </p>
            </div>
            <div>
              {isInvoice && transaction.paymentLinkEnabled && (
                <Button variant="outline" size="sm">
                  Payment Link
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>

        {/* Additional information card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">ID</h3>
                <p className="text-sm">{transaction.id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Custom ID
                </h3>
                <p className="text-sm">{transaction.customId || "-"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Accounting Status
                </h3>
                <p className="text-sm">
                  {transaction.accountingStatus.replace("_", " ")}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Approval Status
                </h3>
                <p className="text-sm">{transaction.approvalStatus}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Is Complete
                </h3>
                <p className="text-sm">
                  {transaction.isComplete ? "Yes" : "No"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Organization ID
                </h3>
                {/* <p className="text-sm">{transaction.organization.id}</p> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
