"use client";

import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineBank } from "react-icons/ai";

import InvoiceDetails, {
  CreateInvoiceProps,
} from "@/components/bills/InvoiceDetails";
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
import { addDays } from "date-fns";

import { useOrganization } from "@/context/OrganizationContext";
import { useUser } from "@/context/UserContext";
import { api, RouterOutputs } from "@/utils/trpc";

type Customer = RouterOutputs["partners"]["customersByOrgId"][number];

export default function CreateInvoicePage() {
  const router = useRouter();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerListOpen, setCustomerListOpen] = useState(true);
  const [accountListOpen, setAccountListOpen] = useState(false);
  const { userId } = useUser();

  const { organizationId = "" } = useOrganization();
  const create = api.invoices.createInvoice.useMutation();

  // Fetch customers
  const { data: customers = [], isLoading: isCustomersLoading } =
    api.partners.customersByOrgId.useQuery(organizationId, {
      enabled: !!organizationId,
    });

  // Fetch  bank accounts
  const { data: bankAccounts = [], isLoading: isBankAccountsLoading } =
    api.account.list.useQuery(organizationId);

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerListOpen(false);
    setAccountListOpen(true);
    setAccountInfo(null); // Reset account selection when customer changes
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
    dueDate = addDays(new Date(), 30),
    currency,
    terms,
    paymentLinkEnabled,
    files,
  }: CreateInvoiceProps) => {
    if (!selectedCustomer) {
      // toast({
      //   title: "Customer Required",
      //   description: "Please select a customer before creating a bill",
      //   variant: "destructive",
      // });
      console.log("Customer not selected");
      setCustomerListOpen(true);
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

      const invoice = await create.mutateAsync({
        customerId: selectedCustomer.id,
        rows,
        accountInfo,
        dueDate,
        terms,
        total: totalAmount + totalVat,
        totalAmount,
        totalVat,
        customId,
        currency,
        organizationId,
        paymentLinkEnabled,
        userId,
        files,
      });

      // toast({
      //   title: "Success",
      //   description: "Bill created successfully",
      // });
      console.log("Bill created successfully");

      router.push(`/invoices-bills/invoices/${invoice.id}`);
    } catch (error) {
      console.error("Error creating invoice:", error);
      // toast({
      //   title: "Error",
      //   description: "Failed to create bill. Please try again.",
      //   variant: "destructive",
      // });
      console.log("Failed to create invoice. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCustomerInitials = (name: string) => {
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
      <h1 className="text-3xl font-bold tracking-tight">Create Invoice</h1>

      {/* Customer selection section */}
      <Collapsible
        open={customerListOpen}
        onOpenChange={setCustomerListOpen}
        className="w-full"
      >
        <Card className="shadow-sm py-2">
          {/* Make the entire header clickable */}
          <CollapsibleTrigger asChild className="">
            <CardHeader className="py-2 cursor-pointer hover:bg-slate-50 rounded-t-md transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">
                    {!selectedCustomer
                      ? "Choose a Customer"
                      : `Customer: ${selectedCustomer.name}`}
                  </CardTitle>
                  {selectedCustomer && (
                    <CardDescription className="text-sm mt-1">
                      {selectedCustomer.email || "No email"} |{" "}
                      {selectedCustomer.phone || "No phone"}
                    </CardDescription>
                  )}
                </div>
                {customerListOpen ? (
                  <ChevronUp className="h-4 w-4 text-slate-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>

          <CollapsibleContent className=" my-0">
            <CardContent className="py-2 px-3">
              {isCustomersLoading ? (
                <div className="flex justify-center py-3">
                  <p>Loading customers...</p>
                </div>
              ) : customers.length === 0 ? (
                <div className="flex flex-col items-center py-4 text-center">
                  <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                  <p>No customers found. Please add a customer first.</p>
                </div>
              ) : (
                <div className="grid gap-2 max-h-60 overflow-y-auto p-1">
                  {customers.map((customer) => (
                    <Button
                      key={customer.id}
                      variant={
                        selectedCustomer?.id === customer.id
                          ? "subtle"
                          : "ghost"
                      }
                      className={`justify-start py-2 px-3 h-auto w-full ${
                        selectedCustomer?.id === customer.id
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-800"
                          : "hover:bg-slate-50"
                      }`}
                      onClick={() => handleCustomerSelect(customer)}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={customer.photo || ""}
                            alt={customer.name}
                          />
                          <AvatarFallback className="bg-slate-200 text-slate-600 text-xs">
                            {getCustomerInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-sm">{customer.name}</p>
                          <p className="text-xs text-slate-500 truncate">
                            {customer.email || "No email"} |{" "}
                            {customer.city || "No location"}
                          </p>
                        </div>
                        {customer.business_tax_number && (
                          <Badge
                            variant="outline"
                            className="ml-auto text-xs bg-transparent"
                          >
                            VAT: {customer.business_tax_number}
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
      {selectedCustomer && (
        <Collapsible
          open={accountListOpen}
          onOpenChange={setAccountListOpen}
          className="w-full"
        >
          <Card className=" py-2 shadow-sm">
            {/* Make the entire header clickable, matching the customer section */}
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
                {isBankAccountsLoading ? (
                  <div className="flex justify-center py-3">
                    <p>Loading bank accounts...</p>
                  </div>
                ) : bankAccounts.length === 0 ? (
                  <div className="flex flex-col items-center py-4 text-center">
                    <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
                    <p>No bank accounts found for this customer.</p>
                  </div>
                ) : (
                  <div className="grid gap-2 max-h-48 overflow-y-auto p-1">
                    {bankAccounts.map((account) => (
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
          <CardTitle className="text-lg">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <InvoiceDetails
            handleCreate={handleCreate}
            isSubmitting={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
}
