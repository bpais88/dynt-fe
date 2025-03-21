"use client";

import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineBank } from "react-icons/ai";

import BillDetails, { CreateBillProps } from "@/components/bills/BillDetails";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useOrganization } from "@/context/OrganizationContext";
import { api, RouterOutputs } from "@/utils/trpc";

type Vendor = RouterOutputs["partners"]["vendorsByOrgId"][number];

export default function CreateBillPage() {
  const router = useRouter();
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vendorListOpen, setVendorListOpen] = useState(true);
  const [accountListOpen, setAccountListOpen] = useState(false);

  const { organizationId = "" } = useOrganization();
  const create = api.bills.createBill.useMutation();

  // Fetch vendors
  const { data: vendors = [], isLoading: isVendorsLoading } =
    api.partners.vendorsByOrgId.useQuery(organizationId, {
      enabled: !!organizationId,
    });

  // Fetch vendor bank accounts when a vendor is selected
  const { data: vendorAccounts = [], isLoading: isVendorBankAccountLoading } =
    api.manualAccounts.vendorAccounts.useQuery(selectedVendor?.id || "", {
      enabled: !!selectedVendor?.id,
    });

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setVendorListOpen(false);
    setAccountListOpen(true);
    setAccountInfo(null); // Reset account selection when vendor changes
  };

  const handleAccountSelect = (account: any) => {
    setAccountInfo({
      ...account,
      countryCode: account.country?.iso2,
    });
    setAccountListOpen(false);
  };

  const handleCreate = async ({
    rows,
    customId,
    dueDate,
    currency,
    files,
    terms,
  }: CreateBillProps) => {
    if (!selectedVendor) {
      // toast({
      //   title: "Vendor Required",
      //   description: "Please select a vendor before creating a bill",
      //   variant: "destructive",
      // });
      console.log("Vendor not selected");
      setVendorListOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const { totalAmount, totalVat } = rows.reduce(
        (acc, { amount, vat, quantity }) => {
          acc.totalVat += vat * quantity;
          acc.totalAmount += amount * quantity;
          return acc;
        },
        { totalAmount: 0, totalVat: 0 }
      );

      if (!organizationId) {
        // toast({
        //   title: "Organization Required",
        //   description: "Please select an organization",
        //   variant: "destructive",
        // });
        console.log("Organization not selected");
        return;
      }

      const bill = await create.mutateAsync({
        vendorId: selectedVendor.id,
        rows,
        dueDate,
        terms,
        total: totalAmount + totalVat,
        totalAmount,
        files,
        totalVat,
        customId,
        currency,
        accountInfo,
        organizationId,
      });

      // toast({
      //   title: "Success",
      //   description: "Bill created successfully",
      // });
      console.log("Bill created successfully");

      router.push(`/invoices-bills/bills/${bill.id}`);
    } catch (error) {
      console.error("Error creating bill:", error);
      // toast({
      //   title: "Error",
      //   description: "Failed to create bill. Please try again.",
      //   variant: "destructive",
      // });
      console.log("Failed to create bill. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVendorInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getAccountDisplayValue = (account: any) => {
    return (
      account.IBAN ||
      account.ACCOUNT_NUMBER ||
      account.ROUTING_NUMBER ||
      "No account number"
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Create Bill</h1>

      {/* Vendor selection section */}
      <Collapsible
        open={vendorListOpen}
        onOpenChange={setVendorListOpen}
        className="w-full"
      >
        <Card className="shadow-sm py-2">
          {/* Make the entire header clickable */}
          <CollapsibleTrigger asChild className="">
            <CardHeader className="py-2 cursor-pointer hover:bg-slate-50 rounded-t-md transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">
                    {!selectedVendor
                      ? "Choose a Vendor"
                      : `Vendor: ${selectedVendor.name}`}
                  </CardTitle>
                  {selectedVendor && (
                    <CardDescription className="text-sm mt-1">
                      {selectedVendor.email || "No email"} |{" "}
                      {selectedVendor.phone || "No phone"}
                    </CardDescription>
                  )}
                </div>
                {vendorListOpen ? (
                  <ChevronUp className="h-4 w-4 text-slate-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>

          <CollapsibleContent className=" my-0">
            <CardContent className="py-2 px-3">
              {isVendorsLoading ? (
                <div className="flex justify-center py-3">
                  <p>Loading vendors...</p>
                </div>
              ) : vendors.length === 0 ? (
                <div className="flex flex-col items-center py-4 text-center">
                  <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                  <p>No vendors found. Please add a vendor first.</p>
                </div>
              ) : (
                <div className="grid gap-2 max-h-60 overflow-y-auto p-1">
                  {vendors.map((vendor) => (
                    <Button
                      key={vendor.id}
                      variant={
                        selectedVendor?.id === vendor.id ? "subtle" : "ghost"
                      }
                      className={`justify-start py-2 px-3 h-auto w-full ${
                        selectedVendor?.id === vendor.id
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-800"
                          : "hover:bg-slate-50"
                      }`}
                      onClick={() => handleVendorSelect(vendor)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={vendor.photo || ""}
                            alt={vendor.name}
                          />
                          <AvatarFallback className="bg-slate-200 text-slate-600 text-xs">
                            {getVendorInitials(vendor.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-sm">{vendor.name}</p>
                          <p className="text-xs text-slate-500 truncate">
                            {vendor.email || "No email"} |{" "}
                            {vendor.city || "No location"}
                          </p>
                        </div>
                        {vendor.business_tax_number && (
                          <Badge
                            variant="outline"
                            className="ml-auto text-xs bg-transparent"
                          >
                            VAT: {vendor.business_tax_number}
                          </Badge>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Bank account selection section */}
      {selectedVendor && (
        <Collapsible
          open={accountListOpen}
          onOpenChange={setAccountListOpen}
          className="w-full"
        >
          <Card className=" py-2 shadow-sm">
            {/* Make the entire header clickable, matching the vendor section */}
            <CollapsibleTrigger asChild>
              <CardHeader className="py-2 cursor-pointer hover:bg-slate-50 rounded-t-md transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">
                      {!accountInfo
                        ? "Choose a Bank Account"
                        : `Selected Account: ${
                            accountInfo?.name || "Unnamed Account"
                          }`}
                    </CardTitle>
                    {accountInfo && (
                      <CardDescription className="text-sm mt-1">
                        {getAccountDisplayValue(accountInfo)}{" "}
                        {accountInfo?.currency && `(${accountInfo.currency})`}
                      </CardDescription>
                    )}
                  </div>
                  {accountListOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  )}
                </div>
              </CardHeader>
            </CollapsibleTrigger>

            <CollapsibleContent className="py-0">
              <CardContent className="py-2 px-3">
                {isVendorBankAccountLoading ? (
                  <div className="flex justify-center py-3">
                    <p>Loading bank accounts...</p>
                  </div>
                ) : vendorAccounts.length === 0 ? (
                  <div className="flex flex-col items-center py-4 text-center">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <p>No bank accounts found for this vendor.</p>
                  </div>
                ) : (
                  <div className="grid gap-2 max-h-48 overflow-y-auto p-1">
                    {vendorAccounts.map((account) => (
                      <Button
                        key={account.id}
                        variant="ghost"
                        className={`justify-start h-auto py-3 px-4 w-full ${
                          accountInfo?.id === account.id
                            ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200"
                            : "hover:bg-slate-50"
                        }`}
                        onClick={() => handleAccountSelect(account)}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div
                            className={`h-8 w-8 flex items-center justify-center rounded-full ${
                              accountInfo?.id === account.id
                                ? "bg-slate-200"
                                : "bg-slate-100"
                            }`}
                          >
                            <AiOutlineBank
                              className={`h-4 w-4 ${
                                accountInfo?.id === account.id
                                  ? "text-slate-700"
                                  : "text-slate-500"
                              }`}
                            />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-sm">
                              {account.name || "Unnamed Account"}
                            </p>
                            <p className="text-xs text-slate-500">
                              {getAccountDisplayValue(account)}
                            </p>
                          </div>
                          {account.currency && (
                            <Badge
                              variant="outline"
                              className={`ml-auto ${
                                accountInfo?.id === account.id
                                  ? "bg-slate-100 text-slate-700 border-slate-200"
                                  : "bg-transparent"
                              }`}
                            >
                              {account.currency}
                            </Badge>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Bill details section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bill Details</CardTitle>
        </CardHeader>
        <CardContent>
          <BillDetails
            handleCreate={handleCreate}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
}
