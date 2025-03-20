"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  BadgeCheck,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Link as LinkIcon,
  MoreHorizontal,
  Printer,
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

// Status badge component with improved visual cues for clickability
const StatusBadge = ({ status, onClick, isClickable = true }) => {
  const getStatusProps = () => {
    switch (status) {
      case "paid":
        return {
          className: "bg-green-100 text-green-800 hover:bg-green-200",
          icon: <CheckCircle2 className="mr-1 h-3 w-3" />,
        };
      case "unpaid":
        return {
          className: "bg-red-100 text-red-800 hover:bg-red-200",
          icon: <Clock className="mr-1 h-3 w-3" />,
        };
      case "pending":
        return {
          className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
          icon: <Clock className="mr-1 h-3 w-3" />,
        };
      case "scheduled":
        return {
          className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
          icon: <Calendar className="mr-1 h-3 w-3" />,
        };
      case "draft":
        return {
          className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
          icon: <FileText className="mr-1 h-3 w-3" />,
        };
      case "cancelled":
        return {
          className: "bg-gray-100 text-gray-700 hover:bg-gray-200 line-through",
          icon: null,
        };
      case "overdue":
        return {
          className: "bg-red-100 text-red-800 hover:bg-red-200",
          icon: <Clock className="mr-1 h-3 w-3" />,
        };
      case "received":
        return {
          className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
          icon: <CheckCircle2 className="mr-1 h-3 w-3" />,
        };
      default:
        return {
          className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
          icon: null,
        };
    }
  };
  const { className, icon } = getStatusProps();
  const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);

  // If clickable, add visual cues and pointer cursor
  const clickableClass = isClickable
    ? "cursor-pointer transition-all hover:shadow-sm group relative"
    : "";

  return (
    <div onClick={isClickable ? onClick : undefined} className={clickableClass}>
      <Badge className={`${className} font-medium flex items-center pr-2`}>
        {icon} {displayStatus}
        {isClickable && <ChevronDown className="ml-1 h-3 w-3 opacity-70" />}
      </Badge>
      {isClickable && (
        <div className="absolute opacity-0 bg-gray-800 text-white text-xs rounded py-1 px-2 -bottom-7 left-1/2 transform -translate-x-1/2 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Click to change status
        </div>
      )}
    </div>
  );
};

// Approval status badge component with improved visual cues for clickability
const ApprovalBadge = ({ status, onClick, isClickable = true }) => {
  const getApprovalProps = () => {
    switch (status) {
      case "approved":
        return {
          className: "bg-green-100 text-green-800",
          icon: <BadgeCheck className="mr-1 h-3 w-3" />,
        };
      case "rejected":
        return {
          className: "bg-red-100 text-red-800",
          icon: null,
        };
      case "pending":
        return {
          className: "bg-yellow-100 text-yellow-800",
          icon: <Clock className="mr-1 h-3 w-3" />,
        };
      default:
        return {
          className: "bg-gray-100 text-gray-800",
          icon: null,
        };
    }
  };
  const { className, icon } = getApprovalProps();
  const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);

  // If clickable, add visual cues and pointer cursor
  const clickableClass = isClickable
    ? "cursor-pointer transition-all hover:shadow-sm group relative"
    : "";

  return (
    <div onClick={isClickable ? onClick : undefined} className={clickableClass}>
      <Badge className={`${className} font-medium flex items-center pr-2`}>
        {icon} {displayStatus}
        {isClickable && <ChevronDown className="ml-1 h-3 w-3 opacity-70" />}
      </Badge>
      {isClickable && (
        <div className="absolute opacity-0 bg-gray-800 text-white text-xs rounded py-1 px-2 -bottom-7 left-1/2 transform -translate-x-1/2 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Click to change approval
        </div>
      )}
    </div>
  );
};

// File attachment component to display proof documents
const FileAttachment = ({ file }) => {
  const fileUrl = file.link.startsWith("blob:") ? file.link : file.link;

  return (
    <div className="border rounded-lg p-3 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-purple-100">
          <FileText className="h-4 w-4 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
          <p className="text-xs text-gray-500">{file.size}</p>
        </div>
      </div>
      <div className="flex space-x-1">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
          <a href={fileUrl} download={file.name}>
            <Download className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default function BillDetailsPage() {
  const params = useParams();
  const billId = params.billId;
  const router = useRouter();

  // State for status updates
  const [currentStatus, setCurrentStatus] = useState(null);
  const [currentApprovalStatus, setCurrentApprovalStatus] = useState(null);
  const [showStatusAlert, setShowStatusAlert] = useState(false);
  const [showApprovalAlert, setShowApprovalAlert] = useState(false);

  // Status options menu state
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const [approvalMenuOpen, setApprovalMenuOpen] = useState(false);

  const { data: billDetails, isLoading } = api.bills.billById.useQuery(billId, {
    enabled: !!billId,
    onSuccess: (data) => {
      if (data) {
        setCurrentStatus(data.status);
        setCurrentApprovalStatus(data.approvalStatus);
      }
    },
  });

  // Mutations for updating bill status and approval
  const updateStatus = api.bills.updateStatus.useMutation();
  const updateApproval = api.bills.updateApproval.useMutation();
  const utils = api.useUtils();

  // Status options based on current status
  const billStatuses = [
    "draft",
    "received",
    "scheduled",
    "paid",
    "cancelled",
    "overdue",
  ];
  const approvalStatuses = ["pending", "approved", "rejected"];
  const statusPriority = {
    draft: 1,
    received: 2,
    overdue: 3,
    scheduled: 4,
    paid: 5,
    cancelled: 5,
  };

  // Filter available statuses based on priority
  const getAvailableStatuses = () => {
    if (!currentStatus) return [];
    return billStatuses.filter(
      (newStatus) =>
        statusPriority[newStatus] >= statusPriority[currentStatus] ||
        newStatus === currentStatus
    );
  };

  const handleStatusChange = async (newStatus) => {
    setCurrentStatus(newStatus);
    setShowStatusAlert(true);
    setStatusMenuOpen(false);
  };

  const handleApprovalChange = async (newStatus) => {
    setCurrentApprovalStatus(newStatus);
    setShowApprovalAlert(true);
    setApprovalMenuOpen(false);
  };

  const confirmStatusChange = async () => {
    await updateStatus.mutateAsync({ billId, status: currentStatus });
    utils.bills.billById.setData(billId, (prev) => {
      if (!prev) return prev;
      return { ...prev, status: currentStatus };
    });
    setShowStatusAlert(false);
  };

  const confirmApprovalChange = async () => {
    await updateApproval.mutateAsync({
      billId,
      approvalStatus: currentApprovalStatus,
    });
    utils.bills.billById.setData(billId, (prev) => {
      if (!prev) return prev;
      return { ...prev, approvalStatus: currentApprovalStatus };
    });
    setShowApprovalAlert(false);
  };

  if (isLoading) {
    return (
      <div className="flex py-8 pt-36">
        <div className="animate-spin rounded-full h-8 w-8 m-auto border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!billDetails) {
    return <div className="p-8 flex justify-center">Bill not found</div>;
  }

  const counterpartyName = billDetails.vendor?.name || "Unknown Vendor";
  const amountClass = "text-red-600";
  const transaction = billDetails;

  // Check if there are any proof documents
  const hasProofs = transaction.proofs && transaction.proofs.length > 0;

  return (
    <>
      <div className="container mx-auto p-6 max-w-5xl">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                onClick={() => router.push("/dashboard")}
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
                Bill #{transaction.invoice_number || transaction.customId}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header with back button */}
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/invoices-bills"
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bills
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit Bill</DropdownMenuItem>
                <DropdownMenuItem>Delete Bill</DropdownMenuItem>
                <DropdownMenuItem>Mark as Duplicate</DropdownMenuItem>
                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main card */}
        <Card className="mb-8 shadow-sm">
          <CardHeader className="border-b">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl mb-1">
                  Bill #{transaction.invoice_number || transaction.customId}
                </CardTitle>
                <CardDescription>
                  Created on{" "}
                  {format(new Date(transaction.createdAt), "MMM d, yyyy")}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex space-x-2 mb-2">
                  {/* Status badge with dropdown */}
                  <DropdownMenu
                    open={statusMenuOpen}
                    onOpenChange={setStatusMenuOpen}
                  >
                    <DropdownMenuTrigger asChild>
                      <div>
                        <StatusBadge
                          status={currentStatus || transaction.status}
                          onClick={() => setStatusMenuOpen(true)}
                        />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {getAvailableStatuses().map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => handleStatusChange(status)}
                          className="capitalize cursor-pointer"
                        >
                          <StatusBadge status={status} isClickable={false} />
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Approval badge with dropdown */}
                  <DropdownMenu
                    open={approvalMenuOpen}
                    onOpenChange={setApprovalMenuOpen}
                  >
                    <DropdownMenuTrigger asChild>
                      <div>
                        <ApprovalBadge
                          status={
                            currentApprovalStatus || transaction.approvalStatus
                          }
                          onClick={() => setApprovalMenuOpen(true)}
                        />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Update Approval</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {approvalStatuses.map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => handleApprovalChange(status)}
                          className="capitalize cursor-pointer"
                        >
                          <ApprovalBadge status={status} isClickable={false} />
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Vendor Information
                </h3>
                <div className="space-y-1">
                  <p className="font-medium">{counterpartyName}</p>
                  <p className="text-sm text-gray-600">
                    {transaction.vendor?.email || "No email provided"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {transaction.vendor?.phone || "No phone provided"}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Payment Details
                </h3>
                <div className="space-y-1">
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-600">Due Date:</span>{" "}
                    <span className="font-medium">
                      {format(new Date(transaction.dueDate), "MMM d, yyyy")}
                    </span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-600">Terms:</span>{" "}
                    <span className="font-medium">
                      Net {transaction.terms} days
                    </span>
                  </p>
                  <p className="text-sm flex justify-between">
                    <span className="text-gray-600">Payment Method:</span>{" "}
                    <span className="font-medium">
                      {transaction.paymentMethod || "Not specified"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction Summary Table */}
            <div className="overflow-hidden rounded-lg border">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-1/2">Description</TableHead>
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
                  <TableRow className="font-bold bg-gray-50">
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
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6 text-sm text-gray-500">
            <div>
              Last updated:{" "}
              {format(new Date(transaction.updatedAt), "MMM d, yyyy")}
            </div>
            <div>
              ID:{" "}
              <span className="font-mono">{transaction.id.slice(0, 8)}</span>
            </div>
          </CardFooter>
        </Card>

        {/* Notes & Attachments card */}
        <Card className="shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Notes & Attachments</CardTitle>
          </CardHeader>
          <CardContent>
            {!hasProofs ? (
              <div className="bg-gray-50 p-4 rounded-lg text-gray-500 text-sm italic">
                No notes or attachments available for this bill.
              </div>
            ) : (
              <div className="space-y-3">
                {transaction.proofs.map((proof) => (
                  <FileAttachment key={proof.id} file={proof.file} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Audit trail card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Bill created</p>
                  <p className="text-xs text-gray-500">
                    {format(
                      new Date(transaction.createdAt),
                      "MMM d, yyyy • h:mm a"
                    )}
                  </p>
                </div>
              </div>
              {transaction.sentAt && (
                <div className="flex items-start space-x-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <Send className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Bill sent</p>
                    <p className="text-xs text-gray-500">
                      {format(
                        new Date(transaction.sentAt),
                        "MMM d, yyyy • h:mm a"
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status change confirmation dialog */}
      <AlertDialog open={showStatusAlert} onOpenChange={setShowStatusAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Bill Status</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the status to{" "}
              <span className="font-medium capitalize">{currentStatus}</span>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange}>
              {updateStatus.isLoading ? "Updating..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Approval change confirmation dialog */}
      <AlertDialog open={showApprovalAlert} onOpenChange={setShowApprovalAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Approval Status</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the approval status to{" "}
              <span className="font-medium capitalize">
                {currentApprovalStatus}
              </span>
              ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmApprovalChange}>
              {updateApproval.isLoading ? "Updating..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
